const express = require("express");
const router = express.Router();

const academicYearController = require("../controllers/academicYearController");

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// GET ALL
router.get("/", auth, role(1), academicYearController.getAllAcademicYears);

// GET BY ID
router.get("/:id", auth, role(1), academicYearController.getAcademicYearById);

// CREATE
router.post("/", auth, role(1), academicYearController.createAcademicYear);

// UPDATE
router.put("/:id", auth, role(1), academicYearController.updateAcademicYear);

// DELETE
router.delete("/:id", auth, role(1), academicYearController.deleteAcademicYear);

module.exports = router;