import { StateCreator, StoreMutatorIdentifier } from 'zustand';
import { getAppStorage, isStorageInitialized } from '@/lib/storage';

/**
 * Custom Zustand middleware for MMKV persistence
 *
 * Why custom middleware instead of zustand/middleware persist?
 * - Direct MMKV integration (synchronous, faster)
 * - Better type safety with our storage system
 * - Simplified API tailored to our needs
 * - No async complications
 */

type MMKVPersist = <
  T,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = [],
>(
  config: StateCreator<T, Mps, Mcs>,
  options: MMKVPersistOptions<T>,
) => StateCreator<T, Mps, Mcs>;

type MMKVPersistOptions<T> = {
  /**
   * Name of the storage key
   */
  name: string;
  /**
   * Optional: Keys to exclude from persistence
   * Useful for transient state like loading flags
   */
  partialize?: (state: T) => Partial<T>;
  /**
   * Optional: Called after state is hydrated from storage
   */
  onHydrate?: (state: T) => void;
};

type MMKVPersistImpl = <T>(
  config: StateCreator<T, [], []>,
  options: MMKVPersistOptions<T>,
) => StateCreator<T, [], []>;

const mmkvPersistImpl: MMKVPersistImpl = (config, options) => {
  return (set, get, api) => {
    const { name, partialize, onHydrate } = options;

    // Create the store with the original config
    const store = config(
      (args) => {
        // Intercept set to persist state after updates
        set(args);

        // Only persist if storage is initialized
        if (isStorageInitialized()) {
          const state = get();
          const stateToPersist = partialize ? partialize(state) : state;

          try {
            const storage = getAppStorage();
            storage.set(name, JSON.stringify(stateToPersist));
          } catch (error) {
            console.error(`[MMKV Persist] Error persisting state for ${name}:`, error);
          }
        }
      },
      get,
      api,
    );

    // Hydrate state from storage on initialization
    // Only try to hydrate if storage is already initialized
    if (isStorageInitialized()) {
      try {
        const storage = getAppStorage();
        const persistedState = storage.getString(name);

        if (persistedState) {
          const parsedState = JSON.parse(persistedState);

          // Merge persisted state with initial state
          // This allows for new properties to have default values
          Object.assign(api.getState() as object, parsedState);

          if (onHydrate) {
            onHydrate(api.getState());
          }
        }
      } catch (error) {
        console.error(`[MMKV Persist] Error hydrating state for ${name}:`, error);
      }
    } else {
      console.log(`[MMKV Persist] Storage not ready yet, skipping initial hydration for ${name}`);
    }

    return store;
  };
};

export const mmkvPersist = mmkvPersistImpl as MMKVPersist;

/**
 * Helper to manually hydrate a store from persisted state
 * Call this after storage is initialized if the store was created before storage was ready
 */
export const hydrateStore = <T>(
  api: { getState: () => T; setState: (state: Partial<T>) => void },
  name: string,
  onHydrate?: (state: T) => void,
): void => {
  if (!isStorageInitialized()) {
    console.warn(`[MMKV Persist] Cannot hydrate ${name}: storage not initialized`);
    return;
  }

  try {
    const storage = getAppStorage();
    const persistedState = storage.getString(name);

    if (persistedState) {
      const parsedState = JSON.parse(persistedState);
      api.setState(parsedState);

      if (onHydrate) {
        onHydrate(api.getState());
      }

      console.log(`[MMKV Persist] ✅ Hydrated ${name} from storage`);
    }
  } catch (error) {
    console.error(`[MMKV Persist] Error hydrating ${name}:`, error);
  }
};

/**
 * Helper to clear persisted state for a store
 */
export const clearPersistedState = (name: string): void => {
  try {
    const storage = getAppStorage();
    storage.delete(name);
  } catch (error) {
    console.error(`[MMKV Persist] Error clearing persisted state for ${name}:`, error);
  }
};
