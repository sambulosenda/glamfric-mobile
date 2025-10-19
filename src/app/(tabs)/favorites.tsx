import { View, Text } from 'react-native';

export default function FavoritesScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold text-gray-900">Favorites</Text>
      <Text className="text-gray-600 mt-2">Your saved businesses</Text>
    </View>
  );
}
