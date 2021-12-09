import express from "express";
import { allTicket, newTicket } from "../controllers/ticket.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", allTicket);
router.post("/post", newTicket);

export default router;
