const jwt = require("jsonwebtoken");
const { User } = require("../models/users");
const { Restaurant } = require("../models/restaurant");
const dotenv = require("dotenv");
dotenv.config();

// Verify token middleware
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header required" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, type } = decoded;
    if (type === "user") {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(401).json({ message: "Invalid token" });
      }
      req.user = user;
      next();
    } else if (type === "restaurant") {
      const restaurant = await Restaurant.findByPk(id);
      if (!restaurant) {
        return res.status(401).json({ message: "Invalid token" });
      }
      req.restaurant = restaurant;
      next();
    } else {
      return res.status(401).json({ message: "Invalid token" });
    }
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Verify user middleware
const verifyUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header required" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, type } = decoded;
    if (type === "user") {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(401).json({ message: "Invalid token" });
      }
      req.user = user;
      next();
    } else {
      return res.status(401).json({ message: "Invalid token" });
    }
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Verify restaurant admin middleware
const verifyRestaurantAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header required" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, type } = decoded;
    if (type === "restaurant") {
      const restaurant = await Restaurant.findByPk(id);
      if (!restaurant) {
        return res.status(401).json({ message: "Invalid token" });
      }
      if (restaurant.userId !== req.user.id) {
        return res.status(401).json({ message: "User not authorized" });
      }
      req.restaurant = restaurant;
      next();
    } else {
      return res.status(401).json({ message: "Invalid token" });
    }
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { verifyToken, verifyUser, verifyRestaurantAdmin };
