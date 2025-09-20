import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import {
	PaymentMethodSelector,
	CardDetailsForm,
	TermsAndConditions,
	PriceSummary,
	ProcessingDialog,
	SuccessDialog,
	defaultPaymentMethods,
	type CardDetails,
	type PriceItem,
} from '~/components/payment';
import { TextureButton } from '~/components/ui/texture-button';
import { Container } from '~/components/ui/container';
import { useBookingStore, generateHotelBooking } from '~/stores/booking-store';
import { useHotelCheckoutStore } from '~/stores/hotel-checkout-store';
import { useSelectionStore } from '~/lib/stores/selection-store';
import { formatSelected } from '~/lib/currency';
import { HotelReservationSummary } from '~/components/hotel-reservation/HotelReservationSummary';
import { CheckCircle, Calendar, MapPin, Users, Bed, Clock, Star } from 'lucide-react';

export const Route = createFileRoute('/$locale/_booking/reserve/payment/$bookingId')({
	component: HotelPaymentPage,
	validateSearch: (search: Record<string, unknown>) => ({
		guestInfo: search.guestInfo as string,
		reservationDetails: search.reservationDetails as string,
	}),
});

function HotelPaymentPage() {
	const { locale, bookingId } = Route.useParams();
	const { guestInfo, reservationDetails } = Route.useSearch();
	const navigate = useNavigate();
	const { addBooking } = useBookingStore();
	const { getDraft, getPriceBreakdown } = useHotelCheckoutStore();
	const getSelection = useSelectionStore((s) => s.getSelection);

	const [selectedPayment, setSelectedPayment] = useState<string>('');
	const [cardDetails, setCardDetails] = useState<CardDetails>({
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

	// ✅ FIXED: Now using real data from hotel checkout store and selection store instead of hardcoded values
	// Get hotel selection and checkout data
	const hotelSel = getSelection(bookingId || '');
	const draft = getDraft(bookingId || '');
	const breakdown = getPriceBreakdown(bookingId || '');

	// Parse guest info and reservation details from search params
	const parsedGuestInfo = guestInfo ? JSON.parse(guestInfo) : {};
	const parsedReservationDetails = reservationDetails ? JSON.parse(reservationDetails) : {};

	// Ensure we have valid breakdown data
	const safeBreakdown = breakdown || {
		baseRoomRate: 0,
		taxes: 0,
		fees: 0,
		paymentFee: 0,
		total: 0,
		currency: 'IDR'
	};

	// Hotel and pricing data from stores
	const hotelName = hotelSel && hotelSel.type === 'hotel' ? hotelSel.listItem.name : 'Grand Hotel Jakarta';
	const hotelAddress = hotelSel && hotelSel.type === 'hotel' ? hotelSel.listItem.location : 'Jl. MH Thamrin No. 1, Jakarta Pusat';
	const roomType = draft?.roomType || 'Deluxe Room';
	const totalPrice = safeBreakdown.total;
	const nights = parsedReservationDetails.checkIn && parsedReservationDetails.checkOut
		? Math.max(1, Math.ceil((new Date(parsedReservationDetails.checkOut).getTime() - new Date(parsedReservationDetails.checkIn).getTime()) / (1000 * 60 * 60 * 24)))
		: 1;
	const guests = parsedReservationDetails.guests || 1;

	const getPaymentFee = () => {
		const method = defaultPaymentMethods.find((m) => m.id === selectedPayment);
		return method?.fee || 0;
	};

	const getFinalPrice = () => totalPrice + getPaymentFee();

	const priceItems: PriceItem[] = [
		{ label: 'Room rate', amount: totalPrice },
		...(getPaymentFee() > 0 ? [{ label: 'Payment fee', amount: getPaymentFee() }] : []),
	];

	const processingSteps = [
		'Validating payment details...',
		'Processing payment...',
		'Confirming reservation...',
	];

	const handlePayment = async () => {
		if (!selectedPayment || !agreeTerms) return;

		setIsProcessing(true);
		setProcessingStep(0);

		// Simulate payment processing steps
		for (let i = 0; i < processingSteps.length; i++) {
			setProcessingStep(i);
			await new Promise((resolve) => setTimeout(resolve, 2000));
		}

		// Parse guest info and reservation details from search params
		const parsedGuestInfo = guestInfo ? JSON.parse(guestInfo) : {};
		const parsedReservationDetails = reservationDetails ? JSON.parse(reservationDetails) : {};

		// Generate and save booking to store
		const booking = generateHotelBooking(bookingId, parsedGuestInfo, parsedReservationDetails);
		addBooking(booking);

		setIsProcessing(false);
		setShowSuccess(true);

		// After showing success, navigate to booking confirmation
		setTimeout(() => {
			navigate({
				to: '/$locale/confirmation',
				params: { locale },
				search: {
					bookingId,
					bookingRef: booking.bookingRef,
					type: 'hotel',
				},
			});
		}, 3000);
	};

	const isFormValid = () => {
		if (!selectedPayment || !agreeTerms) return false;

		if (selectedPayment === 'visa') {
			return cardDetails.number && cardDetails.expiry && cardDetails.cvv && cardDetails.name;
		}

		return true;
	};

	return (
		<Container size="xl" className="py-8">
			{/* Progress Steps */}
			<div className="mb-8">
				<div className="mb-6 flex items-center justify-center">
					<div className="flex items-center space-x-4">
						<div className="flex items-center">
							<div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-medium text-white">
								<CheckCircle className="h-4 w-4" />
							</div>
							<span className="ml-2 text-sm font-medium text-blue-600">
								Your Selection
							</span>
						</div>
						<div className="h-0.5 w-12 bg-blue-600"></div>
						<div className="flex items-center">
							<div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-medium text-white">
								<CheckCircle className="h-4 w-4" />
							</div>
							<span className="ml-2 text-sm font-medium text-blue-600">
								Your Details
							</span>
						</div>
						<div className="h-0.5 w-12 bg-blue-600"></div>
						<div className="flex items-center">
							<div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-medium text-white">
								3
							</div>
							<span className="ml-2 text-sm font-medium text-blue-600">
								Finish booking
							</span>
						</div>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
				{/* Left Column - Hotel Info & Booking Summary */}
				<div className="lg:col-span-1">
					<HotelReservationSummary
						hotel={{
							name: hotelName,
							rating: hotelSel && hotelSel.type === 'hotel' ? hotelSel.listItem.rating : 4.8,
							location: hotelAddress,
							image: hotelSel && hotelSel.type === 'hotel' ? hotelSel.listItem.image : '/api/placeholder/120/80'
						}}
						reservation={{
							checkIn: parsedReservationDetails.checkIn || '',
							checkOut: parsedReservationDetails.checkOut || '',
							guests: guests,
							rooms: parsedReservationDetails.rooms || 1,
							nights: nights
						}}
						pricing={{
							baseRoomRate: safeBreakdown.baseRoomRate,
							taxes: safeBreakdown.taxes,
							fees: safeBreakdown.fees,
							total: safeBreakdown.total
						}}
						roomType={roomType}
						variant="payment"
					/>
				</div>

				{/* Right Column - Payment Form */}
				<div className="space-y-6 lg:col-span-2">
					{/* Booking Summary */}
					<div className="rounded-lg border bg-white p-6">
						<h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
							<CheckCircle className="h-5 w-5 text-green-600" />
							Booking summary
						</h2>

						<div className="space-y-4">
							{/* Hotel Details */}
							<div className="flex items-start gap-4 rounded-lg bg-gray-50 p-4">
								<Bed className="mt-1 h-5 w-5 text-blue-600" />
								<div className="flex-1">
									<div className="font-medium">{hotelName}</div>
									<div className="mt-1 text-sm text-gray-600">
										<div className="flex flex-wrap items-center gap-4">
											<span className="flex items-center gap-1">
												<Calendar className="h-4 w-4" />
												{parsedReservationDetails.checkIn || '-'} to {parsedReservationDetails.checkOut || '-'}
											</span>
											<span className="flex items-center gap-1">
												<Users className="h-4 w-4" />
												{guests} {guests === 1 ? 'guest' : 'guests'}, {parsedReservationDetails.rooms || 1} {(parsedReservationDetails.rooms || 1) === 1 ? 'room' : 'rooms'}
											</span>
											<span className="flex items-center gap-1">
												<Clock className="h-4 w-4" />
												{nights} nights
											</span>
										</div>
									</div>
									<div className="mt-2 text-sm text-gray-600">
										<div className="font-medium">{roomType}</div>
									</div>
								</div>
							</div>

							{/* Guest Details */}
							<div className="rounded-lg bg-gray-50 p-4">
								<h3 className="mb-2 font-medium">Primary Guest</h3>
								<div className="text-sm text-gray-600">
									<div>{`${parsedGuestInfo.firstName || '-'} ${parsedGuestInfo.lastName || ''}`.trim()}</div>
									<div>{parsedGuestInfo.email || '-'}</div>
									<div>{parsedGuestInfo.phone || '-'}</div>
								</div>
							</div>
						</div>
					</div>

					{/* Payment Methods */}
					<PaymentMethodSelector
						paymentMethods={defaultPaymentMethods}
						selectedPayment={selectedPayment}
						onPaymentChange={setSelectedPayment}
					>
						<CardDetailsForm
							cardDetails={cardDetails}
							onCardDetailsChange={setCardDetails}
							show={selectedPayment === 'visa'}
						/>
					</PaymentMethodSelector>

					{/* Terms and Conditions */}
					<TermsAndConditions
						agreeTerms={agreeTerms}
						agreeMarketing={agreeMarketing}
						onAgreeTermsChange={setAgreeTerms}
						onAgreeMarketingChange={setAgreeMarketing}
					/>

					{/* Complete Booking Button */}
					<div className="rounded-lg border bg-white p-6">
						<div className="mb-4 flex items-center justify-between">
							<div>
								<div className="text-2xl font-bold">
									{formatSelected(getFinalPrice())}
								</div>
								<div className="text-sm text-gray-600">
									Includes taxes and charges
								</div>
							</div>
							<div className="flex items-center gap-2 text-blue-600">
								<span className="text-sm">💰 We Price Match</span>
							</div>
						</div>

						<div>
							<TextureButton
								variant="accent"
								size="lg"
								className="mb-4"
								onClick={handlePayment}
								disabled={!isFormValid() || isProcessing}
							>
								{isProcessing ? (
									<div className="flex items-center gap-2">
										<div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
										Processing...
									</div>
								) : (
									'Complete booking'
								)}
							</TextureButton>
						</div>

						<div className="space-y-2 text-xs text-gray-600">
							<div className="flex items-center gap-2">
								<CheckCircle className="h-4 w-4 text-green-600" />
								<span>Secure payment protected by SSL</span>
							</div>
							<div className="flex items-center gap-2">
								<Clock className="h-4 w-4 text-blue-600" />
								<span>Free cancellation within 24 hours</span>
							</div>
							<div className="flex items-center gap-2">
								<CheckCircle className="h-4 w-4 text-green-600" />
								<span>Instant confirmation</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Processing Dialog */}
			<ProcessingDialog
				isOpen={isProcessing}
				currentStep={processingStep}
				steps={processingSteps}
			/>

			{/* Success Dialog */}
			<SuccessDialog
				isOpen={showSuccess}
				title="Booking Confirmed!"
				message="Your hotel reservation has been successfully booked!"
				submessage="Confirmation details will be sent to your email"
			>
				{/* Flight Recommendation for Hotel Bookings */}
				<div className="mt-4 rounded-lg bg-blue-50 p-4">
					<h4 className="mb-2 font-medium text-blue-900">Need flights to get there?</h4>
					<p className="mb-3 text-sm text-blue-700">
						Complete your trip with flight bookings to your destination
					</p>
					<TextureButton
						variant="outline"
						size="sm"
						onClick={() => navigate({ to: `/${locale}/flights`, params: { locale } })}
					>
						Browse Flights
					</TextureButton>
				</div>
			</SuccessDialog>
		</Container>
	);
}
