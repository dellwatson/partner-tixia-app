import React, { useState } from 'react';
import { PlaneTakeoff, PlaneLanding, ArrowLeftRight } from 'lucide-react';
import { Tag } from 'emblor';
import { AirportSelector } from './airport-selector';

interface OriginDestinationProps {
	from: Tag[];
	to: Tag[];
	onChange: (from: Tag[], to: Tag[]) => void;
}

export const OriginDestination = ({ from, to, onChange }: OriginDestinationProps) => {
	const handleSwap = () => {
		onChange(to, from);
	};

	const canSwap = () => {
		return from.length > 0 && to.length > 0;
	};

	const handleFromChange = (newFrom: Tag[]) => {
		console.log('OriginDestination: handleFromChange called with:', newFrom);
		onChange(newFrom, to);
	};

	const handleToChange = (newTo: Tag[]) => {
		console.log('OriginDestination: handleToChange called with:', newTo);
		onChange(from, newTo);
	};

	return (
		<div className="flex flex-col gap-0 border-0 md:flex-row md:items-center md:gap-2">
			{/* From Section */}
			<AirportSelector
				icon={PlaneTakeoff}
				title="Departure airport or city"
				placeholder="Leaving from"
				selectedAirports={from}
				otherAirports={to}
				onChange={handleFromChange}
				routeSuggestions={false}
			/>

			{/* Desktop Swap Button - Hidden on mobile */}
			<button
				onClick={handleSwap}
				disabled={!canSwap()}
				className="border-grey-200 hidden rounded-full border-0 p-3 transition-colors hover:bg-gray-100 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:block"
			>
				<ArrowLeftRight className="h-5 w-5 text-gray-600" />
			</button>

			{/* To Section with Mobile Swap Button */}
			<div className="relative flex-1">
				<div className="flex items-center">
					<div className="flex-1">
						<AirportSelector
							icon={PlaneLanding}
							title="Arrival airport or city"
							placeholder="Going to"
							selectedAirports={to}
							otherAirports={from}
							onChange={handleToChange}
							routeSuggestions={true}
						/>
					</div>

					{/* Mobile Swap Button - positioned at the right edge */}
					<button
						onClick={handleSwap}
						disabled={!canSwap()}
						className="mx-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 md:hidden"
					>
						<ArrowLeftRight className="h-4 w-4 text-gray-600" />
					</button>
				</div>
			</div>
		</div>
	);
};
