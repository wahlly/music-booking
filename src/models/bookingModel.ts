import {Schema, model, Document} from "mongoose"

interface IEventBooking extends Document{
      title: string
      venue: string
      state: string
      country: string
      price: number
      eventDate: string
      artistId: Schema.Types.ObjectId
      eventId: Schema.Types.ObjectId
      userId: Schema.Types.ObjectId
      ticketId: string
}

const eventBookingSchema = new Schema<IEventBooking>({
      title: {
            type: String,
            required: true
      },
      venue: {
            type: String,
            required: true
      },
      state: {
            type: String,
            required: true
      },
      country: {
            type: String,
            required: true
      },
      price: {
            type: Number,
            required: true
      },
      eventDate: {
            type: String,
            required: true
      },
      ticketId: {
            type: String,
            required: true
      },
      artistId: {
            type: Schema.Types.ObjectId,
            ref: "Artist",
            required: true
      },
      eventId: {
            type: Schema.Types.ObjectId,
            ref: "MusicEvent",
            required: true
      },
      userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
      }
}, {timestamps: true})

const EventBooking = model<IEventBooking>("EventBooking", eventBookingSchema, "eventBookings")

export {EventBooking, IEventBooking}