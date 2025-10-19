import { View, Text, TouchableOpacity } from 'react-native';
import { useAuthStore } from '@/store';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)/login');
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
        >
          <Text className="text-white font-semibold">Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
