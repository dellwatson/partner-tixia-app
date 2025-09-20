// 'use client';

import { memo, useMemo, useEffect, useRef } from 'react';
import { useLocation } from '@tanstack/react-router';
import { HeroSectionWorldMap } from './HeroSectionWorldMap';
import { HeroSectionGlobe } from './HeroSectionGlobe';
import { useRouteStore } from '~/stores/routeStore';

const HERO_TYPE = 'worldmap'; // Switch to 'globe' when needed

const HeroWrapperComponent = () => {
	const location = useLocation();
	const generateRandomRoutes = useRouteStore((state) => state.generateRandomRoutes);
	const getRoutesForMode = useRouteStore((state) => state.getRoutesForMode);
	const lastModeRef = useRef<string | null>(null);
	const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const hasInitialized = useRef(false);

	// Memoize route detection to avoid recalculation
	const heroConfig = useMemo(() => {
		const isFlightsHome = location.pathname.endsWith('/flights');
		const isHotelsHome = location.pathname.endsWith('/hotels');
		const showHero = isFlightsHome || isHotelsHome;
		const mode = isFlightsHome ? 'flights' : 'hotels';

		return { showHero, mode };
	}, [location.pathname]);

	// Initialize routes immediately when hero is shown, then handle mode changes
	useEffect(() => {
		if (heroConfig.showHero) {
			// First time showing hero - use pre-generated routes immediately
			if (!hasInitialized.current) {
				getRoutesForMode(heroConfig.mode);
				lastModeRef.current = heroConfig.mode;
				hasInitialized.current = true;
				return;
			}

			// Mode change - only generate new routes if mode actually changed
			if (lastModeRef.current !== heroConfig.mode) {
				// Clear any existing timeout
				if (debounceTimeoutRef.current) {
					clearTimeout(debounceTimeoutRef.current);
				}

				// Debounce route generation to prevent rapid navigation lag
				debounceTimeoutRef.current = setTimeout(() => {
					generateRandomRoutes(heroConfig.mode);
					lastModeRef.current = heroConfig.mode;
				}, 150); // 150ms debounce
			}
		}

		// Cleanup timeout on unmount
		return () => {
			if (debounceTimeoutRef.current) {
				clearTimeout(debounceTimeoutRef.current);
			}
		};
	}, [heroConfig.mode, heroConfig.showHero, generateRandomRoutes, getRoutesForMode]);

	// Always render but hide when not needed to prevent mounting/unmounting
	const heroStyle = heroConfig.showHero ? {} : { display: 'none' };

	// Switch between hero types - always render but hide when not needed
	return (
		<div style={heroStyle}>
			{HERO_TYPE === 'worldmap' && <HeroSectionWorldMap />}
			{/* {HERO_TYPE === 'globe' && <HeroSectionGlobe />} */}
		</div>
	);
};

// Memoize the entire component to prevent unnecessary re-renders
export const HeroWrapper = memo(HeroWrapperComponent);
