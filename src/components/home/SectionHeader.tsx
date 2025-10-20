import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';

export interface SectionHeaderProps {
  /**
   * Section title
   */
  title: string;

  /**
   * Callback when "See all" is pressed
   */
  onSeeAll?: () => void;
}

/**
 * SectionHeader Component
 *
 * Clean section header with title and optional "see all" link.
 * Follows Airbnb's minimal aesthetic.
 *
 * @example
 * <SectionHeader
 *   title="Popular near you"
 *   onSeeAll={() => router.push('/popular')}
 * />
 */
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  onSeeAll,
}) => {
  return (
    <View className="flex-row items-center justify-between px-4 mb-4">
      {/* Title */}
      <Text className="text-xl font-bold text-gray-900">{title}</Text>

      {/* See All Link */}
      {onSeeAll && (
        <TouchableOpacity
          onPress={onSeeAll}
          className="flex-row items-center active:opacity-70"
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel={`See all ${title}`}
        >
          <Text className="text-sm font-semibold text-red-500 mr-1">
            see all
          </Text>
          <ChevronRight size={16} color="#EF4444" />
        </TouchableOpacity>
      )}
    </View>
  );
};
