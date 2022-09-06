const express = require('express');
const santriController = require('../../controllers/dompet/santri');

const santriRoutes = express.Router();

santriRoutes.get('/santri',santriController.getSantri);
santriRoutes.get('/topup/:rekening', santriController.topupData);
santriRoutes.post('/topup/:rekening', santriController.topup);
santriRoutes.get('/topupSuccess', santriController.topupSuccess);
santriRoutes.get('/topupFail', santriController.topupFail);


module.exports = santriRoutes;