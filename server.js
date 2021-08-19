import express from "express";
import colors from "colors";
import usersRoute from "./routes/users.js";
import savingsRoute from "./routes/savings.js";
import transactionsRoute from "./routes/transactions.js";
import receiptsRoute from "./routes/receipts.js";
import uploadRoute from "./routes/uploads.js";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import path from "path";
import { Strategy } from "passport-google-oauth2";
import passport from "passport";
import dotenv from "dotenv";
import User from "./models/User.js";
import cors from "cors";
import generateToken from "./utils/generateToken.js";

dotenv.config();

connectDB();

const app = express();

app.use(express.json({ extended: true }));
app.use("/api/users", usersRoute);
app.use("/api/savings", savingsRoute);
app.use("/api/transactions", transactionsRoute);
app.use("/api/receipts", receiptsRoute);
app.use("/api/upload", uploadRoute);

// Sign In With Google
app.post("/auth/google", async (req, res) => {
  const { firstName, lastName, email } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(201).json({
      _id: userExists._id,
      firstName: userExists.firstName,
      lastName: userExists.lastName,
      email: userExists.email,
      token: generateToken(userExists._id),
    });
    return;
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Cannot Register User");
  }
});

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Error Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server Started At Port ${PORT}`.cyan));
