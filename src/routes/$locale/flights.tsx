import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router';
import { FlightSearchHeader } from '~/components/header/flight-search-header';
import { HeroSection } from '~/components/hero';
import { Footer } from '~/components/travel/Footer';
import { HeroSectionWorldMap } from '~/components/hero/HeroSectionWorldMap';
import { HeroSectionGlobe } from '~/components/hero/HeroSectionGlobe';

export const Route = createFileRoute('/$locale/flights')({
	component: FlightsLayout,
});

function FlightsLayout() {
	const location = useLocation();

	// Show hero only on flights homepage
	const isHomepage = location.pathname.endsWith('/flights');

	return (
		<div className="">
			{/* <div className="bg-gray-50"> */}
			{/* {isHomepage && <HeroSection mode="flights" />} */}
			{/* <HeroSectionGlobe mode="flights" /> */}

			<FlightSearchHeader />
			{/* <span className="pointer-events-none bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl leading-none font-semibold whitespace-pre-wrap text-transparent dark:from-white dark:to-slate-900/10">
				Confetti
			</span> */}
			<main>
				<Outlet />
			</main>
		</div>
	);
}
