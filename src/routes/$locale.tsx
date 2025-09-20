import { createFileRoute, Outlet } from '@tanstack/react-router';
import { z } from 'zod';

const localeParamsSchema = z.object({
	locale: z.enum(['en', 'zh', 'ms', 'id', 'de', 'ru', 'ja', 'fil', 'th', 'vi']).default('en'),
});

export const Route = createFileRoute('/$locale')({
	params: {
		parse: localeParamsSchema.parse,
		stringify: ({ locale }) => ({ locale }),
	},
	component: LocaleLayout,
	beforeLoad: ({ params }) => {
		// Validate locale and set up i18n context
		const { locale } = params;
		return { locale };
	},
});

function LocaleLayout() {
	return <Outlet />;
}
