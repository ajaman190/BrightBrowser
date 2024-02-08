document.addEventListener('DOMContentLoaded', function() {
  initializePage();
});

function initializePage() {
  const automaticScanningEnabled = false; // Placeholder, fetch from user settings
  if (automaticScanningEnabled) {
      updateScanningContainer(2); // Case 2: Automatic scanning is enabled
  } else {
      updateScanningContainer(1); // Case 1: Automatic scanning is off
  }

  // Fetch and display educative content
  fetchEducativeContent();
}

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

function performScan() {
  // Placeholder for API call to initiate scanning
  setTimeout(displayScanResults, 3000); // Simulate scanning delay
}

function displayScanResults() {
  const scanningContainer = document.getElementById('scanning-container');
  scanningContainer.innerHTML = '<div>Total Detected: 20</div><div>Unique Pattern: 5</div><div>Rescues Initiated: 3</div>';
  document.getElementById('patternDropdown').style.display = 'block';
  populatePatternDropdown();
}

function populatePatternDropdown() {
  const patternDropdown = document.getElementById('patternDropdown');
  const patterns = ['Nagging', 'Misdirection', 'Hidden Costs']; // Placeholder patterns
  patternDropdown.innerHTML = patterns.map(pattern => `<option value="${pattern.toLowerCase()}">${pattern}</option>`).join('');
  patternDropdown.addEventListener('change', function() {
      displayPatternDetails(this.value);
  });
}

function displayPatternDetails(patternValue) {
  const patternDetails = document.getElementById('patternDetails');
  const details = {
      'nagging': 'Details about Nagging...',
      'misdirection': 'Details about Misdirection...',
      'hidden costs': 'Details about Hidden Costs...'
  };
  patternDetails.style.display = 'block';
  patternDetails.innerHTML = `<h3>${patternValue.charAt(0).toUpperCase() + patternValue.slice(1)}</h3><p>${details[patternValue]}</p>`;
}

function fetchEducativeContent() {
  const educativeContent = document.getElementById('educativeContent');
  // Placeholder for API call to get daily tips
  educativeContent.innerHTML = 'Daily tip: Keep an eye out for surprise charges during checkout...';
}

// Menu interaction
document.getElementById('menuButton').addEventListener('click', toggleMenu);

function toggleMenu() {
  const menu = document.getElementById('menu');
  menu.classList.toggle('menu-open');
}

// Close menu when user clicks outside of it
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
  // Handle logout functionality
});

// Redirect to other pages
document.getElementById('addDarkPatternButton').addEventListener('click', function() {
  window.location.href = 'report-dark-pattern.html'; // Replace with the actual page
});

document.getElementById('settingsButton').addEventListener('click', function() {
  window.location.href = 'settings.html'; // Replace with the actual page
});

document.getElementById('notificationButton').addEventListener('click', function() {
  window.location.href = 'notifications.html'; // Replace with the actual page
});

// Footer education button interaction
document.getElementById('educationButton').addEventListener('click', function() {
  // Could be used to show/hide educational content or navigate to an educational page
});
