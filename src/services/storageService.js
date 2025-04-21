// storageService.js
const STORAGE_KEY = 'todoList';

export function loadTodos() {
  try {
    const json = localStorage.getItem(STORAGE_KEY);
    return json ? JSON.parse(json) : [];
  } catch {
    console.warn('Failed to parse todos from localStorage');
    return [];
  }
}

export function saveTodos(todos) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch {
    console.error('Failed to save todos to localStorage');
  }
}

export function clearTodos() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      console.error('Failed to clear todos from localStorage');
    }
  }
