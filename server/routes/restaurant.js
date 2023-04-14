const express = require("express");
const router = express.Router();
const { Restaurant, Menu, User } = require("../models");
const { verifyToken, verifyRestaurantAdmin } = require("../middleware/auth");

// Get all restaurants
router.get("/restaurant", async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll({
      include: [{ model: Menu }],
      order: [["createdAt", "DESC"]],
    });
    res.json(restaurants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get restaurant by ID
router.get("/restaurant:id", async (req, res) => {
  const { id } = req.params;
  try {
    const restaurant = await Restaurant.findByPk(id, {
      include: [{ model: Menu }],
    });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.json(restaurant);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Create restaurant
router.post(
  "/restraunt/create",
  verifyToken,
  verifyRestaurantAdmin,
  async (req, res) => {
    const { name, address, phone, email, description, image } = req.body;
    const userId = req.user.id;
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(401).json({ message: "User not authorized" });
      }
      const restaurant = await Restaurant.create({
        name,
        address,
        phone,
        email,
        description,
        image,
        userId,
      });
      res.json(restaurant);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
  }
);

// Update restaurant
router.put("/:id", verifyToken, verifyRestaurantAdmin, async (req, res) => {
  const { id } = req.params;
  const { name, address, phone, email, description, image } = req.body;
  try {
    const restaurant = await Restaurant.findByPk(id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    await restaurant.update({
      name,
      address,
      phone,
      email,
      description,
      image,
    });
    res.json(restaurant);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Delete restaurant
router.delete("/:id", verifyToken, verifyRestaurantAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const restaurant = await Restaurant.findByPk(id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    await restaurant.destroy();
    res.json({ message: "Restaurant deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
