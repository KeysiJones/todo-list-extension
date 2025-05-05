import { useState } from 'react';
import { TrashIcon } from '../assets/TrashIcon';

export const Todo = ({ id, label, done, onToggle, onRemove, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedLabel, setEditedLabel] = useState(label);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    if (editedLabel.trim() !== label) {
      onEdit(id, editedLabel.trim());
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditedLabel(label); // Revert to the original value
    }
  };
  return (
    <div className='flex justify-start bg-gray-50 dark:bg-gray-700 p-2 rounded-md items-center dark:border-gray-500 border-1 border-gray-300'>
      <input
        id={`todo-${id}`}
        type='checkbox'
        checked={done}
        onChange={(e) => onToggle(e.target.checked)}
        className='checkbox checkbox-xs checkbox-neutral bg-white dark:bg-gray-200 border-gray-400 dark:border-gray-200 checked:text-white checked:bg-accent checked:border-accent'
      />
      <div className='flex justify-between w-full'>
        {isEditing ? (
          <input
            type='text'
            value={editedLabel}
            onChange={(e) => setEditedLabel(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            className='capitalize px-1 ml-1 rounded focus:outline-none text-base'
            autoFocus
          />
        ) : (
          <label
            onClick={handleEdit}
            htmlFor={`todo-${id}`}
            className={`ml-2 text-base w-full dark:text-white capitalize`}
          >
            {label}
          </label>
        )}
        <TrashIcon color='red' onClick={() => onRemove(id)} />
      </div>
    </div>
  );
};
