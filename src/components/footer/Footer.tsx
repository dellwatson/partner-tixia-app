import { Link } from '@tanstack/react-router';
import { motion } from 'motion/react';
import { Container } from '~/components/ui/container';
import { useAppLinks } from '~/hooks/use-app-links';

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
						{/* Column 1: Logo only */}
						<div className="space-y-6">
							<img
								src="/logo_tixia_full_white.svg"
								alt="Tixia full white"
								className="h-16 w-auto"
							/>
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
								</ul>
							</div>

							<div className="space-y-3">
								<h4 className="font-semibold text-white">Support</h4>
								<ul className="space-y-2 text-sm">
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
