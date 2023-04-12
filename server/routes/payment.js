const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");
dotenv.config();
const db = require("../models");
const Payment = db.Payment;

const { verifyAccessToken } = require("../middlewares/auth");
const {
  sequelize,
  Payment,
  Order,
  Restaurant,
  Customer,
} = require("../models");

// Initialize Razorpay payment gateway
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Route for creating a new payment
router.post("/createPayment", verifyAccessToken, async (req, res) => {
  const { order_id, amount, restaurant_id } = req.body;
  const payment_capture = 1;
  const currency = "INR";

  try {
    // Create a new payment order
    const paymentOrder = await razorpay.orders.create({
      amount: amount * 100, // Razorpay accepts the amount in paise
      currency,
      payment_capture,
      receipt: uuidv4(),
    });

    // Save the payment details in the database
    const payment = await Payment.create({
      orderId: order.id,
      razorpayOrderId: razorpayOrder.id,
      razorpayPaymentId: "",
      status: "initiated",
    });

    res.status(200).json({
      orderId: order.id,
      restaurant: order.Restaurant,
      customer: order.Customer,
      amount: razorpayOrder.amount / 100,
      currency: razorpayOrder.currency,
      receipt: razorpayOrder.receipt,
      paymentId: payment.id,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Unable to accept payment order" });
  }
});

// Route for capturing the payment
router.post("/capture", async (req, res) => {
  const { order_id, payment_id, signature } = req.body;

  try {
    // Get the payment details from the database
    const payment = await Payment.findOne({
      where: { order_id },
      attributes: [
        "razorpay_order_id",
        "razorpay_payment_id",
        "razorpay_signature",
      ],
    });

    if (!payment) {
      return res.status(400).json({ error: "Payment not found" });
    }

    // Verify the payment signature
    const generatedSignature = hmac_sha256(
      payment.razorpay_order_id + "|" + payment_id,
      process.env.RAZORPAY_KEY_SECRET
    );
    if (generatedSignature !== signature) {
      return res.status(400).json({ error: "Invalid payment signature" });
    }

    // Capture the payment
    const capture = await razorpay.payments.capture(
      payment_id,
      payment.amount * 100
    );

    // Update the payment details in the database
    await payment.update({
      razorpay_payment_id: payment_id,
      razorpay_signature: signature,
    });

    res.json({ message: "Payment successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to capture payment" });
  }
});

// Helper function to generate HMAC-SHA256 signature for Razorpay
function hmac_sha256(string, secret) {
  const crypto = require("crypto");
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(string);
  return hmac.digest("hex");
}

module.exports = router;
