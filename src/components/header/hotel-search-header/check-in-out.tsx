import { useState } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { CalendarRange2Months } from '~/components/ui/calendar-range-2-months';
import { SearchInputWrapper } from '~/components/ui/search-input-wrapper';

interface CheckInOutProps {
	checkIn: string;
	checkOut: string;
	onChange: (checkIn: string, checkOut: string) => void;
}

export const CheckInOut = ({ checkIn, checkOut, onChange }: CheckInOutProps) => {
	const { t } = useTranslation();
	const [isOpen, setIsOpen] = useState(false);
	const [dateRange, setDateRange] = useState<DateRange | undefined>(() => {
		if (checkIn && checkOut) {
			return {
				from: new Date(checkIn),
				to: new Date(checkOut),
			};
		}
		return undefined;
	});
	const [hoverDate, setHoverDate] = useState<Date | undefined>(undefined);


	const handleDateSelect = (selectedDate: Date) => {
		// Case 4: If both dates exist, reset with new start date
		if (dateRange?.from && dateRange?.to) {
			const newRange = { from: selectedDate, to: undefined };
			setDateRange(newRange);
			setHoverDate(undefined);
			onChange(format(selectedDate, 'yyyy-MM-dd'), '');
			return;
		}

		// Case 1: No start date yet, set start date
		if (!dateRange?.from) {
			const newRange = { from: selectedDate, to: undefined };
			setDateRange(newRange);
			setHoverDate(undefined);
			onChange(format(selectedDate, 'yyyy-MM-dd'), '');
			return;
		}

		// Case 3: Start date exists, set end date
		if (dateRange.from && !dateRange.to) {
			// Ensure end date is after start date
			if (selectedDate >= dateRange.from) {
				const newRange = { from: dateRange.from, to: selectedDate };
				setDateRange(newRange);
				setHoverDate(undefined);
				onChange(format(dateRange.from, 'yyyy-MM-dd'), format(selectedDate, 'yyyy-MM-dd'));
				// Close when date selection is complete
				setIsOpen(false);
			} else {
				// If selected date is before start date, make it the new start date
				const newRange = { from: selectedDate, to: undefined };
				setDateRange(newRange);
				setHoverDate(undefined);
				onChange(format(selectedDate, 'yyyy-MM-dd'), '');
			}
		}
	};

	const handleDateHover = (date: Date | undefined) => {
		// Case 2: Show preview range when start date exists but end date doesn't
		if (dateRange?.from && !dateRange?.to && date) {
			if (date >= dateRange.from) {
				setHoverDate(date);
			} else {
				setHoverDate(undefined);
			}
		} else {
			setHoverDate(undefined);
		}
	};

	// Calculate the display range (actual selection + hover preview)
	const getDisplayRange = (): DateRange | undefined => {
		if (dateRange?.from && dateRange?.to) {
			// Complete range selected
			return dateRange;
		}

		if (dateRange?.from && !dateRange?.to && hoverDate) {
			// Show preview range
			return { from: dateRange.from, to: hoverDate };
		}

		if (dateRange?.from && !dateRange?.to) {
			// Only start date selected
			return { from: dateRange.from, to: undefined };
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
		if (checkIn && checkOut) {
			return `${formatDisplayDate(checkIn)} — ${formatDisplayDate(checkOut)}`;
		}
		return t('check_in_out_placeholder', 'Check-in & Check-out date');
	};

	const today = new Date();
	today.setHours(0, 0, 0, 0);

	// Calendar content component
	const CalendarContent = () => (
		<div className="p-4">
			<CalendarRange2Months
				selected={getDisplayRange()}
				onDayClick={handleDateSelect}
				onDayMouseEnter={handleDateHover}
				disabled={{ before: today }}
				className="border-none p-0"
			/>
		</div>
	);

	return (
		<div className="relative flex-1">
			<SearchInputWrapper
				isOpen={isOpen}
				onOpenChange={setIsOpen}
				title="Select Check-in & Check-out Dates"
				content={<CalendarContent />}
				centered={true}
				popoverClassName="w-fit"
			>
				<button className="flex h-[48px] md:h-[56px] w-full cursor-pointer items-center gap-3 bg-white px-4 md:px-6 py-3 md:py-4 text-left focus:outline-none hover:bg-gray-50 transition-colors">
					<CalendarIcon className="h-5 w-5 flex-shrink-0 text-gray-600" />
					<div className="flex min-w-0 flex-1 flex-col justify-center">
						{checkIn && checkOut ? (
							<>
								<div className="mb-1 text-sm text-gray-600">Check-in — Check-out</div>
								<div className="truncate text-base font-medium">{getDisplayText()}</div>
							</>
						) : (
							<div className="text-base font-medium text-gray-900">
								{t('check_in_out_placeholder', 'Check-in & Check-out date')}
							</div>
						)}
					</div>
				</button>
			</SearchInputWrapper>
		</div>
	);
};
