import { TrashIcon } from '../assets/TrashIcon';

export const Todo = ({ id, label, done, onToggle, onRemove }) => {
  return (
    <div className="flex justify-start bg-gray-50 dark:bg-gray-600 p-2 rounded-md items-center">
      <input
        id={`todo-${id}`}
        type="checkbox"
        checked={done}
        onChange={e => onToggle(e.target.checked)}
        className="checkbox checkbox-xs checkbox-neutral bg-white dark:bg-gray-200 border-gray-400 dark:border-gray-200 checked:text-white checked:bg-accent checked:border-accent"
      />
      <div className="flex justify-between w-full">
        <label
          htmlFor={`todo-${id}`}
          className={`ml-2 text-sm text-gray-600 dark:text-white font-serif capitalize ${
            done && 'line-through'
          }`}
        >
          {label}
        </label>
        <TrashIcon color="red" onClick={() => onRemove(id)} />
      </div>
    </div>
  );
};
