import mongoose, {Schema, model } from 'mongoose'

interface IArtist extends mongoose.Document {
      birthName: string;
      stageName: string;
      email: string;
      password: string;
      wallet: {balance: number}
}

const artistSchema = new Schema<IArtist>({
      birthName: {
            type: String,
            required: true
      },
      stageName: {
            type: String,
            required: true
      },
      email: {
            type: String,
            required: true
      },
      password: {
            type: String,
            required: true
      },
      wallet: {
            balance: {type: Number, default: 0}
      }
})

const Artist = model<IArtist>('Artist', artistSchema, 'artists')

export { Artist, IArtist }