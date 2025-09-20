import React, { useState } from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';
import { Calendar, Users, Bed, Wifi, Coffee, Car, Utensils, Dumbbell } from 'lucide-react';
import { useCurrencyStore } from '~/stores/currency-store';
import { useHotelCheckoutStore } from '~/stores/hotel-checkout-store';
import { formatSelected } from '~/lib/currency';

interface Room {
	id: string;
	name: string;
	type: string;
	size: string;
	maxGuests: number;
	beds: string;
	amenities: string[];
	price: number;
	originalPrice?: number;
	currency: string;
	availability: number;
	images: string[];
	cancellation: string;
	breakfast: boolean;
	refundable: boolean;
}

interface AvailabilityAreaProps {
	hotelId: string;
	checkIn: string;
	checkOut: string;
	guests: number;
	rooms: Room[];
}

const AvailabilityArea: React.FC<AvailabilityAreaProps> = ({
	hotelId,
	checkIn,
	checkOut,
	guests,
	rooms,
}) => {
	const navigate = useNavigate();
	const params = useParams({ from: '/$locale/hotels/$countryId/$hotelId' });
	const [selectedRooms, setSelectedRooms] = useState<{ [roomId: string]: number }>({});
	const [showAllRooms, setShowAllRooms] = useState(false);
	
	// Get currency from global store
	const { currency } = useCurrencyStore();

	const displayedRooms = showAllRooms ? rooms : rooms.slice(0, 3);

	const handleRoomSelection = (roomId: string, quantity: number) => {
		setSelectedRooms((prev) => ({
			...prev,
			[roomId]: quantity,
		}));
	};

	const getTotalPrice = () => {
		return Object.entries(selectedRooms).reduce((total, [roomId, quantity]) => {
			const room = rooms.find((r) => r.id === roomId);
			return total + (room ? room.price * quantity : 0);
		}, 0);
	};

	// Handle room selection with proper data sync to hotel checkout store
	const handleChooseRoom = (roomId: string, roomType: 'special' | 'standard' | 'premium') => {
		const room = rooms.find(r => r.id === roomId);
		if (!room) return;
		
		// Calculate price based on room type
		let finalPrice = room.price;
		if (roomType === 'standard') finalPrice = room.price * 1.2;
		if (roomType === 'premium') finalPrice = room.price * 1.4;
		
		// Store room selection data for use in reservation forms
		const { setDraft } = useHotelCheckoutStore.getState();
		const bookingId = `${params.hotelId}-${roomId}-${roomType}-${Date.now()}`;
		
		// Store selection data for reservation process
		setDraft(bookingId, {
			hotelId: params.hotelId,
			roomId: `${roomId}-${roomType}`,
			roomName: room.name,
			roomType: room.type,
			price: finalPrice,
			checkIn,
			checkOut,
			guests,
			selectedRoomType: roomType,
		});
		
		navigate({
			to: '/$locale/reserve/form/$bookingId',
			params: {
				locale: params.locale,
				bookingId,
			},
			search: {
				hotelId: params.hotelId,
				roomId: `${roomId}-${roomType}`,
				checkIn,
				checkOut,
				guests: guests.toString(),
			},
		});
	};

	const getAmenityIcon = (amenity: string) => {
		switch (amenity.toLowerCase()) {
			case 'wifi':
			case 'free wifi':
				return <Wifi className="h-4 w-4" />;
			case 'coffee':
			case 'coffee maker':
				return <Coffee className="h-4 w-4" />;
			case 'parking':
			case 'free parking':
				return <Car className="h-4 w-4" />;
			case 'restaurant':
			case 'room service':
				return <Utensils className="h-4 w-4" />;
			case 'gym':
			case 'fitness center':
				return <Dumbbell className="h-4 w-4" />;
			default:
				return null;
		}
	};

	return (
		<div id="availability" className="rounded-lg border border-gray-200 bg-white p-6">
			<div className="mb-6">
				<h2 className="mb-2 text-2xl font-bold text-gray-900">Choose your room</h2>
				<div className="flex items-center gap-6 text-sm text-gray-600">
					<div className="flex items-center gap-2">
						<Calendar className="h-4 w-4" />
						<span>
							{checkIn} - {checkOut}
						</span>
					</div>
					<div className="flex items-center gap-2">
						<Users className="h-4 w-4" />
						<span>{guests} guests</span>
					</div>
				</div>
			</div>

			<div className="space-y-6">
				{displayedRooms.map((room) => (
					<div
						key={room.id}
						className="overflow-hidden rounded-lg border border-gray-200 bg-white"
					>
						{/* Room Header */}
						<div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
							<h3 className="text-xl font-bold text-gray-900">{room.name}</h3>
							<div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
								<span className="flex items-center gap-1">
									<Users className="h-4 w-4" />
									This room usually accommodates {room.maxGuests} guests
								</span>
								<span className="flex items-center gap-1">
									<span className="h-4 w-4 rounded-sm bg-gray-400"></span>
									{room.size}
								</span>
							</div>
							<div className="mt-2 flex flex-wrap gap-2">
								{room.amenities.slice(0, 4).map((amenity, index) => (
									<div
										key={index}
										className="flex items-center gap-1 text-xs text-gray-600"
									>
										{getAmenityIcon(amenity)}
										<span>{amenity}</span>
									</div>
								))}
							</div>
							<button className="mt-2 text-sm text-blue-600 hover:underline">
								See Room Details
							</button>
						</div>

						{/* Room Options */}
						<div className="divide-y divide-gray-200">
							{/* Option 1 */}
							<div className="flex items-center p-6">
								<div className="mr-6 h-32 w-48 flex-shrink-0">
									<img
										src={room.images[0] || '/api/placeholder/300/200'}
										alt={room.name}
										className="h-full w-full rounded-lg object-cover"
									/>
								</div>

								<div className="flex-1">
									<div className="mb-2 flex items-start gap-2">
										<div className="mt-1 flex h-4 w-4 items-center justify-center rounded-sm bg-blue-600">
											<span className="text-xs text-white">◆</span>
										</div>
										<div>
											<span className="text-sm font-medium text-blue-600">
												Bigger space with price for 1
											</span>
											<div className="mt-1 text-sm text-gray-600">
												{room.type} - Last Minute
											</div>
										</div>
									</div>
									<div className="space-y-1 text-sm">
										<div className="flex items-center gap-2">
											<Bed className="h-4 w-4 text-gray-400" />
											<span>{room.beds}</span>
										</div>
										<div className="flex items-center gap-2 text-green-700">
											<span>✓</span>
											<span>
												{room.refundable
													? 'Non Refundable'
													: 'Free Cancellation until 22 Sep 13:59'}
											</span>
										</div>
									</div>
								</div>

								<div className="mr-6 text-center">
									<Users className="mx-auto mb-1 h-5 w-5 text-gray-400" />
								</div>

								{/* Currency synced with global currency store */}
								<div className="mr-6 text-right">
									<div className="text-sm text-orange-600">Special for you!</div>
									<div className="text-2xl font-bold text-orange-600">
										{formatSelected(room.price)}
									</div>
									<div className="text-xs text-gray-500">
										Exclude taxes & fees
									</div>
									{room.availability <= 3 && (
										<div className="mt-1 text-xs text-red-600">
											{room.availability} room(s) left!
										</div>
									)}
								</div>

								<button
									onClick={() => handleChooseRoom(room.id, 'special')}
									className="rounded bg-blue-600 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-700"
								>
									Choose
								</button>
							</div>

							{/* Option 2 */}
							<div className="flex items-center p-6">
								<div className="mr-6 w-48"></div>

								<div className="flex-1">
									<div className="mb-1 text-sm font-medium text-gray-900">
										{room.type}
									</div>
									<div className="space-y-1 text-sm">
										<div className="flex items-center gap-2">
											<Bed className="h-4 w-4 text-gray-400" />
											<span>{room.beds}</span>
										</div>
										<div className="flex items-center gap-2 text-green-700">
											<span>✓</span>
											<span>
												{room.breakfast
													? 'Breakfast Included'
													: 'Breakfast not Included'}
											</span>
										</div>
										<div className="flex items-center gap-2 text-green-700">
											<span>✓</span>
											<span>Non Refundable</span>
										</div>
									</div>
								</div>

								<div className="mr-6 text-center">
									<Users className="mx-auto mb-1 h-5 w-5 text-gray-400" />
								</div>

								<div className="mr-6 text-right">
									<div className="text-2xl font-bold text-gray-900">
										{formatSelected(room.price * 1.2)}
									</div>
									<div className="text-xs text-gray-500">
										Exclude taxes & fees
									</div>
									{room.availability <= 3 && (
										<div className="mt-1 text-xs text-red-600">
											{room.availability} room(s) left!
										</div>
									)}
								</div>

								<button
									onClick={() => handleChooseRoom(room.id, 'standard')}
									className="rounded bg-blue-600 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-700"
								>
									Choose
								</button>
							</div>

							{/* Option 3 */}
							<div className="flex items-center p-6">
								<div className="mr-6 w-48"></div>

								<div className="flex-1">
									<div className="mb-2 flex items-start gap-2">
										<div className="mt-1 flex h-4 w-4 items-center justify-center rounded-sm bg-blue-600">
											<span className="text-xs text-white">◆</span>
										</div>
										<div>
											<span className="text-sm font-medium text-blue-600">
												Bigger space with price for 1
											</span>
											<div className="mt-1 text-sm text-gray-600">
												{room.type} - Room Only
											</div>
										</div>
									</div>
									<div className="space-y-1 text-sm">
										<div className="flex items-center gap-2">
											<Bed className="h-4 w-4 text-gray-400" />
											<span>{room.beds}</span>
										</div>
										<div className="flex items-center gap-2 text-green-700">
											<span>✓</span>
											<span>Breakfast not Included</span>
										</div>
										<div className="flex items-center gap-2 text-green-700">
											<span>✓</span>
											<span>Free Cancellation until 22 Sep 13:59</span>
										</div>
									</div>
								</div>

								<div className="mr-6 text-center">
									<Users className="mx-auto mb-1 h-5 w-5 text-gray-400" />
								</div>

								<div className="mr-6 text-right">
									<div className="text-sm text-orange-600">Special for you!</div>
									<div className="text-2xl font-bold text-orange-600">
										{formatSelected(room.price * 1.4)}
									</div>
									<div className="text-xs text-gray-500">
										Exclude taxes & fees
									</div>
								</div>

								<button
									onClick={() => handleChooseRoom(room.id, 'premium')}
									className="rounded bg-blue-600 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-700"
								>
									Choose
								</button>
							</div>
						</div>

						{/* Show More Options */}
						<div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
							<button className="text-sm text-blue-600 hover:underline">
								Show 2 More Options ↓
							</button>
						</div>
					</div>
				))}
			</div>

			{rooms.length > 3 && (
				<div className="mt-4 text-center">
					<button
						onClick={() => setShowAllRooms(!showAllRooms)}
						className="font-medium text-blue-600 hover:text-blue-800"
					>
						{showAllRooms ? 'Show fewer rooms' : `Show all ${rooms.length} rooms`}
					</button>
				</div>
			)}

			{Object.keys(selectedRooms).some((roomId) => selectedRooms[roomId] > 0) && (
				<div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
					<div className="mb-4 flex items-center justify-between">
						<h3 className="font-semibold text-gray-900">Your selection</h3>
						<div className="text-right">
							<p className="text-2xl font-bold text-blue-600">
								{formatSelected(getTotalPrice())}
							</p>
							<p className="text-sm text-gray-600">total per night</p>
						</div>
					</div>

					<div className="mb-4 space-y-2">
						{Object.entries(selectedRooms).map(([roomId, quantity]) => {
							if (quantity === 0) return null;
							const room = rooms.find((r) => r.id === roomId);
							if (!room) return null;

							return (
								<div key={roomId} className="flex justify-between text-sm">
									<span>
										{room.name} × {quantity}
									</span>
									<span>{formatSelected(room.price * quantity)}</span>
								</div>
							);
						})}
					</div>

					<button
						onClick={() => {
							const firstSelectedRoom = Object.keys(selectedRooms).find(
								(roomId) => selectedRooms[roomId] > 0
							);
							if (firstSelectedRoom) {
								handleChooseRoom(firstSelectedRoom, 'selected');
							}
						}}
						className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-700"
					>
						Reserve rooms
					</button>
				</div>
			)}
		</div>
	);
};

export default AvailabilityArea;
