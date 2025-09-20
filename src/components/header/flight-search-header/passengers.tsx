import { useState, useRef, useEffect } from 'react';
import { Users, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SearchInputWrapper } from '~/components/ui/search-input-wrapper';
import { PassengerContent, type PassengerData } from './passenger-content';

interface PassengersProps {
  passengers: PassengerData;
  onChange: (passengers: PassengerData) => void;
}

export const Passengers = ({ passengers, onChange }: PassengersProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);


  const updateAdults = (count: number) => {
    if (count >= 1 && count <= 9) {
      onChange({ ...passengers, adults: count });
    }
  };

  const updateChildren = (count: number) => {
    if (count >= 0 && count <= 8) {
      const newAges = [...passengers.childrenAges];
      if (count > passengers.children) {
        // Adding children - add default ages
        for (let i = passengers.children; i < count; i++) {
          newAges.push(12); // Default age
        }
      } else if (count < passengers.children) {
        // Removing children - remove ages from end
        newAges.splice(count);
      }
      onChange({ ...passengers, children: count, childrenAges: newAges });
    }
  };

  const updateChildAge = (index: number, age: number) => {
    const newAges = [...passengers.childrenAges];
    newAges[index] = age;
    onChange({ ...passengers, childrenAges: newAges });
  };

  const getTotalPassengers = () => {
    return passengers.adults + passengers.children;
  };

  const getDisplayText = () => {
    const total = getTotalPassengers();
    if (total === 1) {
      return `${total} ${t('traveller', 'traveller')}`;
    }
    return `${total} ${t('travellers', 'travellers')}`;
  };

  

  return (
    <div className="relative flex-1">
      <SearchInputWrapper
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        title="Select passengers"
        content={
          <PassengerContent
            passengers={passengers}
            updateAdults={updateAdults}
            updateChildren={updateChildren}
            updateChildAge={updateChildAge}
            getDisplayText={getDisplayText}
            onDone={() => setIsOpen(false)}
          />
        }
        centered={true}
        popoverClassName="w-80"
      >
        <button
          ref={buttonRef}
          className="w-full flex items-center gap-3 px-4 md:px-6 py-3 md:py-4 bg-white hover:bg-gray-50 transition-colors text-left focus:outline-none h-[48px] md:h-[56px]"
        >
          <Users className="w-5 h-5 text-gray-600 flex-shrink-0" />
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <div className="text-sm text-gray-600 mb-1">
              Passengers
            </div>
            <div className="text-base font-medium">
              {getDisplayText()}
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
        </button>
      </SearchInputWrapper>
    </div>
  );
};
