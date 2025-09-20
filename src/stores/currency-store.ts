import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type CurrencyCode = 'USD' | 'IDR' | 'EUR' | 'GBP' | 'SGD' | 'AUD' | 'CAD' | 'JPY' | 'NZD' | 'MYR' | 'THB' | 'CNY' | 'CHF';

interface CurrencyState {
  currency: CurrencyCode;
  // Base rates relative to USD
  rates: Record<CurrencyCode, number>;
  setCurrency: (code: CurrencyCode) => void;
  setRates: (rates: Partial<Record<CurrencyCode, number>>) => void;
}

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set, get) => ({
      currency: 'IDR',
      rates: {
        USD: 1,
        IDR: 15500,
        EUR: 0.92,
        GBP: 0.78,
        SGD: 1.35,
        AUD: 1.50,
        CAD: 1.36,
        JPY: 157,
        NZD: 1.62,
        MYR: 4.7,
        THB: 36.5,
        CNY: 7.25,
        CHF: 0.86,
      },
      setCurrency: (code) => set({ currency: code }),
      setRates: (partial) => set({ rates: { ...get().rates, ...partial } }),
    }),
    {
      name: 'tx-currency-store',
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
);
