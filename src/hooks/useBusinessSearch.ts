import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { SEARCH_BUSINESSES } from '@/graphql/queries/business';
import type { Business, SearchBusinessesInput, BusinessSearchResult } from '@/graphql/types/business';

export interface UseBusinessSearchOptions {
  /**
   * Initial search query
   */
  initialQuery?: string;

  /**
   * Initial category filter
   */
  initialCategory?: string;

  /**
   * Number of results per page
   */
  limit?: number;

  /**
   * Debounce delay in milliseconds
   */
  debounceMs?: number;
}

export interface UseBusinessSearchReturn {
  /**
   * List of businesses from search results
   */
  businesses: Business[];

  /**
   * Total number of matching businesses
   */
  total: number;

  /**
   * Whether there are more results to load
   */
  hasMore: boolean;

  /**
   * Loading state
   */
  loading: boolean;

  /**
   * Error message if query failed
   */
  error?: string;

  /**
   * Current search query
   */
  searchQuery: string;

  /**
   * Current category filter
   */
  selectedCategory?: string;

  /**
   * Update search query
   */
  setSearchQuery: (query: string) => void;

  /**
   * Update category filter
   */
  setSelectedCategory: (category?: string) => void;

  /**
   * Refetch results
   */
  refetch: () => void;

  /**
   * Load more results (pagination)
   */
  loadMore: () => void;
}

/**
 * useBusinessSearch Hook
 *
 * Custom hook for searching businesses with debouncing and pagination.
 * Automatically fetches results when query or category changes.
 *
 * @example
 * const { businesses, loading, searchQuery, setSearchQuery } = useBusinessSearch({
 *   limit: 20,
 *   debounceMs: 300,
 * });
 */
export const useBusinessSearch = (
  options: UseBusinessSearchOptions = {}
): UseBusinessSearchReturn => {
  const {
    initialQuery = '',
    initialCategory,
    limit = 20,
    debounceMs = 300,
  } = options;

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(initialCategory);
  const [offset, setOffset] = useState(0);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setOffset(0); // Reset offset when query changes
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchQuery, debounceMs]);

  // Reset offset when category changes
  useEffect(() => {
    setOffset(0);
  }, [selectedCategory]);

  // Build search input
  const searchInput: SearchBusinessesInput = {
    limit,
    offset,
  };

  if (debouncedQuery) {
    searchInput.query = debouncedQuery;
  }

  if (selectedCategory && selectedCategory !== 'all') {
    searchInput.category = selectedCategory;
  }

  // Execute GraphQL query
  const { data, loading, error, refetch, fetchMore } = useQuery<{
    searchBusinesses: BusinessSearchResult;
  }>(SEARCH_BUSINESSES, {
    variables: { input: searchInput },
    fetchPolicy: 'cache-and-network',
  });

  const businesses = data?.searchBusinesses.businesses || [];
  const total = data?.searchBusinesses.total || 0;
  const hasMore = data?.searchBusinesses.hasMore || false;

  const loadMore = async () => {
    if (!hasMore || loading) return;

    try {
      await fetchMore({
        variables: {
          input: {
            ...searchInput,
            offset: offset + limit,
          },
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;

          return {
            searchBusinesses: {
              ...fetchMoreResult.searchBusinesses,
              businesses: [
                ...prev.searchBusinesses.businesses,
                ...fetchMoreResult.searchBusinesses.businesses,
              ],
            },
          };
        },
      });

      setOffset(offset + limit);
    } catch (err) {
      console.error('Error loading more businesses:', err);
    }
  };

  return {
    businesses,
    total,
    hasMore,
    loading,
    error: error?.message,
    searchQuery,
    selectedCategory,
    setSearchQuery,
    setSelectedCategory,
    refetch,
    loadMore,
  };
};
