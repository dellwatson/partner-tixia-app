import { createFileRoute } from '@tanstack/react-router';
import { Search, BookOpen, MessageCircle, Phone, Plane, Building2, CreditCard, User, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { TextureButton } from '~/components/ui/texture-button';
import { Container } from '~/components/ui/container';
import { useState } from 'react';

export const Route = createFileRoute('/$locale/_info/help-center')({
	component: HelpCenterPage,
});

function HelpCenterPage() {
	const [searchQuery, setSearchQuery] = useState('');

	const popularTopics = [
		{
			icon: Plane,
			title: 'Flight Bookings',
			description: 'How to book, modify, and cancel flights',
			articles: 12,
			color: 'blue'
		},
		{
			icon: Building2,
			title: 'Hotel Reservations',
			description: 'Everything about hotel bookings and stays',
			articles: 15,
			color: 'green'
		},
		{
			icon: CreditCard,
			title: 'Payments & Refunds',
			description: 'Payment methods, refunds, and billing',
			articles: 8,
			color: 'purple'
		},
		{
			icon: User,
			title: 'Account Management',
			description: 'Profile settings, security, and preferences',
			articles: 6,
			color: 'orange'
		}
	]

	const quickHelp = [
		{
			question: 'How do I cancel my booking?',
			answer: 'You can cancel most bookings through your account under "My Trips" or by contacting our support team. Cancellation policies vary by provider.'
		},
		{
			question: 'When will I receive my refund?',
			answer: 'Refunds typically process within 3-14 business days depending on your payment method and the provider\'s refund policy.'
		},
		{
			question: 'Can I modify my booking dates?',
			answer: 'Many bookings can be modified, though fees may apply. Check your booking details or contact us for modification options.'
		},
		{
			question: 'What if my flight is delayed or cancelled?',
			answer: 'Contact the airline directly for rebooking. We can help you understand your rights and assist with alternative arrangements.'
		},
		{
			question: 'How do I add special requests?',
			answer: 'Special requests can be added through your booking management page or by contacting the hotel/airline directly.'
		},
		{
			question: 'Is travel insurance recommended?',
			answer: 'Yes, we highly recommend travel insurance to protect against unexpected events. You can purchase coverage during booking.'
		}
	]

	const getColorClasses = (color: string) => {
		const colors = {
			blue: 'bg-blue-100 text-blue-600',
			green: 'bg-green-100 text-green-600',
			purple: 'bg-purple-100 text-purple-600',
			orange: 'bg-orange-100 text-orange-600'
		}
		return colors[color as keyof typeof colors] || colors.blue;
	}

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Hero Section */}
			<div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-20">
				<Container>
					<div className="text-center">
						<BookOpen className="h-16 w-16 mx-auto mb-6 text-blue-200" />
						<h1 className="text-5xl font-bold mb-6">Help Center</h1>
						<p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
							Find answers to your questions and get the help you need for your travel bookings.
						</p>
						
						{/* Search Bar */}
						<div className="max-w-2xl mx-auto">
							<div className="relative">
								<Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
								<input
									type='text'
									placeholder="Search for help articles..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className="w-full pl-12 pr-4 py-4 rounded-xl border-0 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-300 focus:outline-none text-lg"
								/>
								<TextureButton 
									variant='primary' 
									className="absolute right-2 top-1/2 transform -translate-y-1/2"
								>
									Search
								</TextureButton>
							</div>
						</div>
					</div>
				</Container>
			</div>

			<Container className="py-16">
				{/* Quick Contact Options */}
				<div className="grid gap-6 md:grid-cols-3 mb-16">
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
							<CardTitle className="text-lg">Call Support</CardTitle>
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
								<BookOpen className="h-6 w-6 text-purple-600" />
							</div>
							<CardTitle className="text-lg">Browse Articles</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-gray-600 text-sm mb-4">
								Explore our knowledge base
							</p>
							<TextureButton variant="outline" className="w-full">
								View All Articles
							</TextureButton>
						</CardContent>
					</Card>
				</div>

				{/* Popular Topics */}
				<div className="mb-16">
					<h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Popular Topics</h2>
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
						{popularTopics.map((topic, index) => (
							<Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
								<CardHeader>
									<div className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full ${getColorClasses(topic.color)}`}>
										<topic.icon className="h-6 w-6" />
									</div>
									<CardTitle className="text-center text-lg">{topic.title}</CardTitle>
								</CardHeader>
								<CardContent className="text-center">
									<p className="text-gray-600 text-sm mb-3">{topic.description}</p>
									<div className="text-xs text-gray-500 mb-4">{topic.articles} articles</div>
									<TextureButton variant="outline" className="w-full">
										Explore <ChevronRight className="h-4 w-4 ml-1" />
									</TextureButton>
								</CardContent>
							</Card>
						))}
					</div>
				</div>

				{/* Quick Help - FAQ */}
				<Card className="mb-16">
					<CardHeader>
						<CardTitle className="text-center text-2xl">Frequently Asked Questions</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid gap-6 md:grid-cols-2">
							{quickHelp.map((item, index) => (
								<div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
									<h3 className="font-semibold text-gray-900 mb-2">{item.question}</h3>
									<p className="text-gray-600 text-sm">{item.answer}</p>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				{/* Help Categories */}
				<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Plane className="h-5 w-5 text-blue-600" />
								Flight Help
							</CardTitle>
						</CardHeader>
						<CardContent>
							<ul className="space-y-2 text-sm">
								<li><a href="#" className="text-blue-600 hover:underline">How to book a flight</a></li>
								<li><a href="#" className="text-blue-600 hover:underline">Flight cancellation policy</a></li>
								<li><a href="#" className="text-blue-600 hover:underline">Baggage allowance guide</a></li>
								<li><a href="#" className="text-blue-600 hover:underline">Check-in procedures</a></li>
								<li><a href="#" className="text-blue-600 hover:underline">Flight delay compensation</a></li>
							</ul>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Building2 className="h-5 w-5 text-green-600" />
								Hotel Help
							</CardTitle>
						</CardHeader>
						<CardContent>
							<ul className="space-y-2 text-sm">
								<li><a href="#" className="text-green-600 hover:underline">How to book a hotel</a></li>
								<li><a href="#" className="text-green-600 hover:underline">Hotel cancellation policy</a></li>
								<li><a href="#" className="text-green-600 hover:underline">Check-in and check-out</a></li>
								<li><a href="#" className="text-green-600 hover:underline">Room preferences</a></li>
								<li><a href="#" className="text-green-600 hover:underline">Hotel amenities guide</a></li>
							</ul>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<CreditCard className="h-5 w-5 text-purple-600" />
								Payment Help
							</CardTitle>
						</CardHeader>
						<CardContent>
							<ul className="space-y-2 text-sm">
								<li><a href="#" className="text-purple-600 hover:underline">Payment methods accepted</a></li>
								<li><a href="#" className="text-purple-600 hover:underline">How to request a refund</a></li>
								<li><a href="#" className="text-purple-600 hover:underline">Currency conversion</a></li>
								<li><a href="#" className="text-purple-600 hover:underline">Payment security</a></li>
								<li><a href="#" className="text-purple-600 hover:underline">Billing questions</a></li>
							</ul>
						</CardContent>
					</Card>
				</div>

				{/* Contact Support */}
				<Card className="text-center">
					<CardHeader>
						<CardTitle className="text-2xl">Still Need Help?</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-gray-600 mb-6">
							Can't find what you're looking for? Our support team is here to help you 24/7.
						</p>
						<div className="flex gap-4 justify-center flex-wrap">
							<TextureButton variant="primary">
								Contact Support
							</TextureButton>
							<TextureButton variant="outline">
								Submit a Request
							</TextureButton>
							<TextureButton variant="outline">
								Community Forum
							</TextureButton>
						</div>
						<div className="mt-6 pt-6 border-t">
							<p className="text-sm text-gray-500">
								Average response time: <span className="font-semibold">2 hours</span> • 
								Customer satisfaction: <span className="font-semibold">98%</span>
							</p>
						</div>
					</CardContent>
				</Card>
			</Container>
		</div>
	)
}
