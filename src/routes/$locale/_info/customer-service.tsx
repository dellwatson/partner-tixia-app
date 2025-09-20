import { createFileRoute } from '@tanstack/react-router';
import { Headphones, MessageCircle, Phone, Mail, Clock, Search, BookOpen, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { TextureButton } from '~/components/ui/texture-button';
import { Container } from '~/components/ui/container';

export const Route = createFileRoute('/$locale/_info/customer-service')({
	component: CustomerServicePage,
});

function CustomerServicePage() {
	return (
		<div className="min-h-screen bg-gray-50">
			{/* Hero Section */}
			<div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">
				<Container>
					<div className="text-center">
						<Headphones className="h-16 w-16 mx-auto mb-4 text-blue-200" />
						<h1 className="text-4xl font-bold mb-4">Customer Service</h1>
						<p className="text-xl text-blue-100 max-w-2xl mx-auto">
							We're here to help you every step of your journey. Get support when you need it most.
						</p>
					</div>
				</Container>
			</div>

			<Container className="py-12">
				{/* Quick Actions */}
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
					<Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
						<CardHeader>
							<div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
								<MessageCircle className="h-6 w-6 text-blue-600" />
							</div>
							<CardTitle className="text-lg">Live Chat</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-gray-600 text-sm mb-4">
								Get instant help from our support team
							</p>
							<TextureButton variant="primary" className="w-full">
								Start Chat
							</TextureButton>
						</CardContent>
					</Card>

					<Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
						<CardHeader>
							<div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
								<Phone className="h-6 w-6 text-green-600" />
							</div>
							<CardTitle className="text-lg">Call Us</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-gray-600 text-sm mb-4">
								Speak with a support agent
							</p>
							<div className="font-semibold text-green-600 mb-2">+1 (555) 123-4567</div>
							<div className="text-xs text-gray-500">Available 24/7</div>
						</CardContent>
					</Card>

					<Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
						<CardHeader>
							<div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
								<Mail className="h-6 w-6 text-purple-600" />
							</div>
							<CardTitle className="text-lg">Email Support</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-gray-600 text-sm mb-4">
								Send us a detailed message
							</p>
							<div className="font-semibold text-purple-600 mb-2">support@tixia.com</div>
							<div className="text-xs text-gray-500">24h response time</div>
						</CardContent>
					</Card>

					<Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
						<CardHeader>
							<div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
								<BookOpen className="h-6 w-6 text-orange-600" />
							</div>
							<CardTitle className="text-lg">Help Center</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-gray-600 text-sm mb-4">
								Find answers to common questions
							</p>
							<TextureButton variant="outline" className="w-full">
								Browse Articles
							</TextureButton>
						</CardContent>
					</Card>
				</div>

				{/* Support Hours */}
				<Card className="mb-12">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Clock className="h-5 w-5 text-blue-600" />
							Support Availability
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid gap-6 md:grid-cols-3">
							<div>
								<h3 className="font-semibold text-gray-900 mb-2">Phone Support</h3>
								<p className="text-gray-600 text-sm mb-1">Available 24/7</p>
								<p className="text-gray-500 text-xs">All time zones covered</p>
							</div>
							<div>
								<h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
								<p className="text-gray-600 text-sm mb-1">6:00 AM - 12:00 AM PST</p>
								<p className="text-gray-500 text-xs">Monday through Sunday</p>
							</div>
							<div>
								<h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
								<p className="text-gray-600 text-sm mb-1">Response within 24 hours</p>
								<p className="text-gray-500 text-xs">Priority support available</p>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Common Issues */}
				<div className="grid gap-8 md:grid-cols-2 mb-12">
					<Card>
						<CardHeader>
							<CardTitle>Booking Issues</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div>
								<h3 className="font-semibold text-gray-900 mb-2">Need help with your booking?</h3>
								<ul className="text-gray-600 text-sm space-y-1">
									<li>• Modify or cancel reservations</li>
									<li>• Update passenger/guest information</li>
									<li>• Add special requests</li>
									<li>• Check booking status</li>
								</ul>
							</div>
							<TextureButton variant="outline" className="w-full">
								Manage Booking
							</TextureButton>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Payment & Refunds</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div>
								<h3 className="font-semibold text-gray-900 mb-2">Payment assistance</h3>
								<ul className="text-gray-600 text-sm space-y-1">
									<li>• Process refunds</li>
									<li>• Update payment methods</li>
									<li>• Resolve payment issues</li>
									<li>• Request receipts</li>
								</ul>
							</div>
							<TextureButton variant="outline" className="w-full">
								Payment Help
							</TextureButton>
						</CardContent>
					</Card>
				</div>

				{/* FAQ Section */}
				<Card className="mb-12">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Search className="h-5 w-5 text-blue-600" />
							Frequently Asked Questions
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid gap-6 md:grid-cols-2">
							<div className="space-y-4">
								<div>
									<h3 className="font-semibold text-gray-900 mb-2">How do I cancel my booking?</h3>
									<p className="text-gray-600 text-sm">
										You can cancel most bookings through your account or by contacting our support team. 
										Cancellation policies vary by provider.
									</p>
								</div>
								<div>
									<h3 className="font-semibold text-gray-900 mb-2">When will I receive my refund?</h3>
									<p className="text-gray-600 text-sm">
										Refunds typically process within 3-14 business days, depending on your payment method 
										and the provider's policy.
									</p>
								</div>
								<div>
									<h3 className="font-semibold text-gray-900 mb-2">Can I modify my booking?</h3>
									<p className="text-gray-600 text-sm">
										Many bookings can be modified, though fees may apply. Contact us or check your 
										booking details for modification options.
									</p>
								</div>
							</div>
							<div className="space-y-4">
								<div>
									<h3 className="font-semibold text-gray-900 mb-2">What if my flight is delayed?</h3>
									<p className="text-gray-600 text-sm">
										Contact the airline directly for flight changes. We can help you understand your 
										rights and options for compensation.
									</p>
								</div>
								<div>
									<h3 className="font-semibold text-gray-900 mb-2">How do I add special requests?</h3>
									<p className="text-gray-600 text-sm">
										Special requests can often be added through your booking management page or 
										by contacting the hotel/airline directly.
									</p>
								</div>
								<div>
									<h3 className="font-semibold text-gray-900 mb-2">Is travel insurance recommended?</h3>
									<p className="text-gray-600 text-sm">
										We highly recommend travel insurance to protect against unexpected events. 
										You can purchase coverage during booking or separately.
									</p>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Emergency Support */}
				<Card className="border-red-200 bg-red-50">
					<CardHeader>
						<CardTitle className="text-red-800">Emergency Travel Support</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid gap-6 md:grid-cols-2">
							<div>
								<h3 className="font-semibold text-red-800 mb-2">24/7 Emergency Line</h3>
								<p className="text-red-700 text-sm mb-2">
									For urgent travel emergencies, flight cancellations, or immediate assistance:
								</p>
								<div className="font-bold text-red-800 text-lg">+1 (555) 911-HELP</div>
							</div>
							<div>
								<h3 className="font-semibold text-red-800 mb-2">What qualifies as an emergency?</h3>
								<ul className="text-red-700 text-sm space-y-1">
									<li>• Flight cancellations or major delays</li>
									<li>• Hotel overbooking or closure</li>
									<li>• Natural disasters affecting travel</li>
									<li>• Medical emergencies while traveling</li>
								</ul>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Feedback Section */}
				<div className="text-center mt-12">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center justify-center gap-2">
								<Users className="h-5 w-5 text-blue-600" />
								We Value Your Feedback
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-gray-600 mb-6">
								Help us improve our service by sharing your experience. Your feedback helps us 
								serve you and other travelers better.
							</p>
							<div className="flex gap-4 justify-center">
								<TextureButton variant="primary">
									Leave Feedback
								</TextureButton>
								<TextureButton variant="outline">
									Rate Our Service
								</TextureButton>
							</div>
						</CardContent>
					</Card>
				</div>
			</Container>
		</div>
	)
}
