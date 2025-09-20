import { Building2, Plane } from 'lucide-react';
import { useNavigate, useSearch } from '@tanstack/react-router';

interface TabNavigationProps {
  activeMode: 'stays' | 'flights';
  setActiveMode: (mode: 'stays' | 'flights') => void;
}

export const TabNavigation = ({ activeMode, setActiveMode }: TabNavigationProps) => {
  const navigate = useNavigate();
  const searchParams = useSearch({ strict: false }) || {};

  const handleModeChange = (mode: 'stays' | 'flights') => {
    setActiveMode(mode);
    const newSearch = { ...searchParams, mode };
    navigate({ search: newSearch, replace: true });
  };

  return (
    <div className="flex justify-center mb-6">
      <div className="flex bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => handleModeChange('stays')}
          className={`flex items-center px-6 py-3 rounded-md text-sm font-medium transition-colors ${
            activeMode === 'stays'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Building2 className="mr-2 h-4 w-4" />
          Stays
        </button>
        <button
          onClick={() => handleModeChange('flights')}
          className={`flex items-center px-6 py-3 rounded-md text-sm font-medium transition-colors ${
            activeMode === 'flights'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Plane className="mr-2 h-4 w-4" />
          Flights
        </button>
      </div>
    </div>
  );
};
