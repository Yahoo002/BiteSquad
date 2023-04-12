const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const models = require("../models");

// GET menu items for a specific restaurant
router.get("/:restaurantId", auth.restaurantAuth, async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;
    const menuItems = await models.MenuItem.findAll({
      where: { restaurant_id: restaurantId },
    });
    res.json(menuItems);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// POST create a new menu item
router.post(
  "/:restaurantId",
  [
    auth.restaurantAuth,
    [
      check("name", "Name is required").not().isEmpty(),
      check("price", "Price is required").not().isEmpty().isNumeric(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, description, price } = req.body;
      const restaurantId = req.params.restaurantId;
      const menuItem = await models.MenuItem.create({
        name,
        description,
        price,
        restaurant_id: restaurantId,
      });
      res.json(menuItem);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// PUT update an existing menu item
router.put(
  "/:id",
  [
    auth.restaurantAuth,
    [
      check("name", "Name is required").not().isEmpty(),
      check("price", "Price is required").not().isEmpty().isNumeric(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, description, price } = req.body;
      const menuItem = await models.MenuItem.findOne({
        where: { id: req.params.id },
      });
      if (!menuItem) {
        return res.status(404).json({ msg: "Menu item not found" });
      }

      menuItem.name = name;
      menuItem.description = description;
      menuItem.price = price;
      await menuItem.save();

      res.json(menuItem);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// DELETE a menu item
router.delete("/:id", auth.restaurantAuth, async (req, res) => {
  try {
    const menuItem = await models.MenuItem.findOne({
      where: { id: req.params.id },
    });
    if (!menuItem) {
      return res.status(404).json({ msg: "Menu item not found" });
    }

    await menuItem.destroy();

    res.json({ msg: "Menu item removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
