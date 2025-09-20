import { MapPin, Calendar, Users } from 'lucide-react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { Input } from '~/components/ui/input';

export const StaysSearchForm = () => {
  const navigate = useNavigate();
  const searchParams = useSearch({ strict: false }) || {};

  const updateURL = (field: string, value: string) => {
    const newSearch = { ...searchParams };
    if (value) {
      newSearch[field] = value;
    } else {
      delete newSearch[field];
    }
    // Ensure mode is set to stays
    newSearch.mode = 'stays';
    navigate({ search: newSearch, replace: true });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="relative">
        <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <Input
          placeholder="Where are you going?"
          className="pl-10 h-12 text-gray-900"
          value={searchParams.location || ''}
          onChange={(e) => updateURL('destination', e.target.value)}
        />
      </div>
      <div className="relative">
        <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <Input
          type="date"
          className="pl-10 h-12 text-gray-900"
          placeholder="Check-in"
          value={searchParams.checkin || ''}
          onChange={(e) => updateURL('checkin', e.target.value)}
        />
      </div>
      <div className="relative">
        <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <Input
          type="date"
          className="pl-10 h-12 text-gray-900"
          placeholder="Check-out"
          value={searchParams.checkout || ''}
          onChange={(e) => updateURL('checkout', e.target.value)}
        />
      </div>
      <div className="relative">
        <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <Input
          placeholder="2 adults"
          className="pl-10 h-12 text-gray-900"
          value={searchParams.guests || ''}
          onChange={(e) => updateURL('guests', e.target.value)}
        />
      </div>
    </div>
  );
};
