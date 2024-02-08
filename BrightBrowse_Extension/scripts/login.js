document.getElementById('backButton').addEventListener('click', () => {
  window.location.href = 'onboarding.html';
});

document.getElementById('togglePassword').addEventListener('click', () => {
  const passwordInput = document.getElementById('password');
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);
  this.classList.toggle('view');
});

document.getElementById('forgotPassword').addEventListener('click', () => {
  window.location.href = 'forgot-password.html';
});

document.getElementById('loginButton').addEventListener('click', () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  // Implement API call for login here...
  // On success, store the access token in storage and navigate to the main page
});

document.getElementById('googleLoginButton').addEventListener('click', () => {
  // Implement Google OAuth logic here...
});

document.getElementById('register').addEventListener('click', () => {
  window.location.href = 'register.html';
});

// Placeholder function for API call
function login(email, password) {
  fetch('api-endpoint-for-login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
  })
  .then(response => response.json())
  .then(data => {
      localStorage.setItem('accessToken', data.accessToken);
      window.location.href = 'main.html';
  })
  .catch(error => {
      console.error('Error:', error);
  });
}
