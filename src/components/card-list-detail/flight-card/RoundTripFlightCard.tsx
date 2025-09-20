import { useState } from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';
import { FlightDetailModal } from '../FlightDetailModal';
import { FlightSegment } from './FlightSegment';
import { FlightCardLayout } from './FlightCardLayout';
import { formatSelected } from '~/lib/currency';
import {
	normalizeFlightData,
	formatFlightDate,
	generateReturnDate,
	getAirlineLogoFromDuffel,
	formatTimeFromString,
} from './utils';
import { useFlightSearchStore } from '~/lib/stores/flight-search-store';
import type { FlightCardProps } from './types';
import type { RoundTripFlightResult } from '~/lib/services/flight-search-service';

export function RoundTripFlightCard({ flight, onSelect }: FlightCardProps) {
	console.log('🔄 RoundTripFlightCard rendering for:', flight?.id);

	const navigate = useNavigate();
	const { locale } = useParams({ from: '/$locale/flights/search/' });
	const [showModal, setShowModal] = useState(false);
	const searchParams = useFlightSearchStore((s) => s.searchParams);

	const normalizedFlight = normalizeFlightData(flight);

	// Get origin/destination from search params or fallback to flight data
	const fromAirport = searchParams?.from?.[0] || normalizedFlight.departure.airport || 'CGK';
	const toAirport = searchParams?.to?.[0] || normalizedFlight.arrival.airport || 'DPS';
	const fromCity = normalizedFlight.departure.city || 'Jakarta';
	const toCity = normalizedFlight.arrival.city || 'Denpasar';

	// Check if this is actually a RoundTripFlightResult with real data
	const isRoundTrip = flight && 'outbound' in flight && 'return' in flight;
	const roundTripFlight = isRoundTrip ? flight as RoundTripFlightResult : null;
	console.log('💰 RoundTrip price data:', { 
		originalPrice: flight?.price, 
		normalizedPrice: normalizedFlight.price,
		flightId: normalizedFlight.id 
	});

	// Create a simple working round-trip card first
	const handleViewDetails = () => {
		setShowModal(true);
	};

	const handleContinue = () => {
		setShowModal(false);
		if (onSelect) {
			onSelect();
			return;
		}
		// Fallback legacy navigation
		// I-FIXED-THIS
		navigate({
			to: '/$locale/checkout/ticket-type/$flightId',
			params: {
				locale: locale || 'en',
				flightId: normalizedFlight.id,
			},
		});
	};

	// Generate dates from search params or use current date
	const outboundDate = searchParams?.departDate || new Date().toISOString().split('T')[0];
	const returnDate = searchParams?.returnDate || generateReturnDate(outboundDate);

	// Create badges based on actual flight data
	const badges = [];
	if (normalizedFlight.stops === 0) {
		badges.push({ text: 'Direct', variant: 'green' as const });
	}
	if (normalizedFlight.flexible) {
		badges.push({ text: 'Flexible ticket upgrade available', variant: 'blue' as const });
	}

	const flightSegments = (
		<>
			{/* Outbound Flight */}
			<FlightSegment
				departureTime={roundTripFlight?.outbound?.departure_time ? formatTimeFromString(roundTripFlight.outbound.departure_time) : normalizedFlight.departure.time}
				arrivalTime={roundTripFlight?.outbound?.arrival_time ? formatTimeFromString(roundTripFlight.outbound.arrival_time) : normalizedFlight.arrival.time}
				departureAirport={fromAirport}
				arrivalAirport={toAirport}
				departureCity={fromCity}
				arrivalCity={toCity}
				departureDate={outboundDate}
				arrivalDate={outboundDate}
				duration={roundTripFlight?.outbound?.duration || normalizedFlight.duration}
				stops={roundTripFlight?.outbound?.flight_type === 'direct' ? 0 : (normalizedFlight.stops || 0)}
				airlineCode={roundTripFlight?.outbound?.airline?.code || normalizedFlight.airlineCode}
				transitAirlineCode={roundTripFlight?.outbound?.segments?.[1]?.airline?.code}
				className="mb-4"
			/>

			{/* Return Flight */}
			<FlightSegment
				departureTime={roundTripFlight?.return?.departure_time ? formatTimeFromString(roundTripFlight.return.departure_time) : normalizedFlight.departure.time}
				arrivalTime={roundTripFlight?.return?.arrival_time ? formatTimeFromString(roundTripFlight.return.arrival_time) : normalizedFlight.arrival.time}
				departureAirport={toAirport}
				arrivalAirport={fromAirport}
				departureCity={toCity}
				arrivalCity={fromCity}
				departureDate={returnDate}
				arrivalDate={returnDate}
				duration={roundTripFlight?.return?.duration || normalizedFlight.duration}
				stops={roundTripFlight?.return?.flight_type === 'direct' ? 0 : (normalizedFlight.stops || 0)}
				airlineCode={roundTripFlight?.return?.airline?.code || normalizedFlight.airlineCode}
				transitAirlineCode={roundTripFlight?.return?.segments?.[1]?.airline?.code}
				className="mb-4"
			/>
		</>
	);

	return (
		<FlightCardLayout
			badges={badges}
			flightSegments={flightSegments}
			airlineName={normalizedFlight.airline || 'Unknown Airline'}
			price={normalizedFlight.price || 0}
			onViewDetails={handleViewDetails}
		>
			{/* Flight Detail Modal */}
			<FlightDetailModal
				flight={normalizedFlight}
				isOpen={showModal}
				onClose={() => setShowModal(false)}
				onContinue={handleContinue}
			/>
		</FlightCardLayout>
	);
}
