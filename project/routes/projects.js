const express = require('express');
const projectQuery = require('../queries/projects');

const router = express.Router();

// Get all projects
router.get('/', async (req, res) => {
    try {
        const projects = await projectQuery.fetchAllProjects();
        return res.json({ success: true, result: projects });
    } catch (err) {
        return res.status(400).json({ success: false, error: err.message});
    }
});

// Get all project names
router.get('/names', async (req, res) => {
    try {
        const projects = await projectQuery.fetchAllProjectNames();
        return res.json({ success: true, result: projects });
    } catch (err) {
        return res.status(400).json({ success: false, error: err.message});
    }
});

// Get all projects owned by given username
// Move to accounts???
router.get('/owned-projects', async (req, res) => {
    try {
        const { username } = req.body;
        if (!username)
            return res.status(400).json({success: false, error: "Username is required."});
        const ownedProjects = await projectQuery.fetchOrgProjects(username);
        return res.json({ success: true, result: ownedProjects });
    } catch (err) {
        return res.status(400).json({ success: false, error: err.message });
    }
});

// get specific project includes: project information, payment tiers, posts and associated comments
router.get('/:projectName', async (req, res) => {
    try {
        const { projectName } = req.params;
        if (!projectName)
            return res.status(400).json({ success: false, error: "Project name is required." });
        const projectData = await projectQuery.fetchProjectData(projectName);
        return res.json({ success: true, result: projectData });
    } catch (err) {
        return res.status(400).json({ success: false, error: err.message });
    }
});

router.post('/:projectName', async (req, res) => {
    try {
        const { projectName } = req.params;
        const { orgUsername, description, balance } = req.body;

        const missingFields= [];
        if (!projectName) missingFields.push("projectName");
        if (!orgUsername) missingFields.push("orgUsername");
        if (!description) missingFields.push("description");
        if (!balance) missingFields.push("balance");

        if (missingFields.length > 0) {
            return res.status(400).json({ success: false, error: `Missing field(s): ${missingFields.join(", ")}` });
        }

        await projectQuery.createProject(projectName, orgUsername, description, balance);
        return res.json({ success: true });
    } catch (err) {
        return res.status(400).json({ success: false, error: err.message });
    }
});

// Delete a project with given projectName
router.delete('/:projectName', async (req, res) => {
    try {
        const { projectName } = req.params;
        if (!projectName)
            return res.status(400).json({ success: false, error: "Project name is required." });
        await projectQuery.deleteProject(projectName);
        return res.json({ success: true });
    } catch (err) {
        return res.status(400).json({ success: false, error: err.message });
    }
});

router.post('/:projectName/:payTierID', async (req, res) => {
    try {
        const { projectName, payTierID } = req.params;
        const { orgUsername, description, minAmount, maxAmount } = req.body;

        const missingFields = [];
        if (!payTierID) missingFields.push("payTierID");
        if (!projectName) missingFields.push("projectName");
        if (!orgUsername) missingFields.push("orgUsername");
        if (!description) missingFields.push("description");
        if (!minAmount) missingFields.push("minAmount");
        if (!maxAmount) missingFields.push("maxAmount");

        if (missingFields.length > 0) {
            return res.status(400).json({ success: false, error: `Missing field(s): ${missingFields.join(", ")}` });
        }

        await projectQuery.createPaymentTier(payTierID, projectName, orgUsername, description, minAmount, maxAmount);
        return res.json({ success: true });
    } catch (err) {
        return res.status(400).json({ success: false, error: err.message });
    }
});

router.delete('/:projectName/:payTierID', async (req, res) => {
    try {
        const { payTierID } = req.params;
        if (!payTierID) {
            return res.status(400).json({ success: false, error: "payTierID is required." });
        }
        await projectQuery.deletePaymentTier(payTierID);
        return res.json({ success: true });
    } catch (err) {
        return res.status(400).json({ success: false, error: err.message });
    }
});

module.exports = router;
