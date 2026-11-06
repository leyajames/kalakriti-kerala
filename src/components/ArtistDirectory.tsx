import React, { useState } from 'react';
import { useCultural } from '../context/CulturalContext';
import { 
  Award, 
  MapPin, 
  Phone, 
  Sparkles, 
  PlusCircle, 
  ArrowRight, 
  ShieldCheck,
  Calendar,
  Layers
} from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

export const ArtistDirectory: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const { 
    language, 
    artists, 
    setSelectedArtist, 
    setInquiryArtist, 
    setIsUploadModalOpen,
    searchQuery 
  } = useCultural();

  const [selectedArtformFilter, setSelectedArtformFilter] = useState<string>('ALL');
  const [selectedTalukFilter, setSelectedTalukFilter] = useState<string>('ALL');

  const filteredArtists = artists.filter(artist => {
    const matchesSearch = 
      artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (artist.stageName && artist.stageName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      artist.primaryArtformName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.taluk.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesArtform = 
      selectedArtformFilter === 'ALL' || artist.primaryArtformId === selectedArtformFilter;

    const matchesTaluk = 
      selectedTalukFilter === 'ALL' || artist.taluk === selectedTalukFilter;

    return matchesSearch && matchesArtform && matchesTaluk;
  });

  return (
    <section className="py-12 bg-parchment-texture min-h-[calc(100vh-80px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-warm-sand/30 pb-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-terracotta font-heading tracking-widest uppercase text-xs font-semibold">
              {language === 'en' ? 'Living Custodians • Thrissur District' : 'പാരമ്പര്യ ഗുരുക്കന്മാരും ശിൽപികളും'}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-deep-brown">
              {language === 'en' ? 'Artisans & Performing Masters' : 'പ്രമുഖ കലാകാരന്മാരും കരകൗശല വിദഗ്ധരും'}
            </h2>
            <p className="text-sm text-deep-brown/80">
              {language === 'en'
                ? 'Directly connect with generational craftsmen, Melam conductors, and classical dancers without intermediaries. Inquire for festival performances, custom craft commissions, and workshops.'
                : 'ഇടനിലക്കാരില്ലാതെ പാരമ്പര്യ കലാകാരന്മാരെ നേരിട്ട് കണ്ടെത്താം. ക്ഷേത്ര ഉത്സവങ്ങൾക്കും പരിപാടികൾക്കും കരകൗശല ഉൽപ്പന്നങ്ങൾക്കും നേരിട്ട് ബന്ധപ്പെടാം.'}
            </p>
          </div>

          {/* Join as Artist CTA Banner */}
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-traditional-red hover:bg-traditional-red-dark text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all self-start md:self-auto shrink-0"
          >
            <PlusCircle className="w-4 h-4 text-cream-gold" />
            <span>{language === 'en' ? 'Create Artist Profile & Showcase' : 'കലാകാരനായി ചേരുക'}</span>
          </button>
        </div>

        {/* Filters Strip */}
        <div className="flex flex-wrap items-center gap-3 bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-warm-sand/40">
          <span className="text-xs font-bold text-olive-green uppercase tracking-wider">
            {language === 'en' ? 'Filter By:' : 'തിരഞ്ഞെടുക്കുക:'}
          </span>

          {/* Taluk Filter */}
          <select
            value={selectedTalukFilter}
            onChange={(e) => setSelectedTalukFilter(e.target.value)}
            className="bg-white border border-warm-sand/50 text-deep-brown rounded-lg px-3 py-1.5 text-xs font-medium outline-none focus:border-terracotta shadow-sm"
          >
            <option value="ALL">{language === 'en' ? 'All Taluks (എല്ലാ താലൂക്കുകളും)' : 'എല്ലാ താലൂക്കുകളും'}</option>
            <option value="Thrissur">Thrissur (തൃശ്ശൂർ)</option>
            <option value="Thalapilly">Thalapilly / Cheruthuruthy (തലപ്പിള്ളി)</option>
            <option value="Mukundapuram">Mukundapuram / Irinjalakuda (മുകുന്ദപുരം)</option>
            <option value="Chavakkad">Chavakkad / Guruvayur (ചാവക്കാട്)</option>
          </select>

          {/* Artform Category Pills */}
          <button
            onClick={() => setSelectedArtformFilter('ALL')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
              selectedArtformFilter === 'ALL'
                ? 'bg-deep-brown text-cream-gold'
                : 'bg-white text-deep-brown/80 hover:bg-parchment-warm border border-warm-sand/40'
            }`}
          >
            {language === 'en' ? 'All Disciplines' : 'എല്ലാ ശാഖകളും'}
          </button>

          <button
            onClick={() => setSelectedArtformFilter('art-melam')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
              selectedArtformFilter === 'art-melam'
                ? 'bg-deep-brown text-cream-gold'
                : 'bg-white text-deep-brown/80 hover:bg-parchment-warm border border-warm-sand/40'
            }`}
          >
            Chenda & Melam
          </button>

          <button
            onClick={() => setSelectedArtformFilter('art-koodiyattam')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
              selectedArtformFilter === 'art-koodiyattam'
                ? 'bg-deep-brown text-cream-gold'
                : 'bg-white text-deep-brown/80 hover:bg-parchment-warm border border-warm-sand/40'
            }`}
          >
            Koodiyattam
          </button>

          <button
            onClick={() => setSelectedArtformFilter('art-kuthampully')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
              selectedArtformFilter === 'art-kuthampully'
                ? 'bg-deep-brown text-cream-gold'
                : 'bg-white text-deep-brown/80 hover:bg-parchment-warm border border-warm-sand/40'
            }`}
          >
            Kuthampully Handloom
          </button>

          <button
            onClick={() => setSelectedArtformFilter('art-nadavaramba')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
              selectedArtformFilter === 'art-nadavaramba'
                ? 'bg-deep-brown text-cream-gold'
                : 'bg-white text-deep-brown/80 hover:bg-parchment-warm border border-warm-sand/40'
            }`}
          >
            Nadavaramba Bronze
          </button>
        </div>

        {/* Artists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArtists.map((artist) => {
            const featuredWork = artist.artworks && artist.artworks.length > 0 ? artist.artworks[0] : null;

            return (
              <motion.div
                key={artist.id}
                layout
                whileHover={shouldReduceMotion ? {} : { y: -6 }}
                className="group rounded-2xl overflow-hidden bg-white border border-warm-sand/40 shadow-soft hover:shadow-cultural transition-all duration-300 flex flex-col justify-between"
              >
                {/* Artwork / Performance Banner Preview */}
                <div 
                  onClick={() => setSelectedArtist(artist)}
                  className="relative h-56 cursor-pointer overflow-hidden bg-deep-brown"
                >
                  <img
                    src={featuredWork ? featuredWork.images[0] : artist.avatar}
                    alt={artist.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-brown via-deep-brown/20 to-transparent" />

                  {/* Top Badges: Verification & Experience */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {artist.isVerified && (
                      <span className="px-2.5 py-0.5 rounded-full bg-deep-brown/90 backdrop-blur-sm text-cream-gold text-[10px] font-bold border border-cream-gold/40 flex items-center space-x-1 shadow-gold">
                        <Sparkles className="w-3 h-3 text-cream-gold" />
                        <span>
                          {artist.verificationBadge === 'VERIFIED_MASTER' 
                            ? 'Verified Master' 
                            : 'Heritage Guild'}
                        </span>
                      </span>
                    )}

                    <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-white text-[10px] font-medium">
                      {artist.experienceYears} Years Practice
                    </span>
                  </div>

                  {/* Artwork Headline Over Image */}
                  {featuredWork && (
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <span className="text-[10px] text-cream-gold uppercase font-bold tracking-wider">
                        Featured Piece
                      </span>
                      <p className="font-display text-sm font-bold truncate">
                        {language === 'en' ? featuredWork.titleEn : featuredWork.titleMl}
                      </p>
                    </div>
                  )}
                </div>

                {/* Artist Bio & Lineage Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  
                  {/* Portrait and Name */}
                  <div className="flex items-start space-x-3.5">
                    <img
                      src={artist.avatar}
                      alt={artist.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-cream-gold shadow-sm shrink-0"
                    />
                    <div>
                      <h3 
                        onClick={() => setSelectedArtist(artist)}
                        className="font-display text-lg font-bold text-deep-brown hover:text-traditional-red cursor-pointer transition-colors leading-tight"
                      >
                        {artist.stageName || artist.name}
                      </h3>
                      <p className="text-xs font-semibold text-terracotta">
                        {artist.primaryArtformName}
                      </p>
                      <p className="text-[11px] text-olive-green flex items-center space-x-1 mt-0.5">
                        <MapPin className="w-3 h-3 shrink-0" />
                        <span>{artist.taluk}, Thrissur</span>
                      </p>
                    </div>
                  </div>

                  {/* Short Bio */}
                  <p className="text-xs text-deep-brown/80 line-clamp-2 leading-relaxed">
                    {language === 'en' ? artist.bioEn : artist.bioMl}
                  </p>

                  {/* Guru Parampara / Lineage */}
                  {artist.guruLineage && (
                    <div className="bg-parchment-warm p-2.5 rounded-xl border border-warm-sand/30 text-[11px]">
                      <span className="font-bold text-deep-brown block text-[10px] uppercase tracking-wider">
                        {language === 'en' ? 'Guru Lineage (ഗുരു പരമ്പര):' : 'ഗുരു പരമ്പര:'}
                      </span>
                      <span className="text-deep-brown/80 italic line-clamp-1">
                        {artist.guruLineage}
                      </span>
                    </div>
                  )}

                  {/* Action Buttons: Direct Inquiry & View Studio */}
                  <div className="pt-3 border-t border-warm-sand/30 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setInquiryArtist(artist)}
                      className="flex-1 flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl bg-traditional-red hover:bg-traditional-red-dark text-white text-xs font-semibold shadow-sm transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{language === 'en' ? 'Commission / Book' : 'ബന്ധപ്പെടുക'}</span>
                    </button>

                    <button
                      onClick={() => setSelectedArtist(artist)}
                      className="flex items-center space-x-1 py-2 px-3 rounded-xl bg-parchment-dark hover:bg-deep-brown hover:text-cream-gold text-deep-brown text-xs font-semibold transition-all"
                    >
                      <span>Studio</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

