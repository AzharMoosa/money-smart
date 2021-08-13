import express from "express";
import colors from "colors";
import usersRoute from "./routes/users.js";
import connectDB from "./config/db.js";

connectDB();

const app = express();

app.use(express.json({ extended: true }));

app.use("/api/users", usersRoute);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server Started At Port ${PORT}`.cyan));
