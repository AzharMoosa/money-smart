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

// Sign In With Google Client ID
app.get("/api/config/google", (req, res) =>
  res.send(process.env.GOOGLE_CLIENT_ID)
);

const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Error Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server Started At Port ${PORT}`.cyan));
