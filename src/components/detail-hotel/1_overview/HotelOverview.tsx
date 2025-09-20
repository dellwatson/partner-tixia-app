import React, { useState } from 'react';
import { Star, MapPin, Share2, Heart, Camera } from 'lucide-react';
import { Badge } from '~/components/ui/badge';
import { TextureButton } from '~/components/ui/texture-button';
import { PhotoGalleryModal } from '~/components/ui/photo-gallery-modal';
import { GalleryOverviewModal } from '~/components/ui/gallery-overview-modal';
import { ImageWithLoading } from '~/components/ui/image-with-loading';
import { formatSelected } from '~/lib/currency';

interface HotelHeaderProps {
	hotel: {
		name: string;
		rating: number;
		reviews: number;
		location: string;
		distance: string;
		address: string;
		price: number;
		originalPrice?: number;
		images: string[];
	};
}

function HotelOverview({ hotel }: HotelHeaderProps) {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [showGalleryOverview, setShowGalleryOverview] = useState(false);
	const [showDetailedModal, setShowDetailedModal] = useState(false);
	const [galleryModalIndex, setGalleryModalIndex] = useState(0);

	return (
		<div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
			{/* Header Info */}
			<div className="p-6 pb-4">
				<div className="flex items-start justify-between">
					<div className="flex-1">
						<h1 className="mb-2 text-3xl font-bold text-gray-900">{hotel.name}</h1>

						<div className="mb-3 flex items-center gap-4">
							<div className="flex items-center">
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
								<span className="ml-2 text-lg font-semibold">{hotel.rating}</span>
								<span className="ml-1 text-gray-600">
									({hotel.reviews} reviews)
								</span>
							</div>

							<Badge variant="secondary" className="bg-blue-100 text-blue-800">
								Exceptional
							</Badge>
						</div>

						<div className="mb-4 flex items-center text-gray-600">
							<MapPin className="mr-1 h-4 w-4" />
							<span className="text-sm">
								{hotel.location} • {hotel.distance}
							</span>
						</div>

						<div className="text-sm text-gray-500">{hotel.address}</div>

						{/* Mini Scores Section */}
						<div className="mt-4 flex items-center gap-4">
							<button
								onClick={() => {
									const element = document.getElementById('reviews');
									if (element) {
										element.scrollIntoView({
											behavior: 'smooth',
											block: 'start',
										});
									}
								}}
								className="flex cursor-pointer items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 transition-colors hover:bg-blue-100"
							>
								<div className="flex items-center">
									<Star className="h-4 w-4 fill-current text-yellow-400" />
									<span className="ml-1 text-sm font-semibold">
										{hotel.rating}
									</span>
								</div>
								<span className="text-sm text-gray-600">
									({hotel.reviews} reviews)
								</span>
							</button>

							<button
								onClick={() => {
									const element = document.getElementById('overview');
									if (element) {
										element.scrollIntoView({
											behavior: 'smooth',
											block: 'start',
										});
									}
								}}
								className="cursor-pointer rounded-lg bg-gray-50 px-3 py-2 transition-colors hover:bg-gray-100"
							>
								<span className="text-sm font-medium text-gray-700">
									Quick Details
								</span>
							</button>
						</div>
					</div>

					{/* Price and Actions */}
					<div className="ml-6 text-right">
						<div className="mb-4 flex items-center gap-2">
							<TextureButton variant="outline" size="sm">
								<Share2 className="mr-2 h-4 w-4" />
								Share
							</TextureButton>
							<TextureButton variant="outline" size="sm">
								<Heart className="mr-2 h-4 w-4" />
								Save
							</TextureButton>
						</div>

						<div className="text-right">
							{hotel.originalPrice && (
								<div className="text-sm text-gray-500 line-through">
									{formatSelected(hotel.originalPrice)}
								</div>
							)}
							<div className="text-2xl font-bold text-blue-600">{formatSelected(hotel.price)}</div>
							<div className="text-sm text-gray-600">per night</div>
						</div>
					</div>
				</div>
			</div>

			{/* Image Gallery */}
			<div className="relative">
				<div className="grid h-96 grid-cols-4 gap-2">
					{/* Main Image */}
					<div className="relative col-span-2">
						<ImageWithLoading
							src={hotel.images[currentImageIndex]}
							alt={hotel.name}
							className="h-full w-full"
							onClick={() => {
								setShowGalleryOverview(true);
							}}
							priority={true}
						/>
					</div>

					{/* Thumbnail Images */}
					<div className="col-span-2 grid grid-cols-2 gap-2">
						{hotel.images.slice(1, 5).map((image, index) => (
							<div key={index} className="relative">
								<ImageWithLoading
									src={image}
									alt={`${hotel.name} ${index + 2}`}
									className="h-full w-full transition-opacity hover:opacity-80"
									onClick={() => {
										setCurrentImageIndex(index + 1);
										setShowGalleryOverview(true);
									}}
								/>
								{index === 3 && hotel.images.length > 5 && (
									<div
										className="bg-opacity-50 absolute inset-0 flex cursor-pointer items-center justify-center bg-black"
										onClick={() => {
											setShowGalleryOverview(true);
										}}
									>
										<div className="text-center text-white">
											<Camera className="mx-auto mb-1 h-6 w-6" />
											<span className="text-sm font-medium">
												+{hotel.images.length - 5} photos
											</span>
										</div>
									</div>
								)}
							</div>
						))}
					</div>
				</div>

				{/* Show All Photos Button */}
				<div className="absolute right-4 bottom-4">
					<TextureButton
						variant="secondary"
						onClick={() => {
							setShowGalleryOverview(true);
						}}
						className="bg-white/90 hover:bg-white"
					>
						<Camera className="mr-2 h-4 w-4" />
						Show all {hotel.images.length} photos
					</TextureButton>
				</div>
			</div>

			{/* Gallery Overview Modal (Layer 1) */}
			<GalleryOverviewModal
				images={hotel.images}
				isOpen={showGalleryOverview}
				onClose={() => setShowGalleryOverview(false)}
				onImageClick={(index) => {
					setGalleryModalIndex(index);
					setShowGalleryOverview(false);
					setShowDetailedModal(true);
				}}
				hotelName={hotel.name}
			/>

			{/* Detailed Photo Gallery Modal (Layer 2) */}
			<PhotoGalleryModal
				images={hotel.images}
				isOpen={showDetailedModal}
				onClose={() => setShowDetailedModal(false)}
				initialIndex={galleryModalIndex}
				hotelName={hotel.name}
			/>
		</div>
	);
}

export default HotelOverview;
