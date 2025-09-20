import { ReactNode } from 'react';
import { Badge } from '~/components/ui/badge';
import { TextureCard, TextureCardContent } from '~/components/ui/texture-card';
import { TextureButton } from '~/components/ui/texture-button';
import { AirlineBaggageIcons } from '~/components/airline/AirlineBaggage';
import { formatSelected } from '~/lib/currency';

interface FlightCardLayoutProps {
	badges?: Array<{
		text: string;
		variant: 'green' | 'blue' | 'purple';
	}>;
	flightSegments: ReactNode;
	airlineName: string;
	price: string | number; // Accept both string and number
	onViewDetails: () => void;
	children?: ReactNode; // For modal
}

export function FlightCardLayout({
	badges = [],
	flightSegments,
	airlineName,
	price,
	onViewDetails,
	children,
}: FlightCardLayoutProps) {
	/*
	 * ROLLBACK REFERENCE - Original carry-on bag icon (before step 1):
	 * <path d="M9 6V4C9 2.9 9.9 2 11 2H13C14.1 2 15 2.9 15 4V6H17C18.1 6 19 6.9 19 8V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V8C5 6.9 5.9 6 7 6H9ZM11 4V6H13V4H11ZM7 8V19H17V8H7Z"/>
	 * <path d="M10 10H14V12H10V10Z"/>
	 */

	const getBadgeClasses = (variant: 'green' | 'blue' | 'purple') => {
		switch (variant) {
			case 'green':
				return 'border-green-200 bg-green-100 text-green-800';
			case 'blue':
				return 'border-blue-200 bg-blue-100 text-blue-800';
			case 'purple':
				return 'border-purple-200 bg-purple-100 text-purple-800';
			default:
				return 'border-gray-200 bg-gray-100 text-gray-800';
		}
	};

	return (
		<TextureCard variant="subtle" className="">
			<TextureCardContent className="p-0 px-0 md:px-6">
				{/* Top badges */}
				{/* {badges.length > 0 && (
					<div className="mb-4 flex gap-2">
						{badges.map((badge, index) => (
							<Badge
								key={index}
								variant="secondary"
								className={getBadgeClasses(badge.variant)}
							>
								{badge.text}
							</Badge>
						))}
					</div>
				)} */}

				{/* Main Layout: Left 60% + Right 40% (stacks on mobile) */}
				<div
					className="flex cursor-pointer flex-col md:cursor-auto md:flex-row"
					onClick={() => {
						// Mobile: whole card is tappable
						if (typeof window !== 'undefined' && window.innerWidth < 768) {
							onViewDetails();
						}
					}}
				>
					{/* Left Section (60%) - Flight Details */}
					<div className="flex-1 p-4 md:py-6 md:pr-8">
						{/* Flight Segments */}
						{flightSegments}

						{/* Airline name */}
						<div className="text-sm font-medium text-gray-700">{airlineName}</div>
					</div>

					{/* Vertical Divider (desktop only) */}
					<div className="mx-8 hidden w-px self-stretch bg-gray-300 md:block"></div>

					{/* Right Section (40%) - Services, Price and Button (desktop only) */}
					<div className="hidden min-w-56 flex-col justify-between py-6 md:flex">
						{/* Services - Baggage Icons */}
						<div className="relative mb-2 flex justify-end">
							<AirlineBaggageIcons />
						</div>

						{/* Price */}
						<div className="mb-3 text-right">
							<div className="text-xl font-bold text-blue-600">
								{typeof price === 'number' ? formatSelected(price) : price}
							</div>
						</div>

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

					{/* Mobile Footer: Baggage icons + Price */}
					<div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 md:hidden">
						<AirlineBaggageIcons size="sm" showInfo={false} />
						<div className="text-right">
							<div className="text-lg font-bold text-blue-600">
								{typeof price === 'number' ? formatSelected(price) : price}
							</div>
						</div>
					</div>
				</div>
			</TextureCardContent>

			{/* Modal or other children */}
			{children}
		</TextureCard>
	);
}
