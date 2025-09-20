import { useNavigate } from '@tanstack/react-router';
import { HotelCardLayout } from './HotelCardLayout';
import { HotelImage } from './HotelImage';
import { HotelInfo } from './HotelInfo';
import type { HotelCardProps } from './types';

export function HotelCard({ hotel, locale, onSelect }: HotelCardProps) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    // If parent provides onSelect, let parent handle navigation and selection
    if (onSelect) {
      onSelect(hotel);
      return;
    }

    // Default navigation (legacy fallback)
    const country = hotel.location.toLowerCase().includes('bali') || hotel.location.toLowerCase().includes('jakarta') 
      ? 'indonesia'
      : hotel.location.toLowerCase().includes('singapore')
      ? 'singapore' 
      : hotel.location.toLowerCase().includes('kuala lumpur')
      ? 'malaysia'
      : 'indonesia'; // default
      
    navigate({
      to: '/$locale/hotels/$countryId/$hotelId',
      params: { 
        locale, 
        countryId: country,
        hotelId: hotel.id.toString() 
      }
    });
  };

  // Create badges based on hotel data
  const badges = [];
  if (hotel.cancellation) {
    badges.push({ text: 'Free cancellation', variant: 'green' as const });
  }
  if (hotel.originalPrice) {
    badges.push({ text: 'Special offer', variant: 'orange' as const });
  }
  if (hotel.rating >= 4.5) {
    badges.push({ text: 'Excellent rating', variant: 'blue' as const });
  }

  const hotelImage = (
    <HotelImage
      src={hotel.image}
      alt={hotel.name}
    />
  );

  const hotelInfo = (
    <HotelInfo hotel={hotel} />
  );

  // Format price
  const priceDisplay = `$${hotel.price}`;
  const originalPriceDisplay = hotel.originalPrice ? `$${hotel.originalPrice}` : undefined;

  return (
    <HotelCardLayout
      badges={badges}
      hotelImage={hotelImage}
      hotelInfo={hotelInfo}
      hotelName={hotel.name}
      price={priceDisplay}
      originalPrice={originalPriceDisplay}
      onViewDetails={handleViewDetails}
    />
  );
}
