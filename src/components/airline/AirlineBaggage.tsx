import React from 'react';
import { cn } from '~/lib/utils';
import { Popover, PopoverTrigger, PopoverContent } from '~/components/ui/popover';

export function IconPersonal({ className }: { className?: string }) {
  return (
    <svg className={cn('h-6 w-6', className)} fill="currentColor" viewBox="0 0 24 24">
      <path d="M9 4V2C9 1.45 9.45 1 10 1H14C14.55 1 15 1.45 15 2V4H17C18.1 4 19 4.9 19 6V20C19 21.1 18.1 22 17 22H7C5.9 22 5 21.1 5 20V6C5 4.9 5.9 4 7 4H9ZM11 3V4H13V3H11ZM7 6V20H17V6H15V8H9V6H7ZM10 10H14V12H10V10ZM10 14H14V16H10V14Z" />
      <path d="M8 7H16V9H8V7Z" />
    </svg>
  );
}

export function IconCarryOn({ className }: { className?: string }) {
  return (
    <svg className={cn('h-6 w-6', className)} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20 6H16V4C16 2.9 15.1 2 14 2H10C8.9 2 8 2.9 8 4V6H4C2.9 6 2 6.9 2 8V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V8C22 6.9 21.1 6 20 6ZM10 4H14V6H10V4ZM20 19H4V8H20V19Z" />
      <path d="M6 10H18V12H6V10Z" />
      <path d="M6 14H18V16H6V14Z" />
    </svg>
  );
}

export function IconChecked({ className }: { className?: string }) {
  return (
    <svg className={cn('h-6 w-6', className)} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17 6H15V4C15 2.9 14.1 2 13 2H11C9.9 2 9 2.9 9 4V6H7C5.9 6 5 6.9 5 8V19C5 20.1 5.9 21 7 21H17C18.1 21 19 20.1 19 19V8C19 6.9 18.1 6 17 6ZM11 4H13V6H11V4ZM17 19H7V8H17V19Z" />
      <circle cx="8.5" cy="20.5" r="1.5" />
      <circle cx="15.5" cy="20.5" r="1.5" />
      <path d="M12 7V8H12V7Z" />
      <rect x="8" y="10" width="8" height="1" />
      <rect x="8" y="12" width="8" height="1" />
      <rect x="8" y="14" width="8" height="1" />
      <path d="M12 6C12.55 6 13 5.55 13 5S12.55 4 12 4S11 4.45 11 5S11.45 6 12 6Z" />
    </svg>
  );
}

function CheckDot({ className }: { className?: string }) {
  return (
    <div className={cn('absolute -right-1 -bottom-1 flex h-3 w-3 items-center justify-center rounded-full bg-green-500', className)}>
      <svg className="h-2 w-2 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    </div>
  );
}

export type AirlineBaggageIconsProps = {
  className?: string;
  size?: 'sm' | 'md';
  showInfo?: boolean;
};

export function AirlineBaggageIcons({ className, size = 'md', showInfo = true }: AirlineBaggageIconsProps) {
  const iconSize = size === 'sm' ? 'h-5 w-5' : 'h-6 w-6';

  const Icons = (
    <>
      <div className="relative">
        <IconPersonal className={cn(iconSize, 'text-gray-600')} />
        <CheckDot />
      </div>
      <div className="relative">
        <IconCarryOn className={cn(iconSize, 'text-gray-600')} />
        <CheckDot />
      </div>
      <div className="relative">
        <IconChecked className={cn(iconSize, 'text-gray-600')} />
        <CheckDot />
      </div>
    </>
  );

  const InfoButton = (
    <button className="text-gray-400 transition-colors hover:text-gray-600" aria-label="Included baggage details">
      <svg className={cn(size === 'sm' ? 'h-4 w-4' : 'h-4 w-4')} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
      </svg>
    </button>
  );

  return (
    <div className={cn('relative flex items-center gap-3', className)}>
      {Icons}
      {showInfo && (
        <Popover>
          <PopoverTrigger asChild>{InfoButton}</PopoverTrigger>
          <PopoverContent align="end" className="z-10 w-64 rounded-lg p-4">
            <h4 className="mb-3 font-semibold text-gray-900">Included baggage</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <IconPersonal className="h-5 w-5 text-gray-600" />
                  <CheckDot className="-right-0.5 -bottom-0.5 h-2.5 w-2.5" />
                </div>
                <span className="text-sm text-gray-700">Personal item</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <IconCarryOn className="h-5 w-5 text-gray-600" />
                  <CheckDot className="-right-0.5 -bottom-0.5 h-2.5 w-2.5" />
                </div>
                <span className="text-sm text-gray-700">Carry-on bag</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <IconChecked className="h-5 w-5 text-gray-600" />
                  <CheckDot className="-right-0.5 -bottom-0.5 h-2.5 w-2.5" />
                </div>
                <span className="text-sm text-gray-700">Checked bag</span>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}

export type AirlineBaggageListItem = 'personal' | 'carry' | 'checked';

export function AirlineBaggageList({
  items = ['personal', 'carry', 'checked'],
}: {
  items?: AirlineBaggageListItem[];
}) {
  const renderIcon = (type: AirlineBaggageListItem) => {
    switch (type) {
      case 'personal':
        return <IconPersonal className="h-5 w-5 text-gray-600" />;
      case 'carry':
        return <IconCarryOn className="h-5 w-5 text-gray-600" />;
      case 'checked':
        return <IconChecked className="h-5 w-5 text-gray-600" />;
    }
  };

  const getLabel = (type: AirlineBaggageListItem) => {
    switch (type) {
      case 'personal':
        return 'Personal item';
      case 'carry':
        return '1 cabin bag';
      case 'checked':
        return 'Checked bag';
    }
  };

  return (
    <div className="space-y-3">
      {items.map((type) => (
        <div key={type} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {renderIcon(type)}
            <div>
              <div className="font-medium">{getLabel(type)}</div>
              {type === 'carry' ? (
                <div className="text-sm text-gray-600">23 x 38 x 54 cm • Max weight 10 kg</div>
              ) : type === 'personal' ? (
                <div className="text-sm text-gray-600">Fits under the seat in front of you</div>
              ) : null}
            </div>
          </div>
          <span className="font-medium text-green-600">Included</span>
        </div>
      ))}
    </div>
  );
}
