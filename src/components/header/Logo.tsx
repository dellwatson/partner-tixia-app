import { Link } from '@tanstack/react-router';

interface LogoProps {
	variant?: 'default' | 'dark';
}

export const Logo = ({ variant = 'default' }: LogoProps) => {
	if (variant === 'dark') {
		return (
			<Link to="/" className="flex items-center">
				<img 
					src="/logo_tixia.png" 
					alt="Tixia" 
					className="h-8 w-auto"
				/>
			</Link>
		);
	}

	return (
		<Link to="/" className="flex items-center">
			<img 
				src="/logo_tixia.png" 
				alt="Tixia" 
				className="h-8 w-auto"
			/>
		</Link>
	);
};
