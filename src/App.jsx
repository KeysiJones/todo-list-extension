import { useEffect, useMemo, useState } from 'react';
import './App.css';
import { Todo } from './components/Todo';
import { loadTodos, saveTodos } from './services/storageService';
import { Spinner } from './components/Spinner';

export default function App() {
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTodos().then((saved) => setTodoList(saved));
    setLoading(false);
  }, []);

  const date = useMemo(
    () =>
      new Date().toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
    []
  );

  const addTodo = (label) => {
    const todo = {
      id: `${Date.now()}`,
      label: label.trim().toLowerCase(),
      done: false,
    };

    const newList = todoList;
    newList.push(todo);
    setTodoList(newList);
    saveTodos(newList);
  };

  const onRemoveTodo = (id) => {
    const newList = todoList.filter((todo) => todo.id !== id);
    console.log({ todoList, newList, id });
    setTodoList(newList);
    saveTodos(newList);
  };

  if (loading)
    return (
      <div className='h-screen w-screen bg-gray-100 flex justify-center'>
        <Spinner />
      </div>
    );

  return (
    <div className='flex h-screen w-screen bg-gray-200 justify-center items-center'>
      <div className='flex flex-col gap-y-1.5 justify-between bg-white min-w-[360px] w-full sm:w-[400px] sm:max-h-[500px] min-h-[400px] h-full sm:rounded-xl py-4 pb-0 shadow-2xl'>
          <span className='text-gray-600 font-serif text-center text-lg'>
            {date}
          </span>
        <div className='flex flex-col p-4 scrollbar overflow-y-auto'>
          <div
            className={`flex flex-col gap-y-1.5 pb-4 rounded-md ${
              todoList.length > 1 ? 'pr-1' : ''
            }`}
          >
            {todoList.length === 0 && (
              <p className='text-gray-600 italic font-thin text-sm'>
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
              />
            ))}
          </div>
        </div>
        <div>
          <input
            type='text'
            placeholder='Nova Tarefa...'
            className='input p-2 w-full bg-gray-500 rounded-none focus:outline-none focus:outline-0'
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const val = newTodo.trim();
                if (!val) return;
                addTodo(val);
                setNewTodo('');
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
