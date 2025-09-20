import hotelAdditionalData from '~/data/hotel-additional-mock-data.json';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface HotelFacility {
  id: string;
  name: string;
  category: 'internet' | 'wellness' | 'business' | 'food' | 'general' | 'accessibility' | 'safety' | 'sustainability';
  description: string;
  available: boolean;
  isPaid: boolean;
  hours?: string;
}

export interface HouseRule {
  id: string;
  category: 'pets' | 'smoking' | 'checkin' | 'checkout' | 'age' | 'payment';
  title: string;
  description: string;
  allowed: boolean;
  details: string[];
  additionalInfo?: string;
}

export interface CompanyInfo {
  managementCompany: string;
  contactInfo: {
    phone: string;
    email: string;
    website: string;
    address: string;
  };
  certifications: string[];
  awards: Array<{
    name: string;
    year: number;
    organization: string;
  }>;
  description: string;
}

export interface AreaInfo {
  neighborhood: string;
  description: string;
  attractions: Array<{
    id: string;
    name: string;
    type: 'attraction' | 'restaurant' | 'shopping' | 'transport';
    distance: string;
    walkingTime: string;
    rating: number;
    description: string;
  }>;
  transport: Array<{
    type: 'metro' | 'bus' | 'airport' | 'taxi';
    name: string;
    distance: string;
    travelTime: string;
  }>;
  walkScore: number;
}

export interface Recommendations {
  similarHotels: Array<{
    id: string;
    name: string;
    rating: number;
    reviewCount: number;
    price: number;
    currency: string;
    image: string;
    location: string;
    distance: string;
    amenities: string[];
    similarityScore: number;
  }>;
  nearbyHotels: Array<{
    id: string;
    name: string;
    rating: number;
    reviewCount: number;
    price: number;
    currency: string;
    image: string;
    location: string;
    distance: string;
    amenities: string[];
    similarityScore: number;
  }>;
  alternativeDestinations: Array<{
    id: string;
    name: string;
    country: string;
    image: string;
    description: string;
    averagePrice: number;
    currency: string;
    popularMonths: string[];
  }>;
}

export interface MoreInfo {
  legalInfo: {
    propertyId: string;
    businessLicense: string;
    taxId: string;
    registrationNumber: string;
  };
  contactInfo: {
    emergencyContact: string;
    localAuthorities: string;
    touristBoard: string;
  };
  termsAndConditions: string[];
  privacyPolicy: string;
  accessibilityInfo: string[];
  sustainabilityInfo: string[];
  localRegulations: string[];
}

export const hotelAdditionalApi = {
  // Get hotel facilities
  async getHotelFacilities(hotelId: string): Promise<HotelFacility[]> {
    await delay(300);
    return hotelAdditionalData.facilities as HotelFacility[];
  },

  // Get house rules
  async getHouseRules(hotelId: string): Promise<HouseRule[]> {
    await delay(250);
    return hotelAdditionalData.houseRules as HouseRule[];
  },

  // Get company information
  async getCompanyInfo(hotelId: string): Promise<CompanyInfo> {
    await delay(200);
    return hotelAdditionalData.companyInfo as CompanyInfo;
  },

  // Get area information
  async getAreaInfo(hotelId: string): Promise<AreaInfo> {
    await delay(350);
    return hotelAdditionalData.areaInfo as AreaInfo;
  },

  // Get recommendations
  async getRecommendations(hotelId: string): Promise<Recommendations> {
    await delay(400);
    return hotelAdditionalData.recommendations as Recommendations;
  },

  // Get more information
  async getMoreInfo(hotelId: string): Promise<MoreInfo> {
    await delay(150);
    return hotelAdditionalData.moreInfo as MoreInfo;
  },

  // Get all additional data at once
  async getAllAdditionalData(hotelId: string) {
    await delay(500);
    return {
      facilities: hotelAdditionalData.facilities as HotelFacility[],
      houseRules: hotelAdditionalData.houseRules as HouseRule[],
      companyInfo: hotelAdditionalData.companyInfo as CompanyInfo,
      areaInfo: hotelAdditionalData.areaInfo as AreaInfo,
      recommendations: hotelAdditionalData.recommendations as Recommendations,
      moreInfo: hotelAdditionalData.moreInfo as MoreInfo,
    };
  }
};
