/**
 * Beauty Service Categories
 *
 * Service categories displayed on the home screen
 */

export interface ServiceCategory {
  id: string;
  title: string;
  image: string;
  category: string;
}

export const BEAUTY_SERVICES: ServiceCategory[] = [
  {
    id: 'haircut-men',
    title: 'Haircut for men',
    image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&h=400&fit=crop',
    category: 'hair',
  },
  {
    id: 'shave-men',
    title: 'Shave for men',
    image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=400&fit=crop',
    category: 'hair',
  },
  {
    id: 'facial-women',
    title: 'Facial for women',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=400&fit=crop',
    category: 'skin',
  },
  {
    id: 'bleach-women',
    title: 'Bleach for women',
    image: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=400&h=400&fit=crop',
    category: 'skin',
  },
  {
    id: 'waxing-women',
    title: 'Waxing for women',
    image: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=400&h=400&fit=crop',
    category: 'body',
  },
  {
    id: 'makeup-women',
    title: 'Makeup for women',
    image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=400&fit=crop',
    category: 'makeup',
  },
];

/**
 * Get service category by ID
 */
export function getServiceById(id: string): ServiceCategory | undefined {
  return BEAUTY_SERVICES.find((service) => service.id === id);
}

/**
 * Get services by category
 */
export function getServicesByCategory(category: string): ServiceCategory[] {
  return BEAUTY_SERVICES.filter((service) => service.category === category);
}
