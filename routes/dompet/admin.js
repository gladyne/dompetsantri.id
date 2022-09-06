const express = require('express');
const adminControl = require('../../controllers/dompet/admin');

const adminRoutes = express.Router();

adminRoutes.get('/', adminControl.home);

module.exports = adminRoutes;