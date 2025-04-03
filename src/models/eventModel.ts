import { Schema, model, Document } from 'mongoose'

interface IMusicEvent extends Document {
      artistId: Schema.Types.ObjectId,
      title: string
      venue: string
      country: string
      state: string
      ticketPrice: number
      date: string
      hostArtist: string
      guestArtist: string
      availableTickets: number
      soldTickets: number
      eventRef: string
      status: string
}

const musicEventSchema = new Schema<IMusicEvent>({
      artistId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Artist"
      },
      title: {
            type: String,
            required: true
      },
      venue: {
            type: String,
            required: true
      },
      country: {
            type: String,
            required: true
      },
      state: {
            type: String,
            required: true
      },
      ticketPrice: {
            type: Number,
            required: true
      },
      date: {
            type: String,
            required: true
      },
      hostArtist: {
            type: String,
            required: true
      },
      guestArtist: [{
            type: String,
            required: true
      }],
      availableTickets: {
            type: Number,
            required: true
      },
      soldTickets: {
            type: Number,
            default: 0
      },
      eventRef: {
            type: String,
            required: true
      },
      status: {
            type: String,
            enum: ["upcoming", "completed", "postponed", "cancelled"],
            default: "upcoming",
            required: true
      }
})

const MusicEvent = model<IMusicEvent>("Event", musicEventSchema, "musicEvents")

export { MusicEvent, IMusicEvent }