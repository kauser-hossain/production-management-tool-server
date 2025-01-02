const mongoose = require("mongoose");

const ByerInformationSchema = new mongoose.Schema({
  BuyerName: {
    type: String,
    required: [true, "Please provide a Buyer Name"],
  },
  StyleNumber: {
    type: String,
    required: [true, "Please provide a Style Number"],
  },
  JobNumber: {
    type: String,
    required: [true, "Please provide a Job Number"],
  },
  Color: {
    type: String,
    required: [true, "Please provide a Color"],
  },

  OrderQuantity: {
    type: Number,
    required: [true, "Please provide a Order Quantity"],
  },
  line: {
    type: String,
    required: [true, "Please provide a Line"],
  },
  CreateAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("BuyerInformation", ByerInformationSchema);
