const express = require("express");
const router = express.Router();

const classController = require("../controllers/classController");

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// ======================================
// GET ALL CLASSES
// ======================================
router.get(
    "/",
    auth,
    role(1),
    classController.getAllClasses
);

// ======================================
// GET CLASS BY ID
// ======================================
router.get(
    "/:id",
    auth,
    role(1),
    classController.getClassById
);

// ======================================
// CREATE CLASS
// ======================================
router.post(
    "/",
    auth,
    role(1),
    classController.createClass
);

// ======================================
// UPDATE CLASS
// ======================================
router.put(
    "/:id",
    auth,
    role(1),
    classController.updateClass
);

// ======================================
// DELETE CLASS
// ======================================
router.delete(
    "/:id",
    auth,
    role(1),
    classController.deleteClass
);

module.exports = router;