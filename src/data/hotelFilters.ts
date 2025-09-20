export interface FilterOption {
  id: string;
  label: string;
  count?: number;
  icon?: string;
}

export interface FilterSection {
  id: string;
  title: string;
  subtitle?: string;
  type: 'checkbox' | 'radio' | 'range' | 'select';
  options?: FilterOption[];
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: any;
}

// API Response interfaces for dynamic data
export interface HotelFilterData {
  priceRange: {
    min: number;
    max: number;
    defaultMin: number;
    defaultMax: number;
  };
  starRating: FilterOption[];
  guestRating: FilterOption[];
  accommodationType: FilterOption[];
  facilities: FilterOption[];
  outdoorSpace: FilterOption[];
  parkingOptions: FilterOption[];
  swimmingPoolType: FilterOption[];
  recentFilters?: FilterOption[];
}

// Static filter templates - structure only, data comes from API
export const hotelFilterTemplates: Omit<FilterSection, 'options' | 'min' | 'max' | 'defaultValue'>[] = [
  {
    id: 'recent_filter',
    title: 'Recent Filters',
    type: 'checkbox'
  },
  {
    id: 'price_range',
    title: 'Price Range',
    subtitle: 'Per night (USD)',
    type: 'range'
  },
  {
    id: 'popular_filters',
    title: 'Popular Filters',
    subtitle: 'Most searched by travelers',
    type: 'checkbox'
  },
  {
    id: 'star_rating',
    title: 'Property Rating',
    subtitle: 'Hotel star classification',
    type: 'checkbox'
  },
  {
    id: 'guest_rating',
    title: 'Guest Rating',
    subtitle: 'Based on verified reviews',
    type: 'checkbox'
  },
  {
    id: 'accommodation_type',
    title: 'Accommodation Type',
    type: 'checkbox'
  },
  {
    id: 'facilities',
    title: 'Popular Facilities',
    type: 'checkbox'
  },
  {
    id: 'outdoor_space',
    title: 'Outdoor Space',
    type: 'checkbox'
  },
  {
    id: 'parking_options',
    title: 'Parking Options',
    type: 'checkbox'
  },
  {
    id: 'swimming_pool_type',
    title: 'Swimming Pool Type',
    type: 'checkbox'
  }
];

// Function to combine templates with API data
export const buildHotelFilters = (data: HotelFilterData): FilterSection[] => {
  return hotelFilterTemplates.map(template => {
    const section: FilterSection = { ...template };
    
    switch (template.id) {
      case 'recent_filter':
        section.options = data.recentFilters || [];
        break;
      case 'price_range':
        section.min = data.priceRange.min;
        section.max = data.priceRange.max;
        section.step = 10;
        section.defaultValue = [data.priceRange.defaultMin, data.priceRange.defaultMax];
        break;
      case 'popular_filters':
        section.options = [
          { id: 'review_8plus', label: 'Review score 8+', count: 0 },
          { id: 'promo_available', label: 'Promo available', count: 0 },
          { id: 'free_cancellation', label: 'Free cancellation', count: 0 }
        ];
        break;
      case 'star_rating':
        section.options = data.starRating;
        break;
      case 'guest_rating':
        section.options = data.guestRating;
        break;
      case 'accommodation_type':
        section.options = data.accommodationType;
        break;
      case 'facilities':
        section.options = data.facilities;
        break;
      case 'outdoor_space':
        section.options = data.outdoorSpace;
        break;
      case 'parking_options':
        section.options = data.parkingOptions;
        break;
      case 'swimming_pool_type':
        section.options = data.swimmingPoolType;
        break;
    }
    
    return section;
  });
};

// Mock data for development - this would come from API
export const mockHotelFilterData: HotelFilterData = {
  priceRange: {
    min: 0,
    max: 500,
    defaultMin: 0,
    defaultMax: 500
  },
  starRating: [
    { id: '5_star', label: '5 stars', count: 12 },
    { id: '4_star', label: '4 stars', count: 45 },
    { id: '3_star', label: '3 stars', count: 78 },
    { id: '2_star', label: '2 stars', count: 34 },
    { id: '1_star', label: '1 star', count: 23 }
  ],
  guestRating: [
    { id: 'excellent_9plus', label: 'Excellent: 9+', count: 67 },
    { id: 'very_good_8plus', label: 'Very good: 8+', count: 134 },
    { id: 'good_7plus', label: 'Good: 7+', count: 189 },
    { id: 'pleasant_6plus', label: 'Pleasant: 6+', count: 245 }
  ],
  accommodationType: [
    { id: 'hotel', label: 'Hotels', count: 156 },
    { id: 'resort', label: 'Resorts', count: 34 },
    { id: 'apartment', label: 'Apartments', count: 78 },
    { id: 'villa', label: 'Villas', count: 23 },
    { id: 'hostel', label: 'Hostels', count: 45 },
    { id: 'guesthouse', label: 'Guesthouses', count: 67 }
  ],
  facilities: [
    { id: 'free_wifi', label: 'Free WiFi', count: 234, icon: 'wifi' },
    { id: 'swimming_pool', label: 'Swimming pool', count: 89, icon: 'waves' },
    { id: 'fitness_center', label: 'Fitness center', count: 67, icon: 'dumbbell' },
    { id: 'spa', label: 'Spa', count: 45, icon: 'flower' },
    { id: 'restaurant', label: 'Restaurant', count: 178, icon: 'utensils' },
    { id: 'bar', label: 'Bar', count: 123, icon: 'wine' },
    { id: 'parking', label: 'Free parking', count: 156, icon: 'car' },
    { id: 'room_service', label: 'Room service', count: 98, icon: 'bell' }
  ],
  outdoorSpace: [
    { id: 'garden', label: 'Garden', count: 48 },
    { id: 'patio', label: 'Patio', count: 10 },
    { id: 'terrace', label: 'Terrace', count: 10 }
  ],
  parkingOptions: [
    { id: 'parking', label: 'Parking', count: 120 },
    { id: 'parking_on_site', label: 'Parking on site', count: 112 },
    { id: 'accessible_parking', label: 'Accessible parking', count: 69 },
    { id: 'private_parking', label: 'Private parking', count: 66 },
    { id: 'parking_garage', label: 'Parking garage', count: 60 },
    { id: 'free_parking', label: 'Free parking', count: 58 },
    { id: 'valet_parking', label: 'Valet parking', count: 17 },
    { id: 'street_parking', label: 'Street parking', count: 8 }
  ],
  swimmingPoolType: [
    { id: 'indoor_pool', label: 'Indoor pool', count: 45 },
    { id: 'outdoor_pool', label: 'Outdoor pool', count: 67 },
    { id: 'rooftop_pool', label: 'Rooftop pool', count: 23 }
  ],
  recentFilters: [
    { id: 'last_search', label: 'Your last search', count: 45 },
    { id: 'popular_area', label: 'Popular in this area', count: 128 }
  ]
};

// Legacy export for backward compatibility - use mock data
export const hotelFilters: FilterSection[] = buildHotelFilters(mockHotelFilterData);
