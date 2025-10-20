import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Star, MapPin } from 'lucide-react-native';
import type { Business } from '@/graphql/types/business';

export interface Offer {
  id: string;
  businessId: string;
  title: string;
  description?: string;
  discount: string; // e.g., "50% Off", "Buy 1 Get 1"
  imageUrl?: string;
  validUntil?: string;
}

export interface OfferCardProps {
  /**
   * Business associated with the offer
   */
  business: Business;

  /**
   * Offer details
   */
  offer: Offer;

  /**
   * Callback when card is pressed
   */
  onPress: () => void;
}

/**
 * OfferCard Component
 *
 * Clean promotional offer card with badge overlay.
 * Features Airbnb-inspired design with premium feel.
 *
 * @example
 * <OfferCard
 *   business={businessData}
 *   offer={offerData}
 *   onPress={() => router.push(`/offers/${offer.id}`)}
 * />
 */
export const OfferCard: React.FC<OfferCardProps> = ({
  business,
  offer,
  onPress,
}) => {
  const imageUrl = offer.imageUrl || business.profileImageUrl || business.coverImageUrl;
  const rating = business.rating ? Number(business.rating).toFixed(1) : null;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      className="bg-white rounded-2xl shadow-md overflow-hidden mr-4"
      style={{ width: 280 }}
      accessibilityRole="button"
      accessibilityLabel={`${offer.discount} off at ${business.businessName}`}
    >
      {/* Image with Badge */}
      <View className="relative">
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            style={{ width: 280, height: 200 }}
            contentFit="cover"
            transition={200}
          />
        ) : (
          <View className="w-full h-[200px] bg-gray-50 items-center justify-center">
            <Text className="text-gray-400 text-sm">No image</Text>
          </View>
        )}

        {/* Discount Badge */}
        <View className="absolute top-3 left-3 bg-purple-600 rounded-lg px-3 py-1.5 flex-row items-center shadow-md">
          <Text className="text-white text-sm font-bold">{offer.discount}</Text>
        </View>
      </View>

      {/* Content */}
      <View className="p-4">
        {/* Category Tag */}
        <Text className="text-xs font-semibold text-gray-500 uppercase mb-1">
          FOR {business.category === 'all' ? 'EVERYONE' : business.category.toUpperCase()}
        </Text>

        {/* Business Name */}
        <Text
          className="text-lg font-semibold text-gray-900 mb-1 tracking-tight"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {business.businessName}
        </Text>

        {/* Services/Description */}
        <Text className="text-sm font-normal text-gray-600 mb-2" numberOfLines={1}>
          {offer.description || 'Special offer available'}
        </Text>

        {/* Rating & Location Row */}
        <View className="flex-row items-center justify-between">
          {/* Rating */}
          {rating && (
            <View className="flex-row items-center">
              <Star size={14} color="#FBBF24" fill="#FBBF24" />
              <Text className="text-sm font-semibold text-gray-900 ml-1">
                {rating}
              </Text>
            </View>
          )}

          {/* Location */}
          {business.city && (
            <View className="flex-row items-center flex-1 ml-3">
              <MapPin size={14} color="#717171" />
              <Text
                className="text-sm font-normal text-gray-600 ml-1 flex-1"
                numberOfLines={1}
              >
                {business.city}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};
