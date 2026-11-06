import React, { useState } from 'react';
import { useCultural } from '../context/CulturalContext';
import { Artform, ArtformCategory } from '../types';
import { 
  Sparkles, 
  MapPin, 
  Music, 
  Volume2, 
  BookOpen, 
  CheckCircle2, 
  X,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

export const ArtformCatalog: React.FC = () => {
  const { 
    language, 
    artforms, 
    selectedArtform, 
    setSelectedArtform,
    setActiveTab,
    setSelectedArtist,
    artists
  } = useCultural();

  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const shouldReduceMotion = useReducedMotion();

  const categories: { id: string; labelEn: string; labelMl: string }[] = [
    { id: 'ALL', labelEn: 'All Traditions', labelMl: 'എല്ലാ കലകളും' },
    { id: 'PERFORMING_CLASSICAL', labelEn: 'Classical Performing', labelMl: 'ശാസ്ത്രീയ കലകൾ' },
    { id: 'PERCUSSION_MELAM', labelEn: 'Temple Melam & Percussion', labelMl: 'ക്ഷേത്ര വാദ്യമേളം' },
    { id: 'FOLK_RITUAL', labelEn: 'Folk & Ritual', labelMl: 'നാടോടി കലകൾ' },
    { id: 'CRAFT_SCULPTURE', labelEn: 'Craft & Sculpture', labelMl: 'ശിൽപകല' },
    { id: 'HANDLOOM_TEXTILE', labelEn: 'Handloom & Textile', labelMl: 'കൈത്തറി' },
  ];

  const filteredArtforms = artforms.filter(af => {
    return activeCategory === 'ALL' || af.category === activeCategory;
  });

  return (
    <section className="py-12 bg-parchment-texture min-h-[calc(100vh-80px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="space-y-3 max-w-3xl">
          <span className="text-terracotta font-heading tracking-widest uppercase text-xs font-semibold">
            {language === 'en' ? 'Living Encyclopedia of Thrissur' : 'തൃശ്ശൂരിന്റെ പാരമ്പര്യ കലകൾ'}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-deep-brown">
            {language === 'en' ? 'Traditional Artforms & Heritage Crafts' : 'തനത് കലാരൂപങ്ങളും കരകൗശലങ്ങളും'}
          </h2>
          <p className="text-sm sm:text-base text-deep-brown/80 leading-relaxed">
            {language === 'en'
              ? 'Immerse yourself in UNESCO-recognized Sanskrit theatre, the mathematical crescendos of temple percussion, GI-tagged handlooms, and lost-wax bronze casting nurtured for centuries across Thrissur.'
              : 'ശ്രേഷ്ഠമായ സംസ്കൃത നാടകം, അലയടിക്കുന്ന പഞ്ചവാദ്യം, പാണ്ടിമേളം, തനിമയാർന്ന കുത്തമ്പുള്ളി കൈത്തറി, നടവരമ്പ് വെങ്കല ശിൽപങ്ങൾ എന്നിവയെ അടുത്തറിയാം.'}
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-warm-sand/30 pb-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat.id
                  ? 'bg-deep-brown text-cream-gold shadow-md'
                  : 'bg-white/80 hover:bg-white text-deep-brown/80 border border-warm-sand/40 hover:border-terracotta'
              }`}
            >
              {language === 'en' ? cat.labelEn : cat.labelMl}
            </button>
          ))}
        </div>

        {/* Artform Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArtforms.map((artform) => (
            <motion.div
              key={artform.id}
              layout
              whileHover={shouldReduceMotion ? {} : { y: -6, scale: 1.01 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.99 }}
              onClick={() => setSelectedArtform(artform)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-warm-sand/40 shadow-soft hover:shadow-cultural transition-all duration-300 flex flex-col"
            >
              {/* Artform Cover Photo */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={artform.coverImage}
                  alt={artform.nameEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-deep-brown/90 via-deep-brown/20 to-transparent" />

                {/* Floating Cultural Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  {artform.isUnesco && (
                    <span className="px-2.5 py-0.5 rounded-full bg-deep-brown/90 backdrop-blur-sm text-cream-gold text-[10px] font-bold border border-cream-gold/40 flex items-center space-x-1">
                      <Sparkles className="w-3 h-3 text-cream-gold" />
                      <span>UNESCO Intangible Heritage</span>
                    </span>
                  )}
                  {artform.isGiTagged && (
                    <span className="px-2.5 py-0.5 rounded-full bg-traditional-red/90 text-white text-[10px] font-bold border border-traditional-red-light flex items-center space-x-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>GI Tagged ({artform.giTagYear})</span>
                    </span>
                  )}
                </div>

                {/* Bottom Overlay Text */}
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-[10px] uppercase font-semibold tracking-wider text-cream-gold">
                    {language === 'en' ? artform.categoryLabelEn : artform.categoryLabelMl}
                  </span>
                  <h3 className="font-display text-xl font-bold leading-tight">
                    {language === 'en' ? artform.nameEn : artform.nameMl}
                  </h3>
                  <p className="font-malayalam text-xs text-parchment-warm">
                    {language === 'en' ? artform.nameMl : artform.nameEn}
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs sm:text-sm text-deep-brown/80 line-clamp-3 leading-relaxed">
                  {language === 'en' ? artform.descriptionEn : artform.descriptionMl}
                </p>

                {/* Instruments or Tools */}
                {artform.instruments && artform.instruments.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-olive-green uppercase tracking-wider">
                      {language === 'en' ? 'Traditional Instruments / Tools:' : 'വാദ്യങ്ങൾ / ഉപകരണങ്ങൾ:'}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {artform.instruments.slice(0, 4).map((inst, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-parchment-dark text-deep-brown text-[11px] font-medium"
                        >
                          {inst}
                        </span>
                      ))}
                      {artform.instruments.length > 4 && (
                        <span className="px-1.5 py-0.5 text-[10px] text-terracotta font-semibold">
                          +{artform.instruments.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Card Action Link */}
                <div className="pt-3 border-t border-warm-sand/30 flex items-center justify-between text-xs font-semibold text-traditional-red group-hover:text-traditional-red-dark">
                  <span className="flex items-center space-x-1 text-olive-green">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{artform.originLocation}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span>{language === 'en' ? 'Explore Dossier' : 'വിശദാംശങ്ങൾ'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Artform Detail Dossier Modal */}
      {selectedArtform && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-deep-brown/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-cultural border border-cream-gold my-8">
            
            {/* Modal Header Image */}
            <div className="relative h-72 sm:h-96">
              <img
                src={selectedArtform.coverImage}
                alt={selectedArtform.nameEn}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-brown via-deep-brown/40 to-transparent" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedArtform(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-deep-brown/80 text-cream-gold hover:bg-traditional-red transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Title Overlay */}
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <div className="flex flex-wrap gap-2">
                  {selectedArtform.isUnesco && (
                    <span className="px-3 py-1 rounded-full bg-cream-gold text-deep-brown text-xs font-bold">
                      ✨ UNESCO Masterpiece
                    </span>
                  )}
                  {selectedArtform.isGiTagged && (
                    <span className="px-3 py-1 rounded-full bg-traditional-red text-white text-xs font-bold">
                      🏷️ GI Tag Certified
                    </span>
                  )}
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-bold">
                  {selectedArtform.nameEn} • <span className="font-malayalam">{selectedArtform.nameMl}</span>
                </h2>
                <p className="text-xs sm:text-sm text-cream-gold flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Origin: {selectedArtform.originLocation}</span>
                </p>
              </div>
            </div>

            {/* Modal Content Body */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
              
              {/* Overview Section */}
              <div className="space-y-2">
                <h4 className="font-heading text-lg font-bold text-deep-brown border-b border-warm-sand/30 pb-1">
                  {language === 'en' ? 'Essence & Aesthetics' : 'കലയുടെ സവിശേഷതകൾ'}
                </h4>
                <p className="text-sm sm:text-base text-deep-brown/85 leading-relaxed">
                  {selectedArtform.descriptionEn}
                </p>
                <p className="font-malayalam text-sm sm:text-base text-deep-brown/80 leading-relaxed bg-parchment-warm p-4 rounded-xl border border-warm-sand/30">
                  {selectedArtform.descriptionMl}
                </p>
              </div>

              {/* Historical Evolution */}
              <div className="space-y-2">
                <h4 className="font-heading text-lg font-bold text-deep-brown border-b border-warm-sand/30 pb-1">
                  {language === 'en' ? 'Historical Lineage in Thrissur' : 'ചരിത്രവും തൃശ്ശൂരുമായുള്ള ബന്ധവും'}
                </h4>
                <p className="text-sm text-deep-brown/80 leading-relaxed">
                  {selectedArtform.historyEn}
                </p>
                <p className="font-malayalam text-sm text-deep-brown/80 leading-relaxed">
                  {selectedArtform.historyMl}
                </p>
              </div>

              {/* Instruments & Materials */}
              {selectedArtform.instruments && (
                <div className="space-y-2">
                  <h4 className="font-heading text-base font-bold text-deep-brown">
                    {language === 'en' ? 'Acoustic Instruments & Sacred Materials' : 'ഉപകരണങ്ങളും വാദ്യങ്ങളും'}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedArtform.instruments.map((inst, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-lg bg-cream-gold/30 border border-cream-gold text-deep-brown text-xs font-semibold"
                      >
                        {inst}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Associated Master Artists in Thrissur */}
              <div className="pt-4 border-t border-warm-sand/30 space-y-3">
                <h4 className="font-heading text-base font-bold text-deep-brown">
                  {language === 'en' ? 'Living Master Practitioners' : 'പ്രമുഖ ഗുരുക്കന്മാർ'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {artists
                    .filter(a => a.primaryArtformId === selectedArtform.id)
                    .map(artist => (
                      <div
                        key={artist.id}
                        onClick={() => {
                          setSelectedArtform(null);
                          setSelectedArtist(artist);
                        }}
                        className="cursor-pointer p-3 rounded-xl border border-warm-sand/50 bg-parchment-warm hover:bg-white transition-all flex items-center space-x-3"
                      >
                        <img
                          src={artist.avatar}
                          alt={artist.name}
                          className="w-12 h-12 rounded-full object-cover border border-cream-gold"
                        />
                        <div>
                          <p className="font-display text-xs font-bold text-deep-brown">
                            {artist.stageName || artist.name}
                          </p>
                          <p className="text-[11px] text-terracotta">
                            {artist.experienceYears} Years of Practice • {artist.taluk}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-parchment-dark border-t border-warm-sand/30 flex items-center justify-between">
              <button
                onClick={() => setSelectedArtform(null)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-deep-brown hover:bg-white transition-colors"
              >
                Close Dossier
              </button>

              <button
                onClick={() => {
                  setSelectedArtform(null);
                  setActiveTab('artists');
                }}
                className="px-5 py-2 rounded-xl bg-traditional-red text-white text-xs font-semibold shadow hover:bg-traditional-red-dark transition-colors"
              >
                Find Artists Practicing This Artform
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

