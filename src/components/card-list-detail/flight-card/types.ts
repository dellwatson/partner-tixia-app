import type { Flight } from '~/data/mockFlights';
import type { FlightResult, RoundTripFlightResult } from '~/lib/services/flight-search-service';

export interface FlightCardProps {
  flight: Flight | FlightResult | RoundTripFlightResult;
  onSelect?: () => void;
}

export interface NormalizedFlight {
  id: string;
  airline: string;
  airlineCode: string;
  departure: {
    time: string;
    airport: string;
    city: string;
    date: string;
  };
  arrival: {
    time: string;
    airport: string;
    city: string;
    date: string;
  };
  duration: string;
  price: number;
  stops: number;
  aircraft: string;
  flightNumber: string;
  class: string;
  baggage: { carry: boolean; checked: boolean };
  flexible: boolean;
  wifi: boolean;
  segments?: FlightSegment[];
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

export interface AirlineInfo {
  logo: string;
  logoUrl: string | null;
  name: string;
  color: string;
}
