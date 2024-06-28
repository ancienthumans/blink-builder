import { useState, useEffect } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store our value and loading state
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Function to read the value from local storage
    const readValue = () => {
      if (typeof window === "undefined") {
        setLoading(false);
        return;
      }

      try {
        const item = window.localStorage.getItem(key);
        setStoredValue(item ? JSON.parse(item) : initialValue);
      } catch (error) {
        console.warn(`Error reading localStorage key “${key}”:`, error);
      } finally {
        setLoading(false);
      }
    };

    readValue();
  }, [key, initialValue]);

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;

      // Save state
      setStoredValue(valueToStore);

      // Save to local storage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error);
    }
  };

  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.warn(`Error removing localStorage key “${key}”:`, error);
    }
  };

  const resetData = () => {
    setValue(initialValue);
  };

  return [storedValue, setValue, removeValue, loading, resetData] as const;
}

export default useLocalStorage;
