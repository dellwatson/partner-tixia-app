import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface HeroTitleProps {
  activeMode: 'stays' | 'flights';
}

export const HeroTitle = ({ activeMode }: HeroTitleProps) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-3xl md:text-5xl font-bold mb-4">
        {activeMode === 'stays' 
          ? t('hero_title', 'Find your next stay') 
          : 'Compare and book cheap flights with ease'
        }
      </h1>
      <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
        {activeMode === 'stays'
          ? t('hero_subtitle', 'Search low prices on hotels, homes and much more...')
          : 'Discover your next flight. Compare from hundreds of travel sites at once.'
        }
      </p>
    </motion.div>
  );
};
