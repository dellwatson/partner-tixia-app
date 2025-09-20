import { createFileRoute, useNavigate, redirect } from '@tanstack/react-router';
import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Separator } from '~/components/ui/separator';
import { Plane, Clock, MapPin, CreditCard, User, Mail, Phone } from 'lucide-react';

export const Route = createFileRoute('/$locale/_booking/checkout/$flightId')({
	component: FlightCheckoutPage,
	beforeLoad: ({ params }) => {
		const validLocales = ['en', 'zh', 'ms'];
		if (!params.locale || !validLocales.includes(params.locale)) {
			throw redirect({
				to: '/$locale/_booking/checkout/$flightId',
				params: { locale: 'en', flightId: params.flightId }
			})
		}
	}
});

function FlightCheckoutPage() {
	const { flightId, locale } = Route.useParams();
	const navigate = useNavigate();
	
	const [passengerInfo, setPassengerInfo] = useState({
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		dateOfBirth: '',
	})

	// Mock flight data (in real app, fetch by flightId)
	const flight = {
		id: flightId,
		airline: 'SkyWings',
		departure: { time: '08:30', airport: 'JFK', city: 'New York' },
		arrival: { time: '11:45', airport: 'LAX', city: 'Los Angeles' },
		duration: '5h 15m',
		price: 299,
		stops: 0,
		aircraft: 'Boeing 737',
		date: '2024-03-15'
	}

	const handleProceedToBook = () => {
		navigate({
			to: '/$locale/book',
			params: { locale },
			search: {
				type: 'flight',
				id: flightId,
				passenger: JSON.stringify(passengerInfo)
			}
		})
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
				<div className="mb-6">
					<h1 className="text-2xl font-bold text-gray-900">Flight Checkout</h1>
					<p className="text-gray-600 mt-1">Review your flight and enter passenger details</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Flight Details */}
					<div className="lg:col-span-2">
						<Card className="mb-6">
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Plane className="w-5 h-5" />
									Flight Details
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
									<div className="flex items-center space-x-6">
										<div className='text-center'>
											<div className="text-lg font-semibold">{flight.departure.time}</div>
											<div className="text-sm text-gray-600">{flight.departure.airport}</div>
											<div className="text-xs text-gray-500">{flight.departure.city}</div>
										</div>
										
										<div className="flex flex-col items-center">
											<div className="text-sm text-gray-600 mb-1">{flight.duration}</div>
											<div className="flex items-center">
												<div className="w-16 h-px bg-gray-300"></div>
												<Plane className="w-4 h-4 mx-2 text-gray-400" />
												<div className="w-16 h-px bg-gray-300"></div>
											</div>
											<div className="text-xs text-gray-500 mt-1">
												{flight.stops === 0 ? 'Direct' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
											</div>
										</div>
										
										<div className='text-center'>
											<div className="text-lg font-semibold">{flight.arrival.time}</div>
											<div className="text-sm text-gray-600">{flight.arrival.airport}</div>
											<div className="text-xs text-gray-500">{flight.arrival.city}</div>
										</div>
									</div>
									
									<div className="text-right">
										<div className="text-sm text-gray-600">{flight.airline}</div>
										<div className="text-sm text-gray-600">{flight.aircraft}</div>
										<div className="text-sm text-gray-600">{flight.date}</div>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Passenger Information */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<User className="w-5 h-5" />
									Passenger Information
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div>
										<Label htmlFor="firstName">First Name</Label>
										<Input
											id='firstName'
											value={passengerInfo.firstName}
											onChange={(e) => setPassengerInfo(prev => ({ ...prev, firstName: e.target.value }))}
											placeholder='Enter first name'
										/>
									</div>
									<div>
										<Label htmlFor="lastName">Last Name</Label>
										<Input
											id='lastName'
											value={passengerInfo.lastName}
											onChange={(e) => setPassengerInfo(prev => ({ ...prev, lastName: e.target.value }))}
											placeholder='Enter last name'
										/>
									</div>
								</div>
								
								<div>
									<Label htmlFor="email">Email Address</Label>
									<Input
										id='email'
										type='email'
										value={passengerInfo.email}
										onChange={(e) => setPassengerInfo(prev => ({ ...prev, email: e.target.value }))}
										placeholder="Enter email address"
									/>
								</div>
								
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div>
										<Label htmlFor="phone">Phone Number</Label>
										<Input
											id='phone'
											value={passengerInfo.phone}
											onChange={(e) => setPassengerInfo(prev => ({ ...prev, phone: e.target.value }))}
											placeholder='Enter phone number'
										/>
									</div>
									<div>
										<Label htmlFor="dateOfBirth">Date of Birth</Label>
										<Input
											id='dateOfBirth'
											type='date'
											value={passengerInfo.dateOfBirth}
											onChange={(e) => setPassengerInfo(prev => ({ ...prev, dateOfBirth: e.target.value }))}
										/>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Price Summary */}
					<div className="lg:col-span-1">
						<Card className="sticky top-8">
							<CardHeader>
								<CardTitle>Price Summary</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex justify-between">
									<span>Flight fare</span>
									<span>${flight.price}</span>
								</div>
								<div className="flex justify-between">
									<span>Taxes & fees</span>
									<span>$45</span>
								</div>
								<Separator />
								<div className="flex justify-between font-semibold text-lg">
									<span>Total</span>
									<span>${flight.price + 45}</span>
								</div>
								
								<Button 
									className='w-full mt-6' 
									size='lg'
									onClick={handleProceedToBook}
									disabled={!passengerInfo.firstName || !passengerInfo.lastName || !passengerInfo.email}
								>
									Proceed to Payment
								</Button>
								
								<p className="text-xs text-gray-500 text-center">
									You'll be redirected to secure payment
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	)
}
