import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { TextureButton } from '~/components/ui/texture-button';
import { Badge } from '~/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Separator } from '~/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { Container } from '~/components/ui/container';
import {
	FileText,
	Download,
	Mail,
	Calendar,
	MapPin,
	Plane,
	Clock,
	Users,
	CreditCard,
	Phone,
	AlertCircle,
	CheckCircle,
	XCircle,
} from 'lucide-react';

export const Route = createFileRoute('/$locale/_booking/_confirmation/order-detail')({
	component: OrderDetailPage,
	validateSearch: (search: Record<string, unknown>) => ({
		bookingRef: search.bookingRef as string,
	}),
});

function OrderDetailPage() {
	const { locale } = Route.useParams();
	const { bookingRef } = Route.useSearch();
	const navigate = useNavigate();

	const [activeTab, setActiveTab] = useState('overview');

	// Mock order data
	const order = {
		reference: bookingRef || 'TXA8K9L2M',
		status: 'confirmed',
		bookingDate: '2024-03-10T14:30:00Z',
		totalAmount: 3171742,
		paymentMethod: 'Credit Card (**** 1234)',
		passenger: {
			title: 'Mr',
			firstName: 'John',
			lastName: 'Doe',
			email: 'john.doe@example.com',
			phone: '+1 234 567 8900',
			dateOfBirth: '1990-05-15',
			nationality: 'US',
		},
		flight: {
			airline: 'Garuda Indonesia',
			flightNumber: 'GA 152',
			aircraft: 'Boeing 737-800',
			from: {
				code: 'CGK',
				city: 'Jakarta',
				airport: 'Soekarno-Hatta International Airport',
				terminal: 'Terminal 3',
			},
			to: {
				code: 'DPS',
				city: 'Denpasar',
				airport: 'Ngurah Rai International Airport',
				terminal: 'Domestic Terminal',
			},
			departure: {
				date: '2024-03-15',
				time: '08:30',
			},
			arrival: {
				date: '2024-03-15',
				time: '11:45',
			},
			duration: '3h 15m',
			class: 'Economy',
			seat: '12A',
			baggage: {
				cabin: '7kg',
				checked: '20kg',
			},
		},
		pricing: {
			basePrice: 2737828,
			taxes: 150000,
			extras: 293914,
			seat: 125000,
			baggage: 0,
			paymentFee: 15000,
			total: 3171742,
		},
		services: [
			{ name: 'Priority Boarding', price: 75000, included: true },
			{ name: 'Extra Legroom Seat', price: 125000, included: true },
			{ name: 'In-flight Meal', price: 93914, included: true },
			{ name: 'Travel Insurance', price: 125000, included: false },
		],
		documents: [
			{ name: 'E-Ticket', type: 'pdf', downloadUrl: '#' },
			{ name: 'Booking Confirmation', type: 'pdf', downloadUrl: '#' },
			{ name: 'Receipt', type: 'pdf', downloadUrl: '#' },
		],
	};

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR',
			minimumFractionDigits: 0,
		}).format(price);
	};

	const formatDate = (dateStr: string) => {
		return new Date(dateStr).toLocaleDateString('en-US', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	};

	const formatDateTime = (dateStr: string) => {
		return new Date(dateStr).toLocaleString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		});
	};

	const getStatusIcon = (status: string) => {
		switch (status) {
			case 'confirmed':
				return <CheckCircle className="h-5 w-5 text-green-600" />;
			case 'cancelled':
				return <XCircle className="h-5 w-5 text-red-600" />;
			case 'pending':
				return <Clock className="h-5 w-5 text-yellow-600" />;
			default:
				return <AlertCircle className="h-5 w-5 text-gray-600" />;
		}
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'confirmed':
				return 'bg-green-100 text-green-800';
			case 'cancelled':
				return 'bg-red-100 text-red-800';
			case 'pending':
				return 'bg-yellow-100 text-yellow-800';
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
							<h1 className="text-3xl font-bold text-gray-900">Order Details</h1>
							<p className="mt-1 text-lg text-gray-600">
								Booking Reference: {order.reference}
							</p>
						</div>
						<div className="flex items-center gap-2">
							{getStatusIcon(order.status)}
							<Badge className={getStatusColor(order.status)}>
								{order.status.charAt(0).toUpperCase() + order.status.slice(1)}
							</Badge>
						</div>
					</div>

					<div className="text-sm text-gray-600">
						Booked on {formatDateTime(order.bookingDate)}
					</div>
				</div>

				<Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
					<TabsList className="grid w-full grid-cols-4">
						<TabsTrigger value="overview">Overview</TabsTrigger>
						<TabsTrigger value="passenger">Passenger</TabsTrigger>
						<TabsTrigger value="services">Services</TabsTrigger>
						<TabsTrigger value="documents">Documents</TabsTrigger>
					</TabsList>

					<TabsContent value="overview" className="space-y-6">
						<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
							{/* Flight Details */}
							<div className="lg:col-span-2">
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<Plane className="h-5 w-5" />
											Flight Information
										</CardTitle>
									</CardHeader>
									<CardContent className="space-y-6">
										{/* Flight Route */}
										<div className="flex items-center justify-between">
											<div className="text-center">
												<div className="text-2xl font-bold">
													{order.flight.from.code}
												</div>
												<div className="text-sm text-gray-600">
													{order.flight.from.city}
												</div>
												<div className="mt-2 text-lg font-semibold">
													{order.flight.departure.time}
												</div>
												<div className="text-sm text-gray-600">
													{formatDate(order.flight.departure.date)}
												</div>
											</div>

											<div className="flex flex-1 items-center justify-center px-4">
												<div className="text-center">
													<Plane className="mx-auto mb-1 h-6 w-6 text-gray-400" />
													<div className="text-sm text-gray-600">
														{order.flight.duration}
													</div>
													<div className="text-xs text-gray-500">
														Direct
													</div>
												</div>
											</div>

											<div className="text-center">
												<div className="text-2xl font-bold">
													{order.flight.to.code}
												</div>
												<div className="text-sm text-gray-600">
													{order.flight.to.city}
												</div>
												<div className="mt-2 text-lg font-semibold">
													{order.flight.arrival.time}
												</div>
												<div className="text-sm text-gray-600">
													{formatDate(order.flight.arrival.date)}
												</div>
											</div>
										</div>

										<Separator />

										{/* Flight Details Grid */}
										<div className="grid grid-cols-2 gap-4 text-sm">
											<div>
												<span className="text-gray-600">Airline:</span>
												<div className="font-medium">
													{order.flight.airline}
												</div>
											</div>
											<div>
												<span className="text-gray-600">
													Flight Number:
												</span>
												<div className="font-medium">
													{order.flight.flightNumber}
												</div>
											</div>
											<div>
												<span className="text-gray-600">Aircraft:</span>
												<div className="font-medium">
													{order.flight.aircraft}
												</div>
											</div>
											<div>
												<span className="text-gray-600">Class:</span>
												<div className="font-medium">
													{order.flight.class}
												</div>
											</div>
											<div>
												<span className="text-gray-600">Seat:</span>
												<div className="font-medium">
													{order.flight.seat}
												</div>
											</div>
											<div>
												<span className="text-gray-600">Baggage:</span>
												<div className="font-medium">
													{order.flight.baggage.cabin} +{' '}
													{order.flight.baggage.checked}
												</div>
											</div>
										</div>
									</CardContent>
								</Card>
							</div>

							{/* Price Summary */}
							<div>
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<CreditCard className="h-5 w-5" />
											Payment Summary
										</CardTitle>
									</CardHeader>
									<CardContent className="space-y-3">
										<div className="flex justify-between text-sm">
											<span>Base Price</span>
											<span>{formatPrice(order.pricing.basePrice)}</span>
										</div>
										<div className="flex justify-between text-sm">
											<span>Taxes & Fees</span>
											<span>{formatPrice(order.pricing.taxes)}</span>
										</div>
										<div className="flex justify-between text-sm">
											<span>Extras</span>
											<span>{formatPrice(order.pricing.extras)}</span>
										</div>
										<div className="flex justify-between text-sm">
											<span>Seat Selection</span>
											<span>{formatPrice(order.pricing.seat)}</span>
										</div>
										<div className="flex justify-between text-sm">
											<span>Payment Fee</span>
											<span>{formatPrice(order.pricing.paymentFee)}</span>
										</div>
										<Separator />
										<div className="flex justify-between font-semibold">
											<span>Total Paid</span>
											<span>{formatPrice(order.pricing.total)}</span>
										</div>
										<div className="mt-2 text-xs text-gray-600">
											Paid via {order.paymentMethod}
										</div>
									</CardContent>
								</Card>
							</div>
						</div>
					</TabsContent>

					<TabsContent value="passenger" className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Users className="h-5 w-5" />
									Passenger Information
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
									<div className="space-y-4">
										<div>
											<span className="text-sm text-gray-600">
												Full Name:
											</span>
											<div className="font-medium">
												{order.passenger.title} {order.passenger.firstName}{' '}
												{order.passenger.lastName}
											</div>
										</div>
										<div>
											<span className="text-sm text-gray-600">
												Date of Birth:
											</span>
											<div className="font-medium">
												{formatDate(order.passenger.dateOfBirth)}
											</div>
										</div>
										<div>
											<span className="text-sm text-gray-600">
												Nationality:
											</span>
											<div className="font-medium">
												{order.passenger.nationality}
											</div>
										</div>
									</div>
									<div className="space-y-4">
										<div>
											<span className="text-sm text-gray-600">Email:</span>
											<div className="font-medium">
												{order.passenger.email}
											</div>
										</div>
										<div>
											<span className="text-sm text-gray-600">Phone:</span>
											<div className="font-medium">
												{order.passenger.phone}
											</div>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="services" className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle>Additional Services</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{order.services.map((service, index) => (
										<div
											key={index}
											className="flex items-center justify-between rounded-lg border p-3"
										>
											<div className="flex items-center gap-3">
												{service.included ? (
													<CheckCircle className="h-5 w-5 text-green-600" />
												) : (
													<XCircle className="h-5 w-5 text-gray-400" />
												)}
												<div>
													<div className="font-medium">
														{service.name}
													</div>
													<div className="text-sm text-gray-600">
														{service.included
															? 'Included in booking'
															: 'Not selected'}
													</div>
												</div>
											</div>
											<div className="text-right">
												<div className="font-medium">
													{formatPrice(service.price)}
												</div>
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="documents" className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<FileText className="h-5 w-5" />
									Travel Documents
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-3">
									{order.documents.map((doc, index) => (
										<div
											key={index}
											className="flex items-center justify-between rounded-lg border p-3"
										>
											<div className="flex items-center gap-3">
												<FileText className="h-5 w-5 text-blue-600" />
												<div>
													<div className="font-medium">{doc.name}</div>
													<div className="text-sm text-gray-600">
														PDF Document
													</div>
												</div>
											</div>
											<TextureButton variant="outline" size="sm">
												<Download className="mr-2 h-4 w-4" />
												Download
											</TextureButton>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>

				{/* Action Buttons */}
				<div className="mt-8 flex flex-wrap gap-4">
					<TextureButton
						variant="primary"
						onClick={() =>
							navigate({
								to: '/$locale/booking/web-checkin',
								params: { locale },
								search: { bookingRef: order.reference },
							})
						}
					>
						Web Check-in
					</TextureButton>

					<TextureButton variant="outline">
						<Mail className="mr-2 h-4 w-4" />
						Email Details
					</TextureButton>

					<TextureButton variant="outline">
						<Phone className="mr-2 h-4 w-4" />
						Contact Support
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
