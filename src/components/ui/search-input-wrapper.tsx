import React from 'react';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '~/components/ui/popover';
import { MobileBottomSheet } from '~/components/ui/mobile-bottom-sheet';

interface SearchInputWrapperProps {
	children: React.ReactNode;
	content: React.ReactNode;
	mobileContent?: React.ReactNode; // Optional mobile-specific content
	title: string;
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	centered?: boolean;
	popoverClassName?: string;
}

export const SearchInputWrapper = ({
	children,
	content,
	mobileContent,
	title,
	isOpen,
	onOpenChange,
	centered = false,
	popoverClassName = '',
}: SearchInputWrapperProps) => {
	const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
	const [isMobile, setIsMobile] = React.useState(false);

	// Detect mobile on client side to avoid hydration issues
	React.useEffect(() => {
		const checkMobile = () => setIsMobile(window.innerWidth < 768);
		checkMobile();
		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	const handleClick = () => {
		console.log('SearchInputWrapper: handleClick called, window width:', window.innerWidth);
		if (window.innerWidth < 768) {
			console.log('SearchInputWrapper: opening mobile drawer');
			setIsDrawerOpen(true);
		} else {
			console.log('SearchInputWrapper: toggling desktop popover, current isOpen:', isOpen);
			onOpenChange(!isOpen);
		}
	};

	// Create content with onClose callback for mobile
	const contentWithCallback = React.useMemo(() => {
		if (React.isValidElement(content)) {
			return React.cloneElement(content as React.ReactElement<any>, {
				onClose: () => setIsDrawerOpen(false)
			});
		}
		return content;
	}, [content]);

	// Create mobile content with onClose callback
	const mobileContentWithCallback = React.useMemo(() => {
		if (mobileContent && React.isValidElement(mobileContent)) {
			return React.cloneElement(mobileContent as React.ReactElement<any>, {
				onClose: () => setIsDrawerOpen(false)
			});
		}
		return mobileContent || contentWithCallback;
	}, [mobileContent, contentWithCallback]);

	return (
		<>
			{/* Desktop */}
			<div className="hidden md:block">
				<Popover open={isOpen} onOpenChange={onOpenChange}>
					<PopoverTrigger asChild>
						<div onClick={() => onOpenChange(!isOpen)}>{children}</div>
					</PopoverTrigger>
					<PopoverContent 
						className={`w-auto p-0 ${popoverClassName}`} 
						align="start"
						onOpenAutoFocus={(e) => {
							// Prevent Radix from managing focus - let TagInput handle it
							console.log('SearchInputWrapper: PopoverContent onOpenAutoFocus called');
							e.preventDefault();
						}}
						onCloseAutoFocus={(e) => {
							// Prevent focus return to trigger
							e.preventDefault();
						}}
					>
						{content}
					</PopoverContent>
				</Popover>
			</div>

			{/* Mobile */}
			<div className="md:hidden" onClick={handleClick}>
				{children}
			</div>

			{/* Mobile Bottom Sheet - Only render on mobile to avoid interference */}
			{isMobile && (
				<MobileBottomSheet
					isOpen={isDrawerOpen}
					onOpenChange={setIsDrawerOpen}
					title={title}
					centered={centered}
				>
					{mobileContentWithCallback}
				</MobileBottomSheet>
			)}
		</>
	);
};
