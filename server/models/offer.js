import mongoose from "mongoose";

const offerSchema = mongoose.Schema({
  offererID: { type: String, required: true },
  products: { type: Array, required: true },
  amount: { type: Number, required: true },
  status: { type: String, required: true },
  timestamp: { type: Date, required: true },
  cancel: { type: Boolean, required: true },
  extraPayout: { type: Boolean, required: true },
});

export default mongoose.model("Offer", offerSchema);
