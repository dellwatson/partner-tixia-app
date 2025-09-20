import hotelMockData from '../../data/hotel-mock-data.json';

// Simulate network delay for realistic API behavior
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface HotelData {
  hotel: {
    id: string;
    countryId: string;
    name: string;
    rating: number;
    reviews: number;
    price: number;
    originalPrice?: number;
    currency: string;
    images: string[];
    location: string;
    distance: string;
    address: string;
    amenities: string[];
    description: string;
    policies: {
      checkIn: string;
      checkOut: string;
      cancellation: string;
      pets: string;
      smoking: string;
    };
  };
  rooms: Array<{
    id: string;
    name: string;
    type: string;
    size: string;
    maxGuests: number;
    beds: string;
    amenities: string[];
    price: number;
    originalPrice?: number;
    currency: string;
    availability: number;
    images: string[];
    cancellation: string;
    breakfast: boolean;
    refundable: boolean;
  }>;
  reviews: Array<{
    id: string;
    guestName: string;
    guestCountry: string;
    rating: number;
    date: string;
    stayDate: string;
    roomType: string;
    tripType: string;
    title: string;
    positives: string[];
    negatives: string[];
    comment: string;
    helpful: number;
    verified: boolean;
  }>;
  reviewStats: {
    overall: number;
    totalReviews: number;
    breakdown: {
      cleanliness: number;
      comfort: number;
      location: number;
      facilities: number;
      staff: number;
      valueForMoney: number;
    };
    ratingDistribution: {
      [key: string]: number;
    };
  };
  faqs: Array<{
    id: string;
    question: string;
    answer: string;
    category: string;
    helpful: number;
  }>;
  facilities: {
    wellness: string[];
    food: string[];
    business: string[];
    general: string[];
    accessibility: string[];
    safety: string[];
    sustainability: string[];
    localRegulations: string[];
  };
}

// Mock API service
export class HotelApiService {
  private static instance: HotelApiService;

  static getInstance(): HotelApiService {
    if (!HotelApiService.instance) {
      HotelApiService.instance = new HotelApiService();
    }
    return HotelApiService.instance;
  }

  async getHotelById(hotelId: string): Promise<HotelData> {
    // Simulate network delay
    await delay(Math.random() * 500 + 200); // 200-700ms delay

    // Available hotels for testing
    const availableHotels = [
      'grand-hotel-jakarta',
      'luxury-resort-bali', 
      'boutique-hotel-singapore',
      'beach-resort-thailand',
      'city-hotel-malaysia',
      'mountain-lodge-philippines'
    ];

    // Check if hotel exists in our mock registry
    if (hotelId === hotelMockData.hotel.id || availableHotels.includes(hotelId)) {
      // For now, return the same mock data but with updated ID and name
      const mockData = { ...hotelMockData } as HotelData;
      
      // Customize based on hotel ID
      if (hotelId !== hotelMockData.hotel.id) {
        mockData.hotel = {
          ...mockData.hotel,
          id: hotelId,
          name: this.getHotelNameById(hotelId),
          countryId: this.getCountryByHotelId(hotelId)
        };
      }
      
      return mockData;
    }

    // Simulate 404 for unknown hotels
    throw new Error(`Hotel with ID "${hotelId}" not found`);
  }

  private getHotelNameById(hotelId: string): string {
    const hotelNames: { [key: string]: string } = {
      'grand-hotel-jakarta': 'Grand Hotel Jakarta',
      'luxury-resort-bali': 'Luxury Resort Bali',
      'boutique-hotel-singapore': 'Boutique Hotel Singapore',
      'beach-resort-thailand': 'Beach Resort Thailand',
      'city-hotel-malaysia': 'City Hotel Malaysia',
      'mountain-lodge-philippines': 'Mountain Lodge Philippines'
    };
    return hotelNames[hotelId] || 'Unknown Hotel';
  }

  private getCountryByHotelId(hotelId: string): string {
    if (hotelId.includes('jakarta') || hotelId.includes('bali')) return 'indonesia';
    if (hotelId.includes('singapore')) return 'singapore';
    if (hotelId.includes('thailand')) return 'thailand';
    if (hotelId.includes('malaysia')) return 'malaysia';
    if (hotelId.includes('philippines')) return 'philippines';
    return 'indonesia'; // default
  }

  async getHotelRooms(hotelId: string): Promise<HotelData['rooms']> {
    await delay(Math.random() * 300 + 100);
    
    const hotelData = await this.getHotelById(hotelId);
    return hotelData.rooms;
  }

  async getHotelReviews(hotelId: string, page = 1, limit = 10): Promise<{
    reviews: HotelData['reviews'];
    totalPages: number;
    currentPage: number;
    totalReviews: number;
  }> {
    await delay(Math.random() * 400 + 150);
    
    const hotelData = await this.getHotelById(hotelId);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedReviews = hotelData.reviews.slice(startIndex, endIndex);
    
    return {
      reviews: paginatedReviews,
      totalPages: Math.ceil(hotelData.reviews.length / limit),
      currentPage: page,
      totalReviews: hotelData.reviews.length
    };
  }

  async getHotelFacilities(hotelId: string): Promise<HotelData['facilities']> {
    await delay(Math.random() * 200 + 100);
    
    const hotelData = await this.getHotelById(hotelId);
    return hotelData.facilities;
  }
}

// Export singleton instance
export const hotelApi = HotelApiService.getInstance();
