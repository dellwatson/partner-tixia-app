import React, { useState } from 'react';
import { MapPin, Clock, Star, Navigation, Car, Train, Plane, Coffee, ShoppingBag, Camera, Utensils } from 'lucide-react';

interface Attraction {
  id: string;
  name: string;
  type: 'restaurant' | 'attraction' | 'shopping' | 'transport' | 'entertainment' | 'landmark';
  distance: string;
  walkingTime?: string;
  rating?: number;
  description: string;
  priceLevel?: '$' | '$$' | '$$$' | '$$$$';
}

interface TransportOption {
  type: 'airport' | 'train' | 'bus' | 'metro';
  name: string;
  distance: string;
  travelTime: string;
}

interface AreaInfoProps {
  neighborhood: string;
  description: string;
  attractions: Attraction[];
  transport: TransportOption[];
  walkScore?: number;
}

const AreaInfo: React.FC<AreaInfoProps> = ({
  neighborhood,
  description,
  attractions,
  transport,
  walkScore
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { value: 'all', label: 'All nearby', icon: MapPin },
    { value: 'restaurant', label: 'Restaurants', icon: Utensils },
    { value: 'attraction', label: 'Attractions', icon: Camera },
    { value: 'shopping', label: 'Shopping', icon: ShoppingBag },
    { value: 'transport', label: 'Transport', icon: Train },
    { value: 'entertainment', label: 'Entertainment', icon: Coffee }
  ];

  const filteredAttractions = selectedCategory === 'all' 
    ? attractions 
    : attractions.filter(attraction => attraction.type === selectedCategory);

  const getAttractionIcon = (type: string) => {
    switch (type) {
      case 'restaurant':
        return <Utensils className="w-4 h-4" />;
      case 'attraction':
      case 'landmark':
        return <Camera className="w-4 h-4" />;
      case 'shopping':
        return <ShoppingBag className="w-4 h-4" />;
      case 'transport':
        return <Train className="w-4 h-4" />;
      case 'entertainment':
        return <Coffee className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  const getTransportIcon = (type: string) => {
    switch (type) {
      case 'airport':
        return <Plane className="w-4 h-4" />;
      case 'train':
        return <Train className="w-4 h-4" />;
      case 'metro':
        return <Navigation className="w-4 h-4" />;
      case 'bus':
        return <Car className="w-4 h-4" />;
      default:
        return <Car className="w-4 h-4" />;
    }
  };

  const getWalkScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 70) return 'text-blue-600 bg-blue-100';
    if (score >= 50) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getWalkScoreLabel = (score: number) => {
    if (score >= 90) return "Walker's Paradise";
    if (score >= 70) return 'Very Walkable';
    if (score >= 50) return 'Somewhat Walkable';
    return 'Car-Dependent';
  };

  return (
    <div id="area-info" className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Area information</h2>
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-5 h-5 text-gray-500" />
          <span className="text-lg font-medium text-gray-900">{neighborhood}</span>
        </div>
        <p className="text-gray-700 leading-relaxed">{description}</p>
      </div>

      {/* Walk Score */}
      {walkScore && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Walk Score</h3>
              <p className="text-sm text-gray-600">How walkable is this area?</p>
            </div>
            <div className="text-right">
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getWalkScoreColor(walkScore)}`}>
                {walkScore}/100
              </div>
              <p className="text-sm text-gray-600 mt-1">{getWalkScoreLabel(walkScore)}</p>
            </div>
          </div>
        </div>
      )}

      {/* Transport Options */}
      {transport.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Car className="w-5 h-5" />
            Transportation
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {transport.map((option, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                {getTransportIcon(option.type)}
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{option.name}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{option.distance}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{option.travelTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.value;
            
            return (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                  isActive
                    ? 'bg-blue-50 border-blue-200 text-blue-700'
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{category.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Attractions List */}
      <div className="space-y-4">
        {filteredAttractions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <MapPin className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No {selectedCategory === 'all' ? 'attractions' : selectedCategory + 's'} found in this area.</p>
          </div>
        ) : (
          filteredAttractions.map((attraction) => (
            <div key={attraction.id} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
              <div className="flex-shrink-0 p-2 bg-gray-100 rounded-lg">
                {getAttractionIcon(attraction.type)}
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900">{attraction.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      {attraction.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium text-gray-700">{attraction.rating}</span>
                        </div>
                      )}
                      {attraction.priceLevel && (
                        <span className="text-sm text-gray-600">{attraction.priceLevel}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{attraction.distance}</span>
                    </div>
                    {attraction.walkingTime && (
                      <div className="flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" />
                        <span>{attraction.walkingTime} walk</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <p className="text-gray-700 text-sm">{attraction.description}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Map Integration Placeholder */}
      <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
        <div className="text-center">
          <MapPin className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <h3 className="font-semibold text-gray-900 mb-2">Interactive Map</h3>
          <p className="text-gray-600 mb-4">
            View all nearby attractions, restaurants, and transportation options on an interactive map.
          </p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            View on Map
          </button>
        </div>
      </div>
    </div>
  );
};

export default AreaInfo;
