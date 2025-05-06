import React, { useState, useEffect } from 'react';
import { isChromeExtension } from '../services/storageService';

export const PomodoroClock = () => {
  const [timeLeft, setTimeLeft] = useState(1500); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const updateTimer = () => {
      if (!isChromeExtension) return;
      // Check if the runtime and sendMessage are available
      if (chrome.runtime && chrome.runtime.sendMessage) {
        chrome.runtime.sendMessage({ type: 'getPomodoroState' }, (response) => {
          if (response) {
            setIsRunning(response.isRunning);
            if (response.endTime) {
              console.log('End time:', new Date(response.endTime));
              console.log('Current time:', new Date());
              console.log('Time left:', response.endTime - Date.now());
              console.log('Is running:', response.isRunning);
              const remainingTime = Math.max(0, response.endTime - Date.now());
              console.log('Remaining time:', remainingTime);
              setTimeLeft(Math.floor(remainingTime / 1000));

              if (remainingTime <= 1000) {
                setTimeLeft(900);
                setIsRunning(false);
              }
            }
          }
        });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const startPomodoro = () => {
    chrome.runtime.sendMessage({ type: 'startPomodoro', duration: 1 });
  };

  const stopPomodoro = () => {
    chrome.runtime.sendMessage({ type: 'stopPomodoro' });
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <div className='flex gap-x-2 pomodoro-clock justify-between w-full'>
      <div className='flex gap-x-2 timer-display items-center'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='size-9'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
          />
        </svg>
        <p className='text-lg font-normal'>{formatTime(timeLeft)}</p>
        <p className='text-lg font-normal'>Foco</p>
      </div>
      <div className='flex'>
        <button
          onClick={isRunning ? stopPomodoro : startPomodoro}
          className='p-2 rounded-full bg-gray-500 dark:bg-gray-600 text-white focus:outline-none'
        >
          {isRunning ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-6 cursor-pointer'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 5.25v13.5m-7.5-13.5v13.5'
              />
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={2}
              className='size-6 fill-white cursor-pointer'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z'
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};
