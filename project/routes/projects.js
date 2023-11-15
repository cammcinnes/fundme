const express = require('express');
const appService = require('../appService');

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
        const ownedProjects = await appService.fetchOrgProjects(username);
        return res.json({ success: true, data: ownedProjects });
    } catch (err) {
        return res.status(400).json({ success: false, error: err.message });
    }
});

// get specific project includes: project information, payment tiers, posts and associated comments
router.get('/project-data', async (req, res) => {
    try {
        const { projectName } = req.body;
        if (!projectName)
            return res.status(400).json({ success: false, error: "Project name is required." });
        const projectData = await appService.fetchProjectData(projectName);
        return res.json({ success: true, data: projectData });
    } catch (err) {
        return res.status(400).json({ success: false, error: err.message });
    }
});

router.post('/delete-project', async (req, res) => {
    try {
        const { projectName } = req.body;
        if (!projectName)
            return res.status(400).json({ success: false, error: "Project name is required." });
        const result = await appService.deleteProject(projectName);
        if (result) {
            return res.json({ success: true });
        } else {
            return res.status(400).json({ success: false });
        }
    } catch (err) {
        return res.status(400).json({ success: false, error: err.message });
    }
});

// add a payment tier to the project

// remove a payment tier from the project

module.exports = router;
