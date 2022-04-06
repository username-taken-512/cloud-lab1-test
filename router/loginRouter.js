const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const express = require('express');
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// const authenticateToken = require('../js/auth');
const auth = require('../js/auth');
const authenticateToken = auth.authenticateToken;
const generateAccessToken = auth.generateAccessToken;

// Future work: Database
const users = [
  {
    username: "jo",
    password: "$2b$10$fJX2sdRbT8YeoCpb6yYAV.udxO.5y5FQ7L6KSx5QACnIXNzTnd4Xq",
    email: "jo@jo.jo"
  }
];
let refreshTokens = []; // Should be in db

// Returns user info
router.get('/', authenticateToken, (req, res) => {
  console.log(process.env.ACCESS_TOKEN_SECRET);

  const user = users.find(user => user.username = req.user) || null;
  delete user.password; // Delete password before sending
  res.json(user);
});

// Create new user
router.post('/', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);  // "salt" kan bytas ut till siffra, t. ex. 10

    const user = {
      username: req.body.username,
      password: hashedPassword
    };
    users.push(user);
    res.status(201).send();
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

// Login (request token)
router.post('/login', async (req, res) => {
  console.log('Login attempt: ', req.body.username);
  const user = users.find(user => user.username === req.body.username) || null;
  console.log('Login attempt: ', req.body.username, ' - Finding user:', user);
  if (user === null) {
    res.status(403).json({ _error: 'Invalid credentials' });
    return;
  }

  try {
    if (await bcrypt.compare(req.body.password, user.password)) {

      // Generate token
      const accessToken = generateAccessToken({ username: user.username });
      const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
      refreshTokens.push(refreshToken);

      res.json({ accessToken: accessToken, refreshToken: refreshToken });
    } else {
      res.status(403).json({ _error: 'Invalid credentials' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

// Refresh token
router.post('/token', (req, res) => {
  const refreshToken = req.body.token;

  if (refreshToken === null) { return res.sendStatus(401); }
  if (!refreshTokens.includes(refreshToken)) { return res.sendStatus(403); }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) { return res.sendStatus(403); }

    const accessToken = generateAccessToken({ username: user.username });
    res.json({ accessToken: accessToken });
  });
});

module.exports = router;