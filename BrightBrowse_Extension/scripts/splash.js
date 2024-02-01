// Assuming the access token is stored in browser storage
function checkAccessToken() {
  browser.storage.local.get("accessToken", function(items) {
    setTimeout(function() {
        if (items.accessToken) {
            // If token exists, redirect to home page
            window.location.href = 'main.html';
        } else {
            // If no token, redirect to onboarding page
            window.location.href = 'onboarding.html';
        }
    },2000)
  });
}

// Call the function when the script loads
checkAccessToken();