import {Schema, model, Document} from "mongoose"

interface ITransaction extends Document{
      txnRef: string
      metadata: Record<string, any>
      amount: number
      status: string
      userId?: Schema.Types.ObjectId
      artistId?: Schema.Types.ObjectId
      desc: string
}

const transactionSchema = new Schema<ITransaction>({
      txnRef: {
            type: String,
            required: true
      },
      amount: {
            type: Number,
            required: true
      },
      status: {
            type: String,
            enum: ["failed", "pending", "success"],
            default: "pending"
      },
      userId: {
            type: Schema.Types.ObjectId,
            ref: "User"
      },
      artistId: {
            type: Schema.Types.ObjectId,
            ref: "Artist"
      },
      desc: {
            type: String,
            required: true
      },
      metadata: {}
}, {timestamps: true})

const Transaction = model<ITransaction>("Transaction", transactionSchema, "transactions")

export { Transaction, ITransaction }