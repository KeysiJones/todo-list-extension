export const isChromeExtension = typeof chrome !== 'undefined' && chrome.storage;

export const loadTheme = () => {
  if (isChromeExtension) {
    return new Promise((resolve) => {
      chrome.storage.local.get(['darkMode'], (result) => {
        resolve(result.darkMode || false);
      });
    });
  } else {
    return JSON.parse(localStorage.getItem('darkMode')) || false;
  }
};

export const saveTheme = (darkMode) => {
  if (isChromeExtension) {
    chrome.storage.local.set({ darkMode });
  } else {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }
};