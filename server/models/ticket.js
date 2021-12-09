import mongoose from "mongoose";

const ticketSchema = mongoose.Schema({
  userID: { type: String, required: true },
  status: { type: String, required: true },
  image: { type: String, required: true },
});

export default mongoose.model("Ticket", ticketSchema);
