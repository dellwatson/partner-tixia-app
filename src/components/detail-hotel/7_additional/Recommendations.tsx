import React, { useState } from 'react';
import { Star, MapPin, Heart, ArrowRight, Filter, Compass } from 'lucide-react';

interface RecommendedHotel {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  price: number;
  currency: string;
  originalPrice?: number;
  image: string;
  location: string;
  distance: string;
  amenities: string[];
  dealType?: 'early-bird' | 'last-minute' | 'member-only';
  similarityScore: number;
}

interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  description: string;
  averagePrice: number;
  currency: string;
  popularMonths: string[];
}

interface RecommendationsProps {
  currentHotelId: string;
  similarHotels: RecommendedHotel[];
  nearbyHotels: RecommendedHotel[];
  alternativeDestinations: Destination[];
}

const Recommendations: React.FC<RecommendationsProps> = ({
  currentHotelId,
  similarHotels,
  nearbyHotels,
  alternativeDestinations
}) => {
  const [activeTab, setActiveTab] = useState<'similar' | 'nearby' | 'destinations'>('similar');
  const [showAllSimilar, setShowAllSimilar] = useState(false);
  const [showAllNearby, setShowAllNearby] = useState(false);

  const tabs = [
    { id: 'similar', label: 'Similar hotels', count: similarHotels.length },
    { id: 'nearby', label: 'Nearby hotels', count: nearbyHotels.length },
    { id: 'destinations', label: 'Other destinations', count: alternativeDestinations.length }
  ];

  const getDealBadge = (dealType?: string) => {
    switch (dealType) {
      case 'early-bird':
        return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Early Bird</span>;
      case 'last-minute':
        return <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">Last Minute</span>;
      case 'member-only':
        return <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">Member Only</span>;
      default:
        return null;
    }
  };

  const HotelCard: React.FC<{ hotel: RecommendedHotel }> = ({ hotel }) => (
    <div className="border border-gray-200 rounded-lg overflow-hidden hover:border-blue-300 transition-colors cursor-pointer">
      <div className="relative">
        <img
          src={hotel.image || '/api/placeholder/300/200'}
          alt={hotel.name}
          className="w-full h-48 object-cover"
        />
        <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
          <Heart className="w-4 h-4 text-gray-600" />
        </button>
        {hotel.dealType && (
          <div className="absolute top-3 left-3">
            {getDealBadge(hotel.dealType)}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 text-sm leading-tight">{hotel.name}</h3>
          <div className="flex items-center gap-1 ml-2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-gray-700">{hotel.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
          <MapPin className="w-3 h-3" />
          <span>{hotel.location}</span>
          <span>•</span>
          <span>{hotel.distance}</span>
        </div>
        
        <p className="text-xs text-gray-500 mb-3">
          {hotel.reviewCount.toLocaleString()} reviews
        </p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {hotel.amenities.slice(0, 3).map((amenity, index) => (
            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
              {amenity}
            </span>
          ))}
          {hotel.amenities.length > 3 && (
            <span className="text-xs text-blue-600">+{hotel.amenities.length - 3}</span>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            {hotel.originalPrice && (
              <span className="text-xs text-gray-500 line-through">
                {hotel.currency}{hotel.originalPrice}
              </span>
            )}
            <div className="font-bold text-gray-900">
              {hotel.currency}{hotel.price.toLocaleString()}
            </div>
            <span className="text-xs text-gray-600">per night</span>
          </div>
          <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors">
            View
          </button>
        </div>
      </div>
    </div>
  );

  const DestinationCard: React.FC<{ destination: Destination }> = ({ destination }) => (
    <div className="border border-gray-200 rounded-lg overflow-hidden hover:border-blue-300 transition-colors cursor-pointer">
      <div className="relative">
        <img
          src={destination.image || '/api/placeholder/300/200'}
          alt={destination.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-3 left-3 text-white">
          <h3 className="font-semibold text-lg">{destination.name}</h3>
          <p className="text-sm opacity-90">{destination.country}</p>
        </div>
      </div>
      
      <div className="p-4">
        <p className="text-sm text-gray-700 mb-3 line-clamp-2">{destination.description}</p>
        
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-sm text-gray-600">From </span>
            <span className="font-bold text-gray-900">
              {destination.currency}{destination.averagePrice.toLocaleString()}
            </span>
            <span className="text-xs text-gray-600"> per night</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          <span className="text-xs text-gray-600">Best time:</span>
          {destination.popularMonths.slice(0, 3).map((month, index) => (
            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
              {month}
            </span>
          ))}
        </div>
        
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition-colors">
          <span className="text-sm font-medium">Explore {destination.name}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  return (
    <div id="recommendations" className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">You might also like</h2>
        <p className="text-gray-600">Discover similar properties and alternative destinations</p>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      {/* Similar Hotels */}
      {activeTab === 'similar' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(showAllSimilar ? similarHotels : similarHotels.slice(0, 6)).map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
          
          {similarHotels.length > 6 && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setShowAllSimilar(!showAllSimilar)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {showAllSimilar ? 'Show fewer hotels' : `Show all ${similarHotels.length} similar hotels`}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Nearby Hotels */}
      {activeTab === 'nearby' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(showAllNearby ? nearbyHotels : nearbyHotels.slice(0, 6)).map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
          
          {nearbyHotels.length > 6 && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setShowAllNearby(!showAllNearby)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {showAllNearby ? 'Show fewer hotels' : `Show all ${nearbyHotels.length} nearby hotels`}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Alternative Destinations */}
      {activeTab === 'destinations' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {alternativeDestinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        </div>
      )}

      {/* Personalized Recommendations Notice */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-start gap-3">
          <Compass className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900 mb-1">Personalized for you</h4>
            <p className="text-sm text-blue-700">
              These recommendations are based on your search preferences, similar traveler choices, and property features. 
              Sign in to get even more personalized suggestions based on your booking history.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
