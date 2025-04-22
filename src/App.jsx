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
    <div className='flex h-screen w-screen max-w-[400px] bg-gray-200 justify-center items-center max-h-[400px]'>
      <div className='flex flex-col gap-y-3 bg-white min-w-[360px] h-full w-[400px] min-h-[400px] max-h-[400px] pt-4 pb-0 shadow-2xl'>
        <span className='text-gray-600 font-serif text-center text-lg'>
          {date}
        </span>
        <div className='flex flex-col justify-between h-full'>
          <div
            className={`flex flex-col gap-y-1.5 rounded-md scrollbar overflow-y-auto max-h-[300px] ${
              todoList.length > 1 ? 'px-3' : ''
            }`}
          >
            {todoList.length === 0 && (
              <p className='text-gray-600 italic font-thin text-sm text-center'>
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
          <input
            type='text'
            placeholder='Nova Tarefa...'
            className='input p-3 w-full bg-gray-500 rounded-none focus:outline-none focus:outline-0'
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
