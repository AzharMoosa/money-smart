import mongoose from "mongoose";
import colors from "colors";
import dotenv from "dotenv";
dotenv.config();
const db = process.env.MONGODB_URI;

export default async function connectDB() {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("MongoDB Connected".cyan);
  } catch (err) {
    console.error("Cannot Connect To MongoDB".white.bgRed);
    process.exit(1);
  }
}
