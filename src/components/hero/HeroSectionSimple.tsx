'use client';

import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Search, MapPin, Calendar, Users, ArrowLeftRight, Play } from 'lucide-react';
import { Card } from '~/components/ui/card';
import { Input } from '~/components/ui/input';

interface HeroSectionSimpleProps {
  mode?: 'hotels' | 'flights';
}

export const HeroSectionSimple = ({ mode = 'flights' }: HeroSectionSimpleProps) => {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 via-transparent to-slate-900/40"></div>
      
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
            {mode === 'hotels' 
              ? (
                <>
                  Discover amazing<br />
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    places to stay
                  </span>
                </>
              ) : (
                <>
                  Find your perfect<br />
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    flight journey
                  </span>
                </>
              )
            }
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            {mode === 'hotels'
              ? 'Book unique accommodations and experiences around the world. From cozy apartments to luxury resorts.'
              : 'Compare flights from hundreds of airlines and travel sites. Find the best deals for your next adventure.'
            }
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white transition-all duration-200 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl shadow-lg hover:shadow-xl hover:shadow-cyan-500/25 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl"></div>
              <span className="relative flex items-center">
                Start exploring
              </span>
            </button>
            
            <button className="group inline-flex items-center justify-center px-6 py-4 text-lg font-medium text-slate-300 transition-all duration-200 bg-white/10 border border-white/20 rounded-xl shadow-sm hover:shadow-md hover:border-white/30 hover:-translate-y-0.5 active:translate-y-0 backdrop-blur-sm">
              <Play className="mr-2 h-5 w-5 text-cyan-400" />
              <span>Watch demo</span>
              <span className="ml-2 text-sm text-slate-400">2 min</span>
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <Card className="p-8 bg-white/10 backdrop-blur-md shadow-2xl rounded-2xl border border-white/20">
            {/* Search Forms */}
            {mode === 'hotels' ? (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
                  <Input
                    placeholder={t('search_destination', 'Where are you going?')}
                    className="pl-12 h-14 text-white placeholder:text-slate-400 bg-white/10 border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-400/20 focus:border-cyan-400"
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
                  <Input
                    type="date"
                    className="pl-12 h-14 text-white bg-white/10 border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-400/20 focus:border-cyan-400"
                    placeholder="Check-in"
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
                  <Input
                    type="date"
                    className="pl-12 h-14 text-white bg-white/10 border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-400/20 focus:border-cyan-400"
                    placeholder="Check-out"
                  />
                </div>
                <div className="relative">
                  <Users className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
                  <Input
                    placeholder="2 adults · 0 children · 1 room"
                    className="pl-12 h-14 text-white placeholder:text-slate-400 bg-white/10 border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-400/20 focus:border-cyan-400"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
                  <Input
                    placeholder="Where from?"
                    className="pl-12 h-14 text-white placeholder:text-slate-400 bg-white/10 border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-400/20 focus:border-cyan-400"
                  />
                </div>
                <div className="relative">
                  <ArrowLeftRight className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
                  <Input
                    placeholder="Where to?"
                    className="pl-12 h-14 text-white placeholder:text-slate-400 bg-white/10 border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-400/20 focus:border-cyan-400"
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
                  <Input
                    type="date"
                    className="pl-12 h-14 text-white bg-white/10 border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-400/20 focus:border-cyan-400"
                    placeholder="Departure"
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
                  <Input
                    type="date"
                    className="pl-12 h-14 text-white bg-white/10 border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-400/20 focus:border-cyan-400"
                    placeholder="Return"
                  />
                </div>
                <div className="relative">
                  <Users className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
                  <Input
                    placeholder="1 adult"
                    className="pl-12 h-14 text-white placeholder:text-slate-400 bg-white/10 border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-400/20 focus:border-cyan-400"
                  />
                </div>
              </div>
            )}
            
            <div className="flex justify-center">
              <button className="group relative inline-flex items-center justify-center px-12 py-4 text-lg font-semibold text-white transition-all duration-200 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl shadow-lg hover:shadow-xl hover:shadow-cyan-500/25 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl"></div>
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
