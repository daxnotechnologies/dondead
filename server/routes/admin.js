import express from "express";
import auth from "../middleware/auth.js";
import { login, signup, getProfile } from "../controllers/admin.js";
import { getProfilebyAdmin } from "../controllers/user.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/profile", auth, getProfile);
router.get("/user/profile", getProfilebyAdmin);

export default router;
