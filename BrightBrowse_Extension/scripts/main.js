document.addEventListener('DOMContentLoaded', function() {
  initializePage();
});

async function initializePage() {
  const autoScanSetting = await JSON.parse(localStorage.getItem('auto_scan') || 'false');
  const scanResults = await JSON.parse(localStorage.getItem('scanResults'));
  const tabUrl = await fetchWebsiteInfo();
  if(scanResults.url === tabUrl) {
    updateScanningContainer(3, scanResults);
  } else {
    updateScanningContainer(autoScanSetting ? 2 : 1, {});
  }
  fetchEducativeContent();
}

function fetchWebsiteInfo() {
  return browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
    const currentTab = tabs[0];
    const tabUrl = currentTab.url;
    const faviconUrl = currentTab.favIconUrl || '../assets/icons/website-logo.png';

    const websiteInfoContainer = document.getElementById('website-info');
    websiteInfoContainer.innerHTML = `
      <img src="${faviconUrl}" class="browser_icon" alt="Website Icon">
      <span id="websiteURL" class="browser_url">${tabUrl.slice(0,36)+'...'}</span>
    `;
    return tabUrl;
  }).catch((error) => {
    return null;
  });
}

function updateScanningContainer(caseNumber, scanResults) {
  const scanningContainer = document.getElementById('scanning-container');
  switch(caseNumber) {
    case 1:
        scanningContainer.innerHTML = `
          <button id="scanButton" class="button">Start Scan</button>
        `;
        document.getElementById('scanButton').addEventListener('click', createScan);
        break;
    case 2:
        scanningContainer.innerHTML = `
          <img src="../assets/icons/search.svg" class="search_icon" alt="Scanning...">
          <div id="cancelScanButton" class="button">Cancel Scan</div>
        `;
        document.getElementById('cancelScanButton').addEventListener('click', cancelScan);
        break;
    case 3:
      displayScanResults(scanResults);
  }
}

function extractAndJoinTextContent() {
  let allText = '';
  function walkTheDOM(node, func) {
      func(node);
      node = node.firstChild;
      while (node) {
          walkTheDOM(node, func);
          node = node.nextSibling;
      }
  }

  function handleNode(node) {
      if (node.nodeType === 1 && !['SCRIPT', 'STYLE'].includes(node.tagName)) {
          if (!node.children.length) {
              const text = node.innerText || node.textContent.trim();
              if (text) {
                  allText += text + '<bbext>';
              }
          }
      }
  }
  walkTheDOM(document.body, handleNode);
  return allText;
}

function createScan(){
  const scanningContainer = document.getElementById('scanning-container');
  scanningContainer.innerHTML = `
    <img src="../assets/icons/search.svg" class="search_icon"  alt="Scanning...">
    <div class="scanning-text">Scanning...</div>
  `;
  browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
    fetch('http://localhost:8000/scan/create/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
      },
      body: JSON.stringify({
        url: tabs[0].url, 
        severity: "high" 
      })
    })
    .then(response => response.json())
    .then(data => {
      localStorage.setItem('scanid', data.scan_id)
      performScan(data.scan_id);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }).catch((error) => {
    console.error('Failed to extract content:', error);
  });
}

function performScan(scan_id) {
  const scandata = localStorage.getItem('scanResults')
  const last_scan = scandata? JSON.parse(scandata):{}
  if (Object.keys(last_scan).length==0 || last_scan.scan_id!=scan_id){

    browser.tabs.executeScript({
      code: `(${extractAndJoinTextContent.toString()})()`
    }).then((results) => {
      let extractedContent = results[0];

      fetch('http://localhost:8000/scan/start/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        },
        body: JSON.stringify({
          scan_id: scan_id,
          content: extractedContent,
        })
      })
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('scanResults',JSON.stringify(data))
        displayScanResults(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      
  
    }).catch((error) => {
      console.error('Failed to extract content:', error);
    });
  }
}

function cancelScan() {
  // Placeholder for functionality to cancel the scan
  // Depending on the API, you might need to send a cancellation request here
  updateScanningContainer(1);
}

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
  let filteredResults = selectedPattern !== 'All'? scanData.results.filter(result => result.sub_dark_pattern === selectedPattern):scanData.results;

  highlightMatchingElements(filteredResults);
  const resultCards = filteredResults.map(result => `
    <div class="result-card">
      <div class="result-card-inner">
          <p class="result-pattern">${result.dark_pattern}</p>
          <p class="result-sub-pattern">Sub Dark Pattern: ${result.sub_dark_pattern}</h3>
          <p class="result-pattern-text">${result.text}</p>
      </div>
      <div class="solution-div">
          <p class="result-pattern-solution"><strong>Solution:</strong> ${result.solution}</p>
      </div>
      <div class="row items-center">
          <p class="feedback">Feedback:</p>
          <img src="../assets/icons/like.svg" alt="postive" class="feedback-icon"/>
          <img src="../assets/icons/dislike.svg" alt="false positve" class="feedback-icon"/>
      </div>
    </div>
  `).join('');
  
  patternDetails.style.display = 'block';
  patternDetails.innerHTML = resultCards;
}

function highlightMatchingElements(response) {
  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  const dpTexts = response.map(pattern => new RegExp(escapeRegExp(pattern.text), 'i'));

  const targetSelectors = ['p', 'a', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
  
  function applyHighlights() {
    const targetElements = document.querySelectorAll(targetSelectors.join(','));
  
    targetElements.forEach(element => {
      if (!element.hasAttribute('data-highlighted')) {
        const elementText = element.innerText || element.textContent;
  
        if (dpTexts.some(pattern => pattern.test(elementText))) {
          element.style.border = '2px solid red';
          element.setAttribute('data-highlighted', 'true');
        }
      }
    });
  }

  applyHighlights();

  // Use MutationObserver to handle dynamic content
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length) {
        applyHighlights();
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

function fetchEducativeContent() {
  const educativeContent = document.getElementById('educativeContent');
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
