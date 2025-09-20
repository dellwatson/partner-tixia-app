import React from 'react';
import { TextureButton } from '~/components/ui/texture-button';
import { Shield, Clock, CheckCircle, Loader2 } from 'lucide-react';
import { formatSelected } from '~/lib/currency';

export interface PriceItem {
  label: string;
  amount: number;
  suffix?: string;
}

interface PriceSummaryProps {
  title: string;
  items: PriceItem[];
  total: number;
  totalSuffix?: string;
  buttonText: string;
  buttonDisabled: boolean;
  isProcessing: boolean;
  onButtonClick: () => void;
  features?: string[];
  formatAmount?: (amount: number, suffix?: string) => string;
}

export function PriceSummary({
  title,
  items,
  total,
  totalSuffix = '',
  buttonText,
  buttonDisabled,
  isProcessing,
  onButtonClick,
  features = [
    'Secure payment protected by SSL',
    'Free cancellation within 24 hours',
    'Instant confirmation'
  ],
  formatAmount,
}: PriceSummaryProps) {
  const featureIcons = [Shield, Clock, CheckCircle];
  const featureColors = ['text-green-600', 'text-blue-600', 'text-green-600'];
  const formatFn = formatAmount || ((amount: number, suffix?: string) => `${formatSelected(amount)}${suffix || ''}`);

  return (
    <div className="bg-white border rounded-lg p-6 sticky top-4">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      
      <div className="space-y-3 mb-4">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between">
            <span>{item.label}</span>
            <span>{formatFn(item.amount, item.suffix)}</span>
          </div>
        ))}
      </div>

      <div className="border-t pt-4 mb-6">
        <div className="flex justify-between text-xl font-bold">
          <span>Total</span>
          <span>{formatFn(total, totalSuffix)}</span>
        </div>
        <div className="text-sm text-gray-600 mt-1">
          Includes taxes and charges
        </div>
      </div>

      <TextureButton 
        variant="primary" 
        className="w-full mb-4"
        onClick={onButtonClick}
        disabled={buttonDisabled || isProcessing}
      >
        {isProcessing ? (
          <div className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Processing...
          </div>
        ) : (
          buttonText
        )}
      </TextureButton>

      <div className="space-y-3 text-sm text-gray-600">
        {features.map((feature, index) => {
          const IconComponent = featureIcons[index] || CheckCircle;
          const iconColor = featureColors[index] || 'text-green-600';
          
          return (
            <div key={index} className="flex items-center gap-2">
              <IconComponent className={`w-4 h-4 ${iconColor}`} />
              <span>{feature}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
