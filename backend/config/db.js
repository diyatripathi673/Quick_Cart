import mongoose from "mongoose";

const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected...");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    console.log(" console.error() called");
    process.exit(1);

    // Server stop if DB not connected
  }
};

export default connectdb;
