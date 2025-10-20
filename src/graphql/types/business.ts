/**
 * Business TypeScript Types
 * Matches GraphQL schema from backend
 */

export type BusinessCategory =
  | 'HAIR_SALON'
  | 'BARBER_SHOP'
  | 'NAIL_SALON'
  | 'SPA'
  | 'MASSAGE'
  | 'MAKEUP'
  | 'SKINCARE'
  | 'WELLNESS'
  | 'OTHER';

export interface Business {
  id: string;
  businessName: string;
  slug: string;
  description?: string | null;
  category: string;
  phoneNumber?: string | null;
  email?: string | null;
  website?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  postalCode?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  profileImageUrl?: string | null;
  coverImageUrl?: string | null;
  rating?: number | null;
  totalReviews: number;
  isVerified: boolean;
  createdAt: string;
  services?: Service[];
  photos?: BusinessPhoto[];
}

export interface Service {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  duration: number;
  category?: string | null;
  isActive: boolean;
  imageUrl?: string | null;
}

export interface BusinessPhoto {
  id: string;
  url: string;
  caption?: string | null;
  displayOrder: number;
}

export interface SearchBusinessesInput {
  query?: string;
  category?: string;
  latitude?: number;
  longitude?: number;
  radius?: number;
  limit?: number;
  offset?: number;
}

export interface BusinessSearchResult {
  businesses: Business[];
  total: number;
  hasMore: boolean;
}
