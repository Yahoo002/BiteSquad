const { sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db.config");

const Order = sequelize.define("order", {
  orderId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  restaurantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  menuId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  paymentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = Order;
