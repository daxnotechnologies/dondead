import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  balance: { type: Number, required: true },
  paypal: { type: String },
  bankDetails: { type: String },
  verified: { type: Boolean, required: false },
  coins: { type: Number, required: false },
  vatID: { type: String },
});

export default mongoose.model("User", userSchema);
