const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    custName: String,
    kelas: String,
    nipd: String,
    total: Number,
    isCO: Boolean,
  },
  { timestamps: true }
);

const Transaction = new mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
