document.addEventListener('DOMContentLoaded', function() {
    var loginButton = document.getElementById('login');
    var registerButton = document.getElementById('register');
  
    loginButton.addEventListener('click', function() {
      // Code to transition from onboarding to login page
      window.location.href = 'LoginPage.html'; // Assuming you have a LoginPage.html
    });
  
    registerButton.addEventListener('click', function() {
      // Code to transition from onboarding to registration page
      window.location.href = 'SignupPage.html'; // Assuming you have a SignupPage.html
    });
  
    // Initialize any carousel functionality here if you're using a library
  });
  