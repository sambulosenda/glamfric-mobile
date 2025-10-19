/**
 * Environment configuration
 * Access environment variables with type safety
 */

export const ENV = {
  GRAPHQL_URL: process.env.EXPO_PUBLIC_GRAPHQL_URL || 'http://localhost:3000/api/graphql',
  APP_NAME: process.env.EXPO_PUBLIC_APP_NAME || 'Glamfric',
  APP_VERSION: process.env.EXPO_PUBLIC_APP_VERSION || '1.0.0',
  IS_DEV: __DEV__,
} as const;

// Type guard to ensure required env vars are present
const validateEnv = () => {
  if (!ENV.GRAPHQL_URL) {
    throw new Error('EXPO_PUBLIC_GRAPHQL_URL is required');
  }
};

validateEnv();
