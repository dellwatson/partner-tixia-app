import { getAirlineLogoFromDuffel } from './utils';

interface AirlineLogoProps {
  airlineCode: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export function AirlineLogo({ airlineCode, size = 'medium', className = '' }: AirlineLogoProps) {
  const airline = getAirlineLogoFromDuffel(airlineCode);
  
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-10 h-10',
    large: 'w-12 h-12'
  };
  
  const logoSizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-10 h-10'
  };

  return (
    <div className={`${sizeClasses[size]} flex items-center justify-center ${className}`}>
      {airline.logoUrl ? (
        <img 
          src={airline.logoUrl} 
          alt={airline.name} 
          className={`${logoSizeClasses[size]} object-contain`}
          onError={(e) => {
            // Fallback to text if image fails to load
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              parent.innerHTML = `<div class="text-xs font-bold text-gray-600">${airline.logo}</div>`;
            }
          }}
        />
      ) : (
        <div className="text-xs font-bold text-gray-600">
          {airline.logo}
        </div>
      )}
    </div>
  );
}
