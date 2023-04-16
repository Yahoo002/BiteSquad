// const DeliveryDetail = require("../models/DeliveryDetail");
const DeliveryPartner = require("../models/deliveryPartner");
const Order = require("../models/order");

// Function to create a new delivery partner
const createDeliveryPartner = async (req, res) => {
  try {
    const deliveryPartner = await DeliveryPartner.create(req.body);
    res.status(201).json(deliveryPartner);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating delivery partner" });
  }
};

// Function to get all delivery partners
const getAllDeliveryPartners = async (req, res) => {
  try {
    const deliveryPartners = await DeliveryPartner.find();
    res.status(200).json(deliveryPartners);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting delivery partners" });
  }
};

// Function to get delivery partner by ID
const getDeliveryPartnerById = async (req, res) => {
  try {
    const deliveryPartner = await DeliveryPartner.findById(req.params.id);
    if (!deliveryPartner) {
      res.status(404).json({ message: "Delivery partner not found" });
      return;
    }
    res.status(200).json(deliveryPartner);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting delivery partner" });
  }
};

// Function to update delivery partner by ID
const updateDeliveryPartnerById = async (req, res) => {
  try {
    const deliveryPartner = await DeliveryPartner.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!deliveryPartner) {
      res.status(404).json({ message: "Delivery partner not found" });
      return;
    }
    res.status(200).json(deliveryPartner);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating delivery partner" });
  }
};

// Function to delete delivery partner by ID
const deleteDeliveryPartnerById = async (req, res) => {
  try {
    const deliveryPartner = await DeliveryPartner.findByIdAndDelete(
      req.params.id
    );
    if (!deliveryPartner) {
      res.status(404).json({ message: "Delivery partner not found" });
      return;
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting delivery partner" });
  }
};

// Function to assign a delivery partner to an order
// const assignDeliveryPartner = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.orderId);
//     if (!order) {
//       res.status(404).json({ message: "Order not found" });
//       return;
//     }

//     const deliveryPartner = await DeliveryPartner.findById(
//       req.params.deliveryPartnerId
//     );
//     if (!deliveryPartner) {
//       res.status(404).json({ message: "Delivery partner not found" });
//       return;
//     }

//     const deliveryDetail = await DeliveryDetail.create({
//       order: order._id,
//       deliveryPartner: deliveryPartner._id,
//       assignedAt: new Date(),
//     });

//     res.status(200).json(deliveryDetail);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error assigning delivery partner" });
//   }
// };

module.exports = {
  createDeliveryPartner,
  getAllDeliveryPartners,
  getDeliveryPartnerById,
  updateDeliveryPartnerById,
  deleteDeliveryPartnerById,
};
