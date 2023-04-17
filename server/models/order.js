// const { Sequelize, DataTypes } = require("sequelize");
// const User = require("./users");
// const Restaurant = require("./restaurant");
// const Menu = require("./menu");
// const DeliveryPartner = require("./deliveryPartner");
// const Payment = require("./payment");

// const sequelize = new Sequelize("bitesquad", "yahya", "", {
//   host: "localhost",
//   dialect: "postgres",
// });

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Order Connection has been established successfully.");
//   })
//   .catch((error) => {
//     console.error("Unable to connect to the database: ", error);
//   });

// const Order = sequelize.define("order", {
//   orderId: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   quantity: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   totalPrice: {
//     type: DataTypes.FLOAT,
//     allowNull: false,
//   },
// });

// const OrderItem = sequelize.define("orderItem", {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   quantity: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   price: {
//     type: DataTypes.FLOAT,
//     allowNull: false,
//   },
// });

// // Define relations between Order and other models
// Order.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
// Order.belongsTo(Restaurant, {
//   foreignKey: "restaurantId",
//   onDelete: "CASCADE",
// });
// Order.belongsTo(DeliveryPartner, {
//   foreignKey: "deliveryPartnerId",
//   onDelete: "CASCADE",
// });
// Order.belongsTo(Payment, { foreignKey: "paymentId", onDelete: "CASCADE" });
// Order.hasMany(OrderItem, { foreignKey: "orderId", onDelete: "CASCADE" });

// // Define relations between OrderItem and other models
// OrderItem.belongsTo(Order, { foreignKey: "orderId", onDelete: "CASCADE" });
// OrderItem.belongsTo(Menu, { foreignKey: "menuId", onDelete: "CASCADE" });

// sequelize
//   .sync()
//   .then(() => {
//     console.log("Order table created successfully!");
//   })
//   .catch((error) => {
//     console.error("Unable to create table : ", error);
//   });

// module.exports = { Order, OrderItem };
