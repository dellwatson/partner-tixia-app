import { useNavigate, useLocation } from '@tanstack/react-router';

interface TripTypeSelectorProps {
  tripType: 'round-trip' | 'one-way' | 'multi-city';
  onTripTypeChange: (type: 'round-trip' | 'one-way' | 'multi-city') => void;
}

export const TripTypeSelector = ({ tripType, onTripTypeChange }: TripTypeSelectorProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleTripTypeChange = (type: 'round-trip' | 'one-way' | 'multi-city') => {
    onTripTypeChange(type);
    
    // Navigate to appropriate route based on trip type
    const routeMap = {
      'round-trip': '/flights/roundtrip',
      'one-way': '/flights/oneway',
      'multi-city': '/flights/multicity'
    };
    
    const searchParams = new URLSearchParams(location.search);
    const newPath = `${routeMap[type]}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    navigate(newPath, { replace: true });
  };

  const tripTypes = [
    { id: 'round-trip' as const, label: 'Round trip' },
    { id: 'one-way' as const, label: 'One way' },
    { id: 'multi-city' as const, label: 'Multi-city' }
  ];

  return (
    <div className="mb-6 flex flex-wrap gap-4">
      {tripTypes.map((type) => (
        <button
          key={type.id}
          onClick={() => handleTripTypeChange(type.id)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            tripType === type.id
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {type.label}
        </button>
      ))}
    </div>
  );
};
