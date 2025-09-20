import { useLocation } from '@tanstack/react-router';
import { 
  getFooterSections, 
  getMobileDrawerSections, 
  getSectionById, 
  getLinkById,
  type SectionConfig,
  type LinkConfig 
} from '~/data/app-links-config';

export const useAppLinks = () => {
  const location = useLocation();
  
  // Extract current locale from pathname
  const currentLocale = location.pathname.split('/')[1] || 'en';

  const getLocalizedHref = (link: LinkConfig) => {
    if (link.isExternal || link.href.startsWith('#') || link.href.startsWith('mailto:') || link.href.startsWith('tel:')) {
      return link.href;
    }
    return `/${currentLocale}${link.href}`;
  };

  const handleLinkNavigation = (link: LinkConfig, navigate: (to: string) => void) => {
    if (link.isExternal || link.openInNewTab) {
      window.open(link.href, '_blank');
    } else {
      navigate(getLocalizedHref(link));
    }
  };

  return {
    currentLocale,
    getFooterSections,
    getMobileDrawerSections,
    getSectionById,
    getLinkById,
    getLocalizedHref,
    handleLinkNavigation,
  };
};
