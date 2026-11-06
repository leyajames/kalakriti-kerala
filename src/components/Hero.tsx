import React, { useState } from 'react';
import { useCultural } from '../context/CulturalContext';
import { 
  Search, 
  Sparkles, 
  Compass, 
  PlusCircle, 
  ArrowRight,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

export const Hero: React.FC = () => {
  const { 
    language, 
    setActiveTab, 
    setIsUploadModalOpen,
    searchQuery,
    setSearchQuery,
  } = useCultural();

  const [localSearch, setLocalSearch] = useState('');
  const shouldReduceMotion = useReducedMotion();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearch.trim()) {
      setSearchQuery(localSearch.trim());
      setActiveTab('discover');
    }
  };

  const quickPillClick = (term: string, tab: string) => {
    setSearchQuery(term);
    setActiveTab(tab);
  };

  // Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className="relative overflow-hidden min-h-[580px] lg:min-h-[640px] flex items-center bg-deep-brown text-white">
      
      {/* 1. Large, Beautiful Kerala Cultural Background Image with Reveal Animation */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          initial={shouldReduceMotion ? { scale: 1.05 } : { scale: 1.18, filter: 'brightness(0.3)' }}
          animate={{ scale: 1.05, filter: 'brightness(0.42)' }}
          transition={{ duration: 1.6, ease: 'easeOut' }}
          src="https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=2000&q=85"
          alt="Traditional Kerala Kathakali Performance at Cheruthuruthy, Thrissur"
          className="w-full h-full object-cover object-center contrast-[1.08]"
        />
        {/* Editorial Gradients & Traditional Color Wash Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-deep-brown via-deep-brown/60 to-deep-brown/40" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-deep-brown/40 to-deep-brown/80" />

        {/* Subtle Kerala Mural Arch Pattern Accent in Background */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `radial-gradient(#ECCA8A 1.5px, transparent 1.5px)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      {/* Decorative Kasavu Gold Border Trim */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-traditional-red via-cream-gold to-terracotta z-10" />

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10 w-full">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl space-y-6"
        >
          
          {/* Cultural Heritage Pill with gentle pulse */}
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cream-gold/20 backdrop-blur-md border border-cream-gold/50 text-cream-gold text-xs font-semibold tracking-wide shadow-gold">
              <Flame className="w-3.5 h-3.5 text-traditional-red animate-pulse" />
              <span>
                {language === 'en'
                  ? 'Thrissur • The Cultural Capital of Kerala (സാംസ്കാരിക തലസ്ഥാനം)'
                  : 'തൃശ്ശൂർ • കേരളത്തിന്റെ സാംസ്കാരിക തലസ്ഥാനം'}
              </span>
            </div>
          </motion.div>

          {/* Main Heading: Exact Copy Requested */}
          <motion.div variants={itemVariants} className="space-y-2">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white font-bold leading-[1.12] tracking-tight">
              {language === 'en' ? (
                <>
                  Discover the Stories <br />
                  <span className="text-cream-gold italic font-serif">Behind Our Culture.</span>
                </>
              ) : (
                <>
                  നമ്മുടെ സംസ്കാരത്തിന് പിന്നിലെ <br />
                  <span className="text-cream-gold font-malayalam">ചരിത്രവും കഥകളും അറിയാം.</span>
                </>
              )}
            </h1>
          </motion.div>

          {/* Supporting Text: Exact Copy Requested */}
          <motion.p variants={itemVariants} className="text-parchment-warm/90 text-base sm:text-lg sm:leading-relaxed font-normal max-w-2xl">
            {language === 'en'
              ? 'Explore local traditions, meet talented artists and experience the cultural richness of Thrissur.'
              : 'തനത് പാരമ്പര്യ കലകളെ അറിയാം, പ്രതിഭാധനരായ കലാകാരന്മാരെ പരിചയപ്പെടാം, തൃശ്ശൂരിന്റെ സാംസ്കാരിക സമൃദ്ധി നേരിട്ടനുഭവിക്കാം.'}
          </motion.p>

          {/* Interactive Search Bar: Exact Copy Requested */}
          <motion.div variants={itemVariants} className="pt-2 max-w-2xl relative">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-warm-sand" />
                <input
                  type="text"
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  placeholder="Search artists, art forms, places and events..."
                  className="w-full pl-12 pr-28 sm:pr-36 py-3.5 sm:py-4 rounded-2xl bg-white/95 backdrop-blur-md text-deep-brown placeholder-deep-brown/50 text-xs sm:text-sm font-medium border border-cream-gold shadow-cultural focus:outline-none focus:ring-2 focus:ring-cream-gold transition-all"
                />
              </div>

              <motion.button
                whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                type="submit"
                className="absolute right-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl bg-traditional-red hover:bg-traditional-red-dark text-white text-xs sm:text-sm font-bold shadow-md transition-colors flex items-center space-x-1.5"
              >
                <span>Search</span>
                <ArrowRight className="w-3.5 h-3.5 hidden sm:inline" />
              </motion.button>
            </form>

            {/* Quick Suggestions below search bar */}
            <div className="flex flex-wrap items-center gap-1.5 pt-3 text-[11px] text-parchment-warm/80">
              <span className="font-semibold text-cream-gold">Popular:</span>
              <button 
                type="button"
                onClick={() => quickPillClick('Kathakali', 'discover')} 
                className="px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                Kathakali
              </button>
              <button 
                type="button"
                onClick={() => quickPillClick('Pooram', 'events')} 
                className="px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                Thrissur Pooram
              </button>
              <button 
                type="button"
                onClick={() => quickPillClick('Kuthampully', 'discover')} 
                className="px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                Kuthampully Handloom
              </button>
              <button 
                type="button"
                onClick={() => quickPillClick('Vadakkunnathan', 'map')} 
                className="px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                Vadakkunnathan Temple
              </button>
            </div>
          </motion.div>

          {/* Action Buttons: "Explore Culture" & "Showcase Your Work" */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 pt-4">
            <motion.button
              whileHover={shouldReduceMotion ? {} : { scale: 1.03, y: -2 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              onClick={() => setActiveTab('discover')}
              className="flex items-center space-x-2 px-6 sm:px-8 py-3.5 rounded-xl bg-cream-gold hover:bg-cream-gold-dark text-deep-brown font-bold text-xs sm:text-sm shadow-gold hover:shadow-lg transition-all"
            >
              <Compass className="w-4 h-4 text-traditional-red" />
              <span>Explore Culture</span>
            </motion.button>

            <motion.button
              whileHover={shouldReduceMotion ? {} : { scale: 1.03, y: -2 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              onClick={() => setIsUploadModalOpen(true)}
              className="flex items-center space-x-2 px-6 sm:px-8 py-3.5 rounded-xl bg-traditional-red hover:bg-traditional-red-dark text-white font-bold text-xs sm:text-sm border border-traditional-red-light shadow-md hover:shadow-lg transition-all"
            >
              <PlusCircle className="w-4 h-4 text-cream-gold" />
              <span>Showcase Your Work</span>
            </motion.button>
          </motion.div>

          {/* Authentic Culture Assurance Strip */}
          <motion.div variants={itemVariants} className="pt-6 border-t border-white/15 flex flex-wrap items-center gap-6 text-xs text-parchment-warm/80">
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-cream-gold" />
              <span>200+ Verified Master Lineages</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-cream-gold" />
              <span>UNESCO Recognized Traditions</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-cream-gold" />
              <span>Zero Intermediary Commissions</span>
            </div>
          </motion.div>

        </motion.div>
      </div>

    </section>
  );
};
