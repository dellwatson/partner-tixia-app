// 'use client';

import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { memo, useMemo } from 'react';
import { World } from '~/components/ui/globe';
import { useRouteStore } from '~/stores/routeStore';

interface HeroSectionGlobeProps {
	mode?: 'hotels' | 'flights';
	showMask?: boolean;
}

const sampleArcs = [
	{
		order: 1,
		startLat: -19.885592,
		startLng: -43.951191,
		endLat: -15.595412,
		endLng: -56.05918,
		arcAlt: 0.1,
		color: '#0ea5e9',
	},
	{
		order: 1,
		startLat: 28.6139,
		startLng: 77.209,
		endLat: 3.139,
		endLng: 101.6869,
		arcAlt: 0.2,
		color: '#0ea5e9',
	},
	{
		order: 1,
		startLat: -19.885592,
		startLng: -43.951191,
		endLat: -1.303396,
		endLng: 36.852443,
		arcAlt: 0.5,
		color: '#0ea5e9',
	},
	{
		order: 2,
		startLat: 1.3521,
		startLng: 103.8198,
		endLat: 35.6762,
		endLng: 139.6503,
		arcAlt: 0.2,
		color: '#0ea5e9',
	},
	{
		order: 2,
		startLat: 51.5072,
		startLng: -0.1276,
		endLat: 40.7128,
		endLng: -74.006,
		arcAlt: 0.3,
		color: '#0ea5e9',
	},
	{
		order: 3,
		startLat: -15.785493,
		startLng: -47.909029,
		endLat: 36.162809,
		endLng: -115.119411,
		arcAlt: 0.3,
		color: '#0ea5e9',
	},
];

const globeConfig = {
	pointSize: 6,
	globeColor: 'transparent',
	showAtmosphere: true,
	atmosphereColor: '#FFFFFF',
	atmosphereAltitude: 0.1,
	emissive: '#0ea5e9',
	emissiveIntensity: 0.3,
	shininess: 0.9,
	polygonColor: 'rgba(14,165,233,0.8)',
	ambientLight: '#0ea5e9',
	directionalLeftLight: '#ffffff',
	directionalTopLight: '#ffffff',
	pointLight: '#ffffff',
	arcTime: 1000,
	arcLength: 0.9,
	rings: 1,
	maxRings: 3,
	initialPosition: { lat: 22.3193, lng: 114.1694 },
	autoRotate: true,
	autoRotateSpeed: 0.5,
};

const HeroSectionGlobeComponent = ({ mode = 'flights', showMask = true }: HeroSectionGlobeProps) => {
	const { t } = useTranslation();
	const routes = useRouteStore((state) => state.routes);

	// Convert routes to globe arc format
	const globeArcs = useMemo(() => {
		return routes.map((route, index) => ({
			order: index + 1,
			startLat: route.start.lat,
			startLng: route.start.lng,
			endLat: route.end.lat,
			endLng: route.end.lng,
			arcAlt: 0.1 + (index % 3) * 0.1, // Vary arc heights
			color: '#0ea5e9',
		}));
	}, [routes]);

	return (
		<section className="relative -mt-24 -mb-8 flex h-[25vh] items-center justify-center overflow-hidden bg-white sm:h-[30vh] md:h-[60vh] portrait:h-[20vh] md:portrait:h-[25vh] lg:portrait:h-[30vh]">
			{/* Globe Background */}
			<div className="absolute inset-0 flex items-center justify-center">
				<div className="flex h-full w-full max-w-7xl items-center justify-center">
					<World globeConfig={globeConfig} data={globeArcs} />
				</div>
			</div>

			{/* Mask gradients for seamless fade */}
			{showMask && (
				<>
					{/* <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-1/3 bg-gradient-to-t from-white via-white/70 to-transparent"></div> */}
					<div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-1/6 bg-gradient-to-r from-white via-white/60 to-transparent"></div>
					<div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-1/6 bg-gradient-to-l from-white via-white/60 to-transparent"></div>
				</>
			)}
		</section>
	);
};

// Memoize the component to prevent unnecessary re-renders
export const HeroSectionGlobe = memo(HeroSectionGlobeComponent);
