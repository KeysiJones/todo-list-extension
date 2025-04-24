chrome.runtime.onInstalled.addListener(() => {
  // Set initial badge color
  chrome.action.setBadgeBackgroundColor({ color: '#FF0000' });

    // Create an alarm to trigger at midnight
    chrome.alarms.create('resetTodos', {
      when: getNextMidnightTimestamp(),
      periodInMinutes: 1440, // 24 hours in minutes
    });
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'resetTodos') {
    // Reset all todos to "not done"
    chrome.storage.local.get(['todoList'], (result) => {
      const todoList = result.todoList || [];
      const resetTodos = todoList.map((todo) => ({ ...todo, done: false }));
      chrome.storage.local.set({ todoList: resetTodos });

      chrome.action.setBadgeText({ text: `${resetTodos.length}` });
    });
  }
})

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes.todoList) {
    const todoList = changes.todoList.newValue || [];
    const pendingCount = todoList.filter((todo) => !todo.done).length;

    // Update the badge text with the number of pending tasks
    chrome.action.setBadgeText({ text: pendingCount > 0 ? `${pendingCount}` : '' });
  }
});

function getNextMidnightTimestamp() {
  const now = new Date();
  const nextMidnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
    0,
    0,
    0
  );
  return nextMidnight.getTime();
}