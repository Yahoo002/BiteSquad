// const { Sequelize, DataTypes } = require("sequelize");
// // const Order = require("./order");
// const sequelize = new Sequelize("bitesquad", "yahya", "", {
//   host: "localhost",
//   dialect: "postgres",
// });
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Connection has been established successfully.");
//   })
//   .catch((error) => {
//     console.error("Unable to connect to the database: ", error);
//   });

// const Payment = sequelize.define("Payment", {
//   paymentId: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//     allowNull: false,
//   },
//   orderId: {
//     type: DataTypes.INTEGER,
//     references: {
//       model: "order",
//       key: "orderId",
//     },
//   },
//   paymentMethod: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   paymentAmount: {
//     type: DataTypes.FLOAT,
//     allowNull: false,
//   },
// });

// // Payment.belongsTo(Order, { foreignKey: "orderId" });

// sequelize
//   .sync()
//   .then(() => {
//     console.log("Payment table created successfully!");
//   })
//   .catch((error) => {
//     console.error("Unable to create table : ", error);
//   });

// module.exports = { Payment };
