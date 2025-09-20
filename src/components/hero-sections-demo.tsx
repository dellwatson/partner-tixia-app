// 'use client';

import { useState } from 'react';
import { HeroSection } from '~/components/travel/HeroSection';
import { HeroSection2 } from '~/components/travel/HeroSection2';
import { HeroSection3 } from '~/components/travel/HeroSection3';

export default function HeroSectionsDemo() {
	const [currentHero, setCurrentHero] = useState(1);
	const [mode, setMode] = useState<'hotels' | 'flights'>('flights');

	const heroSections = [
		{ id: 1, name: 'Original Hero', component: HeroSection },
		{ id: 2, name: 'Globe Hero', component: HeroSection2 },
		{ id: 3, name: 'World Map Hero', component: HeroSection3 },
	];

	const renderCurrentHero = () => {
		switch (currentHero) {
			case 1:
				return <HeroSection mode={mode} />;
			case 2:
				return <HeroSection2 mode={mode} />;
			case 3:
				return <HeroSection3 mode={mode} />;
			default:
				return <HeroSection mode={mode} />;
		}
	};

	return (
		<div className="relative">
			{/* Hero Section Controls */}
			<div className="fixed top-4 left-4 z-50 rounded-lg border border-gray-200 bg-white/90 p-4 shadow-lg backdrop-blur-sm">
				<div className="flex flex-col gap-3">
					<div>
						<label className="mb-2 block text-sm font-medium text-gray-700">
							Hero Style:
						</label>
						<div className="flex gap-2">
							{heroSections.map((hero) => (
								<button
									key={hero.id}
									onClick={() => setCurrentHero(hero.id)}
									className={`rounded-md px-3 py-1 text-xs transition-colors ${
										currentHero === hero.id
											? 'bg-blue-500 text-white'
											: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
									}`}
								>
									{hero.name}
								</button>
							))}
						</div>
					</div>

					<div>
						<label className="mb-2 block text-sm font-medium text-gray-700">
							Mode:
						</label>
						<div className="flex gap-2">
							<button
								onClick={() => setMode('flights')}
								className={`rounded-md px-3 py-1 text-xs transition-colors ${
									mode === 'flights'
										? 'bg-sky-500 text-white'
										: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
								}`}
							>
								Flights
							</button>
							<button
								onClick={() => setMode('hotels')}
								className={`rounded-md px-3 py-1 text-xs transition-colors ${
									mode === 'hotels'
										? 'bg-sky-500 text-white'
										: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
								}`}
							>
								Hotels
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Current Hero Section */}
			{renderCurrentHero()}
		</div>
	);
}
