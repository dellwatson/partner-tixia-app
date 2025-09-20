import { createFileRoute } from '@tanstack/react-router';
import { PopularDestinations } from '~/components/flights/PopularDestinations';
import { UpcomingTrips } from '~/components/homepage/UpcomingTrips';
import { useAuthDemo } from '~/hooks/use-auth-demo';

export const Route = createFileRoute('/$locale/flights/')({
	component: FlightsHomepage,
});

function FlightsHomepage() {
	const { locale } = Route.useParams();
	const { isLoggedIn } = useAuthDemo();

	return (
		<div className="min-h-screen">
			{isLoggedIn && <UpcomingTrips locale={locale} />}
			<PopularDestinations />
		</div>
	);
}
