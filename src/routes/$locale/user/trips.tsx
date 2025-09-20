import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { useBookingStore, type Booking, type HotelBooking, type FlightBooking } from '~/stores/booking-store';
import { 
	Plane, 
	Building, 
	Calendar,
	MapPin,
	Clock,
	Download,
	RefreshCw,
	AlertCircle,
	Star,
	Users
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/$locale/user/trips')({
	component: TripsPage,
});

function TripsPage() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { locale } = Route.useParams();
	const { getUserBookings } = useBookingStore();

	// Get real bookings from store
	const userBookings = getUserBookings();

	// Separate upcoming and past bookings
	const now = new Date();
	const upcomingBookings = userBookings.filter(booking => {
		if (booking.type === 'hotel') {
			return new Date(booking.reservation.checkIn) >= now;
		} else {
			return new Date(booking.flight.departure.date) >= now;
		}
	});

	const pastBookings = userBookings.filter(booking => {
		if (booking.type === 'hotel') {
			return new Date(booking.reservation.checkOut) < now;
		} else {
			return new Date(booking.flight.departure.date) < now;
		}
	});

	// Mock data for demonstration (will be replaced by real bookings)
	const mockUpcomingTrips = [
		{
			id: 1,
			type: 'flight',
			title: 'New York → London',
			subtitle: 'British Airways BA178',
			date: 'Dec 15, 2024',
			time: '08:30 AM',
			status: 'confirmed',
			bookingRef: 'BA123456',
			price: 2355633,
			currency: 'IDR'
		},
		{
			id: 2,
			type: 'hotel',
			title: 'Hilton London Paddington',
			subtitle: '3 nights • Deluxe King Room',
			date: 'Dec 15-18, 2024',
			time: 'Check-in 3:00 PM',
			status: 'confirmed',
			bookingRef: 'HLT789012',
			price: 1108711,
			currency: 'IDR'
		}
	]

	const formatPrice = (price: number, currency: string = 'IDR') => {
		return new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency,
			minimumFractionDigits: 0,
		}).format(price);
	};

	const formatDate = (dateStr: string) => {
		return new Date(dateStr).toLocaleDateString('en-US', {
			weekday: 'short',
			month: 'short',
			day: 'numeric',
			year: 'numeric',
		});
	};

	const handleViewBooking = (booking: Booking) => {
		navigate({
			to: '/$locale/_booking/_confirmation/confirmation',
			params: { locale },
			search: {
				bookingId: booking.id,
				bookingRef: booking.bookingRef,
				type: booking.type,
			},
		});
	};

	// Combine real bookings with mock data for demonstration
	const allUpcomingTrips = [...upcomingBookings, ...mockUpcomingTrips];

	const pastTrips = [
		{
			id: 3,
			type: 'flight',
			title: 'Los Angeles → Paris',
			subtitle: 'Air France AF66',
			date: 'Nov 20, 2024',
			time: '11:45 PM',
			status: 'completed',
			bookingRef: 'AF345678',
			price: 2513904,
			currency: 'IDR'
		},
		{
			id: 4,
			type: 'hotel',
			title: 'Le Meurice Paris',
			subtitle: '2 nights • Superior Room',
			date: 'Nov 21-23, 2024',
			time: 'Completed',
			status: 'completed',
			bookingRef: 'LMP456789',
			price: 1108711,
			currency: 'IDR'
		}
	]

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'confirmed': return 'text-green-600 bg-green-50';
			case 'pending': return 'text-yellow-600 bg-yellow-50';
			case 'cancelled': return 'text-red-600 bg-red-50';
			case 'completed': return 'text-gray-600 bg-gray-50';
			default: return 'text-gray-600 bg-gray-50';
		}
	}

	const getIcon = (type: string) => {
		return type === 'flight' ? Plane : Building;
	}

	return (
		<div className="min-h-screen bg-gray-50 py-8">
			<div className="container mx-auto px-4 max-w-6xl">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900 mb-2">{t('my_trips')}</h1>
					<p className="text-gray-600">{t('manage_bookings')}</p>
				</div>

				{/* Upcoming Trips */}
				<div className="mb-12">
					<div className="flex items-center justify-between mb-6">
						<h2 className="text-2xl font-semibold text-gray-900">{t('upcoming_trips')}</h2>
						<Button variant="outline" size="sm">
							<RefreshCw className="h-4 w-4 mr-2" />
							{t('refresh')}
						</Button>
					</div>

					{upcomingBookings.length === 0 ? (
						<Card className="p-8 text-center">
							<AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
							<h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming trips</h3>
							<p className="text-gray-600 mb-4">Start planning your next adventure!</p>
							<Button onClick={() => navigate({ to: `/${locale}`, params: { locale } })}>
								Book a Trip
							</Button>
						</Card>
					) : (
						<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
							{upcomingBookings.map((booking) => (
								<BookingCard key={booking.id} booking={booking} onView={handleViewBooking} />
							))}
						</div>
					)}
				</div>

				{/* Past Trips */}
				<div>
					<h2 className="text-2xl font-semibold text-gray-900 mb-6">{t('past_trips')}</h2>
					{pastBookings.length === 0 ? (
						<Card className="p-8 text-center">
							<Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
							<h3 className="text-lg font-medium text-gray-900 mb-2">No past trips</h3>
							<p className="text-gray-600">Your completed trips will appear here.</p>
						</Card>
					) : (
						<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
							{pastBookings.map((booking) => (
								<BookingCard key={booking.id} booking={booking} onView={handleViewBooking} isPast={true} />
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

// Booking Card Component
function BookingCard({ booking, onView, isPast = false }: { 
	booking: Booking; 
	onView: (booking: Booking) => void; 
	isPast?: boolean; 
}) {
	const formatPrice = (price: number, currency: string = 'IDR') => {
		return new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency,
			minimumFractionDigits: 0,
		}).format(price);
	};

	const formatDate = (dateStr: string) => {
		return new Date(dateStr).toLocaleDateString('en-US', {
			weekday: 'short',
			month: 'short',
			day: 'numeric',
		});
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'confirmed': return 'bg-green-100 text-green-800';
			case 'pending': return 'bg-yellow-100 text-yellow-800';
			case 'cancelled': return 'bg-red-100 text-red-800';
			default: return 'bg-gray-100 text-gray-800';
		}
	};

	return (
		<Card className={`hover:shadow-lg transition-shadow ${isPast ? 'opacity-75' : ''}`}>
			<CardContent className="p-6">
				<div className="flex items-start justify-between mb-4">
					<div className="flex items-center gap-3">
						{booking.type === 'hotel' ? (
							<Building className="h-8 w-8 text-blue-600" />
						) : (
							<Plane className="h-8 w-8 text-blue-600" />
						)}
						<div>
							<h3 className="font-semibold text-gray-900">
								{booking.type === 'hotel' 
									? (booking as HotelBooking).hotel.name
									: `${(booking as FlightBooking).flight.from.code} → ${(booking as FlightBooking).flight.to.code}`
								}
							</h3>
							<p className="text-sm text-gray-600">
								{booking.type === 'hotel' 
									? `${(booking as HotelBooking).reservation.nights} nights • ${(booking as HotelBooking).room.name}`
									: `${(booking as FlightBooking).flight.airline} ${(booking as FlightBooking).flight.flightNumber}`
								}
							</p>
						</div>
					</div>
					<Badge className={getStatusColor(booking.status)}>
						{booking.status}
					</Badge>
				</div>

				<div className="space-y-2 mb-4">
					<div className="flex items-center gap-2 text-sm text-gray-600">
						<Calendar className="h-4 w-4" />
						<span>
							{booking.type === 'hotel' 
								? `${formatDate((booking as HotelBooking).reservation.checkIn)} - ${formatDate((booking as HotelBooking).reservation.checkOut)}`
								: formatDate((booking as FlightBooking).flight.departure.date)
							}
						</span>
					</div>
					<div className="flex items-center gap-2 text-sm text-gray-600">
						<MapPin className="h-4 w-4" />
						<span>
							{booking.type === 'hotel' 
								? `${(booking as HotelBooking).hotel.city}, ${(booking as HotelBooking).hotel.country}`
								: `${(booking as FlightBooking).flight.from.city} to ${(booking as FlightBooking).flight.to.city}`
							}
						</span>
					</div>
				</div>

				<div className="flex items-center justify-between">
					<div>
						<div className="text-lg font-bold text-gray-900">
							{formatPrice(booking.pricing.total, booking.pricing.currency)}
						</div>
						<div className="text-sm text-gray-500">Total paid</div>
					</div>
					<Button variant="outline" size="sm" onClick={() => onView(booking)}>
						View Details
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
