import express from "express";
import auth from "../middleware/auth.js";
import { login, signup, getProfile } from "../controllers/admin.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/profile", auth, getProfile);

export default router;
