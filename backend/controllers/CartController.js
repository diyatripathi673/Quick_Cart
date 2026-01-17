// controllers/CartController.js
import Cart from "../models/Cart.js";

// GET cart
export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId });
    res.status(200).json(cart || { userId, items: [], totalPrice: 0 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ADD item
export const addToCart = async (req, res) => {
  try {
    console.log("REQ.USER:", req.user);
    console.log("REQ.BODY:", req.body);

    const userId = req.user.id;
    const { productId, quantity = 1, price } = req.body;

    if (!productId || !price)
      return res.status(400).json({ message: "Product ID and price required" });

    let cart = await Cart.findOne({ userId });
    if (!cart) cart = new Cart({ userId, items: [], totalPrice: 0 });

    const existingIndex = cart.items.findIndex(
      (item) => item.productId === productId
    );
    if (existingIndex >= 0) {
      cart.items[existingIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity, price });
    }

    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE quantity
// controllers/CartController.js

export const updateCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.id; // <- frontend sends productId here
    const { quantity } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find((i) => i.productId === productId);
    if (!item) return res.status(404).json({ message: "Item not in cart" });

    item.quantity = quantity;
    cart.totalPrice = cart.items.reduce(
      (total, i) => total + i.quantity * i.price,
      0
    );

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// REMOVE item
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.id;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((i) => i.productId !== productId);
    cart.totalPrice = cart.items.reduce(
      (total, i) => total + i.quantity * i.price,
      0
    );
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
