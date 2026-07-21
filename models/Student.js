const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Student = sequelize.define(
  "Student",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    class_id: DataTypes.INTEGER,
    nis: DataTypes.STRING(30),
    nisn: DataTypes.STRING(30),
    fullname: DataTypes.STRING(100),
    gender: DataTypes.ENUM("Male", "Female"),
    birth_place: DataTypes.STRING(100),
    birth_date: DataTypes.DATEONLY,
    religion: DataTypes.STRING(30),
    phone: DataTypes.STRING(20),
    address: DataTypes.TEXT,
    photo: DataTypes.STRING(255),
    status: DataTypes.ENUM(
      "Active",
      "Graduated",
      "Moved",
      "Drop Out"
    ),
  },
  {
    tableName: "students",
    timestamps: false,
  }
);

module.exports = Student;