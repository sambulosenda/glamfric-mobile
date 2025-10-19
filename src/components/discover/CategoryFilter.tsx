import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { BUSINESS_CATEGORIES } from '@/constants/categories';

export interface CategoryFilterProps {
  /**
   * Currently selected category value
   */
  selectedCategory?: string;

  /**
   * Callback when category is selected
   */
  onSelectCategory: (category: string) => void;
}

/**
 * CategoryFilter Component
 *
 * Horizontal scrollable list of category chips for filtering businesses.
 *
 * @example
 * <CategoryFilter
 *   selectedCategory={selectedCategory}
 *   onSelectCategory={setSelectedCategory}
 * />
 */
export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory = 'all',
  onSelectCategory,
}) => {
  return (
    <View className="bg-white border-b border-gray-200 py-3">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="px-4"
        className="flex-row"
      >
        {BUSINESS_CATEGORIES.map((category, index) => {
          const isSelected = selectedCategory === category.value;

          return (
            <TouchableOpacity
              key={category.value}
              onPress={() => onSelectCategory(category.value)}
              className={`
                flex-row items-center px-4 py-2 rounded-full mr-2
                ${isSelected ? 'bg-red-500' : 'bg-gray-100'}
              `}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel={`Filter by ${category.label}`}
              accessibilityState={{ selected: isSelected }}
            >
              {/* Emoji Icon */}
              <Text className="text-base mr-1.5">{category.icon}</Text>

              {/* Label */}
              <Text
                className={`text-sm font-medium ${
                  isSelected ? 'text-white' : 'text-gray-700'
                }`}
              >
                {category.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
