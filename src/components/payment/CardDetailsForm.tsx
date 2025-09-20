import React from 'react';
import { Label } from '~/components/ui/label';
import { Input } from '~/components/ui/input';

export interface CardDetails {
  number: string;
  expiry: string;
  cvv: string;
  name: string;
}

interface CardDetailsFormProps {
  cardDetails: CardDetails;
  onCardDetailsChange: (details: CardDetails) => void;
  show: boolean;
}

export function CardDetailsForm({ cardDetails, onCardDetailsChange, show }: CardDetailsFormProps) {
  if (!show) return null;

  const handleChange = (field: keyof CardDetails) => (e: React.ChangeEvent<HTMLInputElement>) => {
    onCardDetailsChange({
      ...cardDetails,
      [field]: e.target.value
    });
  };

  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
      <h3 className="font-medium mb-4">Card details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <Label htmlFor="cardNumber">Card number</Label>
          <Input
            id="cardNumber"
            placeholder="1234 5678 9012 3456"
            value={cardDetails.number}
            onChange={handleChange('number')}
          />
        </div>
        <div>
          <Label htmlFor="expiry">Expiry date</Label>
          <Input
            id="expiry"
            placeholder="MM/YY"
            value={cardDetails.expiry}
            onChange={handleChange('expiry')}
          />
        </div>
        <div>
          <Label htmlFor="cvv">CVV</Label>
          <Input
            id="cvv"
            placeholder="123"
            value={cardDetails.cvv}
            onChange={handleChange('cvv')}
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="cardName">Name on card</Label>
          <Input
            id="cardName"
            placeholder="John Doe"
            value={cardDetails.name}
            onChange={handleChange('name')}
          />
        </div>
      </div>
    </div>
  );
}
