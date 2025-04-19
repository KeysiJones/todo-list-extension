import { useState } from 'react';
import { TrashIcon } from '../assets/TrashIcon';

export const Todo = ({ label, id, onRemove }) => {
  const [checked, setChecked] = useState(false);
    
  return (
    <div
      className='flex justify-start bg-gray-100 p-2 rounded-md'
    >
      <input
        id={`todo-${id}`}
        type='checkbox'
        checked={checked}
        onChange={() => setChecked((prevState) => !prevState)}
        className='checkbox checkbox-sm checkbox-accent checked:text-white'
      />
      <div className='flex justify-between w-full'>
        <label
            htmlFor={`todo-${id}`}
            class={`ml-2 text-md text-gray-600 font-serif capitalize ${
            checked ? 'line-through' : ''
            }`}
        >
            {label}
        </label>
        <TrashIcon color='red' onClick={onRemove}/>
      </div>
    </div>
  );
};
 