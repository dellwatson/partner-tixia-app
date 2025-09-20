import { AirlineLogo } from './AirlineLogo';
import { formatTime12Hour, formatFlightDate, formatDuration } from './utils';

interface FlightSegmentProps {
	departureTime: string;
	arrivalTime: string;
	departureAirport: string;
	arrivalAirport: string;
	departureCity?: string;
	arrivalCity?: string;
	departureDate?: string;
	arrivalDate?: string;
	duration: string;
	stops: number;
	airlineCode: string;
	transitAirlineCode?: string; // For transit flights
	className?: string;
}

export function FlightSegment({
	departureTime,
	arrivalTime,
	departureAirport,
	arrivalAirport,
	departureCity,
	arrivalCity,
	departureDate,
	arrivalDate,
	duration,
	stops,
	airlineCode,
	transitAirlineCode,
	className = '',
}: FlightSegmentProps) {
	const isDirect = stops === 0;

	return (
		<div className={`flex items-center justify-between ${className}`}>
			{/* Left: Airline Logo + Departure Info */}
			<div className="flex items-start gap-3">
				<div className="flex flex-col items-center gap-1">
					<AirlineLogo airlineCode={airlineCode} size="medium" />
					{!isDirect && transitAirlineCode && (
						<AirlineLogo airlineCode={transitAirlineCode} size="small" />
					)}
				</div>
				<div>
					<div className="text-sm font-bold text-gray-900 md:text-lg">
						{formatTime12Hour(departureTime)}
					</div>
					<div className="text-sm text-gray-600">
						{departureAirport} • {departureDate && formatFlightDate(departureDate)}
					</div>
				</div>
			</div>

			{/* Center: Flight Path */}
			<div className="flex flex-col items-center px-4">
				<div className="mb-1 flex items-center gap-2">
					<div className="text-sm text-gray-600">{formatDuration(duration)}</div>
					<div
						className={`rounded px-2 py-1 text-xs whitespace-nowrap ${
							isDirect
								? 'bg-green-100 text-green-700'
								: 'bg-orange-100 text-orange-700'
						}`}
					>
						{isDirect ? 'Direct' : `${stops} stop${stops > 1 ? 's' : ''}`}
					</div>
				</div>
				<div className="flex items-center">
					<div className="h-2 w-2 rounded-full bg-gray-400"></div>
					<div className="relative h-px w-20 bg-gray-300">
						<div className="absolute -top-1 right-0 h-2 w-2 rounded-full bg-gray-400"></div>
					</div>
				</div>
			</div>

			{/* Right: Arrival Info */}
			<div className="text-right">
				<div className="text-sm font-bold text-gray-900 md:text-lg">
					{formatTime12Hour(arrivalTime)}
				</div>
				<div className="text-sm text-gray-600">
					{arrivalAirport} • {arrivalDate && formatFlightDate(arrivalDate)}
				</div>
			</div>
		</div>
	);
}
