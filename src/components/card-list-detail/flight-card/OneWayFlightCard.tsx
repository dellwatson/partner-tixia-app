import { useState } from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';
import { FlightDetailModal } from '../FlightDetailModal';
import { FlightSegment } from './FlightSegment';
import { FlightCardLayout } from './FlightCardLayout';
import { normalizeFlightData, getAirlineLogoFromDuffel } from './utils';
import { useFlightSearchStore } from '~/lib/stores/flight-search-store';
import type { FlightCardProps } from './types';

export function OneWayFlightCard({ flight, onSelect }: FlightCardProps) {
	console.log('✈️ OneWayFlightCard rendering for:', flight?.id);

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

	// Get airline information
	const airlines = [normalizedFlight.airlineCode];
	if (normalizedFlight.segments && normalizedFlight.segments.length > 1) {
		airlines.push(...normalizedFlight.segments.map((s) => s.airline.code));
	}

	const uniqueAirlines = [...new Set(airlines.filter(Boolean))];
	const airlineNames = uniqueAirlines
		.map((code) => getAirlineLogoFromDuffel(code).name)
		.join(', ');

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

	// Create badges based on flight data
	const badges = [];
	if (normalizedFlight.stops === 0) {
		badges.push({ text: 'Direct', variant: 'green' as const });
	}
	if (normalizedFlight.flexible) {
		badges.push({ text: 'Flexible ticket upgrade available', variant: 'blue' as const });
	}

	const flightSegments = (
		<FlightSegment
			departureTime={normalizedFlight.departure.time}
			arrivalTime={normalizedFlight.arrival.time}
			departureAirport={fromAirport}
			arrivalAirport={toAirport}
			departureCity={fromCity}
			arrivalCity={toCity}
			departureDate={normalizedFlight.departure.date}
			arrivalDate={normalizedFlight.arrival.date}
			duration={normalizedFlight.duration}
			stops={normalizedFlight.stops}
			airlineCode={normalizedFlight.airlineCode}
			transitAirlineCode={normalizedFlight.segments?.[1]?.airline.code}
			className="mb-4"
		/>
	);

	// Use numeric price for currency formatting
	const priceValue = normalizedFlight.price || 0;
	console.log('💰 OneWay price data:', { 
		originalPrice: flight?.price, 
		normalizedPrice: normalizedFlight.price,
		flightId: normalizedFlight.id 
	});

	return (
		<FlightCardLayout
			badges={badges}
			flightSegments={flightSegments}
			airlineName={airlineNames}
			price={priceValue}
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
