const jwt = require('jsonwebtoken');
require('dotenv').config();

// # JWT #

// Authentication middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  // Format [Bearer TOKEN] - Get token
  const token = authHeader && authHeader.split(' ')[1];

  if (token === null) { return res.sendStatus(401); }
  console.log(token);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    if (error) { return res.sendStatus(403) }
    req.user = user;

    next();
  })
}

// Generate token (login)
function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60s' });  // Vanligtvis 10-30 min
}

module.exports = {
  authenticateToken: authenticateToken,
  generateAccessToken: generateAccessToken,
};