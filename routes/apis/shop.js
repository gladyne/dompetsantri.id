const express = require("express");
const Santri = require("../../models/dompet/santri");
const History = require("../../models/pos/history");
const Transaction = require("../../models/pos/transaction");

const app = express.Router();

app.get("/api/transaction", async (req, res) => {
  try {
    const transactions = await History.find().lean();
    res.status(200).json(transactions);
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

app.get("api/");

module.exports = app;
