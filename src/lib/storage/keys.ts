/**
 * Storage keys for MMKV
 * Centralized key management to avoid typos and conflicts
 */

export const StorageKeys = {
  // User preferences
  THEME: 'theme',
  LANGUAGE: 'language',
  NOTIFICATIONS_ENABLED: 'notifications_enabled',

  // Onboarding
  ONBOARDING_COMPLETED: 'onboarding_completed',
  FIRST_LAUNCH: 'first_launch',

  // User data
  USER_DATA: 'user_data',
  USER_PREFERENCES: 'user_preferences',

  // App state
  LAST_SYNC_TIME: 'last_sync_time',
  APP_VERSION: 'app_version',

  // Feature flags
  FEATURE_FLAGS: 'feature_flags',

  // Cache keys (for cache storage)
  CACHED_SALONS: 'cached_salons',
  CACHED_SERVICES: 'cached_services',
  CACHED_STYLISTS: 'cached_stylists',
} as const;

export type StorageKey = typeof StorageKeys[keyof typeof StorageKeys];
