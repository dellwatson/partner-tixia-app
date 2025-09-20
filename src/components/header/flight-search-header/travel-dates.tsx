import { useState, useRef, useEffect } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { format, addDays } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { SearchInputWrapper } from '~/components/ui/search-input-wrapper';
import { CalendarContent } from './calendar-content';

interface TravelDatesProps {
  depart: string;
  return: string;
  tripType: 'ROUNDTRIP' | 'ONEWAY';
  onChange: (depart: string, returnDate: string) => void;
}

export const TravelDates = ({ depart, return: returnDate, tripType, onChange }: TravelDatesProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(() => {
    if (depart && returnDate && tripType === 'ROUNDTRIP') {
      return {
        from: new Date(depart),
        to: new Date(returnDate)
      };
    } else if (depart) {
      return {
        from: new Date(depart),
        to: undefined
      };
    }
    // Preset 1 week for round-trip when no dates
    if (tripType === 'ROUNDTRIP' && !depart && !returnDate) {
      const today = new Date();
      const nextWeek = addDays(today, 7);
      const newRange = { from: today, to: nextWeek };
      setDateRange(newRange);
      onChange(format(today, 'yyyy-MM-dd'), format(nextWeek, 'yyyy-MM-dd'));
      return newRange;
    }
    return undefined;
  });
  const [hoverDate, setHoverDate] = useState<Date | undefined>(undefined);
  
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto-preset 1 week when switching to round-trip
  useEffect(() => {
    if (tripType === 'ROUNDTRIP' && !depart && !returnDate) {
      const today = new Date();
      const nextWeek = addDays(today, 7);
      const newRange = { from: today, to: nextWeek };
      setDateRange(newRange);
      onChange(format(today, 'yyyy-MM-dd'), format(nextWeek, 'yyyy-MM-dd'));
    }
  }, [tripType, depart, returnDate, onChange]);

  const handleDateSelect = (selectedDate: Date) => {
    if (tripType === 'ONEWAY') {
      // One-way: just set departure date
      const newRange = { from: selectedDate, to: undefined };
      setDateRange(newRange);
      setHoverDate(undefined);
      onChange(format(selectedDate, 'yyyy-MM-dd'), '');
      setIsOpen(false);
      return;
    }

    // Round-trip logic (same as hotel check-in-out)
    if (dateRange?.from && dateRange?.to) {
      const newRange = { from: selectedDate, to: undefined };
      setDateRange(newRange);
      setHoverDate(undefined);
      onChange(format(selectedDate, 'yyyy-MM-dd'), '');
      return;
    }

    if (!dateRange?.from) {
      const newRange = { from: selectedDate, to: undefined };
      setDateRange(newRange);
      setHoverDate(undefined);
      onChange(format(selectedDate, 'yyyy-MM-dd'), '');
      return;
    }

    if (dateRange.from && !dateRange.to) {
      if (selectedDate >= dateRange.from) {
        const newRange = { from: dateRange.from, to: selectedDate };
        setDateRange(newRange);
        setHoverDate(undefined);
        onChange(
          format(dateRange.from, 'yyyy-MM-dd'),
          format(selectedDate, 'yyyy-MM-dd')
        );
        setIsOpen(false);
      } else {
        const newRange = { from: selectedDate, to: undefined };
        setDateRange(newRange);
        setHoverDate(undefined);
        onChange(format(selectedDate, 'yyyy-MM-dd'), '');
      }
    }
  };

  const handleDateHover = (date: Date | undefined) => {
    if (tripType === 'ROUNDTRIP' && dateRange?.from && !dateRange?.to && date) {
      if (date >= dateRange.from) {
        setHoverDate(date);
      } else {
        setHoverDate(undefined);
      }
    } else {
      setHoverDate(undefined);
    }
  };

  const getDisplayRange = (): DateRange | undefined => {
    if (dateRange?.from && dateRange?.to) {
      return dateRange;
    }
    
    if (tripType === 'ROUNDTRIP' && dateRange?.from && !dateRange?.to && hoverDate) {
      return { from: dateRange.from, to: hoverDate };
    }
    
    if (dateRange?.from) {
      return { from: dateRange.from, to: dateRange?.to };
    }
    
    return undefined;
  };

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return '';
    try {
      return format(new Date(dateStr), 'MMM dd');
    } catch {
      return dateStr;
    }
  };

  const getDisplayText = () => {
    if (tripType === 'ONEWAY') {
      return depart ? formatDisplayDate(depart) : t('departure_date', 'Departure date');
    }
    
    if (depart && returnDate) {
      return `${formatDisplayDate(depart)} — ${formatDisplayDate(returnDate)}`;
    }
    return t('travel_dates', 'Travel dates');
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Reusable calendar content moved to separate component

  if (tripType === 'ONEWAY') {
    return (
      <div className="relative flex-1">
        <SearchInputWrapper
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          title="Select departure date"
          content={
            <CalendarContent
              tripType={tripType}
              depart={depart}
              displayRange={getDisplayRange()}
              today={today}
              onSelectOneWay={(date) => onChange(format(date, 'yyyy-MM-dd'), '')}
              onDayClickRoundTrip={(date) => handleDateSelect(date)}
              onDayHoverRoundTrip={handleDateHover}
            />
          }
          mobileContent={
            <CalendarContent
              tripType={tripType}
              depart={depart}
              displayRange={getDisplayRange()}
              today={today}
              onSelectOneWay={(date) => onChange(format(date, 'yyyy-MM-dd'), '')}
              onDayClickRoundTrip={(date) => handleDateSelect(date)}
              onDayHoverRoundTrip={handleDateHover}
              isMobile={true}
            />
          }
          centered={true}
        >
          <button
            ref={buttonRef}
            className="w-full flex items-center gap-3 px-4 md:px-6 py-3 md:py-4 bg-white hover:bg-gray-50 transition-colors text-left focus:outline-none h-[48px] md:h-[56px]"
          >
            <CalendarIcon className="w-5 h-5 text-gray-600 flex-shrink-0" />
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              {depart ? (
                <>
                  <div className="text-sm text-gray-600 mb-1">
                    Departure
                  </div>
                  <div className="text-base font-medium">
                    {format(new Date(depart), 'MMM dd, yyyy')}
                  </div>
                </>
              ) : (
                <div className="text-base font-medium text-gray-900">
                  Select departure date
                </div>
              )}
            </div>
          </button>
        </SearchInputWrapper>
      </div>
    );
  }

  return (
    <div className="relative flex-1 border-0">
      <SearchInputWrapper
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        title="Select travel dates"
        content={
          <CalendarContent
            tripType={tripType}
            depart={depart}
            displayRange={getDisplayRange()}
            today={today}
            onSelectOneWay={(date) => onChange(format(date, 'yyyy-MM-dd'), '')}
            onDayClickRoundTrip={(date) => handleDateSelect(date)}
            onDayHoverRoundTrip={handleDateHover}
          />
        }
        mobileContent={
          <CalendarContent
            tripType={tripType}
            depart={depart}
            displayRange={getDisplayRange()}
            today={today}
            onSelectOneWay={(date) => onChange(format(date, 'yyyy-MM-dd'), '')}
            onDayClickRoundTrip={(date) => handleDateSelect(date)}
            onDayHoverRoundTrip={handleDateHover}
            isMobile={true}
          />
        }
        centered={true}
      >
        <button
          ref={buttonRef}
          className="w-full flex items-center gap-3 px-4 md:px-6 py-3 md:py-4 bg-white hover:bg-gray-50 transition-colors text-left focus:outline-none h-[48px] md:h-[56px]"
        >
          <CalendarIcon className="w-5 h-5 text-gray-600 flex-shrink-0" />
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <div className="text-sm text-gray-600 mb-1">
              Travel dates
            </div>
            <div className="text-base font-medium truncate">
              {depart && returnDate ? (
                `${format(new Date(depart), 'MMM dd')} - ${format(new Date(returnDate), 'MMM dd')}`
              ) : depart ? (
                `${format(new Date(depart), 'MMM dd')} - Return`
              ) : (
                'Select dates'
              )}
            </div>
          </div>
        </button>
      </SearchInputWrapper>
    </div>
  );
};
