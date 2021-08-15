import mongoose from "mongoose";

const SavingSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  amountRequired: {
    type: Number,
    required: true,
  },
  amountSaved: {
    type: Number,
    required: true,
    default: 0,
  },
  history: [
    {
      date: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
    },
  ],
  description: {
    type: String,
    required: true,
  },
  deadline: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Saving = mongoose.model("Saving", SavingSchema);

export default Saving;
