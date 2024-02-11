document.getElementById('backButton').addEventListener('click', () => {
    window.location.href = 'main.html';
});

function updateScanningContainer(caseNumber) {
    const scanningContainer = document.getElementById('scanning-container');
    switch(caseNumber) {
        case 1:
            scanningContainer.innerHTML = '<button id="scanButton">Scan the Page</button>';
            document.getElementById('scanButton').addEventListener('click', performScan);
            break;
        case 2:
            scanningContainer.innerHTML = '<img src="../assets/icons/scanning.gif" alt="Scanning..."><div id="cancelScan">Cancel Scan</div>';
            // Add cancellation functionality if needed
            performScan();
            break;
        case 3:
            displayScanResults();
            break;
        default:
            scanningContainer.innerHTML = 'Please choose an action.';
    }
  }

document.getElementById('addWebsite').addEventListener('click', () => {
    const whitelistEntries = document.getElementById('whitelistEntries');
    const newEntry = document.createElement('div');
    newEntry.innerHTML = `
        <input type="text" placeholder="https://example.com">
        <button class="removeWebsite">X</button>
    `;
    whitelistEntries.appendChild(newEntry);
});

document.getElementById('whitelistEntries').addEventListener('click', (event) => {
    if (event.target.className === 'removeWebsite') {
        event.target.parentElement.remove();
    }
});

document.getElementById('saveButton').addEventListener('click', () => {
    const sensitivity = document.getElementById('sensitivityLevel').value;
    const patterns = [...document.querySelectorAll('input[name="patterns"]:checked')].map(el => el.value);
    const automaticScanning = document.getElementById('automaticScanning').checked;
    const whitelistedWebsites = [...document.querySelectorAll('#whitelistEntries input[type="text"]')].map(el => el.value);

    // Here you would send the settings data to your backend API
    // Example: saveSettings({ sensitivity, patterns, automaticScanning, whitelistedWebsites });
});

function saveSettings(settings) {
    // This function should contain the API call to save the settings
    // As a placeholder, we log the settings to the console
    console.log('Settings to save:', settings);

    // Implement the API call to save the settings, for example using fetch:
    /*
    fetch('your-api-endpoint-to-save-settings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // Handle any post-save actions here
    })
    .catch((error) => {
        console.error('Error:', error);
        // Handle any errors here
    });
    */
}

document.getElementById('saveButton').addEventListener('click', () => {
    const sensitivity = document.getElementById('sensitivityLevel').value;
    // Map the sensitivity value from range input to meaningful labels
    const sensitivityLabel = { '1': 'Low', '2': 'Medium', '3': 'High' }[sensitivity];
    const patterns = [...document.querySelectorAll('input[name="patterns"]:checked')].map(el => el.value);
    const automaticScanning = document.getElementById('automaticScanning').checked;
    const whitelistedWebsites = [...document.querySelectorAll('#whitelistEntries input[type="text"]')].map(el => el.value);

    // Save settings by sending details to the backend using API
    saveSettings({ sensitivity: sensitivityLabel, patterns, automaticScanning, whitelistedWebsites });
});

// Initialize the settings when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Fetch and set the existing settings
    // This is a placeholder and should be replaced with actual logic
    /*
    fetch('your-api-endpoint-to-get-settings')
        .then(response => response.json())
        .then(data => {
            // Use the data to initialize the settings UI
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    */
});
