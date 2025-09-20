// import { useState } from 'react';
// import { ChevronDown, ChevronUp } from 'lucide-react';

// export const FlightFilters = () => {
// 	const [expandedSections, setExpandedSections] = useState({
// 		stops: true,
// 		airlines: true,
// 		price: true,
// 		departure: false,
// 		duration: false,
// 	});

// 	const toggleSection = (section: keyof typeof expandedSections) => {
// 		setExpandedSections((prev) => ({
// 			...prev,
// 			[section]: !prev[section],
// 		}));
// 	};

// 	const FilterSection = ({
// 		title,
// 		section,
// 		children,
// 	}: {
// 		title: string;
// 		section: keyof typeof expandedSections;
// 		children: React.ReactNode;
// 	}) => (
// 		<div className="mb-4 border-b border-gray-200 pb-4">
// 			<button
// 				onClick={() => toggleSection(section)}
// 				className="flex w-full items-center justify-between text-left"
// 			>
// 				<h3 className="font-medium text-gray-900">{title}</h3>
// 				{expandedSections[section] ? (
// 					<ChevronUp className="h-4 w-4 text-gray-500" />
// 				) : (
// 					<ChevronDown className="h-4 w-4 text-gray-500" />
// 				)}
// 			</button>
// 			{expandedSections[section] && <div className="mt-3 space-y-2">{children}</div>}
// 		</div>
// 	);

// 	return (
// 		<div className="rounded-lg border border-gray-200 bg-white p-4">
// 			<h2 className="mb-4 text-lg font-semibold text-gray-900">Filters</h2>

// 			<FilterSection title="Stops" section="stops">
// 				<label className="flex items-center">
// 					<input type="checkbox" className="rounded border-gray-300 text-blue-600" />
// 					<span className="ml-2 text-sm text-gray-700">Direct (3)</span>
// 				</label>
// 				<label className="flex items-center">
// 					<input type="checkbox" className="rounded border-gray-300 text-blue-600" />
// 					<span className="ml-2 text-sm text-gray-700">1 stop (8)</span>
// 				</label>
// 				<label className="flex items-center">
// 					<input type="checkbox" className="rounded border-gray-300 text-blue-600" />
// 					<span className="ml-2 text-sm text-gray-700">2+ stops (2)</span>
// 				</label>
// 			</FilterSection>

// 			<FilterSection title="Airlines" section="airlines">
// 				<label className="flex items-center">
// 					<input type="checkbox" className="rounded border-gray-300 text-blue-600" />
// 					<span className="ml-2 text-sm text-gray-700">Singapore Airlines (4)</span>
// 				</label>
// 				<label className="flex items-center">
// 					<input type="checkbox" className="rounded border-gray-300 text-blue-600" />
// 					<span className="ml-2 text-sm text-gray-700">Jetstar Asia (3)</span>
// 				</label>
// 				<label className="flex items-center">
// 					<input type="checkbox" className="rounded border-gray-300 text-blue-600" />
// 					<span className="ml-2 text-sm text-gray-700">Scoot (2)</span>
// 				</label>
// 				<label className="flex items-center">
// 					<input type="checkbox" className="rounded border-gray-300 text-blue-600" />
// 					<span className="ml-2 text-sm text-gray-700">AirAsia (4)</span>
// 				</label>
// 			</FilterSection>

// 			<FilterSection title="Price Range" section="price">
// 				<div className="space-y-2">
// 					<div className="flex items-center justify-between">
// 						<span className="text-sm text-gray-700">$150</span>
// 						<span className="text-sm text-gray-700">$500</span>
// 					</div>
// 					<input
// 						type="range"
// 						min="150"
// 						max="500"
// 						className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
// 					/>
// 				</div>
// 			</FilterSection>

// 			<FilterSection title="Departure Time" section="departure">
// 				<div className="grid grid-cols-2 gap-2">
// 					<label className="flex items-center">
// 						<input type="checkbox" className="rounded border-gray-300 text-blue-600" />
// 						<span className="ml-2 text-xs text-gray-700">Morning (6AM-12PM)</span>
// 					</label>
// 					<label className="flex items-center">
// 						<input type="checkbox" className="rounded border-gray-300 text-blue-600" />
// 						<span className="ml-2 text-xs text-gray-700">Afternoon (12PM-6PM)</span>
// 					</label>
// 					<label className="flex items-center">
// 						<input type="checkbox" className="rounded border-gray-300 text-blue-600" />
// 						<span className="ml-2 text-xs text-gray-700">Evening (6PM-12AM)</span>
// 					</label>
// 					<label className="flex items-center">
// 						<input type="checkbox" className="rounded border-gray-300 text-blue-600" />
// 						<span className="ml-2 text-xs text-gray-700">Night (12AM-6AM)</span>
// 					</label>
// 				</div>
// 			</FilterSection>

// 			<FilterSection title="Flight Duration" section="duration">
// 				<label className="flex items-center">
// 					<input type="checkbox" className="rounded border-gray-300 text-blue-600" />
// 					<span className="ml-2 text-sm text-gray-700">Under 4 hours (8)</span>
// 				</label>
// 				<label className="flex items-center">
// 					<input type="checkbox" className="rounded border-gray-300 text-blue-600" />
// 					<span className="ml-2 text-sm text-gray-700">4-8 hours (5)</span>
// 				</label>
// 				<label className="flex items-center">
// 					<input type="checkbox" className="rounded border-gray-300 text-blue-600" />
// 					<span className="ml-2 text-sm text-gray-700">8+ hours (0)</span>
// 				</label>
// 			</FilterSection>
// 		</div>
// 	);
// };
