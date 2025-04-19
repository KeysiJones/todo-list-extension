import { useMemo, useState } from 'react';
import './App.css';
import { Todo } from './components/Todo';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const date = useMemo(
    () =>
      new Date().toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
    []
  );
  
  const onRemove = (id) => {
    setTodoList(prevList => prevList.filter(todo => todo.id !== id))
  }

  return (
    <div className='flex h-screen w-screen bg-gray-200 justify-center items-center'>
      <div className='flex flex-col bg-white min-w-[400px] max-h-[500px] h-full rounded-xl p-4 gap-y-4'>
        <span className='text-gray-600 font-serif text-center text-lg'>{date}</span>
        <input
          type='text'
          placeholder='Nova Tarefa...'
          className='input p-4 w-full bg-gray-600'
          value={newTodo}
          onChange={(event) => {
            setNewTodo(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              setTodoList((prevTodos) => [
                ...prevTodos,
                {
                  label: newTodo.toLowerCase(),
                  id: todoList.length + '-' + newTodo.toLowerCase().trim(),
                },
              ]);
              setNewTodo('');
            }
          }}
        />
        <div
          className={`flex flex-col scrollbar gap-y-1.5 rounded-md overflow-y-auto ${
            todoList.length > 1 && 'pr-1'
          }`}
        >
          {todoList.map((todo) => (
            <Todo
              id={todo.id}
              label={todo.label}
              onRemove={() => onRemove(todo.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
