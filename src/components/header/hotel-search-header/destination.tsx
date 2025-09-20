import { useState } from 'react';
import { Building, MapPin, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SearchInputWrapper } from '~/components/ui/search-input-wrapper';

interface Destination {
  name: string;
  country: string;
  code?: string;
}

interface DestinationProps {
  value: string;
  onChange: (value: string, country?: string) => void;
  placeholder?: string;
}

const TRENDING_DESTINATIONS: Destination[] = [
  { name: 'Jakarta', country: 'Indonesia', code: 'JKT' },
  // { name: 'Yogyakarta', country: 'Indonesia', code: 'YOG' },
  // { name: 'Bandung', country: 'Indonesia', code: 'BDG' },
  { name: 'Tokyo', country: 'Japan', code: 'TYO' },
  // { name: 'Tangerang', country: 'Indonesia', code: 'TNG' },
  { name: 'Singapore', country: 'Singapore', code: 'SIN' },
  { name: 'Kuala Lumpur', country: 'Malaysia', code: 'KUL' },
  { name: 'Bangkok', country: 'Thailand', code: 'BKK' },
];

export const Destination = ({ value, onChange, placeholder }: DestinationProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [filteredDestinations, setFilteredDestinations] = useState(TRENDING_DESTINATIONS);


  const handleInputChange = (inputValue: string) => {
    onChange(inputValue);
    
    // Filter destinations based on input
    const filtered = TRENDING_DESTINATIONS.filter(dest =>
      dest.name.toLowerCase().includes(inputValue.toLowerCase()) ||
      dest.country.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredDestinations(filtered);
    
    // Auto-detect country from common patterns
    let country = '';
    const lowerValue = inputValue.toLowerCase();
    if (lowerValue.includes('bali') || lowerValue.includes('jakarta') || lowerValue.includes('bandung')) {
      country = 'indonesia';
    } else if (lowerValue.includes('singapore')) {
      country = 'singapore';
    } else if (lowerValue.includes('kuala lumpur') || lowerValue.includes('malaysia')) {
      country = 'malaysia';
    } else if (lowerValue.includes('tokyo') || lowerValue.includes('japan')) {
      country = 'japan';
    }
    
    if (country) {
      onChange(inputValue, country);
    }
  };

  const handleDestinationSelect = (destination: Destination) => {
    onChange(destination.name, destination.country.toLowerCase());
    setIsOpen(false);
  };


  // Destination content with input field and suggestions
  const DestinationContent = () => (
    <div className="p-4">
      {/* Input field for typing */}
      <div className="mb-4">
        <input
          type="text"
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder={placeholder || t('search_destination', 'Where are you going?')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          autoFocus
        />
      </div>
      
      {/* Destination suggestions */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          {value ? 'Search results' : 'Trending destinations'}
        </h3>
        <div className="space-y-2">
          {filteredDestinations.map((destination, index) => (
            <button
              key={index}
              onClick={() => handleDestinationSelect(destination)}
              className="w-full flex items-center p-2 hover:bg-gray-50 rounded-md text-left transition-colors"
            >
              <MapPin className="h-4 w-4 text-gray-400 mr-3 flex-shrink-0" />
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {destination.name}
                </div>
                <div className="text-xs text-gray-500">
                  {destination.country}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // Determine if we need scroll behavior (only if more than 5 items)
  const needsScroll = filteredDestinations.length > 5;
  const popoverClass = needsScroll ? "w-96 max-h-80 overflow-y-auto" : "w-96";

  return (
    <div className="relative flex-1">
      <SearchInputWrapper
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        title="Select destination"
        content={<DestinationContent />}
        centered={true}
        popoverClassName={popoverClass}
      >
        <button className="w-full flex items-center gap-3 px-4 md:px-6 py-3 md:py-4 bg-white hover:bg-gray-50 transition-colors text-left focus:outline-none h-[48px] md:h-[56px] cursor-pointer">
          <Building className="w-5 h-5 text-gray-600 flex-shrink-0" />
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            {value ? (
              <>
                <div className="text-sm text-gray-600 mb-1">
                  Destination
                </div>
                <div className="text-base font-medium truncate">
                  {value}
                </div>
              </>
            ) : (
              <div className="text-base font-medium text-gray-900">
                {placeholder || t('search_destination', 'Where are you going?')}
              </div>
            )}
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
        </button>
      </SearchInputWrapper>
    </div>
  );
};
