// Server-side locale detection utilities
export const SUPPORTED_LOCALES = ['en', 'es', 'fr', 'de', 'it', 'pt', 'ja', 'ko'] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

// Country to locale mapping
const COUNTRY_TO_LOCALE: Record<string, SupportedLocale> = {
	US: 'en',
	GB: 'en',
	CA: 'en',
	AU: 'en',
	NZ: 'en',
	ES: 'es',
	MX: 'es',
	AR: 'es',
	CO: 'es',
	PE: 'es',
	FR: 'fr',
	BE: 'fr',
	CH: 'fr',
	MC: 'fr',
	DE: 'de',
	AT: 'de',
	LU: 'de',
	IT: 'it',
	SM: 'it',
	VA: 'it',
	PT: 'pt',
	BR: 'pt',
	JP: 'ja',
	KR: 'ko',
};

export function detectLocaleFromCountry(countryCode?: string): SupportedLocale {
	if (!countryCode) return 'en';
	return COUNTRY_TO_LOCALE[countryCode.toUpperCase()] || 'en';
}

export function detectLocaleFromAcceptLanguage(acceptLanguage?: string): SupportedLocale {
	if (!acceptLanguage) return 'en';

	// Parse Accept-Language header (e.g., "en-US,en;q=0.9,es;q=0.8")
	const languages = acceptLanguage
		.split(',')
		.map((lang) => {
			const [code, qValue] = lang.trim().split(';');
			const quality = qValue ? parseFloat(qValue.split('=')[1]) : 1;
			return { code: code.split('-')[0].toLowerCase(), quality };
		})
		.sort((a, b) => b.quality - a.quality);

	for (const { code } of languages) {
		if (SUPPORTED_LOCALES.includes(code as SupportedLocale)) {
			return code as SupportedLocale;
		}
	}

	return 'en';
}

export function getCountryFromCloudflare(request: Request): string | undefined {
	// Cloudflare adds CF-IPCountry header
	return request.headers.get('CF-IPCountry') || undefined;
}

export function getCountryFromVercel(request: Request): string | undefined {
	// Vercel adds x-vercel-ip-country header
	return request.headers.get('x-vercel-ip-country') || undefined;
}

export function detectServerLocale(request: Request): SupportedLocale {
	// Try to get country from various sources
	const countryCode = getCountryFromCloudflare(request) || getCountryFromVercel(request);

	const acceptLanguage = request.headers.get('Accept-Language');

	// Priority: Country-based detection, then Accept-Language, then default
	if (countryCode) {
		const localeFromCountry = detectLocaleFromCountry(countryCode);
		if (localeFromCountry !== 'en') return localeFromCountry;
	}

	return detectLocaleFromAcceptLanguage(acceptLanguage);
}
