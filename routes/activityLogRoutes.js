const express = require("express");
const router = express.Router();

const activityLogController = require("../controllers/activityLogController");

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// GET ALL
router.get("/", auth, role(1), activityLogController.getAllActivityLogs);

// GET BY ID
router.get("/:id", auth, role(1), activityLogController.getActivityLogById);

// DELETE
router.delete("/:id", auth, role(1), activityLogController.deleteActivityLog);

// DELETE ALL
router.delete("/", auth, role(1), activityLogController.deleteAllActivityLogs);

module.exports = router;