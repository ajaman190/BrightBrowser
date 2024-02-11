chrome.runtime.onInstalled.addListener(() => {
    // Set the default state of auto_scan to false on installation
    chrome.storage.sync.set({ accessToken: null });
    chrome.storage.local.set({ 'auto_scan': false }, () => {
      console.log('Auto Scan setting initialized to false.');
    });
  });
  
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.active) {
      chrome.storage.local.get(['auto_scan', 'accessToken'], (data) => {
        if (data.auto_scan && data.accessToken) {
          chrome.windows.create({
            url: chrome.runtime.getURL('pages/splash.html'),
            type: 'popup',
            width: 360, // Adjust width as needed
            height: 500 // Adjust height as needed
          }, (newWindow) => {
            console.log(`Popup opened with ID: ${newWindow.id}`);
          });
        }
      });
    }
  });