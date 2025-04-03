import statusCodes from '../../constants/statusCodes'
import { MusicEvent, IMusicEvent } from '../../models/eventModel'
import { messageHandler, AlphaNumeric, calculatePaystackServiceFee, messageHandlerI } from '../../utils/index'
import Paystack from '../../modules/paystack'
import { Transaction } from '../../models/transactionModel'
import { EventBooking } from '../../models/bookingModel'
import { Artist } from '../../models/artistModel'

const {InitializePayment, VerifyPayment} = Paystack()

export const newMusicEventService = async (payload: any) => {
    const eventRef = payload.hostArtist + AlphaNumeric(7, "alphaNumeric")
    const musicEvent: IMusicEvent = await MusicEvent.create({...payload, eventRef})

    return messageHandler(true, "Music event created successfully", statusCodes.SUCCESS, musicEvent)
}

export const initializeMusicEventBookingService = async (payload: Record<string, any>) => {
    const {amount, email} = payload
    const processingFee = calculatePaystackServiceFee(amount)
    const totalAmount = amount + processingFee
    const txnRef = AlphaNumeric(20, "alphaNumeric").toUpperCase()
    const response = await InitializePayment({email, amount: totalAmount * 100, reference: txnRef})
    let { status, message, data } = response;
    if(!status) {
        return messageHandler(false, message, statusCodes.BAD_REQUEST, {});
    }

    const event = await MusicEvent.findById(payload.eventId).lean()
    const metadata = {
        userId: payload.userId,
        eventId: payload.eventId,
        artistId: event?.artistId,
        eventDate: event!.date,
        price: event!.ticketPrice,
        country: event!.country,
        state: event!.state,
        venue: event!.venue,
        title: event!.title
    } 

    await Transaction.create({
        txnRef,
        amount,
        userId: payload.userId,
        desc: "EVENT BOOKING",
        metadata
    })

    return messageHandler(
        true,
        "payment for event booking initialised successfully",
        statusCodes.SUCCESS,
        data
    )
}

export const completeMusicEventBookingService = async(payload: Record<string, any>): Promise<messageHandlerI> => {
    const {reference, userId} = payload

    const txn = await Transaction.findOne({ userId, txnRef: reference })
    if (txn == null) {
        return messageHandler(false, "Invalid reference number", statusCodes.BAD_REQUEST, {})
    }

    if (txn.status == "success" || txn.status == "failed") {
        return messageHandler(false, "Transaction already settled", statusCodes.BAD_REQUEST, {})
    }

    const {data} = await VerifyPayment(reference)
    const response = data
    if(!response.status) {
        return messageHandler(false, "unable to complete transaction", statusCodes.INTERNAL_SERVER_ERROR, {})
    }

    if(response.data.gateway_response.toLowerCase() != "successful") {
        return messageHandler(false, "transaction is yet to be completed", statusCodes.BAD_REQUEST, {})
    }

    const updateTxn = await Transaction.updateOne({_id: txn._id}, {$set: {status: "success"}})
    if(updateTxn.modifiedCount == 0) {
        return messageHandler(false, "Unable to complete transaction", statusCodes.INTERNAL_SERVER_ERROR, {})
    }

    const artist = await Artist.findById(txn.metadata.artistId)
    const ticketId = artist?.stageName + txn.metadata.venue + AlphaNumeric(7, "alphaNumeric")
    const booking = await EventBooking.create({...txn.metadata, ticketId})

    artist!.wallet.balance += txn.amount
    await artist?.save()
    await Transaction.create({
        txnRef: AlphaNumeric(10).toUpperCase(),
        amount: txn.amount,
        status: "success",
        artistId: artist?._id,
        desc: "PROCEEDS FROM EVENT BOOKING"
    })

    return messageHandler(true, "Event booking completed successfully", statusCodes.SUCCESS, booking)
}