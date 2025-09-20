import duffelAirlines from '~/data/duffel-airlines.json';
import type { Flight } from '~/data/mockFlights';
import type { FlightResult, RoundTripFlightResult } from '~/lib/services/flight-search-service';
import type { NormalizedFlight, AirlineInfo } from './types';

// Helper function to get airline logo from duffel data
export function getAirlineLogoFromDuffel(airlineCode: string): AirlineInfo {
  const airline = duffelAirlines.airlines.find(a => a.iata_code === airlineCode);
  if (airline) {
    return {
      logo: airline.iata_code, // Use IATA code as logo text
      logoUrl: airline.logo_url,
      name: airline.airline_name,
      color: '#3B82F6' // Default blue color
    };
  }
  return {
    logo: airlineCode || '✈️',
    logoUrl: null,
    name: 'Unknown Airline',
    color: '#6B7280' // Gray color for unknown
  };
}

// Helper function to check if flight is old Flight type
export function isOldFlight(flight: any): flight is Flight {
  return 'departure' in flight && typeof flight.departure === 'object' && 'time' in flight.departure;
}

// Helper function to check if flight is RoundTripFlightResult
export function isRoundTripFlight(flight: any): flight is RoundTripFlightResult {
  return 'outbound' in flight && 'return' in flight;
}

// Helper function to normalize flight data
export function normalizeFlightData(flight: Flight | FlightResult | RoundTripFlightResult): NormalizedFlight {
  if (isRoundTripFlight(flight)) {
    // For round trip, use outbound flight data
    const outbound = flight.outbound;
    return {
      id: flight.id,
      airline: outbound.airline?.name || 'Unknown Airline',
      airlineCode: outbound.airline?.code || 'XX',
      departure: {
        time: outbound.departure_time ? formatTimeFromString(outbound.departure_time) : '08:00',
        airport: outbound.route.from.code,
        city: outbound.route.from.city,
        date: outbound.departure_time ? formatDateFromString(outbound.departure_time) : new Date().toISOString().split('T')[0]
      },
      arrival: {
        time: outbound.arrival_time ? formatTimeFromString(outbound.arrival_time) : '11:00',
        airport: outbound.route.to.code,
        city: outbound.route.to.city,
        date: outbound.arrival_time ? formatDateFromString(outbound.arrival_time) : new Date().toISOString().split('T')[0]
      },
      duration: outbound.duration,
      price: flight.total_price,
      stops: outbound.flight_type === 'direct' ? 0 : 1,
      aircraft: outbound.aircraft || 'Unknown',
      flightNumber: outbound.flight_number || '',
      class: outbound.class || 'Economy',
      baggage: { carry: true, checked: true },
      flexible: false,
      wifi: true,
      segments: outbound.segments
    };
  } else if (isOldFlight(flight)) {
    // Old Flight type - return as is
    return flight as NormalizedFlight;
  } else {
    // FlightResult type - convert to old format
    const flightResult = flight as FlightResult;
    return {
      id: flightResult.id,
      airline: flightResult.airline?.name || 'Unknown Airline',
      airlineCode: flightResult.airline?.code || 'XX',
      departure: {
        time: flightResult.departure_time ? formatTimeFromString(flightResult.departure_time) : '08:00',
        airport: flightResult.route.from.code,
        city: flightResult.route.from.city,
        date: flightResult.departure_time ? formatDateFromString(flightResult.departure_time) : new Date().toISOString().split('T')[0]
      },
      arrival: {
        time: flightResult.arrival_time ? formatTimeFromString(flightResult.arrival_time) : '11:00',
        airport: flightResult.route.to.code,
        city: flightResult.route.to.city,
        date: flightResult.arrival_time ? formatDateFromString(flightResult.arrival_time) : new Date().toISOString().split('T')[0]
      },
      duration: flightResult.duration,
      price: flightResult.price,
      stops: flightResult.flight_type === 'direct' ? 0 : 1,
      aircraft: flightResult.aircraft || 'Unknown',
      flightNumber: flightResult.flight_number || '',
      class: flightResult.class || 'Economy',
      baggage: { carry: true, checked: true },
      flexible: false,
      wifi: true,
      segments: flightResult.segments
    };
  }
}

// Helper function to format date
export function formatFlightDate(dateString?: string): string {
  if (!dateString) {
    // Use current date as fallback
    const today = new Date();
    return today.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  }
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric' 
  });
}

// Helper function to generate return date (1 week after departure)
export function generateReturnDate(departureDate?: string): string {
  let baseDate: Date;
  
  if (departureDate) {
    baseDate = new Date(departureDate);
  } else {
    // Use current date if no departure date
    baseDate = new Date();
  }
  
  // Add 7 days for return
  const returnDate = new Date(baseDate.getTime() + 7 * 24 * 60 * 60 * 1000);
  return returnDate.toISOString().split('T')[0]; // Return YYYY-MM-DD format
}

// Helper function to format time to 12-hour format
export function formatTime12Hour(time24: string): string {
  const [hours, minutes] = time24.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;
  return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
}

// Helper function to format duration (handles both "2h 30m" and "150" minute formats)
export function formatDuration(duration: string | number): string {
  if (typeof duration === 'number') {
    // Convert minutes to "Xh Ym" format
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    if (hours === 0) {
      return `${minutes}m`;
    } else if (minutes === 0) {
      return `${hours}h`;
    } else {
      return `${hours}h ${minutes}m`;
    }
  }
  
  // If it's already a string, check if it needs formatting
  if (typeof duration === 'string') {
    // If it's just a number as string (like "150"), convert it
    if (/^\d+$/.test(duration)) {
      return formatDuration(parseInt(duration));
    }
    // If it's already formatted (like "2h 30m"), return as is
    return duration;
  }
  
  return duration.toString();
}

// Helper function to format layover/transit duration
export function formatTransitDuration(duration: string | number): string {
  const formatted = formatDuration(duration);
  return `${formatted} layover`;
}

// Helper function to safely format time from string with error handling
export function formatTimeFromString(timeString: string | null | undefined): string {
  if (!timeString) return '00:00';
  
  try {
    const date = new Date(timeString);
    if (isNaN(date.getTime())) {
      console.warn('Invalid date for time formatting:', timeString);
      return '00:00';
    }
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: false 
    });
  } catch (error) {
    console.warn('Error formatting time:', timeString, error);
    return '00:00';
  }
}

// Helper function to safely format date from string with error handling
export function formatDateFromString(dateString: string | null | undefined): string {
  if (!dateString) return new Date().toISOString().split('T')[0];
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.warn('Invalid date for date formatting:', dateString);
      return new Date().toISOString().split('T')[0];
    }
    return date.toISOString().split('T')[0];
  } catch (error) {
    console.warn('Error formatting date:', dateString, error);
    return new Date().toISOString().split('T')[0];
  }
}
