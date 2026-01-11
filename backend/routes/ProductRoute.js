// routes/ProductRouter.js
import { Router } from "express";
import Product from "../models/Product.js";
import ensureAuthenticated from "../Middleware/Auth.js";

const router = Router();

// 🔹 GET all products
router.get("/", ensureAuthenticated, async (req, res) => {
  try {
    const products = await Product.find(); // DB se fetch
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 POST add new product
router.post("/", ensureAuthenticated, async (req, res) => {
  try {
    const { name, price } = req.body;
    if (!name || !price) {
      return res.status(400).json({ message: "Name and price required" });
    }

    const product = new Product({ name, price });
    await product.save();

    res.status(201).json(product); // newly added product return
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

// import { Router } from "express";
// import ensureAuthenticated from "../Middleware/Auth.js";
// const router = Router();

// router.get("/", ensureAuthenticated, (req, res) => {
//   res.status(200).json([
//     {
//       name: "mobile",
//       price: 12000,
//     },
//     {
//       name: "laptop",
//       price: 52000,
//     },
//     {
//       name: "tv",
//       price: 22000,
//     },
//   ]);
// });
// export default router;
