import { Redirect } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import { useAuthStore, useUIStore } from '@/store';

/**
 * Root index - redirects based on onboarding and auth status
 *
 * NAVIGATION FLOW:
 * 1. Show onboarding for first-time users
 * 2. After onboarding, enable guest browsing
 * 3. Both authenticated and guest users are directed to the main tabs
 * 4. Individual screens handle auth requirements via AuthGuard
 *
 * DEV MODE:
 * - In development mode (__DEV__), always show onboarding for testing
 *
 * Performance Note:
 * Using <Redirect /> instead of router.replace() in useEffect eliminates
 * unnecessary re-renders and provides smoother navigation experience.
 */
export default function Index() {
  const isLoading = useAuthStore((state) => state.isLoading);
  const onboardingCompleted = useUIStore((state) => state.onboardingCompleted);

  // Show loading while checking auth state
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#ef4444" />
      </View>
    );
  }

  // In development mode, always show onboarding for testing
  if (__DEV__) {
    return <Redirect href="/onboarding" />;
  }

  // First-time users see onboarding
  if (!onboardingCompleted) {
    return <Redirect href="/onboarding" />;
  }

  // Allow guest browsing - all users go to tabs
  // Auth guards on individual screens will handle protected features
  return <Redirect href="/(tabs)" />;
}
