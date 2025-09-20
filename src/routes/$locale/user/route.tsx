import { createFileRoute, Link, Outlet, useLocation, useParams } from '@tanstack/react-router';
import { Container } from '~/components/ui/container';
import { User, MapPin, Settings, Heart, Star, Gift, Plane, Building } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '~/lib/utils';

const getDashboardNavItems = (locale: string) => [
	{
		id: 'overview',
		label: 'Overview',
		icon: User,
		path: `/${locale}/user/`,
		description: 'Your travel summary',
	},
	{
		id: 'trips',
		label: 'My Trips',
		icon: MapPin,
		path: `/${locale}/user/trips`,
		description: 'Upcoming and past bookings',
	},
	{
		id: 'account',
		label: 'Account',
		icon: User,
		path: `/${locale}/user/account`,
		description: 'Personal information',
	},
	{
		id: 'saved',
		label: 'Saved',
		icon: Heart,
		path: `/${locale}/user/saved`,
		description: 'Wishlist and favorites',
	},
	{
		id: 'rewards',
		label: 'Rewards',
		icon: Gift,
		path: `/${locale}/user/rewards`,
		description: 'Points and benefits',
	},
	{
		id: 'reviews',
		label: 'Reviews',
		icon: Star,
		path: `/${locale}/user/review`,
		description: 'Your travel reviews',
	},
	{
		id: 'settings',
		label: 'Settings',
		icon: Settings,
		path: `/${locale}/user/settings`,
		description: 'Preferences and privacy',
	},
];

function DashboardLayout() {
	const { t } = useTranslation();
	const location = useLocation();
	const { locale } = useParams({ from: '/$locale/user' });

	const currentPath = location.pathname;
	const isExactDashboard = currentPath.endsWith('/user/');
	const dashboardNavItems = getDashboardNavItems(locale);

	return (
		<div className="min-h-screen bg-gray-50">
			<Container variant="full" className="py-8">
				<div className="flex gap-8">
					{/* Sidebar Navigation */}
					<div className="w-80 flex-shrink-0">
						<div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
							{/* User Profile Header */}
							<div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
								<div className="flex items-center space-x-4">
									<div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
										<User className="h-6 w-6" />
									</div>
									<div>
										<h3 className="text-lg font-semibold">John Doe</h3>
										<p className="text-sm text-blue-100">
											john.doe@example.com
										</p>
									</div>
								</div>
								<div className="mt-4 flex items-center justify-between text-sm">
									<span className="text-blue-100">Member since 2024</span>
									<span className="rounded-full bg-white/20 px-2 py-1 text-xs">
										Gold
									</span>
								</div>
							</div>

							{/* Navigation Menu */}
							<nav className="p-2">
								{dashboardNavItems.map((item) => {
									const Icon = item.icon;
									const isActive = isExactDashboard
										? item.path === `/${locale}/user/`
										: currentPath.includes(item.path) &&
											item.path !== `/${locale}/user/`;

									return (
										<Link
											key={item.id}
											to={item.path}
											className={cn(
												'group flex items-center space-x-3 rounded-lg px-4 py-3 transition-colors',
												isActive
													? 'border-r-2 border-blue-600 bg-blue-50 text-blue-700'
													: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
											)}
										>
											<Icon
												className={cn(
													'h-5 w-5',
													isActive
														? 'text-blue-600'
														: 'text-gray-400 group-hover:text-gray-600'
												)}
											/>
											<div className="flex-1">
												<div className="text-sm font-medium">
													{item.label}
												</div>
												<div className="text-xs text-gray-500">
													{item.description}
												</div>
											</div>
										</Link>
									);
								})}
							</nav>
						</div>

						{/* Quick Stats */}
						<div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
							<h4 className="mb-4 font-semibold text-gray-900">Quick Stats</h4>
							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<div className="flex items-center space-x-2">
										<Plane className="h-4 w-4 text-blue-500" />
										<span className="text-sm text-gray-600">
											Flights Booked
										</span>
									</div>
									<span className="font-semibold text-gray-900">12</span>
								</div>
								<div className="flex items-center justify-between">
									<div className="flex items-center space-x-2">
										<Building className="h-4 w-4 text-green-500" />
										<span className="text-sm text-gray-600">Hotels Stayed</span>
									</div>
									<span className="font-semibold text-gray-900">8</span>
								</div>
								<div className="flex items-center justify-between">
									<div className="flex items-center space-x-2">
										<Gift className="h-4 w-4 text-purple-500" />
										<span className="text-sm text-gray-600">Reward Points</span>
									</div>
									<span className="font-semibold text-gray-900">2,450</span>
								</div>
							</div>
						</div>
					</div>

					{/* Main Content */}
					<div className="flex-1">
						<Outlet />
					</div>
				</div>
			</Container>
		</div>
	);
}

export const Route = createFileRoute('/$locale/user')({
	component: DashboardLayout,
});
