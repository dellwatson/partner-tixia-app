import { useState } from 'react';
import { useLocation, useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { useLocaleStore } from '~/stores/locale-store';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '~/components/ui/dialog';

// Match the languages available in i18n.ts
const languages = [
	{ code: 'en', name: 'English', flag: '🇺🇸' },
	{ code: 'zh', name: '中文', flag: '🇨🇳' },
	{ code: 'ms', name: 'Bahasa Melayu', flag: '🇲🇾' },
	{ code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
	{ code: 'de', name: 'Deutsch', flag: '🇩🇪' },
	{ code: 'ru', name: 'Русский', flag: '🇷🇺' },
	{ code: 'ja', name: '日本語', flag: '🇯🇵' },
	{ code: 'fil', name: 'Filipino', flag: '🇵🇭' },
	{ code: 'th', name: 'ไทย', flag: '🇹🇭' },
	{ code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
];

// Helper function to get flag by language code
export const getFlagByCode = (code: string): string => {
	const lang = languages.find(l => l.code === code);
	return lang?.flag || '🌐';
};

interface LanguageSelectorProps {
	children: React.ReactNode;
}

export const LanguageSelector = ({ children }: LanguageSelectorProps) => {
	const location = useLocation();
	const navigate = useNavigate();
	const { i18n } = useTranslation();
	const { setLocale } = useLocaleStore();
	const [isOpen, setIsOpen] = useState(false);

	// Extract current locale from pathname
	const currentLocale = location.pathname.split('/')[1] || 'en';
	const currentLanguage = languages.find((lang) => lang.code === currentLocale) || languages[0];

	const handleLanguageChange = (langCode: string) => {
		// Update i18n language
		i18n.changeLanguage(langCode);
		
		// Update Zustand store
		setLocale(langCode);
		
		// Close the dialog
		setIsOpen(false);
		
		// Replace current locale in pathname with new locale
		const pathWithoutLocale = location.pathname.split('/').slice(2).join('/');
		const newPath = `/${langCode}/${pathWithoutLocale}`;
		navigate({ to: newPath });
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				{children}
			</DialogTrigger>
			<DialogContent className="max-w-2xl w-[90vw] max-h-[80vh] overflow-y-auto">
				<DialogHeader className="pb-6">
					<DialogTitle className="text-xl font-semibold">Select your language</DialogTitle>
					<p className="text-sm text-gray-600 mt-1">
						Choose your preferred language for the interface
					</p>
				</DialogHeader>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
					{languages.map((lang) => (
						<button
							key={lang.code}
							onClick={() => handleLanguageChange(lang.code)}
							className={`p-4 rounded-lg border text-left transition-all hover:border-primary hover:bg-primary/5 ${
								currentLanguage.code === lang.code
									? 'border-primary bg-primary/10 ring-1 ring-primary'
									: 'border-gray-200'
							}`}
						>
							<div className="flex items-center space-x-3">
								<div className="w-6 h-6 flex items-center justify-center">
									<span className="text-sm">{lang.flag}</span>
								</div>
								<div>
									<div className="font-medium text-gray-900">{lang.name}</div>
									<div className="text-sm text-gray-500">{lang.code.toUpperCase()}</div>
								</div>
							</div>
						</button>
					))}
				</div>
			</DialogContent>
		</Dialog>
	);
};
