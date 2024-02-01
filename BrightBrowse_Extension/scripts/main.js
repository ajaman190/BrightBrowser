document.addEventListener('DOMContentLoaded', function() {
    const scanButton = document.getElementById('scan-site');
    const currentSiteUrlSpan = document.getElementById('current-site-url');
    const addDarkPatternButton = document.getElementById('add-dark-pattern');
    
    // Fetch the current tab URL
    function getCurrentTabUrl(callback) {
      let queryInfo = { active: true, currentWindow: true };
  
      chrome.tabs.query(queryInfo, (tabs) => {
        let tab = tabs[0];
        let url = tab.url;
        console.assert(typeof url == 'string', 'tab.url should be a string');
        callback(url);
      });
    }
  
    // Display the current tab URL
    function renderURL(statusText) {
      currentSiteUrlSpan.textContent = statusText;
    }
  
    // Call this function on the content of the page
    getCurrentTabUrl((url) => {
      renderURL(url);
    });
  
    // Handle automatic scan if enabled in settings
    chrome.storage.local.get(['autoScanEnabled'], function(result) {
      if (result.autoScanEnabled) {
        scanCurrentSite();
      }
    });
  
    // Manual scan button click event
    scanButton.addEventListener('click', function() {
      scanCurrentSite();
    });
  
    // Function to handle scanning of current site
    function scanCurrentSite() {
      getCurrentTabUrl((url) => {
        // Here you would implement the API call to the backend with the URL
        // Optionally send filtered source code instead of URL
        console.log('Scanning site: ', url);
        // Add your API call logic here
      });
    }
  
    // Add dark pattern button event
    addDarkPatternButton.addEventListener('click', function() {
      // Logic to add dark pattern report
      console.log('Add dark pattern clicked');
      // Open form or page to add dark pattern
    });
  
    // More code to handle detected patterns and display stats...
  });
  