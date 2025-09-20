import { createFileRoute, Link } from '@tanstack/react-router';
import { Home, Search, ArrowLeft } from 'lucide-react';

export const Route = createFileRoute('/$locale/404')({
  component: NotFoundPage,
});

function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Icon */}
        <div className="mb-8">
          <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
            <Search className="w-12 h-12 text-red-600" />
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          Sorry, we couldn't find the page you're looking for. The page may have been moved, deleted, or the URL might be incorrect.
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            to="/$locale"
            params={{ locale: 'en' }}
            className="w-full inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Home className="w-5 h-5 mr-2" />
            Go Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="w-full inline-flex items-center justify-center px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </button>
        </div>

        {/* Help Links */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">Need help? Try these popular pages:</p>
          <div className="flex flex-col space-y-2">
            <Link
              to="/$locale/flights"
              params={{ locale: 'en' }}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Search Flights
            </Link>
            <Link
              to="/$locale/hotels"
              params={{ locale: 'en' }}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Search Hotels
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
