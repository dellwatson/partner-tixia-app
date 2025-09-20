import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { TextureButton } from '~/components/ui/texture-button';
import { ImageWithLoading } from '~/components/ui/image-with-loading';
import { 
  Wifi, 
  Car, 
  Coffee, 
  Dumbbell, 
  Utensils,
  Waves,
  Bed,
  Bath,
  Tv,
  Phone,
  Shield,
  Accessibility,
  Leaf,
  Users,
  MapPin,
  Clock,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface DetailedFacilitiesProps {
  facilities: Array<{
    id: string;
    name: string;
    category: string;
    description: string;
    available: boolean;
    isPaid: boolean;
    hours?: string;
  }>;
  companyInfo: {
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
  };
}

const facilityIcons: Record<string, any> = {
  'internet': Wifi,
  'wellness': Waves,
  'business': Users,
  'food': Utensils,
  'general': Bed,
  'accessibility': Accessibility,
  'safety': Shield,
  'sustainability': Leaf,
};

const mockFacilityImages = [
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop',
];

const mockPopularFacilities = [
  { name: 'Outdoor swimming pool', icon: Waves },
  { name: 'Non-smoking rooms', icon: Shield },
  { name: 'Fitness center', icon: Dumbbell },
  { name: 'Free parking', icon: Car },
  { name: 'Spa', icon: Waves },
  { name: 'Room service', icon: Utensils },
  { name: '7 restaurants', icon: Utensils },
  { name: 'Bar', icon: Coffee },
];

const mockDetailedFacilities = {
  'Great for your stay': [
    'Private bathroom',
    '7 restaurants',
    'Air conditioning',
    'Fitness center',
    'Spa',
    'Family rooms',
    'View',
    'Parking',
    'Flat-screen TV',
    'Non-smoking rooms'
  ],
  'Media & Technology': [
    'Flat-screen TV',
    'Cable channels',
    'Satellite channels',
    'Radio',
    'Telephone',
    'TV'
  ],
  'General': [
    'Shared lounge/TV area',
    'Designated smoking area',
    'Air conditioning',
    'Smoke-free property',
    'Wake-up service',
    'Laptop safe',
    'Carpeted',
    'Elevator',
    'Family rooms',
    'Ironing facilities',
    'Non-smoking rooms',
    'Iron',
    'Wake-up service/Alarm clock',
    'Room service'
  ],
  'Bathroom': [
    'Toilet paper',
    'Towels',
    'Slippers',
    'Private bathroom',
    'Toilet',
    'Free toiletries',
    'Bathrobe',
    'Hairdryer'
  ],
  'Bedroom': [
    'Linens',
    'Wardrobe or closet',
    'Alarm clock'
  ],
  'Food & Drink': [
    'Fruit (Additional charge)',
    'Wine/Champagne (Additional charge)',
    'Kids\' meals (Additional charge)',
    'Snack bar',
    'Breakfast in the room',
    'Bar',
    'Minibar',
    'Restaurant'
  ],
  'Internet': [
    'Wired internet is available in all areas and is free of charge.'
  ],
  'Parking': [
    'Free public parking is available on site (reservation is not needed).',
    'Valet parking'
  ],
  'Front Desk Services': [
    'Concierge',
    'Baggage storage'
  ],
  'Outdoor swimming pool': [
    'Open all year',
    'All ages welcome',
    'Shallow end'
  ],
  'Spa': [
    'Kids\' pool',
    'Fitness',
    'Spa/Wellness packages',
    'Spa lounge/Relaxation area',
    'Spa facilities',
    'Light therapy'
  ]
};

export function DetailedFacilities({ facilities, companyInfo }: DetailedFacilitiesProps) {
  const [showAllFacilities, setShowAllFacilities] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  return (
    <div className="space-y-8">
      {/* Most Popular Facilities */}
      <Card>
        <CardHeader>
          <CardTitle>Most popular facilities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {mockPopularFacilities.map((facility, index) => {
              const IconComponent = facility.icon;
              return (
                <div key={index} className="flex items-center gap-2 p-2">
                  <IconComponent className="w-5 h-5 text-green-600" />
                  <span className="text-sm">{facility.name}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Facility Images */}
      <Card>
        <CardHeader>
          <CardTitle>All facilities in {companyInfo.managementCompany}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            {mockFacilityImages.map((image, index) => (
              <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                <ImageWithLoading
                  src={image}
                  alt={`Facility ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {['Bar, Café and Lounge', 'Swimming Pool', 'Entertainment Facility', 'Fitness Center', 'Lobby'][index]}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Facilities List */}
      <Card>
        <CardHeader>
          <CardTitle>All facilities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(mockDetailedFacilities).map(([category, items]) => (
              <div key={category}>
                <button
                  onClick={() => toggleSection(category)}
                  className="flex items-center justify-between w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {facilityIcons[category.toLowerCase()] && (
                      <div className="p-2 bg-blue-100 rounded-lg">
                        {React.createElement(facilityIcons[category.toLowerCase()], { 
                          className: "w-5 h-5 text-blue-600" 
                        })}
                      </div>
                    )}
                    <span className="font-medium">{category}</span>
                  </div>
                  {expandedSections.has(category) ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                
                {expandedSections.has(category) && (
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 pl-4">
                    {items.map((item, index) => (
                      <div key={index} className="flex items-center gap-2 py-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Company Information */}
      <Card>
        <CardHeader>
          <CardTitle>About {companyInfo.managementCompany}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <p className="text-gray-700">{companyInfo.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Contact Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{companyInfo.contactInfo.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{companyInfo.contactInfo.address}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Certifications & Awards</h4>
                <div className="space-y-2">
                  {companyInfo.certifications.map((cert, index) => (
                    <Badge key={index} variant="secondary" className="mr-2 mb-2">
                      {cert}
                    </Badge>
                  ))}
                </div>
                <div className="mt-4 space-y-1">
                  {companyInfo.awards.map((award, index) => (
                    <div key={index} className="text-sm text-gray-600">
                      🏆 {award.name} ({award.year})
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
