const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, mobileNumber, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      mobileNumber,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user.userId }, process.env.JWT_SECRET);

    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { mobileNumber, password } = req.body;

    const user = await User.findOne({ where: { mobileNumber } });

    if (!user) {
      return res
        .status(401)
        .json({ error: "Invalid mobile number or password" });
    }

    const isValidPassword = await user.isValidPassword(password);

    if (!isValidPassword) {
      return res
        .status(401)
        .json({ error: "Invalid mobile number or password" });
    }

    const token = jwt.sign({ id: user.userId }, process.env.JWT_SECRET);

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
