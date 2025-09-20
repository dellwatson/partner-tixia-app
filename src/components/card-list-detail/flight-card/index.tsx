import { isRoundTripFlight } from './utils';
import { RoundTripFlightCard } from './RoundTripFlightCard';
import { OneWayFlightCard } from './OneWayFlightCard';
import type { FlightCardProps } from './types';

export function FlightCard({ flight, onSelect }: FlightCardProps) {
  // Debug flight data to see what we're getting
  console.log('🔍 FlightCard received flight data:', {
    id: flight?.id,
    hasOutbound: 'outbound' in flight,
    hasReturn: 'return' in flight,
    isRoundTrip: isRoundTripFlight(flight),
    flightKeys: Object.keys(flight || {}),
    flightType: typeof flight
  });
  
  // Check URL to see if we should force round-trip
  const urlParams = new URLSearchParams(window.location.search);
  const tripType = urlParams.get('type')?.toLowerCase();
  console.log('🔍 URL trip type:', tripType);
  
  // Force round-trip for testing if URL says roundtrip
  if (tripType === 'roundtrip') {
    console.log('🔄 URL indicates round-trip, forcing RoundTripFlightCard');
    
    // Create different flight variations for testing
    const flightIndex = parseInt(flight?.id?.slice(-2) || '0', 10) % 3;
    
    if (flightIndex === 1) {
      // Second flight: Transit version
      return (
        <RoundTripFlightCard 
          flight={{
            ...flight,
            id: flight.id + '-TRANSIT'
          }} 
          onSelect={onSelect} 
        />
      );
    }
    
    return <RoundTripFlightCard flight={flight} onSelect={onSelect} />;
  }
  
  // Determine which card type to render based on flight data
  if (isRoundTripFlight(flight)) {
    console.log('✅ Rendering RoundTripFlightCard for:', flight.id);
    return <RoundTripFlightCard flight={flight} onSelect={onSelect} />;
  }
  
  console.log('✅ Rendering OneWayFlightCard for:', flight.id);
  return <OneWayFlightCard flight={flight} onSelect={onSelect} />;
}

// Export all components for direct use if needed
export { RoundTripFlightCard } from './RoundTripFlightCard';
export { OneWayFlightCard } from './OneWayFlightCard';
export { FlightSegment } from './FlightSegment';
export { AirlineLogo } from './AirlineLogo';
export * from './types';
export * from './utils';
