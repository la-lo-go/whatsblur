// Select all chat names on the page
const chatNames = document.querySelectorAll('span[title][dir="auto"]');

// Loop through each chat name and apply the blur effect
chatNames.forEach(chatName => {
  chatName.style.filter = 'blur(4px)';
});

// Listen for messages from the popup window
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // If the message is to toggle the blur
  if (request.message === 'toggleBlur') {
    // Loop through each chat name again
    chatNames.forEach(chatName => {
      // If the blur is currently applied, remove it
      if (chatName.style.filter === 'blur(4px)') {
        chatName.style.filter = 'none';
      } else { // Otherwise, apply the blur
        chatName.style.filter = 'blur(4px)';
      }
    });
  }
});