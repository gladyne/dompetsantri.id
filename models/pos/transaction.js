const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    custName: String,
    nipd: String,
    total: Number,
    isCO: Boolean,
  },
  { timestamps: true }
);

const History = new mongoose.model("Transaction", transactionSchema);

module.exports = History;
