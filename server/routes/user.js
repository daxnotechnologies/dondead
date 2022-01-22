import express from "express";
import auth from "../middleware/auth.js";
import {
  login,
  signup,
  getProfile,
  updateProfile,
  getAll,
  updateBilling,
  forgotPassword,
  checkToken,
  resetPassword,
} from "../controllers/user.js";

const router = express.Router();

router.get("/", getAll);
router.post("/login", login);
router.post("/signup", signup);
router.get("/profile", auth, getProfile);
router.patch("/update", updateProfile);
router.patch("/billing", auth, updateBilling);

router.post("/forgotPassword", forgotPassword);
router.post("/checkToken", checkToken);
router.patch("/reset", resetPassword);

export default router;
