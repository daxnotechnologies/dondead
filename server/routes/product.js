import express from "express";
import {
  addNewProduct,
  getProductList,
  getProduct,
} from "../controllers/product.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getProductList);
router.post("/new", addNewProduct);

router.get("/one", getProduct);

export default router;
