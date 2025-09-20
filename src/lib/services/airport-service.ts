import airportRoutesData from '~/data/flight-search/airport-routes.json';
import oneWayFlightsData from '~/data/flight-search/one-way-flights.json';
import roundTripFlightsData from '~/data/flight-search/round-trip-flights.json';

export interface Airport {
  id: string;
  code: string;
  name: string;
  city: string;
  country: string;
  country_code: string;
}

export interface Country {
  name: string;
  country_code: string;
  airports: Airport[];
  selected: boolean;
}

export interface RouteAvailability {
  from: string;
  to: string;
  available: boolean;
  flightCount: number;
  airlines: string[];
}

class AirportService {
  private airports: Airport[] = [];
  private countries: Country[] = [];
  private availableRoutes: RouteAvailability[] = [];

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Transform airport routes data
    this.countries = airportRoutesData.routes.map(route => ({
      name: route.country,
      country_code: route.country_code,
      airports: route.airports.map(airport => ({
        id: airport.code,
        code: airport.code,
        name: airport.name,
        city: airport.city,
        country: route.country,
        country_code: route.country_code
      })),
      selected: false
    }));

    // Flatten airports for easy searching
    this.airports = this.countries.flatMap(country => country.airports);

    // Build available routes from flight data
    this.buildAvailableRoutes();
  }

  private buildAvailableRoutes() {
    const routeMap = new Map<string, RouteAvailability>();

    // Process one-way flights
    oneWayFlightsData.one_way_flights.forEach(flight => {
      const routeKey = `${flight.route.from.code}-${flight.route.to.code}`;
      const reverseKey = `${flight.route.to.code}-${flight.route.from.code}`;
      
      if (!routeMap.has(routeKey)) {
        routeMap.set(routeKey, {
          from: flight.route.from.code,
          to: flight.route.to.code,
          available: true,
          flightCount: 0,
          airlines: []
        });
      }

      const route = routeMap.get(routeKey)!;
      route.flightCount++;
      
      // Add airline
      if (flight.airline && !route.airlines.includes(flight.airline.code)) {
        route.airlines.push(flight.airline.code);
      }
      if (flight.segments) {
        flight.segments.forEach(segment => {
          if (!route.airlines.includes(segment.airline.code)) {
            route.airlines.push(segment.airline.code);
          }
        });
      }

      // Also add reverse route for search suggestions
      if (!routeMap.has(reverseKey)) {
        routeMap.set(reverseKey, {
          from: flight.route.to.code,
          to: flight.route.from.code,
          available: true,
          flightCount: 0,
          airlines: [...route.airlines]
        });
      }
    });

    // Process round-trip flights
    roundTripFlightsData.round_trip_flights.forEach(flight => {
      const routeKey = `${flight.route.from.code}-${flight.route.to.code}`;
      const reverseKey = `${flight.route.to.code}-${flight.route.from.code}`;
      
      if (!routeMap.has(routeKey)) {
        routeMap.set(routeKey, {
          from: flight.route.from.code,
          to: flight.route.to.code,
          available: true,
          flightCount: 0,
          airlines: []
        });
      }

      const route = routeMap.get(routeKey)!;
      route.flightCount++;

      // Add airlines from outbound
      if (flight.outbound.airline && !route.airlines.includes(flight.outbound.airline.code)) {
        route.airlines.push(flight.outbound.airline.code);
      }
      if (flight.outbound.segments) {
        flight.outbound.segments.forEach(segment => {
          if (!route.airlines.includes(segment.airline.code)) {
            route.airlines.push(segment.airline.code);
          }
        });
      }

      // Add airlines from return
      if (flight.return.airline && !route.airlines.includes(flight.return.airline.code)) {
        route.airlines.push(flight.return.airline.code);
      }
      if (flight.return.segments) {
        flight.return.segments.forEach(segment => {
          if (!route.airlines.includes(segment.airline.code)) {
            route.airlines.push(segment.airline.code);
          }
        });
      }

      // Update reverse route
      if (routeMap.has(reverseKey)) {
        const reverseRoute = routeMap.get(reverseKey)!;
        reverseRoute.flightCount++;
        route.airlines.forEach(airline => {
          if (!reverseRoute.airlines.includes(airline)) {
            reverseRoute.airlines.push(airline);
          }
        });
      }
    });

    this.availableRoutes = Array.from(routeMap.values());
  }

  // Search airports by query
  searchAirports(query: string): { airports: Airport[], countries: Country[] } {
    if (!query || query.length < 2) {
      return { airports: [], countries: [] };
    }

    const searchTerm = query.toLowerCase();
    const filteredAirports = this.airports.filter(airport =>
      airport.name.toLowerCase().includes(searchTerm) ||
      airport.city.toLowerCase().includes(searchTerm) ||
      airport.code.toLowerCase().includes(searchTerm) ||
      airport.country.toLowerCase().includes(searchTerm)
    );

    // Group by country
    const countriesMap = new Map<string, Airport[]>();
    filteredAirports.forEach(airport => {
      if (!countriesMap.has(airport.country)) {
        countriesMap.set(airport.country, []);
      }
      countriesMap.get(airport.country)!.push(airport);
    });

    const countries = Array.from(countriesMap.entries()).map(([name, airports]) => {
      const countryData = this.countries.find(c => c.name === name);
      return {
        name,
        country_code: countryData?.country_code || '',
        airports,
        selected: false
      };
    });

    return { airports: filteredAirports, countries };
  }

  // Get airport by code
  getAirportByCode(code: string): Airport | undefined {
    return this.airports.find(airport => airport.code === code);
  }

  // Get all countries
  getAllCountries(): Country[] {
    return this.countries;
  }

  // Get airports by country
  getAirportsByCountry(countryCode: string): Airport[] {
    const country = this.countries.find(c => c.country_code === countryCode);
    return country?.airports || [];
  }

  // Check if route is available
  isRouteAvailable(from: string, to: string): boolean {
    return this.availableRoutes.some(route => 
      route.from === from && route.to === to
    );
  }

  // Get available destinations from origin
  getAvailableDestinations(from: string): Airport[] {
    const availableDestinationCodes = this.availableRoutes
      .filter(route => route.from === from)
      .map(route => route.to);

    return this.airports.filter(airport => 
      availableDestinationCodes.includes(airport.code)
    );
  }

  // Get available origins to destination
  getAvailableOrigins(to: string): Airport[] {
    const availableOriginCodes = this.availableRoutes
      .filter(route => route.to === to)
      .map(route => route.from);

    return this.airports.filter(airport => 
      availableOriginCodes.includes(airport.code)
    );
  }

  // Get route suggestions based on popular routes
  getPopularRoutes(): RouteAvailability[] {
    return this.availableRoutes
      .sort((a, b) => b.flightCount - a.flightCount)
      .slice(0, 10);
  }

  // Get route information
  getRouteInfo(from: string, to: string): RouteAvailability | undefined {
    return this.availableRoutes.find(route => 
      route.from === from && route.to === to
    );
  }

  // Search with route suggestions
  searchWithRouteSuggestions(query: string, selectedOrigin?: string): { 
    airports: Airport[], 
    countries: Country[],
    suggestedDestinations?: Airport[]
  } {
    const searchResult = this.searchAirports(query);
    
    if (selectedOrigin) {
      const suggestedDestinations = this.getAvailableDestinations(selectedOrigin);
      return {
        ...searchResult,
        suggestedDestinations
      };
    }

    return searchResult;
  }
}

// Export singleton instance
export const airportService = new AirportService();
export default airportService;
