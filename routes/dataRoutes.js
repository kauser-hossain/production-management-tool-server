const express = require("express");
const {
  getCurrentArray,
  updateCurrentArray,
  saveHourlyData,
  resetData,
} = require("../controllers/dataController");

const router = express.Router();

router.get("/get-current-array", getCurrentArray);
router.post("/update-current-array", updateCurrentArray);
router.post("/save-hourly-data", saveHourlyData);
router.post("/reset-data", resetData);

module.exports = router;
