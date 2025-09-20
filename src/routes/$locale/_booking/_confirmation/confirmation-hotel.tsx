import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { TextureButton } from '~/components/ui/texture-button';
import { Badge } from '~/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Separator } from '~/components/ui/separator';
import { Container } from '~/components/ui/container';
import {
	CheckCircle,
	Download,
	Mail,
	Calendar,
	MapPin,
	Building,
	Clock,
	Users,
	Smartphone,
	Share2,
	Wifi,
	Car,
	Coffee,
	Dumbbell,
} from 'lucide-react';

export const Route = createFileRoute('/$locale/_booking/_confirmation/confirmation-hotel')({
	component: HotelBookingConfirmationPage,
	validateSearch: (search: Record<string, unknown>) => ({
		hotelId: search.hotelId as string,
		bookingRef: search.bookingRef as string,
	}),
});

function HotelBookingConfirmationPage() {
	const { locale } = Route.useParams();
	const { hotelId, bookingRef } = Route.useSearch();
	const navigate = useNavigate();

	const [emailSent, setEmailSent] = useState(false);

	// Check if required parameters are missing
	if (!bookingRef && !hotelId) {
		return (
			<div className="min-h-screen bg-gray-50 py-8">
				<Container>
					<div className="bg-white rounded-xl shadow-sm border border-red-200 p-8 text-center">
						<div className="mb-4 flex items-center justify-center">
							<AlertCircle className="h-16 w-16 text-red-600" />
						</div>
						<h1 className="mb-2 text-2xl font-bold text-gray-900">Booking Not Found</h1>
						<p className="text-gray-600 mb-6">
							We couldn't find the hotel booking details you're looking for. Please check your booking reference and try again.
						</p>
						<div className="space-y-3">
							<TextureButton
								variant="primary"
								onClick={() => navigate({ to: `/${locale}/user/trips`, params: { locale } })}
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

	// Mock booking data - works with any bookingRef
	const booking = {
		reference: bookingRef || 'HTL123456',
		status: 'confirmed',
		guest: {
			name: 'John Doe',
			email: 'john.doe@example.com',
			phone: '+1 234 567 8900',
		},
		hotel: {
			name: 'Hilton London Paddington',
			address: '146 Praed St, London W2 1EE, UK',
			rating: 4.5,
			checkIn: {
				date: '2024-12-15',
				time: '15:00',
			},
			checkOut: {
				date: '2024-12-18',
				time: '11:00',
			},
			nights: 3,
			room: {
				type: 'Deluxe King Room',
				guests: 2,
				beds: '1 King Bed',
				size: '32 sqm',
			},
			amenities: ['Free WiFi', 'Fitness Center', 'Restaurant', 'Parking'],
		},
		pricing: {
			roomRate: 150,
			nights: 3,
			taxes: 67.50,
			fees: 25,
			total: 517.50,
		},
		bookingDate: new Date().toISOString(),
	};

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 2,
		}).format(price);
	};

	const formatDate = (dateStr: string) => {
		return new Date(dateStr).toLocaleDateString('en-US', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	};

	const handleSendEmail = () => {
		setEmailSent(true);
		setTimeout(() => setEmailSent(false), 3000);
	};

	const handleDownloadConfirmation = () => {
		alert('Hotel confirmation download will be available soon');
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
						Your hotel reservation has been successfully booked
					</p>
					<div className="mt-4">
						<Badge variant="secondary" className="px-4 py-2 text-lg">
							Booking Reference: {booking.reference}
						</Badge>
					</div>
				</div>

				<div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
					{/* Main Content */}
					<div className="space-y-6 lg:col-span-2">
						{/* Hotel Details */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Building className="h-5 w-5" />
									Hotel Details
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-6">
								<div>
									<h3 className="text-xl font-semibold">{booking.hotel.name}</h3>
									<p className="text-gray-600 flex items-center gap-1 mt-1">
										<MapPin className="h-4 w-4" />
										{booking.hotel.address}
									</p>
									<div className="flex items-center gap-1 mt-2">
										<span className="text-yellow-500">★</span>
										<span className="font-medium">{booking.hotel.rating}</span>
										<span className="text-gray-500">({Math.floor(booking.hotel.rating * 200)} reviews)</span>
									</div>
								</div>

								<Separator />

								{/* Check-in/Check-out */}
								<div className="grid grid-cols-2 gap-6">
									<div>
										<div className="text-sm text-gray-600">Check-in</div>
										<div className="font-semibold text-lg">
											{formatDate(booking.hotel.checkIn.date)}
										</div>
										<div className="text-gray-600">
											{booking.hotel.checkIn.time}
										</div>
									</div>
									<div>
										<div className="text-sm text-gray-600">Check-out</div>
										<div className="font-semibold text-lg">
											{formatDate(booking.hotel.checkOut.date)}
										</div>
										<div className="text-gray-600">
											{booking.hotel.checkOut.time}
										</div>
									</div>
								</div>

								<Separator />

								{/* Room Details */}
								<div className="space-y-3">
									<h4 className="font-medium">Room Details</h4>
									<div className="grid grid-cols-2 gap-4 text-sm">
										<div>
											<span className="text-gray-600">Room Type:</span>
											<div className="font-medium">{booking.hotel.room.type}</div>
										</div>
										<div>
											<span className="text-gray-600">Guests:</span>
											<div className="font-medium">{booking.hotel.room.guests} Adults</div>
										</div>
										<div>
											<span className="text-gray-600">Bed Configuration:</span>
											<div className="font-medium">{booking.hotel.room.beds}</div>
										</div>
										<div>
											<span className="text-gray-600">Room Size:</span>
											<div className="font-medium">{booking.hotel.room.size}</div>
										</div>
									</div>
								</div>

								{/* Amenities */}
								<div className="space-y-3">
									<h4 className="font-medium">Hotel Amenities</h4>
									<div className="grid grid-cols-2 gap-2">
										{booking.hotel.amenities.map((amenity, index) => (
											<div key={index} className="flex items-center gap-2 text-sm">
												{amenity === 'Free WiFi' && <Wifi className="h-4 w-4 text-blue-600" />}
												{amenity === 'Fitness Center' && <Dumbbell className="h-4 w-4 text-green-600" />}
												{amenity === 'Restaurant' && <Coffee className="h-4 w-4 text-orange-600" />}
												{amenity === 'Parking' && <Car className="h-4 w-4 text-gray-600" />}
												<span>{amenity}</span>
											</div>
										))}
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Guest Details */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Users className="h-5 w-5" />
									Guest Details
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-3">
									<div>
										<span className="text-gray-600">Name:</span>
										<div className="font-medium">{booking.guest.name}</div>
									</div>
									<div>
										<span className="text-gray-600">Email:</span>
										<div className="font-medium">{booking.guest.email}</div>
									</div>
									<div>
										<span className="text-gray-600">Phone:</span>
										<div className="font-medium">{booking.guest.phone}</div>
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
									variant="outline"
									className="w-full"
									onClick={handleDownloadConfirmation}
								>
									<Download className="mr-2 h-4 w-4" />
									Download Confirmation
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
									<span>Room Rate ({booking.pricing.nights} nights)</span>
									<span>{formatPrice(booking.pricing.roomRate * booking.pricing.nights)}</span>
								</div>
								<div className="flex justify-between text-sm">
									<span>Taxes & Fees</span>
									<span>{formatPrice(booking.pricing.taxes + booking.pricing.fees)}</span>
								</div>
								<Separator />
								<div className="flex justify-between font-semibold">
									<span>Total Paid</span>
									<span>{formatPrice(booking.pricing.total)}</span>
								</div>
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
