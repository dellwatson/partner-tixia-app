import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
	beforeLoad: () => {
		// Direct to flights homepage as default
		throw redirect({
			to: '/$locale/flights',
			params: { locale: 'en' },
		});
	},
});
