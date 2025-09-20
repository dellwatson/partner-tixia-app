import React, { useState } from 'react';
import {
	Star,
	MapPin,
	Wifi,
	Car,
	Coffee,
	Dumbbell,
	Camera,
	ChevronLeft,
	ChevronRight,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { TextureButton } from '~/components/ui/texture-button';

interface QuickDetailsProps {
	hotel: {
		name: string;
		rating: number;
		reviews: number;
		images: string[];
		location: string;
		distance: string;
		amenities: string[];
		description: string;
	};
}

function QuickDetails({ hotel }: QuickDetailsProps) {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [showLightbox, setShowLightbox] = useState(false);

	const nextImage = () => {
		setCurrentImageIndex((prev) => (prev + 1) % hotel.images.length);
	};

	const prevImage = () => {
		setCurrentImageIndex((prev) => (prev - 1 + hotel.images.length) % hotel.images.length);
	};

	const amenityIcons: Record<string, any> = {
		'Free WiFi': Wifi,
		Pool: '🏊',
		Gym: Dumbbell,
		Spa: '🧖',
		Restaurant: '🍽️',
		Bar: '🍸',
		Parking: Car,
		'Room Service': '🛎️',
	};

	const ratingCategories = [
		{ name: 'Cleanliness', score: 9.2 },
		{ name: 'Comfort', score: 9.0 },
		{ name: 'Location', score: 9.5 },
		{ name: 'Facilities', score: 8.8 },
		{ name: 'Staff', score: 9.3 },
		{ name: 'Value for money', score: 8.5 },
	];

	return (
		<div id="section-overview" className="space-y-6">
			{/* Quick Review Summary */}
			<Card>
				<CardHeader>
					<CardTitle>Guest Review Summary</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
						{/* Overall Score */}
						<div className="text-center">
							<div className="mb-2 text-4xl font-bold text-blue-600">
								{hotel.rating}
							</div>
							<div className="mb-2 flex items-center justify-center">
								{[...Array(5)].map((_, i) => (
									<Star
										key={i}
										className={`h-5 w-5 ${
											i < Math.floor(hotel.rating)
												? 'fill-current text-yellow-400'
												: 'text-gray-300'
										}`}
									/>
								))}
							</div>
							<div className="text-lg font-semibold text-gray-900">Exceptional</div>
							<div className="text-sm text-gray-600">{hotel.reviews} reviews</div>
						</div>

						{/* Rating Breakdown */}
						<div className="space-y-3">
							{ratingCategories.map((category) => (
								<div
									key={category.name}
									className="flex items-center justify-between"
								>
									<span className="text-sm text-gray-600">{category.name}</span>
									<div className="flex items-center gap-2">
										<div className="h-2 w-24 rounded-full bg-gray-200">
											<div
												className="h-2 rounded-full bg-blue-600"
												style={{ width: `${(category.score / 10) * 100}%` }}
											/>
										</div>
										<span className="w-8 text-sm font-medium">
											{category.score}
										</span>
									</div>
								</div>
							))}
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Interactive Map */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<MapPin className="h-5 w-5" />
						Location & Map
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="mb-4 flex aspect-video items-center justify-center rounded-lg bg-gray-200">
						<div className="text-center text-gray-500">
							<MapPin className="mx-auto mb-2 h-12 w-12" />
							<p>Interactive Map</p>
							<p className="text-sm">Click to view full map</p>
						</div>
					</div>

					<div className="space-y-2">
						<div className="flex items-center gap-2">
							<MapPin className="h-4 w-4 text-gray-400" />
							<span className="text-sm">
								{hotel.location} • {hotel.distance}
							</span>
						</div>
						<div className="text-sm text-gray-600">Excellent location - show map</div>
					</div>
				</CardContent>
			</Card>

			{/* Key Features */}
			<Card>
				<CardHeader>
					<CardTitle>Key Features & Amenities</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-2 gap-4 md:grid-cols-4">
						{hotel.amenities.slice(0, 8).map((amenity) => {
							const IconComponent = amenityIcons[amenity];
							return (
								<div
									key={amenity}
									className="flex items-center gap-2 rounded-lg bg-gray-50 p-3"
								>
									{typeof IconComponent === 'string' ? (
										<span className="text-lg">{IconComponent}</span>
									) : IconComponent ? (
										<IconComponent className="h-5 w-5 text-blue-600" />
									) : (
										<div className="h-5 w-5 rounded-full bg-blue-600" />
									)}
									<span className="text-sm font-medium">{amenity}</span>
								</div>
							);
						})}
					</div>

					{hotel.amenities.length > 8 && (
						<div className="mt-4 text-center">
							<TextureButton variant="outline">
								Show all {hotel.amenities.length} amenities
							</TextureButton>
						</div>
					)}
				</CardContent>
			</Card>

			{/* Description */}
			<Card>
				<CardHeader>
					<CardTitle>About This Property</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="leading-relaxed text-gray-700">{hotel.description}</p>
				</CardContent>
			</Card>
		</div>
	);
}

export default QuickDetails;
