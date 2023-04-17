const { Sequelize, DataTypes } = require("sequelize");
// const User = require("./users");
// const Restaurant = require("./restaurant");
// const Menu = require("./menu");
// const DeliveryPartner = require("./deliveryPartner");
// const Payment = require("./payment");

const sequelize = new Sequelize("bitesquad", "yahya", "", {
  host: "localhost",
  dialect: "postgres",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Order Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

const Order = sequelize.define("order", {
  orderId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "users",
      key: "userId",
    },
  },
  restaurantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "restaurant",
      key: "restaurantId",
    },
  },
  deliveryPartnerId: {
    type: DataTypes.INTEGER,
    references: {
      model: "deliveryPartner",
      key: "deliveryPartnerId",
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  paymentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "payment",
      key: "paymentId",
    },
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

const OrderItem = sequelize.define("OrderItem", {
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "order",
      key: "orderId",
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

// Set up foreign key relationship
// Order.belongsTo(User, { foreignKey: "userId" });
// Order.belongsTo(Restaurant, { foreignKey: "restaurantId" });
// Order.belongsTo(DeliveryPartner, { foreignKey: "deliveryPartnerId" });
// Order.hasMany(OrderItem, {
//   foreignKey: "orderId",
// });
// OrderItem.belongsTo(Menu, { foreignKey: "menuId" });

sequelize
  .sync()
  .then(() => {
    console.log("Order table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });

module.exports = { Order, OrderItem };
