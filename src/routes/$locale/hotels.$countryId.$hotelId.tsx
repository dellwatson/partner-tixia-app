import { createFileRoute, redirect } from '@tanstack/react-router';
import { HotelDetailPage } from '~/components/detail-hotel';
import { hotelLoader } from '~/lib/loaders/hotel-loader';

export const Route = createFileRoute('/$locale/hotels/$countryId/$hotelId')({
	component: HotelDetailPage,
	loader: hotelLoader,
	beforeLoad: ({ params }) => {
		const validLocales = ['en', 'zh', 'ms', 'id', 'de', 'ru', 'ja', 'fil', 'th', 'vi'];
		const validCountries = ['indonesia', 'singapore', 'malaysia', 'thailand', 'vietnam', 'philippines'];
		
		if (!params.locale || !validLocales.includes(params.locale)) {
			throw redirect({
				to: '/$locale/hotels/$countryId/$hotelId',
				params: { locale: 'en', countryId: params.countryId, hotelId: params.hotelId }
			});
		}
		
		if (!params.countryId || !validCountries.includes(params.countryId)) {
			throw redirect({
				to: '/$locale/hotels/$countryId/$hotelId',
				params: { locale: params.locale, countryId: 'indonesia', hotelId: params.hotelId }
			});
		}
	}
});
