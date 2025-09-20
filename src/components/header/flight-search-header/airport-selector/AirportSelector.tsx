import React, { useState, useRef, useEffect, useCallback } from 'react';
import { LucideIcon } from 'lucide-react';
import { Tag } from 'emblor';
import { airportService, type Airport, type Country } from '~/lib/services/airport-service';
import { SearchInputWrapper } from '~/components/ui/search-input-wrapper';
import { AirportSelectionContent } from './AirportSelectionContent';

interface AirportSelectorProps {
  icon: LucideIcon;
  title: string;
  placeholder: string;
  selectedAirports: Tag[];
  otherAirports?: Tag[]; // For validation to prevent same airport selection
  onChange: (airports: Tag[]) => void;
  routeSuggestions?: boolean; // Whether to show route suggestions based on other selection
}

export const AirportSelector = ({ 
  icon: Icon, 
  title, 
  placeholder, 
  selectedAirports, 
  otherAirports = [], 
  onChange,
  routeSuggestions = false
}: AirportSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Airport[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [showWarning, setShowWarning] = useState(false);
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);
  
  const tagInputRef = useRef<HTMLDivElement>(null);

  // Airport search with optional route suggestions
  const fetchAirports = useCallback(async (query: string): Promise<{ 
    airports: Airport[], 
    countries: Country[],
    suggestedDestinations?: Airport[]
  }> => {
    try {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      if (routeSuggestions && otherAirports.length > 0) {
        // Get route suggestions based on selected origin
        const selectedOrigin = otherAirports[0].text;
        const result = airportService.searchWithRouteSuggestions(query, selectedOrigin);
        return result;
      } else {
        // Regular airport search
        const result = airportService.searchAirports(query);
        return result;
      }
    } catch (error) {
      console.error('Airport search error:', error);
      return { airports: [], countries: [] };
    } finally {
      setLoading(false);
    }
  }, [routeSuggestions, otherAirports]);

  // Handle search with debouncing
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (search.trim()) {
        const result = await fetchAirports(search);
        setResults(result.airports);
        setCountries(result.countries);
        
        // Show route suggestions if available
        if (result.suggestedDestinations && result.suggestedDestinations.length > 0) {
          // Prioritize suggested destinations in results
          const suggested = result.suggestedDestinations.slice(0, 5);
          const others = result.airports.filter(airport => 
            !suggested.some(s => s.code === airport.code)
          );
          setResults([...suggested, ...others]);
        }
        
        setShowWarning(result.airports.length === 0 && isOpen);
      } else {
        setResults([]);
        setCountries([]);
        setShowWarning(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [search, isOpen, fetchAirports]);

  const addAirport = (airport: Airport) => {
    console.log('AirportSelector: addAirport called for', airport.code);
    const isInOtherList = otherAirports.some(tag => tag.id === airport.code);
    if (isInOtherList) return;

    const newTag: Tag = {
      id: airport.code,
      text: `${airport.code} ${airport.city}`
    };
    
    if (!selectedAirports.some(tag => tag.id === airport.code)) {
      console.log('AirportSelector: adding airport and closing dropdown');
      onChange([...selectedAirports, newTag]);
    }
    setIsOpen(false);
  };

  const addCountry = (country: Country) => {
    console.log('AirportSelector: addCountry called for', country.name);
    const isInOtherList = otherAirports.some(tag => tag.id === country.code);
    if (isInOtherList) return;

    const newTag: Tag = {
      id: country.code,
      text: country.name
    };
    
    if (!selectedAirports.some(tag => tag.id === country.code)) {
      console.log('AirportSelector: adding country and closing dropdown');
      onChange([...selectedAirports, newTag]);
    }
    setIsOpen(false);
  };



  // Auto-focus when dropdown opens
  useEffect(() => {
    console.log('AirportSelector: isOpen changed to', isOpen);
    if (isOpen && tagInputRef.current) {
      console.log('AirportSelector: tagInputRef found, looking for input');
      const input = tagInputRef.current.querySelector('input');
      console.log('AirportSelector: input element found:', !!input);
      if (input) {
        setTimeout(() => {
          console.log('AirportSelector: attempting to focus input');
          input.focus();
          console.log('AirportSelector: input focused, activeElement:', document.activeElement === input);
        }, 100);
      }
    }
  }, [isOpen]);

  // Clear search when dropdown closes
  useEffect(() => {
    if (!isOpen) {
      setSearch('');
      setResults([]);
      setCountries([]);
      setActiveTagIndex(null);
    }
  }, [isOpen]);

  // Only propagate tag changes when actual tags differ (avoid re-closing popover on keystrokes)
  const handleTagsChange = useCallback((newTags: Tag[]) => {
    if (!Array.isArray(newTags)) return;
    const tagsChanged =
      newTags.length !== selectedAirports.length ||
      newTags.some((tag, index) => tag.id !== selectedAirports[index]?.id);
    if (tagsChanged) {
      onChange(newTags);
    }
  }, [selectedAirports, onChange]);

  // Display selected airports or placeholder
  const displayText = selectedAirports.length > 0 
    ? selectedAirports.map(tag => tag.text).join(', ')
    : placeholder;

  const hasSelection = selectedAirports.length > 0;

  return (
    <div className="relative flex-1">
      <SearchInputWrapper
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        title={title}
        content={
          <AirportSelectionContent
            title={title}
            selectedAirports={selectedAirports}
            otherAirports={otherAirports}
            search={search}
            loading={loading}
            results={results}
            countries={countries}
            showWarning={showWarning}
            activeTagIndex={activeTagIndex}
            tagInputRef={tagInputRef}
            onSearchChange={setSearch}
            onTagsChange={handleTagsChange}
            onActiveTagIndexChange={setActiveTagIndex}
            onAddAirport={addAirport}
            onAddCountry={addCountry}
          />
        }
        centered={true}
        popoverClassName="w-[400px]"
      >
        <button className="w-full flex items-center gap-3 px-4 md:px-6 py-3 md:py-4 bg-white text-left focus:outline-none h-[48px] md:h-[56px] cursor-pointer border-b md:border-b-0 border-gray-200">
          <Icon className="w-5 h-5 text-gray-600 flex-shrink-0" />
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <div className="text-sm text-gray-600 mb-1">
              {placeholder}
            </div>
            <div className={`text-base font-medium truncate ${
              hasSelection ? 'text-gray-900' : 'text-gray-400'
            }`}>
              {displayText}
            </div>
          </div>
        </button>
      </SearchInputWrapper>
    </div>
  );
};
