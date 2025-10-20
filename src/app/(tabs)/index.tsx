import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useBusinessSearch } from '@/hooks';
import { SearchBar, BusinessCard, EmptyState } from '@/components/discover';
import {
  LocationPicker,
  FilterChips,
  SectionHeader,
  ServiceCategoryCard,
  OfferCard,
  type FilterState,
} from '@/components/home';
import { BEAUTY_SERVICES } from '@/constants/services';

/**
 * Home Screen
 *
 * Clean, Airbnb-inspired home screen with multiple discovery sections.
 * Public screen - accessible to all users.
 *
 * Sections:
 * - Location picker
 * - Search bar
 * - Filter chips
 * - Beauty services (circular categories)
 * - Popular near you (business cards)
 * - Best offers (promotional cards)
 */
export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    gender: 'all',
    priceRange: 'all',
    hasOffers: false,
    sortBy: 'rating',
  });

  // Search query state
  const [searchQuery, setSearchQuery] = useState('');

  // Search hook with filters
  const { businesses, loading, error, setSearchQuery: updateSearchQuery, setSelectedCategory } = useBusinessSearch({
    initialQuery: searchQuery,
    initialCategory: filters.gender !== 'all' ? filters.gender : undefined,
    limit: 20,
    debounceMs: 300,
  });

  // Sync component state with hook state
  useEffect(() => {
    updateSearchQuery(searchQuery);
  }, [searchQuery, updateSearchQuery]);

  useEffect(() => {
    const category = filters.gender !== 'all' ? filters.gender : undefined;
    setSelectedCategory(category);
  }, [filters.gender, setSelectedCategory]);

  const handleBusinessPress = (businessId: string) => {
    router.push(`/business/${businessId}` as any);
  };

  const handleServicePress = (serviceId: string) => {
    console.log('Service pressed:', serviceId);
    // TODO: Navigate to service detail or filtered results
  };

  const handleOfferPress = (offerId: string) => {
    console.log('Offer pressed:', offerId);
    // TODO: Navigate to offer detail
  };

  // Mock popular businesses (use first 6 from search results)
  const popularBusinesses = businesses.slice(0, 6);

  // Mock offers data (will be replaced with GraphQL query)
  const mockOffers = popularBusinesses.slice(0, 3).map((business, index) => ({
    id: `offer-${index}`,
    businessId: business.id,
    title: `${business.businessName} Special`,
    description: 'Limited time offer',
    discount: index === 0 ? '50% Off' : index === 1 ? '30% Off' : '25% Off',
    imageUrl: business.coverImageUrl || business.profileImageUrl,
    validUntil: new Date().toISOString(),
  }));

  return (
    <View className="flex-1 bg-white dark:bg-dark-0">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top,
          paddingBottom: insets.bottom + 80,
        }}
      >
        {/* Container with max width for large screens */}
        <View className="max-w-7xl self-center w-full">
          {/* Location Picker */}
          <View className="px-6 md:px-8 lg:px-12">
            <LocationPicker
              location="Munich Center"
              onPress={() => console.log('Open location picker')}
            />
          </View>

          {/* Search Bar */}
          <View className="px-6 md:px-8 lg:px-12">
            <SearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Shop name or service"
            />
          </View>

          {/* Filter Chips */}
          <FilterChips
            filters={filters}
            onFilterChange={(newFilters) =>
              setFilters({ ...filters, ...newFilters })
            }
          />

          {/* Beauty Services Section */}
          <View className="mb-6 mt-6">
            <View className="px-6 md:px-8 lg:px-12">
              <SectionHeader
                title="Beauty Services"
                onSeeAll={() => console.log('See all services')}
              />
            </View>
            {/* Responsive grid: 3 cols on mobile, 6 cols on tablet */}
            <View className="px-6 md:px-8 lg:px-12">
              <View className="flex-row flex-wrap justify-between gap-y-4">
                {BEAUTY_SERVICES.map((service) => (
                  <View key={service.id} className="w-[30%] md:w-[15%]">
                    <ServiceCategoryCard
                      image={service.image}
                      title={service.title}
                      onPress={() => handleServicePress(service.id)}
                    />
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* Popular Near You Section */}
          {popularBusinesses.length > 0 && (
            <View className="mb-6">
              <View className="px-6 md:px-8 lg:px-12">
                <SectionHeader
                  title="Popular near you"
                  onSeeAll={() => console.log('See all popular')}
                />
              </View>
              {/* Horizontal scroll on mobile, grid on tablet */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="flex-row md:hidden"
                contentContainerStyle={{ paddingLeft: 24, paddingRight: 24 }}
              >
                {popularBusinesses.map((business) => (
                  <View key={business.id} className="mr-4" style={{ width: 280 }}>
                    <BusinessCard
                      business={business}
                      onPress={() => handleBusinessPress(business.id)}
                    />
                  </View>
                ))}
              </ScrollView>
              {/* Grid layout for tablet+ */}
              <View className="hidden md:flex md:flex-row md:flex-wrap md:px-8 lg:px-12 md:gap-4">
                {popularBusinesses.map((business) => (
                  <View key={business.id} className="md:w-[48%] lg:w-[32%]">
                    <BusinessCard
                      business={business}
                      onPress={() => handleBusinessPress(business.id)}
                    />
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Best Offers Section */}
          {mockOffers.length > 0 && (
            <View className="mb-8">
              <View className="px-6 md:px-8 lg:px-12">
                <SectionHeader
                  title="Best Offers"
                  onSeeAll={() => console.log('See all offers')}
                />
              </View>
              {/* Horizontal scroll on mobile, grid on tablet */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="flex-row md:hidden"
                contentContainerStyle={{ paddingLeft: 24, paddingRight: 24 }}
              >
                {mockOffers.map((offer) => {
                  const business = popularBusinesses.find(
                    (b) => b.id === offer.businessId
                  );
                  if (!business) return null;

                  return (
                    <OfferCard
                      key={offer.id}
                      business={business}
                      offer={offer}
                      onPress={() => handleOfferPress(offer.id)}
                    />
                  );
                })}
              </ScrollView>
              {/* Grid layout for tablet+ */}
              <View className="hidden md:flex md:flex-row md:flex-wrap md:px-8 lg:px-12 md:gap-4">
                {mockOffers.map((offer) => {
                  const business = popularBusinesses.find(
                    (b) => b.id === offer.businessId
                  );
                  if (!business) return null;

                  return (
                    <View key={offer.id} className="md:w-[48%] lg:w-[32%]">
                      <OfferCard
                        business={business}
                        offer={offer}
                        onPress={() => handleOfferPress(offer.id)}
                      />
                    </View>
                  );
                })}
              </View>
            </View>
          )}

          {/* Loading State */}
          {loading && businesses.length === 0 && (
            <View className="px-6 md:px-8 lg:px-12 py-8">
              <Text className="text-center text-gray-600 dark:text-dark-3">Loading...</Text>
            </View>
          )}

          {/* Error State */}
          {error && (
            <View className="px-6 md:px-8 lg:px-12">
              <EmptyState type="error" message={error} />
            </View>
          )}

          {/* Empty State */}
          {!loading && !error && businesses.length === 0 && (
            <View className="px-6 md:px-8 lg:px-12">
              <EmptyState type="no-businesses" />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
