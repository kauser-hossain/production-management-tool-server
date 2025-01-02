const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
// const dotenv = require("dotenv");
const connectDB = require("./config/db");
const dataRoutes = require("./routes/dataRoutes");
const errorHandler = require("./middleware/errorHandler");
const authRoutes = require("./routes/authRoutes");
const buyerRoutes = require("./routes/buyerRoutes");

// Load environment variables
// dotenv.config();\


// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api", dataRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/buyers", buyerRoutes);

// Global Error Handler
app.use(errorHandler);

module.exports = app;
