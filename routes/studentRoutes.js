const express = require("express");
const router = express.Router();

const studentController = require("../controllers/studentController");

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// ======================================
// GET ALL STUDENTS
// ======================================
router.get(
    "/",
    auth,
    role(1),
    studentController.getAllStudents
);

// ======================================
// GET STUDENT BY ID
// ======================================
router.get(
    "/:id",
    auth,
    role(1),
    studentController.getStudentById
);

// ======================================
// CREATE STUDENT
// ======================================
router.post(
    "/",
    auth,
    role(1),
    studentController.createStudent
);

// ======================================
// UPDATE STUDENT
// ======================================
router.put(
    "/:id",
    auth,
    role(1),
    studentController.updateStudent
);

// ======================================
// DELETE STUDENT
// ======================================
router.delete(
    "/:id",
    auth,
    role(1),
    studentController.deleteStudent
);

module.exports = router;