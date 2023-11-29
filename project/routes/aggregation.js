const express = require('express');
const aggQuery = require('../queries/aggregation');

const router = express.Router();

router.get('/top', async(req, res) => {
    try {
        const contributors = await aggQuery.fetchTopContributors();
        return res.json({success: true, result: contributors});
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

router.get('/:username', async(req, res) => {
    try {
        const { username } = req.params;
        const totalContributions = await aggQuery.getAllUserContributions();
        return res.json({success: true, result: totalContributions});
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});


module.exports = router;
