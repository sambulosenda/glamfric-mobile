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
    <View className="bg-white pb-3">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="px-4"
        className="flex-row"
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
          className={`flex-row items-center px-4 py-2.5 rounded-full mr-2.5 ${
            filters.gender !== 'all'
              ? 'bg-gray-900'
              : 'bg-white border-[1.5px] border-gray-300'
          }`}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel={`Filter by gender: ${getGenderLabel()}`}
        >
          <Text
            className={`text-[15px] ${
              filters.gender !== 'all'
                ? 'font-semibold text-white'
                : 'font-medium text-gray-700'
            }`}
          >
            {getGenderLabel()}
          </Text>
          <ChevronDown
            size={16}
            color={filters.gender !== 'all' ? '#FFFFFF' : '#717171'}
            className="ml-1"
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
          className={`flex-row items-center px-4 py-2.5 rounded-full mr-2.5 ${
            filters.priceRange !== 'all'
              ? 'bg-gray-900'
              : 'bg-white border-[1.5px] border-gray-300'
          }`}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel={`Filter by price: ${getPriceLabel()}`}
        >
          <Text
            className={`text-[15px] ${
              filters.priceRange !== 'all'
                ? 'font-semibold text-white'
                : 'font-medium text-gray-700'
            }`}
          >
            {getPriceLabel()}
          </Text>
          <ChevronDown
            size={16}
            color={filters.priceRange !== 'all' ? '#FFFFFF' : '#717171'}
            className="ml-1"
          />
        </TouchableOpacity>

        {/* Offers Filter */}
        <TouchableOpacity
          onPress={() => onFilterChange({ hasOffers: !filters.hasOffers })}
          className={`flex-row items-center px-4 py-2.5 rounded-full mr-2.5 ${
            filters.hasOffers
              ? 'bg-gray-900'
              : 'bg-white border-[1.5px] border-gray-300'
          }`}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Filter by offers"
          accessibilityState={{ selected: filters.hasOffers }}
        >
          <Sparkles
            size={16}
            color={filters.hasOffers ? '#FFFFFF' : '#717171'}
            className="mr-1.5"
          />
          <Text
            className={`text-[15px] ${
              filters.hasOffers
                ? 'font-semibold text-white'
                : 'font-medium text-gray-700'
            }`}
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
          className="flex-row items-center px-4 py-2.5 rounded-full bg-white border-[1.5px] border-gray-300"
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel={`Sort by ${getSortLabel()}`}
        >
          <Text className="text-[15px] font-medium text-gray-700">
            {getSortLabel()}
          </Text>
          <TrendingUp size={16} color="#717171" className="ml-1.5" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
