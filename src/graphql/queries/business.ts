import { gql } from '@apollo/client';

/**
 * Search businesses with filters
 * Public query - no authentication required
 */
export const SEARCH_BUSINESSES = gql`
  query SearchBusinesses($input: SearchBusinessesInput!) {
    searchBusinesses(input: $input) {
      businesses {
        id
        businessName
        slug
        description
        category
        phoneNumber
        email
        website
        address
        city
        state
        country
        postalCode
        latitude
        longitude
        profileImageUrl
        coverImageUrl
        rating
        totalReviews
        isVerified
        createdAt
      }
      total
      hasMore
    }
  }
`;

/**
 * Get single business by ID
 * Public query - no authentication required
 */
export const GET_BUSINESS = gql`
  query GetBusiness($id: ID!) {
    business(id: $id) {
      id
      businessName
      slug
      description
      category
      phoneNumber
      email
      website
      address
      city
      state
      country
      postalCode
      latitude
      longitude
      profileImageUrl
      coverImageUrl
      rating
      totalReviews
      isVerified
      createdAt
      services {
        id
        name
        description
        price
        duration
        category
        isActive
        imageUrl
      }
      photos {
        id
        url
        caption
        displayOrder
      }
    }
  }
`;

/**
 * Get nearby businesses based on location
 * Public query - no authentication required
 */
export const NEARBY_BUSINESSES = gql`
  query NearbyBusinesses($latitude: Decimal!, $longitude: Decimal!, $radius: Int) {
    nearbyBusinesses(latitude: $latitude, longitude: $longitude, radius: $radius) {
      id
      businessName
      slug
      category
      profileImageUrl
      rating
      totalReviews
      address
      city
      latitude
      longitude
      isVerified
    }
  }
`;

/**
 * Get featured offers
 * Public query - no authentication required
 */
export const GET_FEATURED_OFFERS = gql`
  query GetFeaturedOffers($limit: Int) {
    featuredOffers(limit: $limit) {
      id
      businessId
      business {
        id
        businessName
        slug
        category
        city
        state
        profileImageUrl
        coverImageUrl
        rating
        totalReviews
        isVerified
      }
      title
      description
      discount
      imageUrl
      validUntil
      isActive
    }
  }
`;
