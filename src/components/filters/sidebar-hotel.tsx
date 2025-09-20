import { FilterAccordion } from '../ui/accordion-filter';
import { FilterContent } from './FilterContent';
import { hotelFilters } from '~/data/hotelFilters';
import { useHotelFilterParams } from '~/hooks/useFilterParams';

interface HotelSearchFiltersProps {
	// Keep for backward compatibility, but we'll use URL params internally
	priceRange?: number[];
	onPriceRangeChange?: (range: number[]) => void;
	selectedAmenities?: string[];
	onAmenitiesChange?: (amenities: string[]) => void;
	starRating?: number;
	onStarRatingChange?: (rating: number) => void;
}

// refactor -> mobile and desktop version
export const HotelSearchFilters = (_props: HotelSearchFiltersProps) => {
	const { updateFilter, getFilterValue, resetFilter } = useHotelFilterParams();

	return (
		<div className="space-y-0">
			{hotelFilters.map((filter, index) => {
				const selectedValues = getFilterValue(filter.id, filter.defaultValue);
				const isActive = selectedValues && (
					Array.isArray(selectedValues) ? selectedValues.length > 0 : 
					selectedValues !== filter.defaultValue
				);

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
						isLast={index === hotelFilters.length - 1}
					>
						<FilterContent
							filter={filter}
							selectedValues={selectedValues}
							onValueChange={updateFilter}
						/>
					</FilterAccordion>
				);
			})}
		</div>
	);
};