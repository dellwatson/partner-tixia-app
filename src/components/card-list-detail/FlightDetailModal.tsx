import { Share2, Clock, Luggage } from 'lucide-react';
import { TextureButton } from '~/components/ui/texture-button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '~/components/ui/dialog';
import { ScrollArea } from '~/components/ui/scroll-area';
import { useCurrencyStore } from '~/stores/currency-store';
import { formatSelected } from '~/lib/currency';
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
import { formatDuration, formatTransitDuration } from './flight-card/utils';
import type { Flight } from '~/data/mockFlights';
import { AirlineBaggageList } from '~/components/airline/AirlineBaggage';
import { AirlineLogo } from './flight-card/AirlineLogo';

interface FlightDetailModalProps {
	flight: Flight;
	isOpen: boolean;
	onClose: () => void;
	onContinue: () => void;
}

export function FlightDetailModal({ flight, isOpen, onClose, onContinue }: FlightDetailModalProps) {
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

	// Debug log to see what data we're getting
	console.log('🔍 FlightDetailModal flight data:', {
		id: flight.id,
		airline: flight.airline,
		airlineCode: flight.airlineCode,
		departure: flight.departure,
		arrival: flight.arrival,
		duration: flight.duration,
		stops: flight.stops
	});

	return (
		<Dialog
			open={isOpen}
			onOpenChange={(open) => {
				if (!open) onClose();
			}}
		>
			<DialogContent className="w-full overflow-hidden p-0 sm:max-w-4xl">
				<DialogHeader className="p-6 pb-0">
					<DialogTitle className="text-xl">
						Your flight to {flight.arrival?.city || 'Unknown Destination'}
					</DialogTitle>
					<button className="mt-1 flex items-center gap-2 text-sm text-blue-600">
						<Share2 className="h-4 w-4" />
						Share this flight
					</button>
				</DialogHeader>
				{/* Flight Details */}
				<ScrollArea className="max-h-[70vh] px-6 pb-6">
					<div className="mb-6 pt-6">
						<h3 className="mb-2 font-semibold">
							Flight from {flight.departure?.city || 'Unknown'} to {flight.arrival?.city || 'Unknown'}
						</h3>
						<div className="mb-4 text-sm text-gray-600">
							{flight.stops === 0
								? 'Direct'
								: `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}{' '}
							• {formatDuration(flight.duration)}
						</div>

						{/* Flight Timeline (shared component) */}
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
											{formatTransitDuration(90)} • Time to change planes and
											stretch your legs
										</div>
									</TimelineContent>
								</TimelineItem>
							)}

							<TimelineItem step={flight.stops > 0 ? 3 : 2}>
								<TLHeader>
									<TimelineSeparator />
									<TimelineDate>
										{formatDate(flight.arrival?.date || '')} • {flight.arrival?.time || 'N/A'}
									</TimelineDate>
									<TimelineTitle>
										Arrival — {flight.arrival?.airport || 'N/A'} • {flight.arrival?.city || 'Unknown'}
									</TimelineTitle>
									<TimelineIndicator />
								</TLHeader>
							</TimelineItem>
						</Timeline>
					</div>

					{/* Included Baggage */}
					<div className="mb-6">
						<h4 className="mb-3 font-semibold">Included baggage</h4>
						<div className="mb-3 text-sm text-gray-600">
							The total baggage included in the price
						</div>
						<AirlineBaggageList
							items={[
								'personal',
								...(flight.baggage.carry ? (['carry'] as const) : ([] as const)),
								...(flight.baggage.checked
									? (['checked'] as const)
									: ([] as const)),
							]}
						/>
					</div>

					{/* Extras */}
					<div className="mb-6">
						<h4 className="mb-3 font-semibold">Extras you might like</h4>
						<div className="mb-3 text-sm text-gray-600">Can be added for a fee</div>

						<div className="space-y-3">
							{!flight.baggage.checked && (
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<Luggage className="h-5 w-5 text-gray-600" />
										<div>
											<div className="font-medium">Checked bag</div>
											<div className="text-sm text-gray-600">
												From {formatSelected(Math.floor(Math.random() * 200000) + 300000)}
											</div>
										</div>
									</div>
									<span className="font-medium text-blue-600">
										Available in the next steps
									</span>
								</div>
							)}

							{flight.flexible && (
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<Clock className="h-5 w-5 text-gray-600" />
										<div>
											<div className="font-medium">Flexible ticket</div>
											<div className="text-sm text-gray-600">
												Date change possible
											</div>
											<div className="text-sm text-gray-600">
												+ {formatSelected(Math.floor(Math.random() * 500000) + 800000)} for all travellers
											</div>
										</div>
									</div>
									<span className="font-medium text-blue-600">
										Available in the next steps
									</span>
								</div>
							)}
						</div>
					</div>
				</ScrollArea>

				{/* Footer */}
				<div className="flex items-center justify-between border-t bg-gray-50 p-6">
					<div className="text-2xl font-bold">
						{formatSelected(flight.price)}
					</div>
					<div>
						<TextureButton variant="accent" onClick={onContinue} size="lg" className="">
							Continue
						</TextureButton>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
