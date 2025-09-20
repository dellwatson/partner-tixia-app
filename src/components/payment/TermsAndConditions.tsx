import React from 'react';
import { Checkbox } from '~/components/ui/checkbox';
import { Label } from '~/components/ui/label';
import { Shield } from 'lucide-react';

interface TermsAndConditionsProps {
  agreeTerms: boolean;
  agreeMarketing: boolean;
  onAgreeTermsChange: (checked: boolean) => void;
  onAgreeMarketingChange: (checked: boolean) => void;
}

export function TermsAndConditions({
  agreeTerms,
  agreeMarketing,
  onAgreeTermsChange,
  onAgreeMarketingChange
}: TermsAndConditionsProps) {
  return (
    <div className="bg-white border rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Shield className="w-5 h-5 text-blue-600" />
        Terms and conditions
      </h2>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <Checkbox
            id="terms"
            checked={agreeTerms}
            onCheckedChange={onAgreeTermsChange}
            className="mt-1"
          />
          <Label htmlFor="terms" className="text-sm leading-relaxed">
            I agree to the{' '}
            <a href="#" className="text-blue-600 hover:underline">terms and conditions</a>,{' '}
            <a href="#" className="text-blue-600 hover:underline">privacy policy</a>, and{' '}
            <a href="#" className="text-blue-600 hover:underline">fare rules</a>. I understand that changes or cancellations may incur fees.
          </Label>
        </div>

        <div className="flex items-start gap-3">
          <Checkbox
            id="marketing"
            checked={agreeMarketing}
            onCheckedChange={onAgreeMarketingChange}
            className="mt-1"
          />
          <Label htmlFor="marketing" className="text-sm leading-relaxed">
            I would like to receive promotional emails and special offers from Tixia (optional)
          </Label>
        </div>
      </div>
    </div>
  );
}
