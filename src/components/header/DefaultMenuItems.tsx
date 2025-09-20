import { useLocation, useNavigate } from '@tanstack/react-router';
import { HelpCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '~/components/ui/button';
import { LanguageSelector, getFlagByCode } from './LanguageSelector';
import { CurrencySelector } from './CurrencySelector';

interface DefaultMenuItemsProps {
	onCurrencyChange?: (currency: string) => void;
}

export const DefaultMenuItems = ({ onCurrencyChange }: DefaultMenuItemsProps) => {
	const location = useLocation();
	const navigate = useNavigate();
	const [selectedCurrency, setSelectedCurrency] = useState('USD');

	// Extract current locale from pathname
	const currentLocale = location.pathname.split('/')[1] || 'en';

	// Load saved currency from localStorage on component mount
	useEffect(() => {
		const savedCurrency = localStorage.getItem('selectedCurrency');
		if (savedCurrency) {
			setSelectedCurrency(savedCurrency);
		}
	}, []);

	const handleCurrencyChange = (currency: string) => {
		setSelectedCurrency(currency);
		onCurrencyChange?.(currency);
	};

	return (
		<>
			{/* List Your Property Button */}
			<Button variant="link" size="sm" className="hidden text-sm font-medium md:flex">
				List your property
			</Button>

			{/* Help Button */}
			<Button
				variant="ghost"
				size="icon"
				className="h-8 w-8 rounded-full hover:bg-slate-100"
				onClick={() => navigate({ to: '/$locale/contact', params: { locale: 'en' } })}
			>
				<HelpCircle className="h-4 w-4" />
			</Button>

			{/* Currency Selector */}
			<CurrencySelector onCurrencyChange={handleCurrencyChange}>
				<button className="flex items-center rounded-md px-2 py-1 transition-colors hover:bg-gray-100">
					<span className="text-sm font-medium text-gray-700">{selectedCurrency}</span>
				</button>
			</CurrencySelector>

			{/* Language Selector */}
			<LanguageSelector>
				<button className="flex items-center rounded-md px-2 py-1 transition-colors hover:bg-gray-100">
					<span className="mr-1 scale-150 text-sm">{getFlagByCode(currentLocale)}</span>
				</button>
			</LanguageSelector>
		</>
	);
};
