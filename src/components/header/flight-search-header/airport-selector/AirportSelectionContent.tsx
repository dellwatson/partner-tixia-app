import React from 'react';
import { MapPin, Loader2, AlertCircle } from 'lucide-react';
import { Tag, TagInput } from 'emblor';
import { Checkbox } from '~/components/ui/checkbox';
import type { Airport, Country } from '~/lib/services/airport-service';

interface AirportSelectionContentProps {
  title: string;
  selectedAirports: Tag[];
  otherAirports: Tag[];
  search: string;
  loading: boolean;
  results: Airport[];
  countries: Country[];
  showWarning: boolean;
  activeTagIndex: number | null;
  tagInputRef: React.RefObject<HTMLDivElement>;
  onSearchChange: (value: string) => void;
  onTagsChange: (tags: Tag[]) => void;
  onActiveTagIndexChange: (index: number | null) => void;
  onAddAirport: (airport: Airport) => void;
  onAddCountry: (country: Country) => void;
  onClose?: () => void;
}

export const AirportSelectionContent = React.forwardRef<HTMLDivElement, AirportSelectionContentProps>((
  {
    title,
    selectedAirports,
    otherAirports,
    search,
    loading,
    results,
    countries,
    showWarning,
    activeTagIndex,
    tagInputRef,
    onSearchChange,
    onTagsChange,
    onActiveTagIndexChange,
    onAddAirport,
    onAddCountry,
    onClose,
  },
  ref
) => {

  return (
    <>
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="text-sm font-medium text-gray-900 mb-3">
          {title}
        </div>
        <div ref={tagInputRef}>
          <TagInput
            tags={selectedAirports}
            setTags={onTagsChange}
            placeholder="Search airports"
            inputValue={search}
            onInputChange={onSearchChange}
            activeTagIndex={activeTagIndex}
            setActiveTagIndex={onActiveTagIndexChange}
            styleClasses={{
              inlineTagsContainer:
                "border-gray-200 rounded-lg bg-white shadow-xs transition-[color,box-shadow] focus-within:border-blue-500 outline-none focus-within:ring-[3px] focus-within:ring-blue-500/50 p-2 gap-1",
              input: "w-full min-w-[80px] shadow-none px-2 h-7 text-sm",
              tag: {
                body: "h-7 relative bg-blue-50 border border-blue-200 hover:bg-blue-100 rounded-md font-medium text-xs ps-2 pe-7 truncate max-w-[120px]",
                closeButton:
                  "absolute -inset-y-px -end-px p-0 rounded-e-md flex size-7 transition-[color,box-shadow] outline-none focus-visible:border-blue-500 focus-visible:ring-blue-500/50 focus-visible:ring-[3px] text-gray-500 hover:text-gray-700",
              },
            }}
          />
        </div>
      </div>
      
      <div className="max-h-80 overflow-y-auto">
        {loading ? (
          <div className="p-6 text-center">
            <Loader2 className="w-6 h-6 animate-spin mx-auto text-blue-500" />
            <div className="text-sm text-gray-500 mt-2">Searching airports...</div>
          </div>
        ) : results.length > 0 ? (
          <>
            {countries.map((country) => (
              <div key={country.name}>
                <div className="px-4 py-3 bg-gray-50 border-b flex items-center justify-between">
                  <label 
                    htmlFor={`country-${country.name}`}
                    className="text-sm font-semibold text-gray-900 cursor-pointer"
                  >
                    {country.name} ({country.airports.length})
                  </label>
                  <Checkbox
                    id={`country-${country.name}`}
                    checked={country.airports.every(airport => 
                      selectedAirports.some(tag => tag.id === airport.code)
                    )}
                    onCheckedChange={() => onAddCountry(country)}
                  />
                </div>
                <div className={`${country.airports.length > 3 ? 'max-h-48 overflow-y-auto' : ''}`}>
                  {country.airports.map((airport) => {
                    const isSelected = selectedAirports.some(tag => tag.id === airport.code);
                    const isInOtherList = otherAirports.some(tag => tag.id === airport.code);
                    
                    return (
                      <button
                        key={airport.code}
                        onClick={() => {
                          onAddAirport(airport);
                          if (onClose) onClose();
                        }}
                        disabled={isSelected || isInOtherList}
                        className={`w-full flex items-center justify-between p-3 hover:bg-gray-50 text-left transition-colors ${
                          isSelected ? 'bg-blue-50 cursor-default' : ''
                        } ${
                          isInOtherList ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 text-gray-400 mr-3 flex-shrink-0" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {airport.code} - {airport.city}
                            </div>
                            <div className="text-xs text-gray-500">
                              {airport.name}, {airport.country}
                            </div>
                          </div>
                        </div>
                        {isSelected && (
                          <div className="text-blue-600 text-xs font-medium">
                            Selected
                          </div>
                        )}
                        {isInOtherList && (
                          <div className="text-orange-600 text-xs font-medium">
                            Already used
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </>
        ) : search && !loading ? (
          <div className="p-6 text-center text-gray-500">
            No airports found
          </div>
        ) : (
          <div className="p-6 text-center text-gray-500">
            Start typing to search airports
          </div>
        )}
      </div>
      
      {showWarning && (
        <div className="absolute top-4 right-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 shadow-lg">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          Add an airport or city
        </div>
      )}
    </>
  );
});
