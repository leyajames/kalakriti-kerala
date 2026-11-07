import React, { useState } from 'react';
import { useCultural } from '../context/CulturalContext';
import { 
  Compass, 
  MapPin, 
  Heart, 
  Sparkles, 
  ExternalLink,
  ShieldCheck,
  Flame,
  Mail,
  Phone,
  Instagram,
  Youtube,
  Facebook,
  MessageCircle,
  X
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, setActiveTab, setIsAboutModalOpen } = useCultural();
  const [policyType, setPolicyType] = useState<'PRIVACY' | 'TERMS' | null>(null);

  return (
    <footer className="bg-deep-brown text-parchment-warm border-t border-cream-gold/40 relative overflow-hidden pb-16 lg:pb-0">
      
      {/* Top Gold Gradient Trim */}
      <div className="h-1 bg-gradient-to-r from-traditional-red via-cream-gold to-terracotta" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-white/10">
          
          {/* 1. Brand & About Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-cream-gold/20 flex items-center justify-center border border-cream-gold">
                <Flame className="w-6 h-6 text-cream-gold" />
              </div>
              <div>
                <span className="font-display text-2xl font-bold tracking-tight text-cream-gold">
                  KALAKRITI
                </span>
                <span className="font-malayalam text-base font-semibold text-warm-sand ml-2">
                  കലാകൃതി
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-parchment-warm/80 leading-relaxed max-w-sm">
              {language === 'en'
                ? 'A community-driven digital cultural sanctuary safeguarding the oral traditions, master craftsmen, temple percussionists, and sacred monuments of Thrissur District, Kerala.'
                : 'തൃശ്ശൂരിന്റെ സമ്പന്നമായ പാരമ്പര്യ കലകളെയും കലാകാരന്മാരെയും പുതിയ തലമുറയ്ക്ക് മുന്നിൽ അടയാളപ്പെടുത്തുന്ന സാംസ്കാരിക കൂട്ടായ്മ.'}
            </p>

            {/* Social Links */}
            <div className="pt-2 space-y-2">
              <span className="text-[11px] font-bold text-cream-gold uppercase tracking-wider block">
                Connect with our Cultural Community:
              </span>
              <div className="flex items-center space-x-3">
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-traditional-red flex items-center justify-center text-cream-gold hover:text-white transition-colors"
                  title="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-traditional-red flex items-center justify-center text-cream-gold hover:text-white transition-colors"
                  title="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-traditional-red flex items-center justify-center text-cream-gold hover:text-white transition-colors"
                  title="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a 
                  href="https://whatsapp.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#25D366] flex items-center justify-center text-cream-gold hover:text-white transition-colors"
                  title="WhatsApp Community"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* 2. Quick Portals */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-bold text-cream-gold uppercase tracking-wider">
              {language === 'en' ? 'Cultural Portals' : 'പ്രധാന ലിങ്കുകൾ'}
            </h4>
            <ul className="space-y-2 text-xs text-parchment-warm/80">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-cream-gold transition-colors">
                  Home (ഹോം)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('discover')} className="hover:text-cream-gold transition-colors">
                  Explore Traditions (കണ്ടെത്തുക)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('map')} className="hover:text-cream-gold transition-colors">
                  Cultural Map (പൈതൃക ഭൂപടം)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('artists')} className="hover:text-cream-gold transition-colors">
                  Artists & Masters (കലാകാരന്മാർ)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('events')} className="hover:text-cream-gold transition-colors">
                  Thrissur Pooram 2026 Timetable
                </button>
              </li>
              <li>
                <button onClick={() => setIsAboutModalOpen(true)} className="hover:text-cream-gold transition-colors text-terracotta-light font-bold">
                  About KALAKRITI (വിവരണം)
                </button>
              </li>
            </ul>
          </div>

          {/* 3. Cultural Institutions of Thrissur */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-bold text-cream-gold uppercase tracking-wider">
              {language === 'en' ? 'Apex Academies' : 'അക്കാദമികൾ'}
            </h4>
            <ul className="space-y-2 text-xs text-parchment-warm/80">
              <li>Kerala Kalamandalam (Cheruthuruthy)</li>
              <li>Kerala Sangeetha Nataka Akademi</li>
              <li>Kerala Lalithakala Akademi</li>
              <li>Kerala Sahitya Akademi</li>
              <li>Guruvayur Mural Painting Institute</li>
            </ul>
          </div>

          {/* 4. Contact & Headquarters Column */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-bold text-cream-gold uppercase tracking-wider">
              {language === 'en' ? 'Contact & Headquarters' : 'ബന്ധപ്പെടുക'}
            </h4>
            <div className="space-y-2.5 text-xs text-parchment-warm/80">
              <p className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-traditional-red shrink-0 mt-0.5" />
                <span>Thekkinkadu Maidan, Swaraj Round, Thrissur 680001, Kerala</span>
              </p>
              <p className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-cream-gold shrink-0" />
                <span>+91 487 233 1122 / +91 94470 12345</span>
              </p>
              <p className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-terracotta shrink-0" />
                <span>desk@kalakriti-thrissur.org</span>
              </p>
            </div>

            <div className="pt-2">
              <span className="text-[10px] text-warm-sand block uppercase font-bold tracking-wider">
                Geospatial Coordinates:
              </span>
              <p className="text-[11px] text-cream-gold/90 font-mono">
                10.5244° N, 76.2144° E
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright, Terms & Privacy */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-parchment-warm/70 gap-4 text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} KALAKRITI (കലാരീതി) – Discover. Preserve. Showcase. All traditional cultural documentation preserved under Creative Commons (CC BY-NC 4.0).
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-4 gap-y-2 text-xs shrink-0">
            <button 
              onClick={() => setPolicyType('PRIVACY')} 
              className="hover:text-cream-gold transition-colors underline"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button 
              onClick={() => setPolicyType('TERMS')} 
              className="hover:text-cream-gold transition-colors underline"
            >
              Terms of Service
            </button>
            <span>•</span>
            <button 
              onClick={() => setActiveTab('admin')} 
              className="hover:text-cream-gold flex items-center space-x-1 font-semibold text-cream-gold/90 hover:text-cream-gold"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-cream-gold" />
              <span>Admin & Curator Console</span>
            </button>
          </div>
        </div>
      </div>

      {/* Privacy Policy & Terms Modal */}
      {policyType && (
        <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-sm flex items-start sm:items-center justify-center p-3 sm:p-4 animate-fadeIn text-deep-brown overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-6 space-y-4 border border-cream-gold shadow-2xl my-auto my-3 sm:my-6">
            <div className="flex items-center justify-between border-b border-warm-sand/30 pb-3">
              <h3 className="font-display text-lg font-bold">
                {policyType === 'PRIVACY' ? 'Privacy & Data Protection' : 'Terms of Cultural Service'}
              </h3>
              <button 
                onClick={() => setPolicyType(null)}
                className="p-1 rounded-full hover:bg-parchment-warm"
              >
                <X className="w-5 h-5 text-deep-brown/60" />
              </button>
            </div>

            <div className="text-xs text-deep-brown/80 space-y-3 max-h-80 overflow-y-auto leading-relaxed">
              {policyType === 'PRIVACY' ? (
                <>
                  <p>
                    <strong>1. Direct Communication Privacy:</strong> KALAKRITI connects patrons directly with artisans. Phone numbers and WhatsApp links are displayed only with explicit artisan consent to foster direct economic opportunities.
                  </p>
                  <p>
                    <strong>2. Zero Commercial Tracking:</strong> We do not sell user data, browsing habits, or artisan inquiries to commercial ad brokers.
                  </p>
                  <p>
                    <strong>3. Data Protection Act (DPDP 2023):</strong> User profiles and phone numbers are securely guarded following Indian data regulations.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>1. Zero Platform Commission:</strong> KALAKRITI is an autonomous cultural preservation platform. 100% of performance fees and craft sales remain with the artisan.
                  </p>
                  <p>
                    <strong>2. Cultural Sanctity & Moderation:</strong> All artwork submissions, descriptions, and festival updates are moderated by cultural curators to prevent misrepresentation of traditional sacred forms.
                  </p>
                  <p>
                    <strong>3. Copyright & Intellectual Property:</strong> Master artisans retain full intellectual rights to their designs, mudras, and musical compositions.
                  </p>
                </>
              )}
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setPolicyType(null)}
                className="px-4 py-2 rounded-xl bg-deep-brown text-cream-gold text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </footer>
  );
};
