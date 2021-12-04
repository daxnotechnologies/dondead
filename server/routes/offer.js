import express from "express";
import {
  cancelOffer,
  getOffers,
  getProfileOffers,
  newOffer,
} from "../controllers/offer.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/new", auth, newOffer);
router.get("/", getOffers);
router.get("/profile", auth, getProfileOffers);
router.post("/cancel", cancelOffer);

export default router;
