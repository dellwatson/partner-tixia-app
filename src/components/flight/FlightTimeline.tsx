import {
	Timeline,
	TimelineContent,
	TimelineDate,
	TimelineHeader as TLHeader,
	TimelineIndicator,
	TimelineItem,
	TimelineSeparator,
	TimelineTitle,
} from '~/components/ui/timeline';
import { formatDuration } from '~/components/card-list-detail/flight-card/utils';
import { AirlineLogo } from '~/components/card-list-detail/flight-card/AirlineLogo';
import type { Flight } from '~/data/mockFlights';

interface FlightTimelineProps {
	flight: Flight;
	className?: string;
}

export function FlightTimeline({ flight, className = '' }: FlightTimelineProps) {
	const formatDate = (dateString: string) => {
		if (!dateString) return 'Invalid Date';
		try {
			const date = new Date(dateString);
			if (isNaN(date.getTime())) return 'Invalid Date';
			return date.toLocaleDateString('en-US', {
				weekday: 'short',
				day: 'numeric',
				month: 'short',
			});
		} catch (error) {
			return 'Invalid Date';
		}
	};

	return (
		<div className={className}>
			<Timeline>
				<TimelineItem step={1}>
					<TLHeader>
						<TimelineSeparator />
						<TimelineDate>
							{formatDate(flight.departure?.date || '')} •{' '}
							{flight.departure?.time || 'N/A'}
						</TimelineDate>
						<TimelineTitle>
							Departure — {flight.departure?.airport || 'N/A'} •{' '}
							{flight.departure?.city || 'Unknown'}
						</TimelineTitle>
						<TimelineIndicator />
					</TLHeader>
					<TimelineContent>
						<div className="text-xs text-gray-500">
							<div className="flex items-center gap-2 mb-1">
								<AirlineLogo airlineCode={flight.airlineCode || 'XX'} size="small" />
								<span>
									{flight.airline || 'Unknown Airline'} • {flight.flightNumber || 'N/A'} •{' '}
									{flight.class || 'Economy'}
								</span>
							</div>
							<div>Flight time {formatDuration(flight.duration)}</div>
						</div>
					</TimelineContent>
				</TimelineItem>

				{flight.stops > 0 && (
					<TimelineItem step={2}>
						<TLHeader>
							<TimelineSeparator />
							<TimelineDate>Layover</TimelineDate>
							<TimelineTitle>Layover in connecting airport</TimelineTitle>
							<TimelineIndicator />
						</TLHeader>
						<TimelineContent>
							<div className="text-xs text-gray-500">
								Layover time: 2h 30m (estimated)
							</div>
						</TimelineContent>
					</TimelineItem>
				)}

				<TimelineItem step={flight.stops > 0 ? 3 : 2}>
					<TLHeader>
						<TimelineSeparator />
						<TimelineDate>
							{formatDate(flight.arrival?.date || '')} •{' '}
							{flight.arrival?.time || 'N/A'}
						</TimelineDate>
						<TimelineTitle>
							Arrival — {flight.arrival?.airport || 'N/A'} •{' '}
							{flight.arrival?.city || 'Unknown'}
						</TimelineTitle>
						<TimelineIndicator />
					</TLHeader>
					<TimelineContent>
						<div className="text-xs text-gray-500">
							Total travel time: {formatDuration(flight.duration)}
						</div>
					</TimelineContent>
				</TimelineItem>
			</Timeline>
		</div>
	);
}
