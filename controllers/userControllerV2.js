const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserV2 = require('../models/UserV2');
const JWT_SECRET = process.env.JWT_SECRET;

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await UserV2.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await UserV2.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: "User registered (PostgreSQL)" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserV2.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};


exports.getUsers = async (req, res) => {
  try {
    const users = await UserV2.findAll({ attributes: ['id', 'name', 'email'] });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};
