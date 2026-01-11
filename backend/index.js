import express from "express";
import dotenv from "dotenv";
import connectdb from "./config/db.js";
import cors from "cors";
import AuthRouter from "./routes/AuthRouter.js";
import ProductRouter from "./routes/ProductRoute.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // body-parser ki jagah

// Routes
app.use("/auth", AuthRouter);
app.use("/products", ProductRouter);
// DB connect
connectdb();

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
