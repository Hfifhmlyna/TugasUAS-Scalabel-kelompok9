const express = require("express");
const router = express.Router();

const teacherController = require("../controllers/teacherController");

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// ======================================
// GET ALL TEACHERS
// ======================================
router.get(
    "/",
    auth,
    role(1),
    teacherController.getAllTeachers
);

// ======================================
// GET TEACHER BY ID
// ======================================
router.get(
    "/:id",
    auth,
    role(1),
    teacherController.getTeacherById
);

// ======================================
// CREATE TEACHER
// ======================================
router.post(
    "/",
    auth,
    role(1),
    teacherController.createTeacher
);

// ======================================
// UPDATE TEACHER
// ======================================
router.put(
    "/:id",
    auth,
    role(1),
    teacherController.updateTeacher
);

// ======================================
// DELETE TEACHER
// ======================================
router.delete(
    "/:id",
    auth,
    role(1),
    teacherController.deleteTeacher
);

module.exports = router;