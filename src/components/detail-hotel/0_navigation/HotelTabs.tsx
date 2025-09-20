import { cn } from '~/lib/utils';
import { Container } from '~/components/ui/container';

interface HotelTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const tabs = [
  { id: 'availability', label: 'Availability' },
  { id: 'overview', label: 'Overview' },
  { id: 'info', label: 'Info & prices' },
  { id: 'facilities', label: 'Facilities' },
  { id: 'rules', label: 'House rules' },
  { id: 'reviews', label: 'Guest reviews' },
  { id: 'location', label: 'Location' },
];

function HotelTabs({ activeTab, setActiveTab }: HotelTabsProps) {
  const scrollToSection = (tabId: string) => {
    setActiveTab(tabId);
    const element = document.getElementById(tabId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
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
  );
}

export default HotelTabs;
