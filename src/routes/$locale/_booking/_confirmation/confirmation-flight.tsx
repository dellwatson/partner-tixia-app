import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { TextureButton } from '~/components/ui/texture-button';
import { Badge } from '~/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Separator } from '~/components/ui/separator';
import { Container } from '~/components/ui/container';
import { useBookingStore } from '~/stores/booking-store';
import { formatSelected } from '~/lib/currency';
import { AirlineLogo } from '~/components/card-list-detail/flight-card/AirlineLogo';
import {
	CheckCircle,
	Download,
	Mail,
	Calendar,
	MapPin,
	Plane,
	Clock,
	Users,
	Smartphone,
	Share2,
	XCircle,
} from 'lucide-react';

export const Route = createFileRoute('/$locale/_booking/_confirmation/confirmation-flight')({
	component: BookingConfirmationPage,
	validateSearch: (search: Record<string, unknown>) => ({
		flightId: search.flightId as string,
		bookingRef: search.bookingRef as string,
	}),
});

function BookingConfirmationPage() {
	const { locale } = Route.useParams();
	const { flightId, bookingRef } = Route.useSearch();
	const navigate = useNavigate();
	const { getBooking, getBookingById } = useBookingStore();

	const [emailSent, setEmailSent] = useState(false);
	
	// Try to get real booking data
	const realBooking = bookingRef ? getBooking(bookingRef) : (flightId ? getBookingById(flightId) : null);

	// Check if required parameters are missing
	if (!bookingRef && !flightId) {
		return (
			<div className="min-h-screen bg-gray-50 py-8">
				<Container>
					<div className="rounded-xl border border-red-200 bg-white p-8 text-center shadow-sm">
						<div className="mb-4 flex items-center justify-center">
							<XCircle className="h-16 w-16 text-red-600" />
						</div>
						<h1 className="mb-2 text-2xl font-bold text-gray-900">Booking Not Found</h1>
						<p className="mb-6 text-gray-600">
							We couldn't find the booking details you're looking for. Please check
							your booking reference and try again.
						</p>
						<div className="space-y-3">
							<TextureButton
								variant="primary"
								onClick={() =>
									navigate({ to: `/${locale}/user/trips`, params: { locale } })
								}
							>
								View My Trips
							</TextureButton>
							<TextureButton
								variant="outline"
								onClick={() => navigate({ to: `/${locale}`, params: { locale } })}
							>
								Go to Homepage
							</TextureButton>
						</div>
					</div>
				</Container>
			</div>
		);
	}

	// Use real booking data or fallback to mock
	const booking = realBooking || {
		bookingRef: bookingRef || 'TXA123456',
		status: 'confirmed',
		passenger: {
			firstName: 'John',
			lastName: 'Doe',
			email: 'john.doe@example.com',
			phone: '+1 234 567 8900',
		},
		flight: {
			airline: 'Garuda Indonesia',
			flightNumber: 'GA 152',
			from: {
				code: 'CGK',
				city: 'Jakarta',
				airport: 'Soekarno-Hatta International Airport',
				terminal: 'Terminal 3',
			},
			to: {
				code: 'DPS',
				city: 'Denpasar',
				airport: 'Ngurah Rai International Airport',
				terminal: 'Domestic Terminal',
			},
			departure: {
				date: '2024-03-15',
				time: '08:30',
				gate: 'A12',
			},
			arrival: {
				date: '2024-03-15',
				time: '11:45',
			},
			duration: '3h 15m',
			class: 'Economy',
			seat: '12A',
		},
		pricing: {
			basePrice: 2737828,
			extras: 0,
			seat: 0,
			paymentFee: 0,
			total: 2737828,
		},
		createdAt: new Date().toISOString(),
	};

	const formatPrice = (price: number) => {
		return formatSelected(price);
	};

	const formatDate = (dateStr: string) => {
		return new Date(dateStr).toLocaleDateString('en-US', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	};

	const formatTime = (timeStr: string) => {
		return timeStr;
	};

	const handleSendEmail = () => {
		// Simulate sending email
		setEmailSent(true);
		setTimeout(() => setEmailSent(false), 3000);
	};

	const handleDownloadTicket = () => {
		// In real app, this would generate and download PDF ticket
		alert('Ticket download will be available soon');
	};

	const handleWebCheckin = () => {
		navigate({
			to: '/$locale/web-checkin',
			params: { locale },
			search: { bookingRef },
		});
	};

	const handleOrderDetails = () => {
		navigate({
			to: '/$locale/order-detail',
			params: { locale },
			search: { bookingRef },
		});
	};

	return (
		<div className="min-h-screen bg-gray-50 py-8">
			<Container>
				{/* Header */}
				<div className="mb-8 text-center">
					<div className="mb-4 flex items-center justify-center">
						<CheckCircle className="h-16 w-16 text-green-600" />
					</div>
					<h1 className="mb-2 text-3xl font-bold text-gray-900">Booking Confirmed!</h1>
					<p className="text-lg text-gray-600">
						Your flight has been successfully booked
					</p>
					<div className="mt-4">
						<Badge variant="secondary" className="px-4 py-2 text-lg">
							Booking Reference: {booking.bookingRef}
						</Badge>
					</div>
				</div>

				<div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
					{/* Main Content */}
					<div className="space-y-6 lg:col-span-2">
						{/* Flight Details */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Plane className="h-5 w-5" />
									Flight Details
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-6">
								{/* Flight Route */}
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<div className="flex items-center gap-2">
											<AirlineLogo airlineCode="GA" size="small" />
											<Plane className="h-5 w-5 text-blue-600" />
										</div>
										<div>
											<div className="font-semibold">
												{booking.flight.airline} {booking.flight.flightNumber}
											</div>
											<div className="text-sm text-gray-600">
												{booking.flight.class} • Seat {booking.flight.seat}
											</div>
										</div>
									</div>

									<div className="flex flex-1 items-center justify-center px-4">
										<div className="text-center">
											<Plane className="mx-auto mb-1 h-6 w-6 text-gray-400" />
											<div className="text-sm text-gray-600">
												{booking.flight.duration}
											</div>
											<div className="text-xs text-gray-500">Direct</div>
										</div>
									</div>

									<div className="text-center">
										<div className="text-2xl font-bold">
											{booking.flight.to.code}
										</div>
										<div className="text-sm text-gray-600">
											{booking.flight.to.city}
										</div>
										<div className="mt-2 text-lg font-semibold">
											{formatTime(booking.flight.arrival.time)}
										</div>
										<div className="text-sm text-gray-600">
											{formatDate(booking.flight.arrival.date)}
										</div>
									</div>
								</div>

								<Separator />

								{/* Flight Info */}
								<div className="grid grid-cols-2 gap-4 text-sm">
									<div>
										<span className="text-gray-600">Airline:</span>
										<div className="font-medium">{booking.flight.airline}</div>
									</div>
									<div>
										<span className="text-gray-600">Flight Number:</span>
										<div className="font-medium">
											{booking.flight.flightNumber}
										</div>
									</div>
									<div>
										<span className="text-gray-600">Class:</span>
										<div className="font-medium">{booking.flight.class}</div>
									</div>
									<div>
										<span className="text-gray-600">Seat:</span>
										<div className="font-medium">{booking.flight.seat}</div>
									</div>
									<div>
										<span className="text-gray-600">Departure Terminal:</span>
										<div className="font-medium">
											{booking.flight.from.terminal}
										</div>
									</div>
									<div>
										<span className="text-gray-600">Arrival Terminal:</span>
										<div className="font-medium">
											{booking.flight.to.terminal}
										</div>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Passenger Details */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Users className="h-5 w-5" />
									Passenger Details
								</CardTitle>
							</CardHeader>
							<CardContent>
								<h2 className="text-lg font-semibold">Passenger Information</h2>
								<div className="space-y-2">
									<div className="flex items-center gap-2">
										<Users className="h-4 w-4 text-gray-500" />
										<span className="font-medium">
											{realBooking ? `${booking.passenger.firstName} ${booking.passenger.lastName}` : 'John Doe'}
										</span>
									</div>
									<div>
										<span className="text-gray-600">Email:</span>
										<div className="font-medium">{booking.passenger.email}</div>
									</div>
									<div>
										<span className="text-gray-600">Phone:</span>
										<div className="font-medium">{booking.passenger.phone}</div>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Important Information */}
						<Card>
							<CardHeader>
								<CardTitle>Important Information</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-start gap-3">
									<Clock className="mt-0.5 h-5 w-5 text-blue-600" />
									<div>
										<div className="font-medium">Check-in</div>
										<div className="text-sm text-gray-600">
											Online check-in opens 24 hours before departure. Airport
											check-in closes 45 minutes before departure.
										</div>
									</div>
								</div>
								<div className="flex items-start gap-3">
									<MapPin className="mt-0.5 h-5 w-5 text-green-600" />
									<div>
										<div className="font-medium">Baggage</div>
										<div className="text-sm text-gray-600">
											Cabin baggage: 7kg. Checked baggage allowance varies by
											ticket type.
										</div>
									</div>
								</div>
								<div className="flex items-start gap-3">
									<Smartphone className="mt-0.5 h-5 w-5 text-purple-600" />
									<div>
										<div className="font-medium">Mobile Boarding Pass</div>
										<div className="text-sm text-gray-600">
											Download the airline app for mobile boarding passes and
											real-time updates.
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Sidebar */}
					<div className="space-y-6">
						{/* Quick Actions */}
						<Card>
							<CardHeader>
								<CardTitle>Quick Actions</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3">
								<TextureButton
									variant="primary"
									className="w-full"
									onClick={handleWebCheckin}
								>
									<Smartphone className="mr-2 h-4 w-4" />
									Web Check-in
								</TextureButton>

								<TextureButton
									variant="outline"
									className="w-full"
									onClick={handleDownloadTicket}
								>
									<Download className="mr-2 h-4 w-4" />
									Download Ticket
								</TextureButton>

								<TextureButton
									variant="outline"
									className="w-full"
									onClick={handleSendEmail}
									disabled={emailSent}
								>
									<Mail className="mr-2 h-4 w-4" />
									{emailSent ? 'Email Sent!' : 'Email Confirmation'}
								</TextureButton>

								<TextureButton
									variant="outline"
									className="w-full"
									onClick={handleOrderDetails}
								>
									<Download className="mr-2 h-4 w-4" />
									Order Details
								</TextureButton>

								<TextureButton variant="outline" className="w-full">
									<Share2 className="mr-2 h-4 w-4" />
									Share Booking
								</TextureButton>
							</CardContent>
						</Card>

						{/* Price Breakdown */}
						<Card>
							<CardHeader>
								<CardTitle>Price Breakdown</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3">
								<div className="flex justify-between text-sm">
									<span>Base Price</span>
									<span>{formatPrice(booking.pricing.basePrice)}</span>
								</div>
								<div className="flex justify-between text-sm">
									<span>Extras</span>
									<span>{formatPrice(booking.pricing.extras)}</span>
								</div>
								<div className="flex justify-between text-sm">
									<span>Seat Selection</span>
									<span>{formatPrice(booking.pricing.seat)}</span>
								</div>
								<div className="flex justify-between text-sm">
									<span>Payment Fee</span>
									<span>{formatPrice(booking.pricing.paymentFee)}</span>
								</div>
								<Separator />
								<div className="flex justify-between font-semibold">
									<span>Total Paid</span>
									<span>{formatPrice(booking.pricing.total)}</span>
								</div>
							</CardContent>
						</Card>

						{/* Hotel Recommendation */}
						<Card className="border-blue-200 bg-blue-50">
							<CardHeader>
								<CardTitle className="text-blue-900">Complete Your Trip</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="mb-4 text-sm text-blue-700">
									Need accommodation in {booking.flight.to.city}? Find great hotel
									deals for your stay.
								</p>
								<TextureButton
									variant="outline"
									className="w-full border-blue-300 text-blue-700 hover:bg-blue-100"
									onClick={() =>
										navigate({
											to: `/${locale}/hotels`,
											params: { locale },
											search: { destination: booking.flight.to.city },
										})
									}
								>
									Browse Hotels
								</TextureButton>
							</CardContent>
						</Card>
					</div>
				</div>

				{/* Back to User */}
				<div className="mt-8 text-center">
					<TextureButton
						variant="ghost"
						onClick={() => navigate({ to: `/${locale}/user`, params: { locale } })}
					>
						Back to User
					</TextureButton>
				</div>
			</Container>
		</div>
	);
}
