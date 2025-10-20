import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AuthGuard, LoginPrompt } from '@/components/auth';

/**
 * Bookings Screen (Protected)
 *
 * Requires authentication to view.
 * Shows LoginPrompt for guest users.
 */
export default function BookingsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <AuthGuard
      fallback={
        <View
          style={{
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            flex: 1,
          }}
        >
          <LoginPrompt
            title="Your Bookings"
            message="Sign in to view and manage your appointments"
          />
        </View>
      }
    >
      <View
        className="flex-1 items-center justify-center bg-white"
        style={{
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
      >
        <Text className="text-2xl font-bold text-gray-900">My Bookings</Text>
        <Text className="text-gray-600 mt-2">View and manage your appointments</Text>
      </View>
    </AuthGuard>
  );
}
