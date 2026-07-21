const express = require("express");
const router = express.Router();

const scheduleController = require("../controllers/scheduleController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// ================================
// GET ALL
// ================================
router.get(
    "/",
    auth,
    scheduleController.getAllSchedules
);

// ================================
// GET BY ID
// ================================
router.get(
    "/:id",
    auth,
    scheduleController.getScheduleById
);

// ================================
// CREATE
// ================================
router.post(
    "/",
    auth,
    role(1),
    scheduleController.createSchedule
);

// ================================
// UPDATE
// ================================
router.put(
    "/:id",
    auth,
    role(1),
    scheduleController.updateSchedule
);

// ================================
// DELETE
// ================================
router.delete(
    "/:id",
    auth,
    role(1),
    scheduleController.deleteSchedule
);

module.exports = router;