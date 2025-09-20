import type { Hotel } from '~/data/mockHotels';

export interface HotelCardProps {
  hotel: Hotel;
  locale: 'id' | 'en' | 'zh' | 'ms' | 'de' | 'ru' | 'ja' | 'fil' | 'th' | 'vi';
  onSelect?: (hotel: Hotel) => void;
}

export interface HotelCardLayoutProps {
  badges?: Array<{ text: string; variant: 'green' | 'blue' | 'purple' | 'orange' }>;
  hotelImage: React.ReactNode;
  hotelInfo: React.ReactNode;
  hotelName: string;
  price: string;
  originalPrice?: string;
  onViewDetails: () => void;
  children?: React.ReactNode;
}

export interface HotelInfoProps {
  hotel: Hotel;
  className?: string;
}

export interface HotelImageProps {
  src: string;
  alt: string;
  className?: string;
}
