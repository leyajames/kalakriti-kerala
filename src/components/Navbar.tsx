import React, { useState } from 'react';
import { useCultural } from '../context/CulturalContext';
import { 
  Compass, 
  MapPin, 
  Users, 
  Calendar, 
  Info, 
  PlusCircle, 
  Languages, 
  Menu, 
  X,
  Search,
  User,
  LogOut,
  Flame,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    language, 
    toggleLanguage, 
    activeTab, 
    setActiveTab, 
    setIsUploadModalOpen,
    setIsAuthModalOpen,
    setIsAboutModalOpen,
    user,
    setUser,
    searchQuery,
    setSearchQuery
  } = useCultural();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navLinks = [
    { id: 'home', labelEn: 'Home', labelMl: 'ഹോം' },
    { id: 'discover', labelEn: 'Explore', labelMl: 'കണ്ടെത്തുക' },
    { id: 'map', labelEn: 'Cultural Map', labelMl: 'ഭൂപടം' },
    { id: 'artists', labelEn: 'Artists', labelMl: 'കലാകാരന്മാർ' },
    { id: 'events', labelEn: 'Events', labelMl: 'ഉത്സവങ്ങൾ' },
    { id: 'community-showcase', labelEn: 'Showcase', labelMl: 'പ്രദർശനം' },
  ];

  const handleLogout = () => {
    setUser(null);
    try {
      localStorage.removeItem('kalakriti_user');
    } catch {}
  };

  return (
    <header className="sticky top-0 z-40 bg-parchment/95 backdrop-blur-md border-b border-warm-sand/30 shadow-soft transition-all">
      {/* Top Heritage Gold Bar */}
      <div className="h-1 bg-gradient-to-r from-traditional-red via-cream-gold to-terracotta" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* 1. KALAKRITI Logo Branding */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center space-x-3 cursor-pointer group select-none"
          >
            {/* Kerala Traditional Lamp Glyph with Gold Ring */}
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-deep-brown flex items-center justify-center border-2 border-cream-gold shadow-gold group-hover:scale-105 transition-transform duration-300 shrink-0">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 text-cream-gold" viewBox="0 0 100 100" fill="currentColor">
                <path d="M50 12 C52 24, 62 38, 50 56 C38 38, 48 24, 50 12 Z" fill="#ECCA8A" />
                <circle cx="50" cy="44" r="5" fill="#A71903" />
                <path d="M30 65 Q50 60 70 65 L64 74 Q50 71 36 74 Z" fill="#BB6D25" />
                <rect x="47" y="74" width="6" height="12" fill="#ECCA8A" />
                <path d="M25 86 L75 86 L68 94 L32 94 Z" fill="#432813" />
              </svg>
            </div>

            <div>
              <div className="flex items-baseline space-x-2">
                <span className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-deep-brown group-hover:text-traditional-red transition-colors">
                  KALAKRITI
                </span>
                <span className="font-malayalam text-sm sm:text-base font-semibold text-terracotta hidden xs:inline">
                  കലാകൃതി
                </span>
              </div>
              <p className="text-[10px] sm:text-xs tracking-wider uppercase text-olive-green font-medium -mt-0.5">
                {language === 'en' ? 'Discover. Preserve. Showcase.' : 'കണ്ടെത്തുക • സംരക്ഷിക്കുക • പ്രദർശിപ്പിക്കുക'}
              </p>
            </div>
          </div>

          {/* 2. Desktop Navigation Bar Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-deep-brown text-cream-gold shadow-sm font-semibold'
                      : 'text-deep-brown/85 hover:text-traditional-red hover:bg-parchment-dark/60'
                  }`}
                >
                  {language === 'en' ? item.labelEn : item.labelMl}
                </button>
              );
            })}

            {/* About Modal Trigger */}
            <button
              onClick={() => setIsAboutModalOpen(true)}
              className="px-3 py-2 rounded-lg text-xs sm:text-sm font-medium text-deep-brown/85 hover:text-traditional-red hover:bg-parchment-dark/60 transition-all"
            >
              {language === 'en' ? 'About' : 'വിവരണം'}
            </button>
          </nav>

          {/* 3. Action Buttons & Showcase CTA */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Quick Search Input */}
            <div className="relative">
              {isSearchOpen ? (
                <div className="flex items-center bg-white border border-warm-sand/50 rounded-full px-3 py-1 shadow-sm">
                  <Search className="w-3.5 h-3.5 text-warm-sand mr-2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={language === 'en' ? 'Search culture...' : 'തിരയുക...'}
                    className="w-28 sm:w-44 text-xs bg-transparent outline-none text-deep-brown placeholder-deep-brown/40"
                    autoFocus
                  />
                  <button 
                    onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                    className="text-xs text-deep-brown/50 hover:text-traditional-red ml-1"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-deep-brown/70 hover:text-traditional-red hover:bg-parchment-dark/60 rounded-full transition-colors"
                  title="Search"
                >
                  <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              )}
            </div>

            {/* Bilingual Switcher Pill */}
            <button
              onClick={toggleLanguage}
              className="hidden sm:flex items-center space-x-1 px-2.5 py-1.5 rounded-full border border-warm-sand/50 bg-white/70 hover:bg-white text-deep-brown text-xs font-semibold shadow-soft hover:border-terracotta transition-all"
              title="Toggle Language / ഭാഷ മാറ്റുക"
            >
              <Languages className="w-3.5 h-3.5 text-terracotta" />
              <span>{language === 'en' ? 'മലയാളം' : 'EN'}</span>
            </button>

            {/* Admin Console Shortcut (when role === 'admin') */}
            {user?.role === 'admin' && (
              <button
                onClick={() => setActiveTab('admin')}
                className={`hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-xs ${
                  activeTab === 'admin'
                    ? 'bg-deep-brown text-cream-gold border-cream-gold'
                    : 'bg-white text-deep-brown hover:bg-parchment-warm border-warm-sand/50'
                }`}
                title="Admin Moderation Console"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-traditional-red" />
                <span>Admin Console</span>
              </button>
            )}

            {/* Login / Sign Up Button */}
            {user ? (
              <div className="flex items-center space-x-2 bg-white/80 border border-warm-sand/40 px-2.5 py-1.5 rounded-xl text-xs">
                <span className="w-2 h-2 rounded-full bg-olive-green" />
                <span className="font-bold text-deep-brown truncate max-w-[80px] sm:max-w-[120px]">
                  {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-deep-brown/60 hover:text-traditional-red p-0.5"
                  title="Logout"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center space-x-1 px-3 py-2 rounded-xl text-xs font-bold text-deep-brown hover:text-traditional-red hover:bg-parchment-dark/60 transition-all border border-warm-sand/40"
              >
                <User className="w-3.5 h-3.5 text-terracotta" />
                <span>{language === 'en' ? 'Login / Sign Up' : 'ലോഗിൻ'}</span>
              </button>
            )}

            {/* Prominent "Showcase Your Work" Button */}
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="flex items-center space-x-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-traditional-red hover:bg-traditional-red-dark text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 border border-traditional-red-light shrink-0"
            >
              <PlusCircle className="w-4 h-4 text-cream-gold shrink-0" />
              <span className="whitespace-nowrap">{language === 'en' ? 'Showcase Your Work' : 'സൃഷ്ടികൾ പങ്കിടുക'}</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-deep-brown hover:bg-parchment-dark/80 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-parchment border-b border-warm-sand/40 px-4 pt-2 pb-6 space-y-2 shadow-lg animate-fadeIn">
          {navLinks.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-all ${
                  isActive
                    ? 'bg-deep-brown text-cream-gold font-semibold'
                    : 'text-deep-brown hover:bg-parchment-dark/70'
                }`}
              >
                <span>{language === 'en' ? item.labelEn : item.labelMl}</span>
                {isActive && <span className="w-2 h-2 rounded-full bg-cream-gold" />}
              </button>
            );
          })}

          {user?.role === 'admin' && (
            <button
              onClick={() => {
                setActiveTab('admin');
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-bold text-traditional-red bg-traditional-red/10 border border-traditional-red/30 transition-all"
            >
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-traditional-red" />
                <span>Admin Moderation Console</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-traditional-red" />
            </button>
          )}

          <button
            onClick={() => {
              setActiveTab('artist-dashboard');
              setIsMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium text-deep-brown hover:bg-parchment-dark/70 transition-all"
          >
            <span>{language === 'en' ? 'Artist Dashboard' : 'കലാകാരൻ ഡാഷ്‌ബോർഡ്'}</span>
            <Sparkles className="w-4 h-4 text-terracotta" />
          </button>

          <button
            onClick={() => {
              setIsAboutModalOpen(true);
              setIsMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium text-deep-brown hover:bg-parchment-dark/70 transition-all"
          >
            <span>{language === 'en' ? 'About KALAKRITI' : 'വിവരണം'}</span>
            <Info className="w-4 h-4 text-terracotta" />
          </button>

          <div className="pt-2 flex items-center justify-between border-t border-warm-sand/30">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-white border border-warm-sand/40 text-xs font-semibold text-deep-brown"
            >
              <Languages className="w-3.5 h-3.5 text-terracotta" />
              <span>{language === 'en' ? 'മലയാളത്തിലേക്ക് മാറ്റുക' : 'Switch to English'}</span>
            </button>

            {!user && (
              <button
                onClick={() => {
                  setIsAuthModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="px-4 py-2 rounded-lg bg-deep-brown text-cream-gold text-xs font-bold"
              >
                Login / Sign Up
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
