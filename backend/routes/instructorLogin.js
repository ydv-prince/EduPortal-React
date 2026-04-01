const express = require("express");
const router = express.Router();

const instructorModel = require('../models/instructorModel');

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const instructor = await instructorModel.findOne({ email });

    if (instructor && instructor.password === password) { // Plain text match for demo
      return res.status(200).json({ message: "Login successful", token: "instructor-token", instructorId: instructor._id });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
