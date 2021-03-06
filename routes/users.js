import express from "express";
import {
  loginUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  updateUserDetails,
  getUserById,
  deleteUser,
  loginGoogle,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").post(registerUser).put(protect, updateUserDetails);
router.route("/login").post(loginUser);
router.route("/auth/google").post(loginGoogle);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route("/:id").get(protect, getUserById).delete(protect, deleteUser);

export default router;
