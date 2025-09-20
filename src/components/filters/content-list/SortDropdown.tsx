import { Button } from '~/components/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '~/components/ui/popover';
import { ChevronDown, ArrowUpDown, Check } from 'lucide-react';

type SortBy = 'our-top-picks' | 'homes-apartments' | 'price-low' | 'price-high' | 'best-reviewed' | 'rating-high' | 'rating-low' | 'distance' | 'top-reviewed';

interface SortDropdownProps {
  value: SortBy;
  onValueChange: (value: SortBy) => void;
}

function getSortLabel(sortBy: string): string {
  switch (sortBy) {
    case 'our-top-picks': return 'Our top picks';
    case 'homes-apartments': return 'Homes & apartments first';
    case 'price-low': return 'Price (lowest first)';
    case 'price-high': return 'Price (highest first)';
    case 'best-reviewed': return 'Best reviewed & lowest price';
    case 'rating-high': return 'Property rating (high to low)';
    case 'rating-low': return 'Property rating (low to high)';
    case 'distance': return 'Distance from downtown';
    case 'top-reviewed': return 'Top reviewed';
    default: return 'Our top picks';
  }
}

export function SortDropdown({ value, onValueChange }: SortDropdownProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="justify-start border-border/60 hover:border-border hover:bg-accent/50 transition-colors"
        >
          <ArrowUpDown className="mr-2 h-4 w-4" />
          Sort by: {getSortLabel(value)}
          <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 border-border/60 p-0">
        <SortOptionsList value={value} onValueChange={onValueChange} />
      </PopoverContent>
    </Popover>
  );
}

export function SortOptionsList({
  value,
  onValueChange,
}: {
  value: SortBy;
  onValueChange: (value: SortBy) => void;
}) {
  const options: Array<{ value: SortBy; label: string }> = [
    { value: 'our-top-picks', label: 'Our top picks' },
    { value: 'homes-apartments', label: 'Homes & apartments first' },
    { value: 'price-low', label: 'Price (lowest first)' },
    { value: 'price-high', label: 'Price (highest first)' },
    { value: 'best-reviewed', label: 'Best reviewed & lowest price' },
    { value: 'rating-high', label: 'Property rating (high to low)' },
    { value: 'rating-low', label: 'Property rating (low to high)' },
    { value: 'distance', label: 'Distance from downtown' },
    { value: 'top-reviewed', label: 'Top reviewed' },
  ];

  return (
    <div className="divide-y">
      {options.map((opt) => (
        <button
          key={opt.value}
          className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm hover:bg-accent/50 ${
            value === opt.value ? 'text-primary' : 'text-foreground'
          }`}
          onClick={() => onValueChange(opt.value)}
        >
          <span>{opt.label}</span>
          {value === opt.value ? <Check className="h-4 w-4" /> : null}
        </button>
      ))}
    </div>
  );
}
