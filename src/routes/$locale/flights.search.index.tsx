import { createFileRoute } from '@tanstack/react-router';
import { Plane } from 'lucide-react';
import { FlightCard } from '~/components/card-list-detail/flight-card';
import { FlightCardSkeleton } from '~/components/card-list-detail/FlightCardSkeleton';
import { flightSearchLoader } from '~/lib/loaders/flight-loader';
import { useFlightSearchStore } from '~/lib/stores/flight-search-store';
import type { FlightResult, RoundTripFlightResult } from '~/lib/services/flight-search-service';
import { Badge } from '~/components/ui/badge';
import { useEffect, useState } from 'react';
import { useSelectionStore } from '~/lib/stores/selection-store';
import { useNavigate } from '@tanstack/react-router';
import { useFlightCheckoutStore } from '~/stores/flight-checkout-store';
import { useCurrencyStore } from '~/stores/currency-store';

// Pending component for loading state
function FlightSearchPending() {
	return (
		<div className="space-y-4">
			{Array.from({ length: 5 }).map((_, index) => (
				<FlightCardSkeleton key={index} />
			))}
		</div>
	);
}

export const Route = createFileRoute('/$locale/flights/search/')({
	component: FlightSearchResults,
	loader: flightSearchLoader,
	pendingComponent: FlightSearchPending,
});

function FlightSearchResults() {
	const { locale } = Route.useParams();
	const loaderData = Route.useLoaderData();
	const store = useFlightSearchStore();
	const navigate = useNavigate();
	const createFlightSelection = useSelectionStore((s) => s.createFlightSelection);
	const currency = useCurrencyStore((s) => s.currency);
	const [forceUpdate, setForceUpdate] = useState(0);

	// Force re-render when currency changes
	useEffect(() => {
		setForceUpdate(prev => prev + 1);
	}, [currency]);

	// Debug logging
	console.log('🔍 FlightSearchResults - Loader data:', loaderData);
	console.log('🔍 FlightSearchResults - Zustand store:', {
		searchParams: store.searchParams,
		rawFlights: store.rawFlights.length,
		filteredFlights: store.filteredFlights.length,
		isLoading: store.isLoading,
	});

	// Use store data as fallback if loader data is empty
	const flights = loaderData.flights?.length > 0 ? loaderData.flights : store.filteredFlights;
	const total = loaderData.total || store.pagination.total;
	const searchParams = loaderData.searchParams || store.searchParams;
	const isNewSearch = loaderData.isNewSearch;

	console.log('🔍 FlightSearchResults rendering:', {
		flightsLength: flights.length,
		flights: flights.slice(0, 2), // Show first 2 flights
		searchParams,
		total,
	});

	const handleSelectFlight = (flight: FlightResult | RoundTripFlightResult) => {
		try {
			const selectionId = createFlightSelection(
				flight,
				searchParams || store.searchParams || null
			);
			// Initialize checkout draft with base price in USD (one-way: price, round-trip: total_price)
			const baseUSD = 'total_price' in flight ? flight.total_price : (flight as FlightResult).price;
			useFlightCheckoutStore.getState().initDraft(selectionId, baseUSD);
			// I-FIXED-THIS
			navigate({
				to: '/$locale/checkout/ticket-type/$flightId',
				params: { locale, flightId: selectionId },
			});
		} catch (e) {
			console.error('Failed to create flight selection', e);
		}
	};

	return (
		<div className="space-y-4 pb-12">
			{flights.length === 0 ? (
				<div className="py-12 text-center">
					<Plane className="mx-auto mb-4 h-12 w-12 text-gray-400" />
					<h3 className="mb-2 text-lg font-medium text-gray-900">No flights found</h3>
					<p className="text-gray-500">
						{searchParams?.from?.length && searchParams?.to?.length
							? `No flights available from ${searchParams.from.join(', ')} to ${searchParams.to.join(', ')} with your current filters.`
							: 'Try adjusting your search criteria or filters to find available flights.'}
					</p>
				</div>
			) : (
				<>
					{/* Flight results */}
					<div className="space-y-4">
						{flights.map((flight: FlightResult | RoundTripFlightResult) => (
							<FlightCard
								key={`${flight.id}-${currency}-${forceUpdate}`}
								flight={flight}
								onSelect={() => handleSelectFlight(flight)}
							/>
						))}
					</div>
				</>
			)}
		</div>
	);
}
