import express from "express";

import { validateSignup } from "../middlewares/validator.js";
import { protect } from "../middlewares/auth.js";

import {
  signupUser,
  verificationEmail,
  loginUser,
  updateDetails,
  updatePassword,
  forgotPassword,
  resetPassword,
  checkUser,
} from "../controllers/auth.js";

const router = express.Router();

router.get("/", protect, checkUser);
router.post("/signup", validateSignup, signupUser);
router.post("/verify-email", verificationEmail);
router.post("/login", loginUser);
router.put("/update/user-details", protect, updateDetails);
router.put("/update/password", protect, updatePassword);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
