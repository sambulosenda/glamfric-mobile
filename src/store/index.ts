/**
 * Zustand Store Exports
 *
 * Centralized export for all stores and their selectors
 */

// Auth Store
export {
  useAuthStore,
  useUser,
  useIsAuthenticated,
  useAuthLoading,
  useAuthError,
  authActions,
} from './auth.store';

// UI Store
export {
  useUIStore,
  useTheme,
  useLanguage,
  useNotificationsEnabled,
  useOnboardingCompleted,
  uiActions,
} from './ui.store';

// Middleware
export { mmkvPersist, clearPersistedState, hydrateStore } from './middleware/mmkv-persist';

// Types
export type { Theme, Language } from './ui.store';

// Import stores for manual hydration
import { useAuthStore } from './auth.store';
import { useUIStore } from './ui.store';
import { hydrateStore } from './middleware/mmkv-persist';

/**
 * Manually hydrate all stores from MMKV storage
 * Call this after storage is initialized (from StorageProvider)
 */
export const hydrateAllStores = (): void => {
  console.log('[Store] Hydrating all stores from storage...');

  // Hydrate auth store
  hydrateStore(
    { getState: useAuthStore.getState, setState: useAuthStore.setState },
    'auth-storage',
    (state) => {
      console.log('[Store] Auth hydrated:', { hasUser: !!state.user });
    }
  );

  // Hydrate UI store
  hydrateStore(
    { getState: useUIStore.getState, setState: useUIStore.setState },
    'ui-preferences',
    (state) => {
      console.log('[Store] UI preferences hydrated:', { theme: state.theme, language: state.language });
    }
  );

  console.log('[Store] ✅ All stores hydrated');
};
