// import { createFileRoute } from '@tanstack/react-router';

// export const Route = createFileRoute('/$locale/_booking/reserve/old/form/$bookingId')({
// 	component: RouteComponent,
// });

// function RouteComponent() {
// 	return <div>Hello "/$locale/_booking/reserve/old/form/$bookingId"!</div>;
// }
// import { createFileRoute, useNavigate } from '@tanstack/react-router';
// import { useState } from 'react';
// import { TextureButton } from '~/components/ui/texture-button';
// import { Input } from '~/components/ui/input';
// import { Label } from '~/components/ui/label';
// import {
// 	Select,
// 	SelectContent,
// 	SelectItem,
// 	SelectTrigger,
// 	SelectValue,
// } from '~/components/ui/select';
// import { Textarea } from '~/components/ui/textarea';
// import { Checkbox } from '~/components/ui/checkbox';
// import { Container } from '~/components/ui/container';
// import {
// 	Calendar,
// 	MapPin,
// 	Users,
// 	Bed,
// 	Clock,
// 	Phone,
// 	Mail,
// 	User,
// 	CheckCircle,
// 	Star,
// } from 'lucide-react';

// export const Route = createFileRoute('/$locale/_booking/reserve/form/$bookingId')({
// 	component: ReservationFormPage,
// });

// interface GuestInfo {
// 	firstName: string;
// 	lastName: string;
// 	email: string;
// 	phone: string;
// 	country: string;
// }

// interface ReservationDetails {
// 	checkIn: string;
// 	checkOut: string;
// 	guests: number;
// 	rooms: number;
// 	specialRequests: string;
// 	arrivalTime: string;
// 	isMainGuest: boolean;
// 	isWorkTravel: boolean;
// 	paperlessConfirmation: boolean;
// 	updateAccount: boolean;
// }

// function ReservationFormPage() {
// 	const { locale, bookingId } = Route.useParams();
// 	const navigate = useNavigate();

// 	const [guestInfo, setGuestInfo] = useState<GuestInfo>({
// 		firstName: '',
// 		lastName: '',
// 		email: '',
// 		phone: '',
// 		country: 'indonesia',
// 	});

// 	const [reservationDetails, setReservationDetails] = useState<ReservationDetails>({
// 		checkIn: '2024-12-24',
// 		checkOut: '2024-12-27',
// 		guests: 1,
// 		rooms: 1,
// 		specialRequests: '',
// 		arrivalTime: '',
// 		isMainGuest: true,
// 		isWorkTravel: false,
// 		paperlessConfirmation: true,
// 		updateAccount: false,
// 	});

// 	const [errors, setErrors] = useState<Partial<GuestInfo>>({});

// 	const validateForm = () => {
// 		const newErrors: Partial<GuestInfo> = {};

// 		if (!guestInfo.firstName.trim()) newErrors.firstName = 'First name is required';
// 		if (!guestInfo.lastName.trim()) newErrors.lastName = 'Last name is required';
// 		if (!guestInfo.email.trim()) newErrors.email = 'Email is required';
// 		if (!guestInfo.phone.trim()) newErrors.phone = 'Phone number is required';

// 		// Email validation
// 		if (guestInfo.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guestInfo.email)) {
// 			newErrors.email = 'Please enter a valid email address';
// 		}

// 		setErrors(newErrors);
// 		return Object.keys(newErrors).length === 0;
// 	};

// 	const handleSubmit = () => {
// 		if (validateForm()) {
// 			navigate({
// 				to: '/$locale/_booking/reserve/payment/$bookingId',
// 				params: { locale, bookingId },
// 				search: {
// 					guestInfo: JSON.stringify(guestInfo),
// 					reservationDetails: JSON.stringify(reservationDetails),
// 				},
// 			});
// 		}
// 	};

// 	const updateGuestInfo = (field: keyof GuestInfo) => (value: string) => {
// 		setGuestInfo((prev) => ({ ...prev, [field]: value }));
// 		if (errors[field]) {
// 			setErrors((prev) => ({ ...prev, [field]: undefined }));
// 		}
// 	};

// 	const updateReservationDetails =
// 		(field: keyof ReservationDetails) => (value: string | number | boolean) => {
// 			setReservationDetails((prev) => ({ ...prev, [field]: value }));
// 		};

// 	// Mock hotel data
// 	const hotelName = 'Rucksack Inn Temple Street';
// 	const hotelAddress = '52 Temple Street, Chinatown, 058597 Singapore, Singapore';
// 	const roomType = 'Single Bed in 10-Bed Mixed Dorm';
// 	const originalPrice = 1646691;
// 	const bonusSavings = 266764;
// 	const geniusDiscount = 164669;
// 	const bookingPays = 121526;
// 	const totalPrice = 1093733;
// 	const nights = 3;

// 	const arrivalTimes = [
// 		"I don't know",
// 		'00:00 - 01:00',
// 		'01:00 - 02:00',
// 		'02:00 - 03:00',
// 		'03:00 - 04:00',
// 		'05:00 - 06:00',
// 		'06:00 - 07:00',
// 		'07:00 - 08:00',
// 		'08:00 - 09:00',
// 		'09:00 - 10:00',
// 		'10:00 - 11:00',
// 		'11:00 - 12:00',
// 		'12:00 - 13:00',
// 		'13:00 - 14:00',
// 		'14:00 - 15:00',
// 		'15:00 - 16:00',
// 		'16:00 - 17:00',
// 		'17:00 - 18:00',
// 		'18:00 - 19:00',
// 		'19:00 - 20:00',
// 		'20:00 - 21:00',
// 		'21:00 - 22:00',
// 		'22:00 - 23:00',
// 		'23:00 - 00:00',
// 	];

// 	return (
// 		<Container size="xl" className="py-8">
// 			{/* Progress Steps */}
// 			<div className="mb-8">
// 				<div className="mb-6 flex items-center justify-center">
// 					<div className="flex items-center space-x-4">
// 						<div className="flex items-center">
// 							<div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-medium text-white">
// 								<CheckCircle className="h-4 w-4" />
// 							</div>
// 							<span className="ml-2 text-sm font-medium text-blue-600">
// 								Your Selection
// 							</span>
// 						</div>
// 						<div className="h-0.5 w-12 bg-blue-600"></div>
// 						<div className="flex items-center">
// 							<div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-medium text-white">
// 								2
// 							</div>
// 							<span className="ml-2 text-sm font-medium text-blue-600">
// 								Your Details
// 							</span>
// 						</div>
// 						<div className="h-0.5 w-12 bg-gray-200"></div>
// 						<div className="flex items-center">
// 							<div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-medium text-gray-600">
// 								3
// 							</div>
// 							<span className="ml-2 text-sm font-medium text-gray-600">
// 								Finish booking
// 							</span>
// 						</div>
// 					</div>
// 				</div>
// 			</div>

// 			<div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
// 				{/* Left Column - Hotel Info & Booking Details */}
// 				<div className="space-y-6 lg:col-span-1">
// 					{/* Hotel Card */}
// 					<div className="overflow-hidden rounded-lg border bg-white">
// 						<div className="relative">
// 							<img
// 								src="/api/placeholder/300/200"
// 								alt={hotelName}
// 								className="h-48 w-full object-cover"
// 							/>
// 							<div className="absolute top-2 left-2">
// 								<span className="rounded bg-red-500 px-2 py-1 text-xs font-bold text-white">
// 									WOW! 2 Nights - 7%
// 								</span>
// 							</div>
// 						</div>
// 						<div className="p-4">
// 							<h3 className="mb-1 text-lg font-bold">{hotelName}</h3>
// 							<p className="mb-2 text-sm text-gray-600">{hotelAddress}</p>
// 							<div className="mb-2 flex items-center gap-2">
// 								<span className="rounded bg-blue-600 px-2 py-1 text-xs font-bold text-white">
// 									8.8
// 								</span>
// 								<span className="text-sm text-gray-600">
// 									Pleasant • 765 reviews
// 								</span>
// 							</div>
// 						</div>
// 					</div>

// 					{/* Booking Details */}
// 					<div className="rounded-lg border bg-white p-4">
// 						<h3 className="mb-4 font-semibold">Your booking details</h3>

// 						<div className="space-y-3">
// 							<div className="flex justify-between">
// 								<div>
// 									<div className="font-medium">Check-in</div>
// 									<div className="text-sm text-gray-600">Wed, Sep 24, 2025</div>
// 									<div className="text-xs text-gray-500">3:00 PM - 12:00 AM</div>
// 								</div>
// 								<div className="text-right">
// 									<div className="font-medium">Check-out</div>
// 									<div className="text-sm text-gray-600">Sat, Sep 27, 2025</div>
// 									<div className="text-xs text-gray-500">12:00 AM - 10:00 AM</div>
// 								</div>
// 							</div>

// 							<div className="border-t pt-2">
// 								<div className="text-sm font-medium">Total length of stay:</div>
// 								<div className="text-sm text-gray-600">{nights} nights</div>
// 							</div>

// 							<div className="border-t pt-2">
// 								<div className="flex items-center justify-between">
// 									<div className="text-sm font-medium">You selected</div>
// 									<button className="text-sm text-blue-600 hover:underline">
// 										Change your selection
// 									</button>
// 								</div>
// 								<div className="text-sm text-gray-600">1 room for 1 adult</div>
// 							</div>
// 						</div>
// 					</div>

// 					{/* Price Summary */}
// 					<div className="rounded-lg border bg-white p-4">
// 						<h3 className="mb-4 font-semibold">Your price summary</h3>

// 						<div className="space-y-2 text-sm">
// 							<div className="flex justify-between">
// 								<span>Original price</span>
// 								<span>Rp {originalPrice.toLocaleString()}</span>
// 							</div>
// 							<div className="flex justify-between text-green-600">
// 								<div>
// 									<div>Bonus savings</div>
// 									<div className="text-xs text-gray-500">
// 										You're getting a reduced rate because this property is
// 										offering a discount.
// 									</div>
// 								</div>
// 								<span>- Rp {bonusSavings.toLocaleString()}</span>
// 							</div>
// 							<div className="flex justify-between text-green-600">
// 								<div>
// 									<div>Genius Discount</div>
// 									<div className="text-xs text-gray-500">
// 										You're getting a reduced rate because you're a Genius
// 										member.
// 									</div>
// 								</div>
// 								<span>- Rp {geniusDiscount.toLocaleString()}</span>
// 							</div>
// 							<div className="flex justify-between text-green-600">
// 								<div>
// 									<div>Booking.com pays</div>
// 									<div className="text-xs text-gray-500">
// 										You'll get a reduced rate when you pay online because
// 										Booking.com will pay part of the price.
// 									</div>
// 								</div>
// 								<span>- Rp {bookingPays.toLocaleString()}</span>
// 							</div>
// 						</div>

// 						<div className="mt-3 border-t pt-3">
// 							<div className="flex items-center justify-between">
// 								<div>
// 									<div className="text-lg font-bold">Total</div>
// 									<div className="text-xs text-gray-500">
// 										Includes taxes and fees
// 									</div>
// 									<div className="text-xs text-gray-500">
// 										In property currency: S$ 85.19
// 									</div>
// 								</div>
// 								<div className="text-right">
// 									<div className="text-sm text-red-500 line-through">
// 										Rp {originalPrice.toLocaleString()}
// 									</div>
// 									<div className="text-lg font-bold">
// 										Rp {totalPrice.toLocaleString()}
// 									</div>
// 								</div>
// 							</div>
// 						</div>
// 					</div>
// 				</div>

// 				{/* Right Column - Forms */}
// 				<div className="space-y-6 lg:col-span-2">
// 					{/* User Status */}
// 					<div className="rounded-lg border bg-white p-6">
// 						<div className="mb-4 flex items-center gap-3">
// 							<div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 font-bold text-white">
// 								D
// 							</div>
// 							<div>
// 								<div className="font-medium">You are signed in</div>
// 								<div className="text-sm text-gray-600">dellryuzi@gmail.com</div>
// 							</div>
// 						</div>
// 					</div>

// 					{/* Enter Details Form */}
// 					<div className="rounded-lg border bg-white p-6">
// 						<h2 className="mb-4 text-xl font-semibold">Enter your details</h2>
// 						<p className="mb-6 text-sm text-gray-600">
// 							<CheckCircle className="mr-1 inline h-4 w-4 text-green-600" />
// 							Almost done! Just fill in the <span className="text-red-500">
// 								*
// 							</span>{' '}
// 							required info
// 						</p>

// 						<div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
// 							<div>
// 								<Label htmlFor="firstName">
// 									First name <span className="text-red-500">*</span>
// 								</Label>
// 								<Input
// 									id="firstName"
// 									placeholder="Dale"
// 									value={guestInfo.firstName}
// 									onChange={(e) => updateGuestInfo('firstName')(e.target.value)}
// 									className={errors.firstName ? 'border-red-500' : ''}
// 								/>
// 								{errors.firstName && (
// 									<p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
// 								)}
// 							</div>

// 							<div>
// 								<Label htmlFor="lastName">
// 									Last name <span className="text-red-500">*</span>
// 								</Label>
// 								<Input
// 									id="lastName"
// 									placeholder="Watson"
// 									value={guestInfo.lastName}
// 									onChange={(e) => updateGuestInfo('lastName')(e.target.value)}
// 									className={errors.lastName ? 'border-red-500' : ''}
// 								/>
// 								{errors.lastName && (
// 									<p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
// 								)}
// 							</div>
// 						</div>

// 						<div className="mb-6">
// 							<Label htmlFor="email">
// 								Email address <span className="text-red-500">*</span>
// 							</Label>
// 							<Input
// 								id="email"
// 								type="email"
// 								placeholder="dellryuzi@gmail.com"
// 								value={guestInfo.email}
// 								onChange={(e) => updateGuestInfo('email')(e.target.value)}
// 								className={errors.email ? 'border-red-500' : ''}
// 							/>
// 							<p className="mt-1 text-xs text-gray-500">
// 								Confirmation email sent to this address
// 							</p>
// 							{errors.email && (
// 								<p className="mt-1 text-sm text-red-500">{errors.email}</p>
// 							)}
// 						</div>

// 						<div className="mb-6">
// 							<Label htmlFor="country">
// 								Country/Region <span className="text-red-500">*</span>
// 							</Label>
// 							<Select
// 								value={guestInfo.country}
// 								onValueChange={updateGuestInfo('country')}
// 							>
// 								<SelectTrigger>
// 									<SelectValue />
// 								</SelectTrigger>
// 								<SelectContent>
// 									<SelectItem value="indonesia">Indonesia</SelectItem>
// 									<SelectItem value="singapore">Singapore</SelectItem>
// 									<SelectItem value="malaysia">Malaysia</SelectItem>
// 									<SelectItem value="thailand">Thailand</SelectItem>
// 									<SelectItem value="philippines">Philippines</SelectItem>
// 									<SelectItem value="vietnam">Vietnam</SelectItem>
// 									<SelectItem value="other">Other</SelectItem>
// 								</SelectContent>
// 							</Select>
// 						</div>

// 						<div className="mb-6">
// 							<Label htmlFor="phone">
// 								Phone number <span className="text-red-500">*</span>
// 							</Label>
// 							<div className="flex gap-2">
// 								<Select defaultValue="+62">
// 									<SelectTrigger className="w-24">
// 										<SelectValue />
// 									</SelectTrigger>
// 									<SelectContent>
// 										<SelectItem value="+62">ID +62</SelectItem>
// 										<SelectItem value="+65">SG +65</SelectItem>
// 										<SelectItem value="+60">MY +60</SelectItem>
// 										<SelectItem value="+66">TH +66</SelectItem>
// 									</SelectContent>
// 								</Select>
// 								<Input
// 									id="phone"
// 									placeholder="0812-1227-2639"
// 									value={guestInfo.phone}
// 									onChange={(e) => updateGuestInfo('phone')(e.target.value)}
// 									className={`flex-1 ${errors.phone ? 'border-red-500' : ''}`}
// 								/>
// 							</div>
// 							<p className="mt-1 text-xs text-gray-500">
// 								To verify your booking, and for the property to contact if needed
// 							</p>
// 							{errors.phone && (
// 								<p className="mt-1 text-sm text-red-500">{errors.phone}</p>
// 							)}
// 						</div>

// 						<div className="mb-6 space-y-4">
// 							<div className="flex items-start gap-3">
// 								<Checkbox
// 									id="paperless"
// 									checked={reservationDetails.paperlessConfirmation}
// 									onCheckedChange={(checked) =>
// 										updateReservationDetails('paperlessConfirmation')(
// 											checked as boolean
// 										)
// 									}
// 									className="mt-1"
// 								/>
// 								<Label htmlFor="paperless" className="text-sm leading-relaxed">
// 									Yes, I want free paperless confirmation (recommended)
// 									<br />
// 									<span className="text-gray-500">
// 										We'll text you a link to download our app
// 									</span>
// 								</Label>
// 							</div>

// 							<div className="flex items-start gap-3">
// 								<Checkbox
// 									id="updateAccount"
// 									checked={reservationDetails.updateAccount}
// 									onCheckedChange={(checked) =>
// 										updateReservationDetails('updateAccount')(
// 											checked as boolean
// 										)
// 									}
// 									className="mt-1"
// 								/>
// 								<Label htmlFor="updateAccount" className="text-sm leading-relaxed">
// 									Update my account to include these new details
// 								</Label>
// 							</div>
// 						</div>

// 						{/* Who are you booking for */}
// 						<div className="mb-6">
// 							<h3 className="mb-3 font-medium">
// 								Who are you booking for?{' '}
// 								<span className="text-gray-500">(optional)</span>
// 							</h3>
// 							<div className="space-y-2">
// 								<div className="flex items-center gap-2">
// 									<input
// 										type="radio"
// 										id="mainGuest"
// 										name="bookingFor"
// 										checked={reservationDetails.isMainGuest}
// 										onChange={() =>
// 											updateReservationDetails('isMainGuest')(true)
// 										}
// 										className="h-4 w-4 text-blue-600"
// 									/>
// 									<Label htmlFor="mainGuest" className="text-sm">
// 										I'm the main guest
// 									</Label>
// 								</div>
// 								<div className="flex items-center gap-2">
// 									<input
// 										type="radio"
// 										id="someoneElse"
// 										name="bookingFor"
// 										checked={!reservationDetails.isMainGuest}
// 										onChange={() =>
// 											updateReservationDetails('isMainGuest')(false)
// 										}
// 										className="h-4 w-4 text-blue-600"
// 									/>
// 									<Label htmlFor="someoneElse" className="text-sm">
// 										I'm booking for someone else
// 									</Label>
// 								</div>
// 							</div>
// 						</div>

// 						{/* Work Travel */}
// 						<div className="mb-6">
// 							<h3 className="mb-3 font-medium">
// 								Are you traveling for work?{' '}
// 								<span className="text-gray-500">(optional)</span>
// 							</h3>
// 							<div className="flex items-center gap-4">
// 								<div className="flex items-center gap-2">
// 									<input
// 										type="radio"
// 										id="workYes"
// 										name="workTravel"
// 										checked={reservationDetails.isWorkTravel}
// 										onChange={() =>
// 											updateReservationDetails('isWorkTravel')(true)
// 										}
// 										className="h-4 w-4 text-blue-600"
// 									/>
// 									<Label htmlFor="workYes" className="text-sm">
// 										Yes
// 									</Label>
// 								</div>
// 								<div className="flex items-center gap-2">
// 									<input
// 										type="radio"
// 										id="workNo"
// 										name="workTravel"
// 										checked={!reservationDetails.isWorkTravel}
// 										onChange={() =>
// 											updateReservationDetails('isWorkTravel')(false)
// 										}
// 										className="h-4 w-4 text-blue-600"
// 									/>
// 									<Label htmlFor="workNo" className="text-sm">
// 										No
// 									</Label>
// 								</div>
// 							</div>
// 						</div>
// 					</div>

// 					{/* Room Details */}
// 					<div className="rounded-lg border bg-white p-6">
// 						<h2 className="mb-4 text-xl font-semibold">{roomType}</h2>

// 						<div className="mb-6 space-y-3">
// 							<div className="flex items-center gap-2 text-sm">
// 								<span className="h-4 w-4 rounded-sm bg-gray-400"></span>
// 								<span>Non-refundable</span>
// 							</div>
// 							<div className="flex items-center gap-2 text-sm">
// 								<Users className="h-4 w-4 text-gray-400" />
// 								<span>Guests: 1 adult</span>
// 							</div>
// 							<div className="flex items-center gap-2 text-sm">
// 								<User className="h-4 w-4 text-gray-400" />
// 								<span>Main guest: Dale Watson</span>
// 							</div>
// 							<div className="flex items-center gap-2 text-sm">
// 								<span className="h-4 w-4 rounded-sm bg-gray-400"></span>
// 								<span>No smoking</span>
// 							</div>
// 						</div>

// 						<div className="mb-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
// 							<h4 className="mb-2 flex items-center gap-2 font-medium text-yellow-800">
// 								<Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
// 								Your Genius benefits
// 							</h4>
// 							<div className="text-sm text-yellow-700">
// 								<div className="font-medium">10% discount</div>
// 								<div>
// 									You're getting a 10% discount on the price of this option before
// 									taxes and fees apply.
// 								</div>
// 							</div>
// 						</div>

// 						<div className="space-y-4">
// 							<h4 className="font-medium">Add to your stay</h4>

// 							<div className="space-y-3">
// 								<div className="flex items-start gap-3 rounded-lg border p-3">
// 									<Checkbox id="flight" className="mt-1" />
// 									<div className="flex-1">
// 										<Label htmlFor="flight" className="text-sm font-medium">
// 											I'll need a flight for my trip
// 										</Label>
// 										<p className="mt-1 text-xs text-gray-600">
// 											Flexible flight options from Jakarta to Singapore
// 											starting at Rp 2,237,007 round-trip. Finish booking this
// 											stay to get flight recommendations that match your
// 											selected dates.
// 										</p>
// 									</div>
// 									<div className="flex h-8 w-8 items-center justify-center rounded bg-gray-100">
// 										✈️
// 									</div>
// 								</div>

// 								<div className="flex items-start gap-3 rounded-lg border p-3">
// 									<Checkbox id="car" className="mt-1" />
// 									<div className="flex-1">
// 										<Label htmlFor="car" className="text-sm font-medium">
// 											I'm interested in renting a car with up to 10% off
// 										</Label>
// 										<p className="mt-1 text-xs text-gray-600">
// 											Save up to 10% off select rental cars with your Genius
// 											and Trip Savings rewards – we'll add rental car options
// 											in your booking confirmation.
// 										</p>
// 									</div>
// 									<div className="flex h-8 w-8 items-center justify-center rounded bg-gray-100">
// 										🚗
// 									</div>
// 								</div>

// 								<div className="flex items-start gap-3 rounded-lg border p-3">
// 									<Checkbox id="taxi" className="mt-1" />
// 									<div className="flex-1">
// 										<Label htmlFor="taxi" className="text-sm font-medium">
// 											I'm interested in booking an airport taxi with 10% off
// 										</Label>
// 										<p className="mt-1 text-xs text-gray-600">
// 											Save 10% on all airport taxis when you book with us –
// 											we'll add taxi options to your booking confirmation.
// 										</p>
// 									</div>
// 									<div className="flex h-8 w-8 items-center justify-center rounded bg-gray-100">
// 										🚕
// 									</div>
// 								</div>
// 							</div>
// 						</div>
// 					</div>

// 					{/* Special Requests */}
// 					<div className="rounded-lg border bg-white p-6">
// 						<h2 className="mb-4 text-xl font-semibold">Special requests</h2>
// 						<p className="mb-4 text-sm text-gray-600">
// 							Special requests can't be guaranteed, but the property will do its best
// 							to meet your needs. You can always make a special request after your
// 							booking is complete.
// 						</p>

// 						<div className="mb-4">
// 							<Label htmlFor="specialRequests">
// 								Please write your requests in English.{' '}
// 								<span className="text-gray-500">(optional)</span>
// 							</Label>
// 							<Textarea
// 								id="specialRequests"
// 								placeholder="e.g. Twin beds, high floor, quiet room..."
// 								value={reservationDetails.specialRequests}
// 								onChange={(e) =>
// 									updateReservationDetails('specialRequests')(e.target.value)
// 								}
// 								rows={4}
// 								className="mt-2"
// 							/>
// 						</div>
// 					</div>

// 					{/* Arrival Time */}
// 					<div className="rounded-lg border bg-white p-6">
// 						<h2 className="mb-4 text-xl font-semibold">Your arrival time</h2>

// 						<div className="mb-6 space-y-4">
// 							<div className="flex items-center gap-2 text-sm text-green-600">
// 								<CheckCircle className="h-4 w-4" />
// 								<span>
// 									Your room will be ready for check-in between 3:00&nbsp;PM and
// 									12:00&nbsp;AM
// 								</span>
// 							</div>
// 							<div className="flex items-center gap-2 text-sm text-blue-600">
// 								<User className="h-4 w-4" />
// 								<span>24-hour front desk – help whenever you need it!</span>
// 							</div>
// 						</div>

// 						<div>
// 							<Label htmlFor="arrivalTime">
// 								Add your estimated arrival time{' '}
// 								<span className="text-gray-500">(optional)</span>
// 							</Label>
// 							<Select
// 								value={reservationDetails.arrivalTime}
// 								onValueChange={(value) =>
// 									updateReservationDetails('arrivalTime')(value)
// 								}
// 							>
// 								<SelectTrigger className="mt-2">
// 									<SelectValue placeholder="Please select" />
// 								</SelectTrigger>
// 								<SelectContent>
// 									{arrivalTimes.map((time) => (
// 										<SelectItem key={time} value={time}>
// 											{time}
// 										</SelectItem>
// 									))}
// 								</SelectContent>
// 							</Select>
// 							<p className="mt-1 text-xs text-gray-500">
// 								Time is for Singapore time zone
// 							</p>
// 						</div>
// 					</div>

// 					{/* Next Button */}
// 					<div className="flex items-center justify-between">
// 						<div className="flex items-center gap-2 text-blue-600">
// 							<span className="text-sm">💰 We Price Match</span>
// 						</div>
// 						<TextureButton variant="primary" className="px-8" onClick={handleSubmit}>
// 							Next: Final details →
// 						</TextureButton>
// 					</div>

// 					<div className="text-center">
// 						<button className="text-sm text-blue-600 hover:underline">
// 							What are my booking conditions?
// 						</button>
// 					</div>
// 				</div>
// 			</div>
// 		</Container>
// 	);
// }
