const express = require("express");
const router = express.Router();
const { Order, OrderItem } = require("../models");
const authMiddleware = require("../middlewares/auth");

// Create a new order
router.post("/order/create", authMiddleware, async (req, res) => {
  try {
    const { orderItems } = req.body;
    const order = await Order.create({
      customerId: req.user.id,
      restaurantId: orderItems[0].restaurantId,
      orderStatus: "pending",
    });
    await Promise.all(
      orderItems.map(async (item) => {
        await OrderItem.create({
          orderId: order.id,
          menuId: item.menuId,
          quantity: item.quantity,
          price: item.price,
        });
      })
    );
    res.status(201).json({ message: "Order created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all orders for a specific customer
router.get("/customer", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { customerId: req.user.id },
      include: [
        {
          model: OrderItem,
          include: ["menu"],
        },
        "restaurant",
      ],
    });
    res.json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all pending orders for a specific restaurant
router.get("/restaurant/pending", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { restaurantId: req.user.restaurantId, orderStatus: "pending" },
      include: [
        {
          model: OrderItem,
          include: ["menu"],
        },
        "customer",
      ],
    });
    res.json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update the order status
router.patch("/:orderId", authMiddleware, async (req, res) => {
  try {
    const order = await Order.findOne({
      where: { id: req.params.orderId, restaurantId: req.user.restaurantId },
    });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    const { orderStatus } = req.body;
    await order.update({ orderStatus });
    res.json({ message: "Order updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all orders for a specific restaurant
router.get("/restaurant", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { restaurantId: req.user.restaurantId },
      include: [
        {
          model: OrderItem,
          include: ["menu"],
        },
        "customer",
      ],
    });
    res.json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
