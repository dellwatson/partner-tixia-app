import { useState, useEffect } from 'react';
import { hotelAdditionalApi, type HotelFacility, type HouseRule, type CompanyInfo, type AreaInfo, type Recommendations, type MoreInfo } from '~/lib/api/hotel-additional-api';

interface UseHotelAdditionalDataReturn {
  facilities: HotelFacility[];
  houseRules: HouseRule[];
  companyInfo: CompanyInfo | null;
  areaInfo: AreaInfo | null;
  recommendations: Recommendations | null;
  moreInfo: MoreInfo | null;
  isLoading: boolean;
  error: string | null;
}

export function useHotelAdditionalData(hotelId: string): UseHotelAdditionalDataReturn {
  const [data, setData] = useState<{
    facilities: HotelFacility[];
    houseRules: HouseRule[];
    companyInfo: CompanyInfo | null;
    areaInfo: AreaInfo | null;
    recommendations: Recommendations | null;
    moreInfo: MoreInfo | null;
  }>({
    facilities: [],
    houseRules: [],
    companyInfo: null,
    areaInfo: null,
    recommendations: null,
    moreInfo: null,
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!hotelId) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const additionalData = await hotelAdditionalApi.getAllAdditionalData(hotelId);
        setData(additionalData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch hotel additional data');
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [hotelId]);

  return {
    ...data,
    isLoading,
    error,
  };
}

// Individual hooks for specific data if needed
export function useHotelFacilities(hotelId: string) {
  const [facilities, setFacilities] = useState<HotelFacility[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFacilities() {
      if (!hotelId) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await hotelAdditionalApi.getHotelFacilities(hotelId);
        setFacilities(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch facilities');
      } finally {
        setIsLoading(false);
      }
    }

    fetchFacilities();
  }, [hotelId]);

  return { facilities, isLoading, error };
}

export function useHouseRules(hotelId: string) {
  const [houseRules, setHouseRules] = useState<HouseRule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHouseRules() {
      if (!hotelId) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await hotelAdditionalApi.getHouseRules(hotelId);
        setHouseRules(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch house rules');
      } finally {
        setIsLoading(false);
      }
    }

    fetchHouseRules();
  }, [hotelId]);

  return { houseRules, isLoading, error };
}
