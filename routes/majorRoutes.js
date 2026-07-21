const express = require("express");
const router = express.Router();

const majorController = require("../controllers/majorController");

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// ======================================
// GET ALL MAJORS
// ======================================
router.get(
    "/",
    auth,
    role(1),
    majorController.getAllMajors
);

// ======================================
// GET MAJOR BY ID
// ======================================
router.get(
    "/:id",
    auth,
    role(1),
    majorController.getMajorById
);

// ======================================
// CREATE MAJOR
// ======================================
router.post(
    "/",
    auth,
    role(1),
    majorController.createMajor
);

// ======================================
// UPDATE MAJOR
// ======================================
router.put(
    "/:id",
    auth,
    role(1),
    majorController.updateMajor
);

// ======================================
// DELETE MAJOR
// ======================================
router.delete(
    "/:id",
    auth,
    role(1),
    majorController.deleteMajor
);

module.exports = router;