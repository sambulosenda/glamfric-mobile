import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { ChevronDown, Sparkles, TrendingUp } from 'lucide-react-native';

export interface FilterState {
  gender: 'all' | 'men' | 'women';
  priceRange: 'all' | 'low' | 'medium' | 'high';
  hasOffers: boolean;
  sortBy: 'rating' | 'distance' | 'popular';
}

export interface FilterChipsProps {
  /**
   * Current filter state
   */
  filters: FilterState;

  /**
   * Callback when filters change
   */
  onFilterChange: (filters: Partial<FilterState>) => void;
}

/**
 * FilterChips Component
 *
 * Clean filter chips with Airbnb-inspired design.
 * Includes Gender, Price, Offers, and Rating filters.
 *
 * @example
 * <FilterChips
 *   filters={filters}
 *   onFilterChange={setFilters}
 * />
 */
export const FilterChips: React.FC<FilterChipsProps> = ({
  filters,
  onFilterChange,
}) => {
  const getGenderLabel = () => {
    if (filters.gender === 'all') return 'Gender';
    return filters.gender === 'men' ? 'For Men' : 'For Women';
  };

  const getPriceLabel = () => {
    if (filters.priceRange === 'all') return 'Price';
    return filters.priceRange.charAt(0).toUpperCase() + filters.priceRange.slice(1);
  };

  const getSortLabel = () => {
    switch (filters.sortBy) {
      case 'rating':
        return 'Rating';
      case 'distance':
        return 'Distance';
      case 'popular':
        return 'Popular';
      default:
        return 'Sort';
    }
  };

  return (
    <View className="bg-white dark:bg-dark-0 pb-3 mt-4 mb-4">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="flex-row"
        contentContainerStyle={{ paddingLeft: 24, paddingRight: 24 }}
      >
        {/* Gender Filter */}
        <TouchableOpacity
          onPress={() => {
            // Cycle through gender options
            const next =
              filters.gender === 'all'
                ? 'men'
                : filters.gender === 'men'
                ? 'women'
                : 'all';
            onFilterChange({ gender: next });
          }}
          className={`flex-row items-center px-3 py-1 rounded-full mr-2.5 gap-2.5 ${
            filters.gender !== 'all'
              ? 'bg-gray-900 dark:bg-white'
              : 'bg-base-100 dark:bg-dark-2'
          }`}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel={`Filter by gender: ${getGenderLabel()}`}
        >
          <Text
            className={`text-center font-dm-sans text-sm ${
              filters.gender !== 'all'
                ? 'text-white dark:text-gray-900'
                : 'text-dark-0 dark:text-white'
            }`}
            style={{ letterSpacing: 0.1 }}
          >
            {getGenderLabel()}
          </Text>
          <ChevronDown
            size={16}
            className={`${filters.gender !== 'all' ? 'text-white dark:text-gray-900' : 'text-base-500 dark:text-dark-3'}`}
          />
        </TouchableOpacity>

        {/* Price Filter */}
        <TouchableOpacity
          onPress={() => {
            // Cycle through price ranges
            const next =
              filters.priceRange === 'all'
                ? 'low'
                : filters.priceRange === 'low'
                ? 'medium'
                : filters.priceRange === 'medium'
                ? 'high'
                : 'all';
            onFilterChange({ priceRange: next });
          }}
          className={`flex-row items-center px-3 py-1 rounded-full mr-2.5 gap-2.5 ${
            filters.priceRange !== 'all'
              ? 'bg-gray-900 dark:bg-white'
              : 'bg-base-100 dark:bg-dark-2'
          }`}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel={`Filter by price: ${getPriceLabel()}`}
        >
          <Text
            className={`text-center font-dm-sans text-sm ${
              filters.priceRange !== 'all'
                ? 'text-white dark:text-gray-900'
                : 'text-dark-0 dark:text-white'
            }`}
            style={{ letterSpacing: 0.1 }}
          >
            {getPriceLabel()}
          </Text>
          <ChevronDown
            size={16}
            className={`${filters.priceRange !== 'all' ? 'text-white dark:text-gray-900' : 'text-base-500 dark:text-dark-3'}`}
          />
        </TouchableOpacity>

        {/* Offers Filter */}
        <TouchableOpacity
          onPress={() => onFilterChange({ hasOffers: !filters.hasOffers })}
          className={`flex-row items-center px-3 py-1 rounded-full mr-2.5 gap-2.5 ${
            filters.hasOffers
              ? 'bg-gray-900 dark:bg-white'
              : 'bg-base-100 dark:bg-dark-2'
          }`}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Filter by offers"
          accessibilityState={{ selected: filters.hasOffers }}
        >
          <Sparkles
            size={16}
            className={`${filters.hasOffers ? 'text-white dark:text-gray-900' : 'text-base-500 dark:text-dark-3'}`}
          />
          <Text
            className={`text-center font-dm-sans text-sm ${
              filters.hasOffers
                ? 'text-white dark:text-gray-900'
                : 'text-dark-0 dark:text-white'
            }`}
            style={{ letterSpacing: 0.1 }}
          >
            Offers
          </Text>
        </TouchableOpacity>

        {/* Sort Filter */}
        <TouchableOpacity
          onPress={() => {
            // Cycle through sort options
            const next =
              filters.sortBy === 'rating'
                ? 'distance'
                : filters.sortBy === 'distance'
                ? 'popular'
                : 'rating';
            onFilterChange({ sortBy: next });
          }}
          className="flex-row items-center px-3 py-1 rounded-full gap-2.5 bg-base-100 dark:bg-dark-2"
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel={`Sort by ${getSortLabel()}`}
        >
          <Text
            className="text-center font-dm-sans text-sm text-dark-0 dark:text-white"
            style={{ letterSpacing: 0.1 }}
          >
            {getSortLabel()}
          </Text>
          <TrendingUp size={16} className="text-base-500 dark:text-dark-3" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
