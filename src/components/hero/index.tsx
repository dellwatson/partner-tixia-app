import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useHeroContent } from './HeroContent';

interface HeroSectionProps {
	mode: 'hotels' | 'flights';
}

export const HeroSection = ({ mode }: HeroSectionProps) => {
	const { t, i18n } = useTranslation();
	const heroContent = useHeroContent(mode, i18n.language);

	// Fallback content while loading
	const fallbackContent = {
		title: mode === 'hotels' ? 'More than accommodation,\nComplete Travel Management' : 'Compare and book cheap flights\nwith ease',
		description: mode === 'hotels' 
			? 'Need more than check-in? Tixia gives you full stack travel and accommodation management — so you can launch faster, scale easier, and stay focused on building your journey.'
			: 'Discover your next flight. Compare from hundreds of travel sites at once and find the best deals for your perfect trip.',
		ctaText: 'Start building for free'
	};

	const content = heroContent || fallbackContent;
	const titleParts = content.title.split('\n');

	return (
		<section className="relative py-20 lg:py-20 flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden">
			{/* Background Image */}
			{heroContent?.backgroundImage && (
				<div className="absolute inset-0">
					<div 
						className="absolute inset-0 bg-cover bg-center bg-no-repeat"
						style={{
							backgroundImage: `url(${heroContent.backgroundImage})`,
						}}
					/>
					<div className="absolute inset-0 bg-gradient-to-br from-slate-100/80 via-slate-800/40 to-slate-100/60"></div>
				</div>
			)}
			
			{/* Decorative background elements */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
				<div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary/3 to-accent/5 rounded-full blur-3xl"></div>
			</div>
			
			<div className="relative z-10 text-center px-4 sm:px-6 lg:px-4 w-full max-w-7xl">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="mb-12"
				>
					<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
						{titleParts.length > 1 ? (
							<>
								{titleParts[0]}<br />
								<span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
									{titleParts[1]}
								</span>
							</>
						) : (
							<span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
								{content.title}
							</span>
						)}
					</h1>
					{/* <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
						{content.description}
					</p> */}
					
					{/* CTA Buttons */}
					<div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
						<button className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white transition-all duration-200 bg-gradient-to-r from-primary to-primary/90 rounded-xl shadow-lg hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md">
							<div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl"></div>
							<span className="relative flex items-center">
								{content.ctaText}
							</span>
						</button>
						
						{/* <button className="group inline-flex items-center justify-center px-6 py-4 text-lg font-medium text-gray-700 transition-all duration-200 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-gray-300 hover:-translate-y-0.5 active:translate-y-0">
							<Play className="mr-2 h-5 w-5 text-primary" />
							<span>Watch demo</span>
							<span className="ml-2 text-sm text-gray-500">2 min</span>
						</button> */}
					</div>

					{/* Features */}
					{/* {heroContent?.features && (
						<div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
							{heroContent.features.map((feature, index) => (
								<div key={index} className="flex items-center">
									<div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
									{feature}
								</div>
							))}
						</div>
					)} */}
				</motion.div>
			</div>
		</section>
	);
};
