import { createFileRoute } from '@tanstack/react-router';
import { Shield, Lock, Eye, Users, AlertTriangle, CheckCircle, Globe, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { TextureButton } from '~/components/ui/texture-button';
import { Container } from '~/components/ui/container';

export const Route = createFileRoute('/$locale/_info/trust-safety')({
	component: TrustSafetyPage,
});

function TrustSafetyPage() {
	return (
		<div className="min-h-screen bg-gray-50">
			{/* Hero Section */}
			<div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
				<Container>
					<div className="text-center">
						<Shield className="h-20 w-20 mx-auto mb-6 text-green-200" />
						<h1 className="text-5xl font-bold mb-6">Trust and Safety</h1>
						<p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
							Your safety and security are our top priorities. Learn about the measures we take 
							to protect you and ensure a safe travel experience.
						</p>
						<div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
							<div className="text-center">
								<div className="text-3xl font-bold">256-bit</div>
								<div className="text-green-200">SSL Encryption</div>
							</div>
							<div className="text-center">
								<div className="text-3xl font-bold">24/7</div>
								<div className="text-green-200">Security Monitoring</div>
							</div>
							<div className="text-center">
								<div className="text-3xl font-bold">99.9%</div>
								<div className="text-green-200">Uptime Guarantee</div>
							</div>
							<div className="text-center">
								<div className="text-3xl font-bold">50M+</div>
								<div className="text-green-200">Protected Travelers</div>
							</div>
						</div>
					</div>
				</Container>
			</div>

			<Container className="py-16">
				{/* Safety Principles */}
				<div className="text-center mb-16">
					<h2 className="text-3xl font-bold text-gray-900 mb-6">Our Safety Principles</h2>
					<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
						<Card className="text-center">
							<CardHeader>
								<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
									<Lock className="h-8 w-8 text-blue-600" />
								</div>
								<CardTitle>Data Protection</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-gray-600">
									We use advanced encryption and security protocols to protect your personal 
									and financial information at every step.
								</p>
							</CardContent>
						</Card>

						<Card className="text-center">
							<CardHeader>
								<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
									<CheckCircle className="h-8 w-8 text-green-600" />
								</div>
								<CardTitle>Verified Partners</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-gray-600">
									All our travel partners undergo rigorous verification processes to ensure 
									they meet our high standards for safety and reliability.
								</p>
							</CardContent>
						</Card>

						<Card className="text-center">
							<CardHeader>
								<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
									<Eye className="h-8 w-8 text-purple-600" />
								</div>
								<CardTitle>Transparent Practices</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-gray-600">
									We believe in transparency. Our policies, fees, and terms are clearly 
									communicated so you can make informed decisions.
								</p>
							</CardContent>
						</Card>
					</div>
				</div>

				{/* Security Measures */}
				<Card className="mb-12">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Shield className="h-6 w-6 text-blue-600" />
							Security Measures
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid gap-8 md:grid-cols-2">
							<div>
								<h3 className="font-semibold text-gray-900 mb-4">Technical Security</h3>
								<ul className="space-y-3">
									<li className="flex items-start gap-3">
										<CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
										<div>
											<div className="font-medium">End-to-End Encryption</div>
											<div className="text-sm text-gray-600">All data transmission is protected with 256-bit SSL encryption</div>
										</div>
									</li>
									<li className="flex items-start gap-3">
										<CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
										<div>
											<div className="font-medium">Secure Payment Processing</div>
											<div className="text-sm text-gray-600">PCI DSS compliant payment systems with tokenization</div>
										</div>
									</li>
									<li className="flex items-start gap-3">
										<CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
										<div>
											<div className="font-medium">Multi-Factor Authentication</div>
											<div className="text-sm text-gray-600">Optional 2FA for enhanced account security</div>
										</div>
									</li>
									<li className="flex items-start gap-3">
										<CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
										<div>
											<div className="font-medium">Regular Security Audits</div>
											<div className="text-sm text-gray-600">Third-party security assessments and penetration testing</div>
										</div>
									</li>
								</ul>
							</div>
							<div>
								<h3 className="font-semibold text-gray-900 mb-4">Operational Security</h3>
								<ul className="space-y-3">
									<li className="flex items-start gap-3">
										<CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
										<div>
											<div className="font-medium">24/7 Monitoring</div>
											<div className="text-sm text-gray-600">Continuous monitoring for suspicious activities and threats</div>
										</div>
									</li>
									<li className="flex items-start gap-3">
										<CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
										<div>
											<div className="font-medium">Fraud Detection</div>
											<div className="text-sm text-gray-600">Advanced AI-powered fraud prevention systems</div>
										</div>
									</li>
									<li className="flex items-start gap-3">
										<CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
										<div>
											<div className="font-medium">Data Backup & Recovery</div>
											<div className="text-sm text-gray-600">Redundant backups and disaster recovery procedures</div>
										</div>
									</li>
									<li className="flex items-start gap-3">
										<CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
										<div>
											<div className="font-medium">Employee Training</div>
											<div className="text-sm text-gray-600">Regular security training for all team members</div>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Travel Safety */}
				<Card className="mb-12">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Globe className="h-6 w-6 text-green-600" />
							Travel Safety Guidelines
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid gap-8 md:grid-cols-2">
							<div>
								<h3 className="font-semibold text-gray-900 mb-4">Before You Travel</h3>
								<ul className="space-y-2 text-gray-600">
									<li>• Check travel advisories for your destination</li>
									<li>• Ensure your passport is valid for at least 6 months</li>
									<li>• Research visa requirements and obtain necessary documents</li>
									<li>• Purchase comprehensive travel insurance</li>
									<li>• Register with your embassy if traveling internationally</li>
									<li>• Share your itinerary with trusted contacts</li>
								</ul>
							</div>
							<div>
								<h3 className="font-semibold text-gray-900 mb-4">While Traveling</h3>
								<ul className="space-y-2 text-gray-600">
									<li>• Keep copies of important documents in separate locations</li>
									<li>• Stay aware of your surroundings and local customs</li>
									<li>• Use hotel safes for valuables and important documents</li>
									<li>• Avoid displaying expensive items or large amounts of cash</li>
									<li>• Stay connected with family and friends regularly</li>
									<li>• Trust your instincts and avoid risky situations</li>
								</ul>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Partner Verification */}
				<Card className="mb-12">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Users className="h-6 w-6 text-blue-600" />
							Partner Verification Process
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-6">
							<p className="text-gray-600">
								We carefully vet all our travel partners to ensure they meet our high standards 
								for safety, reliability, and customer service.
							</p>
							<div className="grid gap-6 md:grid-cols-3">
								<div className="text-center">
									<div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
										<CheckCircle className="h-6 w-6 text-blue-600" />
									</div>
									<h3 className="font-semibold mb-2">License Verification</h3>
									<p className="text-sm text-gray-600">
										All partners must provide valid business licenses and certifications
									</p>
								</div>
								<div className="text-center">
									<div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
										<Award className="h-6 w-6 text-green-600" />
									</div>
									<h3 className="font-semibold mb-2">Quality Standards</h3>
									<p className="text-sm text-gray-600">
										Regular quality assessments and customer feedback monitoring
									</p>
								</div>
								<div className="text-center">
									<div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
										<Shield className="h-6 w-6 text-purple-600" />
									</div>
									<h3 className="font-semibold mb-2">Insurance Coverage</h3>
									<p className="text-sm text-gray-600">
										Verified insurance coverage and financial stability requirements
									</p>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Emergency Support */}
				<Card className="mb-12 border-orange-200 bg-orange-50">
					<CardHeader>
						<CardTitle className="flex items-center gap-2 text-orange-800">
							<AlertTriangle className="h-6 w-6" />
							Emergency Support
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid gap-6 md:grid-cols-2">
							<div>
								<h3 className="font-semibold text-orange-800 mb-3">24/7 Emergency Assistance</h3>
								<p className="text-orange-700 mb-4">
									Our emergency support team is available around the clock to help you with 
									urgent travel situations.
								</p>
								<div className="space-y-2">
									<div className="font-semibold text-orange-800">Emergency Hotline: +1 (555) 911-HELP</div>
									<div className="font-semibold text-orange-800">Email: emergency@tixia.com</div>
								</div>
							</div>
							<div>
								<h3 className="font-semibold text-orange-800 mb-3">What We Can Help With</h3>
								<ul className="text-orange-700 space-y-1">
									<li>• Flight cancellations and rebooking</li>
									<li>• Hotel emergencies and alternative accommodations</li>
									<li>• Natural disasters and travel disruptions</li>
									<li>• Medical emergencies and hospital referrals</li>
									<li>• Lost or stolen travel documents</li>
									<li>• Emergency evacuation assistance</li>
								</ul>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Reporting Issues */}
				<Card className="mb-12">
					<CardHeader>
						<CardTitle>Report Safety Concerns</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid gap-6 md:grid-cols-2">
							<div>
								<h3 className="font-semibold text-gray-900 mb-3">How to Report</h3>
								<p className="text-gray-600 mb-4">
									If you encounter any safety issues or have concerns about our partners, 
									please report them immediately.
								</p>
								<div className="space-y-2">
									<div><strong>Safety Team:</strong> safety@tixia.com</div>
									<div><strong>Phone:</strong> +1 (555) 123-SAFE</div>
									<div><strong>Online Form:</strong> Available in your account</div>
								</div>
							</div>
							<div>
								<h3 className="font-semibold text-gray-900 mb-3">What to Include</h3>
								<ul className="text-gray-600 space-y-1">
									<li>• Booking reference number</li>
									<li>• Date and location of incident</li>
									<li>• Detailed description of the issue</li>
									<li>• Photos or documentation if available</li>
									<li>• Contact information for follow-up</li>
								</ul>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Certifications */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Award className="h-6 w-6 text-blue-600" />
							Certifications and Compliance
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
							<div className="text-center">
								<div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
									<Shield className="h-6 w-6 text-blue-600" />
								</div>
								<h3 className="font-semibold mb-1">ISO 27001</h3>
								<p className="text-sm text-gray-600">Information Security Management</p>
							</div>
							<div className="text-center">
								<div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
									<CheckCircle className="h-6 w-6 text-green-600" />
								</div>
								<h3 className="font-semibold mb-1">PCI DSS</h3>
								<p className="text-sm text-gray-600">Payment Card Industry Compliance</p>
							</div>
							<div className="text-center">
								<div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
									<Globe className="h-6 w-6 text-purple-600" />
								</div>
								<h3 className="font-semibold mb-1">GDPR</h3>
								<p className="text-sm text-gray-600">General Data Protection Regulation</p>
							</div>
							<div className="text-center">
								<div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
									<Award className="h-6 w-6 text-orange-600" />
								</div>
								<h3 className="font-semibold mb-1">SOC 2</h3>
								<p className="text-sm text-gray-600">Service Organization Control</p>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Contact Section */}
				<div className="text-center mt-12">
					<h2 className="text-2xl font-bold text-gray-900 mb-4">Questions About Safety?</h2>
					<p className="text-gray-600 mb-6">
						Our safety team is here to address any concerns you may have about our security 
						measures or travel safety guidelines.
					</p>
					<div className="flex gap-4 justify-center">
						<TextureButton variant="primary">
							Contact Safety Team
						</TextureButton>
						<TextureButton variant="outline">
							View Safety Resources
						</TextureButton>
					</div>
				</div>
			</Container>
		</div>
	)
}
