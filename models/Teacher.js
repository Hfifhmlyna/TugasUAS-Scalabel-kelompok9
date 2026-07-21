const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Teacher = sequelize.define(
  "Teacher",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: DataTypes.INTEGER,
    nip: DataTypes.STRING(30),
    teacher_name: DataTypes.STRING(100),
    gender: DataTypes.ENUM("Male", "Female"),
    phone: DataTypes.STRING(20),
    address: DataTypes.TEXT,
  },
  {
    tableName: "teachers",
    timestamps: false,
  }
);

module.exports = Teacher;