const STORAGE_KEY = 'todoList';

export const isChromeExtension = typeof chrome !== 'undefined' && chrome?.storage;
console.log({ isChromeExtension })

export const loadTodos = async () => {
  if (isChromeExtension) {
    return new Promise((resolve) => {
      chrome.storage.local.get([STORAGE_KEY], (result) => {
        resolve(result.todos || []);
      });
    });
  } else {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  }
};

export const saveTodos = async (todos) => {
  if (isChromeExtension) {
    chrome.storage.local.set({ todos });
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }
};

export function clearTodos() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      console.error('Failed to clear todos from localStorage');
    }
  }
