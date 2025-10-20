import React, { useState } from 'react';
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
  const { businesses, loading, error } = useBusinessSearch({
    limit: 20,
    debounceMs: 300,
  });

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
    <View className="flex-1 bg-gray-50">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top,
          paddingBottom: insets.bottom + 80,
        }}
      >
        {/* Location Picker */}
        <LocationPicker
          location="Munich Center"
          onPress={() => console.log('Open location picker')}
        />

        {/* Search Bar */}
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Shop name or service"
        />

        {/* Filter Chips */}
        <FilterChips
          filters={filters}
          onFilterChange={(newFilters) =>
            setFilters({ ...filters, ...newFilters })
          }
        />

        {/* Beauty Services Section */}
        <View className="mt-6 mb-8">
          <SectionHeader
            title="Beauty services"
            onSeeAll={() => console.log('See all services')}
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
            className="flex-row"
          >
            {BEAUTY_SERVICES.map((service) => (
              <ServiceCategoryCard
                key={service.id}
                image={service.image}
                title={service.title}
                onPress={() => handleServicePress(service.id)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Popular Near You Section */}
        {popularBusinesses.length > 0 && (
          <View className="mb-8">
            <SectionHeader
              title="Popular near you"
              onSeeAll={() => console.log('See all popular')}
            />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16 }}
              className="flex-row"
            >
              {popularBusinesses.map((business) => (
                <View key={business.id} className="mr-4" style={{ width: 280 }}>
                  <BusinessCard
                    business={business}
                    onPress={() => handleBusinessPress(business.id)}
                    onFavorite={() => console.log('Favorite:', business.id)}
                    isFavorited={false}
                  />
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Best Offers Section */}
        {mockOffers.length > 0 && (
          <View className="mb-8">
            <SectionHeader
              title="Best Offers"
              onSeeAll={() => console.log('See all offers')}
            />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16 }}
              className="flex-row"
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
          </View>
        )}

        {/* Loading State */}
        {loading && businesses.length === 0 && (
          <View className="px-4 py-8">
            <Text className="text-center text-gray-600">Loading...</Text>
          </View>
        )}

        {/* Error State */}
        {error && (
          <View className="px-4">
            <EmptyState type="error" message={error} />
          </View>
        )}

        {/* Empty State */}
        {!loading && !error && businesses.length === 0 && (
          <View className="px-4">
            <EmptyState type="no-businesses" />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
