const express = require('express');
const bcrypt = require('bcrypt');
const loadEnvFile = require('../utils/envUtil');
const envVariables = loadEnvFile('./.env');
const jwt = require("jsonwebtoken");
const authQuery = require('../queries/auth');
const { authorizeAccount } = require('../middleware/authorizeJwt');

const router = express.Router();

const generateJWTToken = (id, type) => {
  return jwt.sign({ username: id, accountType: type }, envVariables.JWT_SECRET, { expiresIn: "2hr" });
};


// route for checking if were authed. also returns accountType
router.get("/is-authed", authorizeAccount, async (req, res) => {
  try {
    const accountType = await authQuery.getAccountType(req.username);
    return res.json({ success: true, result: { accountType }});
  } catch (error) {
    return res.status(500).json({success: false, error: error.message});
  }
});

// LOGIN
// curl -X POST -H "Content-Type: application/json" -d '{"username":"cmcdavid1","password":"Cpass1"}' http://localhost:65535/auth/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("attempting login for username: ", username);
    if (!username || !password) {
      return res.status(400).json({success: false, error: "Username and password are required"});
    }
    const result = await authQuery.login(username);
    const validPassword = await bcrypt.compare(password, String(result[0][0]));
    if (result.length < 1 || !validPassword) {
      return res.status(401).json({success: false, error: "Username or password is incorrect"});
    }
    const accountType = await authQuery.getAccountType(username);
    const token = generateJWTToken(username, accountType);
    return res.json({success: true, result: { token }});
  } catch (error) {
    return res.status(500).json({success: false, error: error.message});
  }
});

// handles insert operation? affects 2 tables
router.post('/register', async (req, res) => {
  try {
    // options is { dob, firstname, lastname } if type = individual
    // options is { foundedDate (required), orgName} if type = organization
    // options should be {} if dont want to pass in any 
    // any date is in format 'YEAR-MM-DD'
    const { username, password, email, type, options } = req.body;
    console.log("attempting register for username: ", username);
    if (!username || !password || !email || !type) {
        return res.status(400).json({success: false, error: "Username, password, email, and type are required"});
    }
    if (type !== 'individual' && type !== 'organization') {
        return res.status(400).json({success: false, error: "Account type should be individual or organization"});
    }
    if (type === 'organization' && !options || type === 'organization' && !options.orgName) {
        return res.status(400).json({success: false, error: "Organization account requires an organization name"});
    }
    const usernameExists = await authQuery.userExists(username);
    if (usernameExists.length > 0) {
        return res.status(400).json({success: false, error: "Username is taken! Use a different one."});
    }
    const emailExists = await authQuery.emailExists(email);
    if (emailExists.length > 0) {
        return res.status(400).json({success: false, error: "Email is already taken! Use a different one."});
    }
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const bcryptPassword = await bcrypt.hash(password, salt);
    
    await authQuery.registerAccount(username, bcryptPassword, email);
    if (type === "individual") {
      await authQuery.registerIndividual(username, options ?? {});
    } else {
      await authQuery.registerOrganization(username, options);
    }
    const accountType = await authQuery.getAccountType(username);
    const token = generateJWTToken(username, accountType);
    return res.json({success: true, result: { token }});
  } catch (error) {
    return res.status(500).json({success: false, error: error.message});
  }
});

module.exports = router;
