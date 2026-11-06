import React, { useState } from 'react';
import { useCultural } from '../context/CulturalContext';
import { CommunityCreation, Artist } from '../types';
import {
  Sparkles,
  Heart,
  MapPin,
  Search,
  Filter,
  PlusCircle,
  Eye,
  Maximize2,
  X,
  Share2,
  ExternalLink,
  ChevronRight,
  Layers,
  Award,
  CheckCircle,
  Tag
} from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

export const CommunityShowcase: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const {
    creations,
    toggleLikeCreation,
    artists,
    navigateToArtistProfile,
    setIsUploadModalOpen,
    setActiveTab,
    setCurrentDashboardArtistId,
    language
  } = useCultural();

  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedTaluk, setSelectedTaluk] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeLightboxCreation, setActiveLightboxCreation] = useState<CommunityCreation | null>(null);

  const categories = [
    'ALL',
    'Traditional Art',
    'Handicrafts',
    'Metal & Sculpture',
    'Woodcraft',
    'Performing Arts',
    'Photography'
  ];

  const taluks = ['ALL', 'Thrissur', 'Thalapilly', 'Mukundapuram', 'Chavakkad', 'Kodungallur', 'Chalakkudy'];

  // Filter creations
  const filteredCreations = creations.filter((item) => {
    const matchesSearch =
      item.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.titleMl.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.creatorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.medium.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'ALL' ||
      item.category.toLowerCase().includes(selectedCategory.toLowerCase());

    const matchesTaluk =
      selectedTaluk === 'ALL' ||
      item.location.toLowerCase().includes(selectedTaluk.toLowerCase());

    return matchesSearch && matchesCategory && matchesTaluk;
  });

  const handleOpenCreator = (creatorName: string, artistId?: string) => {
    let matchedArtist: Artist | undefined;
    if (artistId) {
      matchedArtist = artists.find((a) => a.id === artistId);
    }
    if (!matchedArtist) {
      matchedArtist = artists.find(
        (a) =>
          a.name.toLowerCase() === creatorName.toLowerCase() ||
          (a.stageName && a.stageName.toLowerCase() === creatorName.toLowerCase())
      );
    }

    if (matchedArtist) {
      navigateToArtistProfile(matchedArtist);
    } else {
      setActiveTab('artists');
    }
  };

  return (
    <div className="min-h-screen bg-parchment-texture pb-24 text-deep-brown selection:bg-cream-gold selection:text-deep-brown">
      
      {/* ========================================================
          1. EDITORIAL HEADER & HERO BANNER
         ======================================================== */}
      <section className="bg-white border-b border-warm-sand/40 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cream-gold/30 border border-cream-gold text-deep-brown text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-traditional-red" />
              <span>Living Heritage • Thrissur Artisan Guilds</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-deep-brown tracking-tight">
              {language === 'en' ? 'Community Showcase' : 'സമൂഹ കലാപ്രദർശനം'}
            </h1>

            <p className="text-xs sm:text-sm text-deep-brown/80 leading-relaxed">
              {language === 'en'
                ? 'An open, non-commercial digital pavilion celebrating generational masterpieces, sacred mural frescos, pit-loom Kasavu textiles, and bell-metal sculptures crafted by Thrissur’s local masters and community contributors.'
                : 'തൃശ്ശൂരിലെ പാരമ്പര്യ കലാകാരന്മാരുടെയും കരകൗശല വിദഗ്ധരുടെയും അതിവിശിഷ്ട സൃഷ്ടികൾ പ്രദർശിപ്പിക്കുന്ന പവിത്ര വേദി.'}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('artist-dashboard')}
              className="px-4 py-2.5 rounded-xl border border-warm-sand/60 bg-parchment-warm hover:bg-cream-gold/30 text-deep-brown text-xs font-bold transition-colors"
            >
              Artist Dashboard
            </button>

            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-traditional-red hover:bg-traditional-red-dark text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center space-x-2"
            >
              <PlusCircle className="w-4 h-4 text-cream-gold" />
              <span>Showcase Your Work</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. SEARCH & FILTER TOOLBAR
         ======================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-4">
        <div className="bg-white p-4 rounded-2xl border border-warm-sand/50 shadow-soft flex flex-col md:flex-row items-center gap-4">
          
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-sand" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                language === 'en'
                  ? 'Search by artwork title, master artisan, medium, or village...'
                  : 'കലാസൃഷ്ടികൾ, കലാകാരന്മാർ, മാധ്യമം തിരയുക...'
              }
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-parchment-warm text-xs text-deep-brown placeholder-deep-brown/50 outline-none border border-transparent focus:border-traditional-red transition-all"
            />
          </div>

          {/* Taluk Filter Dropdown */}
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <span className="text-xs font-bold text-deep-brown/70 shrink-0">Taluk:</span>
            <select
              value={selectedTaluk}
              onChange={(e) => setSelectedTaluk(e.target.value)}
              className="px-3 py-2 rounded-xl bg-parchment-warm border border-warm-sand/40 text-xs font-semibold text-deep-brown outline-none w-full md:w-auto"
            >
              {taluks.map((t) => (
                <option key={t} value={t}>
                  {t === 'ALL' ? 'All Taluks (എല്ലാ താലൂക്കുകളും)' : `${t} Taluk`}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-deep-brown text-cream-gold shadow-sm'
                  : 'bg-white hover:bg-parchment-warm text-deep-brown/75 border border-warm-sand/40'
              }`}
            >
              {cat === 'ALL' ? 'All Categories' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================
          3. ELEGANT GALLERY LAYOUT (LARGE IMAGES MASONRY/EDITORIAL)
         ======================================================== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {filteredCreations.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-warm-sand/50 shadow-soft space-y-4">
            <div className="w-16 h-16 rounded-full bg-parchment-warm text-terracotta flex items-center justify-center mx-auto">
              <Layers className="w-8 h-8" />
            </div>
            <h3 className="font-display text-xl font-bold text-deep-brown">
              No creations found for this filter
            </h3>
            <p className="text-xs text-deep-brown/70 max-w-sm mx-auto">
              Try adjusting your category or search term, or be the first to showcase your artwork in this category.
            </p>
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-traditional-red hover:bg-traditional-red-dark text-white text-xs font-bold shadow transition-all inline-flex items-center space-x-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Submit Artwork Now</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCreations.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                whileHover={shouldReduceMotion ? {} : { y: -6 }}
                className="group rounded-3xl overflow-hidden bg-white border border-warm-sand/40 shadow-soft hover:shadow-cultural transition-all duration-300 flex flex-col justify-between"
              >
                {/* Large Cultural Photograph */}
                <div 
                  className="relative h-72 sm:h-80 overflow-hidden bg-deep-brown cursor-pointer"
                  onClick={() => setActiveLightboxCreation(item)}
                >
                  <img
                    src={item.image}
                    alt={item.titleEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-brown via-deep-brown/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Top Category & Location Chips */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full bg-deep-brown/85 backdrop-blur-md text-cream-gold text-[10px] font-bold border border-cream-gold/30 uppercase tracking-wider">
                      {item.category}
                    </span>

                    <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-medium border border-white/20 flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-cream-gold" />
                      <span>{item.location}</span>
                    </span>
                  </div>

                  {/* Fullscreen Preview Hover Trigger */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveLightboxCreation(item);
                      }}
                      className="p-2.5 rounded-full bg-cream-gold text-deep-brown shadow-lg hover:scale-110 transition-transform"
                      title="Enlarge photograph"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Title Overlay over image */}
                  <div className="absolute bottom-4 left-4 right-16 text-white space-y-0.5">
                    <h3 className="font-display text-xl font-bold leading-snug drop-shadow">
                      {language === 'en' ? item.titleEn : item.titleMl}
                    </h3>
                    <p className="font-malayalam text-xs text-parchment-warm drop-shadow">
                      {language === 'en' ? item.titleMl : item.titleEn}
                    </p>
                  </div>
                </div>

                {/* Editorial Body Details */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    
                    {/* Creator Row */}
                    <div className="flex items-center justify-between border-b border-warm-sand/30 pb-3">
                      <div>
                        <span className="text-[10px] text-terracotta uppercase font-bold tracking-wider block">
                          Master Artisan / Creator
                        </span>
                        <button
                          onClick={() => handleOpenCreator(item.creatorName, item.artistId)}
                          className="font-display text-base font-bold text-deep-brown hover:text-traditional-red transition-colors text-left flex items-center space-x-1"
                        >
                          <span>{item.creatorName}</span>
                          <ChevronRight className="w-3.5 h-3.5 text-terracotta" />
                        </button>
                        <p className="text-[11px] text-deep-brown/70">{item.creatorRole}</p>
                      </div>

                      {item.price && (
                        <div className="text-right">
                          <span className="text-[10px] text-deep-brown/60 uppercase font-semibold block">
                            Valuation
                          </span>
                          <span className="font-mono text-xs font-bold text-terracotta">
                            {item.price}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Medium & Technique description */}
                    <p className="text-xs text-deep-brown/80 leading-relaxed line-clamp-3">
                      {item.descriptionEn || `Handcrafted in ${item.location} using ${item.medium}. Preserves authentic Kerala temple arts standards.`}
                    </p>

                    <div className="p-2.5 rounded-xl bg-parchment-warm/80 border border-warm-sand/30 text-[11px] text-deep-brown/70 flex items-center space-x-1.5">
                      <Tag className="w-3.5 h-3.5 text-olive-green shrink-0" />
                      <span className="truncate"><strong>Medium:</strong> {item.medium}</span>
                    </div>

                  </div>

                  {/* Card Bottom: Appreciation Heart & Inquiry */}
                  <div className="pt-3 border-t border-warm-sand/30 flex items-center justify-between">
                    <button
                      onClick={() => toggleLikeCreation(item.id)}
                      className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-parchment-warm hover:bg-red-50 text-deep-brown text-xs font-semibold transition-colors group/btn"
                    >
                      <Heart className="w-4 h-4 text-traditional-red fill-traditional-red group-hover/btn:scale-110 transition-transform" />
                      <span className="font-mono font-bold">{item.likes}</span>
                    </button>

                    <button
                      onClick={() => handleOpenCreator(item.creatorName, item.artistId)}
                      className="px-3.5 py-1.5 rounded-xl bg-deep-brown hover:bg-traditional-red text-cream-gold text-xs font-bold shadow-xs transition-colors flex items-center space-x-1"
                    >
                      <span>Creator Dossier</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        )}

      </main>

      {/* ========================================================
          LIGHTBOX MODAL FOR LARGE IMAGES
         ======================================================== */}
      <AnimatePresence>
        {activeLightboxCreation && (
          <div 
            role="dialog"
            aria-modal="true"
            aria-labelledby="lightbox-creation-title"
            className="fixed inset-0 z-70 bg-deep-brown/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 select-none"
          >
            <motion.div 
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-cultural border-2 border-cream-gold my-6"
            >
              
              <div className="relative h-80 sm:h-[450px] bg-deep-brown overflow-hidden">
                <img
                  src={activeLightboxCreation.image}
                  alt={activeLightboxCreation.titleEn}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-brown via-transparent to-transparent opacity-80" />

                <button
                  onClick={() => setActiveLightboxCreation(null)}
                  aria-label="Close enlarged view"
                  className="absolute top-4 right-4 p-2 rounded-full bg-deep-brown/80 text-cream-gold hover:bg-traditional-red transition-colors z-10"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-cream-gold text-deep-brown text-xs font-bold">
                    {activeLightboxCreation.category}
                  </span>
                  <h3 id="lightbox-creation-title" className="font-display text-2xl sm:text-3xl font-bold">
                    {language === 'en' ? activeLightboxCreation.titleEn : activeLightboxCreation.titleMl}
                  </h3>
                  <p className="text-xs text-parchment-warm">
                    Master: {activeLightboxCreation.creatorName} • {activeLightboxCreation.location}
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-4 max-h-[40vh] overflow-y-auto text-xs sm:text-sm text-deep-brown/85">
                <p className="leading-relaxed">
                  {activeLightboxCreation.descriptionEn || `Handcrafted creation presented on KALAKRITI Community Showcase.`}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-parchment-warm p-4 rounded-xl border border-warm-sand/40 text-xs">
                  <div>
                    <span className="text-[10px] text-deep-brown/60 uppercase font-bold block">Medium</span>
                    <span className="font-semibold text-deep-brown">{activeLightboxCreation.medium}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-deep-brown/60 uppercase font-bold block">Location</span>
                    <span className="font-semibold text-deep-brown">{activeLightboxCreation.location}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-deep-brown/60 uppercase font-bold block">Estimated Value</span>
                    <span className="font-bold text-terracotta">{activeLightboxCreation.price || 'Inquiry'}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-parchment-dark border-t border-warm-sand/30 flex items-center justify-between">
                <button
                  onClick={() => setActiveLightboxCreation(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-deep-brown hover:bg-white"
                >
                  Close View
                </button>

                <button
                  onClick={() => {
                    const creator = activeLightboxCreation.creatorName;
                    const artistId = activeLightboxCreation.artistId;
                    setActiveLightboxCreation(null);
                    handleOpenCreator(creator, artistId);
                  }}
                  className="px-5 py-2 rounded-xl bg-traditional-red hover:bg-traditional-red-dark text-white text-xs font-bold shadow flex items-center space-x-1.5"
                >
                  <span>View Master's Public Profile</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

