import React from 'react';
import { Drawer } from 'vaul';
import { clsx } from 'clsx';

interface MobileBottomSheetProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	title: string;
	children: React.ReactNode;
	centered?: boolean;
}

export const MobileBottomSheet = ({
	isOpen,
	onOpenChange,
	title,
	children,
	centered = false,
}: MobileBottomSheetProps) => {
	// Compute 80% of viewport height in pixels for reliable Vaul snap behavior
	const [snapPoints, setSnapPoints] = React.useState<Array<string | number>>(['480px', 1]);
	const [snap, setSnap] = React.useState<number | string | null>('480px');

	React.useEffect(() => {
		if (typeof window !== 'undefined') {
			const initial = `${Math.round(window.innerHeight * 0.8)}px`;
			setSnapPoints([initial, 1]);
			setSnap(initial);
		}
	}, []);

	const handleOpenChange = (open: boolean) => {
		// Reset to initial snap point only when closing
		if (!open) setSnap(snapPoints[0]);
		onOpenChange(open);
	};

	// Ensure opening always starts at initial snap (80% height)
	React.useEffect(() => {
		if (isOpen) setSnap(snapPoints[0]);
	}, [isOpen, snapPoints]);

	return (
		<Drawer.Root
			open={isOpen}
			onOpenChange={handleOpenChange}
			snapPoints={snapPoints}
			activeSnapPoint={snap}
			setActiveSnapPoint={setSnap}
			snapToSequentialPoint
		>
			<Drawer.Portal>
				<Drawer.Overlay
					className={clsx(
						'fixed inset-0 z-50 transition-all duration-200',
						snap === 1 ? 'bg-black/70 backdrop-blur-[2px]' : 'bg-black/60 backdrop-blur-[1px]'
					)}
				/>
				<Drawer.Content className="border-b-none fixed right-0 bottom-0 left-0 z-50 mx-[-1px] flex h-full max-h-[97%] touch-pan-y flex-col rounded-t-[10px] border border-gray-200 bg-white">
					<div
						className={clsx(
							'mx-auto flex w-full flex-col overflow-hidden p-4 pt-5',
							centered ? 'max-w-md' : ''
						)}
					>
						{/* Drag handle */}
						<div className="mx-auto mb-4 h-1.5 w-12 flex-shrink-0 rounded-full bg-gray-300" />
						{/* 
						<Drawer.Title className="mb-4 text-lg font-medium">
							{title}
						</Drawer.Title> */}

						{/* Scrollable content area (always scrollable; Vaul allows drag when scrolled to top) */}
						<div className={clsx('min-h-0 w-full flex-1 overflow-y-auto')}>
							{children}
						</div>
					</div>
				</Drawer.Content>
			</Drawer.Portal>
		</Drawer.Root>
	);
};
