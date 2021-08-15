import express from "express";
import {
  getUsersTransactions,
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transactionController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router
  .route("/")
  .get(protect, getUsersTransactions)
  .post(protect, createTransaction);
router
  .route("/:id")
  .get(protect, getTransaction)
  .put(protect, updateTransaction)
  .delete(protect, deleteTransaction);

export default router;
