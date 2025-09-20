import { proceduralFlightGenerator } from '~/lib/services/procedural-flight-generator';
import { useFlightSearchStore } from '~/lib/stores/flight-search-store';
import type { FlightSearchParams } from '~/lib/stores/flight-search-store';

export const flightSearchLoader = async (ctx: any) => {
  const search = ctx.search || {};
  
  console.log('🔍 Flight Loader - URL search params:', search);
  console.log('🔍 Flight Loader - Context:', ctx);
  
  // Extract search parameters from URL search params
  console.log('🔍 Raw URL search object:', search);
  console.log('🔍 search.from:', search.from, 'type:', typeof search.from);
  console.log('🔍 search.to:', search.to, 'type:', typeof search.to);
  
  const searchParams: FlightSearchParams = {
    from: search.from ? String(search.from).split(',') : [],
    to: search.to ? String(search.to).split(',') : [],
    departDate: search.depart || undefined,
    returnDate: search.return || undefined,
    passengers: parseInt(String(search.adults || '1'), 10),
    tripType: search.type ? String(search.type).toLowerCase() as 'oneway' | 'roundtrip' : 'oneway',
    class: (search.class as 'economy' | 'premium_economy' | 'business' | 'first') || 'economy'
  };
  
  console.log('🔍 Flight Loader - Parsed search params:', searchParams);
  console.log('🔍 Raw URL params:', { 
    type: search.type, 
    typeString: String(search.type),
    typeLower: String(search.type).toLowerCase() 
  });
  
  // Test procedural generator
  console.log('🔍 Testing procedural generator...');
  try {
    const testFlights = proceduralFlightGenerator.generateFlights({
      from: ['SIN'],
      to: ['BKK'],
      departDate: '2025-09-18',
      returnDate: '2025-09-25',
      passengers: 1,
      class: 'economy',
      tripType: 'roundtrip',
      count: 5
    });
    console.log('🔍 Test generation successful:', testFlights.length, 'flights');
  } catch (error) {
    console.error('🔍 Test generation failed:', error);
  }

  // Extract filter and sort parameters
  const filters = {
    priceRange: search.priceMin && search.priceMax 
      ? [parseInt(String(search.priceMin), 10), parseInt(String(search.priceMax), 10)] as [number, number]
      : undefined,
    airlines: search.airlines ? String(search.airlines).split(',') : [],
    maxStops: search.maxStops !== undefined ? parseInt(String(search.maxStops), 10) : null,
    departureTime: search.departureTime ? String(search.departureTime).split(',') : [],
    duration: search.durationMin && search.durationMax
      ? [parseInt(String(search.durationMin), 10), parseInt(String(search.durationMax), 10)] as [number, number]
      : undefined,
    aircraft: search.aircraft ? String(search.aircraft).split(',') : []
  };

  const sort = {
    field: (search.sortBy as 'price' | 'duration' | 'departure' | 'arrival' | 'airline') || 'price',
    direction: (search.sortDir as 'asc' | 'desc') || 'asc'
  };

  const pagination = {
    page: parseInt(String(search.page || '1'), 10),
    limit: parseInt(String(search.limit || '20'), 10)
  };

  // Check if this is a new search (different search params) or just filtering/sorting
  const store = useFlightSearchStore.getState();
  console.log('🔍 Current store state:', {
    searchParams: store.searchParams,
    rawFlightsCount: store.rawFlights.length,
    filteredFlightsCount: store.filteredFlights.length,
    isLoading: store.isLoading
  });
  
  const isNewSearch = !store.searchParams || 
    JSON.stringify(store.searchParams) !== JSON.stringify(searchParams);
    
  console.log('🔍 Is new search?', isNewSearch);
  console.log('🔍 Store searchParams:', JSON.stringify(store.searchParams));
  console.log('🔍 Current searchParams:', JSON.stringify(searchParams));
  console.log('🔍 Params match?', JSON.stringify(store.searchParams) === JSON.stringify(searchParams));

  if (isNewSearch) {
    // New search - generate fresh procedural data
    console.log('🔍 New flight search detected, generating procedural data...');
    
    // Simulate API delay for realistic SSR experience
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));

    // Generate procedural flights (40+ flights)
    console.log('🔍 Generating procedural flights with params:', {
      from: searchParams.from,
      to: searchParams.to,
      departDate: searchParams.departDate,
      returnDate: searchParams.returnDate,
      passengers: searchParams.passengers,
      class: searchParams.class,
      tripType: searchParams.tripType,
      count: 45 + Math.floor(Math.random() * 15)
    });
    
    const rawFlights = proceduralFlightGenerator.generateFlights({
      from: searchParams.from,
      to: searchParams.to,
      departDate: searchParams.departDate,
      returnDate: searchParams.returnDate,
      passengers: searchParams.passengers,
      class: searchParams.class,
      tripType: searchParams.tripType,
      count: 45 + Math.floor(Math.random() * 15) // 45-60 flights
    });
    
    console.log('🔍 Generated flights count:', rawFlights.length);
    console.log('🔍 First flight sample:', rawFlights[0]);
    console.log('🔍 Flight types generated:', rawFlights.map(f => ({
      id: f.id,
      hasOutbound: 'outbound' in f,
      hasReturn: 'return' in f,
      isRoundTrip: 'outbound' in f && 'return' in f
    })));

    // Update store with new search
    store.setSearchParams(searchParams);
    store.setRawFlights(rawFlights);
    
    console.log('🔍 Store updated. New state:', {
      searchParams: store.searchParams,
      rawFlightsCount: store.rawFlights.length,
      filteredFlightsCount: store.filteredFlights.length
    });
  }

  // Apply filters and sorting (this will use cached data if not a new search)
  if (filters.priceRange) {
    store.updateFilters({ priceRange: filters.priceRange });
  }
  if (filters.airlines.length > 0) {
    store.updateFilters({ airlines: filters.airlines });
  }
  if (filters.maxStops !== null) {
    store.updateFilters({ maxStops: filters.maxStops });
  }
  if (filters.departureTime.length > 0) {
    store.updateFilters({ departureTime: filters.departureTime });
  }
  if (filters.duration) {
    store.updateFilters({ duration: filters.duration });
  }
  if (filters.aircraft.length > 0) {
    store.updateFilters({ aircraft: filters.aircraft });
  }

  // Apply sorting
  store.updateSort(sort);

  // Update pagination
  store.updatePagination(pagination);

  // Get current state
  const currentState = store;
  const { filteredFlights, pagination: currentPagination } = currentState;

  // Apply pagination to results
  const startIndex = (currentPagination.page - 1) * currentPagination.limit;
  const endIndex = startIndex + currentPagination.limit;
  const paginatedFlights = filteredFlights.slice(startIndex, endIndex);

  console.log(`📊 Returning ${paginatedFlights.length} flights (page ${currentPagination.page}/${Math.ceil(currentPagination.total / currentPagination.limit)})`);
  
  const result = {
    flights: paginatedFlights,
    total: currentPagination.total,
    pagination: {
      page: currentPagination.page,
      limit: currentPagination.limit,
      total: currentPagination.total
    },
    hasMore: endIndex < currentPagination.total,
    searchParams,
    filters: currentState.filters,
    sort: currentState.sort,
    availableFilters: currentState.availableFilters,
    isNewSearch
  };
  
  console.log('📊 Final loader result:', result);
  return result;
};
