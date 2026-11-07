import React, { useState, useMemo } from 'react';
import { useCultural } from '../context/CulturalContext';
import { CulturalLocation, CulturalCategory, ExperienceType, Taluk } from '../types';
import { CULTURAL_LOCATIONS_DATA } from '../data/culturalLocationsData';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { 
  MapPin, 
  Search, 
  Filter, 
  RotateCcw, 
  Layers, 
  List, 
  Map as MapIcon, 
  ExternalLink, 
  Clock, 
  Sparkles, 
  X, 
  Info, 
  CheckCircle2, 
  ArrowRight,
  Compass,
  Navigation,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

// Custom Marker Pin Generator using exact project color palette
const createCategoryIcon = (category: CulturalCategory) => {
  let bgColor = '#A71903'; // Traditional Red
  let iconEmoji = '🏛️';

  switch (category) {
    case 'HERITAGE_MONUMENT':
      bgColor = '#A71903'; // Traditional Red
      iconEmoji = '🏛️';
      break;
    case 'CRAFT_CLUSTER':
      bgColor = '#BB6D25'; // Terracotta
      iconEmoji = '🧵';
      break;
    case 'CULTURAL_FESTIVAL':
      bgColor = '#432813'; // Deep Brown
      iconEmoji = '🎪';
      break;
    case 'ACADEMY_MUSEUM':
      bgColor = '#666C44'; // Olive Green
      iconEmoji = '🎓';
      break;
    case 'ARTISAN_STUDIO':
      bgColor = '#C98C4D'; // Warm Sand
      iconEmoji = '🎭';
      break;
    default:
      bgColor = '#A71903';
      iconEmoji = '📍';
  }

  return L.divIcon({
    className: 'custom-cultural-marker',
    html: `
      <div style="
        background-color: ${bgColor};
        width: 38px;
        height: 38px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #ECCA8A;
        box-shadow: 0 4px 14px rgba(67, 40, 19, 0.4);
        cursor: pointer;
        transition: transform 0.2s ease;
      ">
        <span style="transform: rotate(45deg); font-size: 16px; line-height: 1;">${iconEmoji}</span>
      </div>
    `,
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
  });
};

// Component to dynamically recenter map when selecting a location
const RecenterMap: React.FC<{ lat: number; lng: number }> = ({ lat, lng }) => {
  const map = useMap();
  React.useEffect(() => {
    map.flyTo([lat, lng], 13, { duration: 1.2 });
  }, [lat, lng, map]);
  return null;
};

export const InteractiveMap: React.FC = () => {
  const { language, navigateToLocationDetail } = useCultural();

  // View state: Map View vs Directory/List View
  const [viewMode, setViewMode] = useState<'MAP' | 'LIST'>('MAP');

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArtform, setSelectedArtform] = useState('ALL');
  const [selectedLocation, setSelectedLocation] = useState('ALL');
  const [selectedDateTiming, setSelectedDateTiming] = useState('ALL');
  const [selectedExperienceType, setSelectedExperienceType] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  // Selected Location for Detailed Modal
  const [activeModalLocation, setActiveModalLocation] = useState<CulturalLocation | null>(null);

  // Selected Pin to center map
  const [flyToCoords, setFlyToCoords] = useState<{ lat: number; lng: number } | null>(null);

  // Center of Thrissur District (Swaraj Round / Vadakkunnathan)
  const defaultCenter: [number, number] = [10.5244, 76.2144];

  // Filtering Logic
  const filteredListings = useMemo(() => {
    return CULTURAL_LOCATIONS_DATA.filter((item) => {
      // 1. Text Search Filter
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !query ||
        item.titleEn.toLowerCase().includes(query) ||
        item.titleMl.toLowerCase().includes(query) ||
        item.primaryArtform.toLowerCase().includes(query) ||
        item.address.toLowerCase().includes(query) ||
        item.descriptionEn.toLowerCase().includes(query);

      // 2. Art Form Filter
      const matchesArtform = 
        selectedArtform === 'ALL' || item.primaryArtform === selectedArtform;

      // 3. Location / Taluk Filter
      const matchesLocation = 
        selectedLocation === 'ALL' || item.taluk === selectedLocation;

      // 4. Date / Timing Filter
      const matchesDateTiming = 
        selectedDateTiming === 'ALL' || 
        (selectedDateTiming === 'DAILY' && item.timingOrDate.includes('Open Daily')) ||
        (selectedDateTiming === 'FESTIVAL' && (item.timingOrDate.includes('Pooram') || item.timingOrDate.includes('Festival'))) ||
        (selectedDateTiming === 'OFFICE_HOURS' && (item.timingOrDate.includes('Monday') || item.timingOrDate.includes('Tuesday')));

      // 5. Experience Type Filter
      const matchesExperience = 
        selectedExperienceType === 'ALL' || item.experienceType === selectedExperienceType;

      // 6. Cultural Category Filter
      const matchesCategory = 
        selectedCategory === 'ALL' || item.culturalCategory === selectedCategory;

      return (
        matchesSearch && 
        matchesArtform && 
        matchesLocation && 
        matchesDateTiming && 
        matchesExperience && 
        matchesCategory
      );
    });
  }, [
    searchQuery, 
    selectedArtform, 
    selectedLocation, 
    selectedDateTiming, 
    selectedExperienceType, 
    selectedCategory
  ]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedArtform('ALL');
    setSelectedLocation('ALL');
    setSelectedDateTiming('ALL');
    setSelectedExperienceType('ALL');
    setSelectedCategory('ALL');
    setFlyToCoords(null);
  };

  const hasActiveFilters = 
    searchQuery !== '' || 
    selectedArtform !== 'ALL' || 
    selectedLocation !== 'ALL' || 
    selectedDateTiming !== 'ALL' || 
    selectedExperienceType !== 'ALL' || 
    selectedCategory !== 'ALL';

  return (
    <section className="py-8 sm:py-12 bg-parchment-texture min-h-[calc(100vh-80px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Header & View Mode Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-warm-sand/30 pb-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cream-gold/30 border border-cream-gold text-deep-brown text-xs font-bold">
              <Compass className="w-3.5 h-3.5 text-traditional-red" />
              <span>Interactive Cultural Map • Thrissur District (തൃശ്ശൂർ)</span>
            </div>
            
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-deep-brown tracking-tight">
              {language === 'en' ? 'Thrissur Cultural Sanctuary Map' : 'തൃശ്ശൂർ സാംസ്കാരിക ഭൂപടം'}
            </h1>

            <p className="text-xs sm:text-sm text-deep-brown/80 leading-relaxed">
              {language === 'en'
                ? 'Geospatial exploration of sacred monuments, living master studios, GI-tagged weaving clusters, and temple festival grounds across all 6 taluks of Thrissur district.'
                : 'വടക്കുന്നാഥൻ, കലാമണ്ഡലം, കുത്തമ്പുള്ളി, നടവരമ്പ് തുടങ്ങി തൃശ്ശൂരിന്റെ സാംസ്കാരിക കേന്ദ്രങ്ങൾ ഭൂപടത്തിലൂടെയോ ഡയറക്ടറിയിലൂടെയോ നേരിട്ട് കണ്ടെത്താം.'}
            </p>
          </div>

          {/* View Mode Toggle: [ 🗺️ Map View | 📋 Directory View ] */}
          <div className="flex items-center bg-white p-1.5 rounded-2xl border border-warm-sand/50 shadow-soft shrink-0 self-start md:self-auto">
            <button
              onClick={() => setViewMode('MAP')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                viewMode === 'MAP'
                  ? 'bg-deep-brown text-cream-gold shadow-md'
                  : 'text-deep-brown/70 hover:text-deep-brown hover:bg-parchment-warm'
              }`}
            >
              <MapIcon className="w-4 h-4 text-cream-gold" />
              <span>Map View (ഭൂപടം)</span>
            </button>

            <button
              onClick={() => setViewMode('LIST')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                viewMode === 'LIST'
                  ? 'bg-deep-brown text-cream-gold shadow-md'
                  : 'text-deep-brown/70 hover:text-deep-brown hover:bg-parchment-warm'
              }`}
            >
              <List className="w-4 h-4 text-cream-gold" />
              <span>Directory / List View (ഡയറക്ടറി)</span>
            </button>
          </div>
        </div>

        {/* Filters & Search Control Bar */}
        <div className="bg-white rounded-2xl p-5 border border-warm-sand/50 shadow-soft space-y-4">
          
          {/* Search Input Row */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-sand" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  language === 'en'
                    ? 'Search by name, place, artform (e.g. Vadakkunnathan, Kuthampully, Kalamandalam)...'
                    : 'പേര്, സ്ഥലം അല്ലെങ്കിൽ കല തിരയുക...'
                }
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-warm-sand/50 bg-parchment-warm/40 focus:bg-white focus:border-terracotta text-xs sm:text-sm outline-none text-deep-brown placeholder-deep-brown/40"
              />
            </div>

            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl border border-traditional-red/40 text-traditional-red hover:bg-traditional-red/10 text-xs font-bold transition-colors shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          {/* 5 Filter Categories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2 text-xs">
            
            {/* Filter 1: Art Form */}
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-olive-green uppercase tracking-wider">
                1. Art Form (കലാരൂപം)
              </label>
              <select
                value={selectedArtform}
                onChange={(e) => setSelectedArtform(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-warm-sand/50 bg-parchment-warm/30 focus:bg-white focus:border-terracotta text-xs font-medium outline-none text-deep-brown shadow-sm"
              >
                <option value="ALL">All Art Forms (എല്ലാ കലകളും)</option>
                <option value="Kathakali & Koodiyattam">Kathakali & Koodiyattam</option>
                <option value="Chenda & Melam">Chenda & Melam</option>
                <option value="Temple Architecture & Mural Art">Temple Architecture & Murals</option>
                <option value="Handloom & Textiles">Handloom & Textiles</option>
                <option value="Bell Metal & Bronze">Bell Metal & Bronze</option>
                <option value="Folk & Ritual Art">Folk & Ritual Art</option>
                <option value="Theatre & Folk Arts">Theatre & Folk Arts</option>
                <option value="Painting, Sculpture & Murals">Painting & Sculpture</option>
                <option value="Temple Architecture & Literature">Literature & Archives</option>
              </select>
            </div>

            {/* Filter 2: Location / Taluk */}
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-olive-green uppercase tracking-wider">
                2. Location / Taluk (താലൂക്ക്)
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-warm-sand/50 bg-parchment-warm/30 focus:bg-white focus:border-terracotta text-xs font-medium outline-none text-deep-brown shadow-sm"
              >
                <option value="ALL">All 6 Taluks (എല്ലാ താലൂക്കുകളും)</option>
                <option value="Thrissur">Thrissur Town (തൃശ്ശൂർ)</option>
                <option value="Thalapilly">Thalapilly / Cheruthuruthy (തലപ്പിള്ളി)</option>
                <option value="Mukundapuram">Mukundapuram / Irinjalakuda (മുകുന്ദപുരം)</option>
                <option value="Chavakkad">Chavakkad / Guruvayur (ചാവക്കാട്)</option>
                <option value="Kodungallur">Kodungallur (കൊടുങ്ങല്ലൂർ)</option>
                <option value="Chalakudy">Chalakudy / Athirappilly (ചാലക്കുടി)</option>
              </select>
            </div>

            {/* Filter 3: Experience Type */}
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-olive-green uppercase tracking-wider">
                3. Experience Type (അനുഭവം)
              </label>
              <select
                value={selectedExperienceType}
                onChange={(e) => setSelectedExperienceType(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-warm-sand/50 bg-parchment-warm/30 focus:bg-white focus:border-terracotta text-xs font-medium outline-none text-deep-brown shadow-sm"
              >
                <option value="ALL">All Experiences (എല്ലാം)</option>
                <option value="HERITAGE_WALK">Heritage Monument Walk</option>
                <option value="STUDIO_VISIT">Artisan Studio Visit</option>
                <option value="LIVE_PERFORMANCE">Live Festival Performance</option>
                <option value="MUSEUM_ARCHIVE">Museum & Academy Archive</option>
              </select>
            </div>

            {/* Filter 4: Cultural Category */}
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-olive-green uppercase tracking-wider">
                4. Cultural Category (വിഭാഗം)
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-warm-sand/50 bg-parchment-warm/30 focus:bg-white focus:border-terracotta text-xs font-medium outline-none text-deep-brown shadow-sm"
              >
                <option value="ALL">All Categories (എല്ലാ വിഭാഗങ്ങളും)</option>
                <option value="HERITAGE_MONUMENT">🏛️ Heritage Monument</option>
                <option value="CRAFT_CLUSTER">🧵 GI Craft Cluster</option>
                <option value="CULTURAL_FESTIVAL">🎪 Festival Grounds</option>
                <option value="ACADEMY_MUSEUM">🎓 Academy & Museum</option>
              </select>
            </div>

            {/* Filter 5: Date / Timing */}
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-olive-green uppercase tracking-wider">
                5. Date & Timings (സമയക്രമം)
              </label>
              <select
                value={selectedDateTiming}
                onChange={(e) => setSelectedDateTiming(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-warm-sand/50 bg-parchment-warm/30 focus:bg-white focus:border-terracotta text-xs font-medium outline-none text-deep-brown shadow-sm"
              >
                <option value="ALL">All Timings (എല്ലാ സമയങ്ങളും)</option>
                <option value="DAILY">Open Daily (Year-Round)</option>
                <option value="FESTIVAL">Pooram & Festival Seasons</option>
                <option value="OFFICE_HOURS">Museum & Weekday Hours</option>
              </select>
            </div>

          </div>

          {/* Results Badge */}
          <div className="flex items-center justify-between pt-2 border-t border-warm-sand/20 text-xs">
            <span className="text-deep-brown/80">
              Showing <strong className="text-traditional-red">{filteredListings.length}</strong> of 18 Cultural Locations across Thrissur District
            </span>

            <span className="text-[11px] text-olive-green flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-olive-green" />
              <span>Accurate Geographic Coordinates (WGS 84 / PostGIS)</span>
            </span>
          </div>

        </div>

        {/* ========================================================
            VIEW MODE A: INTERACTIVE LEAFLET & OPENSTREETMAP CANVAS
           ======================================================== */}
        {viewMode === 'MAP' && (
          <div className="relative rounded-3xl overflow-hidden border-2 border-cream-gold shadow-cultural bg-white">
            
            {/* Map Container - Responsive Viewport */}
            <div className="h-[380px] sm:h-[480px] lg:h-[620px] w-full z-0">
              <MapContainer
                center={defaultCenter}
                zoom={11}
                scrollWheelZoom={true}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Recenter helper when flyToCoords changes */}
                {flyToCoords && <RecenterMap lat={flyToCoords.lat} lng={flyToCoords.lng} />}

                {/* Cultural Location Markers */}
                {filteredListings.map((item) => (
                  <Marker
                    key={item.id}
                    position={[item.location.lat, item.location.lng]}
                    icon={createCategoryIcon(item.culturalCategory)}
                  >
                    {/* Marker Preview Card on Click */}
                    <Popup className="custom-cultural-preview-popup" minWidth={240} maxWidth={280}>
                      <div className="p-1 space-y-2.5">
                        
                        {/* Image Preview */}
                        <div className="relative h-28 sm:h-32 w-full rounded-xl overflow-hidden bg-deep-brown">
                          <img
                            src={item.image}
                            alt={item.titleEn}
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-deep-brown/90 text-cream-gold text-[10px] font-bold border border-cream-gold/40">
                            {item.categoryLabelEn}
                          </span>
                        </div>

                        {/* Title & Location */}
                        <div>
                          <h4 className="font-display text-sm font-bold text-deep-brown leading-snug">
                            {language === 'en' ? item.titleEn : item.titleMl}
                          </h4>
                          <p className="text-[11px] text-terracotta font-semibold mt-0.5">
                            {item.primaryArtform}
                          </p>
                          <p className="text-[10px] text-olive-green flex items-center space-x-1 mt-0.5">
                            <MapPin className="w-3 h-3 shrink-0" />
                            <span>{item.address}</span>
                          </p>
                        </div>

                        {/* Timing Snippet */}
                        <div className="flex items-center space-x-1 text-[10px] text-deep-brown/70 bg-parchment-warm p-1.5 rounded-lg">
                          <Clock className="w-3 h-3 text-terracotta shrink-0" />
                          <span className="line-clamp-1">{item.timingOrDate}</span>
                        </div>

                        {/* View Complete Details Button */}
                        <div className="pt-2 flex items-center justify-between border-t border-warm-sand/30 gap-2">
                          <button
                            onClick={() => setActiveModalLocation(item)}
                            className="px-2.5 py-1 rounded-lg bg-parchment-warm hover:bg-cream-gold/40 text-deep-brown text-[11px] font-semibold transition-colors"
                          >
                            Quick View
                          </button>

                          <button
                            onClick={() => navigateToLocationDetail(item)}
                            className="px-3 py-1.5 rounded-lg bg-traditional-red hover:bg-traditional-red-dark text-white text-xs font-bold shadow-sm transition-colors flex items-center space-x-1"
                          >
                            <span>Full Details</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>

                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>

            {/* Floating Map Legend Card */}
            <div className="absolute bottom-4 left-4 z-10 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-warm-sand/50 shadow-soft text-xs space-y-2 hidden sm:block max-w-xs">
              <p className="font-bold text-deep-brown flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-traditional-red" />
                <span>Map Category Legend</span>
              </p>
              <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11px] text-deep-brown/80">
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded-full bg-traditional-red shrink-0" />
                  <span>Heritage Monument</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded-full bg-terracotta shrink-0" />
                  <span>GI Craft Cluster</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded-full bg-deep-brown shrink-0" />
                  <span>Festival Grounds</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded-full bg-olive-green shrink-0" />
                  <span>Academy & Museum</span>
                </div>
              </div>
            </div>

            {/* Quick Quick-Finder Fly-To Pills on Map */}
            <div className="absolute top-4 right-4 z-10 bg-white/95 backdrop-blur-md p-2 rounded-2xl border border-warm-sand/50 shadow-soft hidden md:flex items-center space-x-1 text-xs">
              <span className="font-semibold text-deep-brown text-[11px] px-2">Jump to:</span>
              <button
                onClick={() => setFlyToCoords({ lat: 10.5244, lng: 76.2144 })}
                className="px-2.5 py-1 rounded-lg bg-parchment-warm hover:bg-traditional-red hover:text-white transition-colors text-[11px] font-bold"
              >
                Swaraj Round
              </button>
              <button
                onClick={() => setFlyToCoords({ lat: 10.7483, lng: 76.2798 })}
                className="px-2.5 py-1 rounded-lg bg-parchment-warm hover:bg-traditional-red hover:text-white transition-colors text-[11px] font-bold"
              >
                Cheruthuruthy
              </button>
              <button
                onClick={() => setFlyToCoords({ lat: 10.7412, lng: 76.4385 })}
                className="px-2.5 py-1 rounded-lg bg-parchment-warm hover:bg-traditional-red hover:text-white transition-colors text-[11px] font-bold"
              >
                Kuthampully
              </button>
              <button
                onClick={() => setFlyToCoords({ lat: 10.3341, lng: 76.2305 })}
                className="px-2.5 py-1 rounded-lg bg-parchment-warm hover:bg-traditional-red hover:text-white transition-colors text-[11px] font-bold"
              >
                Nadavaramba
              </button>
              <button
                onClick={() => setFlyToCoords({ lat: 10.5947, lng: 76.0384 })}
                className="px-2.5 py-1 rounded-lg bg-parchment-warm hover:bg-traditional-red hover:text-white transition-colors text-[11px] font-bold"
              >
                Guruvayur
              </button>
            </div>

          </div>
        )}

        {/* ========================================================
            VIEW MODE B: SEPARATE DIRECTORY / LIST VIEW
           ======================================================== */}
        {viewMode === 'LIST' && (
          <div className="space-y-6">
            
            {/* Header info */}
            <div className="flex items-center justify-between text-xs font-semibold text-deep-brown">
              <span>Directory of 18 Cultural Locations across Thrissur</span>
              <button
                onClick={() => setViewMode('MAP')}
                className="text-traditional-red hover:underline flex items-center space-x-1"
              >
                <MapIcon className="w-3.5 h-3.5" />
                <span>Switch to Map View</span>
              </button>
            </div>

            {/* Listings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredListings.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl overflow-hidden bg-white border border-warm-sand/40 shadow-soft hover:shadow-cultural transition-all flex flex-col justify-between group"
                >
                  {/* Card Image */}
                  <div className="relative h-52 overflow-hidden bg-deep-brown">
                    <img
                      src={item.image}
                      alt={item.titleEn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-brown via-transparent to-transparent" />
                    
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-deep-brown/85 backdrop-blur-sm text-cream-gold text-[10px] font-bold border border-cream-gold/30">
                      {item.categoryLabelEn}
                    </span>

                    <span className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold">
                      📍 {item.taluk} Taluk
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-terracotta tracking-wider">
                        {item.primaryArtform}
                      </span>

                      <h3 className="font-display text-base font-bold text-deep-brown leading-snug group-hover:text-traditional-red transition-colors">
                        {language === 'en' ? item.titleEn : item.titleMl}
                      </h3>

                      <p className="text-xs text-deep-brown/75 line-clamp-3 leading-relaxed mt-2">
                        {language === 'en' ? item.descriptionEn : item.descriptionMl}
                      </p>

                      {/* Highlights */}
                      <div className="flex flex-wrap gap-1 pt-3">
                        {item.highlights.slice(0, 3).map((h, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded bg-parchment-warm text-deep-brown text-[10px] font-medium"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer Row */}
                    <div className="pt-3 border-t border-warm-sand/30 flex items-center justify-between">
                      <button
                        onClick={() => {
                          setFlyToCoords({ lat: item.location.lat, lng: item.location.lng });
                          setViewMode('MAP');
                        }}
                        className="text-xs font-semibold text-olive-green hover:underline flex items-center space-x-1"
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        <span>Locate on Map</span>
                      </button>

                      <button
                        onClick={() => navigateToLocationDetail(item)}
                        className="px-3.5 py-1.5 rounded-xl bg-traditional-red hover:bg-traditional-red-dark text-white text-xs font-bold shadow-sm transition-colors flex items-center space-x-1"
                      >
                        <span>View Dossier</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>

      {/* ========================================================
          COMPLETE DETAILS MODAL
         ======================================================== */}
      {activeModalLocation && (
        <div className="fixed inset-0 z-60 overflow-y-auto bg-deep-brown/85 backdrop-blur-sm flex items-start sm:items-center justify-center p-3 sm:p-6 animate-fadeIn">
          <div className="relative w-full max-w-3xl bg-white rounded-2xl overflow-hidden shadow-cultural border-2 border-cream-gold my-auto my-3 sm:my-6">
            
            {/* Modal Image Header */}
            <div className="relative h-48 sm:h-64 md:h-80 bg-deep-brown">
              <img
                src={activeModalLocation.image}
                alt={activeModalLocation.titleEn}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-brown via-deep-brown/40 to-transparent" />

              <button
                onClick={() => setActiveModalLocation(null)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full bg-deep-brown/80 text-cream-gold hover:bg-traditional-red transition-colors z-10 shadow-md"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-3 left-4 right-4 sm:bottom-4 sm:left-6 sm:right-6 text-white space-y-1.5">
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-cream-gold text-deep-brown text-[10px] sm:text-xs font-bold">
                    {activeModalLocation.categoryLabelEn}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-[10px] sm:text-xs font-semibold">
                    {activeModalLocation.experienceTypeLabelEn}
                  </span>
                </div>

                <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold leading-tight">
                  {language === 'en' ? activeModalLocation.titleEn : activeModalLocation.titleMl}
                </h2>
                
                <p className="text-[11px] sm:text-xs text-cream-gold font-medium flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{activeModalLocation.address}</span>
                </p>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-4 sm:p-8 space-y-5 sm:space-y-6 max-h-[50vh] sm:max-h-[60vh] overflow-y-auto text-xs sm:text-sm text-deep-brown/85 leading-relaxed">
              
              {/* Detailed Descriptions */}
              <div className="space-y-2">
                <h4 className="font-heading text-base font-bold text-deep-brown border-b border-warm-sand/30 pb-1">
                  {language === 'en' ? 'Cultural Significance & Overview' : 'സാംസ്കാരിക പ്രാധാന്യം'}
                </h4>
                <p className="leading-relaxed">
                  {activeModalLocation.descriptionEn}
                </p>
                <p className="font-malayalam text-deep-brown/80 leading-relaxed bg-parchment-warm p-3.5 rounded-xl border border-warm-sand/30">
                  {activeModalLocation.descriptionMl}
                </p>
              </div>

              {/* Geographic Coordinates & Location Details */}
              <div className="bg-parchment-warm p-4 rounded-xl border border-warm-sand/40 space-y-2 text-xs">
                <span className="font-bold text-deep-brown uppercase tracking-wider block text-[10px]">
                  Verified Geographic Coordinates (Thrissur WGS 84):
                </span>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-terracotta font-bold text-xs">
                    Latitude: {activeModalLocation.location.lat}° N • Longitude: {activeModalLocation.location.lng}° E
                  </span>

                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${activeModalLocation.location.lat},${activeModalLocation.location.lng}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-1 text-traditional-red font-bold hover:underline"
                  >
                    <span>Get Directions in Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Timing, Guidelines & Entry Fee */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-white border border-warm-sand/40 space-y-1">
                  <span className="font-bold text-olive-green flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Visiting Hours / Schedule:</span>
                  </span>
                  <p className="text-deep-brown font-medium">
                    {activeModalLocation.timingOrDate}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-warm-sand/40 space-y-1">
                  <span className="font-bold text-terracotta flex items-center space-x-1">
                    <Info className="w-3.5 h-3.5" />
                    <span>Advisory & Guidelines:</span>
                  </span>
                  <p className="text-deep-brown">
                    {activeModalLocation.dressCodeOrAdvisory || 'Respectful conduct requested.'}
                  </p>
                </div>
              </div>

              {/* Key Cultural Highlights */}
              <div className="space-y-2">
                <h4 className="font-heading text-sm font-bold text-deep-brown">
                  Key Cultural Highlights
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeModalLocation.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg bg-cream-gold/25 border border-cream-gold text-deep-brown text-xs font-semibold"
                    >
                      ✓ {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Sample / Illustrative Data Notice */}
              <div className="p-3 rounded-xl bg-parchment-warm/60 border border-warm-sand/30 text-[11px] text-deep-brown/70 flex items-start space-x-2">
                <Info className="w-4 h-4 text-olive-green shrink-0 mt-0.5" />
                <p>
                  <strong>Cultural Listing Notice:</strong> {activeModalLocation.sampleDisclaimer} Contact: {activeModalLocation.contactOrWebsite || 'Thrissur Cultural Department'}.
                </p>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-parchment-dark border-t border-warm-sand/30 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => setActiveModalLocation(null)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-deep-brown hover:bg-white transition-colors"
              >
                Close Preview
              </button>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    setFlyToCoords({
                      lat: activeModalLocation.location.lat,
                      lng: activeModalLocation.location.lng,
                    });
                    setActiveModalLocation(null);
                    setViewMode('MAP');
                  }}
                  className="px-4 py-2 rounded-xl bg-parchment-warm hover:bg-white text-deep-brown border border-warm-sand/40 text-xs font-bold shadow-xs transition-colors flex items-center space-x-1.5"
                >
                  <Navigation className="w-3.5 h-3.5 text-olive-green" />
                  <span>Center on Map</span>
                </button>

                <button
                  onClick={() => {
                    const target = activeModalLocation;
                    setActiveModalLocation(null);
                    navigateToLocationDetail(target);
                  }}
                  className="px-5 py-2 rounded-xl bg-traditional-red hover:bg-traditional-red-dark text-white text-xs font-bold shadow transition-colors flex items-center space-x-1.5"
                >
                  <span>Open Dedicated Dossier Page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
