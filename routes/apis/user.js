const express = require("express");
const Santri = require("../../models/dompet/santri");

const app = express.Router();

app.get("/api/user", async (req, res) => {
  try {
    const santri = await Santri.find();
    res.status(200).send(santri);
  } catch (e) {
    res.status(500).json({ Success: "Fail get user data" });
  }
});

app.get("/api/user/:id", async (req, res) => {
  const idNfc = req.params.id;
  const santri = await Santri.findOne({ nfc: idNfc });
  res.status(200).send(santri);
});

module.exports = app;
