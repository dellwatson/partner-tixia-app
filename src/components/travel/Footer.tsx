import { useTranslation } from 'react-i18next';
import { Plane } from 'lucide-react';
import { Container } from '~/components/ui/container';

export const Footer = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-gray-900 text-white py-12">
      <Container variant="footer">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Plane className="h-8 w-8 text-blue-400 mr-2" />
              <span className="text-2xl font-bold">TravelHub</span>
            </div>
            <p className="text-gray-400">
              {t('footer_description')}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('destinations')}</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Europe</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Asia</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Americas</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Africa</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('company')}</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">{t('about')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('careers')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('press')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('contact')}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('support')}</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">{t('help_center')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('safety')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('cancellation')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('covid_response')}</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 TravelHub. {t('all_rights_reserved')}</p>
        </div>
      </Container>
    </footer>
  );
};
