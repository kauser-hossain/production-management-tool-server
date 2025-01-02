const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  value: { type: Number, required: true },
  hour: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Data", dataSchema);
