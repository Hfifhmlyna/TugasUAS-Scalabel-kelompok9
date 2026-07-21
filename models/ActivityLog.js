const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ActivityLog = sequelize.define(
  "ActivityLog",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: DataTypes.INTEGER,
    activity: DataTypes.TEXT,
    ip_address: DataTypes.STRING(50),
  },
  {
    tableName: "activity_logs",
    timestamps: false,
  }
);

module.exports = ActivityLog;