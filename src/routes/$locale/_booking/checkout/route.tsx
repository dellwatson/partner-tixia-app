import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router';
import {
	Stepper,
	StepperIndicator,
	StepperItem,
	StepperSeparator,
	StepperTrigger,
} from '~/components/ui/stepper';
import { Container } from '~/components/ui/container';

export const Route = createFileRoute('/$locale/_booking/checkout')({
	component: CheckoutLayout,
});

const checkoutSteps = [
	{ step: 1, label: 'Ticket type' },
	{ step: 2, label: 'Your details' },
	{ step: 3, label: 'Extras' },
	{ step: 4, label: 'Select your seat' },
	{ step: 5, label: 'Check and pay' },
];

function CheckoutLayout() {
	const { locale } = Route.useParams();
	const location = useLocation();

	// Get current step from URL path
	const getCurrentStep = () => {
		const pathname = location.pathname;
		if (pathname.includes('/ticket-type')) return 1;
		if (pathname.includes('/pax')) return 2;
		if (pathname.includes('/extras')) return 3;
		if (pathname.includes('/seats')) return 4;
		if (pathname.includes('/payment')) return 5;
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
							className="w-full max-w-4xl"
						>
							{checkoutSteps.map((stepItem, index) => (
								<StepperItem
									key={stepItem.step}
									step={stepItem.step}
									className='flex-1'
								>
									<StepperTrigger className="flex flex-col items-center gap-1 md:gap-2 px-1">
										<StepperIndicator className="h-6 w-6 md:h-8 md:w-8" />
										<span className="text-xs md:text-sm font-medium text-center leading-tight">
											{stepItem.label}
										</span>
									</StepperTrigger>
									{index < checkoutSteps.length - 1 && <StepperSeparator className="hidden sm:block" />}
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
	)
}
