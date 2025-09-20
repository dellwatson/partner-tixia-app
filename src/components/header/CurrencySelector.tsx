import { useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '~/components/ui/dialog';
import { useCurrencyStore, type CurrencyCode } from '~/stores/currency-store';

const currencies = [
	{ code: 'USD' as CurrencyCode, name: 'US Dollar' },
	{ code: 'EUR' as CurrencyCode, name: 'Euro' },
	{ code: 'IDR' as CurrencyCode, name: 'Rupiah' },
	{ code: 'GBP' as CurrencyCode, name: 'British Pound' },
	{ code: 'JPY' as CurrencyCode, name: 'Japanese Yen' },
	{ code: 'CAD' as CurrencyCode, name: 'Canadian Dollar' },
	{ code: 'AUD' as CurrencyCode, name: 'Australian Dollar' },
	{ code: 'CHF' as CurrencyCode, name: 'Swiss Franc' },
	{ code: 'CNY' as CurrencyCode, name: 'Chinese Yuan' },
	{ code: 'SGD' as CurrencyCode, name: 'Singapore Dollar' },
	{ code: 'MYR' as CurrencyCode, name: 'Malaysian Ringgit' },
	{ code: 'THB' as CurrencyCode, name: 'Thai Baht' },
];

interface CurrencySelectorProps {
	children?: React.ReactNode;
	onCurrencyChange?: (currency: CurrencyCode) => void;
}

export const CurrencySelector = ({ children, onCurrencyChange }: CurrencySelectorProps) => {
	const { currency: selectedCurrency, setCurrency } = useCurrencyStore();
	const [isOpen, setIsOpen] = useState(false);

	const handleCurrencyChange = (currencyCode: CurrencyCode) => {
		setCurrency(currencyCode);
		setIsOpen(false); // Close dialog after selection
		onCurrencyChange?.(currencyCode);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				{children || (
					<button className="flex items-center px-2 py-1 rounded-md hover:bg-gray-100 transition-colors">
						<span className="text-sm font-medium text-gray-700">{selectedCurrency}</span>
					</button>
				)}
			</DialogTrigger>
			<DialogContent className="max-w-2xl w-[90vw] max-h-[80vh] overflow-y-auto">
				<DialogHeader className="pb-6">
					<DialogTitle className="text-xl font-semibold">Select your currency</DialogTitle>
					<p className="text-sm text-gray-600 mt-1">
						Display prices in your preferred currency
					</p>
				</DialogHeader>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
					{currencies.map((currency) => (
						<button
							key={currency.code}
							onClick={() => handleCurrencyChange(currency.code)}
							className={`p-4 rounded-lg border text-left transition-all hover:border-primary hover:bg-primary/5 ${
								selectedCurrency === currency.code
									? 'border-primary bg-primary/10 ring-1 ring-primary'
									: 'border-gray-200'
							}`}
						>
							<div className="flex items-center justify-between">
								<div>
									<div className="font-medium text-gray-900">{currency.code}</div>
									<div className="text-sm text-gray-500">{currency.name}</div>
								</div>
								{selectedCurrency === currency.code && (
									<div className="w-2 h-2 bg-primary rounded-full"></div>
								)}
							</div>
						</button>
					))}
				</div>
			</DialogContent>
		</Dialog>
	);
};
