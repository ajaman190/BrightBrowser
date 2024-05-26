document.addEventListener('DOMContentLoaded', function() {
  checkAccessTokenAndInitialize();
});

async function checkAccessTokenAndInitialize() {
  const accessToken = localStorage.getItem('accessToken');
  setTimeout(() => {
    if (isValidToken(accessToken)) {
      initializeMainPage();
    } else {
        window.location.href = 'onboarding.html';
    }
  }, 500);
}

function isValidToken(token) {
  return token && token.length > 0;
}

async function initializeMainPage() {
  try {
    const userSettings = JSON.parse(localStorage.getItem('userSettings'));
    if (!userSettings) {
      await fetchUserSettings();
    }
    window.location.href = 'main.html';
  } catch (error) {
    console.error('Initialization Error:', error);
  }
}

async function fetchUserSettings() {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch('http://localhost:8000/user/settings/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    localStorage.setItem('userSettings', JSON.stringify({...data.user_settings, whitelist_urls: data.whitelist_urls}));
  } catch (error) {
    console.error('Fetch User Settings Error:', error);
  }
}
