import { useNavigate, useSearch, useRouterState } from '@tanstack/react-router';
import { useCallback, useMemo } from 'react';

// Separate hooks for hotels and flights to avoid conditional hook calls
export function useHotelFilterParams() {
  const navigate = useNavigate();
  const searchParams = useSearch({ from: '/$locale/hotels/search/' }) as any;

  const updateFilter = useCallback((filterId: string, value: any) => {
    const currentParams = { ...searchParams };
    
    if (Array.isArray(value)) {
      if (value.length === 0) {
        delete currentParams[filterId];
      } else {
        currentParams[filterId] = value.join(',');
      }
    } else if (value === null || value === undefined || value === '') {
      delete currentParams[filterId];
    } else {
      currentParams[filterId] = value;
    }

    navigate({
      to: '/$locale/hotels/search',
      params: { locale: 'en' },
      search: currentParams,
      replace: true
    });
  }, [navigate, searchParams]);

  const getFilterValue = useCallback((filterId: string, defaultValue?: any) => {
    const paramValue = searchParams[filterId];
    if (!paramValue) return defaultValue;
    if (typeof paramValue === 'string' && paramValue.includes(',')) {
      return paramValue.split(',');
    }
    return paramValue;
  }, [searchParams]);

  const resetFilter = useCallback((filterId: string) => {
    updateFilter(filterId, null);
  }, [updateFilter]);

  const resetAllFilters = useCallback(() => {
    const essentialParams = {
      location: searchParams.location,
      checkIn: searchParams.checkIn,
      checkOut: searchParams.checkOut,
      guests: searchParams.guests,
      rooms: searchParams.rooms
    };

    navigate({
      to: '/$locale/hotels/search',
      params: { locale: 'en' },
      search: essentialParams,
      replace: true
    });
  }, [navigate, searchParams]);

  return { updateFilter, getFilterValue, resetFilter, resetAllFilters };
}

export function useFlightFilterParams() {
  const navigate = useNavigate();
  const searchParams = useSearch({ from: '/$locale/flights/search/' }) as any;

  const updateFilter = useCallback((filterId: string, value: any) => {
    const currentParams = { ...searchParams };
    
    if (Array.isArray(value)) {
      if (value.length === 0) {
        delete currentParams[filterId];
      } else {
        currentParams[filterId] = value.join(',');
      }
    } else if (value === null || value === undefined || value === '') {
      delete currentParams[filterId];
    } else {
      currentParams[filterId] = value;
    }

    navigate({
      to: '/$locale/flights/search',
      params: { locale: 'en' },
      search: currentParams,
      replace: true
    });
  }, [navigate, searchParams]);

  const getFilterValue = useCallback((filterId: string, defaultValue?: any) => {
    const paramValue = searchParams[filterId];
    if (!paramValue) return defaultValue;
    if (typeof paramValue === 'string' && paramValue.includes(',')) {
      return paramValue.split(',');
    }
    return paramValue;
  }, [searchParams]);

  const resetFilter = useCallback((filterId: string) => {
    updateFilter(filterId, null);
  }, [updateFilter]);

  const resetAllFilters = useCallback(() => {
    const essentialParams = {
      from: searchParams.from,
      to: searchParams.to,
      depart: searchParams.depart,
      return: searchParams.return,
      adults: searchParams.adults,
      type: searchParams.type
    };

    navigate({
      to: '/$locale/flights/search',
      params: { locale: 'en' },
      search: essentialParams,
      replace: true
    });
  }, [navigate, searchParams]);

  return { updateFilter, getFilterValue, resetFilter, resetAllFilters };
}

// Legacy hook for backward compatibility - auto-detects route
export function useFilterParams() {
  const routerState = useRouterState();
  
  const routeType = useMemo(() => {
    const currentPath = routerState.location.pathname;
    if (currentPath.includes('/hotels/')) return 'hotels';
    if (currentPath.includes('/flights/')) return 'flights';
    return 'hotels';
  }, [routerState.location.pathname]);
  
  // This is a fallback - components should use specific hooks
  const navigate = useNavigate();
  const searchParams = {} as any;

  const updateFilter = useCallback(() => {
    console.warn('useFilterParams is deprecated. Use useHotelFilterParams or useFlightFilterParams instead.');
  }, []);

  const getFilterValue = useCallback(() => {
    console.warn('useFilterParams is deprecated. Use useHotelFilterParams or useFlightFilterParams instead.');
    return null;
  }, []);

  const resetFilter = useCallback(() => {
    console.warn('useFilterParams is deprecated. Use useHotelFilterParams or useFlightFilterParams instead.');
  }, []);

  const resetAllFilters = useCallback(() => {
    console.warn('useFilterParams is deprecated. Use useHotelFilterParams or useFlightFilterParams instead.');
  }, []);

  return { updateFilter, getFilterValue, resetFilter, resetAllFilters };
}
