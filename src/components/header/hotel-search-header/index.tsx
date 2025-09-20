import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { SearchHeaderWrapper } from '../SearchHeaderWrapper';
import { Destination } from './destination';
import { CheckInOut } from './check-in-out';
import { GuestsRooms } from './guests-rooms';

export const HotelSearchHeader = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { t } = useTranslation();
	const [searchForm, setSearchForm] = useState(() => {
		// Initialize from URL to avoid empty-state flash on refresh
		let destination = '';
		let country = '';
		let checkIn = '';
		let checkOut = '';
		let guests = 1;
		let rooms = 1;

		if (typeof window !== 'undefined') {
			const params = new URLSearchParams(window.location.search);
			destination = params.get('location') || '';
			country = params.get('country') || '';
			checkIn = params.get('checkIn') || '';
			checkOut = params.get('checkOut') || '';
			const guestsParam = params.get('guests');
			const roomsParam = params.get('rooms');
			if (guestsParam) guests = Math.max(1, parseInt(guestsParam, 10) || 1);
			if (roomsParam) rooms = Math.max(1, parseInt(roomsParam, 10) || 1);
		}

		return { destination, country, checkIn, checkOut, guests, rooms };
	});

	// Sync when URL search changes
	useEffect(() => {
		if (typeof window === 'undefined') return;
		const params = new URLSearchParams(window.location.search);
		setSearchForm((prev) => ({
			...prev,
			destination: params.get('location') || prev.destination,
			country: params.get('country') || prev.country,
			checkIn: params.get('checkIn') || prev.checkIn,
			checkOut: params.get('checkOut') || prev.checkOut,
			guests: params.get('guests') ? Math.max(1, parseInt(params.get('guests') as string, 10) || 1) : prev.guests,
			rooms: params.get('rooms') ? Math.max(1, parseInt(params.get('rooms') as string, 10) || 1) : prev.rooms,
		}));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location?.search]);

	const handleSearch = () => {
		if (!searchForm.destination) return;

		try {
			navigate({
				to: '/$locale/hotels/search',
				params: { locale: 'en' },
				search: {
					location: searchForm.destination,
					checkIn: searchForm.checkIn,
					checkOut: searchForm.checkOut,
					guests: searchForm.guests,
					rooms: searchForm.rooms,
				},
			});
		} catch (error) {
			// Fallback to hotels page if navigation fails
			navigate({
				to: '/$locale/hotels',
				params: { locale: 'en' },
			});
		}
	};

	const handleDestinationChange = (destination: string, country?: string) => {
		setSearchForm((prev) => ({
			...prev,
			destination,
			country: country || prev.country,
		}));
	};

	const handleDatesChange = (checkIn: string, checkOut: string) => {
		setSearchForm((prev) => ({
			...prev,
			checkIn,
			checkOut,
		}));
	};

	const handleGuestsRoomsChange = (guests: number, rooms: number) => {
		setSearchForm((prev) => ({
			...prev,
			guests,
			rooms,
		}));
	};

	// Mobile compact info content for search pages
	const destLabel = searchForm.destination || t('search_destination', 'Where are you going?');
	const checkInLabel = searchForm.checkIn ? format(new Date(searchForm.checkIn), 'd MMM') : '';
	const checkOutLabel = searchForm.checkOut ? format(new Date(searchForm.checkOut), 'd MMM') : '';
	const guestsRoomsLabel = `${searchForm.guests} guest${searchForm.guests > 1 ? 's' : ''} · ${searchForm.rooms} room${searchForm.rooms > 1 ? 's' : ''}`;

	const mobileCompactInfo = (
		<div className="space-y-0.5">
			<div className="text-base font-semibold">
				{destLabel}
			</div>
			<div className="text-sm text-gray-200/90">
				{checkInLabel}
				{checkOutLabel ? ` - ${checkOutLabel}` : ''}
				{` · ${guestsRoomsLabel}`}
			</div>
		</div>
	);

	return (
		<SearchHeaderWrapper
			onSearch={handleSearch}
			isSearchDisabled={!searchForm.destination}
			mobileCompactInfo={mobileCompactInfo}
			// additional content exist if it's within search result (as breadcrumbs)
		>
			{/* Destination */}
			<div className="w-full flex-[2] md:flex-[1.15]">
				<Destination
					value={searchForm.destination}
					onChange={handleDestinationChange}
					placeholder={t('search_destination', 'Where are you going?')}
				/>
			</div>

			{/* Desktop Dividers - Hidden on mobile */}
			<div className="hidden h-17 w-px bg-gray-300 md:block" />

			{/* Check-in/Check-out */}
			<div className="w-full flex-1 md:flex-1">
				<CheckInOut
					checkIn={searchForm.checkIn}
					checkOut={searchForm.checkOut}
					onChange={handleDatesChange}
				/>
			</div>

			{/* Desktop Dividers - Hidden on mobile */}
			<div className="hidden h-17 w-px bg-gray-300 md:block" />

			{/* Guests & Rooms */}
			<div className="w-full flex-1 md:flex-1">
				<GuestsRooms
					guests={searchForm.guests}
					rooms={searchForm.rooms}
					onChange={handleGuestsRoomsChange}
				/>
			</div>
		</SearchHeaderWrapper>
	);
};
