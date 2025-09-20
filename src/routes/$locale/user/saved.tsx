import { createFileRoute } from '@tanstack/react-router';
import { Button } from '~/components/ui/button';
import { 
	Heart, 
	Plane, 
	Building, 
	MapPin,
	Star,
	Trash2,
	Share2,
	Calendar
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

function SavedPage() {
	const { t } = useTranslation();

	const savedFlights = [
		{
			id: 1,
			route: 'New York → Tokyo',
			airline: 'Japan Airlines',
			price: '$899',
			duration: '14h 25m',
			stops: 'Non-stop',
			savedDate: '2 days ago'
		},
		{
			id: 2,
			route: 'London → Sydney',
			airline: 'Qantas',
			price: '$1,299',
			duration: '21h 45m',
			stops: '1 stop',
			savedDate: '1 week ago'
		}
	]

	const savedHotels = [
		{
			id: 1,
			name: 'The Ritz-Carlton Tokyo',
			location: 'Roppongi, Tokyo',
			rating: 4.8,
			price: '$450',
			priceUnit: 'per night',
			image: '/api/placeholder/300/200',
			savedDate: '3 days ago'
		},
		{
			id: 2,
			name: 'Park Hyatt Sydney',
			location: 'Sydney Harbour, Sydney',
			rating: 4.9,
			price: '$380',
			priceUnit: 'per night',
			image: '/api/placeholder/300/200',
			savedDate: '1 week ago'
		}
	]

	return (
		<div className="space-y-6">
			{/* Page Header */}
			<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-2xl font-bold text-gray-900">Saved Items</h1>
						<p className="text-gray-600 mt-1">Your wishlist of flights and hotels</p>
					</div>
					<div className="flex items-center space-x-3">
						<Button variant="outline" className="flex items-center space-x-2">
							<Share2 className="w-4 h-4" />
							<span>Share List</span>
						</Button>
					</div>
				</div>
			</div>

			{/* Saved Flights */}
			<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
						<Plane className="w-5 h-5 text-blue-600" />
						<span>Saved Flights ({savedFlights.length})</span>
					</h2>
				</div>
				
				{savedFlights.length > 0 ? (
					<div className="space-y-4">
						{savedFlights.map((flight) => (
							<div key={flight.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
								<div className="flex items-center justify-between">
									<div className='flex-1'>
										<div className="flex items-center justify-between mb-2">
											<h3 className="font-semibold text-gray-900">{flight.route}</h3>
											<div className='text-right'>
												<div className="text-xl font-bold text-blue-600">{flight.price}</div>
												<div className="text-sm text-gray-500">per person</div>
											</div>
										</div>
										<div className="flex items-center space-x-4 text-sm text-gray-600">
											<span>{flight.airline}</span>
											<span>•</span>
											<span>{flight.duration}</span>
											<span>•</span>
											<span>{flight.stops}</span>
										</div>
										<div className="text-xs text-gray-400 mt-2">Saved {flight.savedDate}</div>
									</div>
									<div className="flex items-center space-x-2 ml-4">
										<Button variant="outline" size="sm">Book Now</Button>
										<Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
											<Trash2 className='w-4 h-4' />
										</Button>
									</div>
								</div>
							</div>
						))}
					</div>
				) : (
					<div className="text-center py-8">
						<Plane className="w-12 h-12 text-gray-300 mx-auto mb-4" />
						<h3 className="text-lg font-medium text-gray-900 mb-2">No saved flights</h3>
						<p className="text-gray-600">Start saving flights you're interested in!</p>
					</div>
				)}
			</div>

			{/* Saved Hotels */}
			<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
						<Building className="w-5 h-5 text-green-600" />
						<span>Saved Hotels ({savedHotels.length})</span>
					</h2>
				</div>
				
				{savedHotels.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{savedHotels.map((hotel) => (
							<div key={hotel.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
								<div className="aspect-video bg-gray-200 relative">
									<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
									<button className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
										<Heart className="w-4 h-4 text-red-500 fill-current" />
									</button>
								</div>
								<div className='p-4'>
									<div className="flex items-start justify-between mb-2">
										<div>
											<h3 className="font-semibold text-gray-900">{hotel.name}</h3>
											<div className="flex items-center space-x-1 text-sm text-gray-600 mt-1">
												<MapPin className='w-3 h-3' />
												<span>{hotel.location}</span>
											</div>
										</div>
										<div className='text-right'>
											<div className="text-lg font-bold text-green-600">{hotel.price}</div>
											<div className="text-xs text-gray-500">{hotel.priceUnit}</div>
										</div>
									</div>
									<div className="flex items-center justify-between">
										<div className="flex items-center space-x-1">
											<Star className="w-4 h-4 text-yellow-400 fill-current" />
											<span className="text-sm font-medium">{hotel.rating}</span>
										</div>
										<div className="text-xs text-gray-400">Saved {hotel.savedDate}</div>
									</div>
									<div className="flex items-center space-x-2 mt-3">
										<Button size="sm" className="flex-1">Book Now</Button>
										<Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
											<Trash2 className='w-4 h-4' />
										</Button>
									</div>
								</div>
							</div>
						))}
					</div>
				) : (
					<div className="text-center py-8">
						<Building className="w-12 h-12 text-gray-300 mx-auto mb-4" />
						<h3 className="text-lg font-medium text-gray-900 mb-2">No saved hotels</h3>
						<p className="text-gray-600">Start saving hotels you're interested in!</p>
					</div>
				)}
			</div>

			{/* Price Alerts */}
			<div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
				<div className="flex items-start space-x-3">
					<Calendar className="w-5 h-5 text-blue-600 mt-0.5" />
					<div>
						<h3 className="font-medium text-blue-900">Price Alerts</h3>
						<p className="text-blue-800 text-sm mt-1">
							We'll notify you when prices drop for your saved flights and hotels. Enable notifications in settings.
						</p>
						<Button variant="outline" size="sm" className="mt-3 border-blue-300 text-blue-700 hover:bg-blue-100">
							Set Up Alerts
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

export const Route = createFileRoute('/$locale/user/saved')({
	component: SavedPage,
});
