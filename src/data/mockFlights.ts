export interface FlightSegment {
  time: string;
  airport: string;
  city: string;
  date: string;
}

export interface Flight {
  id: number;
  airline: string;
  airlineCode: string;
  departure: FlightSegment;
  arrival: FlightSegment;
  duration: string;
  price: number;
  originalPrice?: number;
  stops: number;
  aircraft: string;
  flightNumber: string;
  baggage: {
    carry: boolean;
    checked: boolean;
  };
  flexible: boolean;
  wifi: boolean;
  class: 'Economy' | 'Premium Economy' | 'Business' | 'First';
}

export interface RoundTripFlight {
  id: string;
  outbound: Flight;
  return?: Flight;
  totalPrice: number;
  totalOriginalPrice?: number;
  type: 'one-way' | 'round-trip';
}

import { getRandomAirline } from './airlineLogos';

const airports = [
  { code: 'JFK', city: 'New York' },
  { code: 'LAX', city: 'Los Angeles' },
  { code: 'ORD', city: 'Chicago' },
  { code: 'DFW', city: 'Dallas' },
  { code: 'DEN', city: 'Denver' },
  { code: 'SFO', city: 'San Francisco' },
  { code: 'SEA', city: 'Seattle' },
  { code: 'LAS', city: 'Las Vegas' },
  { code: 'PHX', city: 'Phoenix' },
  { code: 'IAH', city: 'Houston' },
  { code: 'MIA', city: 'Miami' },
  { code: 'BOS', city: 'Boston' },
  { code: 'MSP', city: 'Minneapolis' },
  { code: 'DTW', city: 'Detroit' },
  { code: 'PHL', city: 'Philadelphia' },
  { code: 'LGA', city: 'New York' },
  { code: 'BWI', city: 'Baltimore' },
  { code: 'FLL', city: 'Fort Lauderdale' },
  { code: 'DCA', city: 'Washington' },
  { code: 'MDW', city: 'Chicago' }
];

const aircraft = ['Boeing 737', 'Boeing 777', 'Boeing 787', 'Airbus A320', 'Airbus A330', 'Airbus A350', 'Embraer E175'];

const generateRandomTime = () => {
  const hour = Math.floor(Math.random() * 24);
  const minute = Math.floor(Math.random() * 60);
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
};

const generateDuration = (stops: number) => {
  const baseHours = Math.floor(Math.random() * 8) + 2; // 2-10 hours
  const minutes = Math.floor(Math.random() * 60);
  const totalMinutes = (baseHours * 60) + minutes + (stops * 90); // Add 1.5h per stop
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  return `${hours}h ${mins}m`;
};

const generateRandomDate = (daysFromNow: number = 0) => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString().split('T')[0]; // YYYY-MM-DD format
};

const generateFlightNumber = (airlineCode: string) => {
  const number = Math.floor(Math.random() * 9000) + 1000;
  return `${airlineCode}${number}`;
};

const classes: Array<'Economy' | 'Premium Economy' | 'Business' | 'First'> = ['Economy', 'Premium Economy', 'Business', 'First'];

const generateMockFlights = (): Flight[] => {
  const flights: Flight[] = [];
  
  for (let i = 1; i <= 60; i++) {
    const airline = getRandomAirline();
    const departureAirport = airports[Math.floor(Math.random() * airports.length)];
    const arrivalAirport = airports[Math.floor(Math.random() * airports.length)];
    const stops = Math.random() < 0.6 ? 0 : Math.random() < 0.8 ? 1 : 2;
    const basePrice = Math.floor(Math.random() * 800) + 150;
    const hasDiscount = Math.random() < 0.3;
    const departureDate = generateRandomDate(Math.floor(Math.random() * 30));
    
    flights.push({
      id: i,
      airline: airline.name,
      airlineCode: airline.code,
      flightNumber: generateFlightNumber(airline.code),
      departure: {
        time: generateRandomTime(),
        airport: departureAirport.code,
        city: departureAirport.city,
        date: departureDate
      },
      arrival: {
        time: generateRandomTime(),
        airport: arrivalAirport.code,
        city: arrivalAirport.city,
        date: departureDate
      },
      duration: generateDuration(stops),
      price: hasDiscount ? Math.floor(basePrice * 0.8) : basePrice,
      originalPrice: hasDiscount ? basePrice : undefined,
      stops,
      aircraft: aircraft[Math.floor(Math.random() * aircraft.length)],
      class: classes[Math.floor(Math.random() * classes.length)],
      baggage: {
        carry: Math.random() < 0.8,
        checked: Math.random() < 0.6
      },
      flexible: Math.random() < 0.4,
      wifi: Math.random() < 0.7
    });
  }
  
  return flights;
};

export const mockFlights: Flight[] = generateMockFlights();

// Mock API function
export const fetchFlights = async (searchParams?: any): Promise<Flight[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, Math.random() * 1500 + 500));
  
  // Return paginated results (20 per page)
  const page = searchParams?.page || 1;
  const perPage = 20;
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  
  return mockFlights.slice(startIndex, endIndex);
};
