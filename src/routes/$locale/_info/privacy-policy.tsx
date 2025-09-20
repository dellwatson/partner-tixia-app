import { createFileRoute } from '@tanstack/react-router';
import { Shield, Eye, Lock, Users, Globe, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Container } from '~/components/ui/container';

export const Route = createFileRoute('/$locale/_info/privacy-policy')({
	component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
	return (
		<div className="min-h-screen bg-gray-50">
			{/* Hero Section */}
			<div className="bg-blue-600 text-white py-16">
				<Container>
					<div className="text-center">
						<Shield className="h-16 w-16 mx-auto mb-4 text-blue-200" />
						<h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
						<p className="text-xl text-blue-100 max-w-2xl mx-auto">
							Your privacy is important to us. Learn how we collect, use, and protect your personal information.
						</p>
						<div className="mt-6 text-sm text-blue-200">
							Last updated: September 15, 2025
						</div>
					</div>
				</Container>
			</div>

			<Container className="py-12">
				{/* Quick Overview */}
				<Card className="mb-12">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Eye className="h-5 w-5 text-blue-600" />
							Privacy at a Glance
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
							<div className="text-center">
								<div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
									<Lock className="h-6 w-6 text-blue-600" />
								</div>
								<h3 className="font-semibold mb-2">Data Protection</h3>
								<p className="text-sm text-gray-600">
									We use industry-standard encryption to protect your personal information
								</p>
							</div>
							<div className="text-center">
								<div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
									<Users className="h-6 w-6 text-green-600" />
								</div>
								<h3 className="font-semibold mb-2">No Selling</h3>
								<p className="text-sm text-gray-600">
									We never sell your personal data to third parties
								</p>
							</div>
							<div className="text-center">
								<div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
									<Globe className="h-6 w-6 text-purple-600" />
								</div>
								<h3 className="font-semibold mb-2">Your Control</h3>
								<p className="text-sm text-gray-600">
									You can access, update, or delete your data at any time
								</p>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Main Content */}
				<div className="space-y-8">
					<Card>
						<CardHeader>
							<CardTitle>1. Information We Collect</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div>
								<h3 className="font-semibold text-gray-900 mb-2">Personal Information</h3>
								<p className="text-gray-600 mb-2">
									When you create an account or make a booking, we collect:
								</p>
								<ul className="text-gray-600 space-y-1 ml-4">
									<li>• Name, email address, and phone number</li>
									<li>• Billing and shipping addresses</li>
									<li>• Payment information (processed securely by our payment partners)</li>
									<li>• Travel preferences and booking history</li>
								</ul>
							</div>
							<div>
								<h3 className="font-semibold text-gray-900 mb-2">Usage Information</h3>
								<p className="text-gray-600 mb-2">
									We automatically collect information about how you use our platform:
								</p>
								<ul className="text-gray-600 space-y-1 ml-4">
									<li>• Device information and IP address</li>
									<li>• Browser type and operating system</li>
									<li>• Pages visited and time spent on our platform</li>
									<li>• Search queries and booking interactions</li>
								</ul>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>2. How We Use Your Information</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div>
								<h3 className="font-semibold text-gray-900 mb-2">Service Provision</h3>
								<ul className="text-gray-600 space-y-1 ml-4">
									<li>• Process and manage your bookings</li>
									<li>• Provide customer support and assistance</li>
									<li>• Send booking confirmations and travel updates</li>
									<li>• Facilitate communication with travel providers</li>
								</ul>
							</div>
							<div>
								<h3 className="font-semibold text-gray-900 mb-2">Platform Improvement</h3>
								<ul className="text-gray-600 space-y-1 ml-4">
									<li>• Analyze usage patterns to improve our services</li>
									<li>• Personalize your experience and recommendations</li>
									<li>• Develop new features and functionality</li>
									<li>• Ensure platform security and prevent fraud</li>
								</ul>
							</div>
							<div>
								<h3 className="font-semibold text-gray-900 mb-2">Communication</h3>
								<ul className="text-gray-600 space-y-1 ml-4">
									<li>• Send important account and booking notifications</li>
									<li>• Share travel deals and promotions (with your consent)</li>
									<li>• Conduct surveys and gather feedback</li>
									<li>• Provide customer support responses</li>
								</ul>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>3. Information Sharing</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div>
								<h3 className="font-semibold text-gray-900 mb-2">Travel Partners</h3>
								<p className="text-gray-600">
									We share necessary booking information with hotels, airlines, and other travel 
									providers to complete your reservations. This includes your name, contact 
									information, and booking details.
								</p>
							</div>
							<div>
								<h3 className="font-semibold text-gray-900 mb-2">Service Providers</h3>
								<p className="text-gray-600">
									We work with trusted third-party service providers who help us operate our 
									platform, including payment processors, customer support tools, and analytics 
									services. These partners are contractually bound to protect your information.
								</p>
							</div>
							<div>
								<h3 className="font-semibold text-gray-900 mb-2">Legal Requirements</h3>
								<p className="text-gray-600">
									We may disclose your information when required by law, to protect our rights, 
									or to ensure the safety and security of our users and platform.
								</p>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>4. Data Security</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<p className="text-gray-600">
								We implement comprehensive security measures to protect your personal information:
							</p>
							<ul className="text-gray-600 space-y-1 ml-4">
								<li>• SSL encryption for all data transmission</li>
								<li>• Secure data storage with access controls</li>
								<li>• Regular security audits and monitoring</li>
								<li>• Employee training on data protection</li>
								<li>• Compliance with international security standards</li>
							</ul>
							<p className="text-gray-600 mt-4">
								While we strive to protect your information, no method of transmission over the 
								internet is 100% secure. We encourage you to use strong passwords and keep 
								your account information confidential.
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>5. Your Rights and Choices</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div>
								<h3 className="font-semibold text-gray-900 mb-2">Access and Control</h3>
								<p className="text-gray-600 mb-2">You have the right to:</p>
								<ul className="text-gray-600 space-y-1 ml-4">
									<li>• Access and review your personal information</li>
									<li>• Update or correct inaccurate data</li>
									<li>• Delete your account and associated data</li>
									<li>• Export your data in a portable format</li>
									<li>• Opt out of marketing communications</li>
								</ul>
							</div>
							<div>
								<h3 className="font-semibold text-gray-900 mb-2">Cookie Preferences</h3>
								<p className="text-gray-600">
									You can manage your cookie preferences through your browser settings or our 
									cookie preference center. Note that disabling certain cookies may affect 
									platform functionality.
								</p>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>6. International Transfers</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-gray-600">
								As a global platform, we may transfer your information to countries outside 
								your residence. We ensure appropriate safeguards are in place, including 
								standard contractual clauses and adequacy decisions, to protect your data 
								during international transfers.
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>7. Data Retention</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-gray-600">
								We retain your personal information for as long as necessary to provide our 
								services, comply with legal obligations, and resolve disputes. Booking 
								information is typically retained for 7 years for tax and legal purposes. 
								You can request deletion of your account and data at any time.
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>8. Children's Privacy</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-gray-600">
								Our services are not intended for children under 16. We do not knowingly 
								collect personal information from children. If you believe we have collected 
								information from a child, please contact us immediately.
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>9. Changes to This Policy</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-gray-600">
								We may update this privacy policy periodically to reflect changes in our 
								practices or legal requirements. We will notify you of significant changes 
								via email or platform notifications. Your continued use of our services 
								constitutes acceptance of the updated policy.
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<FileText className="h-5 w-5 text-blue-600" />
								10. Contact Us
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-gray-600 mb-4">
								If you have questions about this privacy policy or our data practices, 
								please contact us:
							</p>
							<div className="space-y-2 text-gray-600">
								<div><strong>Email:</strong> privacy@tixia.com</div>
								<div><strong>Address:</strong> 123 Travel Street, San Francisco, CA 94105</div>
								<div><strong>Data Protection Officer:</strong> dpo@tixia.com</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</Container>
		</div>
	)
}
