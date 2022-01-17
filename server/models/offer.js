import mongoose from "mongoose";

const offerSchema = mongoose.Schema({
  offererID: { type: String, required: true },
  offerer: { type: String, required: true },
  products: { type: Array, required: true },
  amount: { type: Number, required: true },
  shippingFee: { type: Number, required: true },
  status: { type: String, required: true },
  paymentStatus: { type: String, required: true },
  timestamp: { type: Date, required: true },
  cancel: { type: Boolean, required: true },
  timeline: { type: Array, required: true },
});

export default mongoose.model("Offer", offerSchema);
