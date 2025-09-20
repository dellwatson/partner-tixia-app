import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { TextureButton } from '~/components/ui/texture-button';

export interface PassengerData {
  adults: number;
  children: number;
  childrenAges: number[];
}

interface PassengerContentProps {
  passengers: PassengerData;
  updateAdults: (count: number) => void;
  updateChildren: (count: number) => void;
  updateChildAge: (index: number, age: number) => void;
  getDisplayText: () => string;
  onDone?: () => void; // desktop popover close
  onClose?: () => void; // mobile drawer close (injected by SearchInputWrapper)
}

export const PassengerContent: React.FC<PassengerContentProps> = ({
  passengers,
  updateAdults,
  updateChildren,
  updateChildAge,
  getDisplayText,
  onDone,
  onClose,
}) => {
  return (
    <div className="p-4 space-y-4">
      {/* Adults */}
      <div className="flex items-center justify-between">
        <div>
          <div className="font-medium text-gray-900">Adults</div>
          <div className="text-sm text-gray-500">Age 18+</div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => updateAdults(passengers.adults - 1)}
            disabled={passengers.adults <= 1}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-8 text-center font-medium">{passengers.adults}</span>
          <button
            onClick={() => updateAdults(passengers.adults + 1)}
            disabled={passengers.adults >= 9}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Children */}
      <div className="flex items-center justify-between">
        <div>
          <div className="font-medium text-gray-900">Children</div>
          <div className="text-sm text-gray-500">Age 0 - 17</div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => updateChildren(passengers.children - 1)}
            disabled={passengers.children <= 0}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-8 text-center font-medium">{passengers.children}</span>
          <button
            onClick={() => updateChildren(passengers.children + 1)}
            disabled={passengers.children >= 8}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Children Ages */}
      {passengers.children > 0 && (
        <div className="space-y-3 pt-2 border-t border-gray-200">
          {passengers.childrenAges.map((age, index) => (
            <div key={index}>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                {`${index + 1}${index === 0 ? 'st' : index === 1 ? 'nd' : index === 2 ? 'rd' : 'th'} child's age`}
              </label>
              <select
                value={age}
                onChange={(e) => updateChildAge(index, parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {Array.from({ length: 18 }, (_, i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
              <div className="text-xs text-gray-500 mt-1">
                Select the age this child will be on the date of your final flight
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Summary */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
        <span className="font-medium text-gray-900">{getDisplayText()}</span>
        <div>
          <TextureButton
            variant="accent"
            onClick={() => {
              onDone?.();
              onClose?.();
            }}
          >
            Done
          </TextureButton>
        </div>
      </div>
    </div>
  );
};
