import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { fetchHotels, type Hotel } from '~/data/mockHotels';
import { HotelCard } from '~/components/card-list-detail/HotelCard';
import { HotelCardSkeleton } from '~/components/card-list-detail/HotelCardSkeleton';
import { useSelectionStore } from '~/lib/stores/selection-store';
import { useNavigate } from '@tanstack/react-router';
import { useCurrencyStore } from '~/stores/currency-store';

export const Route = createFileRoute('/$locale/hotels/search/')({
	component: HotelSearchResults,
});

// RESULTS => READ FROM URL PARAMS STRUCTURE
// so trigger update when params changing?
function HotelSearchResults() {
	const { locale } = Route.useParams();
	const searchParams = Route.useSearch();
	const navigate = useNavigate();
	const createHotelSelection = useSelectionStore((s) => s.createHotelSelection);
	const currency = useCurrencyStore((s) => s.currency);
	const [forceUpdate, setForceUpdate] = useState(0);

	const [hotels, setHotels] = useState<Hotel[]>([]);
	const [loading, setLoading] = useState(true);

	// Force re-render when currency changes
	useEffect(() => {
		setForceUpdate(prev => prev + 1);
	}, [currency]);

	// Load hotels data with random delay simulation
	useEffect(() => {
		const loadHotels = async () => {
			setLoading(true);
			try {
				// Add random delay between 800ms - 2000ms to simulate real API
				const delay = Math.random() * 1200 + 800;
				await new Promise((resolve) => setTimeout(resolve, delay));

				const data = await fetchHotels(searchParams.location || 'Unknown Location');

				// Randomize the results order to simulate different search results
				const shuffledData = [...data].sort(() => Math.random() - 0.5);

				setHotels(shuffledData);
			} catch (error) {
				console.error('Failed to load hotels:', error);
			} finally {
				setLoading(false);
			}
		};

		loadHotels();
	}, [
		searchParams.location,
		searchParams.checkIn,
		searchParams.checkOut,
		searchParams.guests,
		searchParams.rooms,
	]);

	if (loading) {
		return (
			<div className="space-y-4">
				{Array.from({ length: 5 }).map((_, index) => (
					<HotelCardSkeleton key={index} />
				))}
			</div>
		);
	}

	return (
		<div className="space-y-4 bg-white">
			{hotels.map((hotel) => (
				<HotelCard
					key={`${hotel.id}-${currency}-${forceUpdate}`}
					hotel={hotel}
					locale={locale}
					onSelect={(h) => {
						try {
							const selectionId = createHotelSelection(h, {
								location: String(searchParams.location || ''),
								checkIn: String(searchParams.checkIn || ''),
								checkOut: String(searchParams.checkOut || ''),
								guests: searchParams.guests ? Number(searchParams.guests) : undefined,
								rooms: searchParams.rooms ? Number(searchParams.rooms) : undefined,
							});

							// Derive country from hotel location (fallback indonesia)
							const loc = h.location.toLowerCase();
							const countryId = loc.includes('singapore')
								? 'singapore'
								: loc.includes('kuala lumpur')
								? 'malaysia'
								: loc.includes('bangkok')
								? 'thailand'
								: loc.includes('hanoi') || loc.includes('ho chi minh')
								? 'vietnam'
								: 'indonesia';

							navigate({
								to: '/$locale/hotels/$countryId/$hotelId',
								params: { locale, countryId, hotelId: selectionId },
								search: { sel: selectionId },
							});
						} catch (e) {
							console.error('Failed to create hotel selection', e);
						}
					}}
				/>
			))}

			{hotels.length === 0 && (
				<div className="text-center">
					<MapPin className="mx-auto mb-4 h-12 w-12 text-gray-400" />
					<h3 className="mb-2 text-lg font-medium text-gray-900">No properties found</h3>
					<p className="text-gray-600">Try adjusting your filters or search criteria.</p>
				</div>
			)}
		</div>
	);
}
