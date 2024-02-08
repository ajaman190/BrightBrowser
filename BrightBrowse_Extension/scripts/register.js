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
    
    // Implement API call for registration here...
    // On successful registration, store the access token and navigate to the main page
});

document.getElementById('googleSignUpButton').addEventListener('click', () => {
    // Implement Google OAuth logic for sign-up here...
});

document.getElementById('login').addEventListener('click', () => {
    window.location.href = 'login.html';
});

// Placeholder function for API call
function register(fullName, email, password) {
    fetch('api-endpoint-for-registration', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName, email, password }),
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
