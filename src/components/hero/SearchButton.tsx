import { Search } from 'lucide-react';
import { Button } from '~/components/ui/button';

export const SearchButton = () => {
  return (
    <div className="mt-6">
      <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 h-12 px-8 text-white font-medium">
        <Search className="mr-2 h-5 w-5" />
        Search
      </Button>
    </div>
  );
};
