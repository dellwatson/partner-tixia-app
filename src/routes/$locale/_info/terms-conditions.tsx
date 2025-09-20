import { createFileRoute } from '@tanstack/react-router';
import { Scale, FileText, AlertTriangle, CreditCard, Plane, Building2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Container } from '~/components/ui/container';

export const Route = createFileRoute('/$locale/_info/terms-conditions')({
	component: TermsConditionsPage,
});

function TermsConditionsPage() {
	return (
		<div className="min-h-screen bg-gray-50">
			{/* Hero Section */}
			<div className="bg-blue-600 text-white py-16">
				<Container>
					<div className="text-center">
						<Scale className="h-16 w-16 mx-auto mb-4 text-blue-200" />
						<h1 className="text-4xl font-bold mb-4">Terms and Conditions</h1>
						<p className="text-xl text-blue-100 max-w-2xl mx-auto">
							Please read these terms carefully before using our platform and services.
						</p>
						<div className="mt-6 text-sm text-blue-200">
							Last updated: September 15, 2025
						</div>
					</div>
				</Container>
			</div>

			<Container className="py-12">
				{/* Important Notice */}
				<Card className="mb-12 border-orange-200 bg-orange-50">
					<CardHeader>
						<CardTitle className="flex items-center gap-2 text-orange-800">
							<AlertTriangle className="h-5 w-5" />
							Important Notice
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-orange-700">
							By using Tixia's services, you agree to be bound by these terms and conditions. 
							If you do not agree with any part of these terms, please do not use our platform. 
							These terms constitute a legally binding agreement between you and Tixia.
						</p>
					</CardContent>
				</Card>

				{/* Main Content */}
				<div className="space-y-8">
					<Card>
						<CardHeader>
							<CardTitle>1. Acceptance of Terms</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<p className="text-gray-600">
								These Terms and Conditions ("Terms") govern your use of the Tixia platform 
								and services. By accessing or using our website, mobile application, or 
								services, you acknowledge that you have read, understood, and agree to be 
								bound by these Terms.
							</p>
							<p className="text-gray-600">
								We reserve the right to modify these Terms at any time. Changes will be 
								effective immediately upon posting. Your continued use of our services 
								after changes are posted constitutes acceptance of the modified Terms.
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>2. Eligibility and Account Registration</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div>
								<h3 className="font-semibold text-gray-900 mb-2">Age Requirements</h3>
								<p className="text-gray-600">
									You must be at least 18 years old to create an account and make bookings. 
									Users between 16-18 may use our services with parental consent.
								</p>
							</div>
							<div>
								<h3 className="font-semibold text-gray-900 mb-2">Account Responsibility</h3>
								<ul className="text-gray-600 space-y-1 ml-4">
									<li>• You are responsible for maintaining account security</li>
									<li>• Provide accurate and complete information</li>
									<li>• Keep your login credentials confidential</li>
									<li>• Notify us immediately of unauthorized access</li>
									<li>• You are liable for all activities under your account</li>
								</ul>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Building2 className="h-5 w-5 text-blue-600" />
								3. Booking Services
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div>
								<h3 className="font-semibold text-gray-900 mb-2">Platform Role</h3>
								<p className="text-gray-600">
									Tixia acts as an intermediary between you and travel service providers 
									(hotels, airlines, etc.). We facilitate bookings but are not the direct 
									provider of travel services.
								</p>
							</div>
							<div>
								<h3 className="font-semibold text-gray-900 mb-2">Booking Confirmation</h3>
								<ul className="text-gray-600 space-y-1 ml-4">
									<li>• Bookings are subject to availability and confirmation</li>
									<li>• Prices may change until booking is confirmed</li>
									<li>• You will receive confirmation via email</li>
									<li>• Check all booking details for accuracy</li>
								</ul>
							</div>
							<div>
								<h3 className="font-semibold text-gray-900 mb-2">Accuracy of Information</h3>
								<p className="text-gray-600">
									You must provide accurate personal information for all travelers. 
									Incorrect information may result in booking cancellation or additional fees.
								</p>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<CreditCard className="h-5 w-5 text-green-600" />
								4. Payment Terms
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div>
								<h3 className="font-semibold text-gray-900 mb-2">Payment Processing</h3>
								<ul className="text-gray-600 space-y-1 ml-4">
									<li>• Payment is required at time of booking</li>
									<li>• We accept major credit cards and digital payment methods</li>
									<li>• Payments are processed securely by certified partners</li>
									<li>• Currency conversion fees may apply</li>
								</ul>
							</div>
							<div>
								<h3 className="font-semibold text-gray-900 mb-2">Pricing and Fees</h3>
								<ul className="text-gray-600 space-y-1 ml-4">
									<li>• All prices include applicable taxes unless stated otherwise</li>
									<li>• Service fees may apply to certain bookings</li>
									<li>• Prices are subject to change until payment is completed</li>
									<li>• Additional fees may be charged by service providers</li>
								</ul>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>5. Cancellation and Refund Policy</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div>
								<h3 className="font-semibold text-gray-900 mb-2">General Policy</h3>
								<p className="text-gray-600">
									Cancellation and refund policies vary by service provider and booking type. 
									Specific terms are displayed during booking and in your confirmation email.
								</p>
							</div>
							<div>
								<h3 className="font-semibold text-gray-900 mb-2">Refund Processing</h3>
								<ul className="text-gray-600 space-y-1 ml-4">
									<li>• Refunds are processed according to provider policies</li>
									<li>• Processing time varies by payment method (3-14 business days)</li>
									<li>• Cancellation fees may apply</li>
									<li>• Non-refundable bookings cannot be refunded</li>
								</ul>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>6. User Conduct</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<p className="text-gray-600 mb-2">You agree not to:</p>
							<ul className="text-gray-600 space-y-1 ml-4">
								<li>• Use our platform for illegal or unauthorized purposes</li>
								<li>• Violate any applicable laws or regulations</li>
								<li>• Interfere with platform security or functionality</li>
								<li>• Submit false or misleading information</li>
								<li>• Harass other users or our staff</li>
								<li>• Attempt to gain unauthorized access to accounts or systems</li>
								<li>• Use automated tools to access our platform without permission</li>
							</ul>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>7. Limitation of Liability</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div>
								<h3 className="font-semibold text-gray-900 mb-2">Service Provider Responsibility</h3>
								<p className="text-gray-600">
									Travel service providers are responsible for the quality and delivery of 
									their services. Tixia is not liable for issues arising from provider services, 
									including but not limited to flight delays, hotel conditions, or service quality.
								</p>
							</div>
							<div>
								<h3 className="font-semibold text-gray-900 mb-2">Platform Liability</h3>
								<p className="text-gray-600">
									Our liability is limited to the amount paid for the specific booking. 
									We are not liable for indirect, incidental, or consequential damages, 
									including lost profits or travel expenses.
								</p>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Plane className="h-5 w-5 text-blue-600" />
								8. Travel Requirements
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div>
								<h3 className="font-semibold text-gray-900 mb-2">Documentation</h3>
								<p className="text-gray-600">
									You are responsible for ensuring you have valid travel documents, 
									including passports, visas, and health certificates required for your destination.
								</p>
							</div>
							<div>
								<h3 className="font-semibold text-gray-900 mb-2">Health and Safety</h3>
								<p className="text-gray-600">
									Check health advisories and travel warnings for your destination. 
									We recommend purchasing travel insurance to protect against unforeseen circumstances.
								</p>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>9. Intellectual Property</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-gray-600">
								All content on our platform, including text, graphics, logos, and software, 
								is owned by Tixia or our licensors and protected by copyright and trademark laws. 
								You may not reproduce, distribute, or create derivative works without permission.
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>10. Privacy</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-gray-600">
								Your privacy is important to us. Please review our Privacy Policy to understand 
								how we collect, use, and protect your personal information. By using our services, 
								you consent to our privacy practices as described in the Privacy Policy.
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>11. Dispute Resolution</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div>
								<h3 className="font-semibold text-gray-900 mb-2">Customer Support</h3>
								<p className="text-gray-600">
									We encourage you to contact our customer support team first to resolve 
									any issues. Most disputes can be resolved quickly through direct communication.
								</p>
							</div>
							<div>
								<h3 className="font-semibold text-gray-900 mb-2">Governing Law</h3>
								<p className="text-gray-600">
									These Terms are governed by the laws of California, United States. 
									Any disputes will be resolved in the courts of San Francisco County, California.
								</p>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>12. Termination</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-gray-600">
								We may suspend or terminate your account at any time for violation of these Terms 
								or for any other reason at our discretion. You may close your account at any time 
								by contacting customer support. Termination does not affect existing bookings or 
								payment obligations.
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<FileText className="h-5 w-5 text-blue-600" />
								13. Contact Information
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-gray-600 mb-4">
								If you have questions about these Terms and Conditions, please contact us:
							</p>
							<div className="space-y-2 text-gray-600">
								<div><strong>Email:</strong> legal@tixia.com</div>
								<div><strong>Address:</strong> 123 Travel Street, San Francisco, CA 94105</div>
								<div><strong>Customer Support:</strong> support@tixia.com</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</Container>
		</div>
	)
}
