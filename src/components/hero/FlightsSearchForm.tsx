import { MapPin, Calendar, Users, ArrowLeftRight } from 'lucide-react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { Input } from '~/components/ui/input';

export const FlightsSearchForm = () => {
  const navigate = useNavigate();
  const searchParams = useSearch({ strict: false }) || {};

  const updateURL = (field: string, value: string) => {
    const newSearch = { ...searchParams };
    if (value) {
      newSearch[field] = value;
    } else {
      delete newSearch[field];
    }
    // Ensure mode is set to flights
    newSearch.mode = 'flights';
    navigate({ search: newSearch, replace: true });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="relative">
        <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <Input
          placeholder="From"
          className="pl-10 h-12 text-gray-900"
          value={searchParams.from || ''}
          onChange={(e) => updateURL('from', e.target.value)}
        />
      </div>
      <div className="relative">
        <ArrowLeftRight className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <Input
          placeholder="To"
          className="pl-10 h-12 text-gray-900"
          value={searchParams.to || ''}
          onChange={(e) => updateURL('to', e.target.value)}
        />
      </div>
      <div className="relative">
        <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <Input
          type="date"
          className="pl-10 h-12 text-gray-900"
          placeholder="Departure"
          value={searchParams.departure || ''}
          onChange={(e) => updateURL('departure', e.target.value)}
        />
      </div>
      <div className="relative">
        <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <Input
          type="date"
          className="pl-10 h-12 text-gray-900"
          placeholder="Return"
          value={searchParams.return || ''}
          onChange={(e) => updateURL('return', e.target.value)}
        />
      </div>
      <div className="relative">
        <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <Input
          placeholder="1 adult"
          className="pl-10 h-12 text-gray-900"
          value={searchParams.passengers || ''}
          onChange={(e) => updateURL('passengers', e.target.value)}
        />
      </div>
    </div>
  );
};
