document.addEventListener('DOMContentLoaded', function() {
  checkAccessToken();
});

function checkAccessToken() {
  const accessToken = localStorage.getItem('accessToken');
  setTimeout(() => {
    if (isValidToken(accessToken)) {
        window.location.href = 'main.html';
    } else {
        window.location.href = 'onboarding.html';
    }
  }, 1000);
}

function isValidToken(token) {
  return token && token.length > 0;
}
