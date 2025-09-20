import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { useState } from 'react';
import { HotelSearchFilters } from '~/components/filters/sidebar-hotel';
import { SearchResultsWrapper } from '~/components/ui/search-results-wrapper';
import { HotelContentHeader } from '~/components/filters/content-list/HotelContentHeader';
import { SortOptionsList } from '~/components/filters/content-list/SortDropdown';
import { useUIStore } from '~/stores/ui-store';

export const Route = createFileRoute('/$locale/hotels/search')({
	component: HotelSearchLayout,
	validateSearch: (search: Record<string, unknown>) => {
		return {
			location: (search.location as string) || '',
			checkIn: (search.checkIn as string) || '',
			checkOut: (search.checkOut as string) || '',
			guests: Number(search.guests) || 1,
			rooms: Number(search.rooms) || 1,
			sort: (search.sort as string) || 'our-top-picks',
		};
	},
	beforeLoad: ({ params }) => {
		const validLocales = ['en', 'zh', 'ms', 'id', 'de', 'ru', 'ja', 'fil', 'th', 'vi'];
		if (!params.locale || !validLocales.includes(params.locale)) {
			throw redirect({
				to: '/$locale/hotels/search',
				params: { locale: 'en' },
				search: {
					location: '',
					checkIn: '',
					checkOut: '',
					guests: 1,
					rooms: 1,
					sort: 'our-top-picks',
				},
			});
		}
	},
});

function HotelSearchLayout() {
	const searchParams = Route.useSearch();
	const { hotelSortBy, setHotelSortBy } = useUIStore();

	// Filter states - these persist across navigation
	const [priceRange, setPriceRange] = useState([0, 500]);
	const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
	const [starRating, setStarRating] = useState(0);

	// Mock property count - in real app this would come from API
	const propertyCount = Math.floor(Math.random() * 300) + 30;

	return (
		<SearchResultsWrapper
			filtersComponent={
				<HotelSearchFilters
					priceRange={priceRange}
					onPriceRangeChange={setPriceRange}
					selectedAmenities={selectedAmenities}
					onAmenitiesChange={setSelectedAmenities}
					starRating={starRating}
					onStarRatingChange={setStarRating}
				/>
			}
			desktopHeader={
				<HotelContentHeader
					location={searchParams.location}
					propertyCount={propertyCount}
				/>
			}
			sortContentMobile={
				<SortOptionsList value={hotelSortBy} onValueChange={setHotelSortBy} />
			}
		>
			<Outlet />
			{/* tips (**do not remove**) if result is low, then try to feature control-search, suggestion here */}
		</SearchResultsWrapper>
	);
}
