import { View, Text } from 'react-native';
import { AuthGuard, LoginPrompt } from '@/components/auth';

/**
 * Bookings Screen (Protected)
 *
 * Requires authentication to view.
 * Shows LoginPrompt for guest users.
 */
export default function BookingsScreen() {
  return (
    <AuthGuard
      fallback={
        <LoginPrompt
          title="Your Bookings"
          message="Sign in to view and manage your appointments"
        />
      }
    >
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-2xl font-bold text-gray-900">My Bookings</Text>
        <Text className="text-gray-600 mt-2">View and manage your appointments</Text>
      </View>
    </AuthGuard>
  );
}
