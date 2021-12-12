import express from "express";
import {
  addNewProduct,
  getProductList,
  getProduct,
  updateProduct,
} from "../controllers/product.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getProductList);
router.post("/new", addNewProduct);
router.patch("/update", updateProduct);
router.get("/one", getProduct);

export default router;
