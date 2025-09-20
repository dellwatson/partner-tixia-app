import { useState } from 'react';
import { Badge } from '~/components/ui/badge';
import { TextureButton } from '~/components/ui/texture-button';
import { TextureCard, TextureCardContent } from '~/components/ui/texture-card';
import { formatSelected } from '~/lib/currency';
import type { HotelCardLayoutProps } from './types';

export function HotelCardLayout({
	badges = [],
	hotelImage,
	hotelInfo,
	hotelName,
	price,
	originalPrice,
	onViewDetails,
	children,
}: HotelCardLayoutProps) {
	const [showFeaturesDropdown, setShowFeaturesDropdown] = useState(false);

	const getBadgeClasses = (variant: 'green' | 'blue' | 'purple' | 'orange') => {
		switch (variant) {
			case 'green':
				return 'border-green-200 bg-green-100 text-green-800';
			case 'blue':
				return 'border-blue-200 bg-blue-100 text-blue-800';
			case 'purple':
				return 'border-purple-200 bg-purple-100 text-purple-800';
			case 'orange':
				return 'border-orange-200 bg-orange-100 text-orange-800';
			default:
				return 'border-gray-200 bg-gray-100 text-gray-800';
		}
	};

	return (
		<TextureCard variant="subtle" className="transition-all duration-200">
			<TextureCardContent className="p-0">
				{/* Top badges */}
				{/* {badges.length > 0 && (
					<div className="mb-4 flex gap-2">
						{badges.map((badge, index) => (
							<Badge
								key={index}
								variant="outline"
								className={`text-xs ${getBadgeClasses(badge.variant)}`}
							>
								{badge.text}
							</Badge>
						))}
					</div>
				)} */}

				{/* Main Layout: Image + Info + Right Section (stacks on mobile) */}
				<div
					className="flex flex-col md:flex-row cursor-pointer md:cursor-auto"
					onClick={() => {
						// Mobile: tap anywhere to view details
						if (typeof window !== 'undefined' && window.innerWidth < 768) {
							onViewDetails();
						}
					}}
				>
					{/* Hotel Image */}
					<div className="flex h-44 w-full md:h-48 md:w-64 flex-shrink-0">{hotelImage}</div>

					{/* Hotel Info Section */}
					<div className="w-full flex-1 p-4 md:p-0 md:pl-6">{hotelInfo}</div>

					{/* Vertical Divider (desktop only) */}
					<div className="hidden md:block mx-8 w-px self-stretch bg-gray-300"></div>

					{/* Right Section (40%) - Features, Price and Button (desktop only) */}
					<div className="hidden md:flex min-w-40 flex-col justify-between py-6 pr-5">
						{/* Hotel Features - Similar to baggage icons */}
						<div className="relative mb-2 flex justify-end gap-3">
							{/* Free WiFi */}
							<div className="relative">
								<svg
									className="h-6 w-6 text-gray-600"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM8.5 9.5c0-1.93 1.57-3.5 3.5-3.5s3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5-3.5-1.57-3.5-3.5zm7 7c0 .28-.22.5-.5.5h-7c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h7c.28 0 .5.22.5.5z" />
								</svg>
								{/* Green checkmark overlay */}
								<div className="absolute -right-1 -bottom-1 flex h-3 w-3 items-center justify-center rounded-full bg-green-500">
									<svg
										className="h-2 w-2 text-white"
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
							</div>

							{/* Free Breakfast */}
							<div className="relative">
								<svg
									className="h-6 w-6 text-gray-600"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10z" />
									<path d="M12 13c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
								</svg>
								{/* Green checkmark overlay */}
								<div className="absolute -right-1 -bottom-1 flex h-3 w-3 items-center justify-center rounded-full bg-green-500">
									<svg
										className="h-2 w-2 text-white"
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
							</div>

							{/* Free Parking */}
							<div className="relative">
								<svg
									className="h-6 w-6 text-gray-600"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M13 3H6v18h4v-6h3c3.31 0 6-2.69 6-6s-2.69-6-6-6zm-1 8H8V7h4c1.1 0 2 .9 2 2s-.9 2-2 2z" />
								</svg>
								{/* Green checkmark overlay */}
								<div className="absolute -right-1 -bottom-1 flex h-3 w-3 items-center justify-center rounded-full bg-green-500">
									<svg
										className="h-2 w-2 text-white"
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
							</div>

							{/* Features Info Trigger */}
							<button
								className="text-gray-400 transition-colors hover:text-gray-600"
								onMouseEnter={() => setShowFeaturesDropdown(true)}
								onMouseLeave={() => setShowFeaturesDropdown(false)}
							>
								<svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
									<path
										fillRule="evenodd"
										d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
										clipRule="evenodd"
									/>
								</svg>
							</button>

							{/* Features Info Dropdown */}
							{showFeaturesDropdown && (
								<div
									className="absolute top-8 right-0 z-10 w-64 rounded-lg border border-gray-200 bg-white p-4 shadow-lg"
									onMouseEnter={() => setShowFeaturesDropdown(true)}
									onMouseLeave={() => setShowFeaturesDropdown(false)}
								>
									<h4 className="mb-3 font-semibold text-gray-900">
										Included amenities
									</h4>
									<div className="space-y-2">
										<div className="flex items-center gap-3">
											<div className="relative">
												<svg
													className="h-5 w-5 text-gray-600"
													fill="currentColor"
													viewBox="0 0 24 24"
												>
													<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM8.5 9.5c0-1.93 1.57-3.5 3.5-3.5s3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5-3.5-1.57-3.5-3.5zm7 7c0 .28-.22.5-.5.5h-7c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h7c.28 0 .5.22.5.5z" />
												</svg>
												<div className="absolute -right-0.5 -bottom-0.5 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-green-500">
													<svg
														className="h-1.5 w-1.5 text-white"
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
											</div>
											<span className="text-sm text-gray-700">Free WiFi</span>
										</div>
										<div className="flex items-center gap-3">
											<div className="relative">
												<svg
													className="h-5 w-5 text-gray-600"
													fill="currentColor"
													viewBox="0 0 24 24"
												>
													<path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10z" />
												</svg>
												<div className="absolute -right-0.5 -bottom-0.5 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-green-500">
													<svg
														className="h-1.5 w-1.5 text-white"
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
											</div>
											<span className="text-sm text-gray-700">
												Free breakfast
											</span>
										</div>
										<div className="flex items-center gap-3">
											<div className="relative">
												<svg
													className="h-5 w-5 text-gray-600"
													fill="currentColor"
													viewBox="0 0 24 24"
												>
													<path d="M13 3H6v18h4v-6h3c3.31 0 6-2.69 6-6s-2.69-6-6-6zm-1 8H8V7h4c1.1 0 2 .9 2 2s-.9 2-2 2z" />
												</svg>
												<div className="absolute -right-0.5 -bottom-0.5 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-green-500">
													<svg
														className="h-1.5 w-1.5 text-white"
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
											</div>
											<span className="text-sm text-gray-700">
												Free parking
											</span>
										</div>
									</div>
								</div>
							)}
						</div>

						{/* Price Section */}
						<div className="mb-4 text-right">
							{originalPrice && (
								<div className="text-sm text-gray-500 line-through">
									{typeof originalPrice === 'number' ? formatSelected(originalPrice) : originalPrice}
								</div>
							)}
							<div className="text-2xl font-bold text-blue-600">
								{typeof price === 'number' ? formatSelected(price) : price}
							</div>
							<div className="text-sm text-gray-600">per night</div>
						</div>

						{/* Action Button */}
						{/* <div>
							<TextureButton variant="accent" onClick={onViewDetails}>
								View Details
							</TextureButton>
						</div> */}

						{/* Button */}
						<div className="flex justify-end">
							<div>
								<TextureButton
									variant="accent"
									size="sm"
									className="rounded-md text-sm font-medium"
									onClick={onViewDetails}
								>
									View details
								</TextureButton>
							</div>
						</div>
					</div>

					{/* Mobile Footer: Amenities + Price */}
					<div className="md:hidden border-t border-gray-200 px-4 py-3 flex items-center justify-between">
						<div className="flex gap-3 text-gray-600">
							<svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
								<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM8.5 9.5c0-1.93 1.57-3.5 3.5-3.5s3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5-3.5-1.57-3.5-3.5zm7 7c0 .28-.22.5-.5.5h-7c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h7c.28 0 .5.22.5.5z" />
							</svg>
							<svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
								<path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10z" />
							</svg>
							<svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
								<path d="M13 3H6v18h4v-6h3c3.31 0 6-2.69 6-6s-2.69-6-6-6zm-1 8H8V7h4c1.1 0 2 .9 2 2s-.9 2-2 2z" />
							</svg>
						</div>
						<div className="text-right">
							{originalPrice && (
								<div className="text-xs text-gray-500 line-through">
									{typeof originalPrice === 'number' ? formatSelected(originalPrice) : originalPrice}
								</div>
							)}
							<div className="text-lg font-bold text-blue-600">
								{typeof price === 'number' ? formatSelected(price) : price}
							</div>
							<div className="text-xs text-gray-600">per night</div>
						</div>
					</div>
				</div>

				{/* Children (for modals, etc.) */}
				{children}
			</TextureCardContent>
		</TextureCard>
	);
}
