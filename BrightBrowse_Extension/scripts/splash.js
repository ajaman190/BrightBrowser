document.addEventListener('DOMContentLoaded', function() {
  checkAccessToken();
});

function checkAccessToken() {
  const accessToken = localStorage.getItem('accessToken');
  if (isValidToken(accessToken)) {
      window.location.href = 'main.html';
  } else {
      window.location.href = 'onboarding.html';
  }
}

function isValidToken(token) {
  // Implement token validation logic here
  // This is a placeholder function. It should contain actual logic to validate the access token.
  return token && token.length > 0; // Example condition
}
