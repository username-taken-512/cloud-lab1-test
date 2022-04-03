// Calculator

// Accepts an operator and two numbers
// Returns an object with a calculated result or an error
const calc = (op, num1, num2) => {
  const resultObj = {};
  const operators = {
    add: '+',
    sub: '-',
    mul: '*',
    div: '/'
  };
  const calcString = num1 + operators[op] + num2;

  // Clean the operators & operands and return error if needed
  const num1clean = parseFloat(num1) || null;
  const num2clean = parseFloat(num2) || null;
  if (num1clean === null || num2clean === null) {
    resultObj._error = `Requires two valid numbers. You sent: ${num1} & ${num2}`;
  } else if (operators[op] === undefined) {
    resultObj._error = `Unsupported operand: ${op}`;
  } else {  // When valid input, calculate
    resultObj.result = Function('return ' + num1 + operators[op] + num2)();
  }

  resultObj.calcString = calcString;  // Store calculation string along with result/error
  return resultObj;
}

module.exports = calc;