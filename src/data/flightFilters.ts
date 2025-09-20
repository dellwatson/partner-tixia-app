import { FilterOption, FilterSection } from './hotelFilters';

// API Response interfaces for dynamic flight data
export interface FlightFilterData {
  priceRange: {
    min: number;
    max: number;
    defaultMin: number;
    defaultMax: number;
  };
  airlines: FilterOption[];
  stops: FilterOption[];
  departureTime: {
    morning: FilterOption;
    afternoon: FilterOption;
    evening: FilterOption;
    night: FilterOption;
  };
  arrivalTime: {
    morning: FilterOption;
    afternoon: FilterOption;
    evening: FilterOption;
    night: FilterOption;
  };
  duration: {
    min: number;
    max: number;
    defaultMin: number;
    defaultMax: number;
  };
  facilities: FilterOption[];
  flexibility: FilterOption[];
  transitPoints: FilterOption[];
  transitDuration: {
    min: number;
    max: number;
    defaultMin: number;
    defaultMax: number;
  };
  recentFilters?: FilterOption[];
}

// Static filter templates - structure only, data comes from API
export const flightFilterTemplates: Omit<FilterSection, 'options' | 'min' | 'max' | 'defaultValue'>[] = [
  {
    id: 'recent_filter',
    title: 'Recent Filters',
    type: 'checkbox'
  },
  {
    id: 'price_range',
    title: 'Price Range',
    subtitle: 'Per passenger (USD)',
    type: 'range'
  },
  {
    id: 'stops',
    title: 'Stops',
    subtitle: 'Number of stops',
    type: 'radio'
  },
  {
    id: 'airlines',
    title: 'Airlines',
    subtitle: 'Select preferred airlines',
    type: 'checkbox'
  },
  {
    id: 'departure_time',
    title: 'Departure Time',
    subtitle: 'Time of departure',
    type: 'checkbox'
  },
  {
    id: 'arrival_time',
    title: 'Arrival Time',
    subtitle: 'Time of arrival',
    type: 'checkbox'
  },
  {
    id: 'duration',
    title: 'Flight Duration',
    subtitle: 'Total travel time (hours)',
    type: 'range'
  },
  {
    id: 'facilities',
    title: 'Facilities',
    subtitle: 'In-flight services',
    type: 'checkbox'
  },
  {
    id: 'flexibility',
    title: 'Flexibility',
    subtitle: 'Booking options',
    type: 'checkbox'
  },
  {
    id: 'transit_points',
    title: 'Transit Points',
    subtitle: 'Connecting airports',
    type: 'checkbox'
  },
  {
    id: 'transit_duration',
    title: 'Transit Duration',
    subtitle: 'Layover time (hours)',
    type: 'range'
  }
];

// Function to combine templates with API data
export const buildFlightFilters = (data: FlightFilterData): FilterSection[] => {
  return flightFilterTemplates.map(template => {
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
      case 'stops':
        section.options = data.stops;
        break;
      case 'airlines':
        section.options = data.airlines;
        break;
      case 'departure_time':
        section.options = [
          data.departureTime.morning,
          data.departureTime.afternoon,
          data.departureTime.evening,
          data.departureTime.night
        ];
        break;
      case 'arrival_time':
        section.options = [
          data.arrivalTime.morning,
          data.arrivalTime.afternoon,
          data.arrivalTime.evening,
          data.arrivalTime.night
        ];
        break;
      case 'duration':
        section.min = data.duration.min;
        section.max = data.duration.max;
        section.step = 0.5;
        section.defaultValue = [data.duration.defaultMin, data.duration.defaultMax];
        break;
      case 'facilities':
        section.options = data.facilities;
        break;
      case 'flexibility':
        section.options = data.flexibility;
        break;
      case 'transit_points':
        section.options = data.transitPoints;
        break;
      case 'transit_duration':
        section.min = data.transitDuration.min;
        section.max = data.transitDuration.max;
        section.step = 0.5;
        section.defaultValue = [data.transitDuration.defaultMin, data.transitDuration.defaultMax];
        break;
    }
    
    return section;
  });
};

// Mock data for development - this would come from API
export const mockFlightFilterData: FlightFilterData = {
  priceRange: {
    min: 50,
    max: 2000,
    defaultMin: 50,
    defaultMax: 2000
  },
  airlines: [
    { id: 'garuda', label: 'Garuda Indonesia', count: 45, icon: 'plane' },
    { id: 'lion', label: 'Lion Air', count: 67, icon: 'plane' },
    { id: 'citilink', label: 'Citilink', count: 34, icon: 'plane' },
    { id: 'airasia', label: 'AirAsia', count: 56, icon: 'plane' },
    { id: 'batik', label: 'Batik Air', count: 23, icon: 'plane' },
    { id: 'sriwijaya', label: 'Sriwijaya Air', count: 12, icon: 'plane' }
  ],
  stops: [
    { id: 'direct', label: 'Direct', count: 89 },
    { id: '1_stop', label: '1 Stop', count: 156 },
    { id: '2_stops', label: '2+ Stops', count: 45 }
  ],
  departureTime: {
    morning: { id: 'morning', label: 'Morning (06:00 - 12:00)', count: 78 },
    afternoon: { id: 'afternoon', label: 'Afternoon (12:00 - 18:00)', count: 134 },
    evening: { id: 'evening', label: 'Evening (18:00 - 24:00)', count: 89 },
    night: { id: 'night', label: 'Night (00:00 - 06:00)', count: 23 }
  },
  arrivalTime: {
    morning: { id: 'morning', label: 'Morning (06:00 - 12:00)', count: 67 },
    afternoon: { id: 'afternoon', label: 'Afternoon (12:00 - 18:00)', count: 145 },
    evening: { id: 'evening', label: 'Evening (18:00 - 24:00)', count: 98 },
    night: { id: 'night', label: 'Night (00:00 - 06:00)', count: 34 }
  },
  duration: {
    min: 1,
    max: 24,
    defaultMin: 1,
    defaultMax: 24
  },
  facilities: [
    { id: 'baggage', label: 'Free Baggage', count: 234, icon: 'luggage' },
    { id: 'meal', label: 'In-flight Meal', count: 156, icon: 'utensils' },
    { id: 'wifi', label: 'WiFi', count: 89, icon: 'wifi' },
    { id: 'entertainment', label: 'Entertainment', count: 67, icon: 'tv' },
    { id: 'power', label: 'Power Outlet', count: 45, icon: 'plug' }
  ],
  flexibility: [
    { id: 'refundable', label: 'Refundable', count: 123 },
    { id: 'reschedule', label: 'Free Reschedule', count: 89 },
    { id: 'no_overnight', label: 'No Overnight Transit', count: 156 }
  ],
  transitPoints: [
    { id: 'cgk', label: 'Jakarta (CGK)', count: 89 },
    { id: 'dps', label: 'Denpasar (DPS)', count: 45 },
    { id: 'sub', label: 'Surabaya (SUB)', count: 34 },
    { id: 'kno', label: 'Medan (KNO)', count: 23 }
  ],
  transitDuration: {
    min: 0.5,
    max: 12,
    defaultMin: 0.5,
    defaultMax: 12
  },
  recentFilters: [
    { id: 'last_search', label: 'Your last search', count: 34 },
    { id: 'popular_route', label: 'Popular on this route', count: 89 }
  ]
};

// Export for use in components
export const flightFilters: FilterSection[] = buildFlightFilters(mockFlightFilterData);
