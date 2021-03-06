import express from "express";
import {
  getUsersSavings,
  getSaving,
  createSavings,
  updateSavings,
  addAmount,
  deleteSaving,
  deleteSavings,
} from "../controllers/savingController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router
  .route("/")
  .get(protect, getUsersSavings)
  .post(protect, createSavings)
  .delete(protect, deleteSavings);
router.route("/add/:id").put(protect, addAmount);
router
  .route("/:id")
  .get(protect, getSaving)
  .put(protect, updateSavings)
  .delete(protect, deleteSaving);

export default router;
