import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Camera, Mountain, Waves, Building2, TreePine, Compass } from 'lucide-react';
import { Card } from '~/components/ui/card';

export const ExperienceCategories = () => {
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
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t('experiences')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('experiences_subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {Object.entries(categoryIcons).map(([category, IconComponent], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="group cursor-pointer"
            >
              <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 group-hover:bg-blue-50">
                <div className="bg-blue-100 group-hover:bg-blue-200 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                  <IconComponent className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 capitalize">{t(category)}</h3>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
