import { Card, CardContent } from '~/components/ui/card';

export function HotelCardSkeleton() {
	return (
		<Card className="overflow-hidden">
			<CardContent className="p-0">
				<div className="flex flex-col md:flex-row">
					{/* Image Skeleton */}
					<div className="h-48 w-full animate-pulse bg-gray-200 md:h-64 md:w-80" />
					
					{/* Content Skeleton */}
					<div className="flex flex-1 flex-col justify-between p-4 md:p-6">
						<div className="space-y-3">
							{/* Hotel Name */}
							<div className="h-6 w-3/4 animate-pulse rounded bg-gray-200" />
							
							{/* Location */}
							<div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
							
							{/* Rating */}
							<div className="flex items-center gap-2">
								<div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
								<div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
							</div>
							
							{/* Amenities */}
							<div className="flex gap-2">
								<div className="h-6 w-16 animate-pulse rounded-full bg-gray-200" />
								<div className="h-6 w-20 animate-pulse rounded-full bg-gray-200" />
								<div className="h-6 w-14 animate-pulse rounded-full bg-gray-200" />
							</div>
							
							{/* Description */}
							<div className="space-y-2">
								<div className="h-4 w-full animate-pulse rounded bg-gray-200" />
								<div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />
							</div>
						</div>
						
						{/* Price Section */}
						<div className="mt-4 flex items-end justify-between">
							<div className="space-y-1">
								<div className="h-3 w-20 animate-pulse rounded bg-gray-200" />
								<div className="h-6 w-24 animate-pulse rounded bg-gray-200" />
							</div>
							<div className="h-10 w-24 animate-pulse rounded bg-gray-200" />
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
