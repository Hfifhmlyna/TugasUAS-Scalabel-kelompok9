const express = require("express");
const router = express.Router();

const guardianController = require("../controllers/guardianController");

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// ======================================
// GET ALL GUARDIANS
// ======================================
router.get(
    "/",
    auth,
    role(1),
    guardianController.getAllGuardians
);

// ======================================
// GET GUARDIAN BY ID
// ======================================
router.get(
    "/:id",
    auth,
    role(1),
    guardianController.getGuardianById
);

// ======================================
// CREATE GUARDIAN
// ======================================
router.post(
    "/",
    auth,
    role(1),
    guardianController.createGuardian
);

// ======================================
// UPDATE GUARDIAN
// ======================================
router.put(
    "/:id",
    auth,
    role(1),
    guardianController.updateGuardian
);

// ======================================
// DELETE GUARDIAN
// ======================================
router.delete(
    "/:id",
    auth,
    role(1),
    guardianController.deleteGuardian
);

module.exports = router;