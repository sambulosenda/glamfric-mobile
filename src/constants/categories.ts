import type { BusinessCategory } from '@/graphql/types/business';

export interface CategoryOption {
  value: string;
  label: string;
  icon: string;
}

/**
 * Business categories for filtering
 * Matches backend BusinessCategory enum
 */
export const BUSINESS_CATEGORIES: CategoryOption[] = [
  { value: 'all', label: 'All', icon: '🏪' },
  { value: 'HAIR_SALON', label: 'Hair Salon', icon: '💇' },
  { value: 'BARBER_SHOP', label: 'Barber', icon: '💈' },
  { value: 'NAIL_SALON', label: 'Nails', icon: '💅' },
  { value: 'SPA', label: 'Spa', icon: '🧖' },
  { value: 'MASSAGE', label: 'Massage', icon: '💆' },
  { value: 'MAKEUP', label: 'Makeup', icon: '💄' },
  { value: 'SKINCARE', label: 'Skincare', icon: '🧴' },
  { value: 'WELLNESS', label: 'Wellness', icon: '🧘' },
];

/**
 * Get category label by value
 */
export const getCategoryLabel = (value: string): string => {
  const category = BUSINESS_CATEGORIES.find((cat) => cat.value === value);
  return category?.label || value;
};

/**
 * Get category icon by value
 */
export const getCategoryIcon = (value: string): string => {
  const category = BUSINESS_CATEGORIES.find((cat) => cat.value === value);
  return category?.icon || '🏪';
};
