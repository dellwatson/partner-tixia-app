import React from 'react';
import { Badge } from '~/components/ui/badge';
import { CreditCard } from 'lucide-react';

export interface PaymentMethod {
  id: string;
  name: string;
  type: 'card' | 'bank' | 'ewallet' | 'installment';
  icon: string;
  fee?: number;
  description?: string;
}

interface PaymentMethodSelectorProps {
  paymentMethods: PaymentMethod[];
  selectedPayment: string;
  onPaymentChange: (paymentId: string) => void;
  children?: React.ReactNode;
}

export function PaymentMethodSelector({
  paymentMethods,
  selectedPayment,
  onPaymentChange,
  children
}: PaymentMethodSelectorProps) {
  return (
    <div className="bg-white border rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <CreditCard className="w-5 h-5 text-blue-600" />
        Payment method
      </h2>

      <div className="space-y-3">
        {paymentMethods.map((method) => (
          <div key={method.id} className="border rounded-lg p-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value={method.id}
                checked={selectedPayment === method.id}
                onChange={(e) => onPaymentChange(e.target.value)}
                className="w-4 h-4 text-blue-600"
              />
              <div className="flex items-center gap-3 flex-1">
                {method.icon === 'CreditCard' ? (
                  <CreditCard className="w-5 h-5" />
                ) : (
                  <div className={`w-5 h-5 rounded text-white text-xs flex items-center justify-center font-bold ${
                    method.icon === 'BCA' ? 'bg-blue-600' :
                    method.icon === 'Mandiri' ? 'bg-yellow-500' :
                    method.icon === 'GoPay' ? 'bg-green-500' :
                    method.icon === 'OVO' ? 'bg-purple-600' :
                    method.icon === 'Kredivo' ? 'bg-red-500' : 'bg-gray-500'
                  }`}>
                    {method.icon.charAt(0)}
                  </div>
                )}
                <div className="flex-1">
                  <div className="font-medium flex items-center gap-2">
                    {method.name}
                    {method.fee && (
                      <Badge variant="secondary" className="text-xs">
                        +IDR{method.fee.toLocaleString()}
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm text-gray-600">{method.description}</div>
                </div>
              </div>
            </label>
          </div>
        ))}
      </div>

      {children}
    </div>
  );
}
