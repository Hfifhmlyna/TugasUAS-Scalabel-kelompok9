const sequelize = require("../config/database");

const db = {};


// ======================================
// IMPORT MODELS
// ======================================

db.User = require("./User");
db.Role = require("./Role");

db.Teacher = require("./Teacher");
db.Student = require("./Student");
db.Guardian = require("./Guardian");

db.Major = require("./Major");
db.Class = require("./Class");

db.AcademicYear = require("./AcademicYear");

db.Subject = require("./Subject");
db.Schedule = require("./Schedule");

db.Grade = require("./Grade");

db.Attendance = require("./Attendance");

db.ActivityLog = require("./ActivityLog");



// ======================================
// ROLE -> USER
// ======================================

db.Role.hasMany(db.User, {
    foreignKey: "role_id",
});

db.User.belongsTo(db.Role, {
    foreignKey: "role_id",
});



// ======================================
// USER -> TEACHER
// ======================================

db.User.hasOne(db.Teacher, {
    foreignKey: "user_id",
});

db.Teacher.belongsTo(db.User, {
    foreignKey: "user_id",
});



// ======================================
// MAJOR -> STUDENT
// ======================================

db.Major.hasMany(db.Student, {
    foreignKey: "major_id",
});

db.Student.belongsTo(db.Major, {
    foreignKey: "major_id",
});



// ======================================
// CLASS -> STUDENT
// ======================================

db.Class.hasMany(db.Student, {
    foreignKey: "class_id",
});

db.Student.belongsTo(db.Class, {
    foreignKey: "class_id",
});



// ======================================
// GUARDIAN -> STUDENT
// ======================================

db.Guardian.hasMany(db.Student, {
    foreignKey: "guardian_id",
});

db.Student.belongsTo(db.Guardian, {
    foreignKey: "guardian_id",
});



// ======================================
// USER -> ACTIVITY LOG
// ======================================

db.User.hasMany(db.ActivityLog, {
    foreignKey: "user_id",
});

db.ActivityLog.belongsTo(db.User, {
    foreignKey: "user_id",
});



// ======================================
// CLASS -> SCHEDULE
// ======================================

db.Class.hasMany(db.Schedule, {
    foreignKey: "class_id",
});

db.Schedule.belongsTo(db.Class, {
    foreignKey: "class_id",
});



// ======================================
// TEACHER -> SCHEDULE
// ======================================

db.Teacher.hasMany(db.Schedule, {
    foreignKey: "teacher_id",
});

db.Schedule.belongsTo(db.Teacher, {
    foreignKey: "teacher_id",
});



// ======================================
// SUBJECT -> SCHEDULE
// ======================================

db.Subject.hasMany(db.Schedule, {
    foreignKey: "subject_id",
});

db.Schedule.belongsTo(db.Subject, {
    foreignKey: "subject_id",
});



// ======================================
// STUDENT -> GRADE
// ======================================

db.Student.hasMany(db.Grade, {
    foreignKey: "student_id",
});

db.Grade.belongsTo(db.Student, {
    foreignKey: "student_id",
});



// ======================================
// SCHEDULE -> GRADE
// ======================================

db.Schedule.hasMany(db.Grade, {
    foreignKey: "schedule_id",
});

db.Grade.belongsTo(db.Schedule, {
    foreignKey: "schedule_id",
});



// ======================================
// STUDENT -> ATTENDANCE
// ======================================

db.Student.hasMany(db.Attendance, {
    foreignKey: "student_id",
});

db.Attendance.belongsTo(db.Student, {
    foreignKey: "student_id",
});



// ======================================
// SCHEDULE -> ATTENDANCE
// ======================================

db.Schedule.hasMany(db.Attendance, {
    foreignKey: "schedule_id",
});

db.Attendance.belongsTo(db.Schedule, {
    foreignKey: "schedule_id",
});



// ======================================
// EXPORT
// ======================================

db.sequelize = sequelize;

module.exports = db;