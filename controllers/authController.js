const { validationResult } = require('express-validator');
const redisClient = require('../utils/redisClient');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const User = require('../models/User');

exports.signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: "Login successful",
      token
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.logout = (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
};

exports.getUserDetails = async (req, res) => {
  const { email } = req.params;

  try {
    const cachedData = await redisClient.get(email);
    if (cachedData) {
      return res.status(200).json({
        source: "cache",
        data: JSON.parse(cachedData)
      });
    }
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    await redisClient.set(email, JSON.stringify(user), {
      EX: 3600 
    });
    res.status(200).json({
      source: "database",
      data: user
    });
  } catch (err) {
    console.error("Get User Details Error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
