import { createFileRoute } from '@tanstack/react-router';
import { Container } from '~/components/ui/container';
import { Button } from '~/components/ui/button';
import { 
	User, 
	Mail, 
	Phone, 
	MapPin, 
	Calendar,
	CreditCard,
	Shield,
	Edit3
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

function AccountPage() {
	const { t } = useTranslation();

	return (
		<div className="space-y-6">
			{/* Page Header */}
			<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-2xl font-bold text-gray-900">Account Information</h1>
						<p className="text-gray-600 mt-1">Manage your personal details and preferences</p>
					</div>
					<Button variant="outline" className="flex items-center space-x-2">
						<Edit3 className="w-4 h-4" />
						<span>Edit Profile</span>
					</Button>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Personal Information */}
				<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
					<h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
					<div className="space-y-4">
						<div className="flex items-center space-x-3">
							<User className="w-5 h-5 text-gray-400" />
							<div>
								<div className="text-sm text-gray-500">Full Name</div>
								<div className="font-medium text-gray-900">John Doe</div>
							</div>
						</div>
						<div className="flex items-center space-x-3">
							<Mail className="w-5 h-5 text-gray-400" />
							<div>
								<div className="text-sm text-gray-500">Email Address</div>
								<div className="font-medium text-gray-900">john.doe@example.com</div>
							</div>
						</div>
						<div className="flex items-center space-x-3">
							<Phone className="w-5 h-5 text-gray-400" />
							<div>
								<div className="text-sm text-gray-500">Phone Number</div>
								<div className="font-medium text-gray-900">+1 (555) 123-4567</div>
							</div>
						</div>
						<div className="flex items-center space-x-3">
							<Calendar className="w-5 h-5 text-gray-400" />
							<div>
								<div className="text-sm text-gray-500">Date of Birth</div>
								<div className="font-medium text-gray-900">January 15, 1990</div>
							</div>
						</div>
					</div>
				</div>

				{/* Address Information */}
				<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
					<h2 className="text-lg font-semibold text-gray-900 mb-4">Address Information</h2>
					<div className="space-y-4">
						<div className="flex items-start space-x-3">
							<MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
							<div>
								<div className="text-sm text-gray-500">Home Address</div>
								<div className="font-medium text-gray-900">
									123 Main Street<br />
									New York, NY 10001<br />
									United States
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Travel Preferences */}
			<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
				<h2 className="text-lg font-semibold text-gray-900 mb-4">Travel Preferences</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					<div>
						<div className="text-sm text-gray-500 mb-2">Preferred Airline</div>
						<div className="font-medium text-gray-900">Delta Airlines</div>
					</div>
					<div>
						<div className="text-sm text-gray-500 mb-2">Seat Preference</div>
						<div className="font-medium text-gray-900">Aisle</div>
					</div>
					<div>
						<div className="text-sm text-gray-500 mb-2">Meal Preference</div>
						<div className="font-medium text-gray-900">Vegetarian</div>
					</div>
					<div>
						<div className="text-sm text-gray-500 mb-2">Hotel Chain</div>
						<div className="font-medium text-gray-900">Hilton</div>
					</div>
					<div>
						<div className="text-sm text-gray-500 mb-2">Room Type</div>
						<div className="font-medium text-gray-900">King Bed</div>
					</div>
					<div>
						<div className="text-sm text-gray-500 mb-2">Currency</div>
						<div className="font-medium text-gray-900">USD</div>
					</div>
				</div>
			</div>

			{/* Security Settings */}
			<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
				<h2 className="text-lg font-semibold text-gray-900 mb-4">Security & Privacy</h2>
				<div className="space-y-4">
					<div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
						<div className="flex items-center space-x-3">
							<Shield className="w-5 h-5 text-green-500" />
							<div>
								<div className="font-medium text-gray-900">Two-Factor Authentication</div>
								<div className="text-sm text-gray-500">Add an extra layer of security</div>
							</div>
						</div>
						<Button variant="outline" size="sm">Enable</Button>
					</div>
					<div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
						<div className="flex items-center space-x-3">
							<CreditCard className="w-5 h-5 text-blue-500" />
							<div>
								<div className="font-medium text-gray-900">Payment Methods</div>
								<div className="text-sm text-gray-500">Manage saved payment methods</div>
							</div>
						</div>
						<Button variant="outline" size="sm">Manage</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

export const Route = createFileRoute('/$locale/user/account')({
	component: AccountPage,
});
