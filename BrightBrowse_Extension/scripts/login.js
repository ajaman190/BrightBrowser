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

  login(email, password);
});

document.getElementById('googleLoginButton').addEventListener('click', () => {
  // Implement Google OAuth logic here...
});

document.getElementById('register').addEventListener('click', () => {
  window.location.href = 'register.html';
});

function login(email, password) {
  fetch('http://localhost:8000/user/login/', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
  })
  .then(response => {
    console.log(response)
    if (!response.ok) {
      throw new Error('Login failed');
    }
    return response.json();
  })
  .then(data => {
    console.log("Data: ", JSON.stringify(data))
      localStorage.setItem('accessToken', data.access);
      window.location.href = 'main.html';
  })
  .catch(error => {
      console.log(error);
      console.error('Error:', error);
  });
}
