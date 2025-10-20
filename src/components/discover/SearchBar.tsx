import React, { useState } from 'react';
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
 * Airbnb-inspired search input with clean design, focus states, and clear button.
 * Features generous rounding, soft colors, and smooth transitions.
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
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    onChangeText('');
  };

  return (
    <View className="py-3 bg-white dark:bg-dark-0">
      <View
        className={`flex-row items-center rounded-xl px-4 py-3.5 ${
          isFocused
            ? 'bg-white dark:bg-dark-1 border border-gray-300 dark:border-dark-3 shadow-sm'
            : 'bg-gray-50 dark:bg-dark-2 border border-transparent'
        }`}
      >
        {/* Search Icon */}
        <Search size={15} className="text-base-500 dark:text-dark-3 mr-1" />

        {/* Text Input */}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          placeholderTextColor="#8F90A6"
          editable={!disabled}
          className="flex-1 font-dm-sans text-base text-dark-0 dark:text-white"
          style={{
            lineHeight: 22.5,
          }}
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="never"
        />

        {/* Clear Button */}
        {value.length > 0 && (
          <TouchableOpacity
            onPress={handleClear}
            className="ml-3 w-9 h-9 items-center justify-center rounded-full active:bg-gray-200 dark:active:bg-dark-3"
            activeOpacity={0.7}
            accessibilityLabel="Clear search"
            accessibilityRole="button"
          >
            <X size={20} className="text-base-500 dark:text-dark-3" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
