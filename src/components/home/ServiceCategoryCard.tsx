import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';

export interface ServiceCategoryCardProps {
  /**
   * Service category image URL
   */
  image: string;

  /**
   * Service category title
   */
  title: string;

  /**
   * Callback when card is pressed
   */
  onPress: () => void;
}

/**
 * ServiceCategoryCard Component
 *
 * Clean circular service category card with image and title.
 * Features soft shadows and elegant design.
 *
 * @example
 * <ServiceCategoryCard
 *   image="https://..."
 *   title="Haircut for men"
 *   onPress={() => router.push('/services/haircut')}
 * />
 */
export const ServiceCategoryCard: React.FC<ServiceCategoryCardProps> = ({
  image,
  title,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="items-center mr-3"
      style={{ width: 120 }}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={`Browse ${title}`}
    >
      {/* Circular Image */}
      <View className="w-[120px] h-[120px] rounded-full overflow-hidden mb-3 shadow-md bg-gray-100">
        <Image
          source={{ uri: image }}
          style={{ width: 120, height: 120 }}
          contentFit="cover"
          transition={200}
        />
      </View>

      {/* Title */}
      <Text
        className="text-sm font-medium text-gray-900 text-center leading-5"
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
