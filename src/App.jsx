import { useEffect, useMemo, useState } from 'react';
import './App.css';
import { Todo } from './components/Todo';
import { loadTodos, saveTodos } from './services/storageService';
import { Spinner } from './components/Spinner';
import { ThemeTogglerIcon } from './components/ThemeTogglerIcon';
import { loadTheme, saveTheme } from './services/themeService';
import { AddTodoButton } from './components/AddTodoButton';
import { PomodoroClock } from './components/PomodoroClock';

export default function App() {
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    loadTodos().then((saved) => setTodoList(saved));
    setLoading(false);

    // Load the user's theme preference
    const themeResult = loadTheme();
    if (themeResult instanceof Promise) {
      themeResult.then((theme) => {
        setDarkMode(theme);
        document.documentElement.classList.toggle('dark', theme);
      });
    } else {
      setDarkMode(themeResult);
      document.documentElement.classList.toggle('dark', themeResult);
    }
  }, []);

  const date = useMemo(
    () =>
      new Date().toLocaleDateString('pt-BR', {
        weekday: 'long',
      }),
    []
  );

  const addTodo = (label) => {
    const todo = {
      id: `${Date.now()}`,
      label: label.trim().toLowerCase(),
      done: false,
    };

    const newList = [...todoList, todo];
    setTodoList(newList);
    saveTodos(newList);
  };

  const onRemoveTodo = (id) => {
    const newList = [...todoList.filter((todo) => todo.id !== id)];
    setTodoList(newList);
    saveTodos(newList);
  };

  const onEditTodo = (id, label) => {
    const newList = todoList.map(todo => todo.id === id ? { ...todo, label } : todo);
    setTodoList(newList);
    saveTodos(newList);
  }

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
    saveTheme(newMode);
  };

  const addNewTodo = () => {
    const val = newTodo.trim();
    if (!val) return;
    addTodo(val);
    setNewTodo('');
  }

  const isTodoListEmpty = todoList.length === 0;
  const showScrollbar = todoList.length >= 8;

  if (loading)
    return (
      <div className='h-screen w-screen bg-gray-100 flex justify-center'>
        <Spinner />
      </div>
    );

  return (
    <div className='h-screen w-screen bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex justify-center items-center'>
      <div className='flex gap-y-3 relative px-4 flex-col bg-white dark:bg-gray-800 min-w-[400px] h-full w-[400px] min-h-[500px] max-h-[500px] pt-4 pb-3'>
        <span className='text-gray-600 font-semibold dark:text-white text-center text-xl capitalize'>
          {date}
        </span>
        <button onClick={toggleDarkMode} className='absolute right-4.5'>
          <ThemeTogglerIcon darkMode={darkMode} />
        </button>
        <PomodoroClock />
        <div className='flex flex-col justify-between h-full'>
          <div
            className={`flex flex-col gap-y-2 rounded-md scrollbar ${showScrollbar && 'pr-1'} overflow-y-auto max-h-[330px]`}
          >
            {isTodoListEmpty && (
              <p className='text-gray-600 dark:text-gray-200 italic font-thin text-lg text-center'>
                Pressione enter para adicionar uma tarefa...
              </p>
            )}
            {todoList.map(({ id, label, done }) => (
              <Todo
                key={id}
                id={id}
                label={label}
                done={done}
                onToggle={(checked) => {
                  const list = todoList;
                  const newTodoList = list.map((t) =>
                    t.id === id ? { ...t, done: checked } : t
                  );
                  setTodoList(newTodoList);
                  saveTodos(newTodoList);
                }}
                onRemove={onRemoveTodo}
                onEdit={onEditTodo}
              />
            ))}
          </div>
          <div className='flex items-center gap-2'>
            <input
              type='text'
              placeholder='Nova Tarefa...'
              className='input p-3 rounded-md w-full bg-white dark:bg-gray-700 focus:outline-none focus:outline-0 border-1 border-gray-200 dark:border-gray-500'
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  addNewTodo();
                }
              }}
            />
            <AddTodoButton
              onClick={() => {
                addNewTodo();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
