const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config.json");

class DeliveryDetail extends Model {}

DeliveryDetail.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    deliveryPartnerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
