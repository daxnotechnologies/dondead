import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  sku: { type: String, required: true },
  size: { type: Array, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
});

export default mongoose.model("Product", productSchema);
