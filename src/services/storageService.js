const STORAGE_KEY = 'todoList';

export const isChromeExtension = typeof chrome !== 'undefined' && chrome.storage;

export const loadTodos = async () => {
  if (isChromeExtension) {
    return new Promise((resolve) => {
      chrome.storage.local.get([STORAGE_KEY], (result) => {
        resolve(result.todoList || []);
      });
    });
  } else {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  }
};

export const saveTodos = async (todoList) => {
  if (isChromeExtension) {
    chrome.storage.local.set({ todoList });
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todoList));
  }
};

export function clearTodos() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      console.error('Failed to clear todoList from localStorage');
    }
  }
