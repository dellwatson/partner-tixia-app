import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Search, Calendar, MapPin, Users } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Card, CardContent } from '~/components/ui/card';

export const StaysSearchForm = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    destination: '',
    checkin: '',
    checkout: '',
    guests: '2'
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams({
      destination: searchData.destination,
      checkin: searchData.checkin,
      checkout: searchData.checkout,
      guests: searchData.guests
    });

    navigate(`/search/stays?${params.toString()}`);
  };

  return (
    <Card className="mx-auto max-w-4xl bg-white shadow-2xl">
      <CardContent className="p-6">
        <form onSubmit={handleSearch}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Destination */}
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Where are you going?"
                className="h-12 pl-10"
                value={searchData.destination}
                onChange={(e) => setSearchData(prev => ({ ...prev, destination: e.target.value }))}
                required
              />
              <div className="absolute right-3 top-3 text-xs text-gray-400">
                Destination
              </div>
            </div>

            {/* Check-in Date */}
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="date"
                className="h-12 pl-10"
                value={searchData.checkin}
                onChange={(e) => setSearchData(prev => ({ ...prev, checkin: e.target.value }))}
                required
              />
              <div className="absolute right-3 top-3 text-xs text-gray-400">
                Check-in
              </div>
            </div>

            {/* Check-out Date */}
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="date"
                className="h-12 pl-10"
                value={searchData.checkout}
                onChange={(e) => setSearchData(prev => ({ ...prev, checkout: e.target.value }))}
                required
              />
              <div className="absolute right-3 top-3 text-xs text-gray-400">
                Check-out
              </div>
            </div>

            {/* Guests */}
            <div className="relative">
              <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <select
                className="h-12 w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={searchData.guests}
                onChange={(e) => setSearchData(prev => ({ ...prev, guests: e.target.value }))}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                  <option key={num} value={num.toString()}>
                    {num} {num === 1 ? 'guest' : 'guests'}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-3 text-xs text-gray-400">
                Guests
              </div>
            </div>
          </div>

          {/* Search Button */}
          <div className="mt-6">
            <Button type="submit" className="h-12 w-full bg-green-600 text-lg font-semibold hover:bg-green-700">
              <Search className="mr-2 h-5 w-5" />
              Search Stays
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
