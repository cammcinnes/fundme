const express = require('express');
const joinQuery = require('../queries/join');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const { projectName } = req.body;

        if (!projectName) return res.json({ success: false, error: "projectName field is required."});

        const result = await joinQuery.getContributorsToProject(projectName);
        return res.json({ success: true, result: result });
    } catch (err) {
        return res.json({ success: false, error: err.message });
    }
});

module.exports = router;