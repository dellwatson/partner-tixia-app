import { createFileRoute } from '@tanstack/react-router';
import { SignUp } from '@clerk/clerk-react';

export const Route = createFileRoute('/$locale/auth/sign-up')({
	component: SignUpPage,
});

function SignUpPage() {
	const { locale } = Route.useParams();
	
	return (
		<div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
			<div className="w-full max-w-md">
				<SignUp 
					routing="hash"
					signInUrl={`/${locale}/auth/sign-in`}
					redirectUrl={`/${locale}`}
					afterSignUpUrl={`/${locale}`}
				/>
			</div>
		</div>
	);
}
