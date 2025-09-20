import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { TextureButton } from '~/components/ui/texture-button';
import { Badge } from '~/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Separator } from '~/components/ui/separator';
import { Container } from '~/components/ui/container';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import {
	Plane,
	Clock,
	MapPin,
	Users,
	Wifi,
	Coffee,
	Monitor,
	Utensils,
	Luggage,
	AlertCircle,
	Info,
	Calendar,
	Navigation,
} from 'lucide-react';

export const Route = createFileRoute('/$locale/_booking/_confirmation/flight-details')({
	component: FlightDetailsPage,
	validateSearch: (search: Record<string, unknown>) => ({
		flightNumber: search.flightNumber as string,
		date: search.date as string,
	}),
});

function FlightDetailsPage() {
	const { locale } = Route.useParams();
	const { flightNumber, date } = Route.useSearch();
	const navigate = useNavigate();

	const [activeTab, setActiveTab] = useState('overview');

	// Mock flight data
	const flight = {
		flightNumber: flightNumber || 'GA 152',
		airline: 'Garuda Indonesia',
		aircraft: {
			model: 'Boeing 737-800',
			registration: 'PK-GNI',
			age: '8 years',
			configuration: '162 seats (12 Business, 150 Economy)',
		},
		route: {
			from: {
				code: 'CGK',
				city: 'Jakarta',
				airport: 'Soekarno-Hatta International Airport',
				terminal: 'Terminal 3',
				gate: 'A12',
			},
			to: {
				code: 'DPS',
				city: 'Denpasar',
				airport: 'Ngurah Rai International Airport',
				terminal: 'Domestic Terminal',
				gate: 'B5',
			},
		},
		schedule: {
			departure: {
				scheduled: '08:30',
				estimated: '08:30',
				actual: null,
				date: date || '2024-03-15',
			},
			arrival: {
				scheduled: '11:45',
				estimated: '11:45',
				actual: null,
				date: date || '2024-03-15',
			},
			duration: '3h 15m',
			distance: '1,150 km',
		},
		status: {
			current: 'On Time',
			color: 'green',
			lastUpdated: '2024-03-15T07:30:00Z',
		},
		amenities: [
			{ name: 'Wi-Fi', icon: Wifi, available: true, cost: 'Paid' },
			{ name: 'In-flight Entertainment', icon: Monitor, available: true, cost: 'Free' },
			{ name: 'Meals', icon: Utensils, available: true, cost: 'Included' },
			{ name: 'Beverages', icon: Coffee, available: true, cost: 'Free' },
		],
		baggage: {
			cabin: {
				weight: '7kg',
				dimensions: '56cm x 36cm x 23cm',
				pieces: 1,
			},
			checked: {
				economy: '20kg',
				business: '30kg',
				dimensions: '158cm total',
				additionalFee: 'IDR 150,000 per extra 5kg',
			},
		},
		seatMap: {
			business: {
				rows: '1-3',
				seats: 12,
				pitch: '42 inches',
				width: '21 inches',
			},
			economy: {
				rows: '4-27',
				seats: 150,
				pitch: '30 inches',
				width: '17 inches',
			},
		},
		crew: {
			captain: 'Capt. Ahmad Wijaya',
			firstOfficer: 'F/O Sarah Putri',
			cabinCrew: 4,
		},
	};

	const formatDate = (dateStr: string) => {
		return new Date(dateStr).toLocaleDateString('en-US', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	};

	const formatTime = (timeStr: string) => {
		return timeStr;
	};

	const getStatusColor = (status: string) => {
		switch (status.toLowerCase()) {
			case 'on time':
				return 'bg-green-100 text-green-800';
			case 'delayed':
				return 'bg-yellow-100 text-yellow-800';
			case 'cancelled':
				return 'bg-red-100 text-red-800';
			default:
				return 'bg-gray-100 text-gray-800';
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 py-8">
			<Container>
				{/* Header */}
				<div className="mb-8">
					<div className="mb-4 flex items-center justify-between">
						<div>
							<h1 className="text-3xl font-bold text-gray-900">Flight Details</h1>
							<p className="mt-1 text-lg text-gray-600">
								{flight.airline} {flight.flightNumber}
							</p>
						</div>
						<Badge className={getStatusColor(flight.status.current)}>
							{flight.status.current}
						</Badge>
					</div>

					<div className="text-sm text-gray-600">
						{formatDate(flight.schedule.departure.date)} • Last updated:{' '}
						{new Date(flight.status.lastUpdated).toLocaleTimeString()}
					</div>
				</div>

				{/* Flight Route Overview */}
				<Card className="mb-8">
					<CardContent className="pt-6">
						<div className="flex items-center justify-between">
							<div className="text-center">
								<div className="text-3xl font-bold">{flight.route.from.code}</div>
								<div className="mb-2 text-sm text-gray-600">
									{flight.route.from.city}
								</div>
								<div className="text-xl font-semibold">
									{formatTime(flight.schedule.departure.scheduled)}
								</div>
								<div className="text-sm text-gray-600">Departure</div>
								<div className="mt-1 text-xs text-gray-500">
									Gate {flight.route.from.gate}
								</div>
							</div>

							<div className="flex flex-1 flex-col items-center justify-center px-8">
								<div className="mb-2 flex items-center">
									<div className="h-0.5 w-16 bg-gray-300"></div>
									<Plane className="mx-2 h-6 w-6 text-gray-400" />
									<div className="h-0.5 w-16 bg-gray-300"></div>
								</div>
								<div className="text-sm text-gray-600">
									{flight.schedule.duration}
								</div>
								<div className="text-xs text-gray-500">
									{flight.schedule.distance}
								</div>
							</div>

							<div className="text-center">
								<div className="text-3xl font-bold">{flight.route.to.code}</div>
								<div className="mb-2 text-sm text-gray-600">
									{flight.route.to.city}
								</div>
								<div className="text-xl font-semibold">
									{formatTime(flight.schedule.arrival.scheduled)}
								</div>
								<div className="text-sm text-gray-600">Arrival</div>
								<div className="mt-1 text-xs text-gray-500">
									Gate {flight.route.to.gate}
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				<Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
					<TabsList className="grid w-full grid-cols-5">
						<TabsTrigger value="overview">Overview</TabsTrigger>
						<TabsTrigger value="aircraft">Aircraft</TabsTrigger>
						<TabsTrigger value="amenities">Amenities</TabsTrigger>
						<TabsTrigger value="baggage">Baggage</TabsTrigger>
						<TabsTrigger value="seats">Seats</TabsTrigger>
					</TabsList>

					<TabsContent value="overview" className="space-y-6">
						<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<Clock className="h-5 w-5" />
										Schedule Information
									</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="grid grid-cols-2 gap-4 text-sm">
										<div>
											<span className="text-gray-600">
												Scheduled Departure:
											</span>
											<div className="font-medium">
												{flight.schedule.departure.scheduled}
											</div>
										</div>
										<div>
											<span className="text-gray-600">
												Estimated Departure:
											</span>
											<div className="font-medium">
												{flight.schedule.departure.estimated}
											</div>
										</div>
										<div>
											<span className="text-gray-600">
												Scheduled Arrival:
											</span>
											<div className="font-medium">
												{flight.schedule.arrival.scheduled}
											</div>
										</div>
										<div>
											<span className="text-gray-600">
												Estimated Arrival:
											</span>
											<div className="font-medium">
												{flight.schedule.arrival.estimated}
											</div>
										</div>
									</div>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<MapPin className="h-5 w-5" />
										Airport Information
									</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<div>
										<div className="mb-1 font-medium">Departure</div>
										<div className="text-sm text-gray-600">
											{flight.route.from.airport}
										</div>
										<div className="text-sm text-gray-600">
											{flight.route.from.terminal}
										</div>
									</div>
									<Separator />
									<div>
										<div className="mb-1 font-medium">Arrival</div>
										<div className="text-sm text-gray-600">
											{flight.route.to.airport}
										</div>
										<div className="text-sm text-gray-600">
											{flight.route.to.terminal}
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</TabsContent>

					<TabsContent value="aircraft" className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Plane className="h-5 w-5" />
									Aircraft Details
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
									<div className="space-y-4">
										<div>
											<span className="text-sm text-gray-600">
												Aircraft Model:
											</span>
											<div className="font-medium">
												{flight.aircraft.model}
											</div>
										</div>
										<div>
											<span className="text-sm text-gray-600">
												Registration:
											</span>
											<div className="font-medium">
												{flight.aircraft.registration}
											</div>
										</div>
										<div>
											<span className="text-sm text-gray-600">
												Aircraft Age:
											</span>
											<div className="font-medium">{flight.aircraft.age}</div>
										</div>
									</div>
									<div className="space-y-4">
										<div>
											<span className="text-sm text-gray-600">
												Configuration:
											</span>
											<div className="font-medium">
												{flight.aircraft.configuration}
											</div>
										</div>
										<div>
											<span className="text-sm text-gray-600">Crew:</span>
											<div className="font-medium">
												<div>{flight.crew.captain}</div>
												<div>{flight.crew.firstOfficer}</div>
												<div>{flight.crew.cabinCrew} Cabin Crew</div>
											</div>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="amenities" className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle>In-flight Services</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
									{flight.amenities.map((amenity, index) => (
										<div
											key={index}
											className="flex items-center justify-between rounded-lg border p-3"
										>
											<div className="flex items-center gap-3">
												<amenity.icon className="h-5 w-5 text-blue-600" />
												<div>
													<div className="font-medium">
														{amenity.name}
													</div>
													<div className="text-sm text-gray-600">
														{amenity.available
															? 'Available'
															: 'Not Available'}
													</div>
												</div>
											</div>
											<Badge
												variant={
													amenity.cost === 'Free'
														? 'default'
														: 'secondary'
												}
											>
												{amenity.cost}
											</Badge>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="baggage" className="space-y-6">
						<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<Luggage className="h-5 w-5" />
										Cabin Baggage
									</CardTitle>
								</CardHeader>
								<CardContent className="space-y-3">
									<div>
										<span className="text-sm text-gray-600">Weight Limit:</span>
										<div className="font-medium">
											{flight.baggage.cabin.weight}
										</div>
									</div>
									<div>
										<span className="text-sm text-gray-600">Dimensions:</span>
										<div className="font-medium">
											{flight.baggage.cabin.dimensions}
										</div>
									</div>
									<div>
										<span className="text-sm text-gray-600">
											Pieces Allowed:
										</span>
										<div className="font-medium">
											{flight.baggage.cabin.pieces} piece
										</div>
									</div>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<Luggage className="h-5 w-5" />
										Checked Baggage
									</CardTitle>
								</CardHeader>
								<CardContent className="space-y-3">
									<div>
										<span className="text-sm text-gray-600">
											Economy Class:
										</span>
										<div className="font-medium">
											{flight.baggage.checked.economy}
										</div>
									</div>
									<div>
										<span className="text-sm text-gray-600">
											Business Class:
										</span>
										<div className="font-medium">
											{flight.baggage.checked.business}
										</div>
									</div>
									<div>
										<span className="text-sm text-gray-600">
											Max Dimensions:
										</span>
										<div className="font-medium">
											{flight.baggage.checked.dimensions}
										</div>
									</div>
									<div className="rounded-lg bg-blue-50 p-3">
										<div className="flex items-start gap-2">
											<Info className="mt-0.5 h-4 w-4 text-blue-600" />
											<div className="text-sm text-blue-700">
												<div className="font-medium">
													Additional Baggage
												</div>
												<div>{flight.baggage.checked.additionalFee}</div>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</TabsContent>

					<TabsContent value="seats" className="space-y-6">
						<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
							<Card>
								<CardHeader>
									<CardTitle>Business Class</CardTitle>
								</CardHeader>
								<CardContent className="space-y-3">
									<div className="grid grid-cols-2 gap-4 text-sm">
										<div>
											<span className="text-gray-600">Rows:</span>
											<div className="font-medium">
												{flight.seatMap.business.rows}
											</div>
										</div>
										<div>
											<span className="text-gray-600">Total Seats:</span>
											<div className="font-medium">
												{flight.seatMap.business.seats}
											</div>
										</div>
										<div>
											<span className="text-gray-600">Seat Pitch:</span>
											<div className="font-medium">
												{flight.seatMap.business.pitch}
											</div>
										</div>
										<div>
											<span className="text-gray-600">Seat Width:</span>
											<div className="font-medium">
												{flight.seatMap.business.width}
											</div>
										</div>
									</div>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle>Economy Class</CardTitle>
								</CardHeader>
								<CardContent className="space-y-3">
									<div className="grid grid-cols-2 gap-4 text-sm">
										<div>
											<span className="text-gray-600">Rows:</span>
											<div className="font-medium">
												{flight.seatMap.economy.rows}
											</div>
										</div>
										<div>
											<span className="text-gray-600">Total Seats:</span>
											<div className="font-medium">
												{flight.seatMap.economy.seats}
											</div>
										</div>
										<div>
											<span className="text-gray-600">Seat Pitch:</span>
											<div className="font-medium">
												{flight.seatMap.economy.pitch}
											</div>
										</div>
										<div>
											<span className="text-gray-600">Seat Width:</span>
											<div className="font-medium">
												{flight.seatMap.economy.width}
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</TabsContent>
				</Tabs>

				{/* Action Buttons */}
				<div className="mt-8 flex flex-wrap gap-4">
					<TextureButton
						variant="primary"
						onClick={() =>
							navigate({
								to: '/$locale/flights/search',
								params: { locale },
							})
						}
					>
						Book This Flight
					</TextureButton>

					<TextureButton
						variant="outline"
						onClick={() =>
							navigate({
								to: '/$locale/booking/web-checkin',
								params: { locale },
							})
						}
					>
						Web Check-in
					</TextureButton>

					<TextureButton
						variant="ghost"
						onClick={() => navigate({ to: `/${locale}/user`, params: { locale } })}
					>
						Back to User
					</TextureButton>
				</div>
			</Container>
		</div>
	);
}
