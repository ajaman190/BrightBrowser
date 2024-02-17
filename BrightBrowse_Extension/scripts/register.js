document.getElementById('backButton').addEventListener('click', () => {
    window.location.href = 'onboarding.html';
  });
  
  document.getElementById('registerButton').addEventListener('click', () => {
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if(password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    const { firstName, lastName } = parseName(fullName); // Corrected variable names here
    
    register(firstName, lastName, email, password, confirmPassword);
  });
  
  document.getElementById('googleSignUpButton').addEventListener('click', () => {
    // Implement Google OAuth logic for sign-up here...
  });
  
  document.getElementById('login').addEventListener('click', () => {
    window.location.href = 'login.html';
  });
  
  // Placeholder function for API call
  function register(firstName, lastName, email, password, confirm_password) {
    fetch('http://localhost:8000/user/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ first_name: firstName, last_name: lastName, email, password, confirm_password}), // Adjusted key names
    })
    .then(response => response.json())
    .then(data => {
    //   localStorage.setItem('accessToken', data.accessToken);
        window.location.href = 'login.html';
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  
  function parseName(fullName) {
    const parts = fullName.trim().split(/\s+/);
    let nameParts = { firstName: '', lastName: '' };
  
    if (parts.length === 1) {
      nameParts.firstName = parts[0];
    } else {
      nameParts.firstName = parts[0];
      nameParts.lastName = parts.slice(1).join(' '); // Corrected to handle middle names as part of the last name
    }
  
    return nameParts;
  }
  