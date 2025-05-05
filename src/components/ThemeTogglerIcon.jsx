export const ThemeTogglerIcon = ({ darkMode }) =>
  darkMode ? (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      className='cursor-pointer'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='12' cy='12' r='5' fill='gold' />
      <line x1='12' y1='1' x2='12' y2='4' stroke='gold' stroke-width='2' />
      <line x1='12' y1='20' x2='12' y2='23' stroke='gold' stroke-width='2' />
      <line
        x1='4.22'
        y1='4.22'
        x2='6.34'
        y2='6.34'
        stroke='gold'
        stroke-width='2'
      />
      <line
        x1='17.66'
        y1='17.66'
        x2='19.78'
        y2='19.78'
        stroke='gold'
        stroke-width='2'
      />
      <line x1='1' y1='12' x2='4' y2='12' stroke='gold' stroke-width='2' />
      <line x1='20' y1='12' x2='23' y2='12' stroke='gold' stroke-width='2' />
      <line
        x1='4.22'
        y1='19.78'
        x2='6.34'
        y2='17.66'
        stroke='gold'
        stroke-width='2'
      />
      <line
        x1='17.66'
        y1='6.34'
        x2='19.78'
        y2='4.22'
        stroke='gold'
        stroke-width='2'
      />
    </svg>
  ) : (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      className='fill-gray-500 size-7 cursor-pointer'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M21 12.79C20.24 13.12 19.42 13.3 18.57 13.3C14.63 13.3 11.3 9.97 11.3 6.03C11.3 5.18 11.48 4.36 11.81 3.6C8.13 4.42 5.5 7.74 5.5 11.63C5.5 16.02 9.11 19.63 13.5 19.63C17.39 19.63 20.71 17 21 13.32V12.79Z' />
    </svg>
  );
