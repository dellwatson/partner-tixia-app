// Flight Search Data Index
// Comprehensive flight search system with mock data based on Duffel airlines

export { default as airportRoutes } from './airport-routes.json';
export { default as roundTripFlights } from './round-trip-flights.json';
export { default as oneWayFlights } from './one-way-flights.json';
export { default as popularRoutes } from './popular-routes.json';

// Type definitions for flight search data
export interface Airport {
  code: string;
  name: string;
  city: string;
}

export interface Route {
  from: Airport & { country: string };
  to: Airport & { country: string };
}

export interface FlightClass {
  price: number;
  available_seats: number;
  baggage: string;
  meal?: string;
  entertainment?: string;
}

export interface FlightClasses {
  economy: FlightClass;
  premium_economy?: FlightClass;
  business?: FlightClass;
  first?: FlightClass;
}

export interface Airline {
  code: string;
  name: string;
}

export interface FlightSegment {
  airline: Airline;
  flight_number: string;
  from: string;
  to: string;
  duration: string;
  aircraft: string;
  layover?: string;
}

export interface Flight {
  flight_type: 'direct' | 'transit';
  airline?: Airline;
  flight_number?: string;
  duration?: string;
  aircraft?: string;
  segments?: FlightSegment[];
  total_duration?: string;
  classes: FlightClasses;
}

export interface OneWayFlight {
  id: string;
  route: Route;
  flight_type: 'direct' | 'transit';
  airline?: Airline;
  flight_number?: string;
  duration?: string;
  aircraft?: string;
  segments?: FlightSegment[];
  total_duration?: string;
  classes: FlightClasses;
}

export interface RoundTripFlight {
  id: string;
  route: Route;
  outbound: Flight;
  return: Flight;
  total_price_range: {
    economy: number;
    premium_economy?: number;
    business?: number;
    first?: number;
  };
}

export interface CountryAirports {
  country: string;
  country_code: string;
  airports: Airport[];
}

export interface PopularRoute {
  route_id: string;
  from: Airport & { country: string };
  to: Airport & { country: string };
  popularity_score: number;
  average_price: {
    economy: number;
    business: number;
  };
  airlines: string[];
  flight_time: string;
  frequency: string;
}

// Helper functions for flight search
export const getAirportsByCountry = (countryCode: string): Airport[] => {
  const routes = airportRoutes.routes.find(r => r.country_code === countryCode);
  return routes?.airports || [];
};

export const getFlightsByRoute = (fromCode: string, toCode: string, type: 'oneway' | 'roundtrip') => {
  if (type === 'oneway') {
    return oneWayFlights.one_way_flights.filter(
      flight => flight.route.from.code === fromCode && flight.route.to.code === toCode
    );
  } else {
    return roundTripFlights.round_trip_flights.filter(
      flight => flight.route.from.code === fromCode && flight.route.to.code === toCode
    );
  }
};

export const getFlightsByAirline = (airlineCode: string, type: 'oneway' | 'roundtrip') => {
  if (type === 'oneway') {
    return oneWayFlights.one_way_flights.filter(
      flight => flight.airline?.code === airlineCode || 
      flight.segments?.some(segment => segment.airline.code === airlineCode)
    );
  } else {
    return roundTripFlights.round_trip_flights.filter(
      flight => flight.outbound.airline?.code === airlineCode || 
      flight.return.airline?.code === airlineCode ||
      flight.outbound.segments?.some(segment => segment.airline.code === airlineCode) ||
      flight.return.segments?.some(segment => segment.airline.code === airlineCode)
    );
  }
};

export const getFlightsByClass = (flightClass: keyof FlightClasses, type: 'oneway' | 'roundtrip') => {
  if (type === 'oneway') {
    return oneWayFlights.one_way_flights.filter(
      flight => flight.classes[flightClass] !== undefined
    );
  } else {
    return roundTripFlights.round_trip_flights.filter(
      flight => flight.outbound.classes[flightClass] !== undefined && 
      flight.return.classes[flightClass] !== undefined
    );
  }
};

export const getDirectFlights = (type: 'oneway' | 'roundtrip') => {
  if (type === 'oneway') {
    return oneWayFlights.one_way_flights.filter(flight => flight.flight_type === 'direct');
  } else {
    return roundTripFlights.round_trip_flights.filter(
      flight => flight.outbound.flight_type === 'direct' && flight.return.flight_type === 'direct'
    );
  }
};

export const getTransitFlights = (type: 'oneway' | 'roundtrip') => {
  if (type === 'oneway') {
    return oneWayFlights.one_way_flights.filter(flight => flight.flight_type === 'transit');
  } else {
    return roundTripFlights.round_trip_flights.filter(
      flight => flight.outbound.flight_type === 'transit' || flight.return.flight_type === 'transit'
    );
  }
};

// Price range helpers
export const getPriceRange = (flights: (OneWayFlight | RoundTripFlight)[], flightClass: keyof FlightClasses) => {
  const prices = flights.map(flight => {
    if ('total_price_range' in flight) {
      return flight.total_price_range[flightClass] || 0;
    } else {
      return flight.classes[flightClass]?.price || 0;
    }
  }).filter(price => price > 0);

  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
    average: Math.round(prices.reduce((sum, price) => sum + price, 0) / prices.length)
  };
};

export default {
  airportRoutes,
  roundTripFlights,
  oneWayFlights,
  popularRoutes,
  getAirportsByCountry,
  getFlightsByRoute,
  getFlightsByAirline,
  getFlightsByClass,
  getDirectFlights,
  getTransitFlights,
  getPriceRange
};
