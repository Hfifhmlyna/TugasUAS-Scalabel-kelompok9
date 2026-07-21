const express = require("express");

const router = express.Router();

const reportController = require("../controllers/reportController");

const auth = require("../middleware/authMiddleware");


router.get(
    "/student/:id",
    auth,
    reportController.getStudentReport
);


module.exports = router;