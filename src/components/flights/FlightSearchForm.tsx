import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Search, Calendar, MapPin, ArrowLeftRight, Users } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Card, CardContent } from '~/components/ui/card';

interface FlightSearchFormProps {
  tripType: 'round-trip' | 'one-way' | 'multi-city';
}

export const FlightSearchForm = ({ tripType }: FlightSearchFormProps) => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    departDate: '',
    returnDate: '',
    passengers: '1',
    cabinClass: 'ECONOMY'
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Build booking.com-style URL structure
    const fromCode = searchData.from.replace(/\s+/g, '.').toUpperCase();
    const toCode = searchData.to.replace(/\s+/g, '.').toUpperCase();
    const routePath = `${fromCode}-${toCode}`;
    
    const params = new URLSearchParams({
      adults: searchData.passengers,
      cabinClass: searchData.cabinClass,
      from: fromCode,
      to: toCode,
      fromLocationName: searchData.from,
      toLocationName: searchData.to,
      depart: searchData.departDate,
      ...(tripType === 'round-trip' && searchData.returnDate && { return: searchData.returnDate }),
      sort: 'BEST',
      travelPurpose: 'leisure',
      type: tripType === 'round-trip' ? 'ROUNDTRIP' : tripType === 'one-way' ? 'ONEWAY' : 'MULTICITY'
    });

    // Navigate to booking.com-style URL: /flights/JKT.CITY-SIN?params
    navigate(`/flights/${routePath}?${params.toString()}`);
  };

  return (
    <Card className="mx-auto max-w-4xl bg-white shadow-2xl">
      <CardContent className="p-6">
        <form onSubmit={handleSearch}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* From */}
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="From"
                className="h-12 pl-10"
                value={searchData.from}
                onChange={(e) => setSearchData(prev => ({ ...prev, from: e.target.value }))}
                required
              />
              <div className="absolute right-3 top-3 text-xs text-gray-400">
                Departure
              </div>
            </div>

            {/* To */}
            <div className="relative">
              <ArrowLeftRight className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="To"
                className="h-12 pl-10"
                value={searchData.to}
                onChange={(e) => setSearchData(prev => ({ ...prev, to: e.target.value }))}
                required
              />
              <div className="absolute right-3 top-3 text-xs text-gray-400">
                Destination
              </div>
            </div>

            {/* Departure Date */}
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="date"
                className="h-12 pl-10"
                value={searchData.departDate}
                onChange={(e) => setSearchData(prev => ({ ...prev, departDate: e.target.value }))}
                required
              />
              <div className="absolute right-3 top-3 text-xs text-gray-400">
                Depart
              </div>
            </div>

            {/* Return Date - only show for round-trip */}
            {tripType === 'round-trip' && (
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="date"
                  className="h-12 pl-10"
                  value={searchData.returnDate}
                  onChange={(e) => setSearchData(prev => ({ ...prev, returnDate: e.target.value }))}
                  required
                />
                <div className="absolute right-3 top-3 text-xs text-gray-400">
                  Return
                </div>
              </div>
            )}

            {/* Passengers */}
            <div className="relative">
              <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <select
                className="h-12 w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={searchData.passengers}
                onChange={(e) => setSearchData(prev => ({ ...prev, passengers: e.target.value }))}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                  <option key={num} value={num.toString()}>
                    {num} {num === 1 ? 'adult' : 'adults'}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-3 text-xs text-gray-400">
                Travelers
              </div>
            </div>

            {/* Cabin Class */}
            <div className="relative">
              <select
                className="h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={searchData.cabinClass}
                onChange={(e) => setSearchData(prev => ({ ...prev, cabinClass: e.target.value }))}
              >
                <option value="ECONOMY">Economy</option>
                <option value="PREMIUM_ECONOMY">Premium Economy</option>
                <option value="BUSINESS">Business</option>
                <option value="FIRST">First Class</option>
              </select>
              <div className="absolute right-3 top-3 text-xs text-gray-400">
                Class
              </div>
            </div>
          </div>

          {/* Search Button */}
          <div className="mt-6">
            <Button type="submit" className="h-12 w-full bg-blue-600 text-lg font-semibold hover:bg-blue-700">
              <Search className="mr-2 h-5 w-5" />
              Search Flights
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
