import { ViewModeToggle } from './ViewModeToggle';
import { SortDropdown } from './SortDropdown';
import { useUIStore } from '~/stores/ui-store';

type SortBy =
	| 'our-top-picks'
	| 'homes-apartments'
	| 'price-low'
	| 'price-high'
	| 'best-reviewed'
	| 'rating-high'
	| 'rating-low'
	| 'distance'
	| 'top-reviewed';

interface HotelSearchHeaderProps {
	location: string;
	propertyCount: number;
}

export function HotelContentHeader({ location, propertyCount }: HotelSearchHeaderProps) {
	const { hotelSortBy, setHotelSortBy } = useUIStore();

	const handleSortChange = (newSort: SortBy) => {
		setHotelSortBy(newSort);
	};

	return (
		<div className="mb-2">
			{/* Main header with destination and view toggle */}
			<div className="mb-1 flex items-center justify-between">
				<h1 className="text-foreground font-bold md:text-2xl">
					{location || 'Your Destination'}: {propertyCount.toLocaleString()} properties
					found
				</h1>
				<div className="hidden md:block">
					<ViewModeToggle />
				</div>
			</div>

			{/* Sort Dropdown */}
			<div className="hidden items-center md:flex">
				<SortDropdown value={hotelSortBy} onValueChange={handleSortChange} />
			</div>
		</div>
	);
}
