const jwt = require("jsonwebtoken");
const loadEnvFile = require('../utils/envUtil');
const envVariables = loadEnvFile('./.env');

// example:
// curl -H "token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im50ZXNsYTEyIiwiYWNjb3VudFR5cGUiOiJpbmRpdmlkdWFsIiwiaWF0IjoxNzAwMzUxMDE4LCJleHAiOjE3MDAzNTgyMTh9.flOKTtixg8WdcSnGxYubjDOY71G9BOKTChbXuTwKKxM" http://localhost:65535/post/3
function handleAuthorization(req, res, next, allowedAccountType) {
  try {
    const jwtToken = req.header("token");
    console.log("token", jwtToken);
    if (!jwtToken) {
      return res.status(403).json("You are not logged in! Please visit the login page.");
    }
    const payload = jwt.verify(jwtToken, envVariables.JWT_SECRET);
    req.username = payload.username;
    if (payload.accountType !== allowedAccountType) {
      return res.status(403).json({ success: false, error: "You do not have the right permissions" });
    }
    next();
  } catch (error) {
    return res.status(403).json({ success: false, error: "You are not logged in! Please visit the login page." });
  }
}

async function authorizeIndividual(req, res, next) {
  handleAuthorization(req, res, next, 'individual');
}

async function authorizeOrganization(req, res, next) {
  handleAuthorization(req, res, next, 'organization');
}

module.exports = {
  authorizeIndividual,
  authorizeOrganization
}
