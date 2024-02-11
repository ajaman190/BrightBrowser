document.addEventListener('DOMContentLoaded', function() {
  initializePage();
});


let dummyDataIndex = localStorage.getItem('count') || 0;
const dummyData = [
  {
      "scan_id": "123",
      "url": "https://www.amazon.in/Graphite-Badminton-Racquet-Tension-Aerodynamic/dp/B0CKNGB9NZ/ref=sr_1_1_sspa?qid=1707489524&refinements=p_n_pct-off-with-tax%3A2665401031&s=sports&sr=1-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGZfYnJvd3Nl&psc=1",
      "severity": "low",
      "results": [
          {
              "index": "1",
              "text": "In stock",
              "dark_pattern": "Deceptive UI Dark Pattern",
              "sub_dark_pattern": "Scarcity",
              "solution": "Check the delivery details before ordering"
          },
          {
              "index": "2",
              "text": "Order within 21 hrs 4 mins",
              "dark_pattern": "Deceptive UI Dark Pattern",
              "sub_dark_pattern": "Urgency",
              "solution": "See details of the offer before buying"
          },
          {
              "index": "3",
              "text": "Only 2 left in stock",
              "dark_pattern": "Deceptive UI Dark Pattern",
              "sub_dark_pattern": "Scarcity",
              "solution": "Check similar products for better pricing"
          },
          {
              "index": "4",
              "text": "10K+ viewed in past month",
              "dark_pattern": "Deceptive UI Dark Pattern",
              "sub_dark_pattern": "Social proof",
              "solution": "Check the product and ordering information in details"
          },
          {
              "index": "5",
              "text": "I thanks Amazon for launching this quality product",
              "dark_pattern": "Fake Review",
              "sub_dark_pattern": "Scarcity",
              "solution": "Look for reviews with detail description"
          },
          {
              "index": "6",
              "text": "Good Better Best",
              "dark_pattern": "Fake Review",
              "sub_dark_pattern": "Misdirection",
              "solution": "Look for reviews with detail description"
          },
          {
              "index": "7",
              "text": "Sponsored",
              "dark_pattern": "Deceptive UI Dark Pattern",
              "sub_dark_pattern": "Misdirection",
              "solution": "Search for the same product in the e-commerce website"
          },
          {
              "index": "8",
              "text": "Sponsored",
              "dark_pattern": "Deceptive UI Dark Pattern",
              "sub_dark_pattern": "Misdirection",
              "solution": "Search for the same product in the e-commerce website"
          },
          {
              "index": "",
              "text": "Sponsored",
              "dark_pattern": "Deceptive UI Dark Pattern",
              "sub_dark_pattern": "Misdirection",
              "solution": "Search for the same product in the e-commerce website"
          }
      ]
  },
  {
      "scan_id": "456",
      "url": "https://www.ebay.com/b/OMEGA-Watches/31387/bn_3000908",
      "severity": "high",
      "results": [
          {
              "index": "0",
              "text": "Benifits charity",
              "dark_pattern": "Deceptive UI Dark Pattern",
              "sub_dark_pattern": "Social proof",
              "solution": "Check the product and ordering information in details"
          },
          {
              "index": "1",
              "text": "12 watching",
              "dark_pattern": "Deceptive UI Dark Pattern",
              "sub_dark_pattern": "Social proof",
              "solution": "Check the product and ordering information in details"
          },
          {
              "index": "2",
              "text": "Only 1 left!",
              "dark_pattern": "Deceptive UI Dark Pattern",
              "sub_dark_pattern": "Scarcity",
              "solution": "Check similar products for better pricing"
          },
          {
              "index": "3",
              "text": "Only 1 left!",
              "dark_pattern": "Deceptive UI Dark Pattern",
              "sub_dark_pattern": "Scarcity",
              "solution": "Check similar products for better pricing"
          },
          {
              "index": "4",
              "text": "35 watching",
              "dark_pattern": "Deceptive UI Dark Pattern",
              "sub_dark_pattern": "Social proof",
              "solution": "Check the product and ordering information in details"
          },
          {
              "index": "5",
              "text": "14 watching",
              "dark_pattern": "Deceptive UI Dark Pattern",
              "sub_dark_pattern": "Social proof",
              "solution": "Check the product and ordering information in details"
          },
          {
              "index": "6",
              "text": "41 watching",
              "dark_pattern": "Deceptive UI Dark Pattern",
              "sub_dark_pattern": "Social proof",
              "solution": "Check the product and ordering information in details"
          },
          {
              "index": "7",
              "text": "17 watching",
              "dark_pattern": "Deceptive UI Dark Pattern",
              "sub_dark_pattern": "Social proof",
              "solution": "Check the product and ordering information in details"
          },
          {
              "index": "8",
              "text": "17 Sold!",
              "dark_pattern": "Deceptive UI Dark Pattern",
              "sub_dark_pattern": "Scarcity",
              "solution": "Check similar products for better pricing"
          },
          {
              "index": "9",
              "text": "39 watching",
              "dark_pattern": "Deceptive UI Dark Pattern",
              "sub_dark_pattern": "Social proof",
              "solution": "Check the product and ordering information in details"
          },
          {
              "index": "10",
              "text": "13h 16m",
              "dark_pattern": "Deceptive UI Dark Pattern",
              "sub_dark_pattern": "Urgency",
              "solution": "Check offer details for more information"
          }
      ]
  }
]
;

async function initializePage() {
  const autoScanSetting = JSON.parse(localStorage.getItem('auto_scan') || 'false');
  
  // Update the scanning container based on the autoScanSetting
  updateScanningContainer(autoScanSetting ? 2 : 1);
  
  fetchWebsiteInfo();
  fetchEducativeContent();
}

function fetchWebsiteInfo() {
  browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
    const currentTab = tabs[0];
    const tabUrl = currentTab.url;
    const faviconUrl = currentTab.favIconUrl || '../assets/icons/website-logo.png';

    const websiteInfoContainer = document.getElementById('website-info');
    websiteInfoContainer.innerHTML = `
      <img src="${faviconUrl}" class="browser_icon" alt="Website Icon">
      <span id="websiteURL" class="browser_url">${tabUrl.slice(0,36)+'...'}</span>
    `;
  }).catch((error) => {
    return
  });
}


// function fetchWebsiteInfo() {
//   // This function should fetch the current page logo and URL using browser or chrome APIs
//   // For demonstration purposes, placeholders are used
//   const websiteInfoContainer = document.getElementById('website-info');
//   websiteInfoContainer.innerHTML = `
//     <img src="../assets/icons/website-icon.png" alt="Website Icon">
//     <span id="websiteURL">https://www.example.com</span>
//   `;
// }

function updateScanningContainer(caseNumber) {
  const scanningContainer = document.getElementById('scanning-container');
  switch(caseNumber) {
    case 1:
        scanningContainer.innerHTML = `
          <button id="scanButton" class="button">Start Scan</button>
        `;
        document.getElementById('scanButton').addEventListener('click', performScan);
        break;
    case 2:
        scanningContainer.innerHTML = `
          <img src="../assets/icons/search.svg" class="search_icon" alt="Scanning...">
          <div id="cancelScanButton" class="button">Cancel Scan</div>
        `;
        document.getElementById('cancelScanButton').addEventListener('click', cancelScan);
        performScan();
        break;
  }
}

function performScan() {
  // Simulate an API call to initiate scanning with a timeout
  const scanningContainer = document.getElementById('scanning-container');
  scanningContainer.innerHTML = `
    <img src="../assets/icons/search.svg" class="search_icon"  alt="Scanning...">
    <div class="scanning-text">Scanning...</div>
  `;
  // setTimeout(() => {
  //   const scanId = 'SCAN_ID'; // This should be retrieved from the API response
  //   localStorage.setItem('scan_id', scanId);
  //   displayScanResults(scanId); // Pass the scanId to display the results
  // }, 3000); // Simulate a 3-second API call delay

  setTimeout(() => {
    if(dummyDataIndex >= dummyData.length) dummyDataIndex = 0;
    const scanData = dummyData[dummyDataIndex++];
    localStorage.setItem('count', dummyDataIndex);
    localStorage.setItem('scan_data', JSON.stringify(scanData));
    displayScanResults(scanData);
  }, 3000);
}

function cancelScan() {
  // Placeholder for functionality to cancel the scan
  // Depending on the API, you might need to send a cancellation request here
  updateScanningContainer(1);
}

// function displayScanResults(scanId) {
//   // Simulate fetching scan results after getting a scanId
//   const scanningContainer = document.getElementById('scanning-container');
//   scanningContainer.innerHTML = `
//     <div>Total Detected: 20</div>
//     <div>Unique Pattern: 5</div>
//     <div>Rescues Initiated: 3</div>
//   `;
//   // Display the dropdown and populate it with the results
//   document.getElementById('patternDropdown').style.display = 'block';
//   populatePatternDropdown();
// }


// scanningContainer.innerHTML = `
//   <div>Total Detected${scanData.results.length}</div>
//   <div>Unique Pattern ${new Set(scanData.results.map(result => result.dark_pattern)).size}</div>
//   <div>Rescues Initiated ${scanData.results.filter(result => result.solution).length}</div>
// `;

function displayScanResults(scanData) {
  const scanningContainer = document.getElementById('scanning-container');
  scanningContainer.innerHTML = `
  <div class="statistic-box">
    <span class="statistic-value red">${scanData.results.length}</span>
    <label class="statistic-label">Total Detected</label>
  </div>
  <div class="statistic-box">
    <span class="statistic-value orange">${new Set(scanData.results.map(result => result.sub_dark_pattern)).size}</span>
    <label class="statistic-label">Unique Pattern</label>
  </div>
  <div class="statistic-box">
    <span class="statistic-value green">${scanData.results.filter(result => result.solution).length}</span>
    <label class="statistic-label">Rescues Initiated</label>
  </div>
`;
  document.getElementById('patternDropdown').style.display = 'block';
  populatePatternDropdown(scanData);
}

function populatePatternDropdown(scanData) {
  const uniquePatterns = ['All', ...new Set(scanData.results.map(result => result.sub_dark_pattern))];
  const patternDropdown = document.getElementById('patternDropdown');
  patternDropdown.innerHTML = uniquePatterns.map(pattern => `<option value="${pattern}">${pattern}</option>`).join('');

  patternDropdown.addEventListener('change', function() {
    displayPatternDetails(scanData, this.value);
  });
}

function displayPatternDetails(scanData, selectedPattern) {
  const patternDetails = document.getElementById('patternDetails');
  let filteredResults = scanData.results;
  
  if (selectedPattern !== 'All') {
    filteredResults = scanData.results.filter(result => result.sub_dark_pattern === selectedPattern);
  }

  const resultCards = filteredResults.map(result => `
    <div>
      <div class="result-card">
        <h3>Dark Pattern ${result.sub_dark_pattern}</h3>
        <p>Reported as: ${result.dark_pattern}</p>
        <p class="red">${result.text}</p>
        <div class="solution-div">
          <p class="green"><strong>Solution:</strong> ${result.solution}</p>
        </div>
      </div>
      <div class="row">
        <p>Feedback:</p>
        <img src="../assets/icons/like.svg" alt="postive"/>
        <img src="../assets/icons/dislike.svg" alt="false positve"/>
      </div>
    </div>
  `).join('');
  
  patternDetails.style.display = 'block';
  patternDetails.innerHTML = resultCards;
}


// function populatePatternDropdown() {
//   const patternDropdown = document.getElementById('patternDropdown');
//   const patterns = ['Nagging', 'Misdirection', 'Hidden Costs']; // Placeholder for actual patterns
//   patternDropdown.innerHTML = patterns.map(pattern => `<option value="${pattern.toLowerCase()}">${pattern}</option>`).join('');
//   patternDropdown.addEventListener('change', function() {
//     displayPatternDetails(this.value);
//   });
// }

// function displayPatternDetails(patternValue) {
//   const patternDetails = document.getElementById('patternDetails');
//   const details = {
//     'nagging': 'Details about Nagging...',
//     'misdirection': 'Details about Misdirection...',
//     'hidden costs': 'Details about Hidden Costs...'
//   };
//   patternDetails.style.display = 'block';
//   patternDetails.innerHTML = `
//     <h3>${patternValue.charAt(0).toUpperCase() + patternValue.slice(1)}</h3>
//     <p>${details[patternValue]}</p>
//   `;
// }

function fetchEducativeContent() {
  const educativeContent = document.getElementById('educativeContent');
  // Placeholder for fetching educative content
  educativeContent.innerHTML = 'Daily tip: Keep an eye out for surprise charges during...';
}

// Menu interaction
document.getElementById('menuButton').addEventListener('click', toggleMenu);

function toggleMenu() {
  const menu = document.getElementById('menu');
  menu.classList.toggle('menu-open');
}


window.addEventListener('click', function(event) {
  const menu = document.getElementById('menu');
  if (event.target !== menu && event.target !== document.getElementById('menuButton')) {
      menu.classList.remove('menu-open');
  }
});

// Menu navigation
document.getElementById('profileButton').addEventListener('click', function() {
  // Redirect to profile page
});
document.getElementById('historyButton').addEventListener('click', function() {
  // Redirect to history & insights page
});
document.getElementById('educationMenuButton').addEventListener('click', function() {
  // Redirect to education page
});
document.getElementById('feedbackButton').addEventListener('click', function() {
  // Redirect to feedback page
});

document.getElementById('logoutButton').addEventListener('click', function() {
  localStorage.clear();
  window.location.href = 'onboarding.html';
});


document.getElementById('addDarkPatternButton').addEventListener('click', function() {
  window.location.href = 'report-dark-pattern.html';
});

document.getElementById('settingsButton').addEventListener('click', function() {
  window.location.href = 'settings.html';
});

document.getElementById('notificationButton').addEventListener('click', function() {
  window.location.href = 'notifications.html';
});

// Footer education button interaction
document.getElementById('educationButton').addEventListener('click', function() {
  // Could be used to show/hide educational content or navigate to an educational page
});
