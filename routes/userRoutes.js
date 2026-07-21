const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// ======================================
// GET ALL USERS
// Hanya Admin
// ======================================
router.get(
    "/",
    auth,
    role(1),
    userController.getAllUsers
);

// ======================================
// GET USER BY ID
// Hanya Admin
// ======================================
router.get(
    "/:id",
    auth,
    role(1),
    userController.getUserById
);

// ======================================
// CREATE USER
// Hanya Admin
// ======================================
router.post(
    "/",
    auth,
    role(1),
    userController.createUser
);

// ======================================
// UPDATE USER
// Hanya Admin
// ======================================
router.put(
    "/:id",
    auth,
    role(1),
    userController.updateUser
);

// ======================================
// DELETE USER
// Hanya Admin
// ======================================
router.delete(
    "/:id",
    auth,
    role(1),
    userController.deleteUser
);

module.exports = router;