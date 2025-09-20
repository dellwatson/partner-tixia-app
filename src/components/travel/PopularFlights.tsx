import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Plane, Clock, Calendar, Users } from 'lucide-react';
import { Card, CardContent } from '~/components/ui/card';
import { Button } from '~/components/ui/button';

const popularFlights = [
  {
    id: 1,
    airline: 'Emirates',
    flightNumber: 'EK 205',
    from: 'New York',
    to: 'Dubai',
    fromCode: 'JFK',
    toCode: 'DXB',
    departure: '14:30',
    arrival: '23:45+1',
    duration: '12h 15m',
    price: 899,
    stops: 'Non-stop',
    aircraft: 'Boeing 777-300ER',
    logo: 'https://logos-world.net/wp-content/uploads/2020/03/Emirates-Logo.png'
  },
  {
    id: 2,
    airline: 'Singapore Airlines',
    flightNumber: 'SQ 25',
    from: 'Singapore',
    to: 'London',
    fromCode: 'SIN',
    toCode: 'LHR',
    departure: '23:55',
    arrival: '06:10+1',
    duration: '13h 15m',
    price: 1299,
    stops: 'Non-stop',
    aircraft: 'Airbus A350-900',
    logo: 'https://1000logos.net/wp-content/uploads/2020/04/Singapore-Airlines-Logo.png'
  },
  {
    id: 3,
    airline: 'Lufthansa',
    flightNumber: 'LH 441',
    from: 'Frankfurt',
    to: 'Los Angeles',
    fromCode: 'FRA',
    toCode: 'LAX',
    departure: '10:25',
    arrival: '13:50',
    duration: '11h 25m',
    price: 799,
    stops: 'Non-stop',
    aircraft: 'Airbus A380-800',
    logo: 'https://logos-world.net/wp-content/uploads/2020/03/Lufthansa-Logo.png'
  }
];

export const PopularFlights = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Popular flights near you
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find and compare cheap flights from top airlines
          </p>
        </div>
        
        <div className="space-y-6">
          {popularFlights.map((flight, index) => (
            <motion.div
              key={flight.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Plane className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{flight.airline}</p>
                          <p className="text-sm text-gray-500">{flight.flightNumber}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-8">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">{flight.departure}</p>
                          <p className="text-sm text-gray-500">{flight.fromCode}</p>
                          <p className="text-xs text-gray-400">{flight.from}</p>
                        </div>
                        
                        <div className="flex flex-col items-center">
                          <div className="flex items-center space-x-2 text-gray-400">
                            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                            <div className="w-16 h-px bg-gray-300"></div>
                            <Plane className="h-4 w-4 rotate-90" />
                            <div className="w-16 h-px bg-gray-300"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{flight.duration}</p>
                          <p className="text-xs text-green-600">{flight.stops}</p>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">{flight.arrival}</p>
                          <p className="text-sm text-gray-500">{flight.toCode}</p>
                          <p className="text-xs text-gray-400">{flight.to}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-3xl font-bold text-blue-600">${flight.price}</p>
                      <p className="text-sm text-gray-500 mb-3">per person</p>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        Select Flight
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Aircraft: {flight.aircraft}</span>
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Flexible dates
                        </span>
                        <span className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          1 adult
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
