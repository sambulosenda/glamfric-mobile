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
    <View className="bg-white pb-3 mt-4 mb-4">
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
          className={`flex-row items-start px-3 py-1 rounded-full mr-2.5 ${
            filters.gender !== 'all'
              ? 'bg-gray-900'
              : ''
          }`}
          style={{
            backgroundColor: filters.gender !== 'all' ? undefined : '#F2F2F5',
            gap: 10,
          }}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel={`Filter by gender: ${getGenderLabel()}`}
        >
          <Text
            className={`${
              filters.gender !== 'all'
                ? 'text-white'
                : ''
            }`}
            style={{
              color: filters.gender !== 'all' ? '#FFFFFF' : '#1C1C28',
              textAlign: 'center',
              fontFamily: 'DM-Sans',
              fontSize: 13,
              fontWeight: '400',
              letterSpacing: 0.1,
            }}
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
          className={`flex-row items-start px-3 py-1 rounded-full mr-2.5 ${
            filters.priceRange !== 'all'
              ? 'bg-gray-900'
              : ''
          }`}
          style={{
            backgroundColor: filters.priceRange !== 'all' ? undefined : '#F2F2F5',
            gap: 10,
          }}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel={`Filter by price: ${getPriceLabel()}`}
        >
          <Text
            style={{
              color: filters.priceRange !== 'all' ? '#FFFFFF' : '#1C1C28',
              textAlign: 'center',
              fontFamily: 'DM-Sans',
              fontSize: 13,
              fontWeight: '400',
              letterSpacing: 0.1,
            }}
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
          className={`flex-row items-start px-3 py-1 rounded-full mr-2.5 ${
            filters.hasOffers
              ? 'bg-gray-900'
              : ''
          }`}
          style={{
            backgroundColor: filters.hasOffers ? undefined : '#F2F2F5',
            gap: 10,
          }}
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
            style={{
              color: filters.hasOffers ? '#FFFFFF' : '#1C1C28',
              textAlign: 'center',
              fontFamily: 'DM-Sans',
              fontSize: 13,
              fontWeight: '400',
              letterSpacing: 0.1,
            }}
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
          className="flex-row items-start px-3 py-1 rounded-full"
          style={{
            backgroundColor: '#F2F2F5',
            gap: 10,
          }}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel={`Sort by ${getSortLabel()}`}
        >
          <Text
            style={{
              color: '#1C1C28',
              textAlign: 'center',
              fontFamily: 'DM-Sans',
              fontSize: 13,
              fontWeight: '400',
              letterSpacing: 0.1,
            }}
          >
            {getSortLabel()}
          </Text>
          <TrendingUp size={16} color="#717171" className="ml-1.5" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
