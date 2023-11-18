const express = require('express');
const appService = require('../appService');

const router = express.Router();

// LOGIN
// curl -X POST -H "Content-Type: application/json" -d '{"username":"your_username","password":"your_password"}' http://localhost:65535/login
router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({success: false, error: "Username and password are required"});
    }
    const result = await appService.login(username, password);
    if (result.length < 1) {
      return res.status(404).json({success: false, error: "Username or password is incorrect"});
    }
    const accountType = await appService.getAccountType(username);
    return res.json({success: true, accountType});
  } catch (error) {
    return res.status(400).json({success: false, error: error.message});
  }
});

module.exports = router;
