chrome.runtime.onInstalled.addListener(() => {
  // Set initial badge color
  chrome.action.setBadgeBackgroundColor({ color: '#FF0000' });
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes.todoList) {
    const todoList = changes.todoList.newValue || [];
    const pendingCount = todoList.filter((todo) => !todo.done).length;

    // Update the badge text with the number of pending tasks
    chrome.action.setBadgeText({ text: pendingCount > 0 ? `${pendingCount}` : '' });
  }
});