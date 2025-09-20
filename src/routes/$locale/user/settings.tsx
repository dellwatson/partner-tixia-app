import { createFileRoute } from '@tanstack/react-router';
import { Button } from '~/components/ui/button';
import { 
	Settings, 
	Bell, 
	Shield,
	CreditCard,
	Globe,
	Moon,
	Sun,
	Smartphone,
	Mail,
	Lock,
	Eye,
	EyeOff
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

function SettingsPage() {
	const { t } = useTranslation();
	const [notifications, setNotifications] = useState({
		email: true,
		push: false,
		sms: true,
		marketing: false
	})
	const [privacy, setPrivacy] = useState({
		profileVisible: true,
		shareData: false,
		analytics: true
	})

	return (
		<div className="space-y-6">
			{/* Page Header */}
			<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-2xl font-bold text-gray-900">Settings</h1>
						<p className="text-gray-600 mt-1">Manage your account preferences and privacy</p>
					</div>
				</div>
			</div>

			{/* Notification Settings */}
			<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
				<div className="flex items-center space-x-3 mb-4">
					<Bell className="w-5 h-5 text-blue-600" />
					<h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
				</div>
				<div className="space-y-4">
					<div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
						<div>
							<div className="font-medium text-gray-900">Email Notifications</div>
							<div className="text-sm text-gray-500">Receive booking confirmations and updates via email</div>
						</div>
						<button
							onClick={() => setNotifications(prev => ({ ...prev, email: !prev.email }))}
							className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
								notifications.email ? 'bg-blue-600' : 'bg-gray-200'
							}`}
						>
							<span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
								notifications.email ? 'translate-x-6' : 'translate-x-1'
							}`} />
						</button>
					</div>
					<div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
						<div>
							<div className="font-medium text-gray-900">Push Notifications</div>
							<div className="text-sm text-gray-500">Get real-time updates on your mobile device</div>
						</div>
						<button
							onClick={() => setNotifications(prev => ({ ...prev, push: !prev.push }))}
							className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
								notifications.push ? 'bg-blue-600' : 'bg-gray-200'
							}`}
						>
							<span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
								notifications.push ? 'translate-x-6' : 'translate-x-1'
							}`} />
						</button>
					</div>
					<div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
						<div>
							<div className="font-medium text-gray-900">SMS Notifications</div>
							<div className="text-sm text-gray-500">Receive important alerts via text message</div>
						</div>
						<button
							onClick={() => setNotifications(prev => ({ ...prev, sms: !prev.sms }))}
							className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
								notifications.sms ? 'bg-blue-600' : 'bg-gray-200'
							}`}
						>
							<span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
								notifications.sms ? 'translate-x-6' : 'translate-x-1'
							}`} />
						</button>
					</div>
					<div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
						<div>
							<div className="font-medium text-gray-900">Marketing Communications</div>
							<div className="text-sm text-gray-500">Receive deals, promotions, and travel tips</div>
						</div>
						<button
							onClick={() => setNotifications(prev => ({ ...prev, marketing: !prev.marketing }))}
							className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
								notifications.marketing ? 'bg-blue-600' : 'bg-gray-200'
							}`}
						>
							<span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
								notifications.marketing ? 'translate-x-6' : 'translate-x-1'
							}`} />
						</button>
					</div>
				</div>
			</div>

			{/* Privacy Settings */}
			<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
				<div className="flex items-center space-x-3 mb-4">
					<Shield className="w-5 h-5 text-green-600" />
					<h2 className="text-lg font-semibold text-gray-900">Privacy & Security</h2>
				</div>
				<div className="space-y-4">
					<div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
						<div>
							<div className="font-medium text-gray-900">Profile Visibility</div>
							<div className="text-sm text-gray-500">Allow others to see your public profile</div>
						</div>
						<button
							onClick={() => setPrivacy(prev => ({ ...prev, profileVisible: !prev.profileVisible }))}
							className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
								privacy.profileVisible ? 'bg-green-600' : 'bg-gray-200'
							}`}
						>
							<span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
								privacy.profileVisible ? 'translate-x-6' : 'translate-x-1'
							}`} />
						</button>
					</div>
					<div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
						<div>
							<div className="font-medium text-gray-900">Data Sharing</div>
							<div className="text-sm text-gray-500">Share anonymized data to improve our services</div>
						</div>
						<button
							onClick={() => setPrivacy(prev => ({ ...prev, shareData: !prev.shareData }))}
							className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
								privacy.shareData ? 'bg-green-600' : 'bg-gray-200'
							}`}
						>
							<span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
								privacy.shareData ? 'translate-x-6' : 'translate-x-1'
							}`} />
						</button>
					</div>
					<div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
						<div>
							<div className="font-medium text-gray-900">Analytics</div>
							<div className="text-sm text-gray-500">Help us improve by sharing usage analytics</div>
						</div>
						<button
							onClick={() => setPrivacy(prev => ({ ...prev, analytics: !prev.analytics }))}
							className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
								privacy.analytics ? 'bg-green-600' : 'bg-gray-200'
							}`}
						>
							<span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
								privacy.analytics ? 'translate-x-6' : 'translate-x-1'
							}`} />
						</button>
					</div>
				</div>
			</div>

			{/* Account Security */}
			<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
				<div className="flex items-center space-x-3 mb-4">
					<Lock className="w-5 h-5 text-red-600" />
					<h2 className="text-lg font-semibold text-gray-900">Account Security</h2>
				</div>
				<div className="space-y-4">
					<div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
						<div className="flex items-center space-x-3">
							<Lock className="w-5 h-5 text-gray-400" />
							<div>
								<div className="font-medium text-gray-900">Change Password</div>
								<div className="text-sm text-gray-500">Update your account password</div>
							</div>
						</div>
						<Button variant="outline" size="sm">Change</Button>
					</div>
					<div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
						<div className="flex items-center space-x-3">
							<Shield className="w-5 h-5 text-gray-400" />
							<div>
								<div className="font-medium text-gray-900">Two-Factor Authentication</div>
								<div className="text-sm text-gray-500">Add an extra layer of security</div>
							</div>
						</div>
						<Button variant="outline" size="sm">Enable</Button>
					</div>
					<div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
						<div className="flex items-center space-x-3">
							<Smartphone className="w-5 h-5 text-gray-400" />
							<div>
								<div className="font-medium text-gray-900">Login Sessions</div>
								<div className="text-sm text-gray-500">Manage active login sessions</div>
							</div>
						</div>
						<Button variant="outline" size="sm">Manage</Button>
					</div>
				</div>
			</div>

			{/* Preferences */}
			<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
				<div className="flex items-center space-x-3 mb-4">
					<Settings className="w-5 h-5 text-purple-600" />
					<h2 className="text-lg font-semibold text-gray-900">Preferences</h2>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="p-4 border border-gray-200 rounded-lg">
						<div className="flex items-center justify-between mb-2">
							<div className="font-medium text-gray-900">Language</div>
							<Globe className="w-4 h-4 text-gray-400" />
						</div>
						<select className="w-full p-2 border border-gray-300 rounded-md text-sm">
							<option>English (US)</option>
							<option>Spanish</option>
							<option>French</option>
							<option>German</option>
						</select>
					</div>
					<div className="p-4 border border-gray-200 rounded-lg">
						<div className="flex items-center justify-between mb-2">
							<div className="font-medium text-gray-900">Currency</div>
							<CreditCard className="w-4 h-4 text-gray-400" />
						</div>
						<select className="w-full p-2 border border-gray-300 rounded-md text-sm">
							<option>USD ($)</option>
							<option>EUR (€)</option>
							<option>GBP (£)</option>
							<option>JPY (¥)</option>
						</select>
					</div>
					<div className="p-4 border border-gray-200 rounded-lg">
						<div className="flex items-center justify-between mb-2">
							<div className="font-medium text-gray-900">Time Zone</div>
							<Globe className="w-4 h-4 text-gray-400" />
						</div>
						<select className="w-full p-2 border border-gray-300 rounded-md text-sm">
							<option>Eastern Time (ET)</option>
							<option>Pacific Time (PT)</option>
							<option>Central Time (CT)</option>
							<option>Mountain Time (MT)</option>
						</select>
					</div>
					<div className="p-4 border border-gray-200 rounded-lg">
						<div className="flex items-center justify-between mb-2">
							<div className="font-medium text-gray-900">Theme</div>
							<Sun className="w-4 h-4 text-gray-400" />
						</div>
						<select className="w-full p-2 border border-gray-300 rounded-md text-sm">
							<option>Light</option>
							<option>Dark</option>
							<option>System</option>
						</select>
					</div>
				</div>
			</div>

			{/* Danger Zone */}
			<div className="bg-red-50 border border-red-200 rounded-xl p-6">
				<h2 className="text-lg font-semibold text-red-900 mb-4">Danger Zone</h2>
				<div className="space-y-3">
					<div className="flex items-center justify-between p-4 bg-white border border-red-200 rounded-lg">
						<div>
							<div className="font-medium text-red-900">Delete Account</div>
							<div className="text-sm text-red-700">Permanently delete your account and all data</div>
						</div>
						<Button variant="outline" size="sm" className="border-red-300 text-red-700 hover:bg-red-100">
							Delete Account
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

export const Route = createFileRoute('/$locale/user/settings')({
	component: SettingsPage,
});
