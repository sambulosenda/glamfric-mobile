import { create } from 'zustand';
import { mmkvPersist } from './middleware/mmkv-persist';

/**
 * Theme options
 */
export type Theme = 'light' | 'dark' | 'system';

/**
 * Language options
 */
export type Language = 'en' | 'es' | 'fr';

/**
 * UI Store State Interface
 */
interface UIState {
  // Theme
  theme: Theme;
  setTheme: (theme: Theme) => void;

  // Language/Locale
  language: Language;
  setLanguage: (language: Language) => void;

  // Notifications
  notificationsEnabled: boolean;
  setNotificationsEnabled: (enabled: boolean) => void;

  // Onboarding
  onboardingCompleted: boolean;
  setOnboardingCompleted: (completed: boolean) => void;

  // App state
  isFirstLaunch: boolean;
  setIsFirstLaunch: (isFirst: boolean) => void;

  // UI preferences
  compactMode: boolean;
  setCompactMode: (enabled: boolean) => void;

  // Reset all UI preferences
  resetPreferences: () => void;
}

/**
 * UI/Theme Store
 *
 * Manages app-wide UI preferences and settings
 * - Theme (light/dark/system)
 * - Language/locale
 * - Notification preferences
 * - Onboarding state
 * - UI layout preferences
 */
export const useUIStore = create<UIState>()(
  mmkvPersist(
    (set) => ({
      // Initial state - sensible defaults
      theme: 'system',
      language: 'en',
      notificationsEnabled: true,
      onboardingCompleted: false,
      isFirstLaunch: true,
      compactMode: false,

      // Actions
      setTheme: (theme) => set({ theme }),

      setLanguage: (language) => set({ language }),

      setNotificationsEnabled: (enabled) => set({ notificationsEnabled: enabled }),

      setOnboardingCompleted: (completed) => set({ onboardingCompleted: completed }),

      setIsFirstLaunch: (isFirst) => set({ isFirstLaunch: isFirst }),

      setCompactMode: (enabled) => set({ compactMode: enabled }),

      resetPreferences: () =>
        set({
          theme: 'system',
          language: 'en',
          notificationsEnabled: true,
          compactMode: false,
          // Don't reset onboarding state
        }),
    }),
    {
      name: 'ui-preferences',
    },
  ),
);

/**
 * Selectors for optimized re-renders
 */
export const useTheme = () => useUIStore((state) => state.theme);
export const useLanguage = () => useUIStore((state) => state.language);
export const useNotificationsEnabled = () =>
  useUIStore((state) => state.notificationsEnabled);
export const useOnboardingCompleted = () =>
  useUIStore((state) => state.onboardingCompleted);

/**
 * UI actions as standalone functions
 */
export const uiActions = {
  setTheme: (theme: Theme) => useUIStore.getState().setTheme(theme),
  setLanguage: (language: Language) => useUIStore.getState().setLanguage(language),
  setNotificationsEnabled: (enabled: boolean) =>
    useUIStore.getState().setNotificationsEnabled(enabled),
  setOnboardingCompleted: (completed: boolean) =>
    useUIStore.getState().setOnboardingCompleted(completed),
  setCompactMode: (enabled: boolean) => useUIStore.getState().setCompactMode(enabled),
  resetPreferences: () => useUIStore.getState().resetPreferences(),
};
