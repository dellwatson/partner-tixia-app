import { createFileRoute } from '@tanstack/react-router';
import { Users, Globe, Award, Heart, Plane, Building2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Container } from '~/components/ui/container';

export const Route = createFileRoute('/$locale/_info/about')({
	component: AboutPage,
});

function AboutPage() {
	return (
		<div className="min-h-screen bg-gray-50">
			{/* Hero Section */}
			<div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
				<Container>
					<div className="text-center max-w-4xl mx-auto">
						<h1 className="text-5xl font-bold mb-6">About Tixia</h1>
						<p className="text-xl text-blue-100 mb-8">
							We're on a mission to make travel accessible, affordable, and unforgettable 
							for everyone around the world.
						</p>
						<div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
							<div className="text-center">
								<div className="text-3xl font-bold">50M+</div>
								<div className="text-blue-200">Happy Travelers</div>
							</div>
							<div className="text-center">
								<div className="text-3xl font-bold">200+</div>
								<div className="text-blue-200">Countries</div>
							</div>
							<div className="text-center">
								<div className="text-3xl font-bold">1M+</div>
								<div className="text-blue-200">Properties</div>
							</div>
							<div className="text-center">
								<div className="text-3xl font-bold">24/7</div>
								<div className="text-blue-200">Support</div>
							</div>
						</div>
					</div>
				</Container>
			</div>

			<Container className="py-16">
				{/* Our Story */}
				<div className="text-center mb-16">
					<h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
					<div className="max-w-3xl mx-auto text-lg text-gray-600 space-y-4">
						<p>
							Founded in 2020, Tixia began with a simple vision: to democratize travel 
							and make it possible for anyone to explore the world. What started as a 
							small team of travel enthusiasts has grown into a global platform trusted 
							by millions of travelers worldwide.
						</p>
						<p>
							We believe that travel has the power to break down barriers, create 
							understanding, and build connections between people from different cultures 
							and backgrounds. That's why we're committed to making travel more accessible, 
							affordable, and sustainable for everyone.
						</p>
					</div>
				</div>

				{/* Our Values */}
				<div className="mb-16">
					<h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
					<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
						<Card className="text-center">
							<CardHeader>
								<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
									<Heart className="h-8 w-8 text-blue-600" />
								</div>
								<CardTitle>Customer First</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-gray-600">
									Every decision we make is guided by what's best for our travelers. 
									Your satisfaction and safety are our top priorities.
								</p>
							</CardContent>
						</Card>

						<Card className="text-center">
							<CardHeader>
								<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
									<Globe className="h-8 w-8 text-green-600" />
								</div>
								<CardTitle>Global Accessibility</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-gray-600">
									We're breaking down barriers to make travel accessible to everyone, 
									regardless of budget, background, or location.
								</p>
							</CardContent>
						</Card>

						<Card className="text-center">
							<CardHeader>
								<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
									<Award className="h-8 w-8 text-purple-600" />
								</div>
								<CardTitle>Excellence</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-gray-600">
									We strive for excellence in everything we do, from our platform 
									technology to our customer service experience.
								</p>
							</CardContent>
						</Card>
					</div>
				</div>

				{/* What We Offer */}
				<div className="mb-16">
					<h2 className="text-3xl font-bold text-gray-900 text-center mb-12">What We Offer</h2>
					<div className="grid gap-8 md:grid-cols-2">
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-3">
									<Building2 className="h-6 w-6 text-blue-600" />
									Hotels & Accommodations
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-gray-600 mb-4">
									From luxury resorts to budget-friendly hostels, we offer over 1 million 
									properties worldwide to suit every traveler's needs and budget.
								</p>
								<ul className="text-sm text-gray-600 space-y-1">
									<li>• Verified reviews from real guests</li>
									<li>• Best price guarantee</li>
									<li>• Free cancellation on most bookings</li>
									<li>• 24/7 customer support</li>
								</ul>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-3">
									<Plane className="h-6 w-6 text-green-600" />
									Flights & Travel
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-gray-600 mb-4">
									Compare and book flights from hundreds of airlines worldwide. 
									Find the best deals and most convenient routes for your journey.
								</p>
								<ul className="text-sm text-gray-600 space-y-1">
									<li>• Real-time price comparison</li>
									<li>• Flexible booking options</li>
									<li>• Mobile boarding passes</li>
									<li>• Travel insurance available</li>
								</ul>
							</CardContent>
						</Card>
					</div>
				</div>

				{/* Team Section */}
				<div className="text-center">
					<h2 className="text-3xl font-bold text-gray-900 mb-6">Our Team</h2>
					<div className="max-w-3xl mx-auto text-lg text-gray-600 mb-12">
						<p>
							Behind Tixia is a diverse team of travel experts, technology innovators, 
							and customer service professionals from around the world. We're united 
							by our passion for travel and our commitment to helping you create 
							unforgettable experiences.
						</p>
					</div>
					
					<div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
						<div className="text-center">
							<div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
								<Users className="h-12 w-12 text-white" />
							</div>
							<h3 className="font-semibold text-gray-900 mb-2">500+ Employees</h3>
							<p className="text-gray-600 text-sm">
								Across 25 countries working together to serve you better
							</p>
						</div>
						<div className="text-center">
							<div className="w-24 h-24 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
								<Globe className="h-12 w-12 text-white" />
							</div>
							<h3 className="font-semibold text-gray-900 mb-2">40+ Languages</h3>
							<p className="text-gray-600 text-sm">
								Customer support available in your preferred language
							</p>
						</div>
						<div className="text-center">
							<div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
								<Award className="h-12 w-12 text-white" />
							</div>
							<h3 className="font-semibold text-gray-900 mb-2">Award Winning</h3>
							<p className="text-gray-600 text-sm">
								Recognized for excellence in travel technology and service
							</p>
						</div>
					</div>
				</div>
			</Container>
		</div>
	)
}
