import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from '@tanstack/react-router';
import { Plane, Clock, MapPin } from 'lucide-react';
import { Card, CardContent } from '~/components/ui/card';

const flightDestinations = [
  {
    id: 1,
    from: 'New York',
    to: 'London',
    fromCode: 'NYC',
    toCode: 'LHR',
    price: 299,
    duration: '7h 30m',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop',
    popular: true
  },
  {
    id: 2,
    from: 'Los Angeles',
    to: 'Tokyo',
    fromCode: 'LAX',
    toCode: 'NRT',
    price: 599,
    duration: '11h 45m',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop',
    popular: true
  },
  {
    id: 3,
    from: 'Paris',
    to: 'Dubai',
    fromCode: 'CDG',
    toCode: 'DXB',
    price: 449,
    duration: '6h 20m',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop',
    popular: true
  },
  {
    id: 4,
    from: 'Singapore',
    to: 'Sydney',
    fromCode: 'SIN',
    toCode: 'SYD',
    price: 399,
    duration: '8h 15m',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    popular: true
  },
  {
    id: 5,
    from: 'Miami',
    to: 'Barcelona',
    fromCode: 'MIA',
    toCode: 'BCN',
    price: 379,
    duration: '8h 45m',
    image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400&h=300&fit=crop',
    popular: true
  },
  {
    id: 6,
    from: 'Bangkok',
    to: 'Mumbai',
    fromCode: 'BKK',
    toCode: 'BOM',
    price: 199,
    duration: '3h 30m',
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400&h=300&fit=crop',
    popular: true
  }
];

export const FlightDestinations = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Popular flight destinations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover amazing destinations with our best flight deals
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {flightDestinations.map((flight, index) => (
            <motion.div
              key={flight.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <Link to={`/search/flights?from=${encodeURIComponent(flight.from)}&to=${encodeURIComponent(flight.to)}`}>
                <Card className="overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300">
                  <div className="relative h-48">
                    <img
                      src={flight.image}
                      alt={`${flight.from} to ${flight.to}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                        <Plane className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        From ${flight.price}
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-gray-900">{flight.fromCode}</span>
                        <Plane className="h-4 w-4 text-gray-400 rotate-90" />
                        <span className="text-lg font-bold text-gray-900">{flight.toCode}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-1" />
                        <span className="text-sm">{flight.duration}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">{flight.from}</p>
                        <p className="text-gray-600 text-sm">{flight.to}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">${flight.price}</p>
                        <p className="text-sm text-gray-500">per person</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
