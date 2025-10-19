import { getAppStorage, getCacheStorage } from './mmkv';

export { initializeStorage, getAppStorage, getCacheStorage, isStorageInitialized } from './mmkv';
export { StorageKeys } from './keys';
export type { StorageKey } from './keys';
export { useMMKVStorage, useMMKVString, useMMKVBoolean, useMMKVNumber } from './hooks';

/**
 * Type-safe storage utilities
 */

/**
 * Set a value in storage (objects will be JSON stringified)
 */
export const setItem = <T>(key: string, value: T): void => {
  const storage = getAppStorage();

  if (typeof value === 'string') {
    storage.set(key, value);
  } else if (typeof value === 'number') {
    storage.set(key, value);
  } else if (typeof value === 'boolean') {
    storage.set(key, value);
  } else {
    storage.set(key, JSON.stringify(value));
  }
};

/**
 * Get a value from storage with type safety
 */
export const getItem = <T>(key: string): T | null => {
  const storage = getAppStorage();
  const value = storage.getString(key);

  if (value === undefined) {
    return null;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    // If JSON parse fails, return the raw value
    return value as T;
  }
};

/**
 * Get a string value
 */
export const getString = (key: string): string | null => {
  const storage = getAppStorage();
  return storage.getString(key) ?? null;
};

/**
 * Get a number value
 */
export const getNumber = (key: string): number | null => {
  const storage = getAppStorage();
  return storage.getNumber(key) ?? null;
};

/**
 * Get a boolean value
 */
export const getBoolean = (key: string): boolean | null => {
  const storage = getAppStorage();
  return storage.getBoolean(key) ?? null;
};

/**
 * Remove an item from storage
 */
export const removeItem = (key: string): void => {
  const storage = getAppStorage();
  storage.delete(key);
};

/**
 * Clear all storage (use with caution!)
 */
export const clearAll = (): void => {
  const storage = getAppStorage();
  storage.clearAll();
};

/**
 * Check if a key exists
 */
export const hasKey = (key: string): boolean => {
  const storage = getAppStorage();
  return storage.contains(key);
};

/**
 * Get all keys
 */
export const getAllKeys = (): string[] => {
  const storage = getAppStorage();
  return storage.getAllKeys();
};

/**
 * Cache storage utilities (for temporary data that can be cleared)
 */

export const cache = {
  set: <T>(key: string, value: T, ttl?: number): void => {
    const storage = getCacheStorage();
    const cacheEntry = {
      value,
      timestamp: Date.now(),
      ttl,
    };
    storage.set(key, JSON.stringify(cacheEntry));
  },

  get: <T>(key: string): T | null => {
    const storage = getCacheStorage();
    const data = storage.getString(key);

    if (!data) {
      return null;
    }

    try {
      const cacheEntry = JSON.parse(data);

      // Check if cache has expired
      if (cacheEntry.ttl) {
        const age = Date.now() - cacheEntry.timestamp;
        if (age > cacheEntry.ttl) {
          storage.delete(key);
          return null;
        }
      }

      return cacheEntry.value as T;
    } catch {
      return null;
    }
  },

  remove: (key: string): void => {
    const storage = getCacheStorage();
    storage.delete(key);
  },

  clear: (): void => {
    const storage = getCacheStorage();
    storage.clearAll();
  },
};

/**
 * Helper for storing objects with type safety
 */
export const storage = {
  set: setItem,
  get: getItem,
  getString,
  getNumber,
  getBoolean,
  remove: removeItem,
  clear: clearAll,
  has: hasKey,
  keys: getAllKeys,
  cache,
};
