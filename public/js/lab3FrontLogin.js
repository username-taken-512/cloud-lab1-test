// Login management

document.getElementById('login-form').addEventListener('submit', event => {
  event.preventDefault();

  const loginForm = document.forms['login-form'].elements;
  login(loginForm.username.value, loginForm.password.value);
});

// Login - Request token
async function login(username, password) {
  console.log('login:', username, password);

  // Attempt to login, store response in result
  let result;
  let response;
  try {
    result = await (response = await fetch('/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })).json();
  } catch (error) {
    console.log(error);
  }

  console.log('result', result);
  console.log('response', response);
  switch (response.status) {
    case 403:
      alert('Authentication failed');
      break;
    case 500:
      alert('General error');
      break;
    case 200:
      alert('Login succesful');
      // Store tokens
      window.sessionStorage.setItem('accessToken', result.accessToken);
      window.sessionStorage.setItem('refreshToken', result.refreshToken);

      setInterval(() => {
        refreshToken();
      }, 5000);
      break;
  }
}

// Get stored auth token
function getAccessToken() { return window.sessionStorage.getItem('accessToken') || null }

// Refresh access token
async function refreshToken() {
  console.log('Refreshing token');
  let result;
  let response;
  try {
    result = await (response = await fetch('/users/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: window.sessionStorage.getItem('refreshToken')
      })
    })).json();
  } catch (error) {
    console.log(error);
  }

  if (response.status === 200) {
    console.log('Refresh - Storing new token: ', result.accessToken);
    window.sessionStorage.setItem('accessToken', result.accessToken);
  }
}