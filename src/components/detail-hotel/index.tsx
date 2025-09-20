import { useParams, useNavigate, useLoaderData } from '@tanstack/react-router';
import React, { useState } from 'react';
import { type HotelLoaderData } from '~/lib/loaders/hotel-loader';
import { useHotelAdditionalData } from '~/hooks/use-hotel-additional-data';
import { Container } from '~/components/ui/container';
import { LoadingWrapper } from '~/components/ui/loading-wrapper';
import { useSelectionStore } from '~/lib/stores/selection-store';
// Add imports back systematically
import { HotelNavigation } from './0_navigation/HotelNavigation';
import HotelOverview from './1_overview/HotelOverview';
import AvailabilityArea from './2_room/AvailabilityArea';
import AreaInfo from './3_location/AreaInfo';
import { DetailedFacilities } from './4_facilities/DetailedFacilities';
import CompanyInfo from './4_facilities/CompanyInfo';
import HouseRules from './5_policy/HouseRules';
import TravelersFAQ from './5_policy/TravelersFAQ';
import SpaceFAQ from './5_policy/SpaceFAQ';
import GuestReviews from './6_review/GuestReviews';
import MoreInformation from './7_additional/MoreInformation';
import Recommendations from './7_additional/Recommendations';

export function HotelDetailPage() {
	const { hotelId, countryId, locale } = useParams({
		from: '/$locale/hotels/$countryId/$hotelId',
	});
	const navigate = useNavigate();
	const loaderData = useLoaderData({
		from: '/$locale/hotels/$countryId/$hotelId',
	}) as HotelLoaderData;
	const getSelection = useSelectionStore((s) => s.getSelection);
	const hotelSel = getSelection(hotelId || '');

	// Use data from loader or fallback to error state
	if (loaderData.error) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-white">
				<div className="text-center">
					<h1 className="mb-4 text-2xl font-bold text-gray-900">Hotel Not Found</h1>
					<p className="mb-4 text-gray-600">{loaderData.error}</p>
					<button
						onClick={() => navigate({ to: '/$locale/hotels', params: { locale } })}
						className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
					>
						Back to Hotels
					</button>
				</div>
			</div>
		);
	}

	const { hotel: hotelData } = loaderData;

	// Add safety check for hotel data
	if (!hotelData || !hotelData.hotel) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-white">
				<div className="text-center">
					<h1 className="mb-4 text-2xl font-bold text-gray-900">Loading Hotel Data...</h1>
					<div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
				</div>
			</div>
		);
	}

	// Extract the actual hotel data
	const hotel = hotelData.hotel;

	// Safely access data from loader with fallbacks
	const rooms = hotelData?.rooms || [];
	const reviews = hotelData?.reviews || [];
	const reviewStats = hotelData?.reviewStats || {
		overall: 0,
		totalReviews: 0,
		breakdown: {
			cleanliness: 0,
			comfort: 0,
			location: 0,
			facilities: 0,
			staff: 0,
			valueForMoney: 0,
		},
		ratingDistribution: {},
	};
	const faqs = hotelData?.faqs || [];
	const facilities = hotelData?.facilities || {};

	// Use hooks to fetch additional data from API/loader
	const {
		facilities: hotelFacilities,
		houseRules,
		companyInfo,
		areaInfo,
		recommendations,
		moreInfo,
		isLoading: isAdditionalDataLoading,
		error: additionalDataError,
	} = useHotelAdditionalData(hotelId);

	const [activeTab, setActiveTab] = useState('overview');

	return (
		<div className="min-h-screen bg-white">
			{/* Test Navigation */}
			<HotelNavigation
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				hotelName={hotel?.name || 'Test Hotel'}
				locale={locale}
				countryId={countryId}
			/>

			<Container>
				{/* Main Content */}
				<div className="space-y-12 py-8">
					{/* Overview Section */}
					<div id="overview">
						<HotelOverview hotel={hotel} />
					</div>

					{/* Room Section */}
					<div id="room">
						<AvailabilityArea
							hotelId={hotelId}
							checkIn={(hotelSel && hotelSel.type === 'hotel' && hotelSel.searchParams?.checkIn) || '2025-09-24'}
							checkOut={(hotelSel && hotelSel.type === 'hotel' && hotelSel.searchParams?.checkOut) || '2025-09-27'}
							guests={(hotelSel && hotelSel.type === 'hotel' && hotelSel.searchParams?.guests) || 2}
							rooms={rooms}
						/>
					</div>

					{/* Location Section */}
					<div id="location">
						<LoadingWrapper isLoading={isAdditionalDataLoading || !areaInfo}>
							{areaInfo && (
								<AreaInfo
									neighborhood={areaInfo.neighborhood}
									description={areaInfo.description}
									attractions={areaInfo.attractions}
									transport={areaInfo.transport}
									walkScore={areaInfo.walkScore}
								/>
							)}
						</LoadingWrapper>
					</div>

					{/* Facilities Section */}
					<div id="facilities">
						<LoadingWrapper
							isLoading={isAdditionalDataLoading || !hotelFacilities || !companyInfo}
						>
							{hotelFacilities && companyInfo && (
								<DetailedFacilities
									facilities={hotelFacilities}
									companyInfo={companyInfo}
								/>
							)}
						</LoadingWrapper>
					</div>

					{/* Policy Section */}
					<div id="policy">
						<LoadingWrapper isLoading={isAdditionalDataLoading || !houseRules}>
							{houseRules && (
								<div className="space-y-8">
									<HouseRules
										checkInOut={{
											checkIn: { from: '3:00 PM', to: '11:00 PM' },
											checkOut: { from: '6:00 AM', to: '11:00 AM' },
										}}
										rules={houseRules}
										cancellationPolicy={hotel.policies.cancellation}
										damagePolicy="Guests are responsible for any damage to the property. A security deposit may be required."
									/>
									<TravelersFAQ faqs={faqs} />
									<SpaceFAQ propertyName={hotel.name} questions={faqs} />
								</div>
							)}
						</LoadingWrapper>
					</div>

					{/* Review Section */}
					<div id="review">
						<GuestReviews reviews={reviews} stats={reviewStats} />
					</div>

					{/* Additional Information Sections */}
					<div className="space-y-8">
						{/* Company Information */}
						<LoadingWrapper isLoading={isAdditionalDataLoading || !companyInfo}>
							{companyInfo && (
								<CompanyInfo
									managementCompany={companyInfo.managementCompany}
									contactInfo={companyInfo.contactInfo}
									certifications={companyInfo.certifications}
									awards={companyInfo.awards}
									description={companyInfo.description}
								/>
							)}
						</LoadingWrapper>

						{/* More Information */}
						<LoadingWrapper isLoading={isAdditionalDataLoading || !moreInfo}>
							{moreInfo && (
								<MoreInformation
									legalInfo={moreInfo.legalInfo}
									contactInfo={moreInfo.contactInfo}
									termsAndConditions={moreInfo.termsAndConditions}
									privacyPolicy={moreInfo.privacyPolicy}
									accessibilityInfo={moreInfo.accessibilityInfo}
									sustainabilityInfo={moreInfo.sustainabilityInfo}
									localRegulations={moreInfo.localRegulations}
								/>
							)}
						</LoadingWrapper>

						{/* Recommendations */}
						<LoadingWrapper isLoading={isAdditionalDataLoading || !recommendations}>
							{recommendations && (
								<Recommendations
									currentHotelId={hotelId}
									similarHotels={recommendations.similarHotels}
									nearbyHotels={recommendations.nearbyHotels}
									alternativeDestinations={
										recommendations.alternativeDestinations
									}
								/>
							)}
						</LoadingWrapper>
					</div>
				</div>
			</Container>
		</div>
	);
}
