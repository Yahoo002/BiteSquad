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

const Menu = sequelize.define("menu", {
  menuId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
});

sequelize
  .sync()
  .then(() => {
    console.log("Menu table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });

module.exports = Menu;
