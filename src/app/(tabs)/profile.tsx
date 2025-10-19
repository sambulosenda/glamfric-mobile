import { View, Text, TouchableOpacity } from 'react-native';
import { User } from 'lucide-react-native';
import { useAuthStore } from '@/store';
import { useRouter } from 'expo-router';
import { AuthGuard, LoginPrompt } from '@/components/auth';

/**
 * Profile Screen (Protected)
 *
 * Requires authentication to view.
 * Shows LoginPrompt for guest users.
 */
function ProfileContent() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    // After logout, user stays on tabs but sees LoginPrompt
    // No need to redirect - let AuthGuard handle the UI
  };

  return (
    <View className="flex-1 bg-white p-6">
      <View className="items-center justify-center flex-1">
        <Text className="text-2xl font-bold text-gray-900">Profile</Text>
        {user && (
          <View className="mt-4">
            <Text className="text-lg text-gray-700">Name: {user.name}</Text>
            <Text className="text-gray-600">Email: {user.email}</Text>
          </View>
        )}

        <TouchableOpacity
          onPress={handleLogout}
          className="mt-8 bg-red-500 px-6 py-3 rounded-lg"
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Log out of your account"
        >
          <Text className="text-white font-semibold">Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function ProfileScreen() {
  return (
    <AuthGuard
      fallback={
        <LoginPrompt
          title="Your Profile"
          message="Sign in to view and manage your account"
          icon={<User size={32} color="#6B7280" />}
        />
      }
    >
      <ProfileContent />
    </AuthGuard>
  );
}
