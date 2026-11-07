import React, { useState } from 'react';
import { useCultural } from '../context/CulturalContext';
import { Artist, Artwork } from '../types';
import {
  ArrowLeft,
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  Instagram,
  Globe,
  Award,
  Sparkles,
  CheckCircle,
  Share2,
  Bookmark,
  Calendar,
  Layers,
  ExternalLink,
  ChevronRight,
  Maximize2,
  X,
  Clock,
  Heart
} from 'lucide-react';

export const ArtistProfilePage: React.FC = () => {
  const {
    selectedArtistForProfile,
    artists,
    setActiveTab,
    language,
    isBookmarked,
    toggleBookmark,
    setInquiryArtist,
    setCurrentDashboardArtistId
  } = useCultural();

  // Active artist profile: fallback to first artist if null
  const artist: Artist = selectedArtistForProfile || artists[0];

  const [activeArtworkModal, setActiveArtworkModal] = useState<Artwork | null>(null);
  const [activeLightboxImg, setActiveLightboxImg] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const bookmarked = isBookmarked(artist.id);

  const handleWhatsApp = () => {
    const phone = artist.whatsappNumber || artist.contactPhone || '919447012345';
    const text = encodeURIComponent(
      `Namaskaram ${artist.stageName || artist.name}, I discovered your traditional art showcase on KALAKRITI Thrissur. I would like to inquire about your artworks / commissions / performances.`
    );
    window.open(`https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${artist.stageName || artist.name} • KALAKRITI Thrissur`,
        text: artist.bioEn,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <article className="min-h-screen bg-parchment pb-24 text-deep-brown selection:bg-cream-gold selection:text-deep-brown">
      
      {/* ========================================================
          1. TOP BREADCRUMB BAR
         ======================================================== */}
      <nav 
        aria-label="Breadcrumb"
        className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-warm-sand/40 py-3 shadow-xs"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-deep-brown/75 truncate">
            <button
              onClick={() => setActiveTab('artists')}
              className="inline-flex items-center space-x-1 font-bold text-traditional-red hover:text-traditional-red-dark transition-colors shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{language === 'en' ? 'Artists Directory' : 'കലാകാരന്മാർ'}</span>
            </button>
            <span className="text-warm-sand">/</span>
            <span className="truncate font-semibold text-deep-brown">
              {artist.stageName || artist.name}
            </span>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl border border-warm-sand/50 bg-parchment-warm text-deep-brown hover:bg-cream-gold/30 text-xs font-semibold flex items-center space-x-1"
            >
              <Share2 className="w-3.5 h-3.5 text-traditional-red" />
              <span className="hidden sm:inline">{copiedLink ? 'Copied Link!' : 'Share Profile'}</span>
            </button>

            <button
              onClick={() => toggleBookmark(artist.id)}
              className={`p-2 rounded-xl border text-xs font-semibold flex items-center space-x-1 transition-colors ${
                bookmarked
                  ? 'bg-traditional-red text-white border-traditional-red'
                  : 'bg-parchment-warm text-deep-brown border-warm-sand/50 hover:bg-cream-gold/30'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : 'text-traditional-red'}`} />
              <span className="hidden sm:inline">{bookmarked ? 'Saved' : 'Bookmark'}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* ========================================================
          2. EDITORIAL HERO COVER & PROFILE AVATAR
         ======================================================== */}
      <header className="relative w-full h-72 sm:h-96 bg-deep-brown overflow-hidden">
        <img
          src={artist.artworks[0]?.images[0] || artist.avatar}
          alt={artist.name}
          className="w-full h-full object-cover object-center filter brightness-75 scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-brown via-deep-brown/60 to-transparent" />

        <div className="absolute bottom-6 left-4 sm:left-8 right-4 sm:right-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white z-10">
          <div className="flex items-end space-x-4 sm:space-x-6">
            <img
              src={artist.avatar}
              alt={artist.name}
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl object-cover border-4 border-cream-gold shadow-gold bg-white shrink-0 -mb-2 sm:-mb-6"
            />

            <div className="space-y-1 sm:space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-0.5 rounded-full bg-cream-gold text-deep-brown text-[11px] font-bold uppercase tracking-wider">
                  {artist.primaryArtformName}
                </span>

                {artist.isVerified && (
                  <span className="px-2.5 py-0.5 rounded-full bg-olive-green text-cream-gold text-[11px] font-bold flex items-center space-x-1 shadow">
                    <CheckCircle className="w-3 h-3" />
                    <span>Verified Living Master</span>
                  </span>
                )}

                <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-medium backdrop-blur-sm">
                  {artist.experienceYears} Years Dedication
                </span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-cream-gold drop-shadow">
                {artist.stageName || artist.name}
              </h1>

              {artist.stageName && artist.stageName !== artist.name && (
                <p className="text-xs text-parchment-warm/80">
                  Legal Name: {artist.name}
                </p>
              )}

              <p className="text-xs sm:text-sm text-parchment-warm flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-cream-gold shrink-0" />
                <span>{artist.studioAddress} ({artist.taluk} Taluk)</span>
              </p>
            </div>
          </div>

          {/* Direct Commission & WhatsApp CTA */}
          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={handleWhatsApp}
              className="px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center space-x-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Inquire</span>
            </button>

            <button
              onClick={() => {
                setCurrentDashboardArtistId(artist.id);
                setActiveTab('artist-dashboard');
              }}
              className="px-4 py-2.5 rounded-xl bg-white/20 backdrop-blur-md hover:bg-white/30 text-white font-semibold text-xs border border-white/30 transition-colors"
            >
              Manage in Dashboard
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================
          3. MAIN EDITORIAL CONTENT & PORTFOLIO GRID
         ======================================================== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT COLUMN: BIOGRAPHY, WORK DESCRIPTION & PORTFOLIO (8 Cols) */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Biography & Tradition */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-warm-sand/50 shadow-soft space-y-4">
            <div className="flex items-center space-x-2.5 border-b border-warm-sand/30 pb-3">
              <div className="w-8 h-8 rounded-full bg-traditional-red/10 text-traditional-red flex items-center justify-center font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <h2 className="font-display text-2xl font-bold text-deep-brown">
                {language === 'en' ? 'Biography & Artistic Lineage' : 'ജീവചരിത്രവും പാരമ്പര്യവും'}
              </h2>
            </div>

            <p className="text-sm sm:text-base text-deep-brown/85 leading-relaxed">
              {artist.bioEn}
            </p>

            {artist.bioMl && (
              <div className="p-4 rounded-2xl bg-parchment-warm font-malayalam text-deep-brown/85 text-sm sm:text-base leading-relaxed border border-warm-sand/30">
                {artist.bioMl}
              </div>
            )}

            {artist.guruLineage && (
              <div className="p-3.5 rounded-xl bg-parchment border border-warm-sand/30 flex items-center space-x-2 text-xs text-deep-brown/80">
                <Award className="w-4 h-4 text-terracotta shrink-0" />
                <p>
                  <strong>Guru Parampara & Lineage:</strong> {artist.guruLineage}
                </p>
              </div>
            )}
          </section>

          {/* Description of Their Work & Techniques */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-warm-sand/50 shadow-soft space-y-4">
            <div className="flex items-center space-x-2.5 border-b border-warm-sand/30 pb-3">
              <div className="w-8 h-8 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center font-bold">
                <Layers className="w-4 h-4" />
              </div>
              <h2 className="font-display text-2xl font-bold text-deep-brown">
                {language === 'en' ? 'Description of Work & Craftsmanship' : 'സൃഷ്ടികളുടെ സവിശേഷതകൾ'}
              </h2>
            </div>

            <p className="text-sm sm:text-base text-deep-brown/85 leading-relaxed">
              {artist.workDescription || `${artist.stageName || artist.name} creates works grounded in the sacred iconography, natural materials, and ancient rhythmic traditions of Thrissur. Every creation is handcrafted according to generational Gurukula standards.`}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3.5 rounded-xl bg-parchment-warm/70 border border-warm-sand/30 space-y-1">
                <span className="font-bold text-deep-brown uppercase text-[10px] tracking-wider text-olive-green">
                  Primary Specialization:
                </span>
                <p className="font-semibold text-deep-brown">{artist.primaryArtformName}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-parchment-warm/70 border border-warm-sand/30 space-y-1">
                <span className="font-bold text-deep-brown uppercase text-[10px] tracking-wider text-terracotta">
                  Practice Lineage:
                </span>
                <p className="font-semibold text-deep-brown">{artist.experienceYears} Years Active Practice</p>
              </div>
            </div>
          </section>

          {/* Complete Showcase Portfolio Gallery */}
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-warm-sand/40 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-terracotta tracking-wider">
                  Master Showcase
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-deep-brown">
                  {language === 'en' ? 'Artworks & Portfolio Gallery' : 'കലാസൃഷ്ടികൾ'}
                </h2>
              </div>

              <span className="text-xs text-deep-brown/70 font-semibold">
                {artist.artworks.length} Showcase Pieces
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {artist.artworks.map((aw) => (
                <div
                  key={aw.id}
                  onClick={() => setActiveArtworkModal(aw)}
                  className="group cursor-pointer rounded-3xl overflow-hidden bg-white border border-warm-sand/50 shadow-soft hover:shadow-cultural transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative h-64 overflow-hidden bg-deep-brown">
                    <img
                      src={aw.images[0]}
                      alt={aw.titleEn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-brown/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-deep-brown/90 text-cream-gold text-[10px] font-bold border border-cream-gold/30">
                      {aw.category || aw.artformName}
                    </span>

                    {aw.images.length > 1 && (
                      <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-deep-brown/80 text-cream-gold text-[10px] font-mono">
                        +{aw.images.length - 1} photos
                      </span>
                    )}

                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="p-2 rounded-full bg-cream-gold text-deep-brown shadow flex items-center justify-center">
                        <Maximize2 className="w-4 h-4" />
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display text-lg font-bold text-deep-brown group-hover:text-traditional-red transition-colors leading-snug">
                        {language === 'en' ? aw.titleEn : aw.titleMl}
                      </h3>
                      <p className="text-xs text-deep-brown/75 line-clamp-2 mt-1 leading-relaxed">
                        {aw.storyEn}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-warm-sand/30 flex items-center justify-between text-xs">
                      <span className="font-mono text-terracotta font-bold">
                        {aw.price || 'Commission on Inquiry'}
                      </span>
                      <span className="font-semibold text-traditional-red flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                        <span>View Piece</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* RIGHT COLUMN: CONTACT, SOCIAL LINKS & GUILD SPECS (4 Cols) */}
        <aside className="lg:col-span-4 space-y-6">
          
          {/* Contact Information Card */}
          <div className="bg-white rounded-3xl p-6 border border-warm-sand/50 shadow-soft space-y-4">
            <h3 className="font-heading text-base font-bold text-deep-brown border-b border-warm-sand/30 pb-2">
              Direct Contact & Commissions
            </h3>

            <div className="space-y-3 text-xs">
              {artist.contactPhone && (
                <a
                  href={`tel:${artist.contactPhone}`}
                  className="flex items-center space-x-3 p-3 rounded-xl bg-parchment-warm hover:bg-cream-gold/30 border border-warm-sand/40 text-deep-brown transition-colors"
                >
                  <Phone className="w-4 h-4 text-traditional-red shrink-0" />
                  <div>
                    <span className="text-[10px] text-deep-brown/60 block">Phone</span>
                    <span className="font-bold">{artist.contactPhone}</span>
                  </div>
                </a>
              )}

              {artist.whatsappNumber && (
                <button
                  onClick={handleWhatsApp}
                  className="w-full flex items-center space-x-3 p-3 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-deep-brown transition-colors text-left"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                  <div>
                    <span className="text-[10px] text-deep-brown/60 block">WhatsApp Inquiries</span>
                    <span className="font-bold">{artist.whatsappNumber}</span>
                  </div>
                </button>
              )}

              {artist.email && (
                <a
                  href={`mailto:${artist.email}`}
                  className="flex items-center space-x-3 p-3 rounded-xl bg-parchment-warm hover:bg-cream-gold/30 border border-warm-sand/40 text-deep-brown transition-colors"
                >
                  <Mail className="w-4 h-4 text-terracotta shrink-0" />
                  <div className="truncate">
                    <span className="text-[10px] text-deep-brown/60 block">Email</span>
                    <span className="font-bold truncate block">{artist.email}</span>
                  </div>
                </a>
              )}
            </div>
          </div>

          {/* Public Social Media Links */}
          <div className="bg-white rounded-3xl p-6 border border-warm-sand/50 shadow-soft space-y-4">
            <h3 className="font-heading text-base font-bold text-deep-brown border-b border-warm-sand/30 pb-2">
              Public Channels & Social Links
            </h3>

            <div className="space-y-2.5 text-xs">
              {artist.instagramHandle && (
                <a
                  href={`https://instagram.com/${artist.instagramHandle.replace('@', '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-white hover:bg-parchment border border-warm-sand/40 text-deep-brown font-semibold transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <Instagram className="w-4 h-4 text-traditional-red" />
                    <span>{artist.instagramHandle}</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-deep-brown/50" />
                </a>
              )}

              {artist.socialLinks?.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-white hover:bg-parchment border border-warm-sand/40 text-deep-brown font-semibold transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <Globe className="w-4 h-4 text-olive-green" />
                    <span>{link.platform}</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-deep-brown/50" />
                </a>
              ))}

              {!artist.instagramHandle && (!artist.socialLinks || artist.socialLinks.length === 0) && (
                <p className="text-xs text-deep-brown/60 italic">
                  Traditional master registered with physical studio visits in {artist.taluk}.
                </p>
              )}
            </div>
          </div>

          {/* Location & Studio Card */}
          <div className="bg-white rounded-3xl p-6 border border-warm-sand/50 shadow-soft space-y-3">
            <h3 className="font-heading text-base font-bold text-deep-brown border-b border-warm-sand/30 pb-2">
              Studio & Geographic Location
            </h3>

            <div className="space-y-2 text-xs">
              <p className="font-semibold text-deep-brown">
                {artist.studioName || `${artist.name} Atelier`}
              </p>
              <p className="text-deep-brown/75 leading-relaxed">
                {artist.studioAddress}
              </p>
              <p className="font-mono text-[11px] text-terracotta">
                📍 Coordinates: {artist.location.lat.toFixed(4)}° N, {artist.location.lng.toFixed(4)}° E
              </p>
            </div>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${artist.location.lat},${artist.location.lng}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 px-3 rounded-xl bg-parchment-warm hover:bg-cream-gold/30 border border-warm-sand/40 text-deep-brown font-bold text-xs flex items-center justify-center space-x-1 transition-colors"
            >
              <span>Get Directions to Studio</span>
              <ExternalLink className="w-3.5 h-3.5 text-traditional-red" />
            </a>
          </div>

          {/* Community Showcase Button */}
          <button
            onClick={() => setActiveTab('community-showcase')}
            className="w-full py-3.5 px-4 rounded-2xl bg-deep-brown hover:bg-traditional-red text-cream-gold font-bold text-xs sm:text-sm shadow-md transition-colors flex items-center justify-center space-x-2"
          >
            <span>Explore Community Showcase Gallery</span>
            <ChevronRight className="w-4 h-4" />
          </button>

        </aside>

      </main>

      {/* ========================================================
          ARTWORK DETAIL LIGHTBOX MODAL
         ======================================================== */}
      {activeArtworkModal && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-labelledby="artwork-modal-title"
          className="fixed inset-0 z-70 bg-deep-brown/90 backdrop-blur-md flex items-start sm:items-center justify-center p-3 sm:p-6 animate-fadeIn overflow-y-auto"
        >
          <div className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-cultural border-2 border-cream-gold my-auto my-3 sm:my-6">
            
            <div className="relative h-52 sm:h-72 md:h-96 bg-deep-brown">
              <img
                src={activeArtworkModal.images[0]}
                alt={activeArtworkModal.titleEn}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-brown via-deep-brown/40 to-transparent" />

              <button
                onClick={() => setActiveArtworkModal(null)}
                aria-label="Close artwork details"
                className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full bg-deep-brown/80 text-cream-gold hover:bg-traditional-red transition-colors shadow-md z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-3 left-4 right-4 sm:bottom-4 sm:left-6 sm:right-6 text-white space-y-1">
                <span className="px-2.5 py-0.5 rounded-full bg-cream-gold text-deep-brown text-[10px] sm:text-xs font-bold">
                  {activeArtworkModal.category || activeArtworkModal.artformName}
                </span>
                <h3 id="artwork-modal-title" className="font-display text-xl sm:text-2xl md:text-3xl font-bold leading-tight">
                  {language === 'en' ? activeArtworkModal.titleEn : activeArtworkModal.titleMl}
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-4 max-h-[50vh] overflow-y-auto text-xs sm:text-sm text-deep-brown/85">
              <p className="leading-relaxed">
                {activeArtworkModal.storyEn}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-parchment-warm p-4 rounded-2xl border border-warm-sand/40 text-xs">
                <div>
                  <span className="font-bold text-deep-brown/60 block text-[10px] uppercase">Medium</span>
                  <span className="font-semibold text-deep-brown">{activeArtworkModal.medium}</span>
                </div>
                <div>
                  <span className="font-bold text-deep-brown/60 block text-[10px] uppercase">Dimensions</span>
                  <span className="font-semibold text-deep-brown">{activeArtworkModal.dimensions || 'Custom'}</span>
                </div>
                <div>
                  <span className="font-bold text-deep-brown/60 block text-[10px] uppercase">Valuation</span>
                  <span className="font-bold text-terracotta">{activeArtworkModal.price || 'Inquiry'}</span>
                </div>
              </div>

              {/* Multiple Gallery Photos for this Artwork */}
              {activeArtworkModal.images.length > 1 && (
                <div className="space-y-2 pt-2">
                  <h4 className="font-bold text-xs uppercase text-deep-brown tracking-wider">
                    Additional Detail Views:
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {activeArtworkModal.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`View ${i + 1}`}
                        className="h-24 w-full object-cover rounded-xl border border-warm-sand/40 cursor-pointer hover:opacity-90"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-parchment-dark border-t border-warm-sand/30 flex items-center justify-between">
              <button
                onClick={() => setActiveArtworkModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-deep-brown hover:bg-white"
              >
                Close
              </button>

              <button
                onClick={handleWhatsApp}
                className="px-5 py-2 rounded-xl bg-traditional-red hover:bg-traditional-red-dark text-white text-xs font-bold shadow flex items-center space-x-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Inquire About This Piece</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </article>
  );
};

