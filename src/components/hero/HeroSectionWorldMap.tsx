'use client';

import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { useMemo, memo } from 'react';
import { useRouteStore } from '~/stores/routeStore';

interface HeroSectionWorldMapProps {
	mode?: 'hotels' | 'flights';
	showMask?: boolean;
}


// Import WorldMap directly instead of lazy loading to prevent initial load delay
import WorldMap from '~/components/ui/aceternity/world-map';

const HeroSectionWorldMapComponent = ({
	mode = 'flights',
	showMask = true,
}: HeroSectionWorldMapProps) => {
	const { t } = useTranslation();
	const routes = useRouteStore((state) => state.routes);

	return (
		<section className="relative -mt-24 -mb-8 flex h-[25vh] items-center justify-center overflow-hidden bg-white sm:h-[30vh] md:h-[60vh] portrait:h-[20vh] md:portrait:h-[25vh] lg:portrait:h-[30vh]">
			{/* WorldMap Background */}
			<div className="absolute inset-0 flex items-center justify-center">
				<div className="h-full w-full" style={{ objectFit: 'cover' }}>
					<WorldMap dots={routes} lineColor="#0ea5e9" />
				</div>
			</div>

			{/* Mask gradients for seamless fade */}
			{showMask && (
				<>
					<div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-2/5 bg-gradient-to-b from-white via-white to-transparent"></div>
					<div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-1/6 bg-gradient-to-t from-white via-white/50 to-transparent"></div>
					<div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-1/6 bg-gradient-to-r from-white via-white/60 to-transparent"></div>
					<div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-1/6 bg-gradient-to-l from-white via-white/60 to-transparent"></div>
				</>
			)}
		</section>
	);
};

// Memoize the component to prevent unnecessary re-renders
export const HeroSectionWorldMap = memo(HeroSectionWorldMapComponent);
