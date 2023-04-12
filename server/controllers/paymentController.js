const Razorpay = require("razorpay");

// initialize the Razorpay client with the API key and secret
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrder = async (req, res, next) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
    };

    // create an order in Razorpay
    const order = await razorpay.orders.create(options);

    res.status(200).json({
      status: "success",
      data: {
        orderId: order.id,
        amount: order.amount / 100,
        currency: order.currency,
      },
    });
  } catch (error) {
    next(error);
  }
};

const capturePayment = async (req, res, next) => {
  try {
    const { orderId, paymentId } = req.body;

    const payment = await razorpay.payments.capture(paymentId);

    // update the order status in your database
    // ...

    res.status(200).json({
      status: "success",
      data: {
        paymentId: payment.id,
        amount: payment.amount / 100,
        currency: payment.currency,
        status: payment.status,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  capturePayment,
};
