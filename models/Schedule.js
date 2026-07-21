const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Schedule = sequelize.define(
  "Schedule",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    class_id: DataTypes.INTEGER,

    teacher_id: DataTypes.INTEGER,

    subject_id: DataTypes.INTEGER,

    day: DataTypes.ENUM(
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu"
    ),

    start_time: DataTypes.TIME,

    end_time: DataTypes.TIME,
  },
  {
    tableName: "schedules",
    timestamps: false,
  }
);

module.exports = Schedule;