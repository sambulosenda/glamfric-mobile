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
      className="items-center mr-3 mt-30"
      style={{ width: 88 }}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={`Browse ${title}`}
    >
      {/* Circular Image */}
      <View 
        className="overflow-hidden mb-3 shadow-md"
        style={{
          width: 88,
          height: 88,
          borderRadius: 60,
          backgroundColor: '#C4C4C4', // Figma fallback color
        }}
      >
        <Image
          source={{ uri: image }}
          style={{ 
            width: 88, 
            height: 88,
            borderRadius: 60,
          }}
          contentFit="cover"
          transition={200}
        />
      </View>

      {/* Title */}
      <Text
        className="text-center font-normal text-[13px] tracking-[0.1px] text-dark-0"
        style={{ fontFamily: 'DM-Sans' }}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
