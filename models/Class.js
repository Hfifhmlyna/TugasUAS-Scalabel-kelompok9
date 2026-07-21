const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Class = sequelize.define(
  "Class",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    major_id: DataTypes.INTEGER,
    teacher_id: DataTypes.INTEGER,
    class_name: DataTypes.STRING(50),
    school_year: DataTypes.STRING(20),
  },
  {
    tableName: "classes",
    timestamps: false,
  }
);

module.exports = Class;