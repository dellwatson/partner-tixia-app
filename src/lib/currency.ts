import { useCurrencyStore } from '~/stores/currency-store';
import type { CurrencyCode } from '~/stores/currency-store';

// App amounts are stored/generated mostly in IDR in our UI. Convert IDR -> selected currency and format.
export function convertFromIDR(amountIDR: number, to?: CurrencyCode): number {
  const { currency, rates } = useCurrencyStore.getState();
  const target = to || currency;
  // rates are relative to USD; 1 USD = rates[CCY]
  // First convert IDR -> USD, then USD -> target
  const usd = amountIDR / (rates.IDR || 15500);
  const result = usd * (rates[target] || 1);
  return result;
}

// Some generators (flights) produce prices as USD-like base units. Convert USD -> selected currency
export function convertFromUSD(amountUSD: number, to?: CurrencyCode): number {
  const { currency, rates } = useCurrencyStore.getState();
  const target = to || currency;
  return amountUSD * (rates[target] || 1);
}

export function formatAppPrice(amountIDR: number, to?: CurrencyCode, options?: Intl.NumberFormatOptions) {
  const { currency } = useCurrencyStore.getState();
  const cc = to || currency;
  const value = convertFromIDR(amountIDR, cc);
  return new Intl.NumberFormat(getLocaleForCurrency(cc), {
    style: 'currency',
    currency: cc,
    maximumFractionDigits: cc === 'IDR' ? 0 : 2,
    minimumFractionDigits: cc === 'IDR' ? 0 : 0,
    ...options,
  }).format(value);
}

export function formatFromUSD(amountUSD: number, to?: CurrencyCode, options?: Intl.NumberFormatOptions) {
  const { currency } = useCurrencyStore.getState();
  const cc = to || currency;
  const value = convertFromUSD(amountUSD, cc);
  return new Intl.NumberFormat(getLocaleForCurrency(cc), {
    style: 'currency',
    currency: cc,
    maximumFractionDigits: cc === 'IDR' ? 0 : 2,
    minimumFractionDigits: cc === 'IDR' ? 0 : 0,
    ...options,
  }).format(value);
}

// Format a value that is already in the selected currency (no conversion)
export function formatSelected(value: number, to?: CurrencyCode, options?: Intl.NumberFormatOptions) {
  const { currency } = useCurrencyStore.getState();
  const cc = to || currency;
  return new Intl.NumberFormat(getLocaleForCurrency(cc), {
    style: 'currency',
    currency: cc,
    maximumFractionDigits: cc === 'IDR' ? 0 : 2,
    minimumFractionDigits: cc === 'IDR' ? 0 : 0,
    ...options,
  }).format(value);
}

function getLocaleForCurrency(ccy: CurrencyCode): string {
  switch (ccy) {
    case 'IDR': return 'id-ID';
    case 'USD': return 'en-US';
    case 'EUR': return 'de-DE';
    case 'GBP': return 'en-GB';
    case 'SGD': return 'en-SG';
    case 'MYR': return 'ms-MY';
    case 'THB': return 'th-TH';
    case 'JPY': return 'ja-JP';
    case 'CNY': return 'zh-CN';
    case 'AUD': return 'en-AU';
    case 'CAD': return 'en-CA';
    case 'NZD': return 'en-NZ';
    case 'CHF': return 'de-CH';
    default: return 'en-US';
  }
}
