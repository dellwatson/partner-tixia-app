import React from 'react';
import { DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import { CalendarRange2Months } from '~/components/ui/calendar-range-2-months';
import { Calendar } from '~/components/ui/calendar';

export interface CalendarContentProps {
  tripType: 'ROUNDTRIP' | 'ONEWAY';
  depart: string;
  displayRange?: DateRange;
  today: Date;
  onSelectOneWay: (date: Date) => void;
  onDayClickRoundTrip: (date: Date) => void;
  onDayHoverRoundTrip: (date: Date | undefined) => void;
  isMobile?: boolean;
}

export const CalendarContent: React.FC<CalendarContentProps> = ({
  tripType,
  depart,
  displayRange,
  today,
  onSelectOneWay,
  onDayClickRoundTrip,
  onDayHoverRoundTrip,
  isMobile = false,
}) => {
  if (tripType === 'ONEWAY') {
    return (
      <div className="p-4">
        <Calendar
          mode="single"
          selected={depart ? new Date(depart) : undefined}
          onSelect={(date) => {
            if (date) {
              onSelectOneWay(date);
            }
          }}
          disabled={{ before: today }}
          className="border-none p-0"
        />
      </div>
    );
  }

  return (
    <div className="p-4">
      <CalendarRange2Months
        selected={displayRange}
        onDayClick={(date) => onDayClickRoundTrip(date)}
        onDayMouseEnter={onDayHoverRoundTrip}
        disabled={{ before: today }}
        className="border-none p-0"
        numberOfMonths={isMobile ? 1 : 2}
      />
    </div>
  );
};
