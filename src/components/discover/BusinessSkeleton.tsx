import React from 'react';
import { View } from 'react-native';

/**
 * BusinessSkeleton Component
 *
 * Loading placeholder for business cards.
 * Shows animated skeleton while data is loading.
 */
export const BusinessSkeleton: React.FC = () => {
  return (
    <View className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 mb-3">
      {/* Image Skeleton */}
      <View className="w-full h-48 bg-gray-200 animate-pulse" />

      {/* Content Skeleton */}
      <View className="p-4">
        {/* Title Skeleton */}
        <View className="h-5 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />

        {/* Category Skeleton */}
        <View className="h-4 bg-gray-200 rounded w-1/2 mb-3 animate-pulse" />

        {/* Rating Skeleton */}
        <View className="h-4 bg-gray-200 rounded w-1/3 mb-2 animate-pulse" />

        {/* Location Skeleton */}
        <View className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
      </View>
    </View>
  );
};

/**
 * BusinessSkeletonList Component
 *
 * Renders multiple skeleton cards for loading state.
 */
export const BusinessSkeletonList: React.FC<{ count?: number }> = ({
  count = 3,
}) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <BusinessSkeleton key={index} />
      ))}
    </>
  );
};
