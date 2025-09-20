import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { TextureButton } from '~/components/ui/texture-button';
import { Badge } from '~/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Separator } from '~/components/ui/separator';
import { Container } from '~/components/ui/container';
import { useBookingStore, type HotelBooking, type FlightBooking } from '~/stores/booking-store';
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
  Building,
  Bed,
  Phone,
  Copy,
  ExternalLink,
  Star,
  XCircle,
} from 'lucide-react';

export const Route = createFileRoute('/$locale/_booking/_confirmation/confirmation')({
  component: BookingConfirmationPage,
  validateSearch: (search: Record<string, unknown>) => ({
    bookingId: search.bookingId as string,
    bookingRef: search.bookingRef as string,
    type: search.type as 'hotel' | 'flight',
  }),
});

function BookingConfirmationPage() {
  const { locale } = Route.useParams();
  const { bookingId, bookingRef, type } = Route.useSearch();
  const navigate = useNavigate();
  const { getBooking, getBookingById } = useBookingStore();

  const [emailSent, setEmailSent] = useState(false);
  const [booking, setBooking] = useState<HotelBooking | FlightBooking | null>(null);

  useEffect(() => {
    // Try to find booking by reference first, then by ID
    let foundBooking = bookingRef ? getBooking(bookingRef) : null;
    if (!foundBooking && bookingId) {
      foundBooking = getBookingById(bookingId);
    }
    
    // If no booking found but we have parameters, create a mock booking for demonstration
    if (!foundBooking && (bookingRef || bookingId)) {
      const mockBooking = generateMockBooking(bookingId, bookingRef, type);
      setBooking(mockBooking);
    } else {
      setBooking(foundBooking || null);
    }
  }, [bookingId, bookingRef, type, getBooking, getBookingById]);

  // Generate mock booking for demonstration when no real booking exists
  const generateMockBooking = (id?: string, ref?: string, bookingType?: 'hotel' | 'flight') => {
    const mockRef = ref || `DEMO${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const mockId = id || `demo-${Date.now()}`;
    
    if (bookingType === 'hotel') {
      return {
        id: mockId,
        bookingRef: mockRef,
        type: 'hotel' as const,
        status: 'confirmed' as const,
        createdAt: new Date().toISOString(),
        guest: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          phone: '+62 812 3456 7890',
          dateOfBirth: '1990-01-01',
          nationality: 'Indonesian',
        },
        hotel: {
          id: 'demo-hotel',
          name: 'Grand Hotel Jakarta',
          address: 'Jl. MH Thamrin No. 1, Jakarta Pusat',
          city: 'Jakarta',
          country: 'Indonesia',
          rating: 4.8,
          image: '/api/placeholder/400/300',
          phone: '+62 21 2358 0000',
        },
        room: {
          id: 'demo-room',
          type: 'deluxe',
          name: 'Deluxe Room with City View',
          bedType: 'King Bed',
          maxGuests: 2,
          image: '/api/placeholder/300/200',
        },
        reservation: {
          checkIn: '2024-03-15',
          checkOut: '2024-03-17',
          nights: 2,
          guests: 2,
          rooms: 1,
          specialRequests: 'Late check-in requested',
        },
        pricing: {
          roomRate: 1500000,
          taxes: 165000,
          fees: 50000,
          total: 1715000,
          currency: 'IDR',
        },
      };
    } else {
      return {
        id: mockId,
        bookingRef: mockRef,
        type: 'flight' as const,
        status: 'confirmed' as const,
        createdAt: new Date().toISOString(),
        passenger: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          phone: '+62 812 3456 7890',
          dateOfBirth: '1990-01-01',
          nationality: 'Indonesian',
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
          extras: 293914,
          seat: 125000,
          paymentFee: 15000,
          total: 3171742,
          currency: 'IDR',
        },
      };
    }
  };

  // Show not found only if no parameters at all
  if (!bookingRef && !bookingId && !type) {
    return <BookingNotFoundPage locale={locale} navigate={navigate} />;
  }

  const formatPrice = (price: number, currency: string = 'IDR') => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
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

  const formatTime = (timeStr: string) => {
    return timeStr;
  };

  const handleSendEmail = () => {
    setEmailSent(true);
    setTimeout(() => setEmailSent(false), 3000);
  };

  const handleDownloadTicket = () => {
    alert('Ticket download will be available soon');
  };

  const handleCopyBookingRef = () => {
    if (booking) {
      navigator.clipboard.writeText(booking.bookingRef);
      alert('Booking reference copied to clipboard');
    }
  };

  const handleViewTrips = () => {
    navigate({
      to: '/$locale/user/trips',
      params: { locale },
    });
  };

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <Container>
          <div className="rounded-xl border border-yellow-200 bg-white p-8 text-center shadow-sm">
            <div className="mb-4 flex items-center justify-center">
              <Clock className="h-16 w-16 text-yellow-600" />
            </div>
            <h1 className="mb-2 text-2xl font-bold text-gray-900">Loading Booking Details</h1>
            <p className="mb-6 text-gray-600">
              Please wait while we retrieve your booking information...
            </p>
          </div>
        </Container>
      </div>
    );
  }

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
            Your {booking.type} has been successfully booked
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <Badge variant="secondary" className="px-4 py-2 text-lg">
              Booking Reference: {booking.bookingRef}
            </Badge>
            <TextureButton
              variant="ghost"
              size="sm"
              onClick={handleCopyBookingRef}
              className="p-2"
            >
              <Copy className="h-4 w-4" />
            </TextureButton>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Booking Details */}
            {booking.type === 'hotel' ? (
              <HotelBookingDetails booking={booking as HotelBooking} />
            ) : (
              <FlightBookingDetails booking={booking as FlightBooking} />
            )}

            {/* Guest/Passenger Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  {booking.type === 'hotel' ? 'Guest Details' : 'Passenger Details'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-600">Name:</span>
                    <div className="font-medium">
                      {booking.type === 'hotel' 
                        ? `${(booking as HotelBooking).guest.firstName} ${(booking as HotelBooking).guest.lastName}`
                        : `${(booking as FlightBooking).passenger.firstName} ${(booking as FlightBooking).passenger.lastName}`
                      }
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">Email:</span>
                    <div className="font-medium">
                      {booking.type === 'hotel' 
                        ? (booking as HotelBooking).guest.email
                        : (booking as FlightBooking).passenger.email
                      }
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">Phone:</span>
                    <div className="font-medium">
                      {booking.type === 'hotel' 
                        ? (booking as HotelBooking).guest.phone
                        : (booking as FlightBooking).passenger.phone
                      }
                    </div>
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
                {booking.type === 'hotel' ? (
                  <>
                    <div className="flex items-start gap-3">
                      <Clock className="mt-0.5 h-5 w-5 text-blue-600" />
                      <div>
                        <div className="font-medium">Check-in / Check-out</div>
                        <div className="text-sm text-gray-600">
                          Check-in: 15:00 | Check-out: 12:00. Early check-in and late check-out subject to availability.
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-5 w-5 text-green-600" />
                      <div>
                        <div className="font-medium">Location</div>
                        <div className="text-sm text-gray-600">
                          The hotel is located in the city center with easy access to major attractions.
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="mt-0.5 h-5 w-5 text-purple-600" />
                      <div>
                        <div className="font-medium">Contact Hotel</div>
                        <div className="text-sm text-gray-600">
                          For any special requests or changes, contact the hotel directly.
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-start gap-3">
                      <Clock className="mt-0.5 h-5 w-5 text-blue-600" />
                      <div>
                        <div className="font-medium">Check-in</div>
                        <div className="text-sm text-gray-600">
                          Online check-in opens 24 hours before departure. Airport check-in closes 45 minutes before departure.
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-5 w-5 text-green-600" />
                      <div>
                        <div className="font-medium">Baggage</div>
                        <div className="text-sm text-gray-600">
                          Cabin baggage: 7kg. Checked baggage allowance varies by ticket type.
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Smartphone className="mt-0.5 h-5 w-5 text-purple-600" />
                      <div>
                        <div className="font-medium">Mobile Boarding Pass</div>
                        <div className="text-sm text-gray-600">
                          Download the airline app for mobile boarding passes and real-time updates.
                        </div>
                      </div>
                    </div>
                  </>
                )}
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
                  onClick={handleViewTrips}
                >
                  <Smartphone className="mr-2 h-4 w-4" />
                  View All Trips
                </TextureButton>

                <TextureButton
                  variant="outline"
                  className="w-full"
                  onClick={handleDownloadTicket}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download {booking.type === 'hotel' ? 'Voucher' : 'Ticket'}
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
                {booking.type === 'hotel' ? (
                  <>
                    <div className="flex justify-between text-sm">
                      <span>Room Rate</span>
                      <span>{formatPrice((booking as HotelBooking).pricing.roomRate, booking.pricing.currency)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Taxes & Fees</span>
                      <span>{formatPrice((booking as HotelBooking).pricing.taxes + (booking as HotelBooking).pricing.fees, booking.pricing.currency)}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between text-sm">
                      <span>Base Price</span>
                      <span>{formatPrice((booking as FlightBooking).pricing.basePrice, booking.pricing.currency)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Extras</span>
                      <span>{formatPrice((booking as FlightBooking).pricing.extras, booking.pricing.currency)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Seat Selection</span>
                      <span>{formatPrice((booking as FlightBooking).pricing.seat, booking.pricing.currency)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Payment Fee</span>
                      <span>{formatPrice((booking as FlightBooking).pricing.paymentFee, booking.pricing.currency)}</span>
                    </div>
                  </>
                )}
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total Paid</span>
                  <span>{formatPrice(booking.pricing.total, booking.pricing.currency)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Cross-sell Recommendation */}
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-blue-900">Complete Your Trip</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-blue-700">
                  {booking.type === 'hotel' 
                    ? `Need flights to ${(booking as HotelBooking).hotel.city}? Find great flight deals.`
                    : `Need accommodation in ${(booking as FlightBooking).flight.to.city}? Find great hotel deals.`
                  }
                </p>
                <TextureButton
                  variant="outline"
                  className="w-full border-blue-300 text-blue-700 hover:bg-blue-100"
                  onClick={() =>
                    navigate({
                      to: `/${locale}/${booking.type === 'hotel' ? 'flights' : 'hotels'}`,
                      params: { locale },
                    })
                  }
                >
                  Browse {booking.type === 'hotel' ? 'Flights' : 'Hotels'}
                </TextureButton>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <TextureButton
            variant="ghost"
            onClick={() => navigate({ to: `/${locale}`, params: { locale } })}
          >
            Back to Home
          </TextureButton>
        </div>
      </Container>
    </div>
  );
}

function HotelBookingDetails({ booking }: { booking: HotelBooking }) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building className="h-5 w-5" />
          Hotel Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Hotel Info */}
        <div className="flex items-start gap-4">
          <div className="aspect-square w-20 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
            <Building className="h-8 w-8 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold">{booking.hotel.name}</h3>
            <div className="flex items-center gap-1 mt-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{booking.hotel.rating}</span>
            </div>
            <p className="text-gray-600 text-sm mt-1">{booking.hotel.address}</p>
            <p className="text-gray-600 text-sm">{booking.hotel.city}, {booking.hotel.country}</p>
          </div>
        </div>

        <Separator />

        {/* Reservation Details */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-green-600" />
              <span className="font-medium">Check-in</span>
            </div>
            <div className="text-lg font-semibold">{formatDate(booking.reservation.checkIn)}</div>
            <div className="text-sm text-gray-600">15:00</div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-red-600" />
              <span className="font-medium">Check-out</span>
            </div>
            <div className="text-lg font-semibold">{formatDate(booking.reservation.checkOut)}</div>
            <div className="text-sm text-gray-600">12:00</div>
          </div>
        </div>

        <Separator />

        {/* Room Details */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Bed className="h-4 w-4 text-blue-600" />
            <span className="font-medium">Room Details</span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Room Type:</span>
              <div className="font-medium">{booking.room.name}</div>
            </div>
            <div>
              <span className="text-gray-600">Bed Type:</span>
              <div className="font-medium">{booking.room.bedType}</div>
            </div>
            <div>
              <span className="text-gray-600">Guests:</span>
              <div className="font-medium">{booking.reservation.guests} guests</div>
            </div>
            <div>
              <span className="text-gray-600">Nights:</span>
              <div className="font-medium">{booking.reservation.nights} nights</div>
            </div>
          </div>
          {booking.reservation.specialRequests && (
            <div className="mt-3">
              <span className="text-gray-600">Special Requests:</span>
              <div className="font-medium">{booking.reservation.specialRequests}</div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function FlightBookingDetails({ booking }: { booking: FlightBooking }) {
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

  return (
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
          <div className="text-center">
            <div className="text-2xl font-bold">{booking.flight.from.code}</div>
            <div className="text-sm text-gray-600">{booking.flight.from.city}</div>
            <div className="mt-2 text-lg font-semibold">
              {formatTime(booking.flight.departure.time)}
            </div>
            <div className="text-sm text-gray-600">
              {formatDate(booking.flight.departure.date)}
            </div>
          </div>

          <div className="flex flex-1 items-center justify-center px-4">
            <div className="text-center">
              <Plane className="mx-auto mb-1 h-6 w-6 text-gray-400" />
              <div className="text-sm text-gray-600">{booking.flight.duration}</div>
              <div className="text-xs text-gray-500">Direct</div>
            </div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold">{booking.flight.to.code}</div>
            <div className="text-sm text-gray-600">{booking.flight.to.city}</div>
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
            <div className="font-medium">{booking.flight.flightNumber}</div>
          </div>
          <div>
            <span className="text-gray-600">Class:</span>
            <div className="font-medium">{booking.flight.class}</div>
          </div>
          <div>
            <span className="text-gray-600">Seat:</span>
            <div className="font-medium">{booking.flight.seat || 'Not selected'}</div>
          </div>
          <div>
            <span className="text-gray-600">Departure Terminal:</span>
            <div className="font-medium">{booking.flight.from.terminal}</div>
          </div>
          <div>
            <span className="text-gray-600">Arrival Terminal:</span>
            <div className="font-medium">{booking.flight.to.terminal}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Not Found Component
function BookingNotFoundPage({ locale, navigate }: { locale: string; navigate: any }) {
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
