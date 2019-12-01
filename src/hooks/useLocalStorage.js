import { useState, useEffect } from 'react';

// eslint-disable-next-line import/prefer-default-export
export const useLocalStorage = (name, initialValue) => {
  const windowGlobal = typeof window !== 'undefined' && window;
  const [value, setValue] = useState(() => {
    if (windowGlobal) {
      const currentValue = windowGlobal.localStorage.getItem(name);
      try {
        return currentValue ? JSON.parse(currentValue) : initialValue;
      } catch (err) {
        return initialValue;
      }
    }
    return initialValue;
  });

  useEffect(() => {
    if (windowGlobal) windowGlobal.localStorage.setItem(name, JSON.stringify(value));
  }, [name, value, windowGlobal]);
  return [value, setValue];
};
