import { Link, useLocation, useNavigate } from '@tanstack/react-router';
import { Menu, X, Globe, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageSelector, getFlagByCode } from './LanguageSelector';
import { CurrencySelector } from './CurrencySelector';
import { Button as MovingBorderButton } from '~/components/ui/aceternity/moving-border';
import { ScrollArea } from '~/components/ui/scroll-area';
import { useAuthDemo } from '~/hooks/use-auth-demo';
import {
	getMobileDrawerSections,
	type SectionConfig,
	type LinkConfig,
} from '~/data/app-links-config';

interface MobileMenuProps {
	isMenuOpen: boolean;
	setIsMenuOpen: (isOpen: boolean) => void;
}

export const MobileMenu = ({ isMenuOpen, setIsMenuOpen }: MobileMenuProps) => {
	const location = useLocation();
	const navigate = useNavigate();
	const { i18n } = useTranslation();
	const { isLoggedIn, user, login, logout } = useAuthDemo();
	const [selectedCurrency, setSelectedCurrency] = useState('USD');

	// Extract current locale from pathname
	const currentLocale = location.pathname.split('/')[1] || 'en';

	// Prevent background scrolling when menu is open
	useEffect(() => {
		if (isMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}

		// Cleanup on unmount
		return () => {
			document.body.style.overflow = 'auto';
		};
	}, [isMenuOpen]);

	// Load saved currency from localStorage on component mount
	useEffect(() => {
		const savedCurrency = localStorage.getItem('selectedCurrency');
		if (savedCurrency) {
			setSelectedCurrency(savedCurrency);
		}
	}, []);

	const handleCurrencyChange = (currency: string) => {
		setSelectedCurrency(currency);
		localStorage.setItem('selectedCurrency', currency);
	};

	const handleDemoLogin = () => {
		login();
		setIsMenuOpen(false);
	};

	const handleNavigation = (to: string) => {
		navigate({ to });
		setIsMenuOpen(false);
	};

	const handleLinkClick = (link: LinkConfig) => {
		if (link.isExternal || link.openInNewTab) {
			window.open(link.href, '_blank');
		} else {
			handleNavigation(`/${currentLocale}${link.href}`);
		}
	};

	// Get all sections for mobile drawer
	const sections = getMobileDrawerSections();

	return (
		<>
			{/* Mobile menu button */}
			<button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 md:hidden">
				{isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
			</button>
			{/* Mobile menu */}
			{isMenuOpen && (
				<div className="absolute top-full right-0 left-0 z-50 h-screen border-t border-gray-200 bg-white/95 shadow-lg backdrop-blur-md md:hidden">
					<ScrollArea className="h-[calc(100vh-80px)] w-full">
						<div className="mx-auto max-w-sm px-4 py-4">
							{/* Auth Section - Always first */}
							<div className="pb-4">
								{isLoggedIn ? (
									<div className="flex flex-col space-y-2">
										<div className="px-3 py-2">
											<p className="text-sm font-medium text-gray-900">
												Welcome back!
											</p>
											<p className="text-xs text-gray-500">{user?.email}</p>
										</div>
										<button
											onClick={() => {
												logout();
												setIsMenuOpen(false);
											}}
											className="rounded-md px-3 py-2 text-left text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
										>
											Sign out
										</button>
									</div>
								) : (
									<div className="flex flex-col space-y-2">
										<button
											onClick={() =>
												handleNavigation(`/${currentLocale}/auth/sign-in`)
											}
											className="rounded-md border border-gray-300 px-3 py-2 text-left text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
										>
											{i18n.t('sign_in')}
										</button>
										<MovingBorderButton
											as="button"
											onClick={handleDemoLogin}
											borderRadius="0.5rem"
											containerClassName="h-auto w-full"
											className="w-full bg-black px-3 py-2 text-sm font-medium text-white hover:bg-gray-900"
											duration={3000}
										>
											{i18n.t('sign_up')}
										</MovingBorderButton>
									</div>
								)}
							</div>

							{/* Language and Currency Settings - Right after auth */}
							<div className="border-t border-gray-200 pt-4 pb-4">
								<div className="flex flex-col space-y-2">
									{/* Language Selector */}
									<div className="flex items-center justify-between px-3 py-2">
										<div className="flex items-center">
											<Globe className="mr-3 h-4 w-4 text-gray-600" />
											<span className="text-sm text-gray-600">
												Language
											</span>
										</div>
										<LanguageSelector>
											<button className="flex items-center rounded-md px-2 py-1 transition-colors hover:bg-gray-100">
												<span className="mr-1 scale-150 text-sm">
													{getFlagByCode(currentLocale)}
												</span>
											</button>
										</LanguageSelector>
									</div>

									{/* Currency Selector */}
									<div className="flex items-center justify-between px-3 py-2">
										<div className="flex items-center">
											<MapPin className="mr-3 h-4 w-4 text-gray-600" />
											<span className="text-sm text-gray-600">
												Currency
											</span>
										</div>
										<CurrencySelector
											onCurrencyChange={handleCurrencyChange}
										>
											<button className="flex items-center rounded-md px-2 py-1 transition-colors hover:bg-gray-100">
												<span className="text-sm font-medium text-gray-700">
													{selectedCurrency}
												</span>
											</button>
										</CurrencySelector>
									</div>
								</div>
							</div>

							{/* Dynamic Sections from Configuration */}
							{sections.map((section) => {
								// Skip auth and settings sections as they're handled above
								if (section.id === 'auth' || section.id === 'settings') return null;

								// Regular sections
								return (
									<div
										key={section.id}
										className="border-t border-gray-200 pt-4 pb-4"
									>
										<h3 className="mb-3 text-xs font-semibold tracking-wide text-gray-500 uppercase">
											{section.title}
										</h3>
										<div className="flex flex-col space-y-2">
											{section.links.map((link) => (
												<button
													key={link.id}
													onClick={() => handleLinkClick(link)}
													className="flex items-center rounded-md px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
												>
													<link.icon className="mr-3 h-4 w-4" />
													<span>{link.name}</span>
												</button>
											))}
										</div>
									</div>
								);
							})}
						</div>
					</ScrollArea>
				</div>
			)}
		</>
	);
};
