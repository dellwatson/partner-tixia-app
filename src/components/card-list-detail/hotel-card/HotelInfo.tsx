import { Star, MapPin } from 'lucide-react';
import { Badge } from '~/components/ui/badge';
import type { HotelInfoProps } from './types';

export function HotelInfo({ hotel, className = '' }: HotelInfoProps) {
	// Calculate score category based on rating
	const getScoreCategory = (rating: number) => {
		if (rating >= 9.0) return { text: 'Exceptional', color: 'bg-green-700' };
		if (rating >= 8.5) return { text: 'Excellent', color: 'bg-green-600' };
		if (rating >= 8.0) return { text: 'Very Good', color: 'bg-blue-600' };
		if (rating >= 7.0) return { text: 'Good', color: 'bg-blue-500' };
		if (rating >= 6.0) return { text: 'Pleasant', color: 'bg-yellow-500' };
		return { text: 'Fair', color: 'bg-orange-500' };
	};

	const scoreCategory = getScoreCategory(hotel.rating);

	return (
		<div className={`flex-1 py-3 ${className} w-full`}>
			<div className="w-full flex-1">
				{/* Hotel Name and Score */}
				<div className="mb-2 flex w-full items-start justify-between">
					<h3 className="cursor-pointer text-lg font-semibold text-blue-600 hover:underline">
						{hotel.name}
					</h3>
				</div>
				<div className="float-end flex flex-col items-end justify-end gap-2">
					<div
						className={`${scoreCategory.color} min-w-[2.5rem] rounded-md px-2 py-1 text-center text-sm font-bold text-white`}
					>
						{hotel.rating}
					</div>
					<div className="text-right">
						<div className="text-sm font-medium text-gray-900">
							{scoreCategory.text}
						</div>
						<div className="text-xs text-gray-600">{hotel.reviews} reviews</div>
					</div>
				</div>

				{/* Stars */}
				<div className="mb-2 flex items-center gap-1">
					{[...Array(5)].map((_, i) => (
						<Star
							key={i}
							className={`h-3 w-3 ${
								i < Math.floor(hotel.rating)
									? 'fill-current text-yellow-400'
									: 'text-gray-300'
							}`}
						/>
					))}
				</div>

				{/* Location */}
				<div className="mb-3 flex items-center text-sm text-gray-600">
					<MapPin className="mr-1 h-4 w-4" />
					{hotel.location} • {hotel.distance}
				</div>

				{/* Room Type */}
				<div className="mb-2 text-sm font-medium text-gray-900">{hotel.roomType}</div>
				<div className="mb-3 text-xs text-gray-600">Beds: 1 double or 2 twins</div>

				{/* Amenities with Green Checkmarks */}
				<div className="space-y-1">
					{hotel.cancellation && (
						<div className="flex items-center gap-2 text-sm">
							<div className="flex h-4 w-4 items-center justify-center rounded-full bg-green-500">
								<svg
									className="h-2.5 w-2.5 text-white"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										fillRule="evenodd"
										d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
										clipRule="evenodd"
									/>
								</svg>
							</div>
							<span className="font-medium text-green-700">Free cancellation</span>
						</div>
					)}

					{/* Add common amenities with checkmarks */}
					{/* <div className="flex items-center gap-2 text-sm">
						<div className="flex h-4 w-4 items-center justify-center rounded-full bg-green-500">
							<svg
								className="h-2.5 w-2.5 text-white"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fillRule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
						<span className="text-green-700">Parking + high-speed internet</span>
					</div> */}
				</div>
			</div>
		</div>
	);
}
