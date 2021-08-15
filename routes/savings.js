import express from "express";
import {
  getUsersSavings,
  createSavings,
  updateSavings,
  addAmount,
  deleteSaving,
} from "../controllers/savingController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").get(protect, getUsersSavings).post(protect, createSavings);
router.route("/add/:id").put(protect, addAmount);
router.route("/:id").put(protect, updateSavings).delete(protect, deleteSaving);

export default router;
