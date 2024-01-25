document.addEventListener('DOMContentLoaded', function() {
    var loginForm = document.getElementById('login-form');
  
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      // Here you would handle the login logic, possibly sending the email
      // and password to a server and handling the response.
  
      // For now, we'll just log to the console.
      console.log('Email:', document.getElementById('email').value);
      console.log('Password:', document.getElementById('password').value);
    });
    
    // Handle Google login click
    document.getElementById('google-login').addEventListener('click', function() {
      // Implement Google login logic here
      console.log('Google login clicked');
    });
  });
  