const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Major = sequelize.define(
  "Major",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    major_name: {
      type: DataTypes.STRING(100),
    },
  },
  {
    tableName: "majors",
    timestamps: false,
  }
);

module.exports = Major;