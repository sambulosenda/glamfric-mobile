import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Heart, Star, MapPin } from 'lucide-react-native';
import type { Business } from '@/graphql/types/business';
import { getCategoryLabel } from '@/constants/categories';
import { useAuthGuard } from '@/hooks';

export interface BusinessCardProps {
  /**
   * Business data to display
   */
  business: Business;

  /**
   * Callback when card is pressed
   */
  onPress: () => void;

  /**
   * Callback when favorite button is pressed
   */
  onFavorite?: () => void;

  /**
   * Whether this business is favorited
   */
  isFavorited?: boolean;
}

/**
 * BusinessCard Component
 *
 * Displays a business in a card format with image, name, rating, and actions.
 * Used in the Discover screen business grid/list.
 *
 * @example
 * <BusinessCard
 *   business={businessData}
 *   onPress={() => router.push(`/business/${businessData.id}`)}
 *   onFavorite={handleFavorite}
 *   isFavorited={false}
 * />
 */
export const BusinessCard: React.FC<BusinessCardProps> = ({
  business,
  onPress,
  onFavorite,
  isFavorited = false,
}) => {
  const { requireAuth } = useAuthGuard();

  const handleFavoritePress = () => {
    if (!onFavorite) return;

    // Require auth for favorites - guests will see login prompt
    requireAuth(() => {
      onFavorite();
    }, {
      message: 'Sign in to save your favorite businesses',
    });
  };

  const imageUrl = business.profileImageUrl || business.coverImageUrl;
  const rating = business.rating ? Number(business.rating).toFixed(1) : null;
  const categoryLabel = getCategoryLabel(business.category);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 mb-3"
      accessibilityRole="button"
      accessibilityLabel={`View ${business.businessName}`}
    >
      {/* Image */}
      <View className="relative">
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            className="w-full h-48"
            resizeMode="cover"
          />
        ) : (
          <View className="w-full h-48 bg-gray-200 items-center justify-center">
            <Text className="text-gray-400 text-sm">{categoryLabel}</Text>
          </View>
        )}

        {/* Favorite Button */}
        <TouchableOpacity
          onPress={handleFavoritePress}
          className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md"
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart
            size={20}
            color={isFavorited ? '#EF4444' : '#6B7280'}
            fill={isFavorited ? '#EF4444' : 'none'}
          />
        </TouchableOpacity>

        {/* Verified Badge */}
        {business.isVerified && (
          <View className="absolute top-3 left-3 bg-blue-500 rounded-full px-2 py-1">
            <Text className="text-white text-xs font-semibold">✓ Verified</Text>
          </View>
        )}
      </View>

      {/* Content */}
      <View className="p-4">
        {/* Business Name */}
        <Text
          className="text-lg font-bold text-gray-900 mb-1"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {business.businessName}
        </Text>

        {/* Category */}
        <Text className="text-sm text-gray-600 mb-2">{categoryLabel}</Text>

        {/* Rating & Reviews */}
        {rating && (
          <View className="flex-row items-center mb-2">
            <Star size={16} color="#FBBF24" fill="#FBBF24" />
            <Text className="text-sm font-semibold text-gray-900 ml-1">
              {rating}
            </Text>
            {business.totalReviews > 0 && (
              <Text className="text-sm text-gray-600 ml-1">
                ({business.totalReviews})
              </Text>
            )}
          </View>
        )}

        {/* Location */}
        {business.city && (
          <View className="flex-row items-center">
            <MapPin size={14} color="#6B7280" />
            <Text className="text-sm text-gray-600 ml-1" numberOfLines={1}>
              {business.city}{business.state ? `, ${business.state}` : ''}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
