const express = require('express');
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const auth = require('../js/auth');
const authenticateToken = auth.authenticateToken;

const getWordLengthFrequency = require('../js/lab3WordLengthFrequency');   // Import backend Word counter


router.post('/getWordLengthFrequency', authenticateToken, (req, res) => {
  const wordCount = getWordLengthFrequency(req.body.data, 10);  // (data, maxWordLengthToCount)
  res.json(wordCount);
});

router.get('/', (req, res) => {
  res.render('lab3', { results: [1, 2] })
});

module.exports = router;