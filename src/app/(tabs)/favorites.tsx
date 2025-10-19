import { View, Text } from 'react-native';
import { Heart } from 'lucide-react-native';
import { AuthGuard, LoginPrompt } from '@/components/auth';

/**
 * Favorites Screen (Protected)
 *
 * Requires authentication to view.
 * Shows LoginPrompt with custom icon for guest users.
 */
export default function FavoritesScreen() {
  return (
    <AuthGuard
      fallback={
        <LoginPrompt
          title="Your Favorites"
          message="Sign in to save and view your favorite businesses"
          icon={<Heart size={32} color="#EF4444" />}
        />
      }
    >
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-2xl font-bold text-gray-900">Favorites</Text>
        <Text className="text-gray-600 mt-2">Your saved businesses</Text>
      </View>
    </AuthGuard>
  );
}
