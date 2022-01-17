import express from "express";
import {
  cancelOffer,
  getOffers,
  getOneOffer,
  getProfileOffers,
  newOffer,
  updateArrive,
  updateOffer,
  updatePayment,
  updateVerified,
} from "../controllers/offer.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/new", newOffer);
router.get("/", getOffers);
router.get("/profile", getProfileOffers);
router.post("/cancel", cancelOffer);
router.patch("/arrive", updateArrive);
router.patch("/verified", updateVerified);
router.patch("/payment", updatePayment);
router.patch("/update", updateOffer);
router.get("/one", getOneOffer);

export default router;
