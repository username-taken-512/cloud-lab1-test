const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { text: "Lab1 special route" });
});

router.get('/:customText', (req, res) => {
  console.log(req.params);
  console.log(req.query);
  res.render('index', { text: 'Custom param text: ' + req.params.customText });
});

module.exports = router;