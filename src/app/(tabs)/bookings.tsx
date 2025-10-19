import { View, Text } from 'react-native';

export default function BookingsScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold text-gray-900">My Bookings</Text>
      <Text className="text-gray-600 mt-2">View and manage your appointments</Text>
    </View>
  );
}
