import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ViewMode = 'list' | 'grid';

interface UIStore {
  // Hotel search preferences
  hotelViewMode: ViewMode;
  setHotelViewMode: (mode: ViewMode) => void;
  
  // Flight search preferences (for future use)
  flightViewMode: ViewMode;
  setFlightViewMode: (mode: ViewMode) => void;
}

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      // Hotel defaults
      hotelViewMode: 'list',
      setHotelViewMode: (mode) => set({ hotelViewMode: mode }),
      
      // Flight defaults
      flightViewMode: 'list',
      setFlightViewMode: (mode) => set({ flightViewMode: mode }),
    }),
    {
      name: 'ui-preferences',
    }
  )
);
