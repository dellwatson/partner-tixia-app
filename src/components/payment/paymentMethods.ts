import { CreditCard } from 'lucide-react';
import { PaymentMethod } from './PaymentMethodSelector';

export const defaultPaymentMethods: PaymentMethod[] = [
  {
    id: 'visa',
    name: 'Credit/Debit Card',
    type: 'card',
    icon: 'CreditCard',
    description: 'Visa, Mastercard, American Express'
  },
  {
    id: 'bca',
    name: 'BCA Virtual Account',
    type: 'bank',
    icon: 'BCA',
    fee: 4000,
    description: 'Transfer via BCA mobile/internet banking'
  },
  {
    id: 'mandiri',
    name: 'Mandiri Virtual Account',
    type: 'bank',
    icon: 'Mandiri',
    fee: 4000,
    description: 'Transfer via Mandiri mobile/internet banking'
  },
  {
    id: 'gopay',
    name: 'GoPay',
    type: 'ewallet',
    icon: 'GoPay',
    description: 'Pay with your GoPay balance'
  },
  {
    id: 'ovo',
    name: 'OVO',
    type: 'ewallet',
    icon: 'OVO',
    description: 'Pay with your OVO balance'
  },
  {
    id: 'kredivo',
    name: 'Kredivo',
    type: 'installment',
    icon: 'Kredivo',
    description: 'Pay in installments (0% interest for 3 months)'
  }
];
