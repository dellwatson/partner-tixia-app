import { useLocation, useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Button as MovingBorderButton } from '~/components/ui/aceternity/moving-border';

interface AuthMenuProps {
	variant?: 'default' | 'dark';
	onDemoLogin?: () => void;
}

export const AuthMenu = ({ variant = 'default', onDemoLogin }: AuthMenuProps) => {
	const isDark = variant === 'dark';
	const location = useLocation();
	const navigate = useNavigate();
	const { i18n } = useTranslation();

	// Extract current locale from pathname
	const currentLocale = location.pathname.split('/')[1] || 'en';

	const handleDemoLogin = () => {
		onDemoLogin?.();
	};

	return (
		<div className="hidden items-center space-x-2 md:flex">
			<button
				onClick={() => navigate({ to: `/${currentLocale}/auth/sign-in` })}
				className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
					isDark
						? 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
						: 'hover:bg-primary/90 text-white'
				}`}
			>
				{i18n.t('sign_in')}
			</button>
			<MovingBorderButton
				as="button"
				onClick={handleDemoLogin}
				borderRadius="0.5rem"
				containerClassName="h-auto w-auto"
				className="bg-black px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-900"
				duration={3000}
			>
				{i18n.t('sign_up')}
			</MovingBorderButton>
		</div>
	);
};
