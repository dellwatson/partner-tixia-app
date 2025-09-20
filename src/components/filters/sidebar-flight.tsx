import { FilterAccordion } from '../ui/accordion-filter';
import { FilterContent } from './FilterContent';
import { flightFilters } from '~/data/flightFilters';
import { useFlightFilterParams } from '~/hooks/useFilterParams';
import { useFlightSearchStore } from '~/lib/stores/flight-search-store';

interface FlightSearchFiltersProps {
	// Keep for backward compatibility, but we'll use URL params internally
	priceRange?: number[];
	onPriceRangeChange?: (range: number[]) => void;
	selectedAirlines?: string[];
	onAirlinesChange?: (airlines: string[]) => void;
	maxStops?: number;
	onMaxStopsChange?: (stops: number) => void;
	availableAirlines?: string[];
}

// Skeleton component for loading state
const FilterSkeleton = () => (
	<div className="space-y-0">
		{[1, 2, 3, 4, 5].map((index) => (
			<div key={index} className="border-b border-gray-200 p-4">
				<div className="flex items-center justify-between">
					<div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
					<div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
				</div>
			</div>
		))}
	</div>
);

// refactor -> mobile and desktop version
export const FlightSearchFilters = (_props: FlightSearchFiltersProps) => {
	const { updateFilter, getFilterValue, resetFilter } = useFlightFilterParams();
	const { isLoading, availableFilters, rawFlights } = useFlightSearchStore();

	// Show skeleton when loading or no data yet
	if (isLoading || rawFlights.length === 0) {
		return <FilterSkeleton />;
	}

	return (
		<div className="space-y-0">
			{flightFilters.map((filter, index) => {
				const selectedValues = getFilterValue(filter.id, filter.defaultValue);
				const isActive = selectedValues && (
					Array.isArray(selectedValues) ? selectedValues.length > 0 : 
					selectedValues !== filter.defaultValue
				);

				// Update filter with dynamic data from flight search
				let updatedFilter = { ...filter };
				if (filter.id === 'airlines' && availableFilters.airlines.length > 0) {
					updatedFilter = {
						...filter,
						options: availableFilters.airlines.map(airline => ({
							id: airline.code,
							label: `${airline.name} (${airline.code})`,
							count: airline.count
						}))
					};
				} else if (filter.id === 'price' && availableFilters.priceRange) {
					updatedFilter = {
						...filter,
						min: availableFilters.priceRange[0],
						max: availableFilters.priceRange[1],
						defaultValue: availableFilters.priceRange
					};
				} else if (filter.id === 'duration' && availableFilters.durationRange) {
					updatedFilter = {
						...filter,
						min: Math.floor(availableFilters.durationRange[0] / 60), // Convert minutes to hours
						max: Math.ceil(availableFilters.durationRange[1] / 60),
						defaultValue: [
							Math.floor(availableFilters.durationRange[0] / 60),
							Math.ceil(availableFilters.durationRange[1] / 60)
						]
					};
				} else if (filter.id === 'aircraft' && availableFilters.aircraft.length > 0) {
					updatedFilter = {
						...filter,
						options: availableFilters.aircraft.map(aircraft => ({
							id: aircraft.type,
							label: aircraft.type,
							count: aircraft.count
						}))
					};
				}

				return (
					<FilterAccordion
						key={filter.id}
						title={filter.title}
						subtitle={filter.subtitle}
						isActive={isActive}
						onReset={() => resetFilter(filter.id)}
						variant="bordered"
						showSubtitle={false}
						isFirst={index === 0}
						isLast={index === flightFilters.length - 1}
					>
						<FilterContent
							filter={updatedFilter}
							selectedValues={selectedValues}
							onValueChange={updateFilter}
						/>
					</FilterAccordion>
				);
			})}
		</div>
	);
};