import React from 'react';
import { useCultural } from '../context/CulturalContext';
import { 
  X, 
  Landmark, 
  Sparkles, 
  ShieldCheck, 
  Heart, 
  MapPin, 
  Flame,
  Award
} from 'lucide-react';

export const AboutModal: React.FC = () => {
  const { isAboutModalOpen, setIsAboutModalOpen, language } = useCultural();

  if (!isAboutModalOpen) return null;

  return (
    <div className="fixed inset-0 z-60 overflow-y-auto bg-deep-brown/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-cultural border-2 border-cream-gold my-6">
        
        {/* Top Trim */}
        <div className="h-1.5 bg-gradient-to-r from-traditional-red via-cream-gold to-terracotta" />

        {/* Header */}
        <div className="p-6 bg-parchment-warm border-b border-warm-sand/30 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-deep-brown text-cream-gold flex items-center justify-center border border-cream-gold shadow-sm">
              <Flame className="w-5 h-5 text-cream-gold" />
            </div>
            <div>
              <span className="text-terracotta font-heading uppercase tracking-wider text-[10px] font-bold">
                About The Sanctuary
              </span>
              <h3 className="font-display text-xl font-bold text-deep-brown">
                KALAKRITI • കലാകൃതി
              </h3>
            </div>
          </div>

          <button
            onClick={() => setIsAboutModalOpen(false)}
            className="p-1.5 rounded-full hover:bg-white text-deep-brown/60 hover:text-traditional-red transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto text-xs sm:text-sm text-deep-brown/85 leading-relaxed">
          
          <div className="space-y-2">
            <h4 className="font-display text-lg font-bold text-deep-brown">
              {language === 'en' ? 'The Cultural Capital of Kerala' : 'കേരളത്തിന്റെ സാംസ്കാരിക തലസ്ഥാനം'}
            </h4>
            <p>
              {language === 'en'
                ? 'Thrissur (Historically Thrishivaperur) is not merely a geographic district; it is the living artistic soul of Kerala. It houses the apex cultural academies—Kerala Kalamandalam at Cheruthuruthy, Kerala Sangeetha Nataka Akademi, Kerala Lalithakala Akademi, and Kerala Sahitya Akademi.'
                : 'കേരള കലാമണ്ഡലം, സംഗീത നാടക അക്കാദമി, ലളിതകലാ അക്കാദമി, സാഹിത്യ അക്കാദമി എന്നീ പ്രമുഖ സാംസ്കാരിക കേന്ദ്രങ്ങളുടെ തട്ടകമാണ് തൃശ്ശൂർ.'}
            </p>
          </div>

          {/* Three Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-parchment-warm border border-warm-sand/30 space-y-1">
              <div className="w-7 h-7 rounded-lg bg-traditional-red/10 text-traditional-red flex items-center justify-center font-bold">
                1
              </div>
              <h5 className="font-display text-xs font-bold text-deep-brown">Discover</h5>
              <p className="text-[11px] text-deep-brown/70">
                Interactive geospatial discovery of heritage temples, hidden artisan workshops, and live poorams.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-parchment-warm border border-warm-sand/30 space-y-1">
              <div className="w-7 h-7 rounded-lg bg-terracotta/10 text-terracotta flex items-center justify-center font-bold">
                2
              </div>
              <h5 className="font-display text-xs font-bold text-deep-brown">Preserve</h5>
              <p className="text-[11px] text-deep-brown/70">
                Bilingual living archive recording oral histories, Guru paramparas, and rare ritual crafts.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-parchment-warm border border-warm-sand/30 space-y-1">
              <div className="w-7 h-7 rounded-lg bg-olive-green/10 text-olive-green flex items-center justify-center font-bold">
                3
              </div>
              <h5 className="font-display text-xs font-bold text-deep-brown">Showcase</h5>
              <p className="text-[11px] text-deep-brown/70">
                Empowering master weavers, bronze sculptors, and performers with zero-commission direct inquiries.
              </p>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-warm-sand/30">
            <h4 className="font-display text-base font-bold text-deep-brown">
              Zero Intermediary Exploitation
            </h4>
            <p className="text-xs text-deep-brown/80">
              Unlike commercial booking aggregators, KALAKRITI charges zero commission on artwork sales, festival bookings, or masterclasses. Inquiries are transferred directly to the artisan's verified WhatsApp and phone numbers.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-cream-gold/20 border border-cream-gold/50 flex items-center space-x-3 text-xs">
            <ShieldCheck className="w-8 h-8 text-traditional-red shrink-0" />
            <div>
              <p className="font-bold text-deep-brown">Cultural Sanctity & Curation</p>
              <p className="text-[11px] text-deep-brown/70">
                Managed in collaboration with local historians, Kalamandalam alumni, and craft guild elders.
              </p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-parchment-dark border-t border-warm-sand/30 flex justify-end">
          <button
            onClick={() => setIsAboutModalOpen(false)}
            className="px-5 py-2 rounded-xl bg-deep-brown hover:bg-traditional-red text-cream-gold text-xs font-bold transition-colors"
          >
            Close Overview
          </button>
        </div>

      </div>
    </div>
  );
};

