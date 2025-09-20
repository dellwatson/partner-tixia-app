import { Plane } from 'lucide-react';

interface FlightSearchHeroProps {
  title: string;
  subtitle: string;
}

export const FlightSearchHero = ({ title, subtitle }: FlightSearchHeroProps) => {
  return (
    <div className="relative px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-8 flex justify-center">
          <div className="rounded-full bg-white/10 p-4">
            <Plane className="h-12 w-12 text-white" />
          </div>
        </div>
        <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
          {title}
        </h1>
        <p className="mb-8 text-xl text-blue-100">
          {subtitle}
        </p>
      </div>
    </div>
  );
};
