import { Link } from '@tanstack/react-router';
import { motion } from 'motion/react';
import { Container } from '~/components/ui/container';
import { useAppLinks } from '~/hooks/use-app-links';
import { useState, useEffect } from 'react';

export const Footer = () => {
	const { getFooterSections, getLocalizedHref } = useAppLinks();

	// Get sections from universal config
	const footerSections = getFooterSections();
	const socialSection = footerSections.find(section => section.id === 'social');
	const supportSection = footerSections.find(section => section.id === 'support');
	const downloadSection = footerSections.find(section => section.id === 'download');

	return (
		<footer className="bg-primary text-white">
			<Container>
				<div className="py-16">
					<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
						{/* Column 1: Logo, Currency, Language */}
						<div className="space-y-6">
							<img
								src="/logo_tixia_full_white.svg"
								alt="Tixia full white"
								className="h-16 w-auto"
							/>
							{/* <img src="/astindo_logo.svg" alt="astindo" className="h-12 w-auto" /> */}

							{/* Currency Selector */}
							{/* <div className="space-y-2">
                <label className="text-sm font-medium text-white">Currency</label>
                <CurrencySelector onCurrencyChange={handleCurrencyChange}>
                  <button className="inline-flex items-center px-2 py-1 rounded-md hover:bg-white/10 transition-colors text-sm font-medium text-white">
                    {selectedCurrency}
                  </button>
                </CurrencySelector>
              </div> */}

							{/* Language Selector */}
							{/* <div className="space-y-2">
								<LanguageSelector>
									<button className="inline-flex items-center rounded-md px-2 py-1 text-sm font-medium text-white transition-colors hover:bg-white/10">
										<span className="mr-1 scale-150 text-base">
											{getFlagByCode(currentLocale)}
										</span>
									</button>
								</LanguageSelector>
							</div> */}
						</div>

						{/* Column 2: About */}
						<div className="space-y-4">
							<h4 className="font-semibold text-white">About Tixia</h4>
							<ul className="space-y-3 text-sm">
								<li>
									<Link
										to="/about"
										className="text-white/80 transition-colors hover:text-white"
									>
										About Us
									</Link>
								</li>
								{/* <li>
									<Link
										to="/careers"
										className="text-white/80 transition-colors hover:text-white"
									>
										Careers
									</Link>
								</li> */}
								{/* <li>
									<Link
										to="/press"
										className="text-white/80 transition-colors hover:text-white"
									>
										Press & Media
									</Link>
								</li> */}
								<li>
									<Link
										to="/privacy"
										className="text-white/80 transition-colors hover:text-white"
									>
										Privacy Policy
									</Link>
								</li>
								<li>
									<Link
										to="/terms"
										className="text-white/80 transition-colors hover:text-white"
									>
										Terms of Service
									</Link>
								</li>
								<li>
									<Link
										to="/contact"
										className="text-white/80 transition-colors hover:text-white"
									>
										Contact Us
									</Link>
								</li>
								<li>
									<Link
										to="/contact"
										className="text-white/80 transition-colors hover:text-white"
									>
										Customer Service
									</Link>
								</li>
								<li>
									<Link
										to="/contact"
										className="text-white/80 transition-colors hover:text-white"
									>
										Trust & Safety
									</Link>
								</li>
								{/* <li>
									<Link
										to="/contact"
										className="text-white/80 transition-colors hover:text-white"
									>
										Corporate Contact
									</Link>
								</li> */}
							</ul>
						</div>

						{/* Column 3: Products & Support */}
						<div className="space-y-6">
							<div className="space-y-3">
								<h4 className="font-semibold text-white">Products</h4>
								<ul className="space-y-2 text-sm">
									<li>
										<Link
											to="/flights"
											className="text-white/80 transition-colors hover:text-white"
										>
											Flight Booking
										</Link>
									</li>
									<li>
										<Link
											to="/hotels"
											className="text-white/80 transition-colors hover:text-white"
										>
											Hotel Reservations
										</Link>
									</li>
									{/* <li>
										<Link
											to="/packages"
											className="text-white/80 transition-colors hover:text-white"
										>
											Travel Packages
										</Link>
									</li>
									<li>
										<Link
											to="/destinations"
											className="text-white/80 transition-colors hover:text-white"
										>
											Destinations
										</Link>
									</li> */}
								</ul>
							</div>

							<div className="space-y-3">
								<h4 className="font-semibold text-white">Support</h4>
								<ul className="space-y-2 text-sm">
									{/* {supportLinks.map((support) => (
										<li key={support.name}>
											<motion.a
												href={support.href}
												whileHover={{ scale: 1.02 }}
												whileTap={{ scale: 0.98 }}
												className="group flex items-center space-x-3 text-white/80 transition-colors hover:text-white"
												aria-label={support.label}
											>
												<div className="flex h-6 w-6 items-center justify-center rounded-md text-white/80 transition-colors group-hover:bg-white/10 group-hover:text-white">
													<support.icon className="h-5 w-5" />
												</div>
												<span>{support.name}</span>
											</motion.a>
										</li>
									))} */}
									<li>
										<Link
											to="/help"
											className="text-white/80 transition-colors hover:text-white"
										>
											Help Center
										</Link>
									</li>
									<li>
										<Link
											to="/faq"
											className="text-white/80 transition-colors hover:text-white"
										>
											FAQ
										</Link>
									</li>
								</ul>
							</div>
						</div>

						{/* Column 4: Follow Us & Mobile App */}
						<div className="space-y-6">
							{socialSection && (
								<div className="space-y-3">
									<h4 className="font-semibold text-white">Follow Us</h4>
									<div className="flex space-x-3">
										{socialSection.links.map((social) => (
											<motion.a
												key={social.id}
												href={social.href}
												whileHover={{ scale: 1.1 }}
												whileTap={{ scale: 0.95 }}
												className="flex h-8 w-8 items-center justify-center rounded-md text-white/80 transition-colors hover:bg-white/10 hover:text-white"
												aria-label={social.label}
												target="_blank"
												rel="noopener noreferrer"
											>
												<social.icon className="h-5 w-5" />
											</motion.a>
										))}
									</div>
								</div>
							)}

							{downloadSection && (
								<div className="space-y-3">
									<h4 className="font-semibold text-white">Mobile App</h4>
									<div className="space-y-3">
										{downloadSection.links.map((app) => (
											<motion.a
												key={app.id}
												href={app.href}
												whileHover={{ scale: 1.02 }}
												whileTap={{ scale: 0.98 }}
												className="group flex items-center space-x-3 rounded-lg bg-white/10 p-3 transition-colors hover:bg-white/20"
												aria-label={app.label}
												target="_blank"
												rel="noopener noreferrer"
											>
												<div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-colors group-hover:bg-white/20">
													<app.icon className="h-4 w-4" />
												</div>
												<div className="flex-1">
													<div className="text-sm font-medium text-white">
														{app.name}
													</div>
													<div className="text-xs text-white/60">
														Download now
													</div>
												</div>
											</motion.a>
										))}
									</div>
								</div>
							)}
						</div>
					</div>
				</div>

				{/* Bottom Section */}
				<div className="border-t border-white/20 py-6">
					<div className="text-center">
						<p className="text-sm text-white/60">
							&copy; 2025 Tixia. All rights reserved.
						</p>
					</div>
				</div>
			</Container>
		</footer>
	);
};
