const express = require('express');
const Santri = require('../../models/dompet/santri');

const app = express.Router();

app.get('/api/user', async (req, res) => {
    try{
        const santri = await Santri.find();
        res.status(200).send(santri);
    } catch(e) {
        res.status(500).json({Success: "Fail get user data"});
    }
})

module.exports = app