import { TrashIcon } from '../assets/TrashIcon';

export const Todo = ({ id, label, done, onToggle, onRemove }) => {
  return (
    <div className="flex justify-start bg-gray-50 p-2 rounded-md items-center">
      <input
        id={`todo-${id}`}
        type="checkbox"
        checked={done}
        onChange={e => onToggle(e.target.checked)}
        className="checkbox checkbox-sm checkbox-success checked:text-white"
      />
      <div className="flex justify-between w-full">
        <label
          htmlFor={`todo-${id}`}
          className={`ml-2 text-md text-gray-600 font-serif capitalize ${
            done ? 'line-through' : ''
          }`}
        >
          {label}
        </label>
        <TrashIcon color="red" onClick={() => onRemove(id)} />
      </div>
    </div>
  );
};
