chrome.runtime.onInstalled.addListener(() => {
  // Set initial badge color
  chrome.action.setBadgeBackgroundColor({ color: '#FF0000' });

  // Create an alarm to trigger at midnight
  chrome.alarms.create('resetTodos', {
    when: getNextMidnightTimestamp(),
    periodInMinutes: 1440, // 24 hours in minutes
  });

  // Initialize Pomodoro state
  chrome.storage.local.set({ pomodoroState: { isRunning: false, endTime: null } });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'startPomodoro') {
    const duration = message.duration * 60 * 1000; // Convert minutes to milliseconds
    const endTime = Date.now() + duration;

    chrome.storage.local.set({ pomodoroState: { isRunning: true, endTime } });
    chrome.alarms.create('pomodoroTimer', { when: endTime });
    sendResponse({ success: true });
  } else if (message.type === 'stopPomodoro') {
    chrome.storage.local.set({ pomodoroState: { isRunning: false, endTime: null } });
    chrome.alarms.clear('pomodoroTimer');
    sendResponse({ success: true });
  } else if (message.type === 'getPomodoroState') {
    chrome.storage.local.get('pomodoroState', (result) => {
      sendResponse(result.pomodoroState);
    });
    return true; // Keep the message channel open for async response
  }
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
  } else if (alarm.name === 'pomodoroWork') {
    // Show notification for work session end
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'vite.png',
      title: 'Pomodoro Timer',
      message: 'Work session ended! Time for a break.',
    });

    // Start break timer
    chrome.alarms.create('pomodoroBreak', { delayInMinutes: 5 });
  } else if (alarm.name === 'pomodoroBreak') {
    // Show notification for break session end
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'vite.png',
      title: 'Pomodoro Timer',
      message: 'Break ended! Time to get back to work.',
    });

    // Restart work timer
    chrome.alarms.create('pomodoroWork', { delayInMinutes: 1 });
  } else if (alarm.name === 'pomodoroTimer') {
    // Show notification for Pomodoro timer end
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'vite.png',
      title: 'Pomodoro Timer',
      message: 'Pomodoro session completed! Take a break.',
    });

    // Reset Pomodoro state
    chrome.storage.local.set({ pomodoroState: { isRunning: false, endTime: null } });
  }
});

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