import Product from "../models/product.js";

export const getProductList = async (req, res) => {
  try {
    const product = await Product.find();

    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addNewProduct = async (req, res) => {
  // if (!req.userId) return res.status(401).json({ message: "Unauthenticated" });
  const prod = req.body;

  try {
    const product = await Product.create(prod);
    console.log(product);

    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const prod = req.body;

  try {
    const product = await Product.findByIdAndUpdate(prod._id, prod);

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProduct = async (req, res) => {
  const { slug } = req.query;

  try {
    const prod = await Product.findOne({ slug });

    res.status(200).json(prod);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};
