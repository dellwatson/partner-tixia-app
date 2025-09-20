import { Checkbox } from '~/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';
import { Label } from '~/components/ui/label';
import { Slider } from '~/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { Wifi, Car, Coffee, Dumbbell, Waves, Utensils, Wine, Bell, Flower } from 'lucide-react';
import { FilterOption, FilterSection } from '~/data/hotelFilters';
import ReviewStarList from '~/components/ui/review-star-list';
import SliderPrice from '~/components/ui/slider-price';

interface FilterContentProps {
  filter: FilterSection;
  selectedValues: any;
  onValueChange: (filterId: string, value: any) => void;
}

const iconMap = {
  wifi: Wifi,
  car: Car,
  coffee: Coffee,
  dumbbell: Dumbbell,
  waves: Waves,
  utensils: Utensils,
  wine: Wine,
  bell: Bell,
  flower: Flower,
};

export function FilterContent({ filter, selectedValues, onValueChange }: FilterContentProps) {
  const handleCheckboxChange = (optionId: string, checked: boolean) => {
    const currentValues = selectedValues || [];
    let newValues;
    
    if (checked) {
      newValues = [...currentValues, optionId];
    } else {
      newValues = currentValues.filter((id: string) => id !== optionId);
    }
    
    onValueChange(filter.id, newValues);
  };

  const handleRadioChange = (value: string) => {
    onValueChange(filter.id, value);
  };

  const handleRangeChange = (value: number[]) => {
    onValueChange(filter.id, value);
  };

  const handleSelectChange = (value: string) => {
    onValueChange(filter.id, value);
  };

  // Special handling for specific filters
  if (filter.id === 'guest_rating') {
    return <ReviewStarList />;
  }
  
  if (filter.id === 'price_range') {
    return <SliderPrice />;
  }

  switch (filter.type) {
    case 'checkbox':
      return (
        <div className="space-y-3">
          {filter.options?.map((option) => {
            const IconComponent = option.icon ? iconMap[option.icon as keyof typeof iconMap] : null;
            const isChecked = selectedValues?.includes(option.id) || false;
            
            return (
              <div key={option.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id={option.id}
                    checked={isChecked}
                    onCheckedChange={(checked) => handleCheckboxChange(option.id, !!checked)}
                  />
                  <Label 
                    htmlFor={option.id} 
                    className="text-sm font-light flex items-center gap-2 cursor-pointer"
                  >
                    {IconComponent && <IconComponent className="w-4 h-4 text-gray-500" />}
                    {option.label}
                  </Label>
                </div>
                {option.count && (
                  <span className="text-xs text-gray-500 ml-2">{option.count}</span>
                )}
              </div>
            );
          })}
        </div>
      );

    case 'radio':
      return (
        <RadioGroup 
          value={selectedValues || filter.defaultValue} 
          onValueChange={handleRadioChange}
        >
          <div className="space-y-3">
            {filter.options?.map((option) => (
              <div key={option.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value={option.id} id={option.id} />
                  <Label htmlFor={option.id} className="text-sm font-light cursor-pointer">
                    {option.label}
                  </Label>
                </div>
                {option.count && (
                  <span className="text-xs text-gray-500 ml-2">{option.count}</span>
                )}
              </div>
            ))}
          </div>
        </RadioGroup>
      );

    case 'range':
      const rangeValue = selectedValues || filter.defaultValue || [filter.min, filter.max];
      
      // Format values based on filter type
      const formatRangeValue = (value: number) => {
        switch (filter.id) {
          case 'price':
          case 'price_range':
            return `$${value}`;
          case 'duration':
          case 'flight_duration':
            return `${value}h`;
          case 'transit_duration':
            return `${value}h`;
          case 'guest_rating':
            return `${value}★`;
          default:
            return `${value}`;
        }
      };
      
      return (
        <div className="space-y-4">
          <Slider
            value={rangeValue}
            onValueChange={handleRangeChange}
            max={filter.max}
            min={filter.min}
            step={filter.step}
            className="mb-2"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>{formatRangeValue(rangeValue[0])}</span>
            <span>{formatRangeValue(rangeValue[1])}</span>
          </div>
        </div>
      );

    case 'select':
      return (
        <Select 
          value={selectedValues || filter.defaultValue} 
          onValueChange={handleSelectChange}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {filter.options?.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                <div className="flex items-center justify-between w-full">
                  <span>{option.label}</span>
                  {option.count && (
                    <span className="text-xs text-gray-500 ml-2">({option.count})</span>
                  )}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );

    default:
      return <div>Unsupported filter type</div>;
  }
}
