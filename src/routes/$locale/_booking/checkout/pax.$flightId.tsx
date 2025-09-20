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
import { Checkbox } from '~/components/ui/checkbox';
import { Phone, Mail, User, MapPin } from 'lucide-react';
import { useSelectionStore } from '~/lib/stores/selection-store';
import { formatFromUSD } from '~/lib/currency';
import { useFlightCheckoutStore } from '~/stores/flight-checkout-store';
import { PriceSummary } from '~/components/payment/PriceSummary';
import { Container } from '~/components/ui/container';
import { Calendar } from '~/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { Button } from '~/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '~/lib/utils';

export const Route = createFileRoute('/$locale/_booking/checkout/pax/$flightId')({
	component: YourDetailsPage,
});

interface PassengerDetails {
	title: string;
	firstName: string;
	lastName: string;
	dateOfBirth: string;
	nationality: string;
	passportNumber: string;
	passportExpiry: string;
}

interface ContactDetails {
	email: string;
	confirmEmail: string;
	phone: string;
	countryCode: string;
}

function YourDetailsPage() {
	const { locale, flightId } = Route.useParams();
	const navigate = useNavigate();
	const getSelection = useSelectionStore((s) => s.getSelection);
	const sel = getSelection(flightId || '');
	const route = sel && sel.type === 'flight' ? sel.item.route : undefined;
	const checkout = useFlightCheckoutStore();

	// Ensure draft exists for deep-linking and proper currency breakdown
	useEffect(() => {
		if (sel && sel.type === 'flight') {
			const baseUSD = 'total_price' in sel.item ? sel.item.total_price : sel.item.price;
			checkout.initDraft(sel.id, baseUSD);
		}
	}, [flightId]);

	const [passengerDetails, setPassengerDetails] = useState<PassengerDetails>({
		title: '',
		firstName: '',
		lastName: '',
		dateOfBirth: '',
		nationality: '',
		passportNumber: '',
		passportExpiry: '',
	});

	const [contactDetails, setContactDetails] = useState<ContactDetails>({
		email: '',
		confirmEmail: '',
		phone: '',
		countryCode: '+62',
	});

	const [agreeToTerms, setAgreeToTerms] = useState(false);
	const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);

	const handleContinue = () => {
		// Persist pax details to checkout draft
		if (flightId) {
			checkout.setPax(flightId, {
				title: passengerDetails.title,
				firstName: passengerDetails.firstName,
				lastName: passengerDetails.lastName,
				dateOfBirth: passengerDetails.dateOfBirth,
				nationality: passengerDetails.nationality,
				email: contactDetails.email,
				phone: `${contactDetails.countryCode} ${contactDetails.phone}`,
			});
		}
		// Navigate to extras page
		navigate({
			to: '/$locale/checkout/extras/$flightId',
			params: {
				locale,
				flightId,
			},
		});
	};

	const countries = [
		'Indonesia',
		'Singapore',
		'Malaysia',
		'Thailand',
		'Philippines',
		'Vietnam',
		'United States',
		'United Kingdom',
		'Australia',
		'Japan',
	];

	return (
		<div className="min-h-screen bg-gray-50 py-8">
			<Container>
				{/* Header */}
				<div className="mb-8">
					<div className="mb-2 text-sm text-gray-600">
						{sel && sel.type === 'flight' && 'outbound' in sel.item
							? 'Round trip'
							: 'One way'}{' '}
						• 1 traveller
					</div>
					<h1 className="mb-4 text-3xl font-bold">
						{route ? `${route.from.city} to ${route.to.city}` : 'Your trip'}
					</h1>
				</div>

				<div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
					{/* Left Column - Forms */}
					<div className="space-y-8 lg:col-span-2">
						{/* Passenger Details */}
						<div className="rounded-lg border bg-white p-6">
							<div className="mb-6 flex items-center gap-3">
								<User className="h-5 w-5 text-blue-600" />
								<h2 className="text-xl font-semibold">Passenger details</h2>
							</div>

							<div className="space-y-4">
								<div className="grid grid-cols-1 gap-4 md:grid-cols-4">
									<div>
										<Label htmlFor="title">Title *</Label>
										<Select
											value={passengerDetails.title}
											onValueChange={(value) =>
												setPassengerDetails((prev) => ({
													...prev,
													title: value,
												}))
											}
										>
											<SelectTrigger>
												<SelectValue placeholder="Select" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="mr">Mr</SelectItem>
												<SelectItem value="mrs">Mrs</SelectItem>
												<SelectItem value="ms">Ms</SelectItem>
											</SelectContent>
										</Select>
									</div>
									<div className="md:col-span-3">
										<Label htmlFor="firstName">First name *</Label>
										<Input
											id="firstName"
											value={passengerDetails.firstName}
											onChange={(e) =>
												setPassengerDetails((prev) => ({
													...prev,
													firstName: e.target.value,
												}))
											}
											placeholder="Enter first name"
										/>
									</div>
								</div>

								<div>
									<Label htmlFor="lastName">Last name *</Label>
									<Input
										id="lastName"
										value={passengerDetails.lastName}
										onChange={(e) =>
											setPassengerDetails((prev) => ({
												...prev,
												lastName: e.target.value,
											}))
										}
										placeholder="Enter last name"
									/>
								</div>

								<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
									<div>
										<Label htmlFor="dateOfBirth">Date of birth *</Label>
										<Popover>
											<PopoverTrigger asChild>
												<Button
													variant="outline"
													className={cn(
														"w-full justify-start text-left font-normal",
														!passengerDetails.dateOfBirth && "text-muted-foreground"
													)}
												>
													<CalendarIcon className="mr-2 h-4 w-4" />
													{passengerDetails.dateOfBirth ? (
														format(new Date(passengerDetails.dateOfBirth), "PPP")
													) : (
														<span>Pick a date</span>
													)}
												</Button>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0">
												<Calendar
													mode="single"
													selected={passengerDetails.dateOfBirth ? new Date(passengerDetails.dateOfBirth) : undefined}
													onSelect={(date) => {
														if (date) {
															setPassengerDetails((prev) => ({
																...prev,
																dateOfBirth: date.toISOString().slice(0, 10),
															}));
														}
													}}
													disabled={{ after: new Date() }}
													initialFocus
												/>
											</PopoverContent>
										</Popover>
									</div>
									<div>
										<Label htmlFor="nationality">Nationality *</Label>
										<Select
											value={passengerDetails.nationality}
											onValueChange={(value) =>
												setPassengerDetails((prev) => ({
													...prev,
													nationality: value,
												}))
											}
										>
											<SelectTrigger>
												<SelectValue placeholder="Select nationality" />
											</SelectTrigger>
											<SelectContent>
												{countries.map((country) => (
													<SelectItem
														key={country}
														value={country.toLowerCase()}
													>
														{country}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>
								</div>

								<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
									<div>
										<Label htmlFor="passportNumber">Passport number *</Label>
										<Input
											id="passportNumber"
											value={passengerDetails.passportNumber}
											onChange={(e) =>
												setPassengerDetails((prev) => ({
													...prev,
													passportNumber: e.target.value,
												}))
											}
											placeholder="Enter passport number"
										/>
									</div>
									<div>
										<Label htmlFor="passportExpiry">Passport expiry date *</Label>
										<Popover>
											<PopoverTrigger asChild>
												<Button
													variant="outline"
													className={cn(
														"w-full justify-start text-left font-normal",
														!passengerDetails.passportExpiry && "text-muted-foreground"
													)}
												>
													<CalendarIcon className="mr-2 h-4 w-4" />
													{passengerDetails.passportExpiry ? (
														format(new Date(passengerDetails.passportExpiry), "PPP")
													) : (
														<span>Pick a date</span>
													)}
												</Button>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0">
												<Calendar
													mode="single"
													selected={passengerDetails.passportExpiry ? new Date(passengerDetails.passportExpiry) : undefined}
													onSelect={(date) => {
														if (date) {
															setPassengerDetails((prev) => ({
																...prev,
																passportExpiry: date.toISOString().slice(0, 10),
															}));
														}
													}}
													disabled={{ before: new Date() }}
													initialFocus
												/>
											</PopoverContent>
										</Popover>
									</div>
								</div>
							</div>
						</div>

						{/* Contact Details */}
						<div className="rounded-lg border bg-white p-6">
							<div className="mb-6 flex items-center gap-3">
								<Mail className="h-5 w-5 text-blue-600" />
								<h2 className="text-xl font-semibold">Contact details</h2>
							</div>

							<div className="space-y-4">
								<div>
									<Label htmlFor="email">Email address *</Label>
									<Input
										id="email"
										type="email"
										value={contactDetails.email}
										onChange={(e) =>
											setContactDetails((prev) => ({
												...prev,
												email: e.target.value,
											}))
										}
										placeholder="Enter email address"
									/>
									<p className="mt-1 text-sm text-gray-600">
										Your booking confirmation will be sent to this email
									</p>
								</div>

								<div>
									<Label htmlFor="confirmEmail">Confirm email address *</Label>
									<Input
										id="confirmEmail"
										type="email"
										value={contactDetails.confirmEmail}
										onChange={(e) =>
											setContactDetails((prev) => ({
												...prev,
												confirmEmail: e.target.value,
											}))
										}
										placeholder="Confirm email address"
									/>
								</div>

								<div>
									<Label htmlFor="phone">Phone number *</Label>
									<div className="flex gap-2">
										<Select
											value={contactDetails.countryCode}
											onValueChange={(value) =>
												setContactDetails((prev) => ({
													...prev,
													countryCode: value,
												}))
											}
										>
											<SelectTrigger className="w-24">
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="+62">+62</SelectItem>
												<SelectItem value="+65">+65</SelectItem>
												<SelectItem value="+60">+60</SelectItem>
												<SelectItem value="+66">+66</SelectItem>
												<SelectItem value="+1">+1</SelectItem>
												<SelectItem value="+44">+44</SelectItem>
											</SelectContent>
										</Select>
										<Input
											id="phone"
											value={contactDetails.phone}
											onChange={(e) =>
												setContactDetails((prev) => ({
													...prev,
													phone: e.target.value,
												}))
											}
											placeholder="Enter phone number"
											className="flex-1"
										/>
									</div>
								</div>
							</div>
						</div>

						{/* Terms and Conditions */}
						<div className="rounded-lg border bg-white p-6">
							<div className="space-y-4">
								<div className="flex items-start gap-3">
									<Checkbox
										id="terms"
										checked={agreeToTerms}
										onCheckedChange={(checked) =>
											setAgreeToTerms(checked as boolean)
										}
									/>
									<div className="text-sm">
										<Label htmlFor="terms" className="cursor-pointer">
											I agree to the{' '}
											<a href="#" className="text-blue-600 hover:underline">
												terms and conditions
											</a>{' '}
											and{' '}
											<a href="#" className="text-blue-600 hover:underline">
												privacy policy
											</a>
											*
										</Label>
									</div>
								</div>

								<div className="flex items-start gap-3">
									<Checkbox
										id="newsletter"
										checked={subscribeNewsletter}
										onCheckedChange={(checked) =>
											setSubscribeNewsletter(checked as boolean)
										}
									/>
									<div className="text-sm">
										<Label htmlFor="newsletter" className="cursor-pointer">
											I want to receive exclusive deals and travel inspiration via
											email
										</Label>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Right Column - Price Summary */}
					<div className="lg:col-span-1">
						{flightId && (
							<PriceSummary
								title="Price summary"
								items={(() => {
									const b = checkout.getSelectedBreakdown(flightId);
									return [
										{ label: 'Flight', amount: b.baseSelected },
										{ label: 'Adult (1)', amount: b.baseSelected },
									];
								})()}
								total={checkout.getSelectedBreakdown(flightId).totalSelected}
								buttonText="Continue"
								buttonDisabled={!agreeToTerms}
								isProcessing={false}
								onButtonClick={handleContinue}
							/>
						)}
					</div>
				</div>
			</Container>
		</div>
	);
}
