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
        type: Date,
      },
      amount: {
        type: Number,
      },
    },
  ],
  description: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
  },
});

const Saving = mongoose.model("Saving", SavingSchema);

export default Saving;
