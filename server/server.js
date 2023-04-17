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

// app.get("/", function (req, res) {
//   res.send("<h1>Hello World!</h1>");
// });

// // Middleware
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3002"],
    method: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(helmet());
app.use(morgan("combined"));

// //Routes
const authRoutes = require("./routes/auth");
const restaurantRoutes = require("./routes/restaurant");
const orderRoutes = require("./routes/order");
const deliveryRoutes = require("./routes/delivery");
const analyticsRoutes = require("./routes/analytics");
app.use("/api/auth", authRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/deliveries", deliveryRoutes);
// app.use("/api/analytics", analyticsRoutes);

app.listen(3000, function () {
  console.log("Server started on port 3000");
});

// Start the server
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });
