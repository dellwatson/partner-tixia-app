import { createFileRoute } from '@tanstack/react-router';
import { Bell, Plane, Building, Calendar, Gift, Heart } from 'lucide-react';
import { Link, useParams } from '@tanstack/react-router';

function DashboardOverview() {
	const { locale } = useParams({ from: '/$locale/user/' });

	return (
		<div className="space-y-6">
			{/* Welcome Header */}
			<div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-2xl font-bold text-gray-900">Welcome back, John!</h1>
						<p className="mt-1 text-gray-600">Manage your trips and account settings</p>
					</div>
					<div className="flex items-center space-x-2">
						<Bell className="h-5 w-5 text-gray-400" />
						<span className="text-sm text-gray-500">3 notifications</span>
					</div>
				</div>
			</div>

			{/* Recent Activity */}
			<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
				{/* Upcoming Trips */}
				<div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
					<div className="mb-4 flex items-center justify-between">
						<h2 className="text-lg font-semibold text-gray-900">Upcoming Trips</h2>
						<Link
							to={`/${locale}/user/trips`}
							className="text-sm font-medium text-blue-600 hover:text-blue-700"
						>
							View all
						</Link>
					</div>
					<div className="space-y-4">
						<div className="flex items-center space-x-4 rounded-lg bg-blue-50 p-4">
							<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
								<Plane className="h-5 w-5 text-blue-600" />
							</div>
							<div className="flex-1">
								<div className="font-medium text-gray-900">New York → London</div>
								<div className="text-sm text-gray-500">
									Dec 15, 2024 • Flight BA178
								</div>
							</div>
						</div>
						<div className="flex items-center space-x-4 rounded-lg bg-green-50 p-4">
							<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
								<Building className="h-5 w-5 text-green-600" />
							</div>
							<div className="flex-1">
								<div className="font-medium text-gray-900">Hilton London</div>
								<div className="text-sm text-gray-500">
									Dec 15-18, 2024 • 3 nights
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Recent Bookings */}
				<div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
					<div className="mb-4 flex items-center justify-between">
						<h2 className="text-lg font-semibold text-gray-900">Recent Bookings</h2>
						<Link
							to={`/${locale}/user/trips`}
							className="text-sm font-medium text-blue-600 hover:text-blue-700"
						>
							View all
						</Link>
					</div>
					<div className="space-y-4">
						<div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
							<div className="flex items-center space-x-3">
								<Calendar className="h-5 w-5 text-gray-400" />
								<div>
									<div className="font-medium text-gray-900">Paris Weekend</div>
									<div className="text-sm text-gray-500">Booked Nov 28, 2024</div>
								</div>
							</div>
							<span className="text-sm font-medium text-green-600">Confirmed</span>
						</div>
						<div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
							<div className="flex items-center space-x-3">
								<Calendar className="h-5 w-5 text-gray-400" />
								<div>
									<div className="font-medium text-gray-900">
										Tokyo Business Trip
									</div>
									<div className="text-sm text-gray-500">Booked Nov 25, 2024</div>
								</div>
							</div>
							<span className="text-sm font-medium text-blue-600">Processing</span>
						</div>
					</div>
				</div>
			</div>

			{/* Quick Actions */}
			<div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
				<h2 className="mb-4 text-lg font-semibold text-gray-900">Quick Actions</h2>
				<div className="grid grid-cols-2 gap-4 md:grid-cols-4">
					<Link
						to={`/${locale}/flights`}
						className="flex flex-col items-center rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
					>
						<Plane className="mb-2 h-8 w-8 text-blue-600" />
						<span className="text-sm font-medium text-gray-900">Book Flight</span>
					</Link>
					<Link
						to={`/${locale}/hotels`}
						className="flex flex-col items-center rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
					>
						<Building className="mb-2 h-8 w-8 text-green-600" />
						<span className="text-sm font-medium text-gray-900">Book Hotel</span>
					</Link>
					<Link
						to={`/${locale}/user/saved`}
						className="flex flex-col items-center rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
					>
						<Heart className="mb-2 h-8 w-8 text-red-600" />
						<span className="text-sm font-medium text-gray-900">Saved Items</span>
					</Link>
					<Link
						to={`/${locale}/user/rewards`}
						className="flex flex-col items-center rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
					>
						<Gift className="mb-2 h-8 w-8 text-purple-600" />
						<span className="text-sm font-medium text-gray-900">Rewards</span>
					</Link>
				</div>
			</div>
		</div>
	);
}

export const Route = createFileRoute('/$locale/user/')({
	component: DashboardOverview,
});
