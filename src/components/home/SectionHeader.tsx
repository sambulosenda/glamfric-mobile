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
    <View className="flex-row items-center justify-between mb-8">
      {/* Title */}
      <Text 
        style={{
          color: '#1C1C28',
          fontFamily: 'DM-Sans-Bold',
          fontSize: 19,
          letterSpacing: -0.38,
        }}
      >
        {title}
      </Text>

      {/* See All Link */}
      {onSeeAll && (
        <TouchableOpacity
          onPress={onSeeAll}
          className="flex-row items-center active:opacity-70"
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel={`See all ${title}`}
        >
          <Text 
            className="mr-1"
            style={{
              fontSize: 14,
              fontFamily: 'DM-Sans-SemiBold',
              color: '#2C01E2', // Brand primary color
            }}
          >
            see all
          </Text>
          <ChevronRight size={16} color="#2C01E2" />
        </TouchableOpacity>
      )}
    </View>
  );
};
