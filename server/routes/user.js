import express from "express";
import auth from "../middleware/auth.js";
import {
  login,
  signup,
  getProfile,
  updateProfile,
  getAll,
  updateBilling,
} from "../controllers/user.js";

const router = express.Router();

router.get("/", getAll);
router.post("/login", login);
router.post("/signup", signup);
router.get("/profile", auth, getProfile);
router.patch("/update", updateProfile);
router.patch("/billing", auth, updateBilling);

export default router;
