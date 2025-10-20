import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Heart, Star, MapPin, CheckCircle } from 'lucide-react-native';
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
 * Airbnb-inspired business card with premium image presentation,
 * clean typography, and refined interactions.
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
      activeOpacity={0.9}
      className="bg-white rounded-2xl shadow-md mb-4 overflow-hidden"
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

        {/* Favorite Button */}
        {onFavorite && (
          <TouchableOpacity
            onPress={handleFavoritePress}
            className="absolute top-3 right-3 w-9 h-9 bg-white/95 rounded-full items-center justify-center shadow-md active:scale-90"
            activeOpacity={0.9}
            accessibilityRole="button"
            accessibilityLabel={
              isFavorited ? 'Remove from favorites' : 'Add to favorites'
            }
          >
            <Heart
              size={20}
              color={isFavorited ? '#EF4444' : '#484848'}
              fill={isFavorited ? '#EF4444' : 'none'}
            />
          </TouchableOpacity>
        )}

        {/* Verified Badge */}
        {business.isVerified && (
          <View className="absolute top-3 left-3 bg-white rounded-md px-2 py-1 flex-row items-center border border-sky-100 shadow-sm">
            <CheckCircle size={12} color="#0EA5E9" />
            <Text className="text-xs font-semibold text-sky-500 ml-1">
              Verified
            </Text>
          </View>
        )}
      </View>

      {/* Content */}
      <View className="p-4">
        {/* Business Name */}
        <Text
          className="text-lg font-semibold text-gray-900 mb-1 tracking-tight"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {business.businessName}
        </Text>

        {/* Category */}
        <Text className="text-sm font-normal text-gray-600 mb-2">
          {categoryLabel}
        </Text>

        {/* Rating & Reviews */}
        {rating && (
          <View className="flex-row items-center mb-2">
            <Star size={14} color="#FBBF24" fill="#FBBF24" />
            <Text className="text-sm font-semibold text-gray-900 ml-1">
              {rating}
            </Text>
            {business.totalReviews > 0 && (
              <Text className="text-sm font-normal text-gray-600 ml-1">
                ({business.totalReviews})
              </Text>
            )}
          </View>
        )}

        {/* Location */}
        {business.city && (
          <View className="flex-row items-center">
            <MapPin size={14} color="#717171" />
            <Text
              className="text-sm font-normal text-gray-600 ml-1 flex-1"
              numberOfLines={1}
            >
              {business.city}
              {business.state ? `, ${business.state}` : ''}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
