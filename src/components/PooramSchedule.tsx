import React, { useState } from 'react';
import { useCultural } from '../context/CulturalContext';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Bell, 
  Sparkles, 
  Share2, 
  Check, 
  Flame,
  ArrowRight
} from 'lucide-react';

export const PooramSchedule: React.FC = () => {
  const { language, culturalEvents, setActiveTab } = useCultural();
  const [reminders, setReminders] = useState<{ [key: string]: boolean }>({});

  const toggleReminder = (id: string) => {
    setReminders(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const mainPooram = culturalEvents.find(e => e.id.includes('thrissur-pooram')) || culturalEvents[0];

  return (
    <section className="py-12 bg-parchment-texture min-h-[calc(100vh-80px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Editorial Section Header */}
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-traditional-red/10 border border-traditional-red/30 text-traditional-red text-xs font-bold">
            <Flame className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'The Mother of All Poorams' : 'പൂരങ്ങളുടെ പൂരം'}</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-deep-brown">
            {language === 'en' ? 'Festival Calendar & Pooram Timetables' : 'തൃശ്ശൂർ പൂരം & ഉത്സവ കലണ്ടർ'}
          </h2>
          <p className="text-sm sm:text-base text-deep-brown/80 leading-relaxed">
            {language === 'en'
              ? 'Complete chronological schedule for Thrissur Pooram at Thekkinkadu Maidan, Swaraj Round Pulikali, and temple percussion festivals across Thrissur.'
              : 'ഇലഞ്ഞിത്തറ മേളം, മഠത്തിൽ വരവ് പഞ്ചവാദ്യം, വർണ്ണാഭമായ കുടമാറ്റം, പുലർച്ചെയുള്ള വെടിക്കെട്ട് എന്നിവയുടെ കൃത്യമായ സമയവിവരങ്ങൾ.'}
          </p>
        </div>

        {/* Thrissur Pooram Feature Hero Banner */}
        {mainPooram && (
          <div className="rounded-2xl overflow-hidden border-2 border-cream-gold shadow-cultural bg-white">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              
              {/* Banner Photo with Overlay */}
              <div className="lg:col-span-5 relative h-72 sm:h-96 lg:h-auto overflow-hidden">
                <img
                  src={mainPooram.bannerUrl}
                  alt="Thrissur Pooram Kudamattam and Percussion"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-brown via-deep-brown/30 to-transparent" />
                
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-traditional-red text-white text-xs font-bold shadow-md">
                    Major Annual Festival
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-xs uppercase tracking-wider text-cream-gold font-semibold">
                    {mainPooram.malayalamDate}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold">
                    {language === 'en' ? mainPooram.titleEn : mainPooram.titleMl}
                  </h3>
                  <p className="text-xs text-parchment-warm mt-1">
                    📍 {mainPooram.venueName}
                  </p>
                </div>
              </div>

              {/* Schedule Timeline Side */}
              <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-warm-sand/30 pb-3 mb-4">
                    <span className="font-heading text-lg font-bold text-deep-brown">
                      {language === 'en' ? 'Day of Pooram • Timetable' : 'പൂര ദിനത്തിലെ സമയക്രമം'}
                    </span>
                    <button
                      onClick={() => setActiveTab('map')}
                      className="text-xs font-semibold text-traditional-red hover:underline flex items-center space-x-1"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{language === 'en' ? 'Locate Grounds' : 'ഭൂപടത്തിൽ കാണുക'}</span>
                    </button>
                  </div>

                  {/* Vertical Chronological Schedule */}
                  <div className="space-y-4 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-cream-gold">
                    {mainPooram.schedule.map((item, index) => (
                      <div key={index} className="relative flex items-start space-x-4 pl-2">
                        <div className="w-5 h-5 rounded-full bg-deep-brown border-2 border-cream-gold flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-cream-gold" />
                        </div>
                        <div className="flex-1 bg-parchment-warm p-3 rounded-xl border border-warm-sand/30 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-display text-xs font-bold text-traditional-red">
                              ⏰ {item.time}
                            </span>
                            <span className="text-[10px] text-olive-green font-medium">
                              📍 {item.location}
                            </span>
                          </div>
                          <h4 className="font-display text-sm font-bold text-deep-brown">
                            {language === 'en' ? item.eventEn : item.eventMl}
                          </h4>
                          {item.leadMaster && (
                            <p className="text-[11px] text-terracotta italic">
                              {item.leadMaster}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Advisory & RSVP Button */}
                <div className="pt-4 border-t border-warm-sand/30 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-[11px] text-deep-brown/70 max-w-sm">
                    ⚠️ {mainPooram.advisory}
                  </p>

                  <button
                    onClick={() => toggleReminder('pooram')}
                    className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                      reminders['pooram']
                        ? 'bg-olive-green text-white'
                        : 'bg-traditional-red hover:bg-traditional-red-dark text-white'
                    }`}
                  >
                    {reminders['pooram'] ? (
                      <>
                        <Check className="w-4 h-4 text-cream-gold" />
                        <span>{language === 'en' ? 'Reminder Set!' : 'ഓർമ്മപ്പെടുത്തൽ ചേർത്തു!'}</span>
                      </>
                    ) : (
                      <>
                        <Bell className="w-4 h-4 text-cream-gold" />
                        <span>{language === 'en' ? 'Remind Me (Add to Cal)' : 'ഓർമ്മപ്പെടുത്തൽ ചേർക്കുക'}</span>
                      </>
                    )}
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* Other Festivals: Pulikali & Mamangam */}
        <div className="space-y-4">
          <h3 className="font-heading text-xl font-bold text-deep-brown border-b border-warm-sand/30 pb-2">
            {language === 'en' ? 'More Thrissur Cultural Celebrations' : 'മറ്റ് പ്രധാന ആഘോഷങ്ങൾ'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {culturalEvents
              .filter(e => e.id !== 'event-thrissur-pooram')
              .map(event => (
                <div
                  key={event.id}
                  className="rounded-xl overflow-hidden border border-warm-sand/40 bg-white shadow-soft flex flex-col justify-between"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={event.bannerUrl}
                      alt={event.titleEn}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-brown via-deep-brown/20 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <span className="text-[10px] text-cream-gold uppercase font-bold">
                        {event.artformName}
                      </span>
                      <h4 className="font-display text-lg font-bold">
                        {language === 'en' ? event.titleEn : event.titleMl}
                      </h4>
                      <p className="text-xs text-parchment-warm">
                        📅 {event.dateRange} • 📍 {event.venueName}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    <p className="text-xs text-deep-brown/80 leading-relaxed">
                      {language === 'en' ? event.descriptionEn : event.descriptionMl}
                    </p>

                    <div className="pt-2 border-t border-warm-sand/20 flex items-center justify-between">
                      <span className="text-[11px] text-olive-green font-semibold">
                        {event.isFreeEntry ? 'Free Public Entry' : 'Ticketed / Pass'}
                      </span>
                      <button
                        onClick={() => setActiveTab('map')}
                        className="text-xs font-semibold text-traditional-red hover:underline flex items-center space-x-1"
                      >
                        <span>View Venue</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

      </div>
    </section>
  );
};

