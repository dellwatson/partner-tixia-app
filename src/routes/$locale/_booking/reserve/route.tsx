import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router';
import {
	Stepper,
	StepperIndicator,
	StepperItem,
	StepperSeparator,
	StepperTrigger,
} from '~/components/ui/stepper';
import { Container } from '~/components/ui/container';

export const Route = createFileRoute('/$locale/_booking/reserve')({
	component: ReserveLayout,
});

const reserveSteps = [
	{ step: 1, label: 'Your details' },
	{ step: 2, label: 'Payment' },
];

function ReserveLayout() {
	const { locale } = Route.useParams();
	const location = useLocation();

	// Get current step from URL path
	const getCurrentStep = () => {
		const pathname = location.pathname;
		if (pathname.includes('/form')) return 1;
		if (pathname.includes('/payment')) return 2;
		return 1;
	}

	const currentStep = getCurrentStep();

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Progress Stepper */}
			<div className="border-b bg-white py-2 md:py-4">
				<Container>
					<div className="flex items-center justify-center">
						<Stepper
							value={currentStep}
							orientation="horizontal"
							className="w-full max-w-2xl"
						>
							{reserveSteps.map((stepItem, index) => (
								<StepperItem
									key={stepItem.step}
									step={stepItem.step}
									className='flex-1'
								>
									<StepperTrigger className="flex flex-col items-center gap-1 md:gap-2 px-2">
										<StepperIndicator className="h-6 w-6 md:h-8 md:w-8" />
										<span className="text-xs md:text-sm font-medium text-center leading-tight">
											{stepItem.label}
										</span>
									</StepperTrigger>
									{index < reserveSteps.length - 1 && <StepperSeparator className="hidden sm:block" />}
								</StepperItem>
							))}
						</Stepper>
					</div>
				</Container>
			</div>

			{/* Main Content */}
			<Container className="py-8">
				<Outlet />
			</Container>
		</div>
	);
}
