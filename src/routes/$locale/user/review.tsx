import { createFileRoute } from '@tanstack/react-router';
import { Button } from '~/components/ui/button';
import { 
	Star, 
	Plane, 
	Building,
	Calendar,
	ThumbsUp,
	MessageSquare,
	Edit3,
	Trash2
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

function ReviewPage() {
	const { t } = useTranslation();

	const myReviews = [
		{
			id: 1,
			type: 'flight',
			title: 'British Airways BA178',
			subtitle: 'New York → London',
			rating: 4,
			date: 'Nov 25, 2024',
			review: 'Great flight experience! The crew was friendly and the food was surprisingly good for economy class. Smooth takeoff and landing.',
			helpful: 12,
			bookingDate: 'Nov 20, 2024'
		},
		{
			id: 2,
			type: 'hotel',
			title: 'Hilton London Paddington',
			subtitle: 'Deluxe King Room',
			rating: 5,
			date: 'Nov 23, 2024',
			review: 'Exceptional service and beautiful room with great views. The location is perfect for exploring London. Highly recommend!',
			helpful: 8,
			bookingDate: 'Nov 18, 2024'
		},
		{
			id: 3,
			type: 'flight',
			title: 'Delta Airlines DL42',
			subtitle: 'Los Angeles → Paris',
			rating: 3,
			date: 'Oct 15, 2024',
			review: 'Average experience. The flight was delayed by 2 hours but the crew handled it well. Seats could be more comfortable.',
			helpful: 5,
			bookingDate: 'Oct 10, 2024'
		}
	]

	const pendingReviews = [
		{
			id: 1,
			type: 'hotel',
			title: 'Park Hyatt Tokyo',
			subtitle: 'Deluxe Room with City View',
			completedDate: 'Dec 1, 2024',
			bookingRef: 'PH123456'
		},
		{
			id: 2,
			type: 'flight',
			title: 'Singapore Airlines SQ12',
			subtitle: 'Tokyo → Singapore',
			completedDate: 'Dec 3, 2024',
			bookingRef: 'SQ789012'
		}
	]

	const renderStars = (rating: number) => {
		return Array.from({ length: 5 }, (_, i) => (
			<Star
				key={i}
				className={`w-4 h-4 ${
					i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
				}`}
			/>
		))
	}

	return (
		<div className="space-y-6">
			{/* Page Header */}
			<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-2xl font-bold text-gray-900">My Reviews</h1>
						<p className="text-gray-600 mt-1">Share your travel experiences and help other travelers</p>
					</div>
					<div className="text-right">
						<div className="text-2xl font-bold text-blue-600">{myReviews.length}</div>
						<div className="text-sm text-gray-500">Reviews Written</div>
					</div>
				</div>
			</div>

			{/* Pending Reviews */}
			{pendingReviews.length > 0 && (
				<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
					<h2 className="text-lg font-semibold text-gray-900 mb-4">Pending Reviews</h2>
					<div className="space-y-4">
						{pendingReviews.map((item) => {
							const Icon = item.type === 'flight' ? Plane : Building;
							return (
								<div key={item.id} className="border border-amber-200 bg-amber-50 rounded-lg p-4">
									<div className="flex items-center justify-between">
										<div className="flex items-center space-x-4">
											<div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
												item.type === 'flight' ? 'bg-blue-100' : 'bg-green-100'
											}`}>
												<Icon className={`w-5 h-5 ${
													item.type === 'flight' ? 'text-blue-600' : 'text-green-600'
												}`} />
											</div>
											<div>
												<h3 className="font-semibold text-gray-900">{item.title}</h3>
												<p className="text-sm text-gray-600">{item.subtitle}</p>
												<div className="flex items-center space-x-1 text-sm text-gray-500 mt-1">
													<Calendar className='w-3 h-3' />
													<span>Completed {item.completedDate}</span>
												</div>
											</div>
										</div>
										<Button size="sm" className="bg-amber-600 hover:bg-amber-700">
											Write Review
										</Button>
									</div>
								</div>
							)
						})}
					</div>
				</div>
			)}

			{/* My Reviews */}
			<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
				<h2 className="text-lg font-semibold text-gray-900 mb-4">My Reviews</h2>
				{myReviews.length > 0 ? (
					<div className="space-y-6">
						{myReviews.map((review) => {
							const Icon = review.type === 'flight' ? Plane : Building;
							return (
								<div key={review.id} className="border border-gray-200 rounded-lg p-6">
									<div className="flex items-start justify-between mb-4">
										<div className="flex items-start space-x-4">
											<div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
												review.type === 'flight' ? 'bg-blue-100' : 'bg-green-100'
											}`}>
												<Icon className={`w-6 h-6 ${
													review.type === 'flight' ? 'text-blue-600' : 'text-green-600'
												}`} />
											</div>
											<div>
												<h3 className="font-semibold text-gray-900">{review.title}</h3>
												<p className="text-sm text-gray-600">{review.subtitle}</p>
												<div className="flex items-center space-x-2 mt-2">
													<div className="flex items-center space-x-1">
														{renderStars(review.rating)}
													</div>
													<span className="text-sm text-gray-500">•</span>
													<span className="text-sm text-gray-500">{review.date}</span>
												</div>
											</div>
										</div>
										<div className="flex items-center space-x-2">
											<Button variant="ghost" size="sm">
												<Edit3 className='w-4 h-4' />
											</Button>
											<Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
												<Trash2 className='w-4 h-4' />
											</Button>
										</div>
									</div>
									
									<div className='mb-4'>
										<p className="text-gray-700 leading-relaxed">{review.review}</p>
									</div>
									
									<div className="flex items-center justify-between pt-4 border-t border-gray-100">
										<div className="flex items-center space-x-4 text-sm text-gray-500">
											<div className="flex items-center space-x-1">
												<ThumbsUp className='w-4 h-4' />
												<span>{review.helpful} found this helpful</span>
											</div>
											<div className="flex items-center space-x-1">
												<MessageSquare className="w-4 h-4" />
												<span>0 comments</span>
											</div>
										</div>
										<div className="text-sm text-gray-500">
											Booked on {review.bookingDate}
										</div>
									</div>
								</div>
							)
						})}
					</div>
				) : (
					<div className="text-center py-8">
						<Star className="w-12 h-12 text-gray-300 mx-auto mb-4" />
						<h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
						<p className="text-gray-600">Share your travel experiences to help other travelers!</p>
					</div>
				)}
			</div>

			{/* Review Guidelines */}
			<div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
				<div className="flex items-start space-x-3">
					<MessageSquare className="w-5 h-5 text-blue-600 mt-0.5" />
					<div>
						<h3 className="font-medium text-blue-900">Review Guidelines</h3>
						<p className="text-blue-800 text-sm mt-1 mb-3">
							Help fellow travelers by writing honest, detailed reviews. Focus on service quality, cleanliness, value for money, and overall experience.
						</p>
						<ul className="text-blue-800 text-sm space-y-1">
							<li>• Be specific about what you liked or disliked</li>
							<li>• Include details about staff, facilities, and location</li>
							<li>• Keep it respectful and constructive</li>
							<li>• Add photos if possible to enhance your review</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}

export const Route = createFileRoute('/$locale/user/review')({
	component: ReviewPage,
});
