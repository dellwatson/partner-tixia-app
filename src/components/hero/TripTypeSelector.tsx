import { useNavigate, useLocation } from '@tanstack/react-router';

interface TripTypeSelectorProps {
  activeMode: 'stays' | 'flights';
}

export const TripTypeSelector = ({ activeMode }: TripTypeSelectorProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  if (activeMode !== 'flights') return null;

  // Determine active trip type from current path
  const getActiveTripType = () => {
    if (location.pathname.includes('/flights/roundtrip')) return 'roundtrip';
    if (location.pathname.includes('/flights/oneway')) return 'oneway';
    if (location.pathname.includes('/flights/multicity')) return 'multicity';
    return 'roundtrip'; // default
  };

  const activeTripType = getActiveTripType();

  const handleTripTypeChange = (tripType: string) => {
    // Navigate to specific trip type path with current search params
    const searchParams = new URLSearchParams(location.search);
    const newPath = `/flights/${tripType}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    navigate(newPath, { replace: true });
  };

  const tripTypes = [
    { id: 'roundtrip', label: 'Round trip' },
    { id: 'oneway', label: 'One way' },
    { id: 'multicity', label: 'Multi-city' }
  ];

  return (
    <div className="flex justify-center mb-6">
      <div className="flex bg-gray-100 rounded-lg p-1">
        {tripTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => handleTripTypeChange(type.id)}
            className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
              activeTripType === type.id
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>
    </div>
  );
};
