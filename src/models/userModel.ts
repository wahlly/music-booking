import mongoose, {Schema, model } from 'mongoose'

interface IUser extends mongoose.Document {
      name: string;
      email: string;
      password: string;
}

const userSchema = new Schema<IUser>({
      name: {
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
      }
})

const User = model<IUser>('User', userSchema, 'users')

export { User, IUser }