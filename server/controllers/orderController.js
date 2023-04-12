const Order = require("../models/Order");

// function to create a new order
const createOrder = async (req, res, next) => {
  try {
    const { customerId, restaurantId, menuItems, orderTotal } = req.body;
    const newOrder = new Order({
      customerId,
      restaurantId,
      menuItems,
      orderTotal,
    });
    await newOrder.save();
    res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    next(error);
  }
};

// function to get all orders
const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ orders });
  } catch (error) {
    next(error);
  }
};

// function to get order by ID
const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ order });
  } catch (error) {
    next(error);
  }
};

// function to update order by ID
const updateOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    order.status = status;
    await order.save();
    res.status(200).json({ message: "Order updated successfully", order });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderById,
};
