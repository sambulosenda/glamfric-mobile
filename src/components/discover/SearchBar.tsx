import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Search, X } from 'lucide-react-native';

export interface SearchBarProps {
  /**
   * Current search value
   */
  value: string;

  /**
   * Callback when search value changes
   */
  onChangeText: (text: string) => void;

  /**
   * Placeholder text
   */
  placeholder?: string;

  /**
   * Whether the search bar is disabled
   */
  disabled?: boolean;
}

/**
 * SearchBar Component
 *
 * Search input with icon and clear button.
 * Designed for business search functionality.
 *
 * @example
 * <SearchBar
 *   value={searchQuery}
 *   onChangeText={setSearchQuery}
 *   placeholder="Search for salons, services..."
 * />
 */
export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Search for salons, services...',
  disabled = false,
}) => {
  const handleClear = () => {
    onChangeText('');
  };

  return (
    <View className="px-4 py-3 bg-white border-b border-gray-200">
      <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2.5">
        {/* Search Icon */}
        <Search size={20} color="#9CA3AF" className="mr-2" />

        {/* Text Input */}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          editable={!disabled}
          className="flex-1 text-base text-gray-900"
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="never" // We have custom clear button
        />

        {/* Clear Button */}
        {value.length > 0 && (
          <TouchableOpacity
            onPress={handleClear}
            className="ml-2 p-1"
            activeOpacity={0.6}
            accessibilityLabel="Clear search"
            accessibilityRole="button"
          >
            <X size={18} color="#6B7280" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
