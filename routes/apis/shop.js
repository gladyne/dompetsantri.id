const express = require("express");
const Santri = require("../../models/dompet/santri");
const History = require("../../models/pos/history");
const Transaction = require("../../models/pos/transaction");

const app = express.Router();

app.get("/api/transaction", async (req, res) => {
  try {
    const limit = req.query.limit;
    const transactions = await Transaction.find().lean();
    const transactionsLimit = transactions.slice(
      transactions.length - limit,
      transactions.length
    );
    if (limit) {
      console.log(transactionsLimit);
      res.status(200).json(transactionsLimit);
    } else {
      res.status(200).json(transactions.reverse());
    }
  } catch (error) {
    res.status(500).json({ errorMessage: `${error}` });
  }
});

app.post("/api/cashout", async (req, res) => {
  const data = req.body;
  const id = data.nipd;
  const dataUser = await Santri.findOne({ nipd: id });
  if (dataUser === null) res.status(400).json({ Status: "NIPD tidak ada" });
  else {
    const paid = data.amount;
    const saldo = dataUser.saldo;
    const total = saldo - paid;

    if (total > 0) {
      dataUser.saldo = total;
      dataUser.save();
      await Transaction.create({
        custName: dataUser.nama,
        nipd: dataUser.nipd,
        total: paid,
        isCO: true,
      });
      res.status(201).json({
        Success: "ok",
        nama: dataUser.nama,
        saldoSekarang: dataUser.saldo,
      });
    } else {
      res.status(400).json({ Status: "Saldo tidak mencukupi" });
    }
  }
});

app.post("/api/topup", async (req, res) => {
  const data = req.body;
  const id = data.nipd;
  const dataUser = await Santri.findOne({ nipd: id });
  if (dataUser === null) res.status(400).json({ Status: "NIPD tidak ada" });
  else {
    const topup = data.amount;
    const saldo = dataUser.saldo;
    const total = saldo + topup;

    if (total > 0) {
      dataUser.saldo = total;
      dataUser.save();
      await Transaction.create({
        custName: dataUser.nama,
        nipd: dataUser.nipd,
        total: topup,
        isCO: false,
      });
      res.status(201).json({
        Success: "ok",
        nama: dataUser.nama,
        saldoSekarang: dataUser.saldo,
      });
    } else {
      res.status(400).json({ Status: "gagal topup" });
    }
  }
});

// app.get("api/transaction", async (req, res) => {
//   const transactions = await Transaction.find();
//   print(transactions);
//   res.status(200);
// });

module.exports = app;
