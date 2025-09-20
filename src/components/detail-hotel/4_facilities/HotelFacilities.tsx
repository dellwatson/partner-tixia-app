import React, { useState } from 'react';
import { Wifi, Car, Coffee, Dumbbell, Waves, Utensils, Baby, Users, Shield, Clock, Zap, Wind, Snowflake, Tv, Bath, Bed } from 'lucide-react';

interface Facility {
  id: string;
  name: string;
  category: 'internet' | 'parking' | 'wellness' | 'food' | 'business' | 'family' | 'accessibility' | 'room' | 'general';
  description?: string;
  available: boolean;
  isPaid?: boolean;
  hours?: string;
}

interface HotelFacilitiesProps {
  facilities: Facility[];
}

const HotelFacilities: React.FC<HotelFacilitiesProps> = ({ facilities }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { value: 'all', label: 'All facilities', icon: Users },
    { value: 'internet', label: 'Internet', icon: Wifi },
    { value: 'parking', label: 'Parking', icon: Car },
    { value: 'wellness', label: 'Wellness', icon: Dumbbell },
    { value: 'food', label: 'Food & Drink', icon: Utensils },
    { value: 'business', label: 'Business', icon: Shield },
    { value: 'family', label: 'Family', icon: Baby },
    { value: 'accessibility', label: 'Accessibility', icon: Users },
    { value: 'room', label: 'Room features', icon: Bed }
  ];

  const getFacilityIcon = (facility: Facility) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      // Internet
      'wifi': <Wifi className="w-5 h-5" />,
      'free wifi': <Wifi className="w-5 h-5" />,
      'high-speed internet': <Zap className="w-5 h-5" />,
      
      // Parking
      'parking': <Car className="w-5 h-5" />,
      'free parking': <Car className="w-5 h-5" />,
      'valet parking': <Car className="w-5 h-5" />,
      
      // Wellness
      'fitness center': <Dumbbell className="w-5 h-5" />,
      'gym': <Dumbbell className="w-5 h-5" />,
      'swimming pool': <Waves className="w-5 h-5" />,
      'spa': <Bath className="w-5 h-5" />,
      'sauna': <Bath className="w-5 h-5" />,
      
      // Food & Drink
      'restaurant': <Utensils className="w-5 h-5" />,
      'bar': <Coffee className="w-5 h-5" />,
      'room service': <Utensils className="w-5 h-5" />,
      'breakfast': <Coffee className="w-5 h-5" />,
      
      // Business
      'business center': <Shield className="w-5 h-5" />,
      'meeting rooms': <Users className="w-5 h-5" />,
      'conference facilities': <Users className="w-5 h-5" />,
      
      // Family
      'kids club': <Baby className="w-5 h-5" />,
      'babysitting': <Baby className="w-5 h-5" />,
      'playground': <Baby className="w-5 h-5" />,
      
      // Room features
      'air conditioning': <Snowflake className="w-5 h-5" />,
      'heating': <Wind className="w-5 h-5" />,
      'tv': <Tv className="w-5 h-5" />,
      'minibar': <Coffee className="w-5 h-5" />,
      'safe': <Shield className="w-5 h-5" />
    };

    const key = facility.name.toLowerCase();
    return iconMap[key] || <Users className="w-5 h-5" />;
  };

  const filteredFacilities = selectedCategory === 'all' 
    ? facilities 
    : facilities.filter(facility => facility.category === selectedCategory);

  const availableFacilities = filteredFacilities.filter(f => f.available);
  const unavailableFacilities = filteredFacilities.filter(f => !f.available);

  return (
    <div id="facilities" className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Hotel facilities</h2>
        <p className="text-gray-600">Amenities and services available at this property</p>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.value;
            const categoryCount = category.value === 'all' 
              ? facilities.filter(f => f.available).length
              : facilities.filter(f => f.category === category.value && f.available).length;
            
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
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                  {categoryCount}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Available Facilities */}
      {availableFacilities.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Available facilities</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableFacilities.map((facility) => (
              <div key={facility.id} className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex-shrink-0 text-green-600">
                  {getFacilityIcon(facility)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-gray-900">{facility.name}</h4>
                    {facility.isPaid && (
                      <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded">
                        Paid
                      </span>
                    )}
                  </div>
                  
                  {facility.description && (
                    <p className="text-sm text-gray-600 mb-2">{facility.description}</p>
                  )}
                  
                  {facility.hours && (
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{facility.hours}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Unavailable Facilities */}
      {unavailableFacilities.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Not available</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {unavailableFacilities.map((facility) => (
              <div key={facility.id} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200 opacity-60">
                <div className="flex-shrink-0 text-gray-400">
                  {getFacilityIcon(facility)}
                </div>
                
                <div className="flex-1">
                  <h4 className="font-medium text-gray-600 line-through">{facility.name}</h4>
                  {facility.description && (
                    <p className="text-sm text-gray-500">{facility.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No facilities message */}
      {filteredFacilities.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No facilities found in this category.</p>
        </div>
      )}

      {/* Facility Legend */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <h4 className="font-medium text-blue-900 mb-2">Facility Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-blue-700">Available facilities</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-blue-700">Additional charges may apply</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              <span className="text-blue-700">Not available</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3 h-3 text-blue-600" />
              <span className="text-blue-700">Operating hours may vary</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelFacilities;
