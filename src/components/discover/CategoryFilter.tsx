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
 * Airbnb-inspired horizontal scrollable category chips.
 * Features full pill shapes, subtle borders, and elegant selected states.
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
    <View className="bg-white py-4 shadow-sm">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="px-4"
        className="flex-row"
      >
        {BUSINESS_CATEGORIES.map((category) => {
          const isSelected = selectedCategory === category.value;

          return (
            <TouchableOpacity
              key={category.value}
              onPress={() => onSelectCategory(category.value)}
              className={`flex-row items-center px-5 py-2.5 rounded-full mr-2.5 ${
                isSelected
                  ? 'bg-gray-900 shadow-sm'
                  : 'bg-white border-[1.5px] border-gray-300'
              }`}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel={`Filter by ${category.label}`}
              accessibilityState={{ selected: isSelected }}
            >
              {/* Emoji Icon */}
              <Text className="text-lg mr-2">{category.icon}</Text>

              {/* Label */}
              <Text
                className={`text-[15px] ${
                  isSelected
                    ? 'font-semibold text-white'
                    : 'font-medium text-gray-700'
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
