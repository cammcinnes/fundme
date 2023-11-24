const express = require('express');
const orgQuery = require('../queries/organization');

const router = express.Router();

router.get('/all', async(req, res) => {
  try {
    console.log('Getting all organizations');
    const result = await orgQuery.getAllOrgs();
    return res.json({ success: true, result: { orgs: result } });
  } catch (error) {
    return res.status(500).json({ success: false, error: err.message });
  }
});


router.get('/:orgId', async(req, res) => {
  try {
    const { orgId } = req.params;
    console.log('Getting organization: ', orgId);
    const result = await orgQuery.getOrgData(orgId);
    return res.json({ success: true, result: { org: result.org, projects: result.projects, donors: result.donors } });
  } catch (error) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/:orgId/divide', async(req, res) => {
  try {
    const { orgId } = req.params;
    const { donors, projects } = req.body;
    console.log(`Finding projects from [${projects}] that all donors from [${donors}] donated to.`);
    const result = await orgQuery.donorsDivideProjects(donors, projects);
    return res.json({ success: true, result: { donors: result } });
  } catch (error) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
