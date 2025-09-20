import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Header } from '~/components/header';
import { HeroWrapper } from '~/components/hero/HeroWrapper';
import { Footer } from '~/components/footer';
import Calendar2Months from '~/components/ui/calendar-2-months';

function RootComponent() {
	return (
		<div className="min-h-screen">
			{/* <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50"> */}
			<Header />
			<HeroWrapper />
			<Outlet />
			<Footer />
			<TanStackRouterDevtools />
		</div>
	);
}

export const Route = createRootRoute({
	component: RootComponent,
});
