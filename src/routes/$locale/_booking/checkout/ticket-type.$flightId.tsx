import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { TextureButton } from '~/components/ui/texture-button';
import { Badge } from '~/components/ui/badge';
import { Check, X } from 'lucide-react';
import { useSelectionStore } from '~/lib/stores/selection-store';
import type { FlightResult, RoundTripFlightResult } from '~/lib/services/flight-search-service';
import { useFlightCheckoutStore } from '~/stores/flight-checkout-store';
import { PriceSummary } from '~/components/payment/PriceSummary';
import { Container } from '~/components/ui/container';

export const Route = createFileRoute('/$locale/_booking/checkout/ticket-type/$flightId')({
	component: TicketTypeSelection,
});

interface TicketOption {
	type: 'standard' | 'flexible';
	title: string;
	price: number;
	originalPrice?: number;
	features: Array<{
		text: string;
		included: boolean;
	}>;
	popular?: boolean;
}

function TicketTypeSelection() {
	const { locale, flightId } = Route.useParams();
	const navigate = useNavigate();
	const [selectedType, setSelectedType] = useState<'standard' | 'flexible'>('standard');
	const getSelection = useSelectionStore((s) => s.getSelection);
	const [flightData, setFlightData] = useState<FlightResult | RoundTripFlightResult | null>(null);
	const checkout = useFlightCheckoutStore();

	// Decode flight data from URL params (simplified for now)
	useEffect(() => {
		const sel = getSelection(flightId || '');
		if (sel && sel.type === 'flight') {
			setFlightData(sel.item);
			// Ensure draft exists (deep-link safety)
			const baseUSD = 'total_price' in sel.item ? sel.item.total_price : sel.item.price;
			checkout.initDraft(sel.id, baseUSD);
		} else {
			setFlightData(null);
		}
	}, [flightId]);

	// Sync ticket type to checkout draft
	useEffect(() => {
		if (flightId) {
			checkout.setTicketType(flightId, selectedType);
		}
	}, [selectedType, flightId]);

	const basePrice = flightData
		? 'total_price' in flightData
			? flightData.total_price
			: flightData.price
		: 0;

	const ticketOptions: TicketOption[] = [
		{
			type: 'standard',
			title: 'Standard ticket',
			price: basePrice,
			features: [
				{ text: 'Cheapest price', included: true },
				{ text: "No need for flexibility - you're sure of your plans", included: false },
			],
		},
		{
			type: 'flexible',
			title: 'Flexible ticket',
			price: Math.round(basePrice * 1.13),
			popular: true,
			features: [
				{
					text: 'Change your flight time or date once, up to 24 hours before departure time',
					included: true,
				},
				{
					text: 'Travel with the same airline and route as originally booked',
					included: true,
				},
				{ text: 'No change fees – pay only the fare difference, if any', included: true },
			],
		},
	];

	const handleContinue = () => {
		// Navigate to next step (pax details) with selected ticket type
		navigate({
			to: '/$locale/checkout/pax/$flightId',
			params: {
				locale,
				flightId,
			},
		});
	};

	if (!flightData) {
		return <div>Loading...</div>;
	}

	return (
		<div className="min-h-screen bg-gray-50 py-8">
			<Container>
				{/* Flight Summary */}
				<div className="mb-8">
					<div className="mb-2 text-sm text-gray-600">
						{'outbound' in flightData ? 'Round trip' : 'One way'} • {1} traveller
					</div>
					<h1 className="mb-4 text-3xl font-bold">
						{flightData.route.from.city} to {flightData.route.to.city}
					</h1>
				</div>

				<div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
					{/* Left Column - Ticket Selection */}
					<div className="lg:col-span-2">
						<h2 className="mb-6 text-2xl font-semibold">Select your ticket type</h2>

						<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
							{ticketOptions.map((option) => (
								<div
									key={option.type}
									className={`relative cursor-pointer rounded-lg border-2 p-6 transition-all ${
										selectedType === option.type
											? 'border-blue-600 bg-blue-50'
											: 'border-gray-200 hover:border-gray-300'
									}`}
									onClick={() => setSelectedType(option.type)}
								>
									{option.popular && (
										<Badge className="absolute -top-3 left-4 bg-green-600 text-white">
											Popular for trips like yours
										</Badge>
									)}

									<div className="mb-4 flex items-start justify-between">
										<h3 className="text-lg font-semibold">{option.title}</h3>
										<div className="flex h-5 w-5 items-center justify-center rounded-full border-2">
											{selectedType === option.type && (
												<div className="h-3 w-3 rounded-full bg-blue-600"></div>
											)}
										</div>
									</div>

									<div className="mb-4 text-2xl font-bold">
										{option.type === 'standard' ? 'Standard' : 'Flexible'}
									</div>

									<div className="space-y-3">
										{option.features.map((feature, index) => (
											<div key={index} className="flex items-start gap-3">
												{feature.included ? (
													<Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
												) : (
													<X className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
												)}
												<span className="text-sm text-gray-700">
													{feature.text}
												</span>
											</div>
										))}
									</div>

									{/* Continue button is provided in the PriceSummary on the right */}
								</div>
							))}
						</div>

						{/* Flexible Ticket Details */}
						{selectedType === 'flexible' && (
							<div className="mt-8 rounded-lg bg-blue-50 p-6">
								<h4 className="mb-4 font-semibold">How to make a change</h4>
								<div className="space-y-4 text-sm">
									<div className="flex gap-3">
										<div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
											1
										</div>
										<div>
											<div className="font-medium">
												Contact our Customer Service via live chat or phone 24
												hours before departure time of your original flight
											</div>
										</div>
									</div>
									<div className="flex gap-3">
										<div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
											2
										</div>
										<div>
											<div className="font-medium">
												We will share available flights that match your change
												request
											</div>
										</div>
									</div>
									<div className="flex gap-3">
										<div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
											3
										</div>
										<div>
											<div className="font-medium">
												We will assist you with any fare difference payment and
												confirm your new booking
											</div>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>

					{/* Right Column - Price Summary (currency-aware) */}
					<div className="lg:col-span-1">
						{flightId && (
							<PriceSummary
								title="Price details"
								items={(() => {
									const b = checkout.getSelectedBreakdown(flightId);
									return [
										{ label: 'Flight', amount: b.baseSelected },
										{ label: 'Adult (1)', amount: b.baseSelected },
									];
								})()}
								total={checkout.getSelectedBreakdown(flightId).totalSelected}
								buttonText="Continue"
								buttonDisabled={false}
								isProcessing={false}
								onButtonClick={handleContinue}
							/>
						)}
					</div>
				</div>
			</Container>
		</div>
	);
}
