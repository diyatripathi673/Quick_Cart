import { Router } from "express";
import ensureAuthenticated from "../Middleware/Auth.js";

import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
} from "../controllers/CartController.js";

const router = Router();
router.get("/", ensureAuthenticated, getCart);
router.post("/", ensureAuthenticated, addToCart);
router.put("/:id", ensureAuthenticated, updateCartItem);
router.delete("/:id", ensureAuthenticated, removeFromCart);
export default router;
