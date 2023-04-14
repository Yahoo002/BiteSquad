const { sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db.config");

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

module.exports = Menu;
