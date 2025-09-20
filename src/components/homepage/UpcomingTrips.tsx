import { Link } from '@tanstack/react-router';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import { useBookingStore } from '~/stores/booking-store';
import { Card, CardContent } from '~/components/ui/card';
import { TextureButton } from '~/components/ui/texture-button';

interface UpcomingTripsProps {
  locale: string;
}

export function UpcomingTrips({ locale }: UpcomingTripsProps) {
  const { bookings } = useBookingStore();
  
  // Filter upcoming bookings (check-in/departure date is in the future)
  const upcomingBookings = bookings
    .filter(booking => {
      const checkInDate = booking.type === 'hotel' 
        ? new Date(booking.hotel.checkIn)
        : new Date(booking.flight.departure.date);
      return checkInDate > new Date();
    })
    .sort((a, b) => {
      const dateA = a.type === 'hotel' 
        ? new Date(a.hotel.checkIn)
        : new Date(a.flight.departure.date);
      const dateB = b.type === 'hotel' 
        ? new Date(b.hotel.checkIn)
        : new Date(b.flight.departure.date);
      return dateA.getTime() - dateB.getTime();
    })
    .slice(0, 3); // Show only next 3 trips

  if (upcomingBookings.length === 0) {
    return null; // Don't show section if no upcoming trips
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysUntil = (dateString: string) => {
    const targetDate = new Date(dateString);
    const today = new Date();
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    return `In ${diffDays} days`;
  };

  return (
    <div className="bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Your upcoming trip</h2>
            <p className="text-gray-600">Get ready for your next adventure</p>
          </div>
          <Link
            to="/$locale/user/trips"
            params={{ locale }}
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
          >
            View all trips
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {upcomingBookings.map((booking) => (
            <Card key={booking.bookingRef} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="relative">
                  {booking.type === 'hotel' ? (
                    <>
                      <img
                        src={booking.hotel.image}
                        alt={booking.hotel.name}
                        className="h-32 w-full object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                        Hotel
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                        <div className="text-white text-center">
                          <div className="text-lg font-bold">{booking.flight.from.code}</div>
                          <div className="text-sm">→</div>
                          <div className="text-lg font-bold">{booking.flight.to.code}</div>
                        </div>
                      </div>
                      <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded text-xs font-medium">
                        Flight
                      </div>
                    </>
                  )}
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-gray-900 px-2 py-1 rounded text-xs font-medium">
                    {booking.type === 'hotel' 
                      ? getDaysUntil(booking.hotel.checkIn)
                      : getDaysUntil(booking.flight.departure.date)
                    }
                  </div>
                </div>

                <div className="p-4">
                  <div className="mb-3">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {booking.type === 'hotel' ? booking.hotel.name : `${booking.flight.from.city} → ${booking.flight.to.city}`}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                      <MapPin className="h-3 w-3" />
                      <span className="truncate">
                        {booking.type === 'hotel' ? booking.hotel.location : booking.flight.airline}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">
                        {booking.type === 'hotel' 
                          ? `${formatDate(booking.hotel.checkIn)} - ${formatDate(booking.hotel.checkOut)}`
                          : formatDate(booking.flight.departure.date)
                        }
                      </span>
                    </div>
                    {booking.type === 'flight' && (
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">
                          {booking.flight.departure.time}
                        </span>
                      </div>
                    )}
                  </div>

                  <Link
                    to="/$locale/_booking/_confirmation/confirmation"
                    params={{ locale }}
                    search={{ 
                      bookingRef: booking.bookingRef,
                      type: booking.type 
                    }}
                  >
                    <TextureButton variant="outline" className="w-full text-sm">
                      View details
                    </TextureButton>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
