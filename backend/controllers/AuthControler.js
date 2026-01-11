import UserModel from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Signup
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ name, email, password: hashedPassword });

    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Server error", success: false });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(403).json({
        message: "Auth failed: email or password is wrong",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(403).json({
        message: "Auth failed: email or password is wrong",
        success: false,
      });
    }

    const jwtToken = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    res.status(200).json({
      message: "Login successfully",
      success: true,
      token: jwtToken,
      email: user.email,
      name: user.name,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", success: false });
  }
};

export { signup, login };
