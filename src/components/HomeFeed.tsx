import React, { useState } from 'react';
import { useCultural } from '../context/CulturalContext';
import { Hero } from './Hero';
import { CULTURAL_LOCATIONS_DATA } from '../data/culturalLocationsData';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { 
  Sparkles, 
  MapPin, 
  ArrowRight, 
  Calendar, 
  Award, 
  BookOpen, 
  Phone,
  Flame,
  CheckCircle,
  PlusCircle,
  Volume2,
  Clock,
  Layers,
  Heart,
  Palette,
  Eye,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  Compass
} from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { CulturalCardSkeleton } from './CulturalSkeleton';

// Custom SVG Icons for the Map in Home
const createMiniIcon = (bgColor: string, symbol: string) => {
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="
        background-color: ${bgColor};
        width: 34px;
        height: 34px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #ECCA8A;
        box-shadow: 0 4px 10px rgba(67, 40, 19, 0.35);
      ">
        <span style="transform: rotate(45deg); font-size: 14px; line-height: 1;">${symbol}</span>
      </div>
    `,
    iconSize: [34, 34],
    iconAnchor: [17, 34],
    popupAnchor: [0, -34],
  });
};

const heritagePin = createMiniIcon('#A71903', '🏛️');
const artistPin = createMiniIcon('#BB6D25', '🎭');
const pooramPin = createMiniIcon('#432813', '🎪');

export const HomeFeed: React.FC = () => {
  const { 
    language, 
    artforms, 
    artists, 
    culturalEvents, 
    heritageLocations, 
    workshops,
    creations,
    setActiveTab, 
    setSelectedArtist, 
    setSelectedArtform, 
    setSelectedHeritage,
    navigateToLocationDetail,
    setInquiryArtist,
    setIsUploadModalOpen 
  } = useCultural();

  const [activeTabHighlight, setActiveTabHighlight] = useState('swaraj');
  const shouldReduceMotion = useReducedMotion();

  // Categories requested by the user
  const exploreCategories = [
    {
      id: 'traditional-art',
      titleEn: 'Traditional Art',
      titleMl: 'പാരമ്പര്യ കലകൾ',
      descriptionEn: 'Sacred temple murals, Kathakali Koppu headdresses & ritual paintings.',
      descriptionMl: 'ക്ഷേത്ര ചുവർചിത്രങ്ങൾ, കഥകളി കിരീട നിർമ്മാണം.',
      image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80',
      tabTarget: 'discover',
      filterTarget: 'art-mural',
      count: '15+ Studios'
    },
    {
      id: 'performing-arts',
      titleEn: 'Performing Arts',
      titleMl: 'രംഗകലകൾ',
      descriptionEn: 'UNESCO Koodiyattam, Kathakali, Mohiniyattam & temple Melam.',
      descriptionMl: 'കൂടിയാട്ടം, കഥകളി, മോഹിനിയാട്ടം, പഞ്ചവാദ്യം.',
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
      tabTarget: 'discover',
      filterTarget: 'art-koodiyattam',
      count: '40+ Masters'
    },
    {
      id: 'handicrafts',
      titleEn: 'Handicrafts',
      titleMl: 'കരകൗശലങ്ങൾ',
      descriptionEn: 'GI-tagged Kuthampully Kasavu weaving & Nadavaramba bell metal casting.',
      descriptionMl: 'കുത്തമ്പുള്ളി കൈത്തറി, നടവരമ്പ് വെങ്കല ശിൽപങ്ങൾ.',
      image: 'https://images.unsplash.com/photo-1582560475093-ba66accbc424?auto=format&fit=crop&w=600&q=80',
      tabTarget: 'discover',
      filterTarget: 'art-nadavaramba',
      count: '2 GI Clusters'
    },
    {
      id: 'heritage-places',
      titleEn: 'Heritage Places',
      titleMl: 'പൈതൃക കേന്ദ്രങ്ങൾ',
      descriptionEn: 'Vadakkunnathan Temple, Shakthan Palace & Asian Gothic basilicas.',
      descriptionMl: 'വടക്കുന്നാഥൻ, ശക്തൻ കൊട്ടാരം, പുത്തൻപള്ളി.',
      image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=600&q=80',
      tabTarget: 'heritage',
      filterTarget: 'all',
      count: '12 Monuments'
    },
    {
      id: 'cultural-festivals',
      titleEn: 'Cultural Festivals',
      titleMl: 'ഉത്സവങ്ങളും പൂരങ്ങളും',
      descriptionEn: 'Thrissur Pooram, Swaraj Round Pulikali & Mamangam effigies.',
      descriptionMl: 'തൃശ്ശൂർ പൂരം, പുലിക്കളി, മച്ചാട് മാമാങ്കം.',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
      tabTarget: 'events',
      filterTarget: 'all',
      count: '25+ Poorams'
    },
    {
      id: 'workshops',
      titleEn: 'Workshops',
      titleMl: 'കളരികളും ശിൽപശാലകളും',
      descriptionEn: 'Hands-on masterclasses in temple rhythms, mural pigments & mudras.',
      descriptionMl: 'ചെണ്ടമേളം, ചുവർചിത്രം, കൂടിയാട്ടം ക്ലാസുകൾ.',
      image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80',
      tabTarget: 'workshops',
      filterTarget: 'all',
      count: '6 Active Classes'
    }
  ];

  // Featured Cultural Experiences
  const featuredExperiences = [
    {
      id: 'exp-1',
      locationId: 'loc-kalamandalam',
      titleEn: 'Koodiyattam Sanskrit Theatre at Kalamandalam',
      titleMl: 'കേരള കലാമണ്ഡലത്തിലെ കൂടിയാട്ടം',
      location: 'Cheruthuruthy, Thalapilly',
      descriptionEn: 'Experience 1,800 years of unbroken Sanskrit theatrical heritage on the banks of River Bharathapuzha.',
      descriptionMl: 'ഭാരതപ്പുഴയുടെ തീരത്ത് യുനെസ്കോ അംഗീകരിച്ച ലോകത്തിലെ ഏറ്റവും പുരാതന സംസ്കൃത നാടകം കാണാം.',
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
      badge: 'UNESCO Heritage'
    },
    {
      id: 'exp-2',
      locationId: 'loc-thekkinkadu-maidan',
      titleEn: 'The Thunderous Ilanjithara Melam',
      titleMl: 'ഇലഞ്ഞിത്തറയിലെ പാണ്ടിമേളം',
      location: 'Thekkinkadu Maidan, Thrissur',
      descriptionEn: '250 master percussionists synchronizing under the Ilanji tree during the peak of Thrissur Pooram.',
      descriptionMl: 'ഇലഞ്ഞിത്തറയിൽ 250 മേളപ്രമാണിമാരുടെ അത്യുജ്ജ്വല താളവിസ്മയം.',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
      badge: 'World Acoustic Wonder'
    },
    {
      id: 'exp-3',
      locationId: 'loc-vadakkunnathan',
      titleEn: 'Vadakkunnathan 1,000-Year Ancient Murals',
      titleMl: 'വടക്കുന്നാഥനിലെ പുരാതന ചുവർചിത്രങ്ങൾ',
      location: 'Swaraj Round, Thrissur',
      descriptionEn: 'Admire rare 15th-century Panchavarna fresco murals painted with vegetable dyes on ancient wooden architecture.',
      descriptionMl: 'പ്രകൃതിദത്ത വർണ്ണങ്ങൾ കൊണ്ട് രചിച്ച അതിപുരാതന ചുവർചിത്രങ്ങളും കൂത്തമ്പലവും.',
      image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80',
      badge: 'UNESCO Asia-Pacific Award'
    },
    {
      id: 'exp-4',
      locationId: 'loc-kuthampully',
      titleEn: 'Kuthampully Handloom Weavers’ Trail',
      titleMl: 'കുത്തമ്പുള്ളി പാരമ്പര്യ കൈത്തറി ഗ്രാമം',
      location: 'Thiruvilwamala, Thrissur',
      descriptionEn: 'Watch generational pit-loom artisans weave pure gold Kasavu sarees using authentic jacquard designs.',
      descriptionMl: 'അഞ്ഞൂറ് വർഷത്തെ പാരമ്പര്യമുള്ള കൈത്തറി ഗ്രാമത്തിലെ സന്ദർശനം.',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      badge: 'GI Tag Certified'
    },
    {
      id: 'exp-5',
      locationId: 'loc-nadavaramba',
      titleEn: 'Nadavaramba Lost-Wax Bell Metal Casting',
      titleMl: 'നടവരമ്പ് വെങ്കല ശിൽപശാലകൾ',
      location: 'Irinjalakuda, Mukundapuram',
      descriptionEn: 'Witness molten bronze being poured into beeswax clay moulds to forge resonant temple bells and Nilavilakku.',
      descriptionMl: 'മെഴുക് അച്ചുകളിൽ വെങ്കലം വാർത്തെടുക്കുന്ന പ്രാചീന ലോഹവിദ്യ.',
      image: 'https://images.unsplash.com/photo-1582560475093-ba66accbc424?auto=format&fit=crop&w=800&q=80',
      badge: 'GI Tag Certified'
    },
    {
      id: 'exp-6',
      locationId: 'loc-thekkinkadu-maidan',
      titleEn: 'Pulikali Roaring Tiger Carnival',
      titleMl: 'സ്വരാജ് റൗണ്ട് പുലിക്കളി ഉത്സവം',
      location: 'Swaraj Round, Thrissur',
      descriptionEn: 'Hundreds of painted tiger dancers and vibrant floats circling Swaraj Round on the 4th day of Onam.',
      descriptionMl: 'ഓണത്തിന്റെ നാലാം നാളിൽ തൃശ്ശൂരിനെ ഇളക്കിമറിക്കുന്ന നാടോടി ഉത്സവവിസ്മയം.',
      image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
      badge: '200-Year Tradition'
    }
  ];

  return (
    <div className="space-y-20 pb-20 bg-parchment">
      
      {/* SECTION 1: HERO SECTION */}
      <Hero />

      {/* SECTION 2: EXPLORE BY CATEGORY */}
      <motion.section 
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-warm-sand/30 pb-4">
          <div className="space-y-1">
            <span className="text-terracotta font-heading tracking-widest uppercase text-xs font-semibold">
              {language === 'en' ? 'Cultural Taxonomy' : 'വിഭാഗങ്ങൾ'}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-deep-brown">
              {language === 'en' ? 'Explore by Category' : 'വിഭാഗം തിരിച്ച് കണ്ടെത്താം'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-deep-brown/70 max-w-md">
            {language === 'en'
              ? 'Discover traditions, performances, monuments and artisan guilds across Thrissur.'
              : 'തൃശ്ശൂരിന്റെ കലകളും പൈതൃക കേന്ദ്രങ്ങളും എളുപ്പത്തിൽ കണ്ടെത്താം.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {exploreCategories.map((cat) => (
            <motion.div
              key={cat.id}
              whileHover={shouldReduceMotion ? {} : { y: -6, scale: 1.01 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              onClick={() => setActiveTab(cat.tabTarget)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-warm-sand/40 shadow-soft hover:shadow-cultural transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.titleEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-brown via-deep-brown/30 to-transparent" />
                
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-deep-brown/80 backdrop-blur-sm text-cream-gold text-[10px] font-bold border border-cream-gold/30">
                  {cat.count}
                </span>

                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <h3 className="font-display text-xl font-bold">
                    {language === 'en' ? cat.titleEn : cat.titleMl}
                  </h3>
                  <p className="font-malayalam text-xs text-parchment-warm">
                    {language === 'en' ? cat.titleMl : cat.titleEn}
                  </p>
                </div>
              </div>

              <div className="p-4 flex items-center justify-between">
                <p className="text-xs text-deep-brown/80 line-clamp-2 pr-2">
                  {language === 'en' ? cat.descriptionEn : cat.descriptionMl}
                </p>
                <div className="w-8 h-8 rounded-full bg-parchment-warm group-hover:bg-traditional-red group-hover:text-white text-deep-brown flex items-center justify-center transition-colors shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Traditional Kerala Motif Divider */}
      <div className="flex items-center justify-center space-x-4 max-w-xs mx-auto py-2 opacity-60">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-warm-sand" />
        <div className="w-7 h-7 rounded-full bg-deep-brown/5 border border-cream-gold flex items-center justify-center">
          <Flame className="w-3.5 h-3.5 text-terracotta" />
        </div>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-warm-sand" />
      </div>

      {/* SECTION 3: FEATURED CULTURAL EXPERIENCES */}
      <motion.section 
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-warm-sand/30 pb-4">
          <div className="space-y-1">
            <span className="text-terracotta font-heading tracking-widest uppercase text-xs font-semibold">
              {language === 'en' ? 'Curated Highlights' : 'പ്രത്യേക അനുഭവങ്ങൾ'}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-deep-brown">
              {language === 'en' ? 'Featured Cultural Experiences' : 'പ്രധാന സാംസ്കാരിക അനുഭവങ്ങൾ'}
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('discover')}
            className="text-xs font-bold text-traditional-red hover:underline flex items-center space-x-1"
          >
            <span>{language === 'en' ? 'Explore All Dossiers' : 'എല്ലാ വിവരങ്ങളും'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredExperiences.map((exp) => (
            <motion.div
              key={exp.id}
              whileHover={shouldReduceMotion ? {} : { y: -6 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              onClick={() => {
                const loc = CULTURAL_LOCATIONS_DATA.find((l) => l.id === exp.locationId);
                if (loc) {
                  navigateToLocationDetail(loc);
                } else {
                  setActiveTab('map');
                }
              }}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-warm-sand/40 shadow-soft hover:shadow-cultural transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={exp.image}
                  alt={exp.titleEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-brown via-deep-brown/20 to-transparent" />
                
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-deep-brown/90 backdrop-blur-sm text-cream-gold text-[10px] font-bold border border-cream-gold/40 flex items-center space-x-1">
                  <Sparkles className="w-3 h-3 text-cream-gold" />
                  <span>{exp.badge}</span>
                </span>
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-[11px] text-terracotta font-semibold flex items-center space-x-1 mb-1">
                    <MapPin className="w-3 h-3" />
                    <span>{exp.location}</span>
                  </p>
                  <h3 className="font-display text-lg font-bold text-deep-brown group-hover:text-traditional-red transition-colors">
                    {language === 'en' ? exp.titleEn : exp.titleMl}
                  </h3>
                  <p className="text-xs text-deep-brown/80 leading-relaxed mt-2">
                    {language === 'en' ? exp.descriptionEn : exp.descriptionMl}
                  </p>
                </div>

                <div className="pt-3 border-t border-warm-sand/30 flex items-center justify-between text-xs font-semibold text-traditional-red">
                  <span>{language === 'en' ? 'Read Complete Story' : 'കൂടുതൽ അറിയാം'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Traditional Kerala Motif Divider */}
      <div className="flex items-center justify-center space-x-4 max-w-xs mx-auto py-2 opacity-60">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-warm-sand" />
        <div className="w-7 h-7 rounded-full bg-deep-brown/5 border border-cream-gold flex items-center justify-center">
          <Flame className="w-3.5 h-3.5 text-terracotta" />
        </div>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-warm-sand" />
      </div>

      {/* SECTION 4: DISCOVER LOCAL ARTISTS */}
      <motion.section 
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-warm-sand/30 pb-4">
          <div className="space-y-1">
            <span className="text-terracotta font-heading tracking-widest uppercase text-xs font-semibold">
              {language === 'en' ? 'Living Masters & Craftsmen' : 'പാരമ്പര്യ ഗുരുക്കന്മാർ'}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-deep-brown">
              {language === 'en' ? 'Discover Local Artists' : 'പ്രതിഭാധനരായ കലാകാരന്മാർ'}
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('artists')}
            className="text-xs font-bold text-traditional-red hover:underline flex items-center space-x-1"
          >
            <span>{language === 'en' ? 'View 200+ Artists' : 'എല്ലാ കലാകാരന്മാരും'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {artists.slice(0, 3).map((artist) => (
            <motion.div
              key={artist.id}
              whileHover={shouldReduceMotion ? {} : { y: -6 }}
              className="rounded-2xl overflow-hidden bg-white border border-warm-sand/40 shadow-soft hover:shadow-cultural transition-all flex flex-col justify-between"
            >
              <div 
                onClick={() => setSelectedArtist(artist)}
                className="relative h-56 cursor-pointer overflow-hidden bg-deep-brown"
              >
                <img
                  src={artist.artworks[0]?.images[0] || artist.avatar}
                  alt={artist.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-brown via-deep-brown/20 to-transparent" />

                {artist.isVerified && (
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-deep-brown/90 text-cream-gold text-[10px] font-bold border border-cream-gold/40 flex items-center space-x-1 shadow-gold">
                    <Sparkles className="w-3 h-3 text-cream-gold" />
                    <span>Verified Master</span>
                  </span>
                )}

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] text-cream-gold uppercase font-bold">
                    {artist.primaryArtformName}
                  </span>
                  <h3 className="font-display text-base font-bold truncate">
                    {artist.stageName || artist.name}
                  </h3>
                </div>
              </div>

              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={artist.avatar}
                    alt={artist.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-cream-gold shrink-0"
                  />
                  <div>
                    <h4 
                      onClick={() => setSelectedArtist(artist)}
                      className="font-display text-sm font-bold text-deep-brown hover:text-traditional-red cursor-pointer"
                    >
                      {artist.stageName || artist.name}
                    </h4>
                    <p className="text-[11px] text-olive-green">
                      📍 {artist.taluk}, Thrissur • {artist.experienceYears} Years Practice
                    </p>
                  </div>
                </div>

                <p className="text-xs text-deep-brown/80 line-clamp-2 leading-relaxed">
                  {language === 'en' ? artist.bioEn : artist.bioMl}
                </p>

                <div className="pt-3 border-t border-warm-sand/30 flex items-center justify-between">
                  <button
                    onClick={() => setInquiryArtist(artist)}
                    className="px-3.5 py-1.5 rounded-lg bg-traditional-red hover:bg-traditional-red-dark text-white text-xs font-semibold flex items-center space-x-1 shadow-sm"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Book / Inquire</span>
                  </button>

                  <button
                    onClick={() => setSelectedArtist(artist)}
                    className="text-xs text-deep-brown font-semibold hover:text-traditional-red flex items-center space-x-1"
                  >
                    <span>View Profile</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Traditional Kerala Motif Divider */}
      <div className="flex items-center justify-center space-x-4 max-w-xs mx-auto py-2 opacity-60">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-warm-sand" />
        <div className="w-7 h-7 rounded-full bg-deep-brown/5 border border-cream-gold flex items-center justify-center">
          <Flame className="w-3.5 h-3.5 text-terracotta" />
        </div>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-warm-sand" />
      </div>

      {/* SECTION 5: EXPLORE THRISSUR (MAP & CULTURAL HIGHLIGHTS) */}
      <motion.section 
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-warm-sand/30 pb-4">
          <div className="space-y-1">
            <span className="text-terracotta font-heading tracking-widest uppercase text-xs font-semibold">
              {language === 'en' ? 'Geospatial Sanctuary • 6 Taluks' : 'ഭൗമസ്ഥാനിക ഭൂപടം'}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-deep-brown">
              {language === 'en' ? 'Explore Thrissur' : 'തൃശ്ശൂരിനെ അറിയാം'}
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('map')}
            className="flex items-center space-x-1.5 text-xs font-bold text-traditional-red hover:underline"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Open Full Interactive Map' : 'പൂർണ്ണ ഭൂപടം തുറക്കുക'}</span>
          </button>
        </div>

        {/* Embedded Map Canvas Card */}
        <div className="rounded-3xl overflow-hidden border-2 border-cream-gold shadow-cultural bg-white grid grid-cols-1 lg:grid-cols-12">
          
          {/* Map View (7 cols) - Responsive Height */}
          <div className="lg:col-span-7 h-[280px] sm:h-[350px] lg:h-[420px] relative z-0">
            <MapContainer
              center={[10.5244, 76.2144]}
              zoom={11}
              scrollWheelZoom={false}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {heritageLocations.map((loc) => (
                <Marker
                  key={loc.id}
                  position={[loc.location.lat, loc.location.lng]}
                  icon={heritagePin}
                >
                  <Popup>
                    <div className="p-1 max-w-[200px]">
                      <h4 className="font-bold text-xs">{loc.nameEn}</h4>
                      <p className="text-[10px] text-deep-brown/70">{loc.taluk}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}

              {artists.map((art) => (
                <Marker
                  key={art.id}
                  position={[art.location.lat, art.location.lng]}
                  icon={artistPin}
                >
                  <Popup>
                    <div className="p-1 max-w-[200px]">
                      <h4 className="font-bold text-xs">{art.stageName || art.name}</h4>
                      <p className="text-[10px] text-terracotta">{art.primaryArtformName}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* Cultural Highlights Side Panel (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 space-y-6 flex flex-col justify-between bg-parchment-warm">
            <div className="space-y-4">
              <span className="text-xs uppercase font-bold tracking-wider text-traditional-red">
                District Cultural Highlights
              </span>
              
              <h3 className="font-display text-2xl font-bold text-deep-brown">
                {language === 'en' ? 'The Geographic Heart of Kerala’s Arts' : 'കേരള കലകളുടെ ഭൂമിശാസ്ത്ര കേന്ദ്രം'}
              </h3>

              <div className="space-y-3 text-xs text-deep-brown/85">
                <div className="p-3 rounded-xl bg-white border border-warm-sand/40 space-y-1">
                  <span className="font-bold text-deep-brown block">1. Swaraj Round & Thekkinkadu Maidan</span>
                  <p className="text-deep-brown/70 text-[11px]">
                    The colossal 65-acre central ring encircling Vadakkunnathan Temple, hosting the 30-elephant Pooram and Onam Pulikali.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white border border-warm-sand/40 space-y-1">
                  <span className="font-bold text-deep-brown block">2. Cheruthuruthy & River Bharathapuzha</span>
                  <p className="text-deep-brown/70 text-[11px]">
                    The home of Kerala Kalamandalam, where the Gurukula system preserves Kathakali, Koodiyattam and Mohiniyattam.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white border border-warm-sand/40 space-y-1">
                  <span className="font-bold text-deep-brown block">3. Thiruvilwamala & Nadavaramba GI Clusters</span>
                  <p className="text-deep-brown/70 text-[11px]">
                    Generational communities producing pure Kasavu handloom sarees and ancient lost-wax bronze castings.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('map')}
              className="w-full py-3 rounded-xl bg-deep-brown hover:bg-traditional-red text-cream-gold font-bold text-xs shadow-md transition-colors flex items-center justify-center space-x-2"
            >
              <MapPin className="w-4 h-4 text-cream-gold" />
              <span>Explore All 6 Taluks on Interactive Map</span>
            </button>
          </div>

        </div>
      </motion.section>

      {/* Traditional Kerala Motif Divider */}
      <div className="flex items-center justify-center space-x-4 max-w-xs mx-auto py-2 opacity-60">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-warm-sand" />
        <div className="w-7 h-7 rounded-full bg-deep-brown/5 border border-cream-gold flex items-center justify-center">
          <Flame className="w-3.5 h-3.5 text-terracotta" />
        </div>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-warm-sand" />
      </div>

      {/* SECTION 6: UPCOMING EVENTS */}
      <motion.section 
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-warm-sand/30 pb-4">
          <div className="space-y-1">
            <span className="text-terracotta font-heading tracking-widest uppercase text-xs font-semibold">
              {language === 'en' ? 'Festival Calendar • Live Dates' : 'ഉത്സവ കലണ്ടർ'}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-deep-brown">
              {language === 'en' ? 'Upcoming Cultural Events' : 'വരവിരിക്കുന്ന ഉത്സവങ്ങൾ'}
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('events')}
            className="text-xs font-bold text-traditional-red hover:underline flex items-center space-x-1"
          >
            <span>{language === 'en' ? 'View Full Pooram Schedule' : 'പൂർണ്ണ ഷെഡ്യൂൾ'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {culturalEvents.map((evt) => (
            <motion.div
              key={evt.id}
              whileHover={shouldReduceMotion ? {} : { y: -5 }}
              className="rounded-2xl overflow-hidden bg-white border border-warm-sand/40 shadow-soft hover:shadow-cultural transition-all flex flex-col sm:flex-row"
            >
              <div className="sm:w-2/5 h-48 sm:h-auto relative overflow-hidden bg-deep-brown">
                <img
                  src={evt.bannerUrl}
                  alt={evt.titleEn}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-brown via-transparent to-transparent sm:hidden" />
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-traditional-red text-white text-[10px] font-bold">
                  Live Program
                </span>
              </div>

              <div className="sm:w-3/5 p-6 space-y-3 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-terracotta tracking-wider">
                    {evt.artformName}
                  </span>
                  <h3 className="font-display text-lg font-bold text-deep-brown leading-snug">
                    {language === 'en' ? evt.titleEn : evt.titleMl}
                  </h3>
                  <div className="space-y-1 text-xs text-deep-brown/70 pt-1">
                    <p className="flex items-center space-x-1.5">
                      <Calendar className="w-3.5 h-3.5 text-traditional-red shrink-0" />
                      <span>{evt.dateRange} ({evt.malayalamDate})</span>
                    </p>
                    <p className="flex items-center space-x-1.5">
                      <MapPin className="w-3.5 h-3.5 text-olive-green shrink-0" />
                      <span className="truncate">{evt.venueName}</span>
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-warm-sand/30 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-olive-green">
                    {evt.isFreeEntry ? 'Free Public Entry' : 'Pass Required'}
                  </span>
                  <button
                    onClick={() => setActiveTab('events')}
                    className="px-4 py-1.5 rounded-xl bg-deep-brown hover:bg-traditional-red text-cream-gold text-xs font-bold transition-colors"
                  >
                    View Timetable
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Traditional Kerala Motif Divider */}
      <div className="flex items-center justify-center space-x-4 max-w-xs mx-auto py-2 opacity-60">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-warm-sand" />
        <div className="w-7 h-7 rounded-full bg-deep-brown/5 border border-cream-gold flex items-center justify-center">
          <Flame className="w-3.5 h-3.5 text-terracotta" />
        </div>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-warm-sand" />
      </div>

      {/* SECTION 7: COMMUNITY SHOWCASE */}
      <motion.section 
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-warm-sand/30 pb-4">
          <div className="space-y-1">
            <span className="text-terracotta font-heading tracking-widest uppercase text-xs font-semibold">
              {language === 'en' ? 'Recent Contributions • Independent Artisans' : 'കമ്മ്യൂണിറ്റി സൃഷ്ടികൾ'}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-deep-brown">
              {language === 'en' ? 'Community Showcase' : 'പ്രാദേശിക കലാസൃഷ്ടികൾ'}
            </h2>
          </div>
          <div className="flex items-center space-x-3 self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('community-showcase')}
              className="text-xs font-bold text-traditional-red hover:underline flex items-center space-x-1"
            >
              <span>{language === 'en' ? 'Explore Full Gallery' : 'എല്ലാ സൃഷ്ടികളും'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-traditional-red hover:bg-traditional-red-dark text-white text-xs font-bold shadow transition-all"
            >
              <PlusCircle className="w-3.5 h-3.5 text-cream-gold" />
              <span>{language === 'en' ? 'Upload Creation' : 'സൃഷ്ടികൾ പങ്കിടുക'}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {creations.slice(0, 6).map((item) => (
            <motion.div
              key={item.id}
              whileHover={shouldReduceMotion ? {} : { y: -6 }}
              className="rounded-2xl overflow-hidden bg-white border border-warm-sand/40 shadow-soft hover:shadow-cultural transition-all flex flex-col justify-between group"
            >
              <div className="relative h-52 overflow-hidden bg-deep-brown">
                <img
                  src={item.image}
                  alt={item.titleEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-brown via-transparent to-transparent" />
                
                <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-deep-brown/85 backdrop-blur-sm text-cream-gold text-[10px] font-bold border border-cream-gold/30">
                  {item.category}
                </span>

                <span className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded bg-black/70 backdrop-blur-sm text-white text-xs font-bold">
                  {item.price || 'Price on Inquiry'}
                </span>
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-base font-bold text-deep-brown leading-snug group-hover:text-traditional-red transition-colors">
                    {language === 'en' ? item.titleEn : item.titleMl}
                  </h3>
                  <p className="text-xs text-olive-green font-semibold mt-0.5">
                    By {item.creatorName}
                  </p>
                  <p className="text-[11px] text-deep-brown/70 mt-1 line-clamp-1">
                    Medium: {item.medium}
                  </p>
                </div>

                <div className="pt-3 border-t border-warm-sand/30 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-deep-brown/60">
                    📍 {item.location} • {item.timeAgo}
                  </span>

                  <button
                    onClick={() => {
                      const matchedArtist = artists.find(a => a.name.includes(item.creatorName)) || artists[0];
                      setInquiryArtist(matchedArtist);
                    }}
                    className="px-3 py-1 rounded-lg bg-parchment-dark hover:bg-traditional-red hover:text-white text-deep-brown font-semibold transition-colors text-[11px]"
                  >
                    Direct Inquire
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Traditional Kerala Motif Divider */}
      <div className="flex items-center justify-center space-x-4 max-w-xs mx-auto py-2 opacity-60">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-warm-sand" />
        <div className="w-7 h-7 rounded-full bg-deep-brown/5 border border-cream-gold flex items-center justify-center">
          <Flame className="w-3.5 h-3.5 text-terracotta" />
        </div>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-warm-sand" />
      </div>

      {/* SECTION 8: HOW IT WORKS */}
      <motion.section 
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12"
      >
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-terracotta font-heading tracking-widest uppercase text-xs font-semibold">
            {language === 'en' ? 'Autonomous & Community-Driven' : 'പ്രവർത്തന രീതി'}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-deep-brown">
            {language === 'en' ? 'How KALAKRITI Works' : 'കലാകൃതി എങ്ങനെ പ്രവർത്തിക്കുന്നു'}
          </h2>
          <p className="text-xs sm:text-sm text-deep-brown/80">
            {language === 'en'
              ? 'A transparent cultural bridge connecting traditional masters directly with the global cultural community.'
              : 'സാംസ്കാരിക പ്രേമികൾക്കും കലാകാരന്മാർക്കും ഒരുപോലെ പ്രയോജനപ്പെടുന്ന സുതാര്യമായ വേദി.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* For Cultural Explorers Track */}
          <div className="p-8 rounded-3xl bg-white border border-warm-sand/40 shadow-soft space-y-6">
            <div className="flex items-center space-x-3 border-b border-warm-sand/30 pb-4">
              <div className="w-10 h-10 rounded-full bg-cream-gold/30 text-deep-brown flex items-center justify-center font-bold">
                <Compass className="w-5 h-5 text-traditional-red" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-deep-brown">
                  {language === 'en' ? 'For Visitors & Cultural Explorers' : 'സാംസ്കാരിക പ്രേമികൾക്ക്'}
                </h3>
                <p className="text-xs text-olive-green">Discover, Learn & Inquire</p>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start space-x-3.5">
                <span className="w-6 h-6 rounded-full bg-parchment-warm text-traditional-red font-bold flex items-center justify-center shrink-0 text-xs">
                  1
                </span>
                <div>
                  <h4 className="font-bold text-deep-brown">Discover Living Traditions</h4>
                  <p className="text-xs text-deep-brown/70 mt-0.5">
                    Browse the living encyclopedia of Thrissur artforms with audio pronunciations, historical lineages, and GI tag dossiers.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <span className="w-6 h-6 rounded-full bg-parchment-warm text-traditional-red font-bold flex items-center justify-center shrink-0 text-xs">
                  2
                </span>
                <div>
                  <h4 className="font-bold text-deep-brown">Locate on Interactive Map</h4>
                  <p className="text-xs text-deep-brown/70 mt-0.5">
                    Pinpoint authentic master ateliers, temple melam grounds, and heritage monuments across all 6 taluks.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <span className="w-6 h-6 rounded-full bg-parchment-warm text-traditional-red font-bold flex items-center justify-center shrink-0 text-xs">
                  3
                </span>
                <div>
                  <h4 className="font-bold text-deep-brown">Direct-to-Artist Bookings</h4>
                  <p className="text-xs text-deep-brown/70 mt-0.5">
                    Inquire directly on the artist's verified WhatsApp for festival bookings, masterclasses, or custom craft acquisitions with zero intermediary fees.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* For Local Artists Track */}
          <div className="p-8 rounded-3xl bg-deep-brown text-white border-2 border-cream-gold shadow-cultural space-y-6">
            <div className="flex items-center space-x-3 border-b border-white/15 pb-4">
              <div className="w-10 h-10 rounded-full bg-cream-gold/20 text-cream-gold flex items-center justify-center font-bold">
                <Award className="w-5 h-5 text-cream-gold" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-cream-gold">
                  {language === 'en' ? 'For Traditional Artisans & Masters' : 'പാരമ്പര്യ കലാകാരന്മാർക്ക്'}
                </h3>
                <p className="text-xs text-parchment-warm/80">Preserve, Showcase & Earn</p>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start space-x-3.5">
                <span className="w-6 h-6 rounded-full bg-white/10 text-cream-gold font-bold flex items-center justify-center shrink-0 text-xs">
                  1
                </span>
                <div>
                  <h4 className="font-bold text-white">Register Free Profile</h4>
                  <p className="text-xs text-parchment-warm/80 mt-0.5">
                    Sign up with your mobile number in Malayalam or English, document your Guru parampara, and locate your studio on the district map.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <span className="w-6 h-6 rounded-full bg-white/10 text-cream-gold font-bold flex items-center justify-center shrink-0 text-xs">
                  2
                </span>
                <div>
                  <h4 className="font-bold text-white">Upload High-Res Showcase</h4>
                  <p className="text-xs text-parchment-warm/80 mt-0.5">
                    Upload photographs of your artworks, describe the natural mineral pigments or rhythm tala used, and set your own prices.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <span className="w-6 h-6 rounded-full bg-white/10 text-cream-gold font-bold flex items-center justify-center shrink-0 text-xs">
                  3
                </span>
                <div>
                  <h4 className="font-bold text-white">Earn with Zero Commission</h4>
                  <p className="text-xs text-parchment-warm/80 mt-0.5">
                    Receive patron inquiries directly on your mobile phone or WhatsApp without third-party deductions, keeping 100% of your earnings.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Big Bottom Action Strip */}
        <div className="p-8 sm:p-12 rounded-3xl bg-parchment-warm border border-warm-sand/50 shadow-soft text-center space-y-4">
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-deep-brown">
            {language === 'en' ? 'Ready to Celebrate the Living Arts of Thrissur?' : 'തൃശ്ശൂരിന്റെ കലകളെ അറിയാൻ തയ്യാറാണോ?'}
          </h3>
          <p className="text-xs sm:text-sm text-deep-brown/80 max-w-xl mx-auto">
            {language === 'en'
              ? 'Join hundreds of traditional masters, cultural researchers, and art lovers in preserving our living heritage.'
              : 'നമ്മുടെ പൈതൃകം സംരക്ഷിക്കാനും വളർത്താനും ഒപ്പം ചേരൂ.'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('discover')}
              className="px-6 py-3 rounded-xl bg-deep-brown hover:bg-traditional-red text-cream-gold text-xs font-bold transition-all"
            >
              Start Exploring Culture
            </button>
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="px-6 py-3 rounded-xl bg-traditional-red hover:bg-traditional-red-dark text-white text-xs font-bold shadow-md transition-all"
            >
              Showcase Your Work
            </button>
          </div>
        </div>

      </motion.section>

    </div>
  );
};
