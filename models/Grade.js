const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Grade = sequelize.define(
  "Grade",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    schedule_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    assignment_score: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },

    uts_score: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },

    uas_score: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },

    final_score: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },

    remarks: {
      type: DataTypes.STRING(100),
    },
  },
  {
    tableName: "grades",
    timestamps: false,
  }
);

module.exports = Grade;