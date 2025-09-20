import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { TextureButton } from '~/components/ui/texture-button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '~/components/ui/select';
import { Textarea } from '~/components/ui/textarea';
import { Checkbox } from '~/components/ui/checkbox';
import { Container } from '~/components/ui/container';
import { useHotelCheckoutStore } from '~/stores/hotel-checkout-store';
import { useSelectionStore } from '~/lib/stores/selection-store';
import { formatSelected } from '~/lib/currency';
import { HotelReservationSummary } from '~/components/hotel-reservation/HotelReservationSummary';
import {
	Calendar,
	MapPin,
	Users,
	Bed,
	Clock,
	Phone,
	Mail,
	User,
	CheckCircle,
	Star,
} from 'lucide-react';

export const Route = createFileRoute('/$locale/_booking/reserve/form/$bookingId')({
	component: ReservationFormPage,
});

interface GuestInfo {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	country: string;
}

interface ReservationDetails {
	checkIn: string;
	checkOut: string;
	guests: number;
	rooms: number;
	specialRequests: string;
	arrivalTime: string;
	isMainGuest: boolean;
	isWorkTravel: boolean;
	paperlessConfirmation: boolean;
	updateAccount: boolean;
}

function ReservationFormPage() {
	const { locale, bookingId } = Route.useParams();
	const navigate = useNavigate();
	const { getDraft, setGuestInfo, setReservationDetails, setStatus, getPriceBreakdown } =
		useHotelCheckoutStore();
	const getSelection = useSelectionStore((s) => s.getSelection);

	// Get hotel selection and checkout data
	const hotelSel = getSelection(bookingId || '');
	const draft = getDraft(bookingId || '');
	const breakdown = getPriceBreakdown(bookingId || '');

	// Ensure we have valid breakdown data
	const safeBreakdown = breakdown || {
		baseRoomRate: 0,
		taxes: 0,
		fees: 0,
		paymentFee: 0,
		total: 0,
		currency: 'IDR',
	};

	// Initialize draft if it doesn't exist
	useEffect(() => {
		if (bookingId && hotelSel && hotelSel.type === 'hotel' && !draft) {
			// Initialize with base room rate from hotel selection
			const baseRate = 1500000; // This should come from hotel data
			useHotelCheckoutStore.getState().initDraft(bookingId, baseRate);
		}
	}, [bookingId, hotelSel, draft]);

	// Initialize form state from draft or defaults
	const [guestInfo, setGuestInfoState] = useState<GuestInfo>({
		firstName: draft?.guest?.firstName || '',
		lastName: draft?.guest?.lastName || '',
		email: draft?.guest?.email || '',
		phone: draft?.guest?.phone || '',
		country: draft?.guest?.country || '',
	});

	const [reservationDetails, setReservationDetailsState] = useState<ReservationDetails>({
		checkIn:
			draft?.reservation?.checkIn ||
			(hotelSel && hotelSel.type === 'hotel' ? hotelSel.searchParams?.checkIn || '' : ''),
		checkOut:
			draft?.reservation?.checkOut ||
			(hotelSel && hotelSel.type === 'hotel' ? hotelSel.searchParams?.checkOut || '' : ''),
		guests:
			draft?.reservation?.guests ||
			(hotelSel && hotelSel.type === 'hotel' ? hotelSel.searchParams?.guests || 1 : 1),
		rooms:
			draft?.reservation?.rooms ||
			(hotelSel && hotelSel.type === 'hotel' ? hotelSel.searchParams?.rooms || 1 : 1),
		specialRequests: draft?.reservation?.specialRequests || '',
		arrivalTime: draft?.reservation?.arrivalTime || '',
		isMainGuest: draft?.reservation?.isMainGuest ?? true,
		isWorkTravel: draft?.reservation?.isWorkTravel ?? false,
		paperlessConfirmation: draft?.reservation?.paperlessConfirmation ?? true,
		updateAccount: false,
	});

	const [errors, setErrors] = useState<Partial<GuestInfo>>({});

	const validateForm = () => {
		const newErrors: Partial<GuestInfo> = {};

		if (!guestInfo.firstName.trim()) newErrors.firstName = 'First name is required';
		if (!guestInfo.lastName.trim()) newErrors.lastName = 'Last name is required';
		if (!guestInfo.email.trim()) newErrors.email = 'Email is required';
		if (!guestInfo.phone.trim()) newErrors.phone = 'Phone number is required';

		// Email validation
		if (guestInfo.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guestInfo.email)) {
			newErrors.email = 'Please enter a valid email address';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = () => {
		if (!validateForm()) return;

		if (!bookingId) {
			alert('Booking ID is missing');
			return;
		}

		// Save data to checkout store
		setGuestInfo(bookingId, guestInfo);
		setReservationDetails(bookingId, reservationDetails);
		setStatus(bookingId, 'form_completed');

		// Navigate to payment page and pass form data via search
		navigate({
			to: '/$locale/reserve/payment/$bookingId',
			params: { locale, bookingId },
			search: {
				guestInfo: JSON.stringify(guestInfo),
				reservationDetails: JSON.stringify(reservationDetails),
			},
		});
	};

	const updateGuestInfo = (field: keyof GuestInfo) => (value: string) => {
		setGuestInfoState((prev) => ({ ...prev, [field]: value }));
		if (errors[field]) {
			setErrors((prev) => ({ ...prev, [field]: undefined }));
		}
	};

	const updateReservationDetails =
		(field: keyof ReservationDetails) => (value: string | number | boolean) => {
			setReservationDetailsState((prev) => ({ ...prev, [field]: value }));
		};

	// Hotel and pricing data
	const hotelName =
		hotelSel && hotelSel.type === 'hotel' ? hotelSel.listItem.name : 'Grand Hotel Jakarta';
	const hotelAddress =
		hotelSel && hotelSel.type === 'hotel'
			? hotelSel.listItem.location
			: 'Jl. MH Thamrin No. 1, Jakarta Pusat';
	const roomType = draft?.roomType || 'Deluxe Room';
	const nights =
		reservationDetails.checkIn && reservationDetails.checkOut
			? Math.max(
					1,
					Math.ceil(
						(new Date(reservationDetails.checkOut).getTime() -
							new Date(reservationDetails.checkIn).getTime()) /
							(1000 * 60 * 60 * 24)
					)
				)
			: 1;

	const arrivalTimes = [
		"I don't know",
		'00:00 - 01:00',
		'01:00 - 02:00',
		'02:00 - 03:00',
		'03:00 - 04:00',
		'05:00 - 06:00',
		'06:00 - 07:00',
		'07:00 - 08:00',
		'08:00 - 09:00',
		'09:00 - 10:00',
		'10:00 - 11:00',
		'11:00 - 12:00',
		'12:00 - 13:00',
		'13:00 - 14:00',
		'14:00 - 15:00',
		'15:00 - 16:00',
		'16:00 - 17:00',
		'17:00 - 18:00',
		'18:00 - 19:00',
		'19:00 - 20:00',
		'20:00 - 21:00',
		'21:00 - 22:00',
		'22:00 - 23:00',
		'23:00 - 00:00',
	];

	return (
		<Container size="xl" className="py-8">
			{/* Progress Steps */}
			<div className="mb-8">
				<div className="mb-6 flex items-center justify-center">
					<div className="flex items-center space-x-4">
						<div className="flex items-center">
							<div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-medium text-white">
								<CheckCircle className="h-4 w-4" />
							</div>
							<span className="ml-2 text-sm font-medium text-blue-600">
								Your Selection
							</span>
						</div>
						<div className="h-0.5 w-12 bg-blue-600"></div>
						<div className="flex items-center">
							<div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-medium text-white">
								2
							</div>
							<span className="ml-2 text-sm font-medium text-blue-600">
								Your Details
							</span>
						</div>
						<div className="h-0.5 w-12 bg-gray-200"></div>
						<div className="flex items-center">
							<div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-medium text-gray-600">
								3
							</div>
							<span className="ml-2 text-sm font-medium text-gray-600">
								Finish booking
							</span>
						</div>
					</div>
				</div>
			</div>

			{/* Grid layout with Left and Right columns */}
			<div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
				{/* Left Column - Hotel Info & Booking Details */}
				<div className="lg:col-span-1">
					<HotelReservationSummary
						hotel={{
							name: hotelName,
							rating: hotelSel && hotelSel.type === 'hotel' ? hotelSel.listItem.rating : 4.8,
							location: hotelAddress,
							image: hotelSel && hotelSel.type === 'hotel' ? hotelSel.listItem.image : '/api/placeholder/120/80'
						}}
						reservation={{
							checkIn: reservationDetails.checkIn,
							checkOut: reservationDetails.checkOut,
							guests: reservationDetails.guests,
							rooms: reservationDetails.rooms,
							nights: nights
						}}
						pricing={{
							baseRoomRate: safeBreakdown.baseRoomRate,
							taxes: safeBreakdown.taxes,
							fees: safeBreakdown.fees,
							total: safeBreakdown.total
						}}
						roomType={roomType}
						variant="form"
					/>
				</div>

				{/* Right Column */}
				<div className="space-y-6 lg:col-span-2">
					{/* Enter your details */}
					<div className="rounded-lg border bg-white p-6">
						<h2 className="mb-4 text-xl font-semibold">Enter your details</h2>
						<p className="mb-6 text-sm text-gray-600">
							<CheckCircle className="mr-1 inline h-4 w-4 text-green-600" />
							Almost done! Just fill in the <span className="text-red-500">
								*
							</span>{' '}
							required info
						</p>

						<div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
							<div>
								<Label htmlFor="firstName">
									First name <span className="text-red-500">*</span>
								</Label>
								<Input
									id="firstName"
									placeholder="Dale"
									value={guestInfo.firstName}
									onChange={(e) => updateGuestInfo('firstName')(e.target.value)}
									className={errors.firstName ? 'border-red-500' : ''}
								/>
								{errors.firstName && (
									<p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
								)}
							</div>

							<div>
								<Label htmlFor="lastName">
									Last name <span className="text-red-500">*</span>
								</Label>
								<Input
									id="lastName"
									placeholder="Watson"
									value={guestInfo.lastName}
									onChange={(e) => updateGuestInfo('lastName')(e.target.value)}
									className={errors.lastName ? 'border-red-500' : ''}
								/>
								{errors.lastName && (
									<p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
								)}
							</div>
						</div>

						<div className="mb-6">
							<Label htmlFor="email">
								Email address <span className="text-red-500">*</span>
							</Label>
							<Input
								id="email"
								type="email"
								placeholder="you@example.com"
								value={guestInfo.email}
								onChange={(e) => updateGuestInfo('email')(e.target.value)}
								className={errors.email ? 'border-red-500' : ''}
							/>
							<p className="mt-1 text-xs text-gray-500">
								Confirmation email sent to this address
							</p>
							{errors.email && (
								<p className="mt-1 text-sm text-red-500">{errors.email}</p>
							)}
						</div>

						<div className="mb-6">
							<Label htmlFor="country">
								Country/Region <span className="text-red-500">*</span>
							</Label>
							<Select
								value={guestInfo.country}
								onValueChange={updateGuestInfo('country')}
							>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="indonesia">Indonesia</SelectItem>
									<SelectItem value="singapore">Singapore</SelectItem>
									<SelectItem value="malaysia">Malaysia</SelectItem>
									<SelectItem value="thailand">Thailand</SelectItem>
									<SelectItem value="philippines">Philippines</SelectItem>
									<SelectItem value="vietnam">Vietnam</SelectItem>
									<SelectItem value="other">Other</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="mb-6">
							<Label htmlFor="phone">
								Phone number <span className="text-red-500">*</span>
							</Label>
							<div className="flex gap-2">
								<Select defaultValue="+62">
									<SelectTrigger className="w-24">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="+62">ID +62</SelectItem>
										<SelectItem value="+65">SG +65</SelectItem>
										<SelectItem value="+60">MY +60</SelectItem>
										<SelectItem value="+66">TH +66</SelectItem>
									</SelectContent>
								</Select>
								<Input
									id="phone"
									placeholder="0812-XXXX-XXXX"
									value={guestInfo.phone}
									onChange={(e) => updateGuestInfo('phone')(e.target.value)}
									className={`flex-1 ${errors.phone ? 'border-red-500' : ''}`}
								/>
							</div>
							<p className="mt-1 text-xs text-gray-500">
								To verify your booking, and for the property to contact if needed
							</p>
							{errors.phone && (
								<p className="mt-1 text-sm text-red-500">{errors.phone}</p>
							)}
						</div>

						<div className="mb-6 space-y-4">
							<div className="flex items-start gap-3">
								<Checkbox
									id="paperless"
									checked={reservationDetails.paperlessConfirmation}
									onCheckedChange={(checked) =>
										updateReservationDetails('paperlessConfirmation')(
											checked as boolean
										)
									}
									className="mt-1"
								/>
								<Label htmlFor="paperless" className="text-sm leading-relaxed">
									Yes, I want free paperless confirmation (recommended)
									<br />
									<span className="text-gray-500">
										We'll text you a link to download our app
									</span>
								</Label>
							</div>

							<div className="flex items-start gap-3">
								<Checkbox
									id="updateAccount"
									checked={reservationDetails.updateAccount}
									onCheckedChange={(checked) =>
										updateReservationDetails('updateAccount')(
											checked as boolean
										)
									}
									className="mt-1"
								/>
								<Label htmlFor="updateAccount" className="text-sm leading-relaxed">
									Update my account to include these new details
								</Label>
							</div>
						</div>

						{/* Who are you booking for */}
						<div className="mb-6">
							<h3 className="mb-3 font-medium">
								Who are you booking for?{' '}
								<span className="text-gray-500">(optional)</span>
							</h3>
							<div className="space-y-2">
								<div className="flex items-center gap-2">
									<input
										type="radio"
										id="mainGuest"
										name="bookingFor"
										checked={reservationDetails.isMainGuest}
										onChange={() =>
											updateReservationDetails('isMainGuest')(true)
										}
										className="h-4 w-4 text-blue-600"
									/>
									<Label htmlFor="mainGuest" className="text-sm">
										I'm the main guest
									</Label>
								</div>
								<div className="flex items-center gap-2">
									<input
										type="radio"
										id="someoneElse"
										name="bookingFor"
										checked={!reservationDetails.isMainGuest}
										onChange={() =>
											updateReservationDetails('isMainGuest')(false)
										}
										className="h-4 w-4 text-blue-600"
									/>
									<Label htmlFor="someoneElse" className="text-sm">
										I'm booking for someone else
									</Label>
								</div>
							</div>
						</div>

						{/* Work Travel */}
						<div className="mb-6">
							<h3 className="mb-3 font-medium">
								Are you traveling for work?{' '}
								<span className="text-gray-500">(optional)</span>
							</h3>
							<div className="flex items-center gap-4">
								<div className="flex items-center gap-2">
									<input
										type="radio"
										id="workYes"
										name="workTravel"
										checked={reservationDetails.isWorkTravel}
										onChange={() =>
											updateReservationDetails('isWorkTravel')(true)
										}
										className="h-4 w-4 text-blue-600"
									/>
									<Label htmlFor="workYes" className="text-sm">
										Yes
									</Label>
								</div>
								<div className="flex items-center gap-2">
									<input
										type="radio"
										id="workNo"
										name="workTravel"
										checked={!reservationDetails.isWorkTravel}
										onChange={() =>
											updateReservationDetails('isWorkTravel')(false)
										}
										className="h-4 w-4 text-blue-600"
									/>
									<Label htmlFor="workNo" className="text-sm">
										No
									</Label>
								</div>
							</div>
						</div>
					</div>

					{/* Special Requests */}
					<div className="rounded-lg border bg-white p-6">
						<h2 className="mb-4 text-xl font-semibold">Special requests</h2>
						<p className="mb-4 text-sm text-gray-600">
							Special requests can't be guaranteed, but the property will do its best
							to meet your needs. You can always make a special request after your
							booking is complete.
						</p>
						<div className="mb-4">
							<Label htmlFor="specialRequests">
								Please write your requests in English.{' '}
								<span className="text-gray-500">(optional)</span>
							</Label>
							<Textarea
								id="specialRequests"
								placeholder="e.g. Twin beds, high floor, quiet room..."
								value={reservationDetails.specialRequests}
								onChange={(e) =>
									updateReservationDetails('specialRequests')(e.target.value)
								}
								rows={4}
								className="mt-2"
							/>
						</div>
					</div>

					{/* Arrival Time */}
					<div className="rounded-lg border bg-white p-6">
						<h2 className="mb-4 text-xl font-semibold">Your arrival time</h2>
						<div className="mb-6 space-y-4">
							<div className="flex items-center gap-2 text-sm text-green-600">
								<CheckCircle className="h-4 w-4" />
								<span>
									Your room will be ready for check-in between 3:00 PM and 12:00
									AM
								</span>
							</div>
							<div className="flex items-center gap-2 text-sm text-blue-600">
								<User className="h-4 w-4" />
								<span>24-hour front desk – help whenever you need it!</span>
							</div>
						</div>
						<div>
							<Label htmlFor="arrivalTime">
								Add your estimated arrival time{' '}
								<span className="text-gray-500">(optional)</span>
							</Label>
							<Select
								value={reservationDetails.arrivalTime}
								onValueChange={(value) =>
									updateReservationDetails('arrivalTime')(value)
								}
							>
								<SelectTrigger className="mt-2">
									<SelectValue placeholder="Please select" />
								</SelectTrigger>
								<SelectContent>
									{arrivalTimes.map((time) => (
										<SelectItem key={time} value={time}>
											{time}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<p className="mt-1 text-xs text-gray-500">
								Time is for Singapore time zone
							</p>
						</div>
					</div>

					{/* Next Button */}
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2 text-blue-600"></div>
						<div>
							<TextureButton variant="accent" className="" onClick={handleSubmit}>
								Next: Final details →
							</TextureButton>
						</div>
					</div>
				</div>
			</div>
		</Container>
	);
}
