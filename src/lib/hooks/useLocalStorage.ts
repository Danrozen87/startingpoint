
import { useState, useEffect, useCallback } from 'react';

type SetValue<T> = (value: T | ((prev: T) => T)) => void;

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, SetValue<T>] {
  // Initialize state with lazy initial state to avoid running on every render
  const [storedValue, setStoredValue] = useState<T>(() => {
    // Check if we're in SSR environment
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Error reading localStorage key "${key}":`, error);
      }
      return initialValue;
    }
  });

  // Use useCallback with stable dependencies to avoid unnecessary re-renders
  const setValue: SetValue<T> = useCallback((value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to localStorage only if window is available
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    }
  }, [key, storedValue]);

  // Listen for changes in localStorage from other tabs/windows
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          if (process.env.NODE_ENV === 'development') {
            console.warn(`Error parsing localStorage change for key "${key}":`, error);
          }
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [storedValue, setValue];
}
