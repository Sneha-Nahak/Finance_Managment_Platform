require('dotenv').config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const AuthRouter = express.Router();

// Utility: Enforce password complexity
const isValidPassword = (password) => {
  return (
    password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)
  );
};

// Register
AuthRouter.post("/register", async (req, res) => {
  const { name, email, password, role, createdAt, updatedAt } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: "Email already registered" });

  if (!isValidPassword(password)) {
    return res.status(400).json({
      message: "Password must be at least 8 characters long, include a number, and an uppercase letter."
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    name,
    email,
    password: hashedPassword,
    role,
    createdAt,
    updatedAt,
  });
  await user.save();

  res.status(201).json({ message: "User registered successfully" });
});

// Login
AuthRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.status(200).json({ message: 'User logged in successfully!', token });
});

module.exports = AuthRouter;