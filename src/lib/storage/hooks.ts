import { useState, useCallback } from 'react';
import { getAppStorage } from './mmkv';

/**
 * Hook to use a storage value with automatic updates
 * Returns [value, setValue, removeValue]
 */
export function useMMKVStorage<T>(
  key: string,
  initialValue?: T
): [T | null, (value: T) => void, () => void] {
  const storage = getAppStorage();

  // Get initial value
  const getStoredValue = useCallback((): T | null => {
    try {
      const item = storage.getString(key);
      if (item === undefined) {
        return initialValue ?? null;
      }
      return JSON.parse(item) as T;
    } catch {
      return initialValue ?? null;
    }
  }, [key, initialValue]);

  const [storedValue, setStoredValue] = useState<T | null>(getStoredValue);

  // Update storage and state
  const setValue = useCallback(
    (value: T) => {
      try {
        storage.set(key, JSON.stringify(value));
        setStoredValue(value);
      } catch (error) {
        console.error(`Error setting storage key "${key}":`, error);
      }
    },
    [key]
  );

  // Remove from storage
  const removeValue = useCallback(() => {
    try {
      storage.delete(key);
      setStoredValue(initialValue ?? null);
    } catch (error) {
      console.error(`Error removing storage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}

/**
 * Hook for string values
 */
export function useMMKVString(
  key: string,
  initialValue?: string
): [string | null, (value: string) => void, () => void] {
  const storage = getAppStorage();

  const getStoredValue = useCallback((): string | null => {
    return storage.getString(key) ?? initialValue ?? null;
  }, [key, initialValue]);

  const [storedValue, setStoredValue] = useState<string | null>(getStoredValue);

  const setValue = useCallback(
    (value: string) => {
      try {
        storage.set(key, value);
        setStoredValue(value);
      } catch (error) {
        console.error(`Error setting storage key "${key}":`, error);
      }
    },
    [key]
  );

  const removeValue = useCallback(() => {
    try {
      storage.delete(key);
      setStoredValue(initialValue ?? null);
    } catch (error) {
      console.error(`Error removing storage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}

/**
 * Hook for boolean values
 */
export function useMMKVBoolean(
  key: string,
  initialValue?: boolean
): [boolean, (value: boolean) => void, () => void] {
  const storage = getAppStorage();

  const getStoredValue = useCallback((): boolean => {
    return storage.getBoolean(key) ?? initialValue ?? false;
  }, [key, initialValue]);

  const [storedValue, setStoredValue] = useState<boolean>(getStoredValue);

  const setValue = useCallback(
    (value: boolean) => {
      try {
        storage.set(key, value);
        setStoredValue(value);
      } catch (error) {
        console.error(`Error setting storage key "${key}":`, error);
      }
    },
    [key]
  );

  const removeValue = useCallback(() => {
    try {
      storage.delete(key);
      setStoredValue(initialValue ?? false);
    } catch (error) {
      console.error(`Error removing storage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}

/**
 * Hook for number values
 */
export function useMMKVNumber(
  key: string,
  initialValue?: number
): [number | null, (value: number) => void, () => void] {
  const storage = getAppStorage();

  const getStoredValue = useCallback((): number | null => {
    return storage.getNumber(key) ?? initialValue ?? null;
  }, [key, initialValue]);

  const [storedValue, setStoredValue] = useState<number | null>(getStoredValue);

  const setValue = useCallback(
    (value: number) => {
      try {
        storage.set(key, value);
        setStoredValue(value);
      } catch (error) {
        console.error(`Error setting storage key "${key}":`, error);
      }
    },
    [key]
  );

  const removeValue = useCallback(() => {
    try {
      storage.delete(key);
      setStoredValue(initialValue ?? null);
    } catch (error) {
      console.error(`Error removing storage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}
