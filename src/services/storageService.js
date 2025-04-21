// storageService.js
const STORAGE_KEY = 'todoList';

export function loadTodos() {
  return new Promise((resolve) => {
    chrome.storage.local.get(['todos'], (result) => {
      resolve(result.todos || []);
    });
  });
}

export function saveTodos(todos) {
  chrome.storage.local.set({ todos });
}

export function clearTodos() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      console.error('Failed to clear todos from localStorage');
    }
  }
