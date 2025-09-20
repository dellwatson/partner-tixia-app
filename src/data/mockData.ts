export interface Hotel {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  amenities: string[];
  description: string;
  coordinates: [number, number];
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  hotelsCount: number;
  description: string;
  rating: number;
  category: string;
  basePrice: number;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  comment: string;
  rating: number;
  avatar: string;
}

export interface TravelTip {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  readTime: string;
}

export const destinations: Destination[] = [
  {
    id: '1',
    name: 'Paris',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop',
    hotelsCount: 1247,
    description: 'The City of Light awaits with its iconic landmarks and romantic atmosphere.',
    rating: 4.8,
    category: 'city',
    basePrice: 299
  },
  {
    id: '2',
    name: 'Tokyo',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
    hotelsCount: 892,
    description: 'Experience the perfect blend of traditional culture and modern innovation.',
    rating: 4.6,
    category: 'city',
    basePrice: 189
  },
  {
    id: '3',
    name: 'New York',
    country: 'USA',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop',
    hotelsCount: 1456,
    description: 'The city that never sleeps offers endless possibilities and experiences.',
    rating: 4.7,
    category: 'city',
    basePrice: 349
  },
  {
    id: '4',
    name: 'London',
    country: 'UK',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop',
    hotelsCount: 1089,
    description: 'Discover centuries of history in this vibrant and diverse metropolis.',
    rating: 4.5,
    category: 'city',
    basePrice: 229
  },
  {
    id: '5',
    name: 'Bali',
    country: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&h=600&fit=crop',
    hotelsCount: 567,
    description: 'Tropical paradise with stunning beaches and rich cultural heritage.',
    rating: 4.9,
    category: 'beach',
    basePrice: 159
  },
  {
    id: '6',
    name: 'Dubai',
    country: 'UAE',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop',
    hotelsCount: 423,
    description: 'Luxury and innovation meet in this dazzling desert oasis.',
    rating: 4.8,
    category: 'city',
    basePrice: 449
  }
];

export const mockDestinations = destinations;

export const mockHotels: Hotel[] = [
  {
    id: '1',
    name: 'Grand Palace Hotel Paris',
    location: 'Paris, France',
    price: 299,
    rating: 4.8,
    reviews: 1247,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop',
    amenities: ['Free WiFi', 'Pool', 'Spa', 'Restaurant', 'Gym', 'Room Service'],
    description: 'Luxury hotel in the heart of Paris with stunning views of the Eiffel Tower.',
    coordinates: [48.8566, 2.3522]
  },
  {
    id: '2',
    name: 'Tokyo Skyline Resort',
    location: 'Tokyo, Japan',
    price: 189,
    rating: 4.6,
    reviews: 892,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop',
    amenities: ['Free WiFi', 'Restaurant', 'Bar', 'Concierge', 'Laundry'],
    description: 'Modern hotel with panoramic city views and traditional Japanese hospitality.',
    coordinates: [35.6762, 139.6503]
  },
  {
    id: '3',
    name: 'Manhattan Elite Suites',
    location: 'New York, USA',
    price: 349,
    rating: 4.7,
    reviews: 1456,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
    amenities: ['Free WiFi', 'Gym', 'Business Center', 'Restaurant', 'Valet Parking'],
    description: 'Sophisticated suites in the heart of Manhattan with premium amenities.',
    coordinates: [40.7589, -73.9851]
  },
  {
    id: '4',
    name: 'London Bridge Boutique',
    location: 'London, UK',
    price: 229,
    rating: 4.5,
    reviews: 1089,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
    amenities: ['Free WiFi', 'Restaurant', 'Bar', 'Concierge', 'Pet Friendly'],
    description: 'Charming boutique hotel near London Bridge with historic character.',
    coordinates: [51.5074, -0.1278]
  },
  {
    id: '5',
    name: 'Bali Beach Paradise',
    location: 'Bali, Indonesia',
    price: 159,
    rating: 4.9,
    reviews: 567,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=600&fit=crop',
    amenities: ['Free WiFi', 'Beach Access', 'Pool', 'Spa', 'Restaurant', 'Water Sports'],
    description: 'Beachfront resort with stunning ocean views and world-class spa facilities.',
    coordinates: [-8.3405, 115.0920]
  },
  {
    id: '6',
    name: 'Dubai Luxury Tower',
    location: 'Dubai, UAE',
    price: 449,
    rating: 4.8,
    reviews: 423,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop',
    amenities: ['Free WiFi', 'Pool', 'Spa', 'Restaurant', 'Gym', 'Valet Parking', 'Butler Service'],
    description: 'Ultra-luxury hotel with breathtaking views of the Dubai skyline and Burj Khalifa.',
    coordinates: [25.2048, 55.2708]
  }
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    location: 'New York, USA',
    comment: 'Amazing experience! The booking process was seamless and the hotel exceeded all expectations.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: '2',
    name: 'David Chen',
    location: 'Singapore',
    comment: 'Found the perfect vacation spot through this platform. Highly recommend for anyone looking for quality accommodations.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: '3',
    name: 'Emma Wilson',
    location: 'London, UK',
    comment: 'Great customer service and competitive prices. Will definitely use again for my next trip.',
    rating: 4,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
  }
];

export const travelTips: TravelTip[] = [
  {
    id: '1',
    title: 'Best Time to Book Your Flight',
    excerpt: 'Learn when to book flights for the best deals and avoid peak pricing.',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=300&fit=crop',
    readTime: '5 min read'
  },
  {
    id: '2',
    title: 'Packing Essentials for Any Trip',
    excerpt: 'A comprehensive guide to packing smart and traveling light.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop',
    readTime: '7 min read'
  },
  {
    id: '3',
    title: 'Travel Safety Tips',
    excerpt: 'Stay safe while exploring new destinations with these essential tips.',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop',
    readTime: '6 min read'
  }
];

export const mockFeatures = [
  {
    icon: '💰',
    title: 'best_prices',
    description: 'best_prices_desc'
  },
  {
    icon: '🔒',
    title: 'secure_booking',
    description: 'secure_booking_desc'
  },
  {
    icon: '📞',
    title: 'customer_support',
    description: 'customer_support_desc'
  }
];
