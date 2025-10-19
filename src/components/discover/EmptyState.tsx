import React from 'react';
import { View, Text } from 'react-native';
import { Search, Store } from 'lucide-react-native';

export interface EmptyStateProps {
  /**
   * Type of empty state to display
   */
  type?: 'no-results' | 'no-businesses' | 'error';

  /**
   * Optional custom message
   */
  message?: string;
}

/**
 * EmptyState Component
 *
 * Displays friendly empty states when no businesses are found.
 *
 * @example
 * <EmptyState type="no-results" />
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  type = 'no-results',
  message,
}) => {
  const getContent = () => {
    switch (type) {
      case 'no-results':
        return {
          icon: <Search size={48} color="#9CA3AF" />,
          title: 'No businesses found',
          description: message || 'Try adjusting your search or filter criteria',
        };
      case 'no-businesses':
        return {
          icon: <Store size={48} color="#9CA3AF" />,
          title: 'No businesses yet',
          description: message || 'Check back soon for new businesses in your area',
        };
      case 'error':
        return {
          icon: <Text className="text-5xl">⚠️</Text>,
          title: 'Something went wrong',
          description: message || 'Unable to load businesses. Please try again.',
        };
      default:
        return {
          icon: <Search size={48} color="#9CA3AF" />,
          title: 'No results',
          description: message || 'Try a different search',
        };
    }
  };

  const content = getContent();

  return (
    <View className="flex-1 items-center justify-center px-8 py-16">
      {/* Icon */}
      <View className="mb-4">{content.icon}</View>

      {/* Title */}
      <Text className="text-xl font-bold text-gray-900 mb-2 text-center">
        {content.title}
      </Text>

      {/* Description */}
      <Text className="text-base text-gray-600 text-center">
        {content.description}
      </Text>
    </View>
  );
};
