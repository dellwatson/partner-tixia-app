import { hotelApi, type HotelData } from '../api/hotel-api';
import { useSelectionStore } from '../stores/selection-store';
import hotelMockData from '../../data/hotel-mock-data.json';

export interface HotelLoaderData {
  hotel: HotelData;
  error?: string;
}

// Loader function for TanStack Router
export async function hotelLoader(ctx: any): Promise<HotelLoaderData> {
  const params = ctx?.params || { hotelId: '' };
  const search = ctx?.search || {};
  try {
    const selectionId: string | undefined = search.sel as string | undefined;

    // If a persisted selection UUID is provided, try loading from local store
    if (selectionId) {
      const sel = useSelectionStore.getState().getSelection(selectionId);
      if (sel && sel.type === 'hotel') {
        // If we already resolved full data before, reuse it
        if (sel.resolved) {
          return { hotel: sel.resolved };
        }

        // Build a HotelData object from snapshot + mock template
        const base = hotelMockData as unknown as HotelData;
        const clone: HotelData = JSON.parse(JSON.stringify(base));

        // Derive country from location
        const loc = (sel.listItem.location || '').toLowerCase();
        const countryId = loc.includes('singapore')
          ? 'singapore'
          : loc.includes('kuala lumpur')
          ? 'malaysia'
          : loc.includes('bangkok')
          ? 'thailand'
          : loc.includes('hanoi') || loc.includes('ho chi minh')
          ? 'vietnam'
          : 'indonesia';

        clone.hotel = {
          ...clone.hotel,
          id: selectionId, // tie detail to selection id for deep-linking
          name: sel.listItem.name,
          countryId,
          price: sel.listItem.price,
          originalPrice: sel.listItem.originalPrice,
          location: sel.listItem.location,
        };

        // Persist resolved detail for future loads
        useSelectionStore.getState().setResolvedHotelData(selectionId, clone);

        return { hotel: clone };
      }
    }

    // If no explicit selection id provided, try to interpret params.hotelId as selection UUID
    if (params.hotelId) {
      const selByParam = useSelectionStore.getState().getSelection(params.hotelId);
      if (selByParam && selByParam.type === 'hotel') {
        const base = hotelMockData as unknown as HotelData;
        const clone: HotelData = JSON.parse(JSON.stringify(base));

        const loc = (selByParam.listItem.location || '').toLowerCase();
        const countryId = loc.includes('singapore')
          ? 'singapore'
          : loc.includes('kuala lumpur')
          ? 'malaysia'
          : loc.includes('bangkok')
          ? 'thailand'
          : loc.includes('hanoi') || loc.includes('ho chi minh')
          ? 'vietnam'
          : 'indonesia';

        clone.hotel = {
          ...clone.hotel,
          id: selByParam.id,
          name: selByParam.listItem.name,
          countryId,
          price: selByParam.listItem.price,
          originalPrice: selByParam.listItem.originalPrice,
          location: selByParam.listItem.location,
        };

        useSelectionStore.getState().setResolvedHotelData(selByParam.id, clone);
        return { hotel: clone };
      }
    }

    // Fallback to API by hotelId slug (supports predefined slugs)
    const hotelId = params.hotelId || 'grand-hotel-jakarta';
    const hotel = await hotelApi.getHotelById(hotelId);
    return { hotel };
  } catch (error) {
    console.error('Failed to load hotel data:', error);
    return {
      hotel: {} as HotelData,
      error: error instanceof Error ? error.message : 'Failed to load hotel data',
    };
  }
}

// Separate loaders for different sections (for potential lazy loading)
export async function hotelRoomsLoader({ params }: { params: { hotelId: string } }) {
  try {
    const hotelId = params.hotelId || 'grand-hotel-downtown';
    const rooms = await hotelApi.getHotelRooms(hotelId);
    return { rooms };
  } catch (error) {
    console.error('Failed to load hotel rooms:', error);
    return { rooms: [], error: error instanceof Error ? error.message : 'Failed to load rooms' };
  }
}

export async function hotelReviewsLoader({ 
  params, 
  search 
}: { 
  params: { hotelId: string };
  search: { page?: number; limit?: number };
}) {
  try {
    const hotelId = params.hotelId || 'grand-hotel-downtown';
    const page = search.page || 1;
    const limit = search.limit || 10;
    
    const reviewsData = await hotelApi.getHotelReviews(hotelId, page, limit);
    return reviewsData;
  } catch (error) {
    console.error('Failed to load hotel reviews:', error);
    return { 
      reviews: [], 
      totalPages: 0, 
      currentPage: 1, 
      totalReviews: 0,
      error: error instanceof Error ? error.message : 'Failed to load reviews' 
    };
  }
}

export async function hotelFacilitiesLoader({ params }: { params: { hotelId: string } }) {
  try {
    const hotelId = params.hotelId || 'grand-hotel-downtown';
    const facilities = await hotelApi.getHotelFacilities(hotelId);
    return { facilities };
  } catch (error) {
    console.error('Failed to load hotel facilities:', error);
    return { 
      facilities: {
        wellness: [],
        food: [],
        business: [],
        general: [],
        accessibility: [],
        safety: [],
        sustainability: [],
        localRegulations: []
      }, 
      error: error instanceof Error ? error.message : 'Failed to load facilities' 
    };
  }
}
