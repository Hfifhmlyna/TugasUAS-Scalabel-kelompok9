const express = require("express");
const router = express.Router();

const subjectController = require("../controllers/subjectController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// Semua user yang login dapat melihat data
router.get("/", auth, subjectController.getAllSubjects);
router.get("/:id", auth, subjectController.getSubjectById);

// Hanya Admin
router.post("/", auth, role(1), subjectController.createSubject);
router.put("/:id", auth, role(1), subjectController.updateSubject);
router.delete("/:id", auth, role(1), subjectController.deleteSubject);

module.exports = router;