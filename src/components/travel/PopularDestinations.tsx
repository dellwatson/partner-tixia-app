import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from '@tanstack/react-router';
import { Star, Camera, Mountain, Waves, Building2, TreePine, Compass } from 'lucide-react';
import { Card, CardContent } from '~/components/ui/card';
import { destinations } from '~/data/mockData';
import { Destination } from '~/data/mockData';

export const PopularDestinations = () => {
  const { t } = useTranslation();

  const categoryIcons = {
    beach: Waves,
    mountain: Mountain,
    city: Building2,
    nature: TreePine,
    adventure: Compass,
    culture: Camera
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t('popular_destinations')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('destinations_subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.slice(0, 6).map((destination: Destination, index: number) => {
            const IconComponent = categoryIcons[destination.category as keyof typeof categoryIcons] || Camera;
            
            return (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
              >
                <Link to={`/search/stays?destination=${encodeURIComponent(destination.name)}&city=${encodeURIComponent(destination.name)}`}>
                  <Card className="overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300">
                  <div className="relative h-64">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                        <IconComponent className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                        ${destination.basePrice}/night
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{destination.name}</h3>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm text-gray-600">{destination.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{destination.country}</p>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {destination.description}
                    </p>
                  </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
