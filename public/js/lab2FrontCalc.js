// Frontend to manage calculator form
document.getElementById('calc-form').addEventListener('submit', async (event) => {
  event.preventDefault();   // Stay on page

  // Get form values and create parameter string
  const form = document.forms['calc-form'].elements;
  const appendParams = `?numberOne=${form.numberOne.value}&operation=${form.operation.value}&numberTwo=${form.numberTwo.value}&`;

  // Query backend for result
  let result;
  try {
    result = await (await fetch(`/lab2/calc/${appendParams}`)).json();
  } catch (error) {
    result = { _error: 'Error contacting calculator' };
    console.log(error);
  }

  // Present result or error
  let html;
  if (result._error) {
    html = result._error;
  } else {
    html = `${result.calcString} = ${result.result}`
  }
  document.getElementById('result').innerHTML = html;
});