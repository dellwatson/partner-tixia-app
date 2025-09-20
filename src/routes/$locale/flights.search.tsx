import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { useState } from 'react';
import { FlightSearchFilters } from '~/components/filters/sidebar-flight';
import { SearchResultsWrapper } from '~/components/ui/search-results-wrapper';
import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs';

export const Route = createFileRoute('/$locale/flights/search')({
	component: FlightSearchLayout,
	validateSearch: (search: Record<string, unknown>) => {
		return {
			from: (search.from as string) || undefined,
			to: (search.to as string) || undefined,
			depart: (search.depart as string) || undefined,
			return: (search.return as string) || undefined,
			adults: Number(search.adults) || 1,
			type: (search.type as string) || 'ROUNDTRIP',
			sortBy: (search.sortBy as 'price' | 'duration' | 'departure') || 'price',
		};
	},
	beforeLoad: ({ params }) => {
		const validLocales = ['en', 'zh', 'ms', 'id', 'de', 'ru', 'ja', 'fil', 'th', 'vi'];
		if (!params.locale || !validLocales.includes(params.locale)) {
			throw redirect({
				to: '/$locale/flights/search',
				params: { locale: 'en' },
				search: {
					from: '',
					to: '',
					depart: '',
					return: '',
					adults: 1,
					type: 'ROUNDTRIP',
					sortBy: 'price',
				},
			});
		}
	},
});

function FlightSearchLayout() {
	const searchParams = Route.useSearch();
	const navigate = Route.useNavigate();

	// Filter states - get sortBy from URL params
	const [priceRange, setPriceRange] = useState([0, 500]);
	const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
	const [maxStops, setMaxStops] = useState(2);

	// Handle sort change by updating URL params
	const handleSortChange = (value: string) => {
		const newSortBy = value as 'price' | 'duration' | 'departure';
		navigate({
			search: {
				...searchParams,
				sortBy: newSortBy,
			},
		});
	};

	// Mock airlines for filter
	const airlines = ['American Airlines', 'Delta', 'United', 'Southwest', 'JetBlue'];

	const SortTabs = (
		<Tabs value={searchParams.sortBy} onValueChange={handleSortChange}>
			<TabsList className="bg-background h-auto w-full p-0 shadow-xs flex flex-col gap-2 md:flex-row md:gap-0">
				<TabsTrigger
					value="price"
					className="data-[state=active]:text-primary data-[state=active]:after:bg-primary border-border text-muted-foreground hover:text-foreground relative w-full overflow-hidden rounded-md border px-4 py-3 font-medium after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 md:flex-1 md:rounded-none md:first:rounded-s md:last:rounded-e data-[state=active]:bg-transparent"
				>
					Best
					<span className="bg-muted ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full border text-xs">
						i
					</span>
				</TabsTrigger>
				<TabsTrigger
					value="duration"
					className="data-[state=active]:text-primary data-[state=active]:after:bg-primary border-border text-muted-foreground hover:text-foreground relative w-full overflow-hidden rounded-md border px-4 py-3 font-medium after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 md:flex-1 md:rounded-none md:first:rounded-s md:last:rounded-e data-[state=active]:bg-transparent"
				>
					Cheapest
				</TabsTrigger>
				<TabsTrigger
					value="departure"
					className="data-[state=active]:text-primary data-[state=active]:after:bg-primary border-border text-muted-foreground hover:text-foreground relative w-full overflow-hidden rounded-md border px-4 py-3 font-medium after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 md:flex-1 md:rounded-none md:first:rounded-s md:last:rounded-e data-[state=active]:bg-transparent"
				>
					Fastest
				</TabsTrigger>
			</TabsList>
		</Tabs>
	);

	return (
		<SearchResultsWrapper
			filtersComponent={
				<FlightSearchFilters
					priceRange={priceRange}
					onPriceRangeChange={setPriceRange}
					selectedAirlines={selectedAirlines}
					onAirlinesChange={setSelectedAirlines}
					maxStops={maxStops}
					onMaxStopsChange={setMaxStops}
					availableAirlines={airlines}
				/>
			}
			desktopHeader={SortTabs}
			sortContentMobile={SortTabs}
		>
			<Outlet />
		</SearchResultsWrapper>
	);
}
