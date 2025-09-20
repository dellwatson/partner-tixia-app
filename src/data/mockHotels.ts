export interface Hotel {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  price: number;
  originalPrice?: number;
  image: string;
  location: string;
  distance: string;
  amenities: string[];
  roomType: string;
  cancellation: boolean;
}

export const mockHotels: Hotel[] = [
  {
    id: 1,
    name: 'Grand Hotel Downtown',
    rating: 4.8,
    reviews: 1234,
    price: 150,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop',
    location: 'Downtown',
    distance: '0.5 km from center',
    amenities: ['Free WiFi', 'Pool', 'Gym', 'Spa'],
    roomType: 'Deluxe Room',
    cancellation: true
  },
  {
    id: 2,
    name: 'Luxury Suites & Spa',
    rating: 4.6,
    reviews: 892,
    price: 220,
    originalPrice: 280,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop',
    location: 'Business District',
    distance: '1.2 km from center',
    amenities: ['Free WiFi', 'Spa', 'Restaurant', 'Bar'],
    roomType: 'Executive Suite',
    cancellation: true
  },
  {
    id: 3,
    name: 'Budget Inn Express',
    rating: 4.2,
    reviews: 567,
    price: 89,
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&h=300&fit=crop',
    location: 'Airport Area',
    distance: '5.8 km from center',
    amenities: ['Free WiFi', 'Parking', 'Breakfast'],
    roomType: 'Standard Room',
    cancellation: false
  }
];

// Mock API function
export const fetchHotels = async (location: string, filters?: any): Promise<Hotel[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  // Return filtered hotels based on location and filters
  return mockHotels.map(hotel => ({
    ...hotel,
    name: `${hotel.name} ${location}`,
    location: location
  }));
};
