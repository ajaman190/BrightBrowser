document.getElementById('backButton').addEventListener('click', () => {
    window.location.href = 'main.html';
});

document.getElementById('submitReport').addEventListener('click', () => {
    const websiteUrl = document.getElementById('websiteUrl').value;
    const darkPatternCategory = document.getElementById('darkPatternCategory').value;
    const patternTopic = document.getElementById('patternTopic').value;
    const patternDescription = document.getElementById('patternDescription').value;
    const solution = document.getElementById('solution').value;
    
    // Validate input fields as necessary
    
    // Implement the API call to report the dark pattern
    reportDarkPattern({ websiteUrl, darkPatternCategory, patternTopic, patternDescription, solution });
});

// Function to report the dark pattern and handle the response
function reportDarkPattern(data) {
    fetch('api-endpoint-for-reporting-dark-pattern', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        // Redirect to the main page on successful report submission
        window.location.href = 'main.html';
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle error scenarios, perhaps show a message to the user
    });
}
