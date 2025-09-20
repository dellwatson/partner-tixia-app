import { airportService } from './airport-service';
import type { FlightResult, RoundTripFlightResult } from './flight-search-service';
import duffelAirlines from '~/data/duffel-airlines.json';

interface ProceduralFlightParams {
  from: string[];
  to: string[];
  departDate?: string;
  returnDate?: string;
  passengers: number;
  class: 'economy' | 'premium_economy' | 'business' | 'first';
  tripType: 'oneway' | 'roundtrip';
  count?: number; // Target number of flights to generate
}

interface AirlineData {
  code: string;
  name: string;
  hub?: string;
  fleet: string[];
  priceMultiplier: number;
  qualityScore: number; // 1-10, affects pricing and availability
}

interface RouteData {
  distance: number; // km
  popularity: number; // 1-10
  competition: number; // 1-10, more competition = lower prices
}

// Convert duffel airlines to our format
const AIRLINES: AirlineData[] = duffelAirlines.airlines.map(airline => ({
  code: airline.iata_code,
  name: airline.airline_name,
  hub: airline.hub_code,
  fleet: ['A350-900', 'Boeing 777-300ER', 'A330-300', 'Boeing 787-9', 'A320neo'], // Generic fleet
  priceMultiplier: Math.random() * 0.8 + 0.6, // Random between 0.6-1.4
  qualityScore: Math.floor(Math.random() * 5) + 5 // Random between 5-9
}));

// Aircraft specifications
const AIRCRAFT_SPECS = {
  'A380-800': { seats: { economy: 450, premium_economy: 60, business: 80, first: 14 }, range: 15200 },
  'Boeing 777-300ER': { seats: { economy: 300, premium_economy: 40, business: 42, first: 8 }, range: 13649 },
  'A350-900': { seats: { economy: 280, premium_economy: 36, business: 36, first: 0 }, range: 15000 },
  'A350-1000': { seats: { economy: 320, premium_economy: 44, business: 44, first: 0 }, range: 16100 },
  'Boeing 787-9': { seats: { economy: 250, premium_economy: 32, business: 30, first: 0 }, range: 14140 },
  'Boeing 787-8': { seats: { economy: 210, premium_economy: 28, business: 24, first: 0 }, range: 13620 },
  'A330-300': { seats: { economy: 250, premium_economy: 30, business: 30, first: 0 }, range: 11750 },
  'A330-200': { seats: { economy: 220, premium_economy: 28, business: 24, first: 0 }, range: 13450 },
  'A321': { seats: { economy: 180, premium_economy: 0, business: 16, first: 0 }, range: 7400 },
  'A320neo': { seats: { economy: 150, premium_economy: 0, business: 12, first: 0 }, range: 6300 },
  'A320': { seats: { economy: 140, premium_economy: 0, business: 12, first: 0 }, range: 6150 },
  'Boeing 737-800': { seats: { economy: 160, premium_economy: 0, business: 16, first: 0 }, range: 5765 },
  'Boeing 747-8': { seats: { economy: 350, premium_economy: 50, business: 64, first: 18 }, range: 14815 }
};

class ProceduralFlightGenerator {
  
  // Calculate distance between airports (simplified)
  private calculateDistance(from: string, to: string): number {
    // This is a simplified distance calculation
    // In reality, you'd use great circle distance formula
    const distances: Record<string, Record<string, number>> = {
      'CGK': { 'SIN': 900, 'KUL': 1200, 'BKK': 1150, 'HKG': 2100, 'NRT': 5800 },
      'SIN': { 'CGK': 900, 'KUL': 320, 'BKK': 1050, 'HKG': 2600, 'SYD': 6300 },
      'KUL': { 'SIN': 320, 'CGK': 1200, 'BKK': 1200, 'HKG': 2540, 'DEL': 3200 },
      'BKK': { 'SIN': 1050, 'KUL': 1200, 'CGK': 1150, 'HKG': 1700, 'NRT': 4600 },
      'HKG': { 'SIN': 2600, 'BKK': 1700, 'NRT': 2900, 'ICN': 2100, 'SYD': 7400 },
      'NRT': { 'HKG': 2900, 'ICN': 1300, 'LAX': 8800, 'SFO': 8300, 'BKK': 4600 },
      'ICN': { 'NRT': 1300, 'HKG': 2100, 'PEK': 950, 'LAX': 11000, 'SFO': 10600 },
      'DEL': { 'BOM': 1150, 'KUL': 3200, 'DXB': 2200, 'LHR': 6700, 'JFK': 11500 },
      'BOM': { 'DEL': 1150, 'DXB': 1900, 'LHR': 7200, 'JFK': 12500, 'SIN': 4100 },
      'DXB': { 'BOM': 1900, 'DEL': 2200, 'LHR': 5500, 'JFK': 11000, 'SIN': 6000 },
      'DOH': { 'DXB': 380, 'BOM': 2400, 'LHR': 5250, 'JFK': 10800, 'KUL': 6300 },
      'SYD': { 'SIN': 6300, 'HKG': 7400, 'NRT': 7800, 'LAX': 12000, 'MEL': 700 },
      'MEL': { 'SYD': 700, 'SIN': 6000, 'HKG': 7300, 'NRT': 8100, 'LAX': 12800 }
    };
    
    return distances[from]?.[to] || distances[to]?.[from] || 5000; // Default 5000km
  }

  // Generate realistic flight duration based on distance
  private generateDuration(distance: number, isDirect: boolean = true): string {
    let baseMinutes = Math.round(distance / 8.5); // Rough km/minute for commercial flights
    
    if (!isDirect) {
      baseMinutes += 60 + Math.random() * 120; // Add layover time
    }
    
    // Add some variance
    baseMinutes += Math.random() * 30 - 15;
    
    // Ensure minimum duration
    baseMinutes = Math.max(baseMinutes, 30); // At least 30 minutes
    
    const hours = Math.floor(baseMinutes / 60);
    const minutes = Math.round(baseMinutes % 60);
    
    return `${hours}h ${minutes.toString().padStart(2, '0')}m`;
  }

  // Format duration from minutes to readable format
  private formatDuration(totalMinutes: number): string {
    // Ensure positive duration
    totalMinutes = Math.max(totalMinutes, 30); // At least 30 minutes
    
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.round(totalMinutes % 60);
    
    return `${hours}h ${minutes.toString().padStart(2, '0')}m`;
  }

  // Generate realistic departure/arrival times
  private generateFlightTimes(departDate?: string): { departure: string, arrival: string, duration: string } {
    const timeSlots = [
      { start: 6, end: 9, weight: 20 },   // Early morning
      { start: 9, end: 12, weight: 25 },  // Morning
      { start: 12, end: 15, weight: 20 }, // Afternoon
      { start: 15, end: 18, weight: 25 }, // Late afternoon
      { start: 18, end: 21, weight: 15 }, // Evening
      { start: 21, end: 24, weight: 10 }, // Night
      { start: 0, end: 6, weight: 5 }     // Red-eye
    ];

    // Weighted random selection
    const totalWeight = timeSlots.reduce((sum, slot) => sum + slot.weight, 0);
    let random = Math.random() * totalWeight;
    
    let selectedSlot = timeSlots[0];
    for (const slot of timeSlots) {
      random -= slot.weight;
      if (random <= 0) {
        selectedSlot = slot;
        break;
      }
    }

    const depHour = selectedSlot.start + Math.random() * (selectedSlot.end - selectedSlot.start);
    const depMinute = Math.floor(Math.random() * 4) * 15; // 0, 15, 30, 45
    
    const departure = `${Math.floor(depHour).toString().padStart(2, '0')}:${depMinute.toString().padStart(2, '0')}`;
    
    // Calculate realistic duration based on a typical route (will be overridden by actual distance later)
    const durationMinutes = 120 + Math.random() * 480; // 2-10 hours
    const arrivalTotalMinutes = (Math.floor(depHour) * 60 + depMinute + durationMinutes) % (24 * 60);
    const arrHour = Math.floor(arrivalTotalMinutes / 60);
    const arrMinute = arrivalTotalMinutes % 60;
    
    const arrival = `${arrHour.toString().padStart(2, '0')}:${Math.floor(arrMinute).toString().padStart(2, '0')}`;
    const duration = this.formatDuration(durationMinutes);
    
    const result = { departure, arrival, duration };
    return result;
  }

  // Generate base price for route
  private generateBasePrice(from: string, to: string, flightClass: string): number {
    const distance = this.calculateDistance(from, to);
    
    // Base price per km by class
    const pricePerKm = {
      economy: 0.08,
      premium_economy: 0.15,
      business: 0.35,
      first: 0.75
    };

    let basePrice = distance * pricePerKm[flightClass as keyof typeof pricePerKm];
    
    // Add minimum price
    const minimums = {
      economy: 50,
      premium_economy: 150,
      business: 400,
      first: 1200
    };
    
    basePrice = Math.max(basePrice, minimums[flightClass as keyof typeof minimums]);
    
    return Math.round(basePrice);
  }

  // Generate procedural pricing with variance
  private generatePrice(basePrice: number, airline: AirlineData, demand: number = 0.5): number {
    let price = basePrice * airline.priceMultiplier;
    
    // Demand adjustment (0 = low demand, 1 = high demand)
    const demandMultiplier = 0.7 + (demand * 0.8); // 0.7x to 1.5x
    price *= demandMultiplier;
    
    // Random variance ±20%
    const variance = 0.8 + (Math.random() * 0.4);
    price *= variance;
    
    // Quality adjustment
    if (airline.qualityScore >= 8) {
      price *= 1.1; // Premium airlines charge more
    } else if (airline.qualityScore <= 5) {
      price *= 0.8; // Budget airlines charge less
    }
    
    return Math.round(price);
  }

  // Select appropriate aircraft for route
  private selectAircraft(distance: number, airline: AirlineData): string {
    const suitableAircraft = airline.fleet.filter(aircraft => {
      const spec = AIRCRAFT_SPECS[aircraft as keyof typeof AIRCRAFT_SPECS];
      return spec && spec.range >= distance;
    });
    
    if (suitableAircraft.length === 0) {
      return airline.fleet[0]; // Fallback
    }
    
    // Prefer larger aircraft for longer routes
    if (distance > 8000) {
      const longHaulAircraft = suitableAircraft.filter(a => 
        ['A380-800', 'Boeing 777-300ER', 'A350-900', 'Boeing 747-8'].includes(a)
      );
      if (longHaulAircraft.length > 0) {
        return longHaulAircraft[Math.floor(Math.random() * longHaulAircraft.length)];
      }
    }
    
    return suitableAircraft[Math.floor(Math.random() * suitableAircraft.length)];
  }

  // Generate available seats for class
  private generateAvailableSeats(aircraft: string, flightClass: string, loadFactor: number = 0.7): number {
    const spec = AIRCRAFT_SPECS[aircraft as keyof typeof AIRCRAFT_SPECS];
    if (!spec) return 50; // Fallback
    
    const totalSeats = spec.seats[flightClass as keyof typeof spec.seats] || 0;
    if (totalSeats === 0) return 0;
    
    // Apply load factor with some randomness
    const occupiedSeats = Math.floor(totalSeats * loadFactor * (0.8 + Math.random() * 0.4));
    return Math.max(0, totalSeats - occupiedSeats);
  }

  // Generate one-way flight
  private generateOneWayFlight(
    id: string, 
    from: string, 
    to: string, 
    flightClass: string,
    departDate?: string
  ): FlightResult {
    // Try to get airports from service, create fallbacks if not found
    let fromAirport = airportService.getAirportByCode(from);
    let toAirport = airportService.getAirportByCode(to);
    
    // Create fallback airport data if not found
    if (!fromAirport) {
      fromAirport = {
        id: from,
        code: from,
        name: `${from} Airport`,
        city: from,
        country: 'Unknown',
        country_code: 'XX'
      };
      console.log('🛫 Created fallback airport for:', from);
    }
    
    if (!toAirport) {
      toAirport = {
        id: to,
        code: to,
        name: `${to} Airport`,
        city: to,
        country: 'Unknown',
        country_code: 'XX'
      };
      console.log('🛫 Created fallback airport for:', to);
    }

    // Select airline (prefer airlines with hubs near the route)
    const suitableAirlines = AIRLINES.filter(airline => 
      !airline.hub || airline.hub === from || airline.hub === to || Math.random() > 0.7
    );
    const airline = suitableAirlines[Math.floor(Math.random() * suitableAirlines.length)] || AIRLINES[0];

    const distance = this.calculateDistance(from, to);
    const aircraft = this.selectAircraft(distance, airline);
    const isDirect = Math.random() > 0.3; // 70% direct flights
    const times = this.generateFlightTimes(departDate);
    
    // Override duration with distance-based calculation
    const realDuration = this.generateDuration(distance, isDirect);
    times.duration = realDuration;
    
    console.log('🛫 generateOneWayFlight - times received:', times);
    console.log('🛫 Distance:', distance, 'km, Duration:', realDuration);
    
    const basePrice = this.generateBasePrice(from, to, flightClass);
    const price = this.generatePrice(basePrice, airline);
    const availableSeats = this.generateAvailableSeats(aircraft, flightClass);

    const flight: FlightResult = {
      id,
      route: {
        from: {
          code: fromAirport.code,
          city: fromAirport.city,
          country: fromAirport.country
        },
        to: {
          code: toAirport.code,
          city: toAirport.city,
          country: toAirport.country
        }
      },
      flight_type: isDirect ? 'direct' : 'transit',
      airline: {
        code: airline.code,
        name: airline.name
      },
      flight_number: `${airline.code}${Math.floor(Math.random() * 9000) + 1000}`,
      departure_time: times.departure,
      arrival_time: times.arrival,
      duration: times.duration,
      aircraft,
      price,
      available_seats: availableSeats,
      baggage: flightClass === 'economy' ? '1x23kg' : flightClass === 'first' ? '3x32kg' : '2x23kg',
      meal: airline.qualityScore >= 7 ? 'included' : flightClass === 'economy' ? 'for purchase' : 'included',
      entertainment: aircraft.includes('A380') || aircraft.includes('777') ? 'personal screen' : 'overhead screen',
      class: flightClass
    };

    // Add segments for transit flights
    if (!isDirect) {
      // Generate transit flight with layover using different airlines
      const hubAirports = ['KUL', 'SIN', 'BKK', 'CGK', 'MNL']; // Major hub airports
      const hub = hubAirports[Math.floor(Math.random() * hubAirports.length)];
      
      // 50% chance to use different airline for second segment
      const useSecondAirline = Math.random() > 0.5;
      const secondAirline = useSecondAirline 
        ? AIRLINES[Math.floor(Math.random() * AIRLINES.length)]
        : airline;
      
      flight.segments = [
        {
          airline: { code: airline.code, name: airline.name },
          flight_number: `${airline.code}${Math.floor(Math.random() * 9000) + 1000}`,
          from,
          to: hub,
          departure_time: times.departure,
          arrival_time: times.arrival,
          duration: this.generateDuration(this.calculateDistance(from, hub), false),
          aircraft
        },
        {
          airline: { code: secondAirline.code, name: secondAirline.name },
          flight_number: `${secondAirline.code}${Math.floor(Math.random() * 9000) + 1000}`,
          from: hub,
          to,
          departure_time: times.departure,
          arrival_time: times.arrival,
          duration: this.generateDuration(this.calculateDistance(hub, to), false),
          aircraft: this.selectAircraft(this.calculateDistance(hub, to), secondAirline),
          layover: `${Math.floor(Math.random() * 4) + 1}h ${Math.floor(Math.random() * 6) * 10}m`
        }
      ];
      flight.total_duration = times.duration;
    }

    return flight;
  }

  // Generate flights for search parameters
  generateFlights(params: ProceduralFlightParams): (FlightResult | RoundTripFlightResult)[] {
    console.log('🛫 ProceduralFlightGenerator.generateFlights called with:', params);
    
    const flights: (FlightResult | RoundTripFlightResult)[] = [];
    const targetCount = params.count || 45; // Default to 45 flights
    
    // ALWAYS generate flights - ignore airport validation for now
    const routeCombinations: Array<{ from: string, to: string }> = [];
    
    console.log('🛫 Processing airports - from:', params.from, 'to:', params.to);
    
    // Force route combinations even if airports not found in service
    for (const from of params.from) {
      for (const to of params.to) {
        if (from !== to) {
          routeCombinations.push({ from, to });
          console.log(`🛫 FORCED route combination: ${from} → ${to}`);
        }
      }
    }
    
    // If no route combinations from params, create a default one
    if (routeCombinations.length === 0 && params.from.length > 0 && params.to.length > 0) {
      routeCombinations.push({ from: params.from[0], to: params.to[0] });
      console.log(`🛫 DEFAULT route combination: ${params.from[0]} → ${params.to[0]}`);
    }
    
    // If still no routes, create a fallback
    if (routeCombinations.length === 0) {
      routeCombinations.push({ from: 'SIN', to: 'BKK' });
      console.log('🛫 FALLBACK route combination: SIN → BKK');
    }
    
    console.log('🛫 Final route combinations:', routeCombinations);

    console.log(`🛫 Generating flights for ${routeCombinations.length} route combinations:`, routeCombinations);

    // Generate flights
    console.log(`🛫 Starting flight generation loop: ${targetCount} flights`);
    for (let i = 0; i < targetCount; i++) {
      const route = routeCombinations[i % routeCombinations.length];
      console.log(`🛫 Generating flight ${i + 1}/${targetCount} for route:`, route);
      
      if (params.tripType === 'roundtrip') {
        // Generate round-trip flight
        const outboundFlight = this.generateOneWayFlight(
          `RT${(i + 1).toString().padStart(3, '0')}-OUT`,
          route.from,
          route.to,
          params.class,
          params.departDate
        );
        
        const returnFlight = this.generateOneWayFlight(
          `RT${(i + 1).toString().padStart(3, '0')}-RET`,
          route.to,
          route.from,
          params.class,
          params.returnDate
        );

        const roundTripFlight: RoundTripFlightResult = {
          id: `RT${(i + 1).toString().padStart(3, '0')}`,
          route: {
            from: outboundFlight.route.from,
            to: outboundFlight.route.to
          },
          outbound: outboundFlight,
          return: returnFlight,
          total_price: outboundFlight.price + returnFlight.price
        };

        flights.push(roundTripFlight);
        console.log(`🛫 Added round-trip flight ${i + 1}, total flights: ${flights.length}`);
      } else {
        // Generate one-way flight
        const flight = this.generateOneWayFlight(
          `OW${(i + 1).toString().padStart(3, '0')}`,
          route.from,
          route.to,
          params.class,
          params.departDate
        );
        
        flights.push(flight);
        console.log(`🛫 Added flight ${i + 1}, total flights: ${flights.length}`);
      }
    }

    console.log(`🛫 Flight generation complete! Generated ${flights.length} flights`);
    return flights;
  }
}

export const proceduralFlightGenerator = new ProceduralFlightGenerator();
export default proceduralFlightGenerator;
