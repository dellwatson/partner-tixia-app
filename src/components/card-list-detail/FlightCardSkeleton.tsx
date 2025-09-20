import { Skeleton } from '~/components/ui/skeleton';
import { TextureCard, TextureCardContent } from '~/components/ui/texture-card';

export function FlightCardSkeleton() {
  return (
    <TextureCard variant="subtle" className="hover:shadow-lg transition-all duration-200">
      <TextureCardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
          {/* Left section - Flight details */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              {/* Airline logo and name */}
              <div className="flex items-center gap-3">
                <Skeleton className="w-8 h-8 rounded" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
              
              {/* Flight badges */}
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-12 rounded-full" />
              </div>
            </div>

            {/* Flight route */}
            <div className="flex items-center gap-4 mb-4">
              {/* Departure */}
              <div className="text-center">
                <Skeleton className="h-6 w-16 mb-1" />
                <Skeleton className="h-4 w-12 mb-1" />
                <Skeleton className="h-3 w-20" />
              </div>

              {/* Flight path */}
              <div className="flex-1 flex items-center gap-2">
                <Skeleton className="h-px flex-1" />
                <Skeleton className="w-6 h-6 rounded-full" />
                <Skeleton className="h-px flex-1" />
              </div>

              {/* Arrival */}
              <div className="text-center">
                <Skeleton className="h-6 w-16 mb-1" />
                <Skeleton className="h-4 w-12 mb-1" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>

            {/* Duration and stops */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>

          {/* Right section - Price and actions */}
          <div className="lg:w-48 flex flex-col items-end gap-4">
            {/* Price */}
            <div className="text-right">
              <Skeleton className="h-6 w-20 mb-1" />
              <Skeleton className="h-4 w-16" />
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-2 w-full lg:w-auto">
              <Skeleton className="h-10 w-full lg:w-32" />
              <Skeleton className="h-8 w-full lg:w-32" />
            </div>
          </div>
        </div>
      </TextureCardContent>
    </TextureCard>
  );
}
