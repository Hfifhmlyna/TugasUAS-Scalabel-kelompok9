const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Guardian = sequelize.define(
  "Guardian",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    student_id: DataTypes.INTEGER,
    father_name: DataTypes.STRING(100),
    mother_name: DataTypes.STRING(100),
    guardian_phone: DataTypes.STRING(20),
    guardian_address: DataTypes.TEXT,
  },
  {
    tableName: "guardians",
    timestamps: false,
  }
);

module.exports = Guardian;