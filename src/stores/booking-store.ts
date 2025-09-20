import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface HotelBooking {
  id: string;
  bookingRef: string;
  type: 'hotel';
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
  guest: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    nationality: string;
  };
  hotel: {
    id: string;
    name: string;
    address: string;
    city: string;
    country: string;
    rating: number;
    image: string;
    phone: string;
  };
  room: {
    id: string;
    type: string;
    name: string;
    bedType: string;
    maxGuests: number;
    image: string;
  };
  reservation: {
    checkIn: string;
    checkOut: string;
    nights: number;
    guests: number;
    rooms: number;
    specialRequests?: string;
  };
  pricing: {
    roomRate: number;
    taxes: number;
    fees: number;
    total: number;
    currency: string;
  };
}

export interface FlightBooking {
  id: string;
  bookingRef: string;
  type: 'flight';
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
  passenger: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    nationality: string;
  };
  flight: {
    airline: string;
    flightNumber: string;
    from: {
      code: string;
      city: string;
      airport: string;
      terminal?: string;
    };
    to: {
      code: string;
      city: string;
      airport: string;
      terminal?: string;
    };
    departure: {
      date: string;
      time: string;
      gate?: string;
    };
    arrival: {
      date: string;
      time: string;
    };
    duration: string;
    class: string;
    seat?: string;
  };
  pricing: {
    basePrice: number;
    extras: number;
    seat: number;
    paymentFee: number;
    total: number;
    currency: string;
  };
}

export type Booking = HotelBooking | FlightBooking;

interface BookingStore {
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  getBooking: (bookingRef: string) => Booking | undefined;
  getBookingById: (id: string) => Booking | undefined;
  updateBookingStatus: (bookingRef: string, status: Booking['status']) => void;
  getUserBookings: () => Booking[];
  clearBookings: () => void;
}

export const useBookingStore = create<BookingStore>()(
  persist(
    (set, get) => ({
      bookings: [],
      
      addBooking: (booking) => {
        set((state) => ({
          bookings: [...state.bookings, booking]
        }));
      },
      
      getBooking: (bookingRef) => {
        return get().bookings.find(booking => booking.bookingRef === bookingRef);
      },
      
      getBookingById: (id) => {
        return get().bookings.find(booking => booking.id === id);
      },
      
      updateBookingStatus: (bookingRef, status) => {
        set((state) => ({
          bookings: state.bookings.map(booking =>
            booking.bookingRef === bookingRef
              ? { ...booking, status }
              : booking
          )
        }));
      },
      
      getUserBookings: () => {
        return get().bookings.filter(booking => booking.status !== 'cancelled');
      },
      
      clearBookings: () => {
        set({ bookings: [] });
      }
    }),
    {
      name: 'booking-storage',
    }
  )
);

// Mock booking generator functions
export const generateHotelBooking = (
  bookingId: string,
  guestInfo: any,
  reservationDetails: any,
  hotelData?: any,
  breakdown?: any
): HotelBooking => {
  const bookingRef = `HTL${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  
  return {
    id: bookingId,
    bookingRef,
    type: 'hotel',
    status: 'confirmed',
    createdAt: new Date().toISOString(),
    guest: {
      firstName: guestInfo.firstName || 'John',
      lastName: guestInfo.lastName || 'Doe',
      email: guestInfo.email || 'john.doe@example.com',
      phone: guestInfo.phone || '+62 812 3456 7890',
      dateOfBirth: guestInfo.dateOfBirth || '1990-01-01',
      nationality: guestInfo.nationality || 'Indonesian',
    },
    hotel: {
      id: reservationDetails.hotelId || hotelData?.id || 'grand-hotel-jakarta',
      name: hotelData?.name || 'Grand Hotel Jakarta',
      address: hotelData?.address || 'Jl. MH Thamrin No. 1, Jakarta Pusat',
      city: hotelData?.city || 'Jakarta',
      country: hotelData?.country || 'Indonesia',
      rating: hotelData?.rating || 4.8,
      image: hotelData?.image || '/api/placeholder/400/300',
      phone: hotelData?.phone || '+62 21 2358 0000',
    },
    room: {
      id: reservationDetails.roomId || '1-special',
      type: reservationDetails.roomType || 'special',
      name: hotelData?.roomName || 'Deluxe Room with City View',
      bedType: hotelData?.bedType || 'King Bed',
      maxGuests: hotelData?.maxGuests || 2,
      image: hotelData?.roomImage || '/api/placeholder/300/200',
    },
    reservation: {
      checkIn: reservationDetails.checkIn || '2024-03-15',
      checkOut: reservationDetails.checkOut || '2024-03-17',
      nights: 2,
      guests: parseInt(reservationDetails.guests) || 2,
      rooms: 1,
      specialRequests: reservationDetails.specialRequests,
    },
    pricing: {
      roomRate: breakdown?.baseRoomRate || 1500000,
      taxes: breakdown?.taxes || 165000,
      fees: breakdown?.fees || 50000,
      total: breakdown?.total || 1715000,
      currency: breakdown?.currency || 'IDR',
    },
  };
};

export const generateFlightBooking = (
  bookingId: string,
  passengerInfo: any,
  flightData?: any,
  breakdown?: any
): FlightBooking => {
  const bookingRef = `FLT${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  
  return {
    id: bookingId,
    bookingRef,
    type: 'flight',
    status: 'confirmed',
    createdAt: new Date().toISOString(),
    passenger: {
      firstName: passengerInfo.firstName || 'John',
      lastName: passengerInfo.lastName || 'Doe',
      email: passengerInfo.email || 'john.doe@example.com',
      phone: passengerInfo.phone || '+62 812 3456 7890',
      dateOfBirth: passengerInfo.dateOfBirth || '1990-01-01',
      nationality: passengerInfo.nationality || 'Indonesian',
    },
    flight: {
      airline: flightData?.airline || 'Garuda Indonesia',
      flightNumber: flightData?.flight_number || 'GA 152',
      from: {
        code: flightData?.route?.from?.code || 'CGK',
        city: flightData?.route?.from?.city || 'Jakarta',
        airport: flightData?.route?.from?.airport || 'Soekarno-Hatta International Airport',
        terminal: 'Terminal 3',
      },
      to: {
        code: flightData?.route?.to?.code || 'DPS',
        city: flightData?.route?.to?.city || 'Denpasar',
        airport: flightData?.route?.to?.airport || 'Ngurah Rai International Airport',
        terminal: 'Domestic Terminal',
      },
      departure: {
        date: flightData?.departure_time ? new Date(flightData.departure_time).toISOString().split('T')[0] : '2024-03-15',
        time: flightData?.departure_time ? new Date(flightData.departure_time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) : '08:30',
        gate: 'A12',
      },
      arrival: {
        date: flightData?.arrival_time ? new Date(flightData.arrival_time).toISOString().split('T')[0] : '2024-03-15',
        time: flightData?.arrival_time ? new Date(flightData.arrival_time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) : '11:45',
      },
      duration: flightData?.duration || '3h 15m',
      class: 'Economy',
      seat: '12A',
    },
    pricing: {
      basePrice: breakdown?.baseSelected || 2737828,
      extras: breakdown?.extrasSelected || 0,
      seat: breakdown?.seatSelected || 0,
      paymentFee: breakdown?.paymentFeeSelected || 0,
      total: breakdown?.totalSelected || 3171742,
      currency: 'IDR',
    },
  };
};
