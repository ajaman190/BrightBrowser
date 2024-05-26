browser.runtime.onInstalled.addListener(() => {
    browser.storage.sync.set({ accessToken: null });
    browser.storage.local.set({ 'auto_scan': false }, () => {
      console.log('Auto Scan setting initialized to false.');
    });
});

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.active) {
    browser.storage.local.get(['auto_scan', 'accessToken', 'userSettings'], (data) => {
      // const isUrlWhitelisted = data.userSettings?.whitelist_urls.some(url => changeInfo.url.includes(url) || url.includes(changeInfo.url));
      if (data.auto_scan && data.accessToken) {
        browser.windows.create({
          url: browser.runtime.getURL('pages/main.html'),
          type: 'popup',
        }, (newWindow) => {
          if (newWindow) {
            console.log(`Popup opened with ID: ${newWindow.id}`);
          } else {
            console.error('Failed to open the popup.');
          }
        });
      }
    });
  }
});
