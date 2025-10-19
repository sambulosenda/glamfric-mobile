import React from 'react';
import { View, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { useBusinessSearch } from '@/hooks';
import {
  SearchBar,
  CategoryFilter,
  BusinessCard,
  BusinessSkeletonList,
  EmptyState,
} from '@/components/discover';

/**
 * Discover Screen
 *
 * Main business discovery and search screen.
 * Public screen - accessible to guest users.
 *
 * Features:
 * - Search businesses by name/services
 * - Filter by category
 * - Browse all businesses
 * - Tap to view details
 * - Add to favorites (auth required for guests)
 */
export default function DiscoverScreen() {
  const router = useRouter();

  // Search hook with debouncing and pagination
  const {
    businesses,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    loadMore,
    hasMore,
  } = useBusinessSearch({
    limit: 20,
    debounceMs: 300,
  });

  const handleBusinessPress = (businessId: string) => {
    // Navigate to business detail screen (we'll build this in Feature 4)
    router.push(`/business/${businessId}` as any);
  };

  const handleFavorite = (businessId: string) => {
    // TODO: Implement favorite mutation in next feature
    console.log('Favorite business:', businessId);
  };

  // Show skeleton on initial load
  if (loading && businesses.length === 0) {
    return (
      <View className="flex-1 bg-gray-50">
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          disabled={true}
        />
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <View className="flex-1 px-4 pt-4">
          <BusinessSkeletonList count={3} />
        </View>
      </View>
    );
  }

  // Show error state
  if (error) {
    return (
      <View className="flex-1 bg-gray-50">
        <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <EmptyState type="error" message={error} />
      </View>
    );
  }

  // Show empty state when no businesses found
  if (businesses.length === 0) {
    return (
      <View className="flex-1 bg-gray-50">
        <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <EmptyState
          type={searchQuery || selectedCategory !== 'all' ? 'no-results' : 'no-businesses'}
        />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <FlatList
        data={businesses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BusinessCard
            business={item}
            onPress={() => handleBusinessPress(item.id)}
            onFavorite={() => handleFavorite(item.id)}
            isFavorited={false} // TODO: Check if favorited
          />
        )}
        ListHeaderComponent={
          <>
            <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
            <CategoryFilter
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </>
        }
        contentContainerClassName="px-4 pt-4 pb-20"
        onEndReached={() => {
          if (hasMore && !loading) {
            loadMore();
          }
        }}
        onEndReachedThreshold={0.5}
        stickyHeaderIndices={[0]}
      />
    </View>
  );
}
