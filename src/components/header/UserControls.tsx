import { DefaultMenuItems } from './DefaultMenuItems';
import { AuthMenu } from './AuthMenu';
import { UserDropdownMenu } from './UserDropdownMenu';
import { useAuthDemo } from '~/hooks/use-auth-demo';

interface UserControlsProps {
	variant?: 'default' | 'dark';
}

export const UserControls = ({ variant = 'default' }: UserControlsProps) => {
	const { isLoggedIn, user, login, logout } = useAuthDemo();

	const handleCurrencyChange = (currency: string) => {
		// Currency change logic can be handled here if needed
		console.log('Currency changed to:', currency);
	};

	return (
		<div className="flex items-center space-x-3">
			{/* Default Menu Items (Property, Help, Currency, Language) */}
			<DefaultMenuItems onCurrencyChange={handleCurrencyChange} />

			{/* User Controls - Show different UI based on login state */}
			{/* <UserDropdownMenu user={user} onLogout={logout} /> */}
			<AuthMenu variant={variant} onDemoLogin={login} />

			{/* {isLoggedIn ? (
				<UserDropdownMenu user={user} onLogout={logout} />
			) : (
				<AuthMenu variant={variant} onDemoLogin={login} />
			)} */}
		</div>
	);
};
