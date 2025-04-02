import { Schema, model, Document, Types } from 'mongoose'

interface IEvent extends Document {
      artistId: Types.ObjectId,
      title: string
      venue: string
      country: string
      state: string
      ticketPrice: number
      date: string
      hostArtiste: string
      guestArtist: string
      availableTickets: number
      soldTickets: number
      eventRef: string
      status: string
}

const eventSchema = new Schema<IEvent>({
      artistId: {
            type: Types.ObjectId,
            required: true,
            ref: "Artist"
      },
      title: {
            
      }
})