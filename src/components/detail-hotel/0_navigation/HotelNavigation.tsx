import { cn } from '~/lib/utils';
import { Container } from '~/components/ui/container';
import { 
	Breadcrumb, 
	BreadcrumbList, 
	BreadcrumbItem, 
	BreadcrumbLink, 
	BreadcrumbSeparator, 
	BreadcrumbPage 
} from '~/components/ui/breadcrumb';
import { useNavigate } from '@tanstack/react-router';

interface HotelNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  hotelName: string;
  locale: string;
  countryId: string;
}

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'room', label: 'Room' },
  { id: 'location', label: 'Location' },
  { id: 'facilities', label: 'Facilities' },
  { id: 'policy', label: 'Policy' },
  { id: 'review', label: 'Review' },
];

export function HotelNavigation({ 
  activeTab, 
  setActiveTab, 
  hotelName, 
  locale, 
  countryId 
}: HotelNavigationProps) {
  const navigate = useNavigate();

  const scrollToSection = (tabId: string) => {
    setActiveTab(tabId);
    const element = document.getElementById(tabId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* Breadcrumb Navigation */}
      <Container>
        <div className="py-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  onClick={() => navigate({ to: '/$locale', params: { locale } })}
                  className="cursor-pointer"
                >
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  onClick={() =>
                    navigate({ to: '/$locale/hotels', params: { locale } })
                  }
                  className="cursor-pointer"
                >
                  Hotels
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  onClick={() =>
                    navigate({
                      to: '/$locale/hotels/$countryId',
                      params: { locale, countryId },
                    })
                  }
                  className="cursor-pointer capitalize"
                >
                  {countryId}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{hotelName}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </Container>

      {/* Sticky Navigation Tabs */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <Container>
          <div className="flex overflow-x-auto scrollbar-hide">
            <div className="flex space-x-8 py-4 min-w-max">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => scrollToSection(tab.id)}
                  className={cn(
                    'text-sm font-medium transition-colors whitespace-nowrap pb-2 border-b-2',
                    activeTab === tab.id
                      ? 'text-blue-600 border-blue-600'
                      : 'text-gray-600 border-transparent hover:text-gray-900'
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
