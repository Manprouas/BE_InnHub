const express = require('express');
const router = express.Router();
const { getDashboardSummary } = require('../controllers/dashboard.controllers');

// Tambahkan console.log untuk debugging
router.get('/', (req, res, next) => {
    next();
}, getDashboardSummary);

module.exports = router;