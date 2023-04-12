const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { sequelize } = require("./models");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(morgan("combined"));

//Routes
const authRoutes = require("./routes/auth");
const restaurantRoutes = require("./routes/restaurant");
const orderRoutes = require("./routes/order");
const deliveryRoutes = require("./routes/delivery");
const analyticsRoutes = require("./routes/analytics");
app.use("/api/auth", authRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/deliveries", deliveryRoutes);
app.use("/api/analytics", analyticsRoutes);

// Start the server
sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error starting server: ", error);
  });
