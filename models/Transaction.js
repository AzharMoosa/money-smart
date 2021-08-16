import mongoose from "mongoose";

const TransactionSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    information: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;
