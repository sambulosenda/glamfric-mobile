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
    <View className="py-3 bg-white">
      <View
        className={`flex-row items-center rounded-xl px-4 py-3.5 ${
          isFocused
            ? 'bg-white border border-gray-300 shadow-sm'
            : 'bg-gray-50 border border-transparent'
        }`}
      >
        {/* Search Icon */}
        <Search size={15} color="#717171" style={{ marginRight: 4 }} />

        {/* Text Input */}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          placeholderTextColor="#8F90A6"
          editable={!disabled}
          style={{
            flex: 1,
            fontFamily: 'DM-Sans',
            fontSize: 15,
            fontWeight: '400',
            lineHeight: 22.5,
            color: '#1C1C28', // Text color for typed content
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
            className="ml-3 w-9 h-9 items-center justify-center rounded-full active:bg-gray-200"
            activeOpacity={0.7}
            accessibilityLabel="Clear search"
            accessibilityRole="button"
          >
            <X size={20} color="#717171" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
