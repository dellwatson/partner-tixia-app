"use client"

import { DateRange } from "react-day-picker"

import { Calendar } from "~/components/ui/calendar"

interface CalendarRange2MonthsProps {
  selected?: DateRange
  onSelect?: (date: DateRange | undefined) => void
  onDayClick?: (date: Date) => void
  onDayMouseEnter?: (date: Date | undefined) => void
  disabled?: any
  className?: string
}

export const CalendarRange2Months = ({
  selected,
  onSelect,
  onDayClick,
  onDayMouseEnter,
  disabled,
  className = ""
}: CalendarRange2MonthsProps) => {
  const handleSelect = (range: DateRange | undefined) => {
    if (onSelect) {
      onSelect(range);
    }
  };

  const handleDayClick = (date: Date) => {
    if (onDayClick) {
      onDayClick(date);
    }
  };

  const handleDayMouseEnter = (date: Date | undefined) => {
    if (onDayMouseEnter) {
      onDayMouseEnter(date);
    }
  };

  return (
    <div>
    <Calendar
      mode="range"
      selected={selected}
      onSelect={handleSelect}
      onDayClick={handleDayClick}
      onDayMouseEnter={handleDayMouseEnter}
      numberOfMonths={2}
      pagedNavigation
      showOutsideDays={false}
      disabled={disabled}
      modifiers={{
        range_start: selected?.from,
        range_end: selected?.to,
      }}
      className={`rounded-md border p-2 ${className}`}
      classNames={{
        months: "gap-8",
        month:
          "relative first-of-type:before:hidden before:absolute max-sm:before:inset-x-2 max-sm:before:h-px max-sm:before:-top-2 sm:before:inset-y-2 sm:before:w-px before:bg-border sm:before:-left-4",
      }}
    />
    </div>

  )
}
