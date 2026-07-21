const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboardController");

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

router.get(
    "/",
    auth,
    dashboardController.getDashboard
);


router.get(
    "/statistic",
    auth,
    dashboardController.getStatistic
);


module.exports = router;