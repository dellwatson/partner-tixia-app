import { type MetaFunction, type LoaderFunctionArgs } from "react-router";
import { useLoaderData } from "react-router";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Star, MapPin, Wifi, Car, Coffee, Dumbbell } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: `${data?.city} - Hotels & Accommodations` },
    { name: "description", content: `Find the best hotels and accommodations in ${data?.city}. Book now for the best prices.` },
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const city = params.city;
  
  // Mock data for demonstration
  const cityData = {
    city: city?.charAt(0).toUpperCase() + city?.slice(1) || 'Unknown',
    country: city === 'tokyo' ? 'Japan' : city === 'paris' ? 'France' : city === 'london' ? 'United Kingdom' : 'Unknown',
    description: `Discover amazing accommodations in ${city}`,
    hotels: [
      {
        id: 1,
        name: `Grand Hotel ${city?.charAt(0).toUpperCase() + city?.slice(1)}`,
        rating: 4.8,
        reviews: 1234,
        price: 150,
        image: '/api/placeholder/300/200',
        amenities: ['wifi', 'parking', 'gym', 'restaurant'],
        location: 'City Center'
      },
      {
        id: 2,
        name: `Luxury Suites ${city?.charAt(0).toUpperCase() + city?.slice(1)}`,
        rating: 4.6,
        reviews: 856,
        price: 220,
        image: '/api/placeholder/300/200',
        amenities: ['wifi', 'spa', 'pool', 'restaurant'],
        location: 'Downtown'
      },
      {
        id: 3,
        name: `Boutique Inn ${city?.charAt(0).toUpperCase() + city?.slice(1)}`,
        rating: 4.4,
        reviews: 567,
        price: 95,
        image: '/api/placeholder/300/200',
        amenities: ['wifi', 'cafe', 'garden'],
        location: 'Historic District'
      }
    ]
  };
  
  return json(cityData);
}

const amenityIcons = {
  wifi: Wifi,
  parking: Car,
  cafe: Coffee,
  restaurant: Coffee,
  gym: Dumbbell,
  spa: Coffee,
  pool: Coffee,
  garden: Coffee
};

export default function CityPage() {
  const data = useLoaderData<typeof loader>();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
              <span>Home</span>
              <span>/</span>
              <span>Destinations</span>
              <span>/</span>
              <span className="text-gray-900">{data.city}</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Hotels in {data.city}
            </h1>
            <p className="text-gray-600 flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {data.city}, {data.country}
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Button variant="outline" size="sm">Price</Button>
            <Button variant="outline" size="sm">Rating</Button>
            <Button variant="outline" size="sm">Amenities</Button>
            <Button variant="outline" size="sm">Distance</Button>
          </div>

          {/* Hotels Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.hotels.map((hotel, index) => (
              <motion.div
                key={hotel.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-100 relative">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center mb-2 mx-auto">
                          <MapPin className="h-8 w-8 text-blue-600" />
                        </div>
                        <p className="text-sm font-medium">{hotel.name}</p>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
                        {hotel.name}
                      </h3>
                      <div className="flex items-center space-x-1 text-sm">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{hotel.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">{hotel.location}</p>
                    <p className="text-xs text-gray-500 mb-3">{hotel.reviews} reviews</p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {hotel.amenities.slice(0, 3).map((amenity) => {
                        const Icon = amenityIcons[amenity as keyof typeof amenityIcons] || Coffee;
                        return (
                          <Badge key={amenity} variant="secondary" className="text-xs">
                            <Icon className="h-3 w-3 mr-1" />
                            {amenity}
                          </Badge>
                        );
                      })}
                      {hotel.amenities.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{hotel.amenities.length - 3} more
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-2xl font-bold text-gray-900">${hotel.price}</span>
                        <span className="text-sm text-gray-500 ml-1">{t('per_night')}</span>
                      </div>
                      <Button 
                        size="sm" 
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                      >
                        {t('book_now')}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Hotels
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
