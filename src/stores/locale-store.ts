import { create } from 'zustand';
import { useParams } from '@tanstack/react-router';

interface LocaleStore {
	locale: string;
	setLocale: (locale: string) => void;
	buildPath: (path: string) => string;
}

export const useLocaleStore = create<LocaleStore>((set, get) => ({
	locale: 'en', // default locale
	setLocale: (locale: string) => set({ locale }),
	buildPath: (path: string) => {
		const { locale } = get();
		return path.startsWith('/') ? `/${locale}${path}` : `/${locale}/${path}`;
	},
}));

// Hook to sync URL params with store
export const useLocaleSync = () => {
	const params = useParams({ from: '/$locale' });
	const { locale, setLocale } = useLocaleStore();
	
	// Only sync if locale has actually changed to prevent infinite loops
	const urlLocale = params.locale || 'en';
	if (locale !== urlLocale) {
		setLocale(urlLocale);
	}
	
	return urlLocale;
};
