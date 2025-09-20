import { createFileRoute } from '@tanstack/react-router';
import { Marquee } from '~/components/ui/marquee';
import CarouselBig from '~/components/ui/aceternity/carousel-big';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '~/components/ui/carousel';
import { Carousel as AppleCarousel, Card } from '~/components/ui/aceternity/apple-cards-carousel';
import { FeatureCarousel } from '~/components/ui/feature-carousel';
import { HoverBorderGradient } from '~/components/ui/aceternity/hover-border-gradient';
import { InfiniteMovingCards } from '~/components/ui/aceternity/infinite-moving-cards';
import { StoriesReels } from '~/components/ui/stories-reels';
import {
	AnimatedCursors,
	StaticAnimatedCursor,
} from '~/components/ui/kibo-ui/cursor/animated-cursors';

export const Route = createFileRoute('/$locale/hotels/')({
	component: HotelsHomepage,
});

// Sample data for different sections
const hotelRecommendations = [
	{
		title: 'Luxury Resort Paradise',
		button: 'Book Now',
		src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop&crop=center',
	},
	{
		title: 'City Center Hotel',
		button: 'View Details',
		src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop&crop=center',
	},
	{
		title: 'Boutique Mountain Lodge',
		button: 'Explore',
		src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop&crop=center',
	},
];

const featuredDestinations = [
	{
		src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=center',
		title: 'Santorini, Greece',
		category: 'Mediterranean Paradise',
		content: (
			<div>
				<p className="mb-4 text-sm font-normal text-neutral-600 md:text-base">
					Experience the breathtaking sunsets and white-washed buildings of Santorini.
					This Greek island offers luxury accommodations with stunning caldera views.
				</p>
				<p className="mb-4 text-sm font-normal text-neutral-600 md:text-base">
					From infinity pools overlooking the Aegean Sea to traditional cave hotels,
					Santorini provides an unforgettable romantic getaway.
				</p>
				<div className="rounded-lg bg-gray-100 p-4">
					<p className="text-sm font-semibold">Starting from $299/night</p>
					<p className="text-xs text-gray-600">
						Including breakfast and airport transfer
					</p>
				</div>
			</div>
		),
	},
	{
		src: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&h=600&fit=crop&crop=center',
		title: 'Tokyo, Japan',
		category: 'Urban Adventure',
		content: (
			<div>
				<p className="mb-4 text-sm font-normal text-neutral-600 md:text-base">
					Discover the perfect blend of traditional and modern in Tokyo's finest hotels.
					From capsule hotels to luxury ryokans, experience Japanese hospitality at its
					best.
				</p>
				<p className="mb-4 text-sm font-normal text-neutral-600 md:text-base">
					Stay in the heart of Shibuya, explore traditional temples, and enjoy world-class
					dining all within walking distance of your accommodation.
				</p>
				<div className="rounded-lg bg-gray-100 p-4">
					<p className="text-sm font-semibold">Starting from $180/night</p>
					<p className="text-xs text-gray-600">Traditional breakfast included</p>
				</div>
			</div>
		),
	},
	{
		src: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=800&h=600&fit=crop&crop=center',
		title: 'Bali, Indonesia',
		category: 'Tropical Escape',
		content: (
			<div>
				<p className="mb-4 text-sm font-normal text-neutral-600 md:text-base">
					Immerse yourself in Bali's natural beauty with beachfront villas and jungle
					retreats. Experience world-class spas, yoga sessions, and authentic Balinese
					culture.
				</p>
				<p className="mb-4 text-sm font-normal text-neutral-600 md:text-base">
					From luxury beach resorts in Seminyak to peaceful mountain retreats in Ubud,
					find your perfect sanctuary in the Island of Gods.
				</p>
				<div className="rounded-lg bg-gray-100 p-4">
					<p className="text-sm font-semibold">Starting from $120/night</p>
					<p className="text-xs text-gray-600">Spa treatment and breakfast included</p>
				</div>
			</div>
		),
	},
];

const testimonials = [
	{
		quote: 'The hotel booking experience was seamless. Found the perfect beachfront resort for our honeymoon. The staff went above and beyond to make our stay memorable.',
		name: 'Sarah Johnson',
		title: 'Verified Guest',
	},
	{
		quote: 'Incredible selection of luxury hotels. The concierge service helped us discover hidden gems in the city. Will definitely book through this platform again.',
		name: 'Michael Chen',
		title: 'Business Traveler',
	},
	{
		quote: 'Family-friendly options were exactly what we needed. The kids loved the pool, and we enjoyed the spa. Great value for money and excellent customer service.',
		name: 'Emma Rodriguez',
		title: 'Family Vacation',
	},
	{
		quote: 'Last-minute booking was handled professionally. Got an amazing deal on a 5-star hotel. The mobile app made check-in incredibly convenient.',
		name: 'David Thompson',
		title: 'Solo Traveler',
	},
];

const hotelBrands = [
	{ name: 'Marriott', logo: '🏨' },
	{ name: 'Hilton', logo: '🏩' },
	{ name: 'Hyatt', logo: '🏨' },
	{ name: 'InterContinental', logo: '🏩' },
	{ name: 'Radisson', logo: '🏨' },
	{ name: 'Sheraton', logo: '🏩' },
	{ name: 'Westin', logo: '🏨' },
	{ name: 'Four Seasons', logo: '🏩' },
];

const featureCarouselImages = {
	step1light1: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop',
	step1light2:
		'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
	step2light1: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=300&fit=crop',
	step2light2:
		'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop',
	step3light: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop',
	alt: 'Hotel features showcase',
};

// Sample stories data
const storiesData = [
	{
		id: '1',
		type: 'video' as const,
		src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4#t=10',
		duration: 8,
		author: {
			name: 'Luxury Hotels',
			avatar: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=100&h=100&fit=crop&crop=face',
			fallback: 'LH',
		},
		title: 'Luxury Suite Tour',
	},
	{
		id: '2',
		type: 'image' as const,
		src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=600&fit=crop',
		duration: 5,
		author: {
			name: 'Beach Resort',
			avatar: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=100&h=100&fit=crop&crop=face',
			fallback: 'BR',
		},
		title: 'Ocean View Paradise',
	},
	{
		id: '3',
		type: 'video' as const,
		src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4#t=5',
		duration: 6,
		author: {
			name: 'City Hotels',
			avatar: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop&crop=face',
			fallback: 'CH',
		},
		title: 'Urban Experience',
	},
	{
		id: '4',
		type: 'image' as const,
		src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=600&fit=crop',
		duration: 4,
		author: {
			name: 'Mountain Lodge',
			avatar: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=100&h=100&fit=crop&crop=face',
			fallback: 'ML',
		},
		title: 'Alpine Retreat',
	},
	{
		id: '5',
		type: 'video' as const,
		src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4#t=3',
		duration: 7,
		author: {
			name: 'Boutique Stay',
			avatar: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=100&h=100&fit=crop&crop=face',
			fallback: 'BS',
		},
		title: 'Unique Experience',
	},
	{
		id: '6',
		type: 'image' as const,
		src: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=400&h=600&fit=crop',
		duration: 6,
		author: {
			name: 'Grand Palace',
			avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
			fallback: 'GP',
		},
		title: 'Royal Treatment',
	},
	{
		id: '7',
		type: 'video' as const,
		src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4#t=8',
		duration: 5,
		author: {
			name: 'Spa Retreat',
			avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
			fallback: 'SR',
		},
		title: 'Wellness Journey',
	},
	{
		id: '8',
		type: 'image' as const,
		src: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=600&fit=crop',
		duration: 4,
		author: {
			name: 'Desert Oasis',
			avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
			fallback: 'DO',
		},
		title: 'Sunset Views',
	},
	{
		id: '9',
		type: 'video' as const,
		src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4#t=12',
		duration: 7,
		author: {
			name: 'Sky Lounge',
			avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
			fallback: 'SL',
		},
		title: 'Rooftop Dining',
	},
	{
		id: '10',
		type: 'image' as const,
		src: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=600&fit=crop',
		duration: 5,
		author: {
			name: 'Forest Lodge',
			avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
			fallback: 'FL',
		},
		title: 'Nature Escape',
	},
	{
		id: '11',
		type: 'video' as const,
		src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4#t=5',
		duration: 6,
		author: {
			name: 'Urban Chic',
			avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=100&h=100&fit=crop&crop=face',
			fallback: 'UC',
		},
		title: 'Modern Comfort',
	},
	{
		id: '12',
		type: 'image' as const,
		src: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=600&fit=crop',
		duration: 4,
		author: {
			name: 'Coastal Villa',
			avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
			fallback: 'CV',
		},
		title: 'Seaside Bliss',
	},
];

// homepage -> list
function HotelsHomepage() {
	return (
		<div className="min-h-screen overflow-x-hidden bg-gradient-to-b from-gray-50 to-white">
			{/* Featured Destinations Section - Apple Cards Carousel */}
			<section className="relative bg-gray-50 py-8">
				<div className="w-full">
					<div className="relative overflow-x-hidden">
						<AppleCarousel
							items={featuredDestinations.map((destination, index) => (
								<Card key={index} card={destination} index={index} />
							))}
						/>
					</div>
				</div>
			</section>

			{/* Hotel Recommendations Section - Carousel Big */}
			<section className="bg-white py-16">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="mb-12 text-center">
						<h2 className="mb-4 text-4xl font-bold text-gray-900">
							Recommended Hotels
						</h2>
						<p className="text-xl text-gray-600">
							Handpicked accommodations for your perfect getaway
						</p>
					</div>
					<div className="flex justify-center">
						<CarouselBig slides={hotelRecommendations} />
					</div>
				</div>
			</section>

			{/* Stories Section */}
			<section className="relative bg-white py-8">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="relative mb-6 text-center">
						<h2 className="mb-2 text-2xl font-bold text-gray-900">Hotel Stories</h2>
						<p className="text-gray-600">Discover amazing hotel experiences</p>

						{/* Static Animated Cursors around header */}
						<StaticAnimatedCursor
							name="Sarah"
							message="This looks incredible! 😍"
							color="blue"
							position={{ x: 8, y: 200 }}
							delay={0}
						/>

						<StaticAnimatedCursor
							name="Mike"
							message="Just booked my stay! 🔥"
							color="green"
							position={{ x: 75, y: 250 }}
							delay={1}
						/>

						<StaticAnimatedCursor
							name="Emma"
							message="Going viral on social! ✨"
							color="purple"
							position={{ x: 85, y: 600 }}
							delay={2}
						/>
					</div>

					<div className="relative h-64 overflow-hidden">
						<StoriesReels stories={storiesData} />

						{/* Contained animated cursors */}
						{/* <AnimatedCursors /> */}
					</div>
				</div>
			</section>

			{/* Hotel Categories Section - Feature Carousel */}
			<section className="bg-white py-16">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="mb-12 text-center">
						<h2 className="mb-4 text-4xl font-bold text-gray-900">
							Hotel Categories & Features
						</h2>
						<p className="text-xl text-gray-600">
							Discover different types of accommodations and their unique features
						</p>
					</div>
					<div className="mx-auto max-w-4xl">
						<FeatureCarousel
							title="Hotel Categories"
							description="Explore various hotel types and amenities"
							image={featureCarouselImages}
						/>
					</div>
				</div>
			</section>

			{/* Customer Testimonials Section - Infinite Moving Cards */}
			<section className="relative bg-gray-900 py-16">
				<div className="w-full">
					<div className="mb-12 px-4 text-center">
						<h2 className="mb-4 text-4xl font-bold text-white">What Our Guests Say</h2>
						<p className="text-xl text-gray-300">
							Real experiences from travelers around the world
						</p>
					</div>
					<div className="relative overflow-x-hidden">
						<InfiniteMovingCards items={testimonials} direction="right" speed="slow" />
					</div>
				</div>
			</section>

			{/* Hotel Brands Section - Marquee */}
			<section className="relative bg-white py-16">
				<div className="w-full">
					<div className="mb-12 px-4 text-center">
						<h2 className="mb-4 text-4xl font-bold text-gray-900">
							Trusted Hotel Partners
						</h2>
						<p className="text-xl text-gray-600">
							We work with the world's leading hotel brands
						</p>
					</div>
					<div className="relative overflow-x-hidden">
						<Marquee className="py-8" pauseOnHover>
							{hotelBrands.map((brand, index) => (
								<div
									key={index}
									className="mx-8 flex items-center space-x-3 rounded-lg bg-gray-100 px-6 py-4 transition-colors hover:bg-gray-200"
								>
									<span className="text-2xl">{brand.logo}</span>
									<span className="text-lg font-semibold text-gray-800">
										{brand.name}
									</span>
								</div>
							))}
						</Marquee>
					</div>
				</div>
			</section>

			{/* Simple Hotel Grid Section - Regular Carousel */}
			<section className="bg-gray-50 py-16">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="mb-12 text-center">
						<h2 className="mb-4 text-4xl font-bold text-gray-900">Popular Hotels</h2>
						<p className="text-xl text-gray-600">
							Browse through our most booked accommodations
						</p>
					</div>
					<Carousel className="mx-auto w-full max-w-5xl">
						<CarouselContent>
							{[1, 2, 3, 4, 5, 6].map((_, index) => (
								<CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
									<div className="p-1">
										<div className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg">
											<img
												src={`https://images.unsplash.com/photo-${1571896349842 + index}?w=400&h=250&fit=crop&crop=center`}
												alt={`Hotel ${index + 1}`}
												className="h-48 w-full object-cover"
											/>
											<div className="p-4">
												<h3 className="mb-2 text-lg font-semibold text-gray-900">
													Hotel Paradise {index + 1}
												</h3>
												<p className="mb-3 text-sm text-gray-600">
													Luxury accommodation with world-class amenities
												</p>
												<div className="flex items-center justify-between">
													<span className="text-lg font-bold text-blue-600">
														${199 + index * 50}/night
													</span>
													<button className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
														Book Now
													</button>
												</div>
											</div>
										</div>
									</div>
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious />
						<CarouselNext />
					</Carousel>
				</div>
			</section>

			{/* Call to Action Section */}
			{/* <section className="bg-gradient-to-r from-purple-600 to-blue-600 py-20">
				<div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
					<h2 className="mb-6 text-4xl font-bold text-white">
						Ready to Book Your Dream Stay?
					</h2>
					<p className="mb-8 text-xl text-white opacity-90">
						Join millions of travelers who trust us with their accommodations
					</p>
					<div className="flex flex-col justify-center gap-4 sm:flex-row">
						<HoverBorderGradient
							containerClassName="rounded-full"
							as="button"
							className="bg-white px-8 py-3 font-semibold text-purple-600"
						>
							Browse Hotels
						</HoverBorderGradient>
						<HoverBorderGradient
							containerClassName="rounded-full"
							as="button"
							className="border border-white bg-transparent px-8 py-3 font-semibold text-white"
						>
							Download App
						</HoverBorderGradient>
					</div>
				</div>
			</section> */}
		</div>
	);
}
