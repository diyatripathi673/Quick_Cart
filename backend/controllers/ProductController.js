import Product from "../models/Product.js";

// GET products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// ADD product
export const addProduct = async (req, res) => {
  try {
    const { name, price } = req.body;

    const product = await Product.create({ name, price });
    res.status(201).json(product);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE product
export const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(updated);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE product
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};
