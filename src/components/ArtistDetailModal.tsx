import React, { useState } from 'react';
import { useCultural } from '../context/CulturalContext';
import { Artwork } from '../types';
import { 
  X, 
  MapPin, 
  Phone, 
  Sparkles, 
  Award, 
  MessageCircle, 
  ExternalLink, 
  CheckCircle,
  Eye,
  Heart,
  Share2
} from 'lucide-react';

export const ArtistDetailModal: React.FC = () => {
  const { 
    selectedArtist, 
    setSelectedArtist, 
    language, 
    setInquiryArtist 
  } = useCultural();

  const [activeArtwork, setActiveArtwork] = useState<Artwork | null>(null);

  if (!selectedArtist) return null;

  const handleWhatsApp = () => {
    const phone = selectedArtist.whatsappNumber || '919447012345';
    const text = encodeURIComponent(
      `Namaskaram ${selectedArtist.stageName || selectedArtist.name}, I discovered your traditional art showcase on KALAKRITI Thrissur. I would like to inquire regarding your performances / craft works.`
    );
    window.open(`https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-deep-brown/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-cultural border-2 border-cream-gold my-6">
        
        {/* Modal Header Banner */}
        <div className="relative h-48 sm:h-64 bg-deep-brown">
          <img
            src={selectedArtist.artworks[0]?.images[0] || selectedArtist.avatar}
            alt={selectedArtist.name}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-deep-brown via-deep-brown/50 to-transparent" />

          {/* Close Modal Button */}
          <button
            onClick={() => setSelectedArtist(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-deep-brown/80 text-cream-gold hover:bg-traditional-red transition-colors shadow-md z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Profile Header Details Positioned over Banner */}
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div className="flex items-end space-x-4">
              <img
                src={selectedArtist.avatar}
                alt={selectedArtist.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-4 border-cream-gold shadow-gold -mb-2 bg-white"
              />
              <div className="text-white space-y-1">
                <div className="flex items-center space-x-2">
                  <h2 className="font-display text-xl sm:text-2xl font-bold">
                    {selectedArtist.stageName || selectedArtist.name}
                  </h2>
                  {selectedArtist.isVerified && (
                    <span className="px-2 py-0.5 rounded-full bg-cream-gold text-deep-brown text-[10px] font-bold flex items-center space-x-1">
                      <Sparkles className="w-3 h-3" />
                      <span>Verified Master</span>
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-cream-gold font-semibold">
                  {selectedArtist.primaryArtformName} • {selectedArtist.experienceYears} Years Practice
                </p>
                <p className="text-[11px] text-parchment-warm flex items-center space-x-1">
                  <MapPin className="w-3 h-3" />
                  <span>{selectedArtist.studioAddress}</span>
                </p>
              </div>
            </div>

            {/* Direct WhatsApp Call to Action */}
            <button
              onClick={handleWhatsApp}
              className="hidden sm:flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Inquire</span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[65vh] overflow-y-auto">
          
          {/* Biography & Lineage */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-3">
              <h4 className="font-heading text-lg font-bold text-deep-brown border-b border-warm-sand/30 pb-1">
                {language === 'en' ? 'Artistic Biography & Practice' : 'ജീവചരിത്രവും കലാജീവിതവും'}
              </h4>
              <p className="text-sm text-deep-brown/85 leading-relaxed">
                {selectedArtist.bioEn}
              </p>
              <p className="font-malayalam text-sm text-deep-brown/80 leading-relaxed bg-parchment-warm p-3.5 rounded-xl border border-warm-sand/30">
                {selectedArtist.bioMl}
              </p>
            </div>

            {/* Studio & Honors Sidebar */}
            <div className="bg-parchment-warm p-4 rounded-xl border border-warm-sand/40 space-y-4 text-xs">
              <div>
                <span className="font-bold text-deep-brown block uppercase tracking-wider text-[10px]">
                  Studio / Kalari:
                </span>
                <span className="text-deep-brown/80 font-medium">
                  {selectedArtist.studioName || 'Private Heritage Atelier'}
                </span>
              </div>

              {selectedArtist.guruLineage && (
                <div>
                  <span className="font-bold text-deep-brown block uppercase tracking-wider text-[10px]">
                    Guru Parampara:
                  </span>
                  <span className="text-deep-brown/80 italic">
                    {selectedArtist.guruLineage}
                  </span>
                </div>
              )}

              {selectedArtist.awards && selectedArtist.awards.length > 0 && (
                <div>
                  <span className="font-bold text-deep-brown block uppercase tracking-wider text-[10px] mb-1">
                    Honors & Puraskarams:
                  </span>
                  <ul className="space-y-1">
                    {selectedArtist.awards.map((award, i) => (
                      <li key={i} className="flex items-center space-x-1.5 text-terracotta font-medium">
                        <Award className="w-3.5 h-3.5 shrink-0" />
                        <span>{award}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Artwork Portfolio Showcase */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-warm-sand/30 pb-2">
              <h4 className="font-heading text-lg font-bold text-deep-brown">
                {language === 'en' ? 'Showcase Gallery & Traditional Works' : 'കലാസൃഷ്ടികൾ & പ്രകടനങ്ങൾ'}
              </h4>
              <span className="text-xs text-olive-green font-semibold">
                {selectedArtist.artworks.length} Documented Pieces
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {selectedArtist.artworks.map((work) => (
                <div
                  key={work.id}
                  onClick={() => setActiveArtwork(work)}
                  className="cursor-pointer group rounded-xl overflow-hidden border border-warm-sand/40 bg-white hover:border-cream-gold shadow-soft hover:shadow-cultural transition-all"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={work.images[0]}
                      alt={work.titleEn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {work.price && (
                      <span className="absolute bottom-2 right-2 px-2.5 py-1 rounded bg-deep-brown/90 text-cream-gold text-xs font-bold">
                        {work.price}
                      </span>
                    )}
                  </div>
                  <div className="p-4 space-y-2">
                    <h5 className="font-display text-sm font-bold text-deep-brown group-hover:text-traditional-red transition-colors">
                      {language === 'en' ? work.titleEn : work.titleMl}
                    </h5>
                    <p className="text-xs text-deep-brown/70 line-clamp-2">
                      {language === 'en' ? work.storyEn : work.storyMl}
                    </p>
                    <div className="pt-2 flex items-center justify-between text-[11px] text-olive-green font-medium border-t border-warm-sand/20">
                      <span>{work.medium}</span>
                      <span className="text-traditional-red font-semibold">Read Craft Story →</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer Bar */}
        <div className="p-4 bg-parchment-dark border-t border-warm-sand/30 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => setSelectedArtist(null)}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-deep-brown hover:bg-white transition-colors"
          >
            Back to Directory
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleWhatsApp}
              className="sm:hidden flex items-center space-x-1 px-4 py-2 rounded-xl bg-[#25D366] text-white text-xs font-bold"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>

            <button
              onClick={() => {
                const artist = selectedArtist;
                setSelectedArtist(null);
                setInquiryArtist(artist);
              }}
              className="flex items-center space-x-1.5 px-6 py-2 rounded-xl bg-traditional-red hover:bg-traditional-red-dark text-white text-xs font-semibold shadow transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Commission or Book Artist</span>
            </button>
          </div>
        </div>

      </div>

      {/* Individual Artwork Lightbox & Craft Story Drawer */}
      {activeArtwork && (
        <div className="fixed inset-0 z-60 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="relative max-w-3xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl border border-cream-gold">
            <button
              onClick={() => setActiveArtwork(null)}
              className="absolute top-3 right-3 p-2 rounded-full bg-deep-brown/80 text-cream-gold hover:bg-traditional-red transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="h-80 sm:h-96 w-full bg-black">
              <img
                src={activeArtwork.images[0]}
                alt={activeArtwork.titleEn}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-6 space-y-4 max-h-[40vh] overflow-y-auto">
              <div>
                <h3 className="font-display text-xl font-bold text-deep-brown">
                  {language === 'en' ? activeArtwork.titleEn : activeArtwork.titleMl}
                </h3>
                <p className="text-xs text-terracotta font-semibold">
                  By {activeArtwork.artistName} • {activeArtwork.artformName} ({activeArtwork.yearCreated})
                </p>
              </div>

              <div className="bg-parchment-warm p-4 rounded-xl border border-warm-sand/30 space-y-2 text-xs">
                <span className="font-bold text-deep-brown uppercase tracking-wider block">
                  The Story Behind the Craft (പാരമ്പര്യ രചനാരീതി):
                </span>
                <p className="text-deep-brown/85 leading-relaxed">
                  {activeArtwork.storyEn}
                </p>
                <p className="font-malayalam text-deep-brown/80 leading-relaxed pt-2 border-t border-warm-sand/30">
                  {activeArtwork.storyMl}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-olive-green font-semibold block">Medium / Material:</span>
                  <span className="text-deep-brown">{activeArtwork.medium}</span>
                </div>
                {activeArtwork.dimensions && (
                  <div>
                    <span className="text-olive-green font-semibold block">Dimensions:</span>
                    <span className="text-deep-brown">{activeArtwork.dimensions}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 bg-parchment-dark border-t border-warm-sand/30 flex items-center justify-between">
              <span className="font-display text-base font-bold text-deep-brown">
                {activeArtwork.price || 'Price on Inquiry'}
              </span>
              <button
                onClick={() => {
                  setActiveArtwork(null);
                  handleWhatsApp();
                }}
                className="px-4 py-2 rounded-xl bg-traditional-red text-white text-xs font-semibold shadow hover:bg-traditional-red-dark"
              >
                Inquire to Purchase / Commission
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

