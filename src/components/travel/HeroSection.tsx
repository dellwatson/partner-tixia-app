import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Search, MapPin, Calendar, Users, Plane, Building2, ArrowLeftRight, Play } from 'lucide-react';
import { Card } from '~/components/ui/card';
import { Input } from '~/components/ui/input';

interface HeroSectionProps {
  activeMode?: 'stays' | 'flights';
  setActiveMode?: (mode: 'stays' | 'flights') => void;
  mode?: 'hotels' | 'flights';
}

export const HeroSection = ({ activeMode, setActiveMode, mode }: HeroSectionProps) => {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary/3 to-accent/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-gray-900 leading-tight">
            {activeMode === 'stays' 
              ? (
                <>
                  More than accommodation,<br />
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Complete Travel Management
                  </span>
                </>
              ) : (
                <>
                  Compare and book cheap flights<br />
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    with ease
                  </span>
                </>
              )
            }
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            {activeMode === 'stays'
              ? 'Need more than check-in? Tixia gives you full stack travel and accommodation management — so you can launch faster, scale easier, and stay focused on building your journey.'
              : 'Discover your next flight. Compare from hundreds of travel sites at once and find the best deals for your perfect trip.'
            }
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white transition-all duration-200 bg-gradient-to-r from-primary to-primary/90 rounded-xl shadow-lg hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl"></div>
              <span className="relative flex items-center">
                Start building for free
              </span>
            </button>
            
            <button className="group inline-flex items-center justify-center px-6 py-4 text-lg font-medium text-gray-700 transition-all duration-200 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-gray-300 hover:-translate-y-0.5 active:translate-y-0">
              <Play className="mr-2 h-5 w-5 text-primary" />
              <span>Watch demo</span>
              <span className="ml-2 text-sm text-gray-500">2 min</span>
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <Card className="p-8 bg-white/80 backdrop-blur-sm shadow-2xl rounded-2xl border border-white/20">
            {/* Tab Navigation */}
            <div className="flex mb-8 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setActiveMode('stays')}
                className={`flex items-center px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200 flex-1 justify-center ${
                  activeMode === 'stays'
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Building2 className="mr-2 h-4 w-4" />
                Stays
              </button>
              <button
                onClick={() => setActiveMode('flights')}
                className={`flex items-center px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200 flex-1 justify-center ${
                  activeMode === 'flights'
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Plane className="mr-2 h-4 w-4" />
                Flights
              </button>
            </div>

            {/* Search Forms */}
            {activeMode === 'stays' ? (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder={t('search_destination', 'Where are you going?')}
                    className="pl-12 h-14 text-gray-900 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                  <Input
                    type="date"
                    className="pl-12 h-14 text-gray-900 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="Check-in"
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                  <Input
                    type="date"
                    className="pl-12 h-14 text-gray-900 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="Check-out"
                  />
                </div>
                <div className="relative">
                  <Users className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="2 adults · 0 children · 1 room"
                    className="pl-12 h-14 text-gray-900 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Where from?"
                    className="pl-12 h-14 text-gray-900 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div className="relative">
                  <ArrowLeftRight className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Where to?"
                    className="pl-12 h-14 text-gray-900 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                  <Input
                    type="date"
                    className="pl-12 h-14 text-gray-900 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="Departure"
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                  <Input
                    type="date"
                    className="pl-12 h-14 text-gray-900 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="Return"
                  />
                </div>
                <div className="relative">
                  <Users className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="1 adult"
                    className="pl-12 h-14 text-gray-900 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>
            )}
            
            <div className="flex justify-center">
              <button className="group relative inline-flex items-center justify-center px-12 py-4 text-lg font-semibold text-white transition-all duration-200 bg-gradient-to-r from-primary to-primary/90 rounded-xl shadow-lg hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl"></div>
                <Search className="mr-3 h-5 w-5 relative z-10" />
                <span className="relative z-10">Search</span>
              </button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
