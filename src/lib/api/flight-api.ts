import { mockFlights, type Flight } from '~/data/mockFlights';

// Simulate network delay for realistic API behavior
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface FlightSearchParams {
  from: string;
  to: string;
  depart: string;
  return?: string;
  adults: number;
  type: 'ONEWAY' | 'ROUNDTRIP';
  sortBy?: 'price' | 'duration' | 'departure';
  // Filter params
  priceRange?: [number, number];
  selectedAirlines?: string[];
  maxStops?: number;
  page?: number;
  limit?: number;
}

export interface FlightSearchResponse {
  flights: Flight[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Helper function to parse duration string to minutes for sorting
const parseDuration = (duration: string): number => {
  const match = duration.match(/(\d+)h\s*(\d+)m/);
  if (match) {
    const hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    return hours * 60 + minutes;
  }
  return 0;
};

// 🔥 MAIN API ENDPOINT - Replace this function for real API integration
// Mock API function that simulates real flight search API
export const searchFlights = async (params: FlightSearchParams): Promise<FlightSearchResponse> => {
  // 🔥 TODO: Replace with real API call
  // Example: const response = await fetch(`${API_BASE_URL}/flights/search`, { method: 'POST', body: JSON.stringify(params) });
  
  // Simulate API delay (remove this for real API)
  const randomDelay = Math.random() * 1200 + 800; // 800ms - 2000ms
  await delay(randomDelay);

  // 🔥 MOCK DATA SOURCE - Replace with real API response data
  let filteredFlights = [...mockFlights]; // This contains the mock flight results

  // Apply filters
  if (params.priceRange) {
    const [minPrice, maxPrice] = params.priceRange;
    filteredFlights = filteredFlights.filter(
      flight => flight.price >= minPrice && flight.price <= maxPrice
    );
  }

  if (params.selectedAirlines && params.selectedAirlines.length > 0) {
    filteredFlights = filteredFlights.filter(
      flight => params.selectedAirlines!.includes(flight.airline)
    );
  }

  if (params.maxStops !== undefined) {
    filteredFlights = filteredFlights.filter(
      flight => flight.stops <= params.maxStops!
    );
  }

  // Apply sorting
  if (params.sortBy) {
    filteredFlights.sort((a, b) => {
      switch (params.sortBy) {
        case 'price':
          // Best = lowest price + shortest duration combined
          const durationA = parseDuration(a.duration);
          const durationB = parseDuration(b.duration);
          const scoreA = a.price * 0.7 + durationA * 0.3;
          const scoreB = b.price * 0.7 + durationB * 0.3;
          return scoreA - scoreB;
        case 'duration':
          // Cheapest = lowest price
          return a.price - b.price;
        case 'departure':
          // Fastest = shortest duration
          const durA = parseDuration(a.duration);
          const durB = parseDuration(b.duration);
          return durA - durB;
        default:
          return 0;
      }
    });
  }

  // Randomize results to simulate different search results
  filteredFlights = filteredFlights.sort(() => Math.random() - 0.5);

  // Apply pagination
  const page = params.page || 1;
  const limit = params.limit || 20;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedFlights = filteredFlights.slice(startIndex, endIndex);

  // 🔥 MOCK RESPONSE FORMAT - Keep this structure for real API
  return {
    flights: paginatedFlights, // Array of flight objects
    total: filteredFlights.length, // Total count for pagination
    page,
    limit,
    hasMore: endIndex < filteredFlights.length
  };
};

// 🔥 SECONDARY API ENDPOINT - Individual flight fetch (for detail pages)
export const getFlightById = async (id: number): Promise<Flight | null> => {
  // 🔥 TODO: Replace with real API call
  // Example: const response = await fetch(`${API_BASE_URL}/flights/${id}`);
  
  await delay(300); // Shorter delay for single flight fetch (remove for real API)
  
  // 🔥 MOCK DATA SOURCE - Replace with real API response
  const flight = mockFlights.find(f => f.id === id);
  return flight || null;
};
