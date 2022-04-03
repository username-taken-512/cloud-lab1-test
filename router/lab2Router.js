const express = require('express');
const router = express.Router();

const calc = require('../js/lab2Calc');   // Import backend calculator

// Operation (+, -, /, *), numberOne, numberTwo
router.get('/calc', (req, res) => {
  const op = req.query.operation || null;
  const num1 = req.query.numberOne || null;
  const num2 = req.query.numberTwo || null;

  // Immediately return an error if necessary parameter is missing
  if (op === null || num1 === null || num2 === null) {
    res.json({
      _error: `Necessary parameter missing. Requires 'operator', 'numberOne' & numberTwo'. Example path: '?operation=mul&numberOne=3&numberTwo=2`
    });
    return;
  }

  const calcResult = calc(op, num1, num2);  // Send input to calculator. 
  res.json(calcResult); // Return result if result exists or error if error
});

// Frontend page
router.get('/', (req, res) => {
  res.render('lab2', { text: "" })
});

module.exports = router;