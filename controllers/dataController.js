const Data = require("../models/Data");

// Get current array
exports.getCurrentArray = async (req, res) => {
  try {
    const currentArray = await Data.find();
    res.json({ currentArray });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update current array
exports.updateCurrentArray = async (req, res) => {
  try {
    const { currentArray } = req.body;
    await Data.deleteMany(); // Clear previous data
    await Data.insertMany(currentArray);
    res.json({ message: "Current array updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Save hourly data
exports.saveHourlyData = async (req, res) => {
  try {
    const { hour, data } = req.body;
    // Logic to save hourly data (e.g., save to another collection)
    res.json({ message: "Hourly data saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Reset data
exports.resetData = async (req, res) => {
  try {
    await Data.deleteMany(); // Clear all data
    res.json({ message: "Data reset successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
