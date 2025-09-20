import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { convertFromUSD, convertFromIDR } from '~/lib/currency';
import type { FlightSelection } from '~/lib/stores/selection-store';

export type TicketType = 'standard' | 'flexible';

export interface PaxInfo {
  title: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  email?: string;
  phone?: string;
}

export interface FlightCheckoutDraft {
  id: string; // flightId (selection id)
  ticketType: TicketType;
  pax?: PaxInfo;
  extras: Record<string, number>; // extraId -> qty (prices assumed IDR)
  seat?: {
    id: string;
    priceIDR: number; // add-on price in IDR
  };
  payment?: {
    methodId?: string;
    feeIDR?: number;
  };
  pricing: {
    baseUSD: number; // base fare kept in USD-like units (from generator)
    extrasIDR: number; // derived sum cache (convenience)
  };
}

interface FlightCheckoutStore {
  drafts: Record<string, FlightCheckoutDraft>;

  // Actions
  initDraft: (selectionId: string, baseUSD: number) => void;
  setTicketType: (flightId: string, ticketType: TicketType) => void;
  setPax: (flightId: string, pax: PaxInfo) => void;
  setExtraQuantity: (flightId: string, extraId: string, qty: number, pricePerUnitIDR?: number) => void;
  setSeat: (flightId: string, seatId: string | null, priceIDR?: number) => void;
  setPaymentMethod: (flightId: string, methodId: string, feeIDR?: number) => void;
  setExtrasTotalIDR: (flightId: string, totalIDR: number) => void;

  // Getters
  getDraft: (flightId: string) => FlightCheckoutDraft | undefined;
  getSelectedBreakdown: (flightId: string) => {
    baseSelected: number;
    extrasSelected: number;
    seatSelected: number;
    paymentFeeSelected: number;
    totalSelected: number;
  };
}

export const useFlightCheckoutStore = create<FlightCheckoutStore>()(
  persist(
    (set, get) => ({
      drafts: {},

      initDraft: (selectionId, baseUSD) => {
        const current = get().drafts[selectionId];
        if (current) return; // keep existing
        const draft: FlightCheckoutDraft = {
          id: selectionId,
          ticketType: 'standard',
          pax: undefined,
          extras: {},
          seat: undefined,
          payment: undefined,
          pricing: {
            baseUSD,
            extrasIDR: 0,
          },
        };
        set((s) => ({ drafts: { ...s.drafts, [selectionId]: draft } }));
      },

      setTicketType: (flightId, ticketType) => {
        const draft = get().drafts[flightId];
        if (!draft) return;
        set((s) => ({ drafts: { ...s.drafts, [flightId]: { ...draft, ticketType } } }));
      },

      setPax: (flightId, pax) => {
        const draft = get().drafts[flightId];
        if (!draft) return;
        set((s) => ({ drafts: { ...s.drafts, [flightId]: { ...draft, pax } } }));
      },

      setExtraQuantity: (flightId, extraId, qty, pricePerUnitIDR) => {
        const draft = get().drafts[flightId];
        if (!draft) return;
        const nextExtras = { ...draft.extras };
        if (qty <= 0) {
          delete nextExtras[extraId];
        } else {
          nextExtras[extraId] = qty;
        }
        // update cached extrasIDR if we know unit price
        let extrasIDR = draft.pricing.extrasIDR;
        if (typeof pricePerUnitIDR === 'number') {
          // Recompute simplistic cache if price provided
          // Note: For robust accuracy, callers should recompute sum externally.
          extrasIDR = 0;
          Object.entries(nextExtras).forEach(([id, q]) => {
            // assume same price for all extras when not provided; fallback 0
            if (id === extraId) {
              extrasIDR += (pricePerUnitIDR || 0) * q;
            }
          });
        }
        const updated: FlightCheckoutDraft = { ...draft, extras: nextExtras, pricing: { ...draft.pricing, extrasIDR } };
        set((s) => ({ drafts: { ...s.drafts, [flightId]: updated } }));
      },

      setSeat: (flightId, seatId, priceIDR) => {
        const draft = get().drafts[flightId];
        if (!draft) return;
        const seat = seatId ? { id: seatId, priceIDR: priceIDR || 0 } : undefined;
        set((s) => ({ drafts: { ...s.drafts, [flightId]: { ...draft, seat } } }));
      },

      setPaymentMethod: (flightId, methodId, feeIDR) => {
        const draft = get().drafts[flightId];
        if (!draft) return;
        set((s) => ({ drafts: { ...s.drafts, [flightId]: { ...draft, payment: { methodId, feeIDR } } } }));
      },

      setExtrasTotalIDR: (flightId, totalIDR) => {
        const draft = get().drafts[flightId];
        if (!draft) return;
        set((s) => ({ drafts: { ...s.drafts, [flightId]: { ...draft, pricing: { ...draft.pricing, extrasIDR: totalIDR } } } }));
      },

      getDraft: (flightId) => get().drafts[flightId],

      getSelectedBreakdown: (flightId) => {
        const draft = get().drafts[flightId];
        if (!draft) {
          return { baseSelected: 0, extrasSelected: 0, seatSelected: 0, paymentFeeSelected: 0, totalSelected: 0 };
        }
        const baseUSD = draft.pricing.baseUSD * (draft.ticketType === 'flexible' ? 1.13 : 1);
        const baseSelected = convertFromUSD(baseUSD);
        const extrasSelected = convertFromIDR(draft.pricing.extrasIDR || 0);
        const seatSelected = convertFromIDR(draft.seat?.priceIDR || 0);
        const paymentFeeSelected = convertFromIDR(draft.payment?.feeIDR || 0);
        const totalSelected = baseSelected + extrasSelected + seatSelected + paymentFeeSelected;
        return { baseSelected, extrasSelected, seatSelected, paymentFeeSelected, totalSelected };
      },
    }),
    {
      name: 'tx-flight-checkout-store',
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
);
