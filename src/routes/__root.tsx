import { createRootRoute } from '@tanstack/react-router';
import { Header } from '~/components/header';
import { HeroWrapper } from '~/components/hero/HeroWrapper';
import { PartnerHero } from '~/components/partner/PartnerHero';

function RootComponent() {
	return (
		<div className="min-h-screen">
			{/* <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50"> */}
			<Header />
			<HeroWrapper />
			<PartnerHero />
			{/* <Outlet /> */}
			{/* <Footer /> */}
			{/* <TanStackRouterDevtools /> */}
		</div>
	);
}

export const Route = createRootRoute({
	component: RootComponent,
});
