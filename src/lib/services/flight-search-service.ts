import oneWayFlightsData from '~/data/flight-search/one-way-flights.json';
import roundTripFlightsData from '~/data/flight-search/round-trip-flights.json';
import { airportService } from './airport-service';

export interface FlightSearchParams {
  from: string[];
  to: string[];
  departDate?: string;
  returnDate?: string;
  passengers?: number;
  class?: 'economy' | 'premium_economy' | 'business' | 'first';
  tripType?: 'oneway' | 'roundtrip';
  direct?: boolean;
}

export interface FlightSegment {
  airline: {
    code: string;
    name: string;
  };
  flight_number: string;
  from: string;
  to: string;
  departure_time: string;
  arrival_time: string;
  duration: string;
  aircraft: string;
  layover?: string;
}

export interface FlightResult {
  id: string;
  route: {
    from: {
      code: string;
      city: string;
      country: string;
    };
    to: {
      code: string;
      city: string;
      country: string;
    };
  };
  flight_type: 'direct' | 'transit';
  airline?: {
    code: string;
    name: string;
  };
  flight_number?: string;
  departure_time: string;
  arrival_time: string;
  duration: string;
  aircraft?: string;
  segments?: FlightSegment[];
  total_duration?: string;
  price: number;
  available_seats: number;
  baggage: string;
  meal?: string;
  entertainment?: string;
  class: string;
}

export interface RoundTripFlightResult {
  id: string;
  route: {
    from: {
      code: string;
      city: string;
      country: string;
    };
    to: {
      code: string;
      city: string;
      country: string;
    };
  };
  outbound: FlightResult;
  return: FlightResult;
  total_price: number;
}

class FlightSearchService {
  
  // Generate realistic departure/arrival times
  private generateFlightTimes(duration: string, baseHour: number = 8): { departure: string, arrival: string } {
    const durationMatch = duration.match(/(\d+)h\s*(\d+)?m?/);
    if (!durationMatch) return { departure: '08:00', arrival: '10:00' };
    
    const hours = parseInt(durationMatch[1]);
    const minutes = parseInt(durationMatch[2] || '0');
    const totalMinutes = hours * 60 + minutes;
    
    // Random departure time between baseHour and baseHour + 12
    const depHour = baseHour + Math.floor(Math.random() * 12);
    const depMinute = Math.floor(Math.random() * 4) * 15; // 0, 15, 30, 45
    
    const departure = `${depHour.toString().padStart(2, '0')}:${depMinute.toString().padStart(2, '0')}`;
    
    // Calculate arrival time
    const arrivalTotalMinutes = (depHour * 60 + depMinute + totalMinutes) % (24 * 60);
    const arrHour = Math.floor(arrivalTotalMinutes / 60);
    const arrMinute = arrivalTotalMinutes % 60;
    
    const arrival = `${arrHour.toString().padStart(2, '0')}:${arrMinute.toString().padStart(2, '0')}`;
    
    return { departure, arrival };
  }

  // Convert flight data to FlightResult
  private convertToFlightResult(flight: any, selectedClass: string): FlightResult {
    const classData = flight.classes[selectedClass];
    if (!classData) {
      throw new Error(`Class ${selectedClass} not available for flight ${flight.id}`);
    }

    const times = this.generateFlightTimes(flight.duration || flight.total_duration || '2h 00m');

    const result: FlightResult = {
      id: flight.id,
      route: flight.route,
      flight_type: flight.flight_type,
      departure_time: times.departure,
      arrival_time: times.arrival,
      duration: flight.duration || flight.total_duration || '2h 00m',
      price: classData.price,
      available_seats: classData.available_seats,
      baggage: classData.baggage,
      meal: classData.meal,
      entertainment: classData.entertainment,
      class: selectedClass
    };

    if (flight.airline) {
      result.airline = flight.airline;
      result.flight_number = flight.flight_number;
      result.aircraft = flight.aircraft;
    }

    if (flight.segments) {
      result.segments = flight.segments.map((segment: any) => ({
        ...segment,
        departure_time: this.generateFlightTimes(segment.duration).departure,
        arrival_time: this.generateFlightTimes(segment.duration).arrival
      }));
      result.total_duration = flight.total_duration;
    }

    return result;
  }

  // Search one-way flights
  searchOneWayFlights(params: FlightSearchParams): FlightResult[] {
    const { from, to, class: selectedClass = 'economy', direct } = params;
    
    if (!from.length || !to.length) {
      return [];
    }

    let matchingFlights = oneWayFlightsData.one_way_flights.filter(flight => {
      // Check if route matches
      const routeMatch = from.includes(flight.route.from.code) && to.includes(flight.route.to.code);
      if (!routeMatch) return false;

      // Check if class is available
      if (!flight.classes[selectedClass]) return false;

      // Check direct flight filter
      if (direct !== undefined) {
        if (direct && flight.flight_type !== 'direct') return false;
        if (!direct && flight.flight_type !== 'transit') return false;
      }

      return true;
    });

    // Sort by price
    matchingFlights.sort((a, b) => {
      const priceA = a.classes[selectedClass]?.price || 0;
      const priceB = b.classes[selectedClass]?.price || 0;
      return priceA - priceB;
    });

    return matchingFlights.map(flight => this.convertToFlightResult(flight, selectedClass));
  }

  // Search round-trip flights
  searchRoundTripFlights(params: FlightSearchParams): RoundTripFlightResult[] {
    const { from, to, class: selectedClass = 'economy', direct } = params;
    
    if (!from.length || !to.length) {
      return [];
    }

    let matchingFlights = roundTripFlightsData.round_trip_flights.filter(flight => {
      // Check if route matches
      const routeMatch = from.includes(flight.route.from.code) && to.includes(flight.route.to.code);
      if (!routeMatch) return false;

      // Check if class is available for both outbound and return
      if (!flight.outbound.classes[selectedClass] || !flight.return.classes[selectedClass]) {
        return false;
      }

      // Check direct flight filter
      if (direct !== undefined) {
        if (direct && (flight.outbound.flight_type !== 'direct' || flight.return.flight_type !== 'direct')) {
          return false;
        }
        if (!direct && (flight.outbound.flight_type === 'direct' && flight.return.flight_type === 'direct')) {
          return false;
        }
      }

      return true;
    });

    // Sort by total price
    matchingFlights.sort((a, b) => {
      const priceA = a.total_price_range[selectedClass] || 0;
      const priceB = b.total_price_range[selectedClass] || 0;
      return priceA - priceB;
    });

    return matchingFlights.map(flight => {
      const outboundTimes = this.generateFlightTimes(flight.outbound.duration || flight.outbound.total_duration || '2h 00m');
      const returnTimes = this.generateFlightTimes(flight.return.duration || flight.return.total_duration || '2h 00m', 14); // Return flights typically later

      const outbound: FlightResult = {
        id: `${flight.id}-outbound`,
        route: flight.route,
        flight_type: flight.outbound.flight_type,
        departure_time: outboundTimes.departure,
        arrival_time: outboundTimes.arrival,
        duration: flight.outbound.duration || flight.outbound.total_duration || '2h 00m',
        price: flight.outbound.classes[selectedClass].price,
        available_seats: flight.outbound.classes[selectedClass].available_seats,
        baggage: flight.outbound.classes[selectedClass].baggage,
        meal: flight.outbound.classes[selectedClass].meal,
        entertainment: flight.outbound.classes[selectedClass].entertainment,
        class: selectedClass,
        airline: flight.outbound.airline,
        flight_number: flight.outbound.flight_number,
        aircraft: flight.outbound.aircraft,
        segments: flight.outbound.segments,
        total_duration: flight.outbound.total_duration
      };

      const returnFlight: FlightResult = {
        id: `${flight.id}-return`,
        route: {
          from: flight.route.to,
          to: flight.route.from
        },
        flight_type: flight.return.flight_type,
        departure_time: returnTimes.departure,
        arrival_time: returnTimes.arrival,
        duration: flight.return.duration || flight.return.total_duration || '2h 00m',
        price: flight.return.classes[selectedClass].price,
        available_seats: flight.return.classes[selectedClass].available_seats,
        baggage: flight.return.classes[selectedClass].baggage,
        meal: flight.return.classes[selectedClass].meal,
        entertainment: flight.return.classes[selectedClass].entertainment,
        class: selectedClass,
        airline: flight.return.airline,
        flight_number: flight.return.flight_number,
        aircraft: flight.return.aircraft,
        segments: flight.return.segments,
        total_duration: flight.return.total_duration
      };

      return {
        id: flight.id,
        route: flight.route,
        outbound,
        return: returnFlight,
        total_price: flight.total_price_range[selectedClass] || (outbound.price + returnFlight.price)
      };
    });
  }

  // Main search function
  searchFlights(params: FlightSearchParams): FlightResult[] | RoundTripFlightResult[] {
    // Validate that routes exist
    const hasValidRoute = params.from.some(fromCode => 
      params.to.some(toCode => 
        airportService.isRouteAvailable(fromCode, toCode)
      )
    );

    if (!hasValidRoute) {
      return [];
    }

    if (params.tripType === 'roundtrip') {
      return this.searchRoundTripFlights(params);
    } else {
      return this.searchOneWayFlights(params);
    }
  }

  // Get flight suggestions based on origin
  getFlightSuggestions(from: string[]): FlightResult[] {
    if (!from.length) return [];

    const suggestions: FlightResult[] = [];
    
    from.forEach(fromCode => {
      const availableDestinations = airportService.getAvailableDestinations(fromCode);
      
      // Get a few flights for each destination
      availableDestinations.slice(0, 5).forEach(destination => {
        const flights = this.searchOneWayFlights({
          from: [fromCode],
          to: [destination.code],
          class: 'economy'
        });
        
        if (flights.length > 0) {
          suggestions.push(flights[0]); // Add cheapest flight
        }
      });
    });

    return suggestions.slice(0, 10); // Return top 10 suggestions
  }
}

// Export singleton instance
export const flightSearchService = new FlightSearchService();
export default flightSearchService;
