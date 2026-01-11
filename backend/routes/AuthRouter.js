import { Router } from "express";
import {
  loginValidation,
  signupValidation,
} from "../Middleware/AuthValidation.js";
import { signup, login } from "../controllers/AuthControler.js";

const router = Router();

router.post("/login", loginValidation, login);

router.post("/signup", signupValidation, signup);

router.get("/test", (req, res) => {
  res.send("Auth router working ✅");
});

export default router;
