import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { TextureButton } from '~/components/ui/texture-button';
import { Badge } from '~/components/ui/badge';
import { Checkbox } from '~/components/ui/checkbox';
import { Label } from '~/components/ui/label';
import { Input } from '~/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '~/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '~/components/ui/dialog';
import {
	CreditCard,
	Shield,
	Clock,
	CheckCircle,
	AlertCircle,
	Plane,
	Calendar,
	MapPin,
	Loader2,
} from 'lucide-react';
import { useSelectionStore } from '~/lib/stores/selection-store';
import { useBookingStore, generateFlightBooking } from '~/stores/booking-store';
import { useFlightCheckoutStore } from '~/stores/flight-checkout-store';
import { PriceSummary } from '~/components/payment/PriceSummary';
import { Container } from '~/components/ui/container';
import { FlightTimeline } from '~/components/flight/FlightTimeline';
import type { Flight } from '~/data/mockFlights';

export const Route = createFileRoute('/$locale/_booking/checkout/payment/$flightId')({
	component: CheckAndPayPage,
});

interface PaymentMethod {
	id: string;
	name: string;
	type: 'card' | 'bank' | 'ewallet' | 'installment';
	icon: React.ReactNode;
	fee?: number;
	description?: string;
}

// Normalize various flight item shapes into the Flight type expected by FlightTimeline
function normalizeFlight(item: any): Flight {
	// Already in mock Flight shape
	if (item && typeof item === 'object' && 'departure' in item && 'arrival' in item) {
		return item as Flight;
	}

	// FlightSearchService FlightResult shape
	const isResult = item && typeof item === 'object' && 'route' in item;
	const result = isResult ? item : undefined;

	// Helper to coerce class name
	const toClass = (cls: any): Flight['class'] => {
		const v = (cls || 'Economy').toString().toLowerCase();
		if (v === 'premium economy') return 'Premium Economy';
		if (v === 'business') return 'Business';
		if (v === 'first') return 'First';
		return 'Economy';
	};

	// Build a best-effort Flight object
	const airlineCode = result?.airline?.code || 'XX';
	const airlineName = result?.airline?.name || result?.airline || 'Unknown Airline';
	const depCity = result?.route?.from?.city || '';
	const depCode = result?.route?.from?.code || '';
	const arrCity = result?.route?.to?.city || '';
	const arrCode = result?.route?.to?.code || '';

	const todayISO = new Date().toISOString().split('T')[0];

	const normalized: Flight = {
		id: parseInt(result?.id || '0', 10) || 0,
		airline: airlineName as string,
		airlineCode: airlineCode,
		departure: {
			time: result?.departure_time || '08:00',
			airport: depCode,
			city: depCity,
			date: todayISO,
		},
		arrival: {
			time: result?.arrival_time || '10:00',
			airport: arrCode,
			city: arrCity,
			date: todayISO,
		},
		duration: result?.duration || '2h 00m',
		price: (result?.price as number) || 0,
		originalPrice: undefined,
		stops: result?.flight_type === 'direct' ? 0 : 1,
		aircraft: result?.aircraft || 'Aircraft',
		flightNumber: result?.flight_number || `${airlineCode}0000`,
		baggage: { carry: true, checked: false },
		flexible: false,
		wifi: false,
		class: toClass(result?.class),
	};

	return normalized;
}

function CheckAndPayPage() {
	const { locale, flightId } = Route.useParams();
	const navigate = useNavigate();
	const getSelection = useSelectionStore((s) => s.getSelection);
	const sel = getSelection(flightId || '');
	const route = sel && sel.type === 'flight' ? sel.item.route : undefined;

	// Prices sync with flight checkout store - currency-aware via breakdown
	const basePriceFromSel =
		sel && sel.type === 'flight'
			? 'total_price' in sel.item
				? sel.item.total_price
				: sel.item.price
			: 2737828;
	const addBooking = useBookingStore((s) => s.addBooking);

	const [selectedPayment, setSelectedPayment] = useState<string>('');
	const [cardDetails, setCardDetails] = useState({
		number: '',
		expiry: '',
		cvv: '',
		name: '',
	});
	const [agreeTerms, setAgreeTerms] = useState(false);
	const [agreeMarketing, setAgreeMarketing] = useState(false);
	const [isProcessing, setIsProcessing] = useState(false);
	const [processingStep, setProcessingStep] = useState(0);
	const [showSuccess, setShowSuccess] = useState(false);

	const paymentMethods: PaymentMethod[] = [
		{
			id: 'visa',
			name: 'Credit/Debit Card',
			type: 'card',
			icon: <CreditCard className="h-5 w-5" />,
			description: 'Visa, Mastercard, American Express',
		},
		{
			id: 'bca',
			name: 'BCA Virtual Account',
			type: 'bank',
			icon: (
				<div className="flex h-5 w-5 items-center justify-center rounded bg-blue-600 text-xs font-bold text-white">
					B
				</div>
			),
			fee: 4000,
			description: 'Transfer via BCA mobile/internet banking',
		},
		{
			id: 'mandiri',
			name: 'Mandiri Virtual Account',
			type: 'bank',
			icon: (
				<div className="flex h-5 w-5 items-center justify-center rounded bg-yellow-500 text-xs font-bold text-white">
					M
				</div>
			),
			fee: 4000,
			description: 'Transfer via Mandiri mobile/internet banking',
		},
		{
			id: 'gopay',
			name: 'GoPay',
			type: 'ewallet',
			icon: (
				<div className="flex h-5 w-5 items-center justify-center rounded bg-green-500 text-xs font-bold text-white">
					G
				</div>
			),
			description: 'Pay with your GoPay balance',
		},
		{
			id: 'ovo',
			name: 'OVO',
			type: 'ewallet',
			icon: (
				<div className="flex h-5 w-5 items-center justify-center rounded bg-purple-600 text-xs font-bold text-white">
					O
				</div>
			),
			description: 'Pay with your OVO balance',
		},
		{
			id: 'kredivo',
			name: 'Kredivo',
			type: 'installment',
			icon: (
				<div className="flex h-5 w-5 items-center justify-center rounded bg-red-500 text-xs font-bold text-white">
					K
				</div>
			),
			description: 'Pay in installments (0% interest for 3 months)',
		},
	];

	const getBasePrice = () => basePriceFromSel;
	const getExtrasPrice = () => 293914;
	const getSeatPrice = () => 125000;
	const getPaymentFee = () => {
		const method = paymentMethods.find((m) => m.id === selectedPayment);
		return method?.fee || 0;
	};

	const getTotalPrice = () =>
		getBasePrice() + getExtrasPrice() + getSeatPrice() + getPaymentFee();

	const handlePayment = async () => {
		if (!isFormValid()) return;

		setIsProcessing(true);
		setProcessingStep(0);

		// Simulate payment processing steps
		await new Promise((resolve) => setTimeout(resolve, 1500));
		setProcessingStep(1);

		await new Promise((resolve) => setTimeout(resolve, 2000));
		setProcessingStep(2);

		await new Promise((resolve) => setTimeout(resolve, 1500));
		setIsProcessing(false);
		setShowSuccess(true);

		// Generate booking with real data from checkout store
		const draft = flightId ? useFlightCheckoutStore.getState().getDraft(flightId) : null;
		const breakdown = flightId
			? useFlightCheckoutStore.getState().getSelectedBreakdown(flightId)
			: null;

		if (draft && breakdown && sel && sel.type === 'flight') {
			const flightBooking = generateFlightBooking(
				flightId || 'demo',
				draft.pax || {},
				sel.item,
				breakdown
			);
			addBooking(flightBooking);

			// Auto-redirect after success
			setTimeout(() => {
				navigate({
					to: '/$locale/confirmation',
					params: { locale },
					search: {
						bookingId: flightBooking.id,
						bookingRef: flightBooking.bookingRef,
						type: 'flight',
					},
				});
			}, 3000);
		} else {
			// Fallback for missing data
			setTimeout(() => {
				const bookingRef = `TXA${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
				navigate({
					to: '/$locale/confirmation',
					params: { locale },
					search: {
						bookingId: flightId || 'demo',
						bookingRef,
						type: 'flight',
					},
				});
			}, 3000);
		}
	};

	const isFormValid = () => {
		if (!selectedPayment || !agreeTerms) return false;

		if (selectedPayment === 'visa') {
			return cardDetails.number && cardDetails.expiry && cardDetails.cvv && cardDetails.name;
		}

		return true;
	};

	return (
		<div className="min-h-screen bg-gray-50 py-8">
			<Container>
				<div className="mb-8">
					<div className="mb-2 text-sm text-gray-600">
						{sel && sel.type === 'flight' && 'outbound' in sel.item
							? 'Round trip'
							: 'One way'}{' '}
						• 1 traveller
					</div>
					<h1 className="mb-4 text-3xl font-bold">
						{(() => {
							const item: any = sel && sel.type === 'flight' ? sel.item : undefined;
							if (!item) return 'Your trip';
							// From FlightResult / RoundTripFlightResult route
							if (item.route) {
								const fromCity =
									typeof item.route.from?.city === 'object'
										? item.route.from.city?.name
										: item.route.from?.city;
								const toCity =
									typeof item.route.to?.city === 'object'
										? item.route.to.city?.name
										: item.route.to?.city;
								const fromLabel = fromCity || item.route.from?.code || 'Origin';
								const toLabel = toCity || item.route.to?.code || 'Destination';
								return `${fromLabel} to ${toLabel}`;
							}
							// From mock Flight
							if (item.departure && item.arrival) {
								return `${item.departure.city || item.departure.airport} to ${item.arrival.city || item.arrival.airport}`;
							}
							return 'Your trip';
						})()}
					</h1>
				</div>

				<div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
					{/* Left Column - Payment & Booking Summary */}
					<div className="space-y-8 lg:col-span-2">
						{/* Booking Summary */}
						<div className="rounded-lg border bg-white p-6">
							<h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
								<CheckCircle className="h-5 w-5 text-green-600" />
								Booking summary
							</h2>

							{/* Flight Details */}
							<div className="mb-6">
								{sel && sel.type === 'flight' && (
									<FlightTimeline flight={normalizeFlight(sel.item)} />
								)}
							</div>

							{/* Passenger Details */}
							<div className="rounded-lg bg-gray-50 p-4">
								<h3 className="mb-2 font-medium">Passenger</h3>
								<div className="text-sm text-gray-600">
									{(() => {
										const draft = flightId
											? useFlightCheckoutStore.getState().getDraft(flightId)
											: null;
										const pax = draft?.pax;
										if (pax) {
											return (
												<>
													<div>
														{pax.title} {pax.firstName} {pax.lastName}
													</div>
													<div>{pax.email}</div>
													<div>Phone: {pax.phone}</div>
												</>
											);
										}
										return <div>Passenger details not available</div>;
									})()}
								</div>
							</div>

							{/* Extras & Seat */}
							<div className="rounded-lg bg-gray-50 p-4">
								<h3 className="mb-2 font-medium">Extras & Add-ons</h3>
								<div className="text-sm text-gray-600">
									{(() => {
										const draft = flightId
											? useFlightCheckoutStore.getState().getDraft(flightId)
											: null;
										const items = [];

										if (draft?.extrasIDR && draft.extrasIDR > 0) {
											items.push(
												`• Extras (IDR ${draft.extrasIDR.toLocaleString()})`
											);
										}

										if (draft?.seatId) {
											items.push(`• Seat selection (${draft.seatId})`);
										}

										if (draft?.ticketType === 'flexible') {
											items.push('• Flexible ticket');
										}

										return items.length > 0 ? (
											items.map((item, i) => <div key={i}>{item}</div>)
										) : (
											<div>No extras selected</div>
										);
									})()}
								</div>
							</div>
						</div>

						{/* Payment Method Selection */}
						<div className="rounded-lg border bg-white p-6">
							<h2 className="mb-4 text-xl font-semibold">Payment method</h2>
							<div className="space-y-3">
								{paymentMethods.map((method) => (
									<div
										key={method.id}
										className={`cursor-pointer rounded-lg border p-4 transition-colors ${
											selectedPayment === method.id
												? 'border-blue-500 bg-blue-50'
												: 'border-gray-200 hover:border-gray-300'
										}`}
										onClick={() => setSelectedPayment(method.id)}
									>
										<div className="flex items-center justify-between">
											<div className="flex items-center space-x-3">
												<div className="flex h-8 w-8 items-center justify-center">
													{method.icon}
												</div>
												<div>
													<p className="font-medium">{method.name}</p>
													{method.description && (
														<p className="text-sm text-gray-600">
															{method.description}
														</p>
													)}
												</div>
											</div>
											<div className="flex items-center space-x-2">
												{method.fee && method.fee > 0 && (
													<Badge variant="secondary">
														+IDR {method.fee.toLocaleString()}
													</Badge>
												)}
												<div
													className={`h-4 w-4 rounded-full border-2 ${
														selectedPayment === method.id
															? 'border-blue-500 bg-blue-500'
															: 'border-gray-300'
													}`}
												>
													{selectedPayment === method.id && (
														<div
															className="h-full w-full rounded-full bg-white"
															style={{ transform: 'scale(0.5)' }}
														/>
													)}
												</div>
											</div>
										</div>
									</div>
								))}
							</div>

							{/* Credit Card Details */}
							{selectedPayment === 'visa' && (
								<div className="mt-6 space-y-4">
									<h3 className="font-medium">Card details</h3>
									<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
										<div className="sm:col-span-2">
											<Label htmlFor="cardNumber">Card number</Label>
											<Input
												id="cardNumber"
												placeholder="1234 5678 9012 3456"
												value={cardDetails.number}
												onChange={(e) =>
													setCardDetails((prev) => ({
														...prev,
														number: e.target.value,
													}))
												}
											/>
										</div>
										<div>
											<Label htmlFor="expiry">Expiry date</Label>
											<Input
												id="expiry"
												placeholder="MM/YY"
												value={cardDetails.expiry}
												onChange={(e) =>
													setCardDetails((prev) => ({
														...prev,
														expiry: e.target.value,
													}))
												}
											/>
										</div>
										<div>
											<Label htmlFor="cvv">CVV</Label>
											<Input
												id="cvv"
												placeholder="123"
												value={cardDetails.cvv}
												onChange={(e) =>
													setCardDetails((prev) => ({
														...prev,
														cvv: e.target.value,
													}))
												}
											/>
										</div>
										<div className="sm:col-span-2">
											<Label htmlFor="cardName">Name on card</Label>
											<Input
												id="cardName"
												placeholder="John Doe"
												value={cardDetails.name}
												onChange={(e) =>
													setCardDetails((prev) => ({
														...prev,
														name: e.target.value,
													}))
												}
											/>
										</div>
									</div>
								</div>
							)}

							{/* Terms and Conditions */}
							<div className="mt-6 space-y-4">
								<div className="flex items-start space-x-2">
									<Checkbox
										id="terms"
										checked={agreeTerms}
										onCheckedChange={setAgreeTerms}
									/>
									<Label htmlFor="terms" className="text-sm">
										I agree to the{' '}
										<a href="#" className="text-blue-600 hover:underline">
											Terms and Conditions
										</a>{' '}
										and{' '}
										<a href="#" className="text-blue-600 hover:underline">
											Privacy Policy
										</a>
									</Label>
								</div>
							</div>
						</div>
					</div>

					{/* Right Column - Price Summary */}
					<div className="lg:col-span-1">
						{flightId && (
							<PriceSummary
								title="Final price"
								items={(() => {
									const b = useFlightCheckoutStore
										.getState()
										.getSelectedBreakdown(flightId);
									const arr = [
										{ label: 'Flight', amount: b.baseSelected },
										{ label: 'Extras', amount: b.extrasSelected },
									];
									if (b.seatSelected > 0)
										arr.push({
											label: 'Seat selection',
											amount: b.seatSelected,
										});
									if (b.paymentFeeSelected > 0)
										arr.push({
											label: 'Payment fee',
											amount: b.paymentFeeSelected,
										});
									return arr;
								})()}
								total={
									useFlightCheckoutStore.getState().getSelectedBreakdown(flightId)
										.totalSelected
								}
								buttonText={isProcessing ? 'Processing...' : 'Complete booking'}
								buttonDisabled={!isFormValid() || isProcessing}
								isProcessing={isProcessing}
								onButtonClick={handlePayment}
							/>
						)}
					</div>
				</div>

				{/* Processing Dialog */}
				<Dialog open={isProcessing} onOpenChange={() => {}}>
					<DialogContent className="sm:max-w-md">
						<DialogHeader>
							<DialogTitle className="text-center">Processing Payment</DialogTitle>
						</DialogHeader>
						<div className="flex flex-col items-center space-y-6 py-6">
							<div className="flex items-center space-x-4">
								{[0, 1, 2].map((step) => (
									<div key={step} className="flex items-center">
										<div
											className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
												processingStep >= step
													? 'bg-blue-600 text-white'
													: 'bg-gray-200 text-gray-600'
											}`}
										>
											{processingStep > step ? (
												<CheckCircle className="h-4 w-4" />
											) : processingStep === step ? (
												<Loader2 className="h-4 w-4 animate-spin" />
											) : (
												step + 1
											)}
										</div>
										{step < 2 && (
											<div
												className={`mx-2 h-0.5 w-12 ${
													processingStep > step
														? 'bg-blue-600'
														: 'bg-gray-200'
												}`}
											/>
										)}
									</div>
								))}
							</div>
							<div className="text-center">
								<p className="text-lg font-medium">
									{processingStep === 0 && 'Validating payment details...'}
									{processingStep === 1 && 'Processing payment...'}
									{processingStep === 2 && 'Confirming booking...'}
								</p>
								<p className="mt-2 text-sm text-gray-600">
									Please don't close this window
								</p>
							</div>
						</div>
					</DialogContent>
				</Dialog>

				{/* Success Dialog */}
				<Dialog open={showSuccess} onOpenChange={() => {}}>
					<DialogContent className="sm:max-w-lg">
						<DialogHeader>
							<DialogTitle className="text-center text-green-600">
								Booking Confirmed!
							</DialogTitle>
						</DialogHeader>
						<div className="flex flex-col items-center space-y-6 py-6">
							<CheckCircle className="h-16 w-16 text-green-600" />
							<div className="text-center">
								<p className="mb-2 text-lg font-medium">
									Your flight has been successfully booked!
								</p>
								<p className="mb-4 text-sm text-gray-600">
									Confirmation details will be sent to your email
								</p>

								{/* Hotel Recommendation for Flight Bookings */}
								<div className="mt-4 rounded-lg bg-blue-50 p-4">
									<h4 className="mb-2 font-medium text-blue-900">
										Need a place to stay?
									</h4>
									<p className="mb-3 text-sm text-blue-700">
										Complete your trip with hotel bookings at your destination
									</p>
									<TextureButton
										variant="outline"
										size="sm"
										onClick={() =>
											navigate({
												to: `/${locale}/hotels`,
												params: { locale },
											})
										}
									>
										Browse Hotels
									</TextureButton>
								</div>
							</div>
						</div>
					</DialogContent>
				</Dialog>
			</Container>
		</div>
	);
}
