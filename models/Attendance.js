const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");


const Attendance = sequelize.define(
    "Attendance",
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


        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },


        status: {
            type: DataTypes.ENUM(
                "Hadir",
                "Izin",
                "Sakit",
                "Alpa"
            ),
            allowNull: false,
        },


        description: {
            type: DataTypes.STRING(255),
        },


        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        }

    },
    {
        tableName: "attendance",
        timestamps: false,
    }
);


module.exports = Attendance;