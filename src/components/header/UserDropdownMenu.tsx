import { useLocation, useNavigate } from '@tanstack/react-router';
import { User, Settings, LogOut, CreditCard, MapPin, Heart, Star, Gift } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import { TextureCard } from '~/components/ui/texture-card';

interface UserData {
	name: string;
	email: string;
	avatar: string;
	initials: string;
}

interface UserDropdownMenuProps {
	user: UserData;
	onLogout?: () => void;
}

export const UserDropdownMenu = ({ user, onLogout }: UserDropdownMenuProps) => {
	const location = useLocation();
	const navigate = useNavigate();

	// Extract current locale from pathname
	const currentLocale = location.pathname.split('/')[1] || 'en';

	const dashboardMenuItems = [
		{
			id: 'user',
			label: 'Dashboard',
			icon: User,
			path: `/${currentLocale}/user`,
		},
		{
			id: 'trips',
			label: 'My Trips',
			icon: MapPin,
			path: `/${currentLocale}/user/trips`,
		},
		{
			id: 'account',
			label: 'Account',
			icon: User,
			path: `/${currentLocale}/user/account`,
		},
		{
			id: 'saved',
			label: 'Saved',
			icon: Heart,
			path: `/${currentLocale}/user/saved`,
		},
		{
			id: 'rewards',
			label: 'Rewards',
			icon: Gift,
			path: `/${currentLocale}/user/rewards`,
		},
		{
			id: 'reviews',
			label: 'Reviews',
			icon: Star,
			path: `/${currentLocale}/user/review`,
		},
		{
			id: 'settings',
			label: 'Settings',
			icon: Settings,
			path: `/${currentLocale}/user/settings`,
		},
	];

	const handleLogout = () => {
		onLogout?.();
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="relative h-10 w-10 rounded-full p-0 hover:bg-gray-100"
				>
					<Avatar className="h-9 w-9">
						<AvatarImage src={user.avatar} alt={user.name} />
						<AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
							{user.initials}
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-64 p-0" align="end" forceMount>
				<TextureCard variant="clean" className="border-0 shadow-lg">
					<div className="p-4">
						<DropdownMenuLabel className="mb-3 p-0">
							<div className="flex items-center space-x-3">
								<Avatar className="h-10 w-10">
									<AvatarImage src={user.avatar} alt={user.name} />
									<AvatarFallback className="bg-primary text-primary-foreground">
										{user.initials}
									</AvatarFallback>
								</Avatar>
								<div className="flex flex-col">
									<p className="text-sm font-medium text-gray-900">{user.name}</p>
									<p className="text-xs text-gray-500">{user.email}</p>
								</div>
							</div>
						</DropdownMenuLabel>

						<DropdownMenuSeparator className="my-2 bg-gray-200" />

						{/* Complete User Menu */}
						{dashboardMenuItems.map((item) => {
							const Icon = item.icon;
							return (
								<DropdownMenuItem
									key={item.id}
									className="cursor-pointer rounded-md p-2 hover:bg-gray-50"
									onClick={() => navigate({ to: item.path })}
								>
									<Icon className="mr-3 h-4 w-4 text-gray-600" />
									<span className="text-sm text-gray-700">{item.label}</span>
								</DropdownMenuItem>
							);
						})}

						<DropdownMenuSeparator className="my-2 bg-gray-200" />

						<DropdownMenuItem
							className="cursor-pointer rounded-md p-2 text-red-600 hover:bg-red-50"
							onClick={handleLogout}
						>
							<LogOut className="mr-3 h-4 w-4" />
							<span className="text-sm">Sign out</span>
						</DropdownMenuItem>
					</div>
				</TextureCard>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
