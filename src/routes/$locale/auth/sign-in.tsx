import { createFileRoute } from '@tanstack/react-router';
import { SignIn } from '@clerk/clerk-react';

export const Route = createFileRoute('/$locale/auth/sign-in')({
	component: SignInPage,
});

function SignInPage() {
	const { locale } = Route.useParams();

	return (
		<div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
			<div className="w-full max-w-md">
				<SignIn 
					routing="hash"
					signUpUrl={`/${locale}/auth/sign-up`}
					redirectUrl={`/${locale}`}
					afterSignInUrl={`/${locale}`}
				/>
			</div>
		</div>
	);
}
