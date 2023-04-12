const express = require("express");
const router = express.Router();
const deliveryController = require("../controllers/deliveryController");

// POST request to create a new delivery
router.post("/", deliveryController.createDelivery);

// GET request to get all deliveries
router.get("/", deliveryController.getAllDeliveries);

// GET request to get a specific delivery by ID
router.get("/:id", deliveryController.getDeliveryById);

// PUT request to update a delivery by ID
router.put("/:id", deliveryController.updateDeliveryById);

// DELETE request to delete a delivery by ID
router.delete("/:id", deliveryController.deleteDeliveryById);

module.exports = router;
