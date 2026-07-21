const express = require("express");
const router = express.Router();

const gradeController = require("../controllers/gradeController");

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");


router.get(
    "/",
    auth,
    gradeController.getAllGrades
);


router.get(
    "/:id",
    auth,
    gradeController.getGradeById
);


router.post(
    "/",
    auth,
    role(1),
    gradeController.createGrade
);


router.put(
    "/:id",
    auth,
    role(1),
    gradeController.updateGrade
);


router.delete(
    "/:id",
    auth,
    role(1),
    gradeController.deleteGrade
);


module.exports = router;