import { Redirect } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import { useAuthStore } from '@/store';

/**
 * Root index - redirects based on auth status
 *
 * GUEST BROWSING ENABLED:
 * - Both authenticated and guest users are directed to the main tabs
 * - Individual screens handle auth requirements via AuthGuard
 * - This allows users to browse without forced login
 *
 * Performance Note:
 * Using <Redirect /> instead of router.replace() in useEffect eliminates
 * unnecessary re-renders and provides smoother navigation experience.
 */
export default function Index() {
  const isLoading = useAuthStore((state) => state.isLoading);

  // Show loading while checking auth state
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#ef4444" />
      </View>
    );
  }

  // Allow guest browsing - all users go to tabs
  // Auth guards on individual screens will handle protected features
  return <Redirect href="/(tabs)" />;
}
