const express = require("express");

const router = express.Router();

const attendanceController = require("../controllers/attendanceController");

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");


// ======================================
// GET ALL ATTENDANCE
// ======================================
router.get(
    "/",
    auth,
    attendanceController.getAllAttendance
);


// ======================================
// GET BY ID
// ======================================
router.get(
    "/:id",
    auth,
    attendanceController.getAttendanceById
);


// ======================================
// CREATE
// ======================================
router.post(
    "/",
    auth,
    role(1),
    attendanceController.createAttendance
);


// ======================================
// UPDATE
// ======================================
router.put(
    "/:id",
    auth,
    role(1),
    attendanceController.updateAttendance
);


// ======================================
// DELETE
// ======================================
router.delete(
    "/:id",
    auth,
    role(1),
    attendanceController.deleteAttendance
);


module.exports = router;