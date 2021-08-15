import express from "express";
import {} from "../controllers/transactionController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/");

export default router;
