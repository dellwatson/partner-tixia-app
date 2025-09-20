export interface AirlineLogo {
  code: string;
  name: string;
  logo: string;
  color: string;
}

export const airlineLogos: AirlineLogo[] = [
  // Major US Airlines
  { code: 'AA', name: 'American Airlines', logo: '🇺🇸', color: '#C8102E' },
  { code: 'DL', name: 'Delta Air Lines', logo: '🔺', color: '#003366' },
  { code: 'UA', name: 'United Airlines', logo: '🌐', color: '#0039A6' },
  { code: 'WN', name: 'Southwest Airlines', logo: '❤️', color: '#304CB2' },
  { code: 'B6', name: 'JetBlue Airways', logo: '💙', color: '#0066CC' },
  { code: 'AS', name: 'Alaska Airlines', logo: '🏔️', color: '#01426A' },
  { code: 'F9', name: 'Frontier Airlines', logo: '🦅', color: '#00A651' },
  { code: 'NK', name: 'Spirit Airlines', logo: '💛', color: '#FFD100' },

  // European Airlines
  { code: 'LH', name: 'Lufthansa', logo: '🇩🇪', color: '#05164D' },
  { code: 'AF', name: 'Air France', logo: '🇫🇷', color: '#002157' },
  { code: 'BA', name: 'British Airways', logo: '🇬🇧', color: '#075AAA' },
  { code: 'KL', name: 'KLM', logo: '🇳🇱', color: '#006DB7' },
  { code: 'IB', name: 'Iberia', logo: '🇪🇸', color: '#EC1C24' },
  { code: 'AZ', name: 'Alitalia', logo: '🇮🇹', color: '#009639' },
  { code: 'LX', name: 'Swiss International', logo: '🇨🇭', color: '#FF0000' },
  { code: 'OS', name: 'Austrian Airlines', logo: '🇦🇹', color: '#E30613' },
  { code: 'SN', name: 'Brussels Airlines', logo: '🇧🇪', color: '#1E3A8A' },
  { code: 'SK', name: 'SAS', logo: '🇸🇪', color: '#003F7F' },

  // Asian Airlines
  { code: 'SQ', name: 'Singapore Airlines', logo: '🇸🇬', color: '#003F7F' },
  { code: 'CX', name: 'Cathay Pacific', logo: '🇭🇰', color: '#00824A' },
  { code: 'JL', name: 'Japan Airlines', logo: '🇯🇵', color: '#DC143C' },
  { code: 'NH', name: 'ANA', logo: '✈️', color: '#1E3A8A' },
  { code: 'KE', name: 'Korean Air', logo: '🇰🇷', color: '#0066CC' },
  { code: 'OZ', name: 'Asiana Airlines', logo: '🌟', color: '#E31837' },
  { code: 'TG', name: 'Thai Airways', logo: '🇹🇭', color: '#7B1FA2' },
  { code: 'MH', name: 'Malaysia Airlines', logo: '🇲🇾', color: '#DC143C' },
  { code: 'GA', name: 'Garuda Indonesia', logo: '🇮🇩', color: '#FF6B00' },
  { code: 'PR', name: 'Philippine Airlines', logo: '🇵🇭', color: '#003F7F' },

  // Middle Eastern Airlines
  { code: 'EK', name: 'Emirates', logo: '🇦🇪', color: '#DC143C' },
  { code: 'QR', name: 'Qatar Airways', logo: '🇶🇦', color: '#5D1A5B' },
  { code: 'EY', name: 'Etihad Airways', logo: '🏜️', color: '#B8860B' },
  { code: 'TK', name: 'Turkish Airlines', logo: '🇹🇷', color: '#DC143C' },
  { code: 'MS', name: 'EgyptAir', logo: '🇪🇬', color: '#1E3A8A' },

  // Australian & Oceania
  { code: 'QF', name: 'Qantas', logo: '🇦🇺', color: '#E10600' },
  { code: 'VA', name: 'Virgin Australia', logo: '🔴', color: '#CC0000' },
  { code: 'JQ', name: 'Jetstar', logo: '⭐', color: '#FF6600' },
  { code: 'NZ', name: 'Air New Zealand', logo: '🇳🇿', color: '#003F7F' },

  // African Airlines
  { code: 'SA', name: 'South African Airways', logo: '🇿🇦', color: '#003F7F' },
  { code: 'ET', name: 'Ethiopian Airlines', logo: '🇪🇹', color: '#228B22' },
  { code: 'MS', name: 'EgyptAir', logo: '🇪🇬', color: '#1E3A8A' },

  // Latin American Airlines
  { code: 'LA', name: 'LATAM Airlines', logo: '🌎', color: '#E31837' },
  { code: 'AV', name: 'Avianca', logo: '🇨🇴', color: '#DC143C' },
  { code: 'CM', name: 'Copa Airlines', logo: '🇵🇦', color: '#003F7F' },
  { code: 'AR', name: 'Aerolíneas Argentinas', logo: '🇦🇷', color: '#0066CC' },

  // Budget Airlines
  { code: 'FR', name: 'Ryanair', logo: '💙', color: '#003F7F' },
  { code: 'U2', name: 'easyJet', logo: '🧡', color: '#FF6600' },
  { code: 'W6', name: 'Wizz Air', logo: '💜', color: '#722F87' },
  { code: 'VY', name: 'Vueling', logo: '💛', color: '#FFD100' },
  { code: 'PC', name: 'Pegasus Airlines', logo: '🐎', color: '#DC143C' },

  // Additional Airlines
  { code: 'AC', name: 'Air Canada', logo: '🇨🇦', color: '#FF0000' },
  { code: 'WF', name: 'WestJet', logo: '🍁', color: '#0066CC' },
  { code: 'VS', name: 'Virgin Atlantic', logo: '🔴', color: '#CC0000' },
  { code: 'FI', name: 'Icelandair', logo: '🇮🇸', color: '#003F7F' },
  { code: 'AY', name: 'Finnair', logo: '🇫🇮', color: '#003F7F' },
];

export const getAirlineLogo = (code: string): AirlineLogo | undefined => {
  return airlineLogos.find(airline => airline.code === code);
};

export const getRandomAirline = (): AirlineLogo => {
  const randomIndex = Math.floor(Math.random() * airlineLogos.length);
  return airlineLogos[randomIndex];
};
