import React, { useState, useEffect } from 'react';
import { useCultural } from '../context/CulturalContext';
import { CULTURAL_LOCATIONS_DATA } from '../data/culturalLocationsData';
import { CulturalLocation, CulturalCategory } from '../types';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import {
  ArrowLeft,
  MapPin,
  Clock,
  ShieldCheck,
  ExternalLink,
  Share2,
  Bookmark,
  Sparkles,
  CheckCircle2,
  Info,
  Globe,
  Award,
  UserCheck,
  Image as ImageIcon,
  ChevronRight,
  ChevronLeft,
  X,
  Maximize2,
  Navigation,
  Copy,
  Check,
  Building,
  Calendar,
  AlertCircle,
  BookOpen,
  ArrowUpRight
} from 'lucide-react';

// Custom Map Marker Pin for Detail Mini-Map
const createPinIcon = (category: CulturalCategory) => {
  let bgColor = '#A71903'; // Traditional Red
  if (category === 'CRAFT_CLUSTER') bgColor = '#BB6D25'; // Terracotta
  if (category === 'CULTURAL_FESTIVAL') bgColor = '#432813'; // Deep Brown
  if (category === 'ACADEMY_MUSEUM') bgColor = '#666C44'; // Olive Green
  if (category === 'ARTISAN_STUDIO') bgColor = '#C98C4D'; // Warm Sand

  return L.divIcon({
    className: 'custom-detail-map-marker',
    html: `
      <div style="
        background: ${bgColor};
        width: 38px;
        height: 38px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(67, 40, 19, 0.4);
        border: 2px solid #ECCA8A;
      ">
        <div style="
          transform: rotate(45deg);
          font-size: 16px;
        ">📍</div>
      </div>
    `,
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38]
  });
};

export const CulturalLocationDetail: React.FC = () => {
  const {
    selectedLocationForPage,
    navigateToLocationDetail,
    setActiveTab,
    language,
    isBookmarked,
    toggleBookmark
  } = useCultural();

  // Active Location state: fallback to Vadakkunnathan if not selected
  const locationItem: CulturalLocation =
    selectedLocationForPage || CULTURAL_LOCATIONS_DATA[0];

  // Lightbox Modal State
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [copiedCoords, setCopiedCoords] = useState<boolean>(false);
  const [sharedToast, setSharedToast] = useState<boolean>(false);

  // Scroll to top when locationItem changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [locationItem.id]);

  // Combine cover and gallery for lightbox navigation
  const allImages = [locationItem.image, ...(locationItem.gallery || [])];

  // Related locations resolving
  const relatedLocations = CULTURAL_LOCATIONS_DATA.filter((item) =>
    locationItem.relatedLocationIds?.includes(item.id)
  );

  const bookmarked = isBookmarked(locationItem.id);

  const handleCopyCoordinates = () => {
    const text = `${locationItem.location.lat}, ${locationItem.location.lng}`;
    navigator.clipboard.writeText(text);
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 2500);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `KALAKRITI | ${locationItem.titleEn}`,
        text: locationItem.descriptionEn,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setSharedToast(true);
      setTimeout(() => setSharedToast(false), 2500);
    }
  };

  const nextLightboxImage = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((activeLightboxIndex + 1) % allImages.length);
  };

  const prevLightboxImage = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex(
      (activeLightboxIndex - 1 + allImages.length) % allImages.length
    );
  };

  return (
    <article className="min-h-screen bg-parchment pb-24 text-deep-brown selection:bg-cream-gold selection:text-deep-brown">
      
      {/* ========================================================
          1. TOP NAVIGATION BREADCRUMB BAR
         ======================================================== */}
      <nav 
        aria-label="Breadcrumb"
        className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-warm-sand/40 py-3 shadow-xs"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-deep-brown/75 truncate">
            <button
              onClick={() => setActiveTab('map')}
              className="inline-flex items-center space-x-1.5 font-bold text-traditional-red hover:text-traditional-red-dark transition-colors shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{language === 'en' ? 'Cultural Map' : 'സാംസ്കാരിക ഭൂപടം'}</span>
            </button>

            <span className="text-warm-sand">/</span>
            <span className="hidden sm:inline text-deep-brown/60 font-medium">
              {language === 'en' ? locationItem.categoryLabelEn : locationItem.categoryLabelMl}
            </span>
            <span className="hidden sm:inline text-warm-sand">/</span>
            <span className="truncate font-semibold text-deep-brown max-w-[200px] sm:max-w-xs">
              {language === 'en' ? locationItem.titleEn : locationItem.titleMl}
            </span>
          </div>

          {/* Quick Actions: Share & Save */}
          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={handleShare}
              title="Share listing"
              className="p-2 rounded-xl border border-warm-sand/50 bg-parchment-warm text-deep-brown hover:bg-cream-gold/30 transition-colors flex items-center space-x-1 text-xs font-semibold"
            >
              <Share2 className="w-3.5 h-3.5 text-traditional-red" />
              <span className="hidden sm:inline">
                {sharedToast ? 'Link Copied!' : 'Share'}
              </span>
            </button>

            <button
              onClick={() => toggleBookmark(locationItem.id)}
              title={bookmarked ? 'Remove Bookmark' : 'Save to Cultural Itinerary'}
              className={`p-2 rounded-xl border text-xs font-semibold flex items-center space-x-1 transition-colors ${
                bookmarked
                  ? 'bg-traditional-red text-white border-traditional-red shadow-sm'
                  : 'bg-parchment-warm text-deep-brown border-warm-sand/50 hover:bg-cream-gold/30'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : 'text-traditional-red'}`} />
              <span className="hidden sm:inline">
                {bookmarked ? 'Saved' : 'Save'}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* ========================================================
          2. LARGE COVER PHOTOGRAPH WITH BADGES & HERO OVERLAY
         ======================================================== */}
      <header className="relative w-full h-[55vh] min-h-[400px] max-h-[620px] bg-deep-brown overflow-hidden">
        <img
          src={locationItem.image}
          alt={locationItem.titleEn}
          className="w-full h-full object-cover object-center scale-100 filter brightness-95"
        />

        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-deep-brown via-deep-brown/40 to-black/30" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/40" />

        {/* Floating Top Badges */}
        <div className="absolute top-6 left-4 sm:left-8 right-4 flex flex-wrap items-center justify-between gap-2 z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3.5 py-1 rounded-full bg-traditional-red text-white font-bold text-xs shadow-md uppercase tracking-wider flex items-center space-x-1.5 border border-cream-gold/30">
              <Sparkles className="w-3 h-3 text-cream-gold" />
              <span>{language === 'en' ? locationItem.categoryLabelEn : locationItem.categoryLabelMl}</span>
            </span>

            <span className="px-3 py-1 rounded-full bg-deep-brown/90 backdrop-blur-md text-cream-gold font-semibold text-xs border border-cream-gold/40">
              {language === 'en' ? locationItem.experienceTypeLabelEn : locationItem.categoryLabelMl}
            </span>

            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white font-medium text-xs border border-white/20">
              📍 {locationItem.taluk} Taluk
            </span>
          </div>

          {/* Verification Badge */}
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-olive-green/95 backdrop-blur-md text-cream-gold text-xs font-bold border border-cream-gold/40 shadow">
            <ShieldCheck className="w-3.5 h-3.5 text-cream-gold" />
            <span>Verified Cultural Heritage Record</span>
          </div>
        </div>

        {/* Bottom Hero Headings & Meta */}
        <div className="absolute bottom-6 sm:bottom-10 left-4 sm:left-8 right-4 sm:right-8 text-white max-w-5xl space-y-3 z-10">
          
          <div className="inline-flex items-center space-x-2 text-cream-gold font-mono text-xs uppercase tracking-widest bg-deep-brown/80 px-3 py-1 rounded-md backdrop-blur-sm border border-warm-sand/30">
            <Award className="w-3.5 h-3.5 text-cream-gold" />
            <span>{locationItem.primaryArtform}</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-cream-gold drop-shadow-md">
            {language === 'en' ? locationItem.titleEn : locationItem.titleMl}
          </h1>

          <p className="font-malayalam text-lg sm:text-2xl text-parchment-warm/95 font-medium leading-relaxed drop-shadow">
            {language === 'en' ? locationItem.titleMl : locationItem.titleEn}
          </p>

          <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-parchment-warm/90 pt-1">
            <span className="flex items-center space-x-1.5 font-medium">
              <MapPin className="w-4 h-4 text-cream-gold shrink-0" />
              <span>{locationItem.address}</span>
            </span>

            <span className="flex items-center space-x-1.5 font-medium">
              <Clock className="w-4 h-4 text-cream-gold shrink-0" />
              <span>{locationItem.timingOrDate}</span>
            </span>
          </div>

        </div>

        {/* View Gallery Prompt Button */}
        <button
          onClick={() => setActiveLightboxIndex(0)}
          className="absolute bottom-6 right-4 sm:right-8 z-10 hidden md:flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/20 backdrop-blur-md hover:bg-white/30 text-white text-xs font-bold border border-white/30 transition-all shadow-lg"
        >
          <ImageIcon className="w-4 h-4 text-cream-gold" />
          <span>View Gallery ({allImages.length} Photos)</span>
        </button>
      </header>

      {/* ========================================================
          3. MAIN CONTENT GRID (2 COLUMNS: EDITORIAL & SIDEBAR)
         ======================================================== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT / PRIMARY EDITORIAL CONTENT (8 Cols) */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* Quick Snapshot Highlight Cards */}
          <section className="bg-white rounded-2xl p-6 border border-warm-sand/50 shadow-soft grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-3.5 rounded-xl bg-parchment-warm/80 border border-warm-sand/30 space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-terracotta flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>Visiting Schedule</span>
              </span>
              <p className="text-xs font-semibold text-deep-brown leading-snug">
                {locationItem.timingOrDate}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-parchment-warm/80 border border-warm-sand/30 space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-olive-green flex items-center space-x-1">
                <ShieldCheck className="w-3 h-3" />
                <span>Entry & Guidelines</span>
              </span>
              <p className="text-xs font-semibold text-deep-brown leading-snug">
                {locationItem.entryFee || 'Free Admission / Cultural Monument'}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-parchment-warm/80 border border-warm-sand/30 space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-traditional-red flex items-center space-x-1">
                <Award className="w-3 h-3" />
                <span>Primary Tradition</span>
              </span>
              <p className="text-xs font-semibold text-deep-brown leading-snug">
                {locationItem.primaryArtform}
              </p>
            </div>
          </section>

          {/* Full Detailed Description */}
          <section className="space-y-4">
            <div className="flex items-center space-x-3 border-b border-warm-sand/40 pb-3">
              <div className="w-8 h-8 rounded-full bg-traditional-red/10 text-traditional-red flex items-center justify-center font-bold">
                <BookOpen className="w-4 h-4" />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-deep-brown">
                {language === 'en' ? 'Overview & Living Tradition' : 'വിവരണവും പാരമ്പര്യവും'}
              </h2>
            </div>

            <div className="prose prose-stone max-w-none space-y-4 text-deep-brown/85 leading-relaxed text-sm sm:text-base">
              <p className="first-letter:text-4xl first-letter:font-bold first-letter:text-traditional-red first-letter:float-left first-letter:mr-2">
                {locationItem.descriptionEn}
              </p>

              {/* Malayalam Translation Blockquote */}
              <div className="p-5 rounded-2xl bg-parchment-warm border-l-4 border-traditional-red font-malayalam text-deep-brown text-sm sm:text-base leading-relaxed space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-terracotta font-sans block">
                  മലയാള വിവരണം (Malayalam Dossier)
                </span>
                <p>{locationItem.descriptionMl}</p>
              </div>
            </div>

            {/* Advisory / Conduct Card */}
            {locationItem.dressCodeOrAdvisory && (
              <div className="p-4 rounded-xl bg-cream-gold/20 border border-cream-gold flex items-start space-x-3 text-xs sm:text-sm text-deep-brown">
                <Info className="w-5 h-5 text-terracotta shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-deep-brown">
                    Visitor Customs & Protocol
                  </h3>
                  <p className="text-deep-brown/85 leading-relaxed mt-0.5">
                    {locationItem.dressCodeOrAdvisory}
                  </p>
                </div>
              </div>
            )}
          </section>

          {/* Cultural Background & Significance */}
          <section className="space-y-4 bg-white rounded-2xl p-6 sm:p-8 border border-warm-sand/50 shadow-soft">
            <div className="flex items-center space-x-3 border-b border-warm-sand/30 pb-3">
              <div className="w-8 h-8 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-terracotta tracking-widest">
                  Heritage Dimensions
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-deep-brown">
                  {language === 'en' ? 'Cultural Background & Significance' : 'സാംസ്കാരിക പ്രാധാന്യം'}
                </h2>
              </div>
            </div>

            <p className="text-deep-brown/85 leading-relaxed text-sm sm:text-base">
              {locationItem.culturalSignificanceEn}
            </p>

            <div className="p-4 rounded-xl bg-parchment font-malayalam text-deep-brown text-sm sm:text-base leading-relaxed border border-warm-sand/30">
              {locationItem.culturalSignificanceMl}
            </div>

            {/* Key Cultural Highlights Tags */}
            <div className="pt-2 space-y-2">
              <h3 className="font-sans font-bold text-xs uppercase tracking-wider text-deep-brown/70">
                Key Distinctive Highlights:
              </h3>
              <div className="flex flex-wrap gap-2">
                {locationItem.highlights.map((highlight, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-cream-gold/30 border border-cream-gold/60 text-deep-brown text-xs font-semibold"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-olive-green" />
                    <span>{highlight}</span>
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* History and Local Context where Reliable (Strict Archaeological Separation) */}
          <section className="space-y-4 bg-white rounded-2xl p-6 sm:p-8 border border-warm-sand/50 shadow-soft">
            <div className="flex items-center space-x-3 border-b border-warm-sand/30 pb-3">
              <div className="w-8 h-8 rounded-full bg-olive-green/10 text-olive-green flex items-center justify-center font-bold">
                <Building className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-olive-green tracking-widest">
                  Epigraphy & Verified Chronology
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-deep-brown">
                  {language === 'en' ? 'Historical Context & Verified Records' : 'ചരിത്ര പശ്ചാത്തലവും രേഖകളും'}
                </h2>
              </div>
            </div>

            {/* Reliable Epigraphy Banner */}
            <div className="p-3.5 rounded-xl bg-olive-green/10 border border-olive-green/30 flex items-start space-x-2 text-xs text-olive-green">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>Historical Authenticity Guarantee:</strong> Documented historical facts below are sourced from surveyed archaeological inscriptions, Cochin State Gazetteers, and accredited architectural monographs. Oral legends and folkloric myths are clearly segregated.
              </p>
            </div>

            <div className="space-y-4 text-deep-brown/85 text-sm sm:text-base leading-relaxed">
              <p>{locationItem.historicalContextEn}</p>
              
              <div className="p-4 rounded-xl bg-parchment font-malayalam text-deep-brown text-sm sm:text-base leading-relaxed border border-warm-sand/30">
                {locationItem.historicalContextMl}
              </div>
            </div>

            {/* Distinction Notice: Legend vs Archaeology */}
            <div className="p-4 rounded-xl bg-parchment-warm/90 border border-warm-sand/40 space-y-1.5 text-xs">
              <div className="flex items-center space-x-2 text-terracotta font-bold uppercase tracking-wider text-[11px]">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Epigraphical Note & Cultural Lore</span>
              </div>
              <p className="text-deep-brown/80 leading-relaxed">
                While regional lore and popular folklore hold deep ritual significance in community life, academic historical timelines strictly trace verified stone inscriptions and colonial Cochin State royal land deeds recorded between the 8th and 19th centuries CE.
              </p>
            </div>
          </section>

          {/* Photo Gallery with Lightbox trigger */}
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-warm-sand/40 pb-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-traditional-red/10 text-traditional-red flex items-center justify-center font-bold">
                  <ImageIcon className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-terracotta tracking-widest">
                    Visual Archive
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-deep-brown">
                    {language === 'en' ? 'Cultural Photo Gallery' : 'ചിത്രശാല'}
                  </h2>
                </div>
              </div>

              <span className="text-xs text-deep-brown/60 font-semibold">
                {allImages.length} High-Resolution Photographs
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {allImages.map((imgUrl, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveLightboxIndex(idx)}
                  className="group relative h-48 sm:h-52 rounded-2xl overflow-hidden cursor-pointer bg-deep-brown shadow-soft border border-warm-sand/40 transform hover:-translate-y-1 transition-all duration-300"
                >
                  <img
                    src={imgUrl}
                    alt={`${locationItem.titleEn} - Photo ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-brown/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3.5" />
                  
                  <div className="absolute bottom-3 left-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between">
                    <span className="text-xs font-semibold drop-shadow">
                      {idx === 0 ? 'Primary Architectural View' : `Archival Plate 0${idx + 1}`}
                    </span>
                    <Maximize2 className="w-4 h-4 text-cream-gold" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Interactive Map Location & Coordinates Mini-Map */}
          <section className="space-y-4 bg-white rounded-2xl p-6 sm:p-8 border border-warm-sand/50 shadow-soft">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-warm-sand/30 pb-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-traditional-red/10 text-traditional-red flex items-center justify-center font-bold">
                  <Navigation className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-traditional-red tracking-widest">
                    Geospatial Pin
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-deep-brown">
                    {language === 'en' ? 'Geographic Location & Map' : 'ഭൂപടത്തിലെ സ്ഥാനം'}
                  </h2>
                </div>
              </div>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${locationItem.location.lat},${locationItem.location.lng}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-traditional-red hover:bg-traditional-red-dark text-white text-xs font-bold transition-colors shadow-sm shrink-0"
              >
                <span>Navigate in Google Maps</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Coordinates & Taluk strip */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-3.5 rounded-xl bg-parchment-warm border border-warm-sand/30 text-xs">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-terracotta" />
                <span className="font-semibold text-deep-brown">
                  {locationItem.address}
                </span>
              </div>

              <button
                onClick={handleCopyCoordinates}
                className="inline-flex items-center space-x-1 text-[11px] font-mono text-terracotta bg-white px-2.5 py-1 rounded-lg border border-warm-sand/40 hover:bg-parchment transition-colors"
                title="Copy coordinates"
              >
                {copiedCoords ? (
                  <>
                    <Check className="w-3 h-3 text-olive-green" />
                    <span>Copied WGS 84!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>{locationItem.location.lat}° N, {locationItem.location.lng}° E</span>
                  </>
                )}
              </button>
            </div>

            {/* Embedded Leaflet Map */}
            <div className="w-full h-72 sm:h-80 rounded-xl overflow-hidden border border-warm-sand/50 shadow-inner relative z-0">
              <MapContainer
                center={[locationItem.location.lat, locationItem.location.lng]}
                zoom={14}
                scrollWheelZoom={false}
                className="w-full h-full"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                  position={[locationItem.location.lat, locationItem.location.lng]}
                  icon={createPinIcon(locationItem.culturalCategory)}
                >
                  <Popup>
                    <div className="p-2 space-y-1 text-xs font-sans">
                      <p className="font-bold text-deep-brown">
                        {language === 'en' ? locationItem.titleEn : locationItem.titleMl}
                      </p>
                      <p className="text-[11px] text-deep-brown/70">
                        {locationItem.address}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </section>

          {/* ========================================================
              SOURCE ATTRIBUTION & INSTITUTIONAL VERIFICATION SECTION
             ======================================================== */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-cream-gold shadow-cultural space-y-6">
            <div className="flex items-center space-x-3 border-b border-warm-sand/30 pb-3">
              <div className="w-9 h-9 rounded-full bg-cream-gold text-deep-brown flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5 text-traditional-red" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-traditional-red tracking-widest">
                  Authenticity & Archival Integrity
                </span>
                <h2 className="font-display text-2xl font-bold text-deep-brown">
                  {language === 'en' ? 'Source Attribution & Verification' : 'വിവര സ്രോതസ്സുകളും സ്ഥിരീകരണവും'}
                </h2>
              </div>
            </div>

            {/* Attribution Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-parchment-warm/70 border border-warm-sand/40 space-y-1">
                <span className="font-bold text-deep-brown/70 uppercase tracking-wider text-[10px] block">
                  Primary Archival Sourcing:
                </span>
                <p className="font-semibold text-deep-brown text-sm">
                  {locationItem.sourceAttribution.primarySource}
                </p>
                {locationItem.sourceAttribution.archiveReference && (
                  <p className="text-[11px] font-mono text-terracotta">
                    Ref ID: {locationItem.sourceAttribution.archiveReference}
                  </p>
                )}
              </div>

              <div className="p-4 rounded-xl bg-parchment-warm/70 border border-warm-sand/40 space-y-1">
                <span className="font-bold text-deep-brown/70 uppercase tracking-wider text-[10px] block">
                  Verified & Curated By:
                </span>
                <p className="font-semibold text-deep-brown text-sm">
                  {locationItem.sourceAttribution.verifiedBy}
                </p>
                <p className="text-[11px] text-olive-green font-semibold">
                  Last Updated: {locationItem.sourceAttribution.lastUpdated}
                </p>
              </div>
            </div>

            {/* Rigor Statement */}
            <div className="p-4 rounded-xl bg-parchment text-deep-brown/85 text-xs leading-relaxed space-y-2 border border-warm-sand/30">
              <div className="flex items-center space-x-2 font-bold text-deep-brown">
                <CheckCircle2 className="w-4 h-4 text-olive-green shrink-0" />
                <span>KALAKRITI Heritage Curation Standard:</span>
              </div>
              <p>
                In alignment with international heritage preservation protocols, this cultural dossier does not assert conjectural or unverified folkloric claims as chronological fact. All historical assertions have been cross-checked against authorized governmental, university, or archaeological surveys.
              </p>
              <p className="text-[11px] text-deep-brown/70 italic border-t border-warm-sand/20 pt-2">
                Notice: {locationItem.sampleDisclaimer}
              </p>
            </div>
          </section>

          {/* Related Cultural Experiences */}
          {relatedLocations.length > 0 && (
            <section className="space-y-5 pt-4">
              <div className="flex items-center justify-between border-b border-warm-sand/40 pb-3">
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase font-bold text-terracotta tracking-widest">
                    Connected Cultural Circuit
                  </span>
                  <h2 className="font-display text-2xl font-bold text-deep-brown">
                    {language === 'en' ? 'Related Cultural Experiences in Thrissur' : 'ബന്ധപ്പെട്ട സാംസ്കാരിക കേന്ദ്രങ്ങൾ'}
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {relatedLocations.map((relItem) => (
                  <div
                    key={relItem.id}
                    onClick={() => navigateToLocationDetail(relItem)}
                    className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-warm-sand/40 shadow-soft hover:shadow-cultural transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
                  >
                    <div className="relative h-44 overflow-hidden bg-deep-brown">
                      <img
                        src={relItem.image}
                        alt={relItem.titleEn}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-deep-brown/80 via-transparent to-transparent" />
                      
                      <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-deep-brown/90 text-cream-gold text-[10px] font-bold border border-cream-gold/30">
                        {relItem.taluk}
                      </span>
                    </div>

                    <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-terracotta tracking-wider block">
                          {relItem.primaryArtform}
                        </span>
                        <h4 className="font-display text-sm font-bold text-deep-brown group-hover:text-traditional-red transition-colors leading-snug mt-1">
                          {language === 'en' ? relItem.titleEn : relItem.titleMl}
                        </h4>
                      </div>

                      <div className="pt-2 border-t border-warm-sand/30 flex items-center justify-between text-xs font-semibold text-traditional-red">
                        <span>View Dossier</span>
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>

        {/* ========================================================
            RIGHT SIDEBAR (4 Cols: Contributor, Web Links, Key Specs)
           ======================================================== */}
        <aside className="lg:col-span-4 space-y-6">
          
          {/* Contributor / Source Information Card */}
          <div className="bg-white rounded-2xl p-6 border border-warm-sand/50 shadow-soft space-y-4">
            <div className="flex items-center space-x-2.5 border-b border-warm-sand/30 pb-3">
              <div className="w-8 h-8 rounded-full bg-terracotta/15 text-terracotta flex items-center justify-center font-bold">
                <UserCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-terracotta tracking-wider block">
                  Cultural Guardian
                </span>
                <h3 className="font-heading text-base font-bold text-deep-brown">
                  Contributor Information
                </h3>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-parchment-warm/60 border border-warm-sand/40 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-display text-base font-bold text-deep-brown">
                  {locationItem.contributor.name}
                </h4>
                <span className="px-2 py-0.5 rounded-full bg-olive-green text-cream-gold text-[10px] font-bold">
                  Verified
                </span>
              </div>
              <p className="text-xs font-semibold text-terracotta">
                {locationItem.contributor.role}
              </p>
              <p className="text-xs text-deep-brown/75 leading-relaxed">
                {locationItem.contributor.organization}
              </p>
            </div>

            <p className="text-[11px] text-deep-brown/70 leading-relaxed italic">
              Contributors are certified heritage scholars, traditional master craftsmen, or regional epigraphists documenting Thrissur’s cultural heritage.
            </p>
          </div>

          {/* Official Website & Verified Digital Channels */}
          <div className="bg-white rounded-2xl p-6 border border-warm-sand/50 shadow-soft space-y-4">
            <div className="flex items-center space-x-2.5 border-b border-warm-sand/30 pb-3">
              <div className="w-8 h-8 rounded-full bg-traditional-red/10 text-traditional-red flex items-center justify-center font-bold">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-traditional-red tracking-wider block">
                  Digital Archives
                </span>
                <h3 className="font-heading text-base font-bold text-deep-brown">
                  Official Links & Web Portals
                </h3>
              </div>
            </div>

            <div className="space-y-3">
              {locationItem.officialWebsite && (
                <a
                  href={locationItem.officialWebsite}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-between p-3.5 rounded-xl bg-parchment-warm hover:bg-cream-gold/30 border border-warm-sand/40 text-deep-brown text-xs font-bold transition-colors group"
                >
                  <div className="flex items-center space-x-2">
                    <Globe className="w-4 h-4 text-traditional-red" />
                    <span>Official Institutional Portal</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-deep-brown/60 group-hover:text-traditional-red" />
                </a>
              )}

              {locationItem.socialLinks && locationItem.socialLinks.length > 0 ? (
                locationItem.socialLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-white hover:bg-parchment border border-warm-sand/40 text-deep-brown text-xs font-semibold transition-colors group"
                  >
                    <div className="flex items-center space-x-2 truncate pr-2">
                      <Sparkles className="w-3.5 h-3.5 text-terracotta shrink-0" />
                      <span className="truncate">{link.platform}</span>
                    </div>
                    <ExternalLink className="w-3 h-3 text-deep-brown/60 group-hover:text-terracotta shrink-0" />
                  </a>
                ))
              ) : (
                <p className="text-xs text-deep-brown/60 italic">
                  Digital archival documentation registered under Kerala Cultural Department records.
                </p>
              )}
            </div>
          </div>

          {/* Quick Cultural Specification Sheet */}
          <div className="bg-white rounded-2xl p-6 border border-warm-sand/50 shadow-soft space-y-4">
            <h3 className="font-heading text-base font-bold text-deep-brown border-b border-warm-sand/30 pb-2">
              Listing Metadata & Specifications
            </h3>

            <dl className="space-y-3 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-warm-sand/20">
                <dt className="text-deep-brown/70">District & Taluk</dt>
                <dd className="font-bold text-deep-brown">Thrissur, {locationItem.taluk}</dd>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-warm-sand/20">
                <dt className="text-deep-brown/70">Experience Format</dt>
                <dd className="font-bold text-deep-brown">{locationItem.experienceTypeLabelEn}</dd>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-warm-sand/20">
                <dt className="text-deep-brown/70">Category Taxonomy</dt>
                <dd className="font-bold text-deep-brown">{locationItem.categoryLabelEn}</dd>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-warm-sand/20">
                <dt className="text-deep-brown/70">Geodetic Datum</dt>
                <dd className="font-mono text-[11px] font-bold text-terracotta">WGS 84 (GPS)</dd>
              </div>

              <div className="flex items-center justify-between py-1">
                <dt className="text-deep-brown/70">Catalog Dossier ID</dt>
                <dd className="font-mono text-[11px] font-bold text-deep-brown">{locationItem.id}</dd>
              </div>
            </dl>
          </div>

          {/* Back to Interactive Map Button CTA */}
          <button
            onClick={() => {
              setActiveTab('map');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full py-3.5 px-4 rounded-xl bg-deep-brown hover:bg-traditional-red text-cream-gold font-bold text-xs sm:text-sm shadow-md transition-colors flex items-center justify-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Thrissur Interactive Map</span>
          </button>

        </aside>

      </main>

      {/* ========================================================
          LIGHTBOX MODAL FOR PHOTOGRAPHS
         ======================================================== */}
      {activeLightboxIndex !== null && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery lightbox"
          className="fixed inset-0 z-70 bg-deep-brown/95 backdrop-blur-md flex items-center justify-center p-4 select-none animate-fadeIn"
        >
          {/* Top Bar with Counter & Close */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white z-20">
            <span className="text-xs sm:text-sm font-mono text-cream-gold font-semibold">
              Photo {activeLightboxIndex + 1} of {allImages.length}
            </span>

            <button
              onClick={() => setActiveLightboxIndex(null)}
              className="p-2 rounded-full bg-white/20 hover:bg-traditional-red text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Previous Button */}
          <button
            onClick={prevLightboxImage}
            className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors z-20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={nextLightboxImage}
            className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors z-20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Centered Image */}
          <div className="max-w-4xl max-h-[80vh] flex flex-col items-center">
            <img
              src={allImages[activeLightboxIndex]}
              alt={`${locationItem.titleEn} - Enlarged`}
              className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl border border-cream-gold/30"
            />
            <p className="text-center text-xs text-parchment-warm mt-3 font-medium">
              {locationItem.titleEn} — Cultural Archival Plate {activeLightboxIndex + 1}
            </p>
          </div>
        </div>
      )}

    </article>
  );
};

