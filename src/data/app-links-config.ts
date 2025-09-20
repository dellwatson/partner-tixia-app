import { 
  Download, 
  Smartphone, 
  Mail, 
  Globe, 
  Shield, 
  FileText, 
  Users, 
  MapPin, 
  HelpCircle, 
  Home,
  Building2,
  Briefcase,
  Phone
} from 'lucide-react';
import { 
  IconBrandWhatsapp, 
  IconBrandTiktok, 
  IconBrandInstagram, 
  IconBrandFacebook 
} from '@tabler/icons-react';

export interface LinkConfig {
  id: string;
  name: string;
  href: string;
  icon: any;
  label: string;
  enabled: boolean;
  position: number;
  openInNewTab?: boolean;
  isExternal?: boolean;
}

export interface SectionConfig {
  id: string;
  title: string;
  enabled: boolean;
  position: number;
  showInFooter: boolean;
  showInMobileDrawer: boolean;
  links: LinkConfig[];
}

export const APP_LINKS_CONFIG: SectionConfig[] = [
  {
    id: 'auth',
    title: 'Authentication',
    enabled: true,
    position: 1,
    showInFooter: false,
    showInMobileDrawer: true,
    links: [] // Auth is handled separately
  },
  {
    id: 'download',
    title: 'Mobile App',
    enabled: true,
    position: 3, // Move down since settings takes position 2
    showInFooter: true,
    showInMobileDrawer: true,
    links: [
      {
        id: 'google-play',
        name: 'Google Play',
        href: 'https://play.google.com/store/apps/details?id=com.tixia',
        icon: Smartphone,
        label: 'Download on Google Play',
        enabled: true,
        position: 1,
        openInNewTab: true,
        isExternal: true
      },
      {
        id: 'app-store',
        name: 'App Store',
        href: 'https://apps.apple.com/app/tixia/id123456789',
        icon: Download,
        label: 'Download on App Store',
        enabled: true,
        position: 2,
        openInNewTab: true,
        isExternal: true
      }
    ]
  },
  {
    id: 'about',
    title: 'About Tixia',
    enabled: true,
    position: 4,
    showInFooter: true,
    showInMobileDrawer: true,
    links: [
      {
        id: 'about-us',
        name: 'About Us',
        href: '/about',
        icon: Users,
        label: 'About Us',
        enabled: true,
        position: 1,
        openInNewTab: false,
        isExternal: false
      },
      {
        id: 'careers',
        name: 'Careers',
        href: '/careers',
        icon: Briefcase,
        label: 'Careers',
        enabled: true,
        position: 2,
        openInNewTab: false,
        isExternal: false
      },
      {
        id: 'press',
        name: 'Press',
        href: '/press',
        icon: FileText,
        label: 'Press',
        enabled: true,
        position: 3,
        openInNewTab: false,
        isExternal: false
      },
      {
        id: 'blog',
        name: 'Blog',
        href: '/blog',
        icon: FileText,
        label: 'Blog',
        enabled: false, // Disabled for now
        position: 4,
        openInNewTab: false,
        isExternal: false
      }
    ]
  },
  {
    id: 'support',
    title: 'Support',
    enabled: true,
    position: 5,
    showInFooter: true,
    showInMobileDrawer: true,
    links: [
      {
        id: 'whatsapp',
        name: 'WhatsApp Support',
        href: 'https://wa.me/6281232223232',
        icon: IconBrandWhatsapp,
        label: 'WhatsApp Support',
        enabled: true,
        position: 1,
        openInNewTab: true,
        isExternal: true
      },
      {
        id: 'email',
        name: 'Email Support',
        href: 'mailto:support@tixia.com',
        icon: Mail,
        label: 'Email Support',
        enabled: true,
        position: 2,
        openInNewTab: true,
        isExternal: true
      },
      {
        id: 'help-center',
        name: 'Help & Support',
        href: '/contact',
        icon: HelpCircle,
        label: 'Help & Support',
        enabled: true,
        position: 3,
        openInNewTab: false,
        isExternal: false
      },
      {
        id: 'phone-support',
        name: 'Phone Support',
        href: 'tel:+6281232223232',
        icon: Phone,
        label: 'Phone Support',
        enabled: false, // Disabled for now
        position: 4,
        openInNewTab: false,
        isExternal: true
      }
    ]
  },
  {
    id: 'legal',
    title: 'Legal',
    enabled: true,
    position: 6,
    showInFooter: true,
    showInMobileDrawer: true,
    links: [
      {
        id: 'privacy',
        name: 'Privacy Policy',
        href: '/privacy',
        icon: Shield,
        label: 'Privacy Policy',
        enabled: true,
        position: 1,
        openInNewTab: false,
        isExternal: false
      },
      {
        id: 'terms',
        name: 'Terms of Service',
        href: '/terms',
        icon: FileText,
        label: 'Terms of Service',
        enabled: true,
        position: 2,
        openInNewTab: false,
        isExternal: false
      },
      {
        id: 'cookies',
        name: 'Cookie Policy',
        href: '/cookies',
        icon: Shield,
        label: 'Cookie Policy',
        enabled: false, // Disabled for now
        position: 3,
        openInNewTab: false,
        isExternal: false
      }
    ]
  },
  {
    id: 'partner',
    title: 'Partner',
    enabled: true,
    position: 7,
    showInFooter: true,
    showInMobileDrawer: true,
    links: [
      {
        id: 'list-property',
        name: 'List your property',
        href: '/list-property',
        icon: Home,
        label: 'List your property',
        enabled: true,
        position: 1,
        openInNewTab: false,
        isExternal: false
      },
      {
        id: 'become-partner',
        name: 'Become a Partner',
        href: '/partner',
        icon: Users,
        label: 'Become a Partner',
        enabled: true,
        position: 2,
        openInNewTab: false,
        isExternal: false
      },
      {
        id: 'affiliate',
        name: 'Affiliate Program',
        href: '/affiliate',
        icon: Globe,
        label: 'Affiliate Program',
        enabled: false, // Disabled for now
        position: 3,
        openInNewTab: false,
        isExternal: false
      }
    ]
  },
  {
    id: 'social',
    title: 'Follow Us',
    enabled: true,
    position: 8,
    showInFooter: true,
    showInMobileDrawer: true,
    links: [
      {
        id: 'tiktok',
        name: 'TikTok',
        href: 'https://www.tiktok.com/@tixia',
        icon: IconBrandTiktok,
        label: 'TikTok',
        enabled: true,
        position: 1,
        openInNewTab: true,
        isExternal: true
      },
      {
        id: 'instagram',
        name: 'Instagram',
        href: 'https://instagram.com/tixia',
        icon: IconBrandInstagram,
        label: 'Instagram',
        enabled: true,
        position: 2,
        openInNewTab: true,
        isExternal: true
      },
      {
        id: 'facebook',
        name: 'Facebook',
        href: 'https://facebook.com/tixia',
        icon: IconBrandFacebook,
        label: 'Facebook',
        enabled: true,
        position: 3,
        openInNewTab: true,
        isExternal: true
      }
    ]
  },
  {
    id: 'settings',
    title: 'Settings',
    enabled: true,
    position: 2, // Move to position 2 to be right after auth
    showInFooter: false, // Remove from footer
    showInMobileDrawer: true,
    links: [
      {
        id: 'language',
        name: 'Language',
        href: '#',
        icon: Globe,
        label: 'Language',
        enabled: true,
        position: 1,
        openInNewTab: false,
        isExternal: false
      },
      {
        id: 'currency',
        name: 'Currency',
        href: '#',
        icon: MapPin,
        label: 'Currency',
        enabled: true,
        position: 2,
        openInNewTab: false,
        isExternal: false
      }
    ]
  }
];

// Helper functions to get filtered and sorted data
export const getEnabledSections = (showInFooter?: boolean, showInMobileDrawer?: boolean) => {
  return APP_LINKS_CONFIG
    .filter(section => {
      if (!section.enabled) return false;
      if (showInFooter !== undefined && section.showInFooter !== showInFooter) return false;
      if (showInMobileDrawer !== undefined && section.showInMobileDrawer !== showInMobileDrawer) return false;
      return true;
    })
    .sort((a, b) => a.position - b.position)
    .map(section => ({
      ...section,
      links: section.links
        .filter(link => link.enabled)
        .sort((a, b) => a.position - b.position)
    }));
};

export const getSectionById = (id: string) => {
  return APP_LINKS_CONFIG.find(section => section.id === id);
};

export const getLinkById = (sectionId: string, linkId: string) => {
  const section = getSectionById(sectionId);
  return section?.links.find(link => link.id === linkId);
};

// Get sections for footer
export const getFooterSections = () => getEnabledSections(true);

// Get sections for mobile drawer
export const getMobileDrawerSections = () => getEnabledSections(undefined, true);
