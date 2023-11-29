const express = require('express');
const aggregationHavingQuery = require('../queries/aggregation-having');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const result = await aggregationHavingQuery.getRecurringContributors();
        return res.json({ success: true, result: result });
    } catch (err) {
        throw err;
    }
});

module.exports = router;