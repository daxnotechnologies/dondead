import express from "express";
import { updateVerified } from "../../backend/src/api/index.js";
import {
  cancelOffer,
  getOffers,
  getProfileOffers,
  newOffer,
  updateArrive,
} from "../controllers/offer.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/new", newOffer);
router.get("/", getOffers);
router.get("/profile", auth, getProfileOffers);
router.post("/cancel", cancelOffer);
router.patch("/arrive", updateArrive);
router.patch("/verified", updateVerified);

export default router;
