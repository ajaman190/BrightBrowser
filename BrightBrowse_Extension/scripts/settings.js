document.getElementById('backButton').addEventListener('click', () => {
    window.location.href = 'main.html';
});

document.getElementById('sensitivityLevel').addEventListener('input', function() {
    const value = this.value;
    // Hide all labels initially
    document.getElementById('lowLabel').style.display = 'none';
    document.getElementById('highLabel').style.display = 'none';

    if(value === '1') {
        document.getElementById('lowLabel').style.display = 'inline';
    } else if(value === '2') {
        document.getElementById('highLabel').style.display = 'inline';
    }
});

document.getElementById('addWebsite').addEventListener('click', () => {
    const whitelistEntries = document.getElementById('whitelistEntries');
    const newEntry = document.createElement('div');
    newEntry.innerHTML = `
        <input type="text" placeholder="https://example.com" aria-label="Website URL">
        <button class="removeWebsite" aria-label="Remove Website">X</button>
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
    const severity = { '1': 'low', '2': 'medium', '3': 'high' }[sensitivity];
    const allowed_pattern = [...document.querySelectorAll('input[name="patterns"]:checked')].map(el => el.value).join('|');
    const auto_scan = document.getElementById('automaticScanning').checked;
    const whitelist_urls = [...document.querySelectorAll('#whitelistEntries input[type="text"]')].map(el => el.value);
    
    saveSettings({ severity, allowed_pattern, auto_scan, whitelist_urls });
});

async function saveSettings(settings) {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch('http://localhost:8000/user/settings/update/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify(settings),
        });
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        localStorage.setItem('userSettings', JSON.stringify(settings));
        localStorage.setItem('auto_scan', settings.auto_scan);
        console.log('Settings saved successfully.');
        window.location.href ='main.html';
    } catch (error) {
        console.error('Update User Settings Error:', error);
    } 
}


document.addEventListener('DOMContentLoaded', function() {
    fetchAndPopulatePatterns();
});

async function fetchAndPopulatePatterns() {
    let patterns = localStorage.getItem('darkPatterns');
    let savedSettings = localStorage.getItem('userSettings');
    const accessToken = localStorage.getItem('accessToken');

    // Fetch the dark patterns list
    if (!patterns) {
        try {
            const response = await fetch('http://localhost:8000/scan/dark-pattern-types/', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}`,
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            patterns = JSON.stringify(await response.json());
            localStorage.setItem('darkPatterns', patterns);
        } catch (error) {
            console.error('Failed to fetch dark patterns:', error);
            return;
        }
    }

    // Fetch the saved settings
    if (!savedSettings) {
        try {
            const response = await fetch('http://localhost:8000/user/settings/', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}`,
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            savedSettings = await response.json();
            localStorage.setItem('auto_scan', savedSettings.auto_scan);

            saveSettings = JSON.stringify(savedSettings);
            localStorage.setItem('userSettings', JSON.stringify(savedSettings));
        } catch (error) {
            console.error('Failed to fetch saved settings:', error);
            return;
        }
    }

    // Populate the patterns
    savedSettings = await JSON.parse(savedSettings);
    patterns = await JSON.parse(patterns);
    populateSettings(savedSettings, patterns);
}

function populateSettings(settings, patterns) {
    console.log(settings, patterns);

    if (settings) {
        // Set the sensitivity level
        const severityToValue = { 'low': '1', 'high': '2' };
        document.getElementById('sensitivityLevel').value = severityToValue[settings.severity ? settings.severity : 'low'];
        document.getElementById('sensitivityLevel').dispatchEvent(new Event('input'));

        // Mark selected patterns
        const allowedPatterns = settings.allowed_pattern ? settings.allowed_pattern.split('|') : [];
        const fieldset = document.getElementById('allowedPatternList');

        // Ensure patterns is an array
        if (!Array.isArray(patterns)) {
            console.error('Expected patterns to be an array, but received:', patterns);
            patterns = [];
        }

        patterns.forEach(pattern => {
            const label = document.createElement('label');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.name = 'patterns';
            checkbox.value = pattern.title;
            checkbox.checked = allowedPatterns.includes(pattern.title);
            label.appendChild(checkbox);
            label.append(` ${pattern.title}`);
            fieldset.appendChild(label);
        });

        // Set automatic scanning
        document.getElementById('automaticScanning').checked = settings.auto_scan ? settings.auto_scan : false;

        // Populate whitelist URLs
        if (settings.whitelist_urls?.length) {
            const whitelistEntries = document.getElementById('whitelistEntries');
            whitelistEntries.innerHTML = '';
            settings.whitelist_urls.forEach(url => {
                const newEntry = document.createElement('div');
                newEntry.innerHTML = `
                    <input type="text" placeholder="https://example.com" value="${url}" aria-label="Website URL">
                    <button class="removeWebsite" aria-label="Remove Website">X</button>
                `;
                whitelistEntries.appendChild(newEntry);
            });
        }
    }
}


// document.addEventListener('DOMContentLoaded', function() {
//     // Attempt to read the saved settings from localStorage
//     const savedSettings = localStorage.getItem('userSettings');
//     if (savedSettings) {
//         const settings = JSON.parse(savedSettings);

//         // Set the sensitivity level
//         if (settings.severity) {
//             const severityToValue = { 'Low': '1', 'Medium': '2', 'High': '3' };
//             document.getElementById('sensitivityLevel').value = severityToValue[settings.severity];
//             // Manually trigger the input event to update the visibility of severity labels
//             document.getElementById('sensitivityLevel').dispatchEvent(new Event('input'));
//         }

//         // Set the allowed patterns
//         if (settings.allowedPattern) {
//             const patterns = settings.allowedPattern.split('|');
//             patterns.forEach(pattern => {
//                 const input = document.querySelector(`input[name="patterns"][value="${pattern}"]`);
//                 if (input) {
//                     input.checked = true;
//                 }
//             });
//         }

//         // Set automatic scanning
//         if (settings.autoScan !== undefined) {
//             document.getElementById('automaticScanning').checked = settings.autoScan;
//         }

//         // Populate whitelist URLs
//         if (settings.whitelistUrls && settings.whitelistUrls.length) {
//             const whitelistEntries = document.getElementById('whitelistEntries');
//             settings.whitelistUrls.forEach(url => {
//                 const newEntry = document.createElement('div');
//                 newEntry.innerHTML = `
//                     <input type="text" placeholder="https://example.com" value="${url}" aria-label="Website URL">
//                     <button class="removeWebsite" aria-label="Remove Website">X</button>
//                 `;
//                 whitelistEntries.appendChild(newEntry);
//             });
//         }
//     }
// });