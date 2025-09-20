import { createFileRoute } from '@tanstack/react-router';
import { Button } from '~/components/ui/button';
import { 
	Gift, 
	Star, 
	Trophy,
	CreditCard,
	Plane,
	Building,
	TrendingUp,
	Calendar,
	Award
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

function RewardsPage() {
	const { t } = useTranslation();

	const rewardHistory = [
		{
			id: 1,
			type: 'earned',
			points: 500,
			description: 'Flight booking - NYC to London',
			date: 'Dec 1, 2024'
		},
		{
			id: 2,
			type: 'redeemed',
			points: -200,
			description: 'Seat upgrade voucher',
			date: 'Nov 28, 2024'
		},
		{
			id: 3,
			type: 'earned',
			points: 300,
			description: 'Hotel booking - Hilton London',
			date: 'Nov 25, 2024'
		}
	]

	const availableRewards = [
		{
			id: 1,
			title: 'Free Seat Upgrade',
			description: 'Upgrade to premium economy on your next flight',
			points: 500,
			category: 'flight',
			available: true
		},
		{
			id: 2,
			title: 'Hotel Night Credit',
			description: 'One free night at participating hotels',
			points: 1000,
			category: 'hotel',
			available: true
		},
		{
			id: 3,
			title: 'Priority Boarding',
			description: 'Skip the line with priority boarding',
			points: 200,
			category: 'flight',
			available: true
		},
		{
			id: 4,
			title: 'Lounge Access',
			description: '24-hour airport lounge access pass',
			points: 800,
			category: 'flight',
			available: false
		}
	]

	return (
		<div className="space-y-6">
			{/* Page Header */}
			<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-2xl font-bold text-gray-900">Rewards Program</h1>
						<p className="text-gray-600 mt-1">Earn points and unlock exclusive benefits</p>
					</div>
				</div>
			</div>

			{/* Points Overview */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6 text-white">
					<div className="flex items-center justify-between">
						<div>
							<div className="text-purple-100 text-sm">Available Points</div>
							<div className="text-3xl font-bold">2,450</div>
						</div>
						<Gift className="w-8 h-8 text-purple-200" />
					</div>
				</div>
				
				<div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
					<div className="flex items-center justify-between">
						<div>
							<div className="text-blue-100 text-sm">Lifetime Points</div>
							<div className="text-3xl font-bold">15,680</div>
						</div>
						<TrendingUp className="w-8 h-8 text-blue-200" />
					</div>
				</div>
				
				<div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl p-6 text-white">
					<div className="flex items-center justify-between">
						<div>
							<div className="text-amber-100 text-sm">Member Status</div>
							<div className="text-xl font-bold">Gold</div>
						</div>
						<Trophy className="w-8 h-8 text-amber-200" />
					</div>
				</div>
			</div>

			{/* Membership Progress */}
			<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
				<h2 className="text-lg font-semibold text-gray-900 mb-4">Membership Progress</h2>
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-3">
							<div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
								<Award className="w-4 h-4 text-gray-600" />
							</div>
							<span className="text-gray-600">Silver</span>
						</div>
						<div className="flex items-center space-x-3">
							<div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
								<Award className="w-4 h-4 text-amber-600" />
							</div>
							<span className="font-medium text-gray-900">Gold (Current)</span>
						</div>
						<div className="flex items-center space-x-3">
							<div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
								<Award className="w-4 h-4 text-gray-400" />
							</div>
							<span className="text-gray-400">Platinum</span>
						</div>
					</div>
					<div className="w-full bg-gray-200 rounded-full h-2">
						<div className="bg-amber-500 h-2 rounded-full" style={{ width: '65%' }}></div>
					</div>
					<div className="text-sm text-gray-600">
						Earn 2,320 more points to reach Platinum status
					</div>
				</div>
			</div>

			{/* Available Rewards */}
			<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
				<h2 className="text-lg font-semibold text-gray-900 mb-4">Available Rewards</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{availableRewards.map((reward) => (
						<div key={reward.id} className={`border rounded-lg p-4 ${
							reward.available ? 'border-gray-200 hover:border-purple-300 hover:bg-purple-50' : 'border-gray-100 bg-gray-50'
						} transition-colors`}>
							<div className="flex items-start justify-between">
								<div className="flex items-start space-x-3">
									<div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
										reward.category === 'flight' ? 'bg-blue-100' : 'bg-green-100'
									}`}>
										{reward.category === 'flight' ? (
											<Plane className={`w-5 h-5 ${reward.available ? 'text-blue-600' : 'text-gray-400'}`} />
										) : (
											<Building className={`w-5 h-5 ${reward.available ? 'text-green-600' : 'text-gray-400'}`} />
										)}
									</div>
									<div className='flex-1'>
										<h3 className={`font-medium ${reward.available ? 'text-gray-900' : 'text-gray-500'}`}>
											{reward.title}
										</h3>
										<p className={`text-sm ${reward.available ? 'text-gray-600' : 'text-gray-400'}`}>
											{reward.description}
										</p>
										<div className="flex items-center space-x-2 mt-2">
											<Star className={`w-4 h-4 ${reward.available ? 'text-purple-500' : 'text-gray-400'}`} />
											<span className={`text-sm font-medium ${reward.available ? 'text-purple-600' : 'text-gray-400'}`}>
												{reward.points} points
											</span>
										</div>
									</div>
								</div>
								<Button 
									size='sm' 
									disabled={!reward.available || reward.points > 2450}
									variant={reward.available && reward.points <= 2450 ? "default" : "outline"}
								>
									{reward.available ? (reward.points <= 2450 ? 'Redeem' : 'Not enough points') : 'Unavailable'}
								</Button>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Points History */}
			<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
				<h2 className="text-lg font-semibold text-gray-900 mb-4">Points History</h2>
				<div className="space-y-3">
					{rewardHistory.map((transaction) => (
						<div key={transaction.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
							<div className="flex items-center space-x-3">
								<div className={`w-8 h-8 rounded-full flex items-center justify-center ${
									transaction.type === 'earned' ? 'bg-green-100' : 'bg-red-100'
								}`}>
									{transaction.type === 'earned' ? (
										<TrendingUp className="w-4 h-4 text-green-600" />
									) : (
										<Gift className="w-4 h-4 text-red-600" />
									)}
								</div>
								<div>
									<div className="font-medium text-gray-900">{transaction.description}</div>
									<div className="text-sm text-gray-500">{transaction.date}</div>
								</div>
							</div>
							<div className={`font-semibold ${
								transaction.type === 'earned' ? 'text-green-600' : 'text-red-600'
							}`}>
								{transaction.type === 'earned' ? '+' : ''}{transaction.points}
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Earning Opportunities */}
			<div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
				<div className="flex items-start space-x-3">
					<Star className="w-5 h-5 text-blue-600 mt-0.5" />
					<div>
						<h3 className="font-medium text-blue-900">Earn More Points</h3>
						<p className="text-blue-800 text-sm mt-1 mb-3">
							Book flights and hotels to earn points. Gold members earn 1.5x points on all bookings!
						</p>
						<div className="flex items-center space-x-3">
							<Button size="sm" className="bg-blue-600 hover:bg-blue-700">
								Book Flight
							</Button>
							<Button size="sm" variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
								Book Hotel
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export const Route = createFileRoute('/$locale/user/rewards')({
	component: RewardsPage,
});
