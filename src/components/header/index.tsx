import { useState } from 'react';
import { Logo } from './Logo';
import { Navigation } from './Navigation';
import { UserControls } from './UserControls';
import { MobileMenu } from './MobileMenu';
import { Container } from '~/components/ui/container';

export const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<header className="sticky top-0 z-50 mb-1 bg-white/80 backdrop-blur-md">
			{/* <header className="sticky top-0 z-50  bg-white/80 backdrop-blur-md"> */}
			{/* <header className="sticky top-0 z-50 border-0 bg-white"> */}
			{/* <header className="sticky top-0 z-50 bg-white border-b border-gray-200 bg-gradient-to-br from-teal-50 via-white to-emerald-50">  */}
			<Container className="border-b border-gray-200/70">
				<div className="flex h-16 border-0">
					<div className="flex items-center">
						<div className="mr-4 scale-85 md:mr-8">
							<Logo variant="dark" />
						</div>
						{/* <Navigation /> */}
					</div>
					<div className="flex flex-1 items-center justify-end gap-2">
						{/* Hide UserControls on mobile, show only on md+ screens */}
						<div className="hidden md:flex">
							<UserControls variant="dark" />
						</div>
						<MobileMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
					</div>
				</div>
				{/* Mobile menu content is rendered by MobileMenu component */}
			</Container>
		</header>
	);
};
