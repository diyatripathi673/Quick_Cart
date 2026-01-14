import { Router } from "express";
import ensureAuthenticated from "../Middleware/Auth.js";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/ProductController.js";

const router = Router();

router.get("/", ensureAuthenticated, getProducts);
router.post("/", ensureAuthenticated, addProduct);
router.put("/:id", ensureAuthenticated, updateProduct);
router.delete("/:id", ensureAuthenticated, deleteProduct);

export default router;
