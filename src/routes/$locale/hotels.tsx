import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router';
import { HotelSearchHeader } from '~/components/header/hotel-search-header';
import { Footer } from '~/components/travel/Footer';
import { HeroSectionWorldMap } from '~/components/hero/HeroSectionWorldMap';
import { HeroSectionGlobe } from '~/components/hero/HeroSectionGlobe';

export const Route = createFileRoute('/$locale/hotels')({
	component: HotelsPageLayout,
});

function HotelsPageLayout() {
	const location = useLocation();

	// Show hero only on hotels homepage
	const isHomepage = location.pathname.endsWith('/hotels');

	return (
		<div className="">
			{/* <div className="bg-gray-50"> */}
			{/* {isHomepage && <HeroSection mode="hotels" />} */}
			<HotelSearchHeader />
			<main>
				<Outlet />
			</main>
		</div>
	);
}
