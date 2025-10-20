import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MapPin, ChevronDown } from 'lucide-react-native';

export interface LocationPickerProps {
  /**
   * Current location name
   */
  location: string;

  /**
   * Callback when location picker is pressed
   */
  onPress?: () => void;
}

/**
 * LocationPicker Component
 *
 * Clean location selector with minimal design.
 * Shows current location with dropdown indicator.
 *
 * @example
 * <LocationPicker
 *   location="Munich Center"
 *   onPress={() => openLocationModal()}
 * />
 */
export const LocationPicker: React.FC<LocationPickerProps> = ({
  location,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!onPress}
      className="flex-row items-center py-3 active:opacity-70"
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={`Current location: ${location}`}
      accessibilityHint="Double tap to change location"
    >
      <MapPin size={20} className="text-base-900 dark:text-white" />
      <Text className="ml-2 text-center text-base font-dm-sans-bold text-dark-0 dark:text-white leading-6">
        {location}
      </Text>
      {onPress && <ChevronDown size={20} className="text-base-500 dark:text-dark-3 ml-1" />}
    </TouchableOpacity>
  );
};
