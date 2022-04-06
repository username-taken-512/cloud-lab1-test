// Frontend to manage Word Counter form

// Returns text content of file
async function loadFile(file) {
  return await file.text();
}

// File upload listener
document.getElementById('loadfile').addEventListener('change', async event => {
  const text = await loadFile(document.getElementById('loadfile').files[0]);  // Load text from file

  // Put text into text area
  const textArea = document.forms['word-form'].elements.textinput;
  textArea.innerText = text;
  textArea.value = text;
});

// Input form listener
document.getElementById('word-form').addEventListener('submit', async event => {
  event.preventDefault(); // Stay on page

  console.log('Attempt to get session accessToken: ', getAccessToken());

  const textInput = document.forms['word-form'].elements.textinput.value; // Get form input

  // POST to REST API
  let response;
  let result;
  try {
    response = await (await fetch('/lab3/getWordLengthFrequency', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getAccessToken()
      },
      body: JSON.stringify({
        data: textInput.trim(),
      })
    }));
    console.log(response);
    if (response.status === 200) { result = await response.json() }

  } catch (error) {
    console.log(error);
  }

  if (response.status === 403) {
    alert('Authentication error! Login first!');
    return;
  }

  if (result) {
    drawResultTable(result);  // Draw result
  }
});

// Receives string with counts (example: '0 2 4 1 2 4 5 1') and renders a table
function drawResultTable(result) {
  const resultArray = result.trim().split(' ');   // Create loopable array from string
  const container = document.querySelector('.result-container');
  let html = `
    <h2>Results</h2>
    <table>
      <thead>
        <tr>
          <th>Word Length</th>
          <th>Count</th>
        </tr>
      </thead>
      <tbody>
  `;

  resultArray.forEach((element, index) => {
    html += `
    <tr>
      <td>
        ${index + 1}
      </td>
      <td>
        ${element}
      </td>
    </tr>
    `;
  });
  html += `</tbody></table>`;
  container.innerHTML = html;
}