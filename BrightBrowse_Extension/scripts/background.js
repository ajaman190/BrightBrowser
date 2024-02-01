chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ accessToken: null });
});