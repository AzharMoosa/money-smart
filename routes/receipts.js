import express from "express";
import {
  getUsersReceipts,
  getReceipt,
  createReceipt,
  updateReceipt,
  deleteReceipts,
} from "../controllers/receiptController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router
  .route("/")
  .get(protect, getUsersReceipts)
  .post(protect, createReceipt)
  .delete(protect, deleteReceipts);
router.route("/:id").get(protect, getReceipt).put(protect, updateReceipt);

export default router;
