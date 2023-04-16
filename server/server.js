const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const Sequelize = require("sequelize");
// const { sequelize } = require("./models");
const dotenv = require("dotenv");
dotenv.config();
const dbConfig = require("./db.config");

const sequelize = new Sequelize("bitesquad", "yahya", "", {
  host: "localhost",
  dialect: "postgres",
});

const app = express();
const port = process.env.PORT || 8080;

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
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });
