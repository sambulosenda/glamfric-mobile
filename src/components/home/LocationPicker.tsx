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
      className="flex-row items-center px-4 py-3 active:opacity-70"
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={`Current location: ${location}`}
      accessibilityHint="Double tap to change location"
    >
      <MapPin size={20} color="#222222" />
      <Text className="text-base font-semibold text-gray-900 ml-2">
        {location}
      </Text>
      {onPress && <ChevronDown size={20} color="#717171" className="ml-1" />}
    </TouchableOpacity>
  );
};
