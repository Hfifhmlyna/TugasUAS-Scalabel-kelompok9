const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const AcademicYear = sequelize.define(
  "AcademicYear",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    academic_year: {
      type: DataTypes.STRING(20),
    },
    semester: {
      type: DataTypes.ENUM("Odd", "Even"),
    },
    status: {
      type: DataTypes.ENUM("Active", "Inactive"),
    },
  },
  {
    tableName: "academic_years",
    timestamps: false,
  }
);

module.exports = AcademicYear;