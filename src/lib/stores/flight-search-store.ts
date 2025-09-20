import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import type { FlightResult, RoundTripFlightResult } from '~/lib/services/flight-search-service';

export interface FlightSearchFilters {
  priceRange: [number, number];
  airlines: string[];
  maxStops: number | null; // null = any, 0 = direct, 1+ = max stops
  departureTime: string[]; // ['morning', 'afternoon', 'evening', 'night']
  duration: [number, number]; // in minutes
  aircraft: string[];
}

export interface FlightSearchSort {
  field: 'price' | 'duration' | 'departure' | 'arrival' | 'airline';
  direction: 'asc' | 'desc';
}

export interface FlightSearchPagination {
  page: number;
  limit: number;
  total: number;
}

export interface FlightSearchParams {
  from: string[];
  to: string[];
  departDate?: string;
  returnDate?: string;
  passengers: number;
  class: 'economy' | 'premium_economy' | 'business' | 'first';
  tripType: 'oneway' | 'roundtrip';
}

export interface FlightSearchState {
  // Search parameters
  searchParams: FlightSearchParams | null;
  
  // Raw flight data (generated once per search)
  rawFlights: (FlightResult | RoundTripFlightResult)[];
  
  // Filtered and sorted flights
  filteredFlights: (FlightResult | RoundTripFlightResult)[];
  
  // Pagination
  pagination: FlightSearchPagination;
  
  // Filters
  filters: FlightSearchFilters;
  
  // Sorting
  sort: FlightSearchSort;
  
  // Loading states
  isLoading: boolean;
  isFiltering: boolean;
  
  // Available filter options (derived from raw data)
  availableFilters: {
    airlines: Array<{ code: string; name: string; count: number }>;
    aircraft: Array<{ type: string; count: number }>;
    priceRange: [number, number];
    durationRange: [number, number];
  };
  
  // Actions
  setSearchParams: (params: FlightSearchParams) => void;
  setRawFlights: (flights: (FlightResult | RoundTripFlightResult)[]) => void;
  updateFilters: (filters: Partial<FlightSearchFilters>) => void;
  updateSort: (sort: FlightSearchSort) => void;
  updatePagination: (pagination: Partial<FlightSearchPagination>) => void;
  applyFiltersAndSort: () => void;
  resetFilters: () => void;
  clearSearch: () => void;
}

const defaultFilters: FlightSearchFilters = {
  priceRange: [0, 10000],
  airlines: [],
  maxStops: null,
  departureTime: [],
  duration: [0, 1440], // 24 hours in minutes
  aircraft: []
};

const defaultSort: FlightSearchSort = {
  field: 'price',
  direction: 'asc'
};

const defaultPagination: FlightSearchPagination = {
  page: 1,
  limit: 20,
  total: 0
};

export const useFlightSearchStore = create<FlightSearchState>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    searchParams: null,
    rawFlights: [],
    filteredFlights: [],
    pagination: defaultPagination,
    filters: defaultFilters,
    sort: defaultSort,
    isLoading: false,
    isFiltering: false,
    availableFilters: {
      airlines: [],
      aircraft: [],
      priceRange: [0, 10000],
      durationRange: [0, 1440]
    },

    // Actions
    setSearchParams: (params) => {
      set({ searchParams: params, isLoading: true });
    },

    setRawFlights: (flights) => {
      const state = get();
      
      // Calculate available filters from raw data
      const airlines = new Map<string, { code: string; name: string; count: number }>();
      const aircraft = new Map<string, number>();
      let minPrice = Infinity;
      let maxPrice = 0;
      let minDuration = Infinity;
      let maxDuration = 0;

      flights.forEach(flight => {
        // Extract price and duration based on flight type
        let price: number;
        let duration: number;
        
        if ('outbound' in flight) {
          // Round-trip flight
          price = flight.total_price;
          duration = parseDuration(flight.outbound.duration) + parseDuration(flight.return.duration);
          
          // Add airlines from both legs
          if (flight.outbound.airline) {
            const key = flight.outbound.airline.code;
            airlines.set(key, {
              code: flight.outbound.airline.code,
              name: flight.outbound.airline.name,
              count: (airlines.get(key)?.count || 0) + 1
            });
          }
          if (flight.return.airline) {
            const key = flight.return.airline.code;
            airlines.set(key, {
              code: flight.return.airline.code,
              name: flight.return.airline.name,
              count: (airlines.get(key)?.count || 0) + 1
            });
          }
          
          // Add aircraft
          if (flight.outbound.aircraft) {
            aircraft.set(flight.outbound.aircraft, (aircraft.get(flight.outbound.aircraft) || 0) + 1);
          }
          if (flight.return.aircraft) {
            aircraft.set(flight.return.aircraft, (aircraft.get(flight.return.aircraft) || 0) + 1);
          }
        } else {
          // One-way flight
          price = flight.price;
          duration = parseDuration(flight.duration);
          
          if (flight.airline) {
            const key = flight.airline.code;
            airlines.set(key, {
              code: flight.airline.code,
              name: flight.airline.name,
              count: (airlines.get(key)?.count || 0) + 1
            });
          }
          
          if (flight.aircraft) {
            aircraft.set(flight.aircraft, (aircraft.get(flight.aircraft) || 0) + 1);
          }
        }

        minPrice = Math.min(minPrice, price);
        maxPrice = Math.max(maxPrice, price);
        minDuration = Math.min(minDuration, duration);
        maxDuration = Math.max(maxDuration, duration);
      });

      const availableFilters = {
        airlines: Array.from(airlines.values()).sort((a, b) => b.count - a.count),
        aircraft: Array.from(aircraft.entries()).map(([type, count]) => ({ type, count })).sort((a, b) => b.count - a.count),
        priceRange: [Math.floor(minPrice), Math.ceil(maxPrice)] as [number, number],
        durationRange: [Math.floor(minDuration), Math.ceil(maxDuration)] as [number, number]
      };

      // Reset filters to match available data
      const newFilters: FlightSearchFilters = {
        ...defaultFilters,
        priceRange: availableFilters.priceRange,
        duration: availableFilters.durationRange
      };

      set({
        rawFlights: flights,
        availableFilters,
        filters: newFilters,
        pagination: { ...defaultPagination, total: flights.length },
        isLoading: false
      });

      // Apply initial filtering and sorting
      get().applyFiltersAndSort();
    },

    updateFilters: (newFilters) => {
      set(state => ({
        filters: { ...state.filters, ...newFilters },
        pagination: { ...state.pagination, page: 1 }, // Reset to first page
        isFiltering: true
      }));
      get().applyFiltersAndSort();
    },

    updateSort: (newSort) => {
      set({ sort: newSort, isFiltering: true });
      get().applyFiltersAndSort();
    },

    updatePagination: (newPagination) => {
      set(state => ({
        pagination: { ...state.pagination, ...newPagination }
      }));
    },

    applyFiltersAndSort: () => {
      const { rawFlights, filters, sort } = get();
      
      // Apply filters
      let filtered = rawFlights.filter(flight => {
        // Price filter
        const price = 'total_price' in flight ? flight.total_price : flight.price;
        if (price < filters.priceRange[0] || price > filters.priceRange[1]) return false;

        // Airline filter
        if (filters.airlines.length > 0) {
          const flightAirlines = 'outbound' in flight 
            ? [flight.outbound.airline?.code, flight.return.airline?.code].filter(Boolean)
            : [flight.airline?.code].filter(Boolean);
          
          if (!flightAirlines.some(airline => filters.airlines.includes(airline!))) return false;
        }

        // Stops filter
        if (filters.maxStops !== null) {
          const isDirectFlight = 'outbound' in flight 
            ? flight.outbound.flight_type === 'direct' && flight.return.flight_type === 'direct'
            : flight.flight_type === 'direct';
          
          if (filters.maxStops === 0 && !isDirectFlight) return false;
          // For transit flights, we could add more sophisticated stop counting
        }

        // Duration filter
        const duration = 'outbound' in flight 
          ? parseDuration(flight.outbound.duration) + parseDuration(flight.return.duration)
          : parseDuration(flight.duration);
        
        if (duration < filters.duration[0] || duration > filters.duration[1]) return false;

        // Aircraft filter
        if (filters.aircraft.length > 0) {
          const flightAircraft = 'outbound' in flight 
            ? [flight.outbound.aircraft, flight.return.aircraft].filter(Boolean)
            : [flight.aircraft].filter(Boolean);
          
          if (!flightAircraft.some(aircraft => filters.aircraft.includes(aircraft!))) return false;
        }

        return true;
      });

      // Apply sorting
      filtered.sort((a, b) => {
        let aValue: any;
        let bValue: any;

        switch (sort.field) {
          case 'price':
            aValue = 'total_price' in a ? a.total_price : a.price;
            bValue = 'total_price' in b ? b.total_price : b.price;
            break;
          case 'duration':
            aValue = 'outbound' in a 
              ? parseDuration(a.outbound.duration) + parseDuration(a.return.duration)
              : parseDuration(a.duration);
            bValue = 'outbound' in b 
              ? parseDuration(b.outbound.duration) + parseDuration(b.return.duration)
              : parseDuration(b.duration);
            break;
          case 'departure':
            aValue = 'outbound' in a ? a.outbound.departure_time : a.departure_time;
            bValue = 'outbound' in b ? b.outbound.departure_time : b.departure_time;
            break;
          case 'arrival':
            aValue = 'outbound' in a ? a.outbound.arrival_time : a.arrival_time;
            bValue = 'outbound' in b ? b.outbound.arrival_time : b.arrival_time;
            break;
          case 'airline':
            aValue = 'outbound' in a ? a.outbound.airline?.name : a.airline?.name;
            bValue = 'outbound' in b ? b.outbound.airline?.name : b.airline?.name;
            break;
          default:
            return 0;
        }

        if (aValue < bValue) return sort.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sort.direction === 'asc' ? 1 : -1;
        return 0;
      });

      set({
        filteredFlights: filtered,
        pagination: { ...get().pagination, total: filtered.length },
        isFiltering: false
      });
    },

    resetFilters: () => {
      const { availableFilters } = get();
      set({
        filters: {
          ...defaultFilters,
          priceRange: availableFilters.priceRange,
          duration: availableFilters.durationRange
        },
        pagination: { ...defaultPagination, total: get().rawFlights.length }
      });
      get().applyFiltersAndSort();
    },

    clearSearch: () => {
      set({
        searchParams: null,
        rawFlights: [],
        filteredFlights: [],
        pagination: defaultPagination,
        filters: defaultFilters,
        sort: defaultSort,
        isLoading: false,
        isFiltering: false,
        availableFilters: {
          airlines: [],
          aircraft: [],
          priceRange: [0, 10000],
          durationRange: [0, 1440]
        }
      });
    }
  }))
);

// Helper function to parse duration string to minutes
function parseDuration(duration: string): number {
  const match = duration.match(/(\d+)h\s*(\d+)?m?/);
  if (!match) return 0;
  
  const hours = parseInt(match[1]) || 0;
  const minutes = parseInt(match[2]) || 0;
  
  return hours * 60 + minutes;
}
