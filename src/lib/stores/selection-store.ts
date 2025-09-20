import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { FlightResult, RoundTripFlightResult } from '~/lib/services/flight-search-service';
import type { FlightSearchParams } from '~/lib/stores/flight-search-store';
import type { Hotel } from '~/data/mockHotels';
import type { HotelData } from '~/lib/api/hotel-api';

export type SelectionType = 'flight' | 'hotel';

export interface BaseSelection {
  id: string; // uuid
  type: SelectionType;
  createdAt: string; // ISO
}

export interface FlightSelection extends BaseSelection {
  type: 'flight';
  searchParams: FlightSearchParams | null;
  item: FlightResult | RoundTripFlightResult;
}

export interface HotelSearchParamsLite {
  location?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  rooms?: number;
}

export interface HotelSelection extends BaseSelection {
  type: 'hotel';
  searchParams: HotelSearchParamsLite | null;
  // Hotel list item snapshot
  listItem: Hotel;
  // Optional resolved detailed hotel data for the detail page
  resolved?: HotelData;
}

export type SelectionRecord = FlightSelection | HotelSelection;

interface SelectionStoreState {
  selections: Record<string, SelectionRecord>;
  history: string[]; // latest first

  // Actions
  createFlightSelection: (
    item: FlightResult | RoundTripFlightResult,
    searchParams: FlightSearchParams | null
  ) => string; // returns selectionId

  createHotelSelection: (
    listItem: Hotel,
    searchParams: HotelSearchParamsLite | null
  ) => string; // returns selectionId

  getSelection: (id: string) => SelectionRecord | undefined;
  setResolvedHotelData: (id: string, data: HotelData) => void;
  removeSelection: (id: string) => void;
  clearAll: () => void;
}

function genId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return (crypto as any).randomUUID();
  }
  // fallback simple uuid v4-ish
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const useSelectionStore = create<SelectionStoreState>()(
  persist(
    (set, get) => ({
      selections: {},
      history: [],

      createFlightSelection: (item, searchParams) => {
        const id = genId();
        const record: FlightSelection = {
          id,
          type: 'flight',
          createdAt: new Date().toISOString(),
          searchParams: searchParams || null,
          item,
        };
        set(state => ({
          selections: { ...state.selections, [id]: record },
          history: [id, ...state.history.filter(h => h !== id)].slice(0, 100),
        }));
        return id;
      },

      createHotelSelection: (listItem, searchParams) => {
        const id = genId();
        const record: HotelSelection = {
          id,
          type: 'hotel',
          createdAt: new Date().toISOString(),
          searchParams: searchParams || null,
          listItem,
          resolved: undefined,
        };
        set(state => ({
          selections: { ...state.selections, [id]: record },
          history: [id, ...state.history.filter(h => h !== id)].slice(0, 100),
        }));
        return id;
      },

      getSelection: (id) => get().selections[id],

      setResolvedHotelData: (id, data) => {
        const current = get().selections[id];
        if (!current || current.type !== 'hotel') return;
        const updated: HotelSelection = { ...current, resolved: data };
        set(state => ({
          selections: { ...state.selections, [id]: updated },
        }));
      },

      removeSelection: (id) => {
        set(state => {
          const { [id]: _, ...rest } = state.selections;
          return {
            selections: rest,
            history: state.history.filter(h => h !== id),
          };
        });
      },

      clearAll: () => set({ selections: {}, history: [] }),
    }),
    {
      name: 'tx-selection-store',
      storage: createJSONStorage(() => localStorage),
      version: 1,
      // migrate if needed in future
    }
  )
);
