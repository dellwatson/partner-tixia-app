import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { useCurrencyStore } from './currency-store';

export interface HotelGuestInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  dateOfBirth?: string;
  nationality?: string;
}

export interface HotelReservationDetails {
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms: number;
  specialRequests?: string;
  arrivalTime?: string;
  isMainGuest?: boolean;
  isWorkTravel?: boolean;
  paperlessConfirmation?: boolean;
}

export interface HotelCheckoutDraft {
  // Hotel and room selection
  hotelId: string;
  roomId?: string;
  roomType?: string;
  
  // Guest information
  guest?: HotelGuestInfo;
  
  // Reservation details
  reservation?: HotelReservationDetails;
  
  // Pricing (in IDR as base currency)
  baseRoomRateIDR: number;
  taxesIDR: number;
  feesIDR: number;
  totalIDR: number;
  
  // Payment
  paymentMethod?: string;
  paymentFeeIDR: number;
  
  // Status tracking
  status: 'draft' | 'form_completed' | 'waiting_payment' | 'payment_success';
  createdAt: string;
  updatedAt: string;
}

export interface HotelPriceBreakdown {
  baseRoomRate: number;
  taxes: number;
  fees: number;
  paymentFee: number;
  total: number;
  currency: string;
  
  // IDR source values for conversion
  baseRoomRateIDR: number;
  taxesIDR: number;
  feesIDR: number;
  paymentFeeIDR: number;
  totalIDR: number;
}

interface HotelCheckoutState {
  drafts: Record<string, HotelCheckoutDraft>;
  
  // Draft management
  initDraft: (hotelId: string, baseRoomRateIDR: number) => void;
  getDraft: (hotelId: string) => HotelCheckoutDraft | null;
  setDraft: (bookingId: string, draftData: any) => void;
  updateDraft: (hotelId: string, updates: Partial<HotelCheckoutDraft>) => void;
  
  // Guest information
  setGuestInfo: (hotelId: string, guest: HotelGuestInfo) => void;
  
  // Reservation details
  setReservationDetails: (hotelId: string, reservation: HotelReservationDetails) => void;
  
  // Room selection
  setRoomSelection: (hotelId: string, roomId: string, roomType: string) => void;
  
  // Pricing
  setRoomRateIDR: (hotelId: string, baseRoomRateIDR: number) => void;
  setTaxesFeesIDR: (hotelId: string, taxesIDR: number, feesIDR: number) => void;
  setPaymentFeeIDR: (hotelId: string, paymentFeeIDR: number) => void;
  
  // Payment
  setPaymentMethod: (hotelId: string, method: string) => void;
  
  // Status updates
  setStatus: (hotelId: string, status: HotelCheckoutDraft['status']) => void;
  
  // Price breakdown with currency conversion
  getPriceBreakdown: (hotelId: string) => HotelPriceBreakdown | null;
  
  // Cleanup
  clearDraft: (hotelId: string) => void;
  clearAllDrafts: () => void;
}

export const useHotelCheckoutStore = create<HotelCheckoutState>()(
  persist(
    (set, get) => ({
      drafts: {},
      
      initDraft: (hotelId, baseRoomRateIDR) => {
        const now = new Date().toISOString();
        set((state) => ({
          drafts: {
            ...state.drafts,
            [hotelId]: {
              hotelId,
              baseRoomRateIDR,
              taxesIDR: Math.round(baseRoomRateIDR * 0.11), // 11% tax
              feesIDR: 50000, // Service fee
              totalIDR: Math.round(baseRoomRateIDR * 1.11) + 50000,
              paymentFeeIDR: 0,
              status: 'draft',
              createdAt: now,
              updatedAt: now,
            },
          },
        }));
      },
      
      getDraft: (hotelId) => {
        return get().drafts[hotelId] || null;
      },
      
      setDraft: (bookingId, draftData) => {
        const now = new Date().toISOString();
        const basePrice = draftData.price || 1000000; // Default price in IDR
        
        set((state) => ({
          drafts: {
            ...state.drafts,
            [bookingId]: {
              hotelId: draftData.hotelId,
              roomId: draftData.roomId,
              roomType: draftData.roomType,
              baseRoomRateIDR: basePrice,
              taxesIDR: Math.round(basePrice * 0.11), // 11% tax
              feesIDR: 50000, // Service fee
              totalIDR: Math.round(basePrice * 1.11) + 50000,
              paymentFeeIDR: 0,
              status: 'draft',
              createdAt: now,
              updatedAt: now,
              reservation: {
                checkIn: draftData.checkIn,
                checkOut: draftData.checkOut,
                guests: draftData.guests,
                rooms: 1,
              },
            },
          },
        }));
      },
      
      updateDraft: (hotelId, updates) => {
        set((state) => {
          const existing = state.drafts[hotelId];
          if (!existing) return state;
          
          return {
            drafts: {
              ...state.drafts,
              [hotelId]: {
                ...existing,
                ...updates,
                updatedAt: new Date().toISOString(),
              },
            },
          };
        });
      },
      
      setGuestInfo: (hotelId, guest) => {
        get().updateDraft(hotelId, { guest });
      },
      
      setReservationDetails: (hotelId, reservation) => {
        get().updateDraft(hotelId, { reservation });
      },
      
      setRoomSelection: (hotelId, roomId, roomType) => {
        get().updateDraft(hotelId, { roomId, roomType });
      },
      
      setRoomRateIDR: (hotelId, baseRoomRateIDR) => {
        const draft = get().getDraft(hotelId);
        if (!draft) return;
        
        const taxesIDR = Math.round(baseRoomRateIDR * 0.11);
        const feesIDR = draft.feesIDR || 50000;
        const totalIDR = baseRoomRateIDR + taxesIDR + feesIDR + draft.paymentFeeIDR;
        
        get().updateDraft(hotelId, {
          baseRoomRateIDR,
          taxesIDR,
          totalIDR,
        });
      },
      
      setTaxesFeesIDR: (hotelId, taxesIDR, feesIDR) => {
        const draft = get().getDraft(hotelId);
        if (!draft) return;
        
        const totalIDR = draft.baseRoomRateIDR + taxesIDR + feesIDR + draft.paymentFeeIDR;
        
        get().updateDraft(hotelId, {
          taxesIDR,
          feesIDR,
          totalIDR,
        });
      },
      
      setPaymentFeeIDR: (hotelId, paymentFeeIDR) => {
        const draft = get().getDraft(hotelId);
        if (!draft) return;
        
        const totalIDR = draft.baseRoomRateIDR + draft.taxesIDR + draft.feesIDR + paymentFeeIDR;
        
        get().updateDraft(hotelId, {
          paymentFeeIDR,
          totalIDR,
        });
      },
      
      setPaymentMethod: (hotelId, method) => {
        get().updateDraft(hotelId, { paymentMethod: method });
      },
      
      setStatus: (hotelId, status) => {
        get().updateDraft(hotelId, { status });
      },
      
      getPriceBreakdown: (hotelId) => {
        const draft = get().getDraft(hotelId);
        if (!draft) return null;
        
        try {
          // Get current currency and rates with fallbacks
          const currencyState = useCurrencyStore.getState();
          const currency = currencyState?.currency || 'IDR';
          const rates = currencyState?.rates || { IDR: 15500, USD: 1 };
          const rate = rates[currency] || 1;
          
          // Convert from IDR to selected currency with safe fallbacks
          const convertFromIDR = (idrAmount: number) => {
            if (!idrAmount || typeof idrAmount !== 'number') return 0;
            const idrRate = rates.IDR || 15500;
            const usdAmount = idrAmount / idrRate;
            return usdAmount * rate;
          };
          
          return {
            baseRoomRate: convertFromIDR(draft.baseRoomRateIDR || 0),
            taxes: convertFromIDR(draft.taxesIDR || 0),
            fees: convertFromIDR(draft.feesIDR || 0),
            paymentFee: convertFromIDR(draft.paymentFeeIDR || 0),
            total: convertFromIDR(draft.totalIDR || 0),
            currency,
            
            // Keep IDR source values
            baseRoomRateIDR: draft.baseRoomRateIDR || 0,
            taxesIDR: draft.taxesIDR || 0,
            feesIDR: draft.feesIDR || 0,
            paymentFeeIDR: draft.paymentFeeIDR || 0,
            totalIDR: draft.totalIDR || 0,
          };
        } catch (error) {
          console.error('Error getting price breakdown:', error);
          // Return fallback breakdown with IDR values
          return {
            baseRoomRate: draft.baseRoomRateIDR || 0,
            taxes: draft.taxesIDR || 0,
            fees: draft.feesIDR || 0,
            paymentFee: draft.paymentFeeIDR || 0,
            total: draft.totalIDR || 0,
            currency: 'IDR',
            
            baseRoomRateIDR: draft.baseRoomRateIDR || 0,
            taxesIDR: draft.taxesIDR || 0,
            feesIDR: draft.feesIDR || 0,
            paymentFeeIDR: draft.paymentFeeIDR || 0,
            totalIDR: draft.totalIDR || 0,
          };
        }
      },
      
      clearDraft: (hotelId) => {
        set((state) => {
          const { [hotelId]: removed, ...remaining } = state.drafts;
          return { drafts: remaining };
        });
      },
      
      clearAllDrafts: () => {
        set({ drafts: {} });
      },
    }),
    {
      name: 'hotel-checkout-storage',
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
);
