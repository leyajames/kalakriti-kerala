import React, { useState } from 'react';
import { useCultural } from '../context/CulturalContext';
import { HeritageLocation } from '../types';
import { 
  Landmark, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Volume2, 
  VolumeX, 
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';

export const HeritageExplorer: React.FC = () => {
  const { 
    language, 
    heritageLocations, 
    setActiveTab, 
    selectedHeritage, 
    setSelectedHeritage,
    audioPlayingUrl,
    toggleAudio
  } = useCultural();

  const [activeSite, setActiveSite] = useState<HeritageLocation>(
    selectedHeritage || heritageLocations[0]
  );

  return (
    <section className="py-12 bg-parchment-texture min-h-[calc(100vh-80px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Editorial Header */}
        <div className="space-y-3 max-w-3xl">
          <span className="text-terracotta font-heading tracking-widest uppercase text-xs font-semibold">
            {language === 'en' ? 'Sacred Architecture • Monumental Sanctuaries' : 'പുരാതന വാസ്തുവിദ്യ & പൈതൃകം'}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-deep-brown">
            {language === 'en' ? 'Heritage Locations & Audio Trails' : 'പൈതൃക കേന്ദ്രങ്ങളും ശബ്ദവഴികളും'}
          </h2>
          <p className="text-sm sm:text-base text-deep-brown/80 leading-relaxed">
            {language === 'en'
              ? 'Traverse the 1,000-year-old wooden gopurams of Vadakkunnathan, the royal court of Shakthan Thampuran, the Nila Gurukulam of Kalamandalam, and Asia’s tallest church spires.'
              : 'വടക്കുന്നാഥന്റെ പൗരാണിക വാസ്തുവിദ്യ, ശക്തൻ തമ്പുരാന്റെ കൊട്ടാരം, ഭാരതപ്പുഴയുടെ തീരത്തെ കലാമണ്ഡലം എന്നിവയുടെ ചരിത്ര രഹസ്യങ്ങളിലേക്ക്.'}
          </p>
        </div>

        {/* Selected Heritage Spot Master Showcase Card */}
        {activeSite && (
          <div className="rounded-2xl overflow-hidden border-2 border-cream-gold shadow-cultural bg-white">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              
              {/* Left Column: Big Cultural Photo */}
              <div className="lg:col-span-6 relative h-80 sm:h-96 lg:h-auto overflow-hidden">
                <img
                  src={activeSite.image}
                  alt={activeSite.nameEn}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-brown via-deep-brown/20 to-transparent" />

                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-deep-brown/90 text-cream-gold text-xs font-bold border border-cream-gold/40">
                    🏛️ {activeSite.category}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-xs uppercase font-semibold tracking-wider text-cream-gold">
                    {activeSite.historicalEra}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold">
                    {language === 'en' ? activeSite.nameEn : activeSite.nameMl}
                  </h3>
                  <p className="text-xs text-parchment-warm flex items-center space-x-1 mt-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{activeSite.address}</span>
                  </p>
                </div>
              </div>

              {/* Right Column: Deep Architectural Insights & Guidelines */}
              <div className="lg:col-span-6 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
                
                <div className="space-y-4">
                  
                  {/* Audio Guide Player Simulation */}
                  {activeSite.audioGuideAvailable && (
                    <div className="bg-parchment-warm p-4 rounded-xl border border-warm-sand/40 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => toggleAudio(activeSite.id)}
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                            audioPlayingUrl === activeSite.id
                              ? 'bg-traditional-red text-white animate-pulse'
                              : 'bg-deep-brown text-cream-gold hover:bg-traditional-red'
                          }`}
                        >
                          {audioPlayingUrl === activeSite.id ? (
                            <VolumeX className="w-5 h-5" />
                          ) : (
                            <Volume2 className="w-5 h-5" />
                          )}
                        </button>
                        <div>
                          <p className="text-xs font-bold text-deep-brown">
                            {language === 'en' ? 'Spoken Heritage Guide' : 'ശബ്ദ വിവരണം'}
                          </p>
                          <p className="text-[11px] text-terracotta">
                            {activeSite.audioGuideTitle || 'Audio narration of history and murals'}
                          </p>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-olive-green">
                        {audioPlayingUrl === activeSite.id ? 'Playing • 3:45' : '4 mins'}
                      </span>
                    </div>
                  )}

                  {/* Descriptions */}
                  <p className="text-sm text-deep-brown/85 leading-relaxed">
                    {language === 'en' ? activeSite.descriptionEn : activeSite.descriptionMl}
                  </p>

                  {/* Architecture & Era Badges */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3 rounded-lg bg-parchment-dark/60 text-xs">
                      <span className="font-bold text-olive-green block text-[10px] uppercase">
                        Architectural Style:
                      </span>
                      <span className="text-deep-brown font-medium">
                        {activeSite.architecturalStyle}
                      </span>
                    </div>

                    <div className="p-3 rounded-lg bg-parchment-dark/60 text-xs">
                      <span className="font-bold text-olive-green block text-[10px] uppercase">
                        Visiting Hours:
                      </span>
                      <span className="text-deep-brown font-medium">
                        {activeSite.visitingHours}
                      </span>
                    </div>
                  </div>

                  {/* Dress Code & Sacred Guidelines */}
                  {activeSite.entryRulesDressCode && (
                    <div className="p-3 rounded-lg bg-cream-gold/20 border border-cream-gold/40 text-xs text-deep-brown space-y-1">
                      <span className="font-bold flex items-center space-x-1 text-terracotta text-[11px]">
                        <Info className="w-3.5 h-3.5" />
                        <span>{language === 'en' ? 'Dress Code & Visiting Guidelines:' : 'വസ്ത്രധാരണ രീതി & മാർഗ്ഗനിർദ്ദേശങ്ങൾ:'}</span>
                      </span>
                      <p className="text-[11px] leading-relaxed">
                        {activeSite.entryRulesDressCode}
                      </p>
                    </div>
                  )}

                </div>

                {/* Footer Buttons */}
                <div className="pt-4 border-t border-warm-sand/30 flex items-center justify-between">
                  <span className="text-xs font-semibold text-olive-green">
                    Taluk: {activeSite.taluk}
                  </span>

                  <button
                    onClick={() => setActiveTab('map')}
                    className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-traditional-red hover:bg-traditional-red-dark text-white text-xs font-semibold shadow transition-colors"
                  >
                    <MapPin className="w-3.5 h-3.5 text-cream-gold" />
                    <span>{language === 'en' ? 'Open in Map View' : 'ഭൂപടത്തിൽ തുറക്കുക'}</span>
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* Thumbnail Selector Strip for All Heritage Sites */}
        <div className="space-y-4 pt-4">
          <h4 className="font-heading text-lg font-bold text-deep-brown border-b border-warm-sand/30 pb-2">
            {language === 'en' ? 'Select Landmark to Inspect' : 'മറ്റ് പൈതൃക കേന്ദ്രങ്ങൾ'}
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {heritageLocations.map((site) => (
              <div
                key={site.id}
                onClick={() => setActiveSite(site)}
                className={`cursor-pointer rounded-xl overflow-hidden border p-3 flex items-center space-x-3 transition-all ${
                  activeSite.id === site.id
                    ? 'border-traditional-red bg-white shadow-md ring-2 ring-traditional-red/20'
                    : 'border-warm-sand/40 bg-white/70 hover:bg-white'
                }`}
              >
                <img
                  src={site.image}
                  alt={site.nameEn}
                  className="w-16 h-16 rounded-lg object-cover shrink-0"
                />
                <div className="min-w-0">
                  <h5 className="font-display text-xs font-bold text-deep-brown truncate">
                    {language === 'en' ? site.nameEn : site.nameMl}
                  </h5>
                  <p className="text-[10px] text-terracotta font-semibold truncate">
                    {site.category} • {site.taluk}
                  </p>
                  <p className="text-[10px] text-olive-green line-clamp-1 mt-0.5">
                    {site.historicalEra}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

