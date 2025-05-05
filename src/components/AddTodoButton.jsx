import React from 'react';

export const AddTodoButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className='p-2 rounded-md bg-gray-500 dark:bg-gray-600 text-white focus:outline-none'
      aria-label='Add Todo'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        className='size-6 stroke-white cursor-pointer'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M12 4.5v15m7.5-7.5h-15'
        />
      </svg>
    </button>
  );
};
