import { createFileRoute } from '@tanstack/react-router';
import { Mail, Phone, MessageCircle, Clock, MapPin, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { TextureButton } from '~/components/ui/texture-button';
import { Container } from '~/components/ui/container';

export const Route = createFileRoute('/$locale/_info/contact')({
	component: ContactPage,
});

function ContactPage() {
	return (
		<div className="min-h-screen bg-gray-50">
			{/* Hero Section */}
			<div className="bg-blue-600 text-white py-16">
				<Container>
					<div className="text-center">
						<h1 className="text-4xl font-bold mb-4">Contact Us</h1>
						<p className="text-xl text-blue-100 max-w-2xl mx-auto">
							We're here to help you 24/7. Get in touch with our customer support team
							for any questions about your bookings or travel plans.
						</p>
					</div>
				</Container>
			</div>

			<Container className="py-12">
				{/* Contact Methods */}
				<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
					<Card className="text-center">
						<CardHeader>
							<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
								<Phone className="h-6 w-6 text-blue-600" />
							</div>
							<CardTitle>Call Us</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-gray-600 mb-4">
								Speak directly with our support team
							</p>
							<div className="space-y-2">
								<div className="font-semibold text-blue-600">+1 (555) 123-4567</div>
								<div className="text-sm text-gray-500">Available 24/7</div>
							</div>
						</CardContent>
					</Card>

					<Card className="text-center">
						<CardHeader>
							<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
								<MessageCircle className="h-6 w-6 text-green-600" />
							</div>
							<CardTitle>Live Chat</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-gray-600 mb-4">
								Get instant help through live chat
							</p>
							<TextureButton variant="primary" className="w-full">
								Start Chat
							</TextureButton>
						</CardContent>
					</Card>

					<Card className="text-center">
						<CardHeader>
							<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
								<Mail className="h-6 w-6 text-purple-600" />
							</div>
							<CardTitle>Email Support</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-gray-600 mb-4">
								Send us an email for detailed inquiries
							</p>
							<div className="space-y-2">
								<div className="font-semibold text-purple-600">support@tixia.com</div>
								<div className="text-sm text-gray-500">Response within 24 hours</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Office Information */}
				<div className="grid gap-8 md:grid-cols-2 mb-12">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<MapPin className="h-5 w-5 text-blue-600" />
								Our Offices
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-6">
							<div>
								<h3 className="font-semibold text-gray-900 mb-2">Headquarters</h3>
								<p className="text-gray-600">
									123 Travel Street<br />
									San Francisco, CA 94105<br />
									United States
								</p>
							</div>
							<div>
								<h3 className="font-semibold text-gray-900 mb-2">European Office</h3>
								<p className="text-gray-600">
									456 Tourism Avenue<br />
									Amsterdam, 1012 AB<br />
									Netherlands
								</p>
							</div>
							<div>
								<h3 className="font-semibold text-gray-900 mb-2">Asia Pacific Office</h3>
								<p className="text-gray-600">
									789 Booking Boulevard<br />
									Singapore 018956<br />
									Singapore
								</p>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Clock className="h-5 w-5 text-blue-600" />
								Support Hours
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div>
								<h3 className="font-semibold text-gray-900 mb-2">Phone Support</h3>
								<p className="text-gray-600">Available 24/7, 365 days a year</p>
							</div>
							<div>
								<h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
								<p className="text-gray-600">
									Monday - Sunday: 6:00 AM - 12:00 AM (PST)
								</p>
							</div>
							<div>
								<h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
								<p className="text-gray-600">
									We respond to emails within 24 hours during business days
								</p>
							</div>
							<div className="pt-4 border-t">
								<div className="flex items-center gap-2 text-sm text-gray-600">
									<Globe className="h-4 w-4" />
									<span>Support available in 40+ languages</span>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* FAQ Section */}
				<Card>
					<CardHeader>
						<CardTitle>Frequently Asked Questions</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid gap-6 md:grid-cols-2">
							<div>
								<h3 className="font-semibold text-gray-900 mb-2">How can I modify my booking?</h3>
								<p className="text-gray-600 text-sm">
									You can modify most bookings through your account or by contacting our support team. 
									Modification fees may apply depending on the booking terms.
								</p>
							</div>
							<div>
								<h3 className="font-semibold text-gray-900 mb-2">What is your cancellation policy?</h3>
								<p className="text-gray-600 text-sm">
									Cancellation policies vary by booking type and provider. Check your booking 
									confirmation for specific terms or contact us for assistance.
								</p>
							</div>
							<div>
								<h3 className="font-semibold text-gray-900 mb-2">How do I get a refund?</h3>
								<p className="text-gray-600 text-sm">
									Refund eligibility depends on your booking terms. Contact our support team 
									with your booking reference for personalized assistance.
								</p>
							</div>
							<div>
								<h3 className="font-semibold text-gray-900 mb-2">Is my payment information secure?</h3>
								<p className="text-gray-600 text-sm">
									Yes, we use industry-standard encryption and security measures to protect 
									your payment information and personal data.
								</p>
							</div>
						</div>
						<div className="mt-6 pt-6 border-t text-center">
							<p className="text-gray-600 mb-4">
								Can't find what you're looking for?
							</p>
							<TextureButton variant="outline">
								Visit Help Center
							</TextureButton>
						</div>
					</CardContent>
				</Card>
			</Container>
		</div>
	)
}
