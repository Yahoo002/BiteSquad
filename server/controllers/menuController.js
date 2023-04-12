const Menu = require("../models/Menu");

// Create a new menu
exports.createMenu = async (req, res, next) => {
  try {
    const { name, description, price, image } = req.body;
    const { id } = req.params;

    // Check if restaurant exists
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res
        .status(404)
        .json({ success: false, message: "Restaurant not found" });
    }

    // Create the menu item
    const menu = await Menu.create({
      name,
      description,
      price,
      image,
      restaurant: id,
    });

    res.status(201).json({ success: true, data: menu });
  } catch (error) {
    next(error);
  }
};

// Update a menu item
exports.updateMenu = async (req, res, next) => {
  try {
    const { name, description, price, image } = req.body;
    const { id, menuId } = req.params;

    // Check if menu item exists
    const menu = await Menu.findOne({ _id: menuId, restaurant: id });
    if (!menu) {
      return res
        .status(404)
        .json({ success: false, message: "Menu item not found" });
    }

    // Update the menu item
    menu.name = name;
    menu.description = description;
    menu.price = price;
    menu.image = image;

    await menu.save();

    res.status(200).json({ success: true, data: menu });
  } catch (error) {
    next(error);
  }
};

// Delete a menu item
exports.deleteMenu = async (req, res, next) => {
  try {
    const { id, menuId } = req.params;

    // Check if menu item exists
    const menu = await Menu.findOne({ _id: menuId, restaurant: id });
    if (!menu) {
      return res
        .status(404)
        .json({ success: false, message: "Menu item not found" });
    }

    await menu.remove();

    res
      .status(200)
      .json({ success: true, message: "Menu item deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Get all menus for a restaurant
exports.getMenus = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if restaurant exists
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res
        .status(404)
        .json({ success: false, message: "Restaurant not found" });
    }

    // Get all menus for the restaurant
    const menus = await Menu.find({ restaurant: id });

    res.status(200).json({ success: true, data: menus });
  } catch (error) {
    next(error);
  }
};

// Get a menu item
exports.getMenu = async (req, res, next) => {
  try {
    const { id, menuId } = req.params;

    // Check if menu item exists
    const menu = await Menu.findOne({ _id: menuId, restaurant: id });
    if (!menu) {
      return res
        .status(404)
        .json({ success: false, message: "Menu item not found" });
    }

    res.status(200).json({ success: true, data: menu });
  } catch (error) {
    next(error);
  }
};
