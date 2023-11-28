const express = require('express');
const aggQuery = require('../queries/aggregation');
const orgQuery = require("../queries/organization");

const router = express.Router();

router.get('/top', async(req, res) => {
    try {

    } catch (error) {
        return res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;
