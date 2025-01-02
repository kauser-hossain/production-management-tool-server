require("dotenv").config();
const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // Simplified connection
    console.log("Connected to MongoDB using mongoose");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1); // Exit the process if connection fails
  }
};

module.exports = connectToDatabase;
