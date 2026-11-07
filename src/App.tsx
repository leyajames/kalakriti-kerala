import React from 'react';
import { useCultural } from './context/CulturalContext';
import { Navbar } from './components/Navbar';
import { HomeFeed } from './components/HomeFeed';
import { ArtformCatalog } from './components/ArtformCatalog';
import { InteractiveMap } from './components/InteractiveMap';
import { ArtistDirectory } from './components/ArtistDirectory';
import { PooramSchedule } from './components/PooramSchedule';
import { HeritageExplorer } from './components/HeritageExplorer';
import { WorkshopsSection } from './components/WorkshopsSection';
import { CuratorDashboard } from './components/CuratorDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { ArtistDetailModal } from './components/ArtistDetailModal';
import { ArtworkUploadModal } from './components/ArtworkUploadModal';
import { InquiryModal } from './components/InquiryModal';
import { AuthModal } from './components/AuthModal';
import { AboutModal } from './components/AboutModal';
import { CulturalLocationDetail } from './components/CulturalLocationDetail';
import { EventsDiscovery } from './components/EventsDiscovery';
import { CommunityShowcase } from './components/CommunityShowcase';
import { ArtistDashboard } from './components/ArtistDashboard';
import { ArtistProfilePage } from './components/ArtistProfilePage';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

import { 
  Home, 
  MapPin, 
  Compass, 
  Users, 
  Calendar, 
  PlusCircle, 
  ShieldCheck,
  Landmark
} from 'lucide-react';

export const AppContent: React.FC = () => {
  const { activeTab, setActiveTab, setIsUploadModalOpen, language } = useCultural();

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'home':
        return <HomeFeed />;
      case 'discover':
        return <ArtformCatalog />;
      case 'map':
        return <InteractiveMap />;
      case 'artists':
        return <ArtistDirectory />;
      case 'events':
        return <EventsDiscovery />;
      case 'pooram':
        return <PooramSchedule />;
      case 'community':
      case 'community-showcase':
        return <CommunityShowcase />;
      case 'artist-dashboard':
        return <ArtistDashboard />;
      case 'artist-profile':
        return <ArtistProfilePage />;
      case 'heritage':
        return <HeritageExplorer />;
      case 'workshops':
        return <WorkshopsSection />;
      case 'admin':
      case 'curator':
        return <AdminDashboard />;
      case 'location-detail':
        return <CulturalLocationDetail />;
      default:
        return <HomeFeed />;
    }
  };

  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="min-h-screen flex flex-col bg-parchment text-deep-brown font-sans selection:bg-cream-gold selection:text-deep-brown">
      {/* Sticky Cultural Navbar */}
      <Navbar />

      {/* Main Dynamic Viewport with Smooth Page Transitions */}
      <main className="flex-1 overflow-x-hidden pb-16 lg:pb-0 w-full max-w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {renderActiveTab()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Modals */}
      <ArtistDetailModal />
      <ArtworkUploadModal />
      <InquiryModal />
      <AuthModal />
      <AboutModal />

      {/* Cultural Footer */}
      <Footer />

      {/* Mobile Sticky Bottom Navigation Bar (< 1024px) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-warm-sand/40 py-2 px-3 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] shadow-lg flex items-center justify-around">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center py-1 px-2 text-[10px] font-semibold transition-colors ${
            activeTab === 'home' ? 'text-traditional-red' : 'text-deep-brown/70 hover:text-deep-brown'
          }`}
        >
          <Home className="w-4 h-4 mb-0.5" />
          <span>{language === 'en' ? 'Home' : 'ഹോം'}</span>
        </button>

        <button
          onClick={() => setActiveTab('map')}
          className={`flex flex-col items-center py-1 px-2 text-[10px] font-semibold transition-colors ${
            activeTab === 'map' ? 'text-traditional-red' : 'text-deep-brown/70 hover:text-deep-brown'
          }`}
        >
          <MapPin className="w-4 h-4 mb-0.5" />
          <span>{language === 'en' ? 'Map' : 'ഭൂപടം'}</span>
        </button>

        {/* Center Register Button Pill */}
        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="flex flex-col items-center -mt-5 bg-traditional-red text-white p-2.5 rounded-full shadow-lg border-2 border-cream-gold hover:scale-105 transition-transform"
        >
          <PlusCircle className="w-5 h-5 text-cream-gold" />
        </button>

        <button
          onClick={() => setActiveTab('artists')}
          className={`flex flex-col items-center py-1 px-2 text-[10px] font-semibold transition-colors ${
            activeTab === 'artists' ? 'text-traditional-red' : 'text-deep-brown/70 hover:text-deep-brown'
          }`}
        >
          <Users className="w-4 h-4 mb-0.5" />
          <span>{language === 'en' ? 'Artists' : 'ഗുരുക്കൾ'}</span>
        </button>

        <button
          onClick={() => setActiveTab('events')}
          className={`flex flex-col items-center py-1 px-2 text-[10px] font-semibold transition-colors ${
            activeTab === 'events' ? 'text-traditional-red' : 'text-deep-brown/70 hover:text-deep-brown'
          }`}
        >
          <Calendar className="w-4 h-4 mb-0.5" />
          <span>{language === 'en' ? 'Pooram' : 'പൂരം'}</span>
        </button>
      </div>

    </div>
  );
};

