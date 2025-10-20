import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Search, Store, AlertCircle, WifiOff } from 'lucide-react-native';

export interface EmptyStateProps {
  /**
   * Type of empty state to display
   */
  type?: 'no-results' | 'no-businesses' | 'error' | 'no-connection';

  /**
   * Optional custom message
   */
  message?: string;

  /**
   * Optional retry callback for error states
   */
  onRetry?: () => void;
}

/**
 * EmptyState Component
 *
 * Airbnb-inspired empty states with friendly messaging,
 * large icons, and soft colors.
 *
 * @example
 * <EmptyState type="no-results" />
 * <EmptyState type="error" onRetry={handleRetry} />
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  type = 'no-results',
  message,
  onRetry,
}) => {
  const getContent = () => {
    switch (type) {
      case 'no-results':
        return {
          icon: <Search size={64} color="#DDDDDD" />,
          title: 'No matches found',
          description:
            message || 'Try adjusting your search or explore different categories',
        };
      case 'no-businesses':
        return {
          icon: <Store size={64} color="#DDDDDD" />,
          title: 'No businesses yet',
          description:
            message || "We're always adding new businesses. Check back soon!",
        };
      case 'no-connection':
        return {
          icon: <WifiOff size={64} color="#DDDDDD" />,
          title: 'No internet connection',
          description: message || 'Check your connection and try again',
        };
      case 'error':
        return {
          icon: <AlertCircle size={64} color="#DDDDDD" />,
          title: 'Something went wrong',
          description:
            message || "We couldn't load businesses right now. Please try again.",
        };
      default:
        return {
          icon: <Search size={64} color="#DDDDDD" />,
          title: 'No results',
          description: message || 'Try a different search',
        };
    }
  };

  const content = getContent();
  const showRetryButton = (type === 'error' || type === 'no-connection') && onRetry;

  return (
    <View className="flex-1 items-center justify-center px-8 py-16 bg-white">
      {/* Icon with circular background */}
      <View className="w-[120px] h-[120px] rounded-full bg-gray-50 items-center justify-center mb-6">
        {content.icon}
      </View>

      {/* Title */}
      <Text className="text-2xl font-semibold text-gray-700 mb-3 text-center max-w-[320px]">
        {content.title}
      </Text>

      {/* Description */}
      <Text className="text-base font-normal text-gray-600 leading-6 text-center max-w-[300px]">
        {content.description}
      </Text>

      {/* Optional Retry Button */}
      {showRetryButton && (
        <TouchableOpacity
          onPress={onRetry}
          className="mt-6 px-6 py-3 bg-white border-[1.5px] border-gray-300 rounded-xl active:bg-gray-50"
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Retry loading"
        >
          <Text className="text-base font-medium text-gray-900">Try Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
