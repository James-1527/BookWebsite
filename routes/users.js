const express = require('express');
const router = express.Router();
const User = require('../models/user');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

/* POST Register */
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Server error during registration" });
  }
});

/* POST Login */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Set HTTP-only cookie for server-side auth
    res.cookie('userId', user._id.toString(), {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    // Return user info
    res.json({
      message: "Login successful",
      user: { name: user.name, email: user.email, id: user._id }
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error during login" });
  }
});

/* POST Logout */
router.post('/logout', (req, res) => {
  res.clearCookie('userId');
  res.json({ message: "Logged out successfully" });
});


module.exports = router;
