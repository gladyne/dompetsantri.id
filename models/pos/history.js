const mongoose = require("mongoose");

const historySchema = new mongoose.Schema(
  {
    custName: String,
    nipd: String,
    total: Number,
  },
  { timestamps: true }
);

const History = new mongoose.model("History", historySchema);

module.exports = History;
