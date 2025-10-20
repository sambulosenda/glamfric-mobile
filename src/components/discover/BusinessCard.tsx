import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Star, MapPin } from 'lucide-react-native';
import type { Business } from '@/graphql/types/business';
import { getCategoryLabel } from '@/constants/categories';

export interface BusinessCardProps {
  /**
   * Business data to display
   */
  business: Business;

  /**
   * Callback when card is pressed
   */
  onPress: () => void;
}

/**
 * BusinessCard Component
 *
 * Clean business card with image, category, name, services, rating, and location.
 * Minimal design matching the app's aesthetic.
 *
 * @example
 * <BusinessCard
 *   business={businessData}
 *   onPress={() => router.push(`/business/${businessData.id}`)}
 * />
 */
export const BusinessCard: React.FC<BusinessCardProps> = ({
  business,
  onPress,
}) => {
  const imageUrl = business.profileImageUrl || business.coverImageUrl;
  const rating = business.rating ? Number(business.rating).toFixed(1) : null;
  const categoryLabel = getCategoryLabel(business.category);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      className="bg-white rounded-xl mb-4 overflow-hidden"
      accessibilityRole="button"
      accessibilityLabel={`View ${business.businessName}`}
    >
      {/* Image */}
      <View className="relative">
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            className="w-full h-[200px]"
            resizeMode="cover"
          />
        ) : (
          <View className="w-full h-[200px] bg-gray-50 items-center justify-center">
            <Text className="text-gray-400 text-sm">{categoryLabel}</Text>
          </View>
        )}
      </View>

      {/* Content */}
      <View className="p-4">
        {/* Category Tag */}
        <Text className="text-xs font-semibold text-gray-500 uppercase mb-1">
          FOR {business.category === 'all' ? 'EVERYONE' : business.category.toUpperCase()}
        </Text>

        {/* Business Name */}
        <Text
          className="text-lg font-semibold text-gray-900 mb-1"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {business.businessName}
        </Text>

        {/* Services - placeholder for now */}
        <Text className="text-sm font-normal text-gray-600 mb-2" numberOfLines={1}>
          Haircut, Spa, Massage
        </Text>

        {/* Rating */}
        {rating && (
          <View className="flex-row items-center mb-2">
            <Star size={14} color="#FBBF24" fill="#FBBF24" />
            <Text className="text-sm font-semibold text-gray-900 ml-1">
              {rating}
            </Text>
          </View>
        )}

        {/* Location • Distance • Price */}
        <View className="flex-row items-center">
          <Text className="text-sm font-normal text-gray-600" numberOfLines={1}>
            {business.city || 'Keira throughway'}
          </Text>
          <Text className="text-sm font-normal text-gray-600 mx-1">•</Text>
          <Text className="text-sm font-normal text-gray-600">5.0 Kms</Text>
          <Text className="text-sm font-normal text-gray-600 mx-1">•</Text>
          <Text className="text-sm font-normal text-gray-600">$$</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
