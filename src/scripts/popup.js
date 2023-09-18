const toggleButton = document.querySelector('#toggle-button');

chrome.storage.local.get('blurEnabled', ({ blurEnabled }) => {
  toggleButton.checked = blurEnabled;
});

toggleButton.addEventListener('change', () => {
  chrome.storage.local.set({ blurEnabled: toggleButton.checked });

  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    chrome.tabs.sendMessage(tab.id, { toggleBlur: toggleButton.checked });
  });
});