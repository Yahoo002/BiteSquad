const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("bitesquad", "yahya", "", {
  host: "localhost",
  dialect: "postgres",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

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

sequelize
  .sync()
  .then(() => {
    console.log("Book table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });

module.exports = DeliveryDetail;
