import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { TextureButton } from '~/components/ui/texture-button';
import { Badge } from '~/components/ui/badge';
import { Checkbox } from '~/components/ui/checkbox';
import { Label } from '~/components/ui/label';
import { Plus, Minus, Luggage, Utensils, Wifi, Shield, Clock } from 'lucide-react';
import { useSelectionStore } from '~/lib/stores/selection-store';
import { useFlightCheckoutStore } from '~/stores/flight-checkout-store';
import { PriceSummary } from '~/components/payment/PriceSummary';
import { Container } from '~/components/ui/container';
import { formatSelected } from '~/lib/currency';

export const Route = createFileRoute('/$locale/_booking/checkout/extras/$flightId')({
	component: ExtrasPage,
});

interface ExtraItem {
	id: string;
	name: string;
	description: string;
	price: number;
	icon: React.ReactNode;
	category: 'baggage' | 'meal' | 'seat' | 'service';
	quantity?: number;
	maxQuantity?: number;
}

function ExtrasPage() {
	const { locale, flightId } = Route.useParams();
	const navigate = useNavigate();
	const getSelection = useSelectionStore((s) => s.getSelection);
	const sel = getSelection(flightId || '');
	const route = sel && sel.type === 'flight' ? sel.item.route : undefined;
	const basePrice =
		sel && sel.type === 'flight'
			? 'total_price' in sel.item
				? sel.item.total_price
				: sel.item.price
			: 2737828;
	const checkout = useFlightCheckoutStore();

	// Ensure draft exists for deep-linking safety
	useEffect(() => {
		if (sel && sel.type === 'flight') {
			const baseUSD = 'total_price' in sel.item ? sel.item.total_price : sel.item.price;
			checkout.initDraft(sel.id, baseUSD);
		}
	}, [flightId]);

	// Extras prices in IDR - will be converted to selected currency via store breakdown
	const extras: ExtraItem[] = [
		{
			id: 'checked-bag-23kg',
			name: 'Checked bag (23kg)',
			description: 'Standard checked baggage allowance',
			price: 293914,
			icon: <Luggage className="h-5 w-5" />,
			category: 'baggage',
			maxQuantity: 3,
		},
		{
			id: 'checked-bag-32kg',
			name: 'Checked bag (32kg)',
			description: 'Extra weight allowance',
			price: 450000,
			icon: <Luggage className="h-5 w-5" />,
			category: 'baggage',
			maxQuantity: 2,
		},
		{
			id: 'meal-standard',
			name: 'Standard meal',
			description: 'Hot meal with beverage',
			price: 125000,
			icon: <Utensils className="h-5 w-5" />,
			category: 'meal',
			maxQuantity: 1,
		},
		{
			id: 'meal-vegetarian',
			name: 'Vegetarian meal',
			description: 'Vegetarian hot meal with beverage',
			price: 125000,
			icon: <Utensils className="h-5 w-5" />,
			category: 'meal',
			maxQuantity: 1,
		},
		{
			id: 'wifi',
			name: 'In-flight WiFi',
			description: 'Full flight internet access',
			price: 89000,
			icon: <Wifi className="h-5 w-5" />,
			category: 'service',
			maxQuantity: 1,
		},
		{
			id: 'flexible-ticket',
			name: 'Flexible ticket',
			description: 'Date change possible for all travellers',
			price: 350657,
			icon: <Clock className="h-5 w-5" />,
			category: 'service',
			maxQuantity: 1,
		},
		{
			id: 'trip-protection',
			name: 'Trip protection',
			description: 'Cover for the unexpected for all travellers',
			price: 260855,
			icon: <Shield className="h-5 w-5" />,
			category: 'service',
			maxQuantity: 1,
		},
	];

	const [selectedExtras, setSelectedExtras] = useState<Record<string, number>>({});

	// Persist extras total to checkout store (IDR source) when selection changes
	const extrasTotalIDR = Object.entries(selectedExtras).reduce((sum, [id, qty]) => {
		const ex = extras.find((e) => e.id === id);
		return sum + (ex ? (ex.price || 0) * qty : 0);
	}, 0);
	useEffect(() => {
		if (flightId) {
			checkout.setExtrasTotalIDR(flightId, extrasTotalIDR);
		}
	}, [flightId, extrasTotalIDR]);

	const updateQuantity = (extraId: string, change: number) => {
		setSelectedExtras((prev) => {
			const currentQuantity = prev[extraId] || 0;
			const extra = extras.find((e) => e.id === extraId);
			const maxQuantity = extra?.maxQuantity || 1;

			const newQuantity = Math.max(0, Math.min(maxQuantity, currentQuantity + change));

			if (newQuantity === 0) {
				const { [extraId]: removed, ...rest } = prev;
				return rest;
			}

			return { ...prev, [extraId]: newQuantity };
		});
	};

	const getTotalExtrasPrice = () => {
		return Object.entries(selectedExtras).reduce((total, [extraId, quantity]) => {
			const extra = extras.find((e) => e.id === extraId);
			return total + (extra?.price || 0) * quantity;
		}, 0);
	};

	const getBasePrice = () => basePrice; // Base flight price (from selection)

	const handleContinue = () => {
		// Check if seat selection should be skipped based on:
		// 1. Airline configuration (some airlines don't offer seat selection)
		// 2. Flight type (some short domestic flights skip seat selection)
		// 3. Ticket type (basic economy might not include seat selection)
		// 4. User preference (user can choose to skip)

		const airlineConfig = {
			allowSeatSelection: true,
			requireSeatSelection: false,
		};

		const flightConfig = {
			isShortHaul: false, // flights under 2 hours
			isDomestic: true,
		};

		const ticketConfig = {
			isBasicEconomy: false,
			includesSeatSelection: true,
		};

		// Determine if seat selection should be skipped
		const skipSeatSelection =
			!airlineConfig.allowSeatSelection ||
			(flightConfig.isShortHaul &&
				flightConfig.isDomestic &&
				!airlineConfig.requireSeatSelection) ||
			(ticketConfig.isBasicEconomy && !ticketConfig.includesSeatSelection);

		if (skipSeatSelection) {
			navigate({
				to: '/$locale/checkout/payment/$flightId',
				params: {
					locale,
					flightId,
				},
			});
		} else {
			navigate({
				to: '/$locale/checkout/seats/$flightId',
				params: {
					locale,
					flightId,
				},
			});
		}
	};

	const categorizedExtras = {
		baggage: extras.filter((e) => e.category === 'baggage'),
		meal: extras.filter((e) => e.category === 'meal'),
		service: extras.filter((e) => e.category === 'service'),
	};

	return (
		<div className="min-h-screen bg-gray-50 py-8">
			<Container>
				{/* Header */}
				<div className="mb-8">
					<div className="mb-2 text-sm text-gray-600">
						{sel && sel.type === 'flight' && 'outbound' in sel.item
							? 'Round trip'
							: 'One way'}{' '}
						• 1 traveller
					</div>
					<h1 className="mb-4 text-3xl font-bold">
						{route ? `${route.from.city} to ${route.to.city}` : 'Your trip'}
					</h1>
				</div>

				<div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
					{/* Left Column - Extras Selection */}
					<div className="space-y-8 lg:col-span-2">
						<h2 className="text-2xl font-semibold">Extras</h2>

						{/* Baggage */}
						<div className="rounded-lg border bg-white p-6">
							<h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
								<Luggage className="h-5 w-5 text-blue-600" />
								Baggage
							</h3>
							<div className="space-y-4">
								{categorizedExtras.baggage.map((extra) => (
									<div
										key={extra.id}
										className="flex items-center justify-between rounded-lg border p-4"
									>
										<div className="flex items-center gap-4">
											<div className="text-blue-600">{extra.icon}</div>
											<div>
												<h4 className="font-medium">{extra.name}</h4>
												<p className="text-sm text-gray-600">
													{extra.description}
												</p>
												<p className="text-sm font-medium text-blue-600">
													{formatSelected(extra.price)}
												</p>
											</div>
										</div>
										<div className="flex items-center gap-3">
											<button
												onClick={() => updateQuantity(extra.id, -1)}
												disabled={(selectedExtras[extra.id] || 0) <= 0}
												className="flex h-8 w-8 items-center justify-center rounded-full border disabled:opacity-50"
											>
												<Minus className="h-4 w-4" />
											</button>
											<span className="w-8 text-center">
												{selectedExtras[extra.id] || 0}
											</span>
											<button
												onClick={() => updateQuantity(extra.id, 1)}
												disabled={
													(selectedExtras[extra.id] || 0) >=
													(extra.maxQuantity || 1)
												}
												className="flex h-8 w-8 items-center justify-center rounded-full border disabled:opacity-50"
											>
												<Plus className="h-4 w-4" />
											</button>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Meals */}
						<div className="rounded-lg border bg-white p-6">
							<h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
								<Utensils className="h-5 w-5 text-blue-600" />
								Meals
							</h3>
							<div className="space-y-4">
								{categorizedExtras.meal.map((extra) => (
									<div
										key={extra.id}
										className="flex items-center justify-between rounded-lg border p-4"
									>
										<div className="flex items-center gap-4">
											<div className="text-blue-600">{extra.icon}</div>
											<div>
												<h4 className="font-medium">{extra.name}</h4>
												<p className="text-sm text-gray-600">
													{extra.description}
												</p>
												<p className="text-sm font-medium text-blue-600">
													{formatSelected(extra.price)}
												</p>
											</div>
										</div>
										<div className="flex items-center gap-3">
											<Checkbox
												checked={!!selectedExtras[extra.id]}
												onCheckedChange={(checked) =>
													updateQuantity(extra.id, checked ? 1 : -1)
												}
											/>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Services */}
						<div className="rounded-lg border bg-white p-6">
							<h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
								<Shield className="h-5 w-5 text-blue-600" />
								Services
							</h3>
							<div className="space-y-4">
								{categorizedExtras.service.map((extra) => (
									<div
										key={extra.id}
										className="flex items-center justify-between rounded-lg border p-4"
									>
										<div className="flex items-center gap-4">
											<div className="text-blue-600">{extra.icon}</div>
											<div>
												<h4 className="font-medium">{extra.name}</h4>
												<p className="text-sm text-gray-600">
													{extra.description}
												</p>
												<p className="text-sm font-medium text-blue-600">
													{extra.id === 'flexible-ticket' ||
													extra.id === 'trip-protection'
														? `+ ${formatSelected(extra.price)}`
														: formatSelected(extra.price)}
												</p>
											</div>
										</div>
										<div className="flex items-center gap-3">
											<Checkbox
												checked={!!selectedExtras[extra.id]}
												onCheckedChange={(checked) =>
													updateQuantity(extra.id, checked ? 1 : -1)
												}
											/>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Right Column - Price Summary */}
					<div className="lg:col-span-1">
						{flightId && (
							<PriceSummary
								title="Price summary"
								items={(() => {
									const b = checkout.getSelectedBreakdown(flightId);
									return [
										{ label: 'Flight', amount: b.baseSelected },
										{ label: 'Extras', amount: b.extrasSelected },
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

export default ExtrasPage;
