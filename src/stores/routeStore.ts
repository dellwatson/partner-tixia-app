import { create } from 'zustand';

// Fixed 8 cities from user's specification
const FIXED_DESTINATIONS = [
  { lat: 64.2008, lng: -149.4937, name: 'Fairbanks' }, // Alaska
  { lat: 34.0522, lng: -118.2437, name: 'Los Angeles' },
  { lat: -15.7975, lng: -47.8919, name: 'Brasília' }, // Brazil
  { lat: 38.7223, lng: -9.1393, name: 'Lisbon' },
  { lat: 51.5074, lng: -0.1278, name: 'London' },
  { lat: 28.6139, lng: 77.209, name: 'New Delhi' },
  { lat: 43.1332, lng: 131.9113, name: 'Vladivostok' },
  { lat: -1.2921, lng: 36.8219, name: 'Nairobi' },
];

interface RouteState {
  routes: Array<{
    start: { lat: number; lng: number; name: string };
    end: { lat: number; lng: number; name: string };
  }>;
  flightRoutes: Array<{
    start: { lat: number; lng: number; name: string };
    end: { lat: number; lng: number; name: string };
  }>;
  hotelRoutes: Array<{
    start: { lat: number; lng: number; name: string };
    end: { lat: number; lng: number; name: string };
  }>;
  generateRandomRoutes: (mode: 'flights' | 'hotels') => void;
  getRoutesForMode: (mode: 'flights' | 'hotels') => void;
}

// Calculate distance between two points (rough approximation)
const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

const generateRoutes = () => {
  const routes = [];
  const usedPairs = new Set();
  const routeCount = Math.floor(Math.random() * 3) + 5; // 5-7 routes
  const MAX_DISTANCE = 12000; // Max distance in km to avoid super long routes
  
  for (let i = 0; i < routeCount; i++) {
    let start, end, pairKey, distance;
    let attempts = 0;
    
    do {
      start = FIXED_DESTINATIONS[Math.floor(Math.random() * FIXED_DESTINATIONS.length)];
      end = FIXED_DESTINATIONS[Math.floor(Math.random() * FIXED_DESTINATIONS.length)];
      distance = calculateDistance(start.lat, start.lng, end.lat, end.lng);
      pairKey = `${start.name}-${end.name}`;
      attempts++;
    } while (
      (start === end || 
       distance > MAX_DISTANCE ||
       usedPairs.has(pairKey) || 
       usedPairs.has(`${end.name}-${start.name}`)) && 
      attempts < 30
    );
    
    if (attempts < 30) {
      routes.push({ start, end });
      usedPairs.add(pairKey);
    }
  }
  
  return routes;
};

export const useRouteStore = create<RouteState>((set, get) => ({
  routes: generateRoutes(),
  flightRoutes: generateRoutes(),
  hotelRoutes: generateRoutes(),
  generateRandomRoutes: (mode) => {
    const newRoutes = generateRoutes();
    if (mode === 'flights') {
      set({ routes: newRoutes, flightRoutes: newRoutes });
    } else {
      set({ routes: newRoutes, hotelRoutes: newRoutes });
    }
  },
  getRoutesForMode: (mode) => {
    const state = get();
    if (mode === 'flights') {
      set({ routes: state.flightRoutes });
    } else {
      set({ routes: state.hotelRoutes });
    }
  },
}));
