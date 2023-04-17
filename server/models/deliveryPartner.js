// const { Sequelize, DataTypes } = require("sequelize");
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

// const DeliveryPartner = sequelize.define("deliveryPartner", {
//   deliveryPartnerId: {
//     type: DataTypes.UUID,
//     defaultValue: DataTypes.UUIDV4,
//     allowNull: false,
//     primaryKey: true,
//   },
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   mobileNumber: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   isActive: {
//     type: DataTypes.BOOLEAN,
//     allowNull: false,
//     defaultValue: true,
//   },
// });

// sequelize
//   .sync()
//   .then(() => {
//     console.log("deliveryPartner table created successfully!");
//   })
//   .catch((error) => {
//     console.error("Unable to create table : ", error);
//   });

// module.exports = DeliveryPartner;
