import React from 'react';
import { Star } from 'lucide-react';
import { formatSelected } from '~/lib/currency';

interface HotelInfo {
	name: string;
	rating: number;
	location: string;
	image: string;
}

interface ReservationInfo {
	checkIn: string;
	checkOut: string;
	guests: number;
	rooms: number;
	nights: number;
}

interface PriceBreakdown {
	baseRoomRate: number;
	taxes: number;
	fees: number;
	total: number;
}

interface HotelReservationSummaryProps {
	hotel: HotelInfo;
	reservation: ReservationInfo;
	pricing: PriceBreakdown;
	roomType?: string;
	variant?: 'form' | 'payment'; // Different layouts for form vs payment page
}

export function HotelReservationSummary({
	hotel,
	reservation,
	pricing,
	roomType = 'Deluxe Room',
	variant = 'form'
}: HotelReservationSummaryProps) {
	const formatDate = (dateString: string) => {
		if (!dateString) return '-';
		return new Date(dateString).toLocaleDateString('en-US', {
			weekday: 'short',
			month: 'short',
			day: 'numeric',
			year: 'numeric',
		});
	};

	if (variant === 'payment') {
		return (
			<div className="space-y-6">
				{/* Hotel Card */}
				<div className="rounded-lg border bg-white p-6 shadow-sm">
					<div className="mb-4 flex items-start gap-4">
						<img
							src={hotel.image}
							alt="Hotel"
							className="h-20 w-30 rounded-lg object-cover"
						/>
						<div className="flex-1">
							<h3 className="font-semibold text-gray-900">{hotel.name}</h3>
							<div className="mt-1 flex items-center gap-1">
								{[...Array(5)].map((_, i) => (
									<Star
										key={i}
										className={`h-4 w-4 ${
											i < Math.floor(hotel.rating)
												? 'fill-yellow-400 text-yellow-400'
												: 'text-gray-300'
										}`}
									/>
								))}
								<span className="ml-1 text-sm text-gray-600">{hotel.rating}</span>
							</div>
							<p className="mt-1 text-sm text-gray-600">{hotel.location}</p>
						</div>
					</div>

					{/* Room Type */}
					<div className="mb-4 rounded-lg bg-gray-50 p-3">
						<h4 className="font-medium text-gray-900">{roomType}</h4>
						<p className="text-sm text-gray-600">
							{reservation.rooms} room(s) for {reservation.guests} guest(s)
						</p>
					</div>

					{/* Booking Details */}
					<div className="space-y-3">
						<div className="flex justify-between">
							<div>
								<div className="font-medium">Check-in</div>
								<div className="text-sm text-gray-600">{formatDate(reservation.checkIn)}</div>
								<div className="text-xs text-gray-500">3:00 PM - 12:00 AM</div>
							</div>
							<div className="text-right">
								<div className="font-medium">Check-out</div>
								<div className="text-sm text-gray-600">{formatDate(reservation.checkOut)}</div>
								<div className="text-xs text-gray-500">12:00 AM - 10:00 AM</div>
							</div>
						</div>

						<div className="border-t pt-2">
							<div className="text-sm font-medium">Total length of stay:</div>
							<div className="text-sm text-gray-600">{reservation.nights} nights</div>
						</div>
					</div>
				</div>

				{/* Price Summary */}
				<div className="rounded-lg border bg-white p-6 shadow-sm">
					<h3 className="mb-4 font-semibold">Price Summary</h3>
					<div className="space-y-2 text-sm">
						<div className="flex justify-between">
							<span>Room rate ({reservation.nights} nights)</span>
							<span>{formatSelected(pricing.baseRoomRate)}</span>
						</div>
						<div className="flex justify-between">
							<span>Taxes & Fees</span>
							<span>{formatSelected(pricing.taxes + pricing.fees)}</span>
						</div>
					</div>
					<div className="mt-3 border-t pt-3">
						<div className="flex items-center justify-between">
							<div>
								<div className="text-lg font-bold">Total</div>
								<div className="text-xs text-gray-500">Includes taxes and fees</div>
							</div>
							<div className="text-right">
								<div className="text-lg font-bold">{formatSelected(pricing.total)}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	// Form variant (original layout)
	return (
		<div className="space-y-6">
			{/* Hotel Card */}
			<div className="rounded-lg border bg-white p-6 shadow-sm">
				<div className="mb-4 flex items-start gap-4">
					<img
						src={hotel.image}
						alt="Hotel"
						className="h-20 w-30 rounded-lg object-cover"
					/>
					<div className="flex-1">
						<h3 className="font-semibold text-gray-900">{hotel.name}</h3>
						<div className="mt-1 flex items-center gap-1">
							{[...Array(5)].map((_, i) => (
								<Star
									key={i}
									className={`h-4 w-4 ${
										i < Math.floor(hotel.rating)
											? 'fill-yellow-400 text-yellow-400'
											: 'text-gray-300'
									}`}
								/>
							))}
							<span className="ml-1 text-sm text-gray-600">{hotel.rating}</span>
						</div>
						<p className="mt-1 text-sm text-gray-600">{hotel.location}</p>
					</div>
				</div>
			</div>

			{/* Booking Details */}
			<div className="rounded-lg border bg-white p-4">
				<h3 className="mb-4 font-semibold">Your booking details</h3>

				<div className="space-y-3">
					<div className="flex justify-between">
						<div>
							<div className="font-medium">Check-in</div>
							<div className="text-sm text-gray-600">{formatDate(reservation.checkIn)}</div>
							<div className="text-xs text-gray-500">3:00 PM - 12:00 AM</div>
						</div>
						<div className="text-right">
							<div className="font-medium">Check-out</div>
							<div className="text-sm text-gray-600">{formatDate(reservation.checkOut)}</div>
							<div className="text-xs text-gray-500">12:00 AM - 10:00 AM</div>
						</div>
					</div>

					<div className="border-t pt-2">
						<div className="text-sm font-medium">Total length of stay:</div>
						<div className="text-sm text-gray-600">{reservation.nights} nights</div>
					</div>

					<div className="border-t pt-2">
						<div className="flex items-center justify-between">
							<div className="text-sm font-medium">You selected</div>
							<button className="text-sm text-blue-600 hover:underline">
								Change your selection
							</button>
						</div>
						<div className="text-sm text-gray-600">
							{reservation.rooms} room(s) for {reservation.guests} guest(s)
						</div>
					</div>
				</div>
			</div>

			{/* Price Summary */}
			<div className="rounded-lg border bg-white p-4">
				<h3 className="mb-4 font-semibold">Your price summary</h3>
				<div className="space-y-2 text-sm">
					<div className="flex justify-between">
						<span>Room rate</span>
						<span>{formatSelected(pricing.baseRoomRate)}</span>
					</div>
					<div className="flex justify-between">
						<span>Taxes & Fees</span>
						<span>{formatSelected(pricing.taxes + pricing.fees)}</span>
					</div>
				</div>
				<div className="mt-3 border-t pt-3">
					<div className="flex items-center justify-between">
						<div>
							<div className="text-lg font-bold">Total</div>
							<div className="text-xs text-gray-500">Includes taxes and fees</div>
						</div>
						<div className="text-right">
							<div className="text-lg font-bold">{formatSelected(pricing.total)}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
