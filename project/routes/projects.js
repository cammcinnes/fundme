const express = require('express');
const appService = require('../appService');
const {fetchOrgProjects} = require("../appService");

const router = express.Router();

// Get all projects
router.get('/', async (req, res) => {
    try {
        const projects = await appService.fetchAllProjects();
        return res.json({ success: true, data: projects });
    } catch (err) {
        return res.status(400).json({ success: false, error: err.message});
    }
});

// Get all projects owned by given username
router.get('/owned-projects', async (req, res) => {
    try {
        const { username } = req.body;
        if (!username)
            return res.status(400).json({success: false, error: "Username is required."});
        const ownedProjects = await fetchOrgProjects(username);
        return ownedProjects.rows;
    } catch (err) {
        return res.status(400).json({ success: false, error: err.message });
    }
});

// get specific project includes: project information, payment tiers, posts and associated comments
// need project name

// add a payment tier to the project

// remove a payment tier from the project

// delete project

module.exports = router;
