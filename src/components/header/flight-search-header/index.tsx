import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from '@tanstack/react-router';
import { addDays, format } from 'date-fns';
import { Tag } from 'emblor';
import { SearchHeaderWrapper } from '../SearchHeaderWrapper';
import { Plane } from 'lucide-react';
import { OriginDestination } from './origin-destination';
import { TravelDates } from './travel-dates';
import { Passengers } from './passengers';
import { FlightOptions, type CabinClass } from './flight-options';
import { airportService } from '~/lib/services/airport-service';

interface PassengerData {
	adults: number;
	children: number;
	childrenAges: number[];
}

export const FlightSearchHeader = () => {
	const navigate = useNavigate();
	const location = useLocation();

	// Initialize with 1 week preset for round-trip
	const today = new Date();
	const nextWeek = addDays(today, 7);

	const [searchForm, setSearchForm] = useState(() => {
		// Initialize from URL parameters to avoid empty-state flash on refresh
		let from: Tag[] = [];
		let to: Tag[] = [];
		let departDate = format(today, 'yyyy-MM-dd');
		let returnDate = format(nextWeek, 'yyyy-MM-dd');
		let adults = 1;
		let tripType: 'ROUNDTRIP' | 'ONEWAY' = 'ROUNDTRIP';
		let cabinClass: CabinClass = 'economy';
		let directFlightsOnly = false;

		if (typeof window !== 'undefined') {
			const params = new URLSearchParams(window.location.search);
			const fromParam = params.get('from');
			const toParam = params.get('to');
			const departParam = params.get('depart');
			const returnParam = params.get('return');
			const adultsParam = params.get('adults');
			const typeParam = params.get('type');
			const cabinParam = params.get('cabin');
			const directParam = params.get('direct');

			if (fromParam) {
				from = fromParam.split(',').map((code) => {
					const ap = airportService.getAirportByCode(code.trim());
					return { id: code.trim(), text: ap ? `${ap.code} ${ap.city}` : code.trim() };
				});
			}
			if (toParam) {
				to = toParam.split(',').map((code) => {
					const ap = airportService.getAirportByCode(code.trim());
					return { id: code.trim(), text: ap ? `${ap.code} ${ap.city}` : code.trim() };
				});
			}
			if (departParam) departDate = departParam;
			if (returnParam) returnDate = returnParam;
			if (adultsParam) adults = Math.max(1, parseInt(adultsParam, 10) || 1);
			if (typeParam === 'ONEWAY' || typeParam === 'ROUNDTRIP') tripType = typeParam;
			if (cabinParam === 'economy' || cabinParam === 'premium' || cabinParam === 'business' || cabinParam === 'first') {
				cabinClass = cabinParam as CabinClass;
			}
			if (directParam) directFlightsOnly = directParam === 'true' || directParam === '1';
			if (tripType === 'ONEWAY') returnDate = '';
		}

		return {
			from,
			to,
			depart: departDate,
			return: returnDate,
			passengers: { adults, children: 0, childrenAges: [] } as PassengerData,
			tripType,
			cabinClass,
			directFlightsOnly,
		};
	});

	// Keep state in sync when the search params change (e.g., user navigates or shares link)
	useEffect(() => {
		if (!location) return;
		if (typeof window === 'undefined') return;
		const params = new URLSearchParams(window.location.search);
		const fromParam = params.get('from');
		const toParam = params.get('to');
		const departParam = params.get('depart');
		const returnParam = params.get('return');
		const adultsParam = params.get('adults');
		const typeParam = params.get('type');
		const cabinParam = params.get('cabin');
		const directParam = params.get('direct');

		setSearchForm((prev) => ({
			...prev,
			from: fromParam
				? fromParam.split(',').map((code) => {
						const ap = airportService.getAirportByCode(code.trim());
						return { id: code.trim(), text: ap ? `${ap.code} ${ap.city}` : code.trim() };
				  })
				: prev.from,
			to: toParam
				? toParam.split(',').map((code) => {
						const ap = airportService.getAirportByCode(code.trim());
						return { id: code.trim(), text: ap ? `${ap.code} ${ap.city}` : code.trim() };
				  })
				: prev.to,
			depart: departParam || prev.depart,
			return: typeParam === 'ONEWAY' ? '' : (returnParam ?? prev.return),
			passengers: {
				...prev.passengers,
				adults: adultsParam ? Math.max(1, parseInt(adultsParam, 10) || 1) : prev.passengers.adults,
			},
			tripType: typeParam === 'ONEWAY' || typeParam === 'ROUNDTRIP' ? (typeParam as 'ONEWAY' | 'ROUNDTRIP') : prev.tripType,
			cabinClass: cabinParam && (['economy','premium','business','first'] as CabinClass[]).includes(cabinParam as CabinClass)
				? (cabinParam as CabinClass)
				: prev.cabinClass,
			directFlightsOnly: directParam ? (directParam === 'true' || directParam === '1') : prev.directFlightsOnly,
		}));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location?.search]);

	const handleSearch = () => {
		if (searchForm.from.length === 0 || searchForm.to.length === 0) return;

		try {
			const fromCodes = searchForm.from.map((tag) => tag.text.split(' ')[0]).join(',');
			const toCodes = searchForm.to.map((tag) => tag.text.split(' ')[0]).join(',');

			navigate({
				to: '/$locale/flights/search',
				params: { locale: 'en' },
				search: {
					from: fromCodes,
					to: toCodes,
					depart: searchForm.depart,
					return: searchForm.return || '',
					adults: searchForm.passengers.adults,
					type: searchForm.tripType,
				} as any,
			});
		} catch (error) {
			// Fallback to flights page if navigation fails
			navigate({
				to: '/$locale/flights',
				params: { locale: 'en' },
			});
		}
	};

	const handleOriginDestinationChange = (from: Tag[], to: Tag[]) => {
		setSearchForm((prev) => ({
			...prev,
			from,
			to,
		}));
	};

	const handleTravelDatesChange = (depart: string, returnDate: string) => {
		setSearchForm((prev) => ({
			...prev,
			depart,
			return: returnDate,
		}));
	};

	const handlePassengersChange = (passengers: PassengerData) => {
		setSearchForm((prev) => ({
			...prev,
			passengers,
		}));
	};

	const additionalControls = (
		<FlightOptions
			tripType={searchForm.tripType}
			cabinClass={searchForm.cabinClass}
			directFlightsOnly={searchForm.directFlightsOnly}
			onTripTypeChange={(tripType) => setSearchForm((prev) => ({ ...prev, tripType }))}
			onCabinClassChange={(cabinClass) => setSearchForm((prev) => ({ ...prev, cabinClass }))}
			onDirectFlightsChange={(directFlightsOnly) =>
				setSearchForm((prev) => ({ ...prev, directFlightsOnly }))
			}
		/>
	);

	// Mobile compact info content for search pages
	const fromLabel = searchForm.from[0]?.text?.split(' ')[0] || 'FROM';
	const toLabel = searchForm.to[0]?.text?.split(' ')[0] || 'TO';
	const departLabel = searchForm.depart ? format(new Date(searchForm.depart), 'd MMM') : '';
	const returnLabel = searchForm.return ? format(new Date(searchForm.return), 'd MMM') : '';
	const paxLabel = `${searchForm.passengers.adults} adult${searchForm.passengers.adults > 1 ? 's' : ''}`;
	const cabinLabel =
		searchForm.cabinClass.charAt(0).toUpperCase() + searchForm.cabinClass.slice(1);

	const mobileCompactInfo = (
		<div className="space-y-0.5">
			<div className="text-base font-semibold flex items-center">
				<Plane className="mr-2 h-4 w-4" />
				<span className="uppercase">{fromLabel}</span>
				<span className="mx-1">↔</span>
				<span className="uppercase">{toLabel}</span>
			</div>
			<div className="text-sm text-gray-800">
				{departLabel}
				{returnLabel ? ` - ${returnLabel}` : ''}
				{` · ${paxLabel} · ${cabinLabel}`}
			</div>
		</div>
	);

	return (
		<SearchHeaderWrapper
			onSearch={handleSearch}
			isSearchDisabled={searchForm.from.length === 0 || searchForm.to.length === 0}
			additionalContent={additionalControls}
			mobileCompactInfo={mobileCompactInfo}
		>
			{/* Origin & Destination */}
			<div className="w-full flex-[2] md:flex-[2]">
				<OriginDestination
					from={searchForm.from}
					to={searchForm.to}
					onChange={handleOriginDestinationChange}
				/>
			</div>

			{/* Desktop Divider - Hidden on mobile */}
			<div className="hidden w-px self-stretch bg-gray-300 md:block" />

			{/* Travel Dates */}
			<div className="w-full flex-1 md:flex-1">
				<TravelDates
					depart={searchForm.depart}
					return={searchForm.return}
					tripType={searchForm.tripType}
					onChange={handleTravelDatesChange}
				/>
			</div>

			{/* Desktop Divider - Hidden on mobile */}
			<div className="hidden w-px self-stretch bg-gray-300 md:block" />

			{/* Passengers */}
			<div className="w-full flex-1 md:flex-1">
				<Passengers passengers={searchForm.passengers} onChange={handlePassengersChange} />
			</div>
		</SearchHeaderWrapper>
	);
};
