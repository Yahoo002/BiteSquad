const { sequelize, DataTypes, Models } = require("sequelize");
const sequelize = require("../db.config");

class DeliveryDetail extends Model {}

const deliveryStatus = sequelize.define(
  "deliveryStatus",
  {
    statusId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "order",
        key: "orderId",
      },
    },
    deliveryPartnerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "deliveryPartner",
        key: "deliveryPartnerId",
      },
    },
    deliveryAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "in transit", "delivered"),
      allowNull: false,
      defaultValue: "pending",
    },
  },
  {
    sequelize,
    modelName: "deliveryDetail",
    tableName: "delivery_details",
  }
);

module.exports = DeliveryDetail;
