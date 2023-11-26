const express = require('express');
const selectionQuery = require('../queries/selection');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const queryParams = req.body; // array of objects
        if (!queryParams) return res.json({success: false, error: "Query parameters must be specified"});
        const result = await selectionQuery.getProjectsWithQueryParams(queryParams);
        return res.json({ success: true, result: result });
    } catch (err) {
        throw err;
    }
});

module.exports = router;