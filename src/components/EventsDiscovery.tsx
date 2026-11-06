import React, { useState } from 'react';
import { useCultural } from '../context/CulturalContext';
import { CulturalEvent, EventStatus, EventCategory, Taluk } from '../types';
import {
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  PlusCircle,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Archive,
  Sparkles,
  Share2,
  Bookmark,
  X,
  ChevronRight,
  Info,
  Building,
  UserCheck,
  Send,
  Ticket,
  Maximize2
} from 'lucide-react';

export const EventsDiscovery: React.FC = () => {
  const {
    culturalEvents,
    addEvent,
    language,
    isBookmarked,
    toggleBookmark
  } = useCultural();

  // Status & Filter States
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'UPCOMING' | 'PAST' | 'UNCONFIRMED'>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals
  const [selectedEventModal, setSelectedEventModal] = useState<CulturalEvent | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  // Event Submission Form State
  const [formTitleEn, setFormTitleEn] = useState('');
  const [formTitleMl, setFormTitleMl] = useState('');
  const [formCategory, setFormCategory] = useState<EventCategory>('TEMPLE_FESTIVAL');
  const [formArtform, setFormArtform] = useState('Traditional Melam & Performance');
  const [formVenue, setFormVenue] = useState('');
  const [formLocation, setFormLocation] = useState('');
  const [formTaluk, setFormTaluk] = useState<Taluk>('Thrissur');
  const [formDateRange, setFormDateRange] = useState('');
  const [formDateISO, setFormDateISO] = useState('');
  const [formTime, setFormTime] = useState('06:00 PM – 10:00 PM');
  const [formMalayalamDate, setFormMalayalamDate] = useState('');
  const [formBannerUrl, setFormBannerUrl] = useState('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80');
  const [formDescriptionEn, setFormDescriptionEn] = useState('');
  const [formOrganizerName, setFormOrganizerName] = useState('');
  const [formOrganizerContact, setFormOrganizerContact] = useState('');
  const [formRegistrationUrl, setFormRegistrationUrl] = useState('');
  const [formIsConfirmed, setFormIsConfirmed] = useState(true);
  const [formConfirmationNote, setFormConfirmationNote] = useState('');
  const [formIsFreeEntry, setFormIsFreeEntry] = useState(true);

  // Filter logic
  const filteredEvents = culturalEvents.filter((event) => {
    // Status filter
    if (statusFilter !== 'ALL' && event.status !== statusFilter) {
      return false;
    }

    // Category filter
    if (categoryFilter !== 'ALL' && event.culturalCategory !== categoryFilter) {
      return false;
    }

    // Search query filter
    const matchesSearch =
      event.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.titleMl.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.venueName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.locationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.organizer.name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  // Handle Event Submission by registered contributors
  const handleSubmitEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitleEn.trim()) return;

    const newEvent: CulturalEvent = {
      id: `event-${Date.now()}`,
      slug: formTitleEn.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      titleEn: formTitleEn,
      titleMl: formTitleMl || 'സാംസ്കാരിക ഉത്സവം',
      descriptionEn: formDescriptionEn || 'Community cultural event organized in Thrissur district.',
      descriptionMl: 'തൃശ്ശൂർ ജില്ലയിൽ സംഘടിപ്പിക്കുന്ന സാംസ്കാരിക ഉത്സവം.',
      artformName: formArtform,
      culturalCategory: formCategory,
      categoryLabelEn: formCategory.replace('_', ' '),
      categoryLabelMl: 'സാംസ്കാരികോത്സവം',
      venueName: formVenue || 'Thrissur Heritage Precinct',
      locationName: formLocation || `${formTaluk}, Thrissur`,
      taluk: formTaluk,
      location: { lat: 10.5244, lng: 76.2144 },
      dateRange: formDateRange || 'Upcoming Season',
      dateISO: formDateISO || '2026-12-01',
      time: formTime,
      malayalamDate: formMalayalamDate || 'തീയതി തീരുമാനമായില്ല',
      isFreeEntry: formIsFreeEntry,
      bannerUrl: formBannerUrl,
      organizer: {
        name: formOrganizerName || 'Community Cultural Organizers',
        role: 'Registered Contributor',
        contact: formOrganizerContact,
        isVerified: false
      },
      registrationUrl: formRegistrationUrl || undefined,
      status: formIsConfirmed ? 'UPCOMING' : 'UNCONFIRMED',
      isConfirmed: formIsConfirmed,
      confirmationNote: formIsConfirmed
        ? 'Submitted by registered contributor; queued for curator audit.'
        : formConfirmationNote || 'Dates tentative; subject to temple advisory or committee notification.',
      schedule: []
    };

    addEvent(newEvent);
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setIsSubmitModalOpen(false);
    }, 2000);
  };

  const getStatusBadge = (status: EventStatus, isConfirmed: boolean) => {
    if (status === 'UPCOMING' && isConfirmed) {
      return (
        <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-olive-green text-white text-[11px] font-bold shadow-sm">
          <span className="w-2 h-2 rounded-full bg-cream-gold animate-pulse" />
          <span>Confirmed Upcoming (സ്ഥിരീകരിച്ചത്)</span>
        </span>
      );
    }
    if (status === 'UNCONFIRMED' || !isConfirmed) {
      return (
        <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-terracotta text-white text-[11px] font-bold shadow-sm">
          <AlertTriangle className="w-3.5 h-3.5 text-cream-gold" />
          <span>Dates Tentative / Unconfirmed (തീരുമാനമായിട്ടില്ല)</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-deep-brown/80 text-parchment-warm text-[11px] font-semibold border border-warm-sand/30">
        <Archive className="w-3.5 h-3.5 text-warm-sand" />
        <span>Past Archival Record (കഴിഞ്ഞവ)</span>
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-parchment pb-24 text-deep-brown selection:bg-cream-gold selection:text-deep-brown">
      
      {/* ========================================================
          1. EDITORIAL HEADER & EVENT SUBMIT CTA
         ======================================================== */}
      <section className="bg-white border-b border-warm-sand/40 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cream-gold/30 border border-cream-gold text-deep-brown text-xs font-bold">
              <Calendar className="w-3.5 h-3.5 text-traditional-red" />
              <span>Cultural Calendar • Thrissur District (സാംസ്കാരിക കലണ്ടർ)</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-deep-brown tracking-tight">
              {language === 'en' ? 'Events & Festivals Discovery' : 'സാംസ്കാരിക ഉത്സവങ്ങൾ & പരിപാടികൾ'}
            </h1>

            <p className="text-xs sm:text-sm text-deep-brown/80 leading-relaxed">
              {language === 'en'
                ? 'Discover upcoming temple melams, Natyashastra theatrical summits, handloom expos, and community celebrations across Thrissur. Review historical archives and verified date advisories.'
                : 'പൂരങ്ങൾ, കഥകളി മഹോത്സവങ്ങൾ, കൈത്തറി മേളകൾ എന്നിവയുടെ വിവരങ്ങളും ഔദ്യോഗിക തിയ്യതികളും കണ്ടെത്താം.'}
            </p>
          </div>

          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="px-5 py-3 rounded-xl bg-traditional-red hover:bg-traditional-red-dark text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center space-x-2 shrink-0 self-start md:self-auto"
          >
            <PlusCircle className="w-4 h-4 text-cream-gold" />
            <span>Submit Cultural Event</span>
          </button>
        </div>
      </section>

      {/* ========================================================
          2. FILTER CONTROLS: UPCOMING / PAST / UNCONFIRMED
         ======================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-4">
        
        {/* Top Control Bar: Search & Status Filter Tabs */}
        <div className="bg-white p-4 rounded-2xl border border-warm-sand/50 shadow-soft flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* Status Tabs: [ All | Upcoming | Past | Unconfirmed ] */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-parchment-warm border border-warm-sand/40 w-full lg:w-auto">
            <button
              onClick={() => setStatusFilter('ALL')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                statusFilter === 'ALL'
                  ? 'bg-deep-brown text-cream-gold shadow-sm'
                  : 'text-deep-brown/70 hover:text-deep-brown'
              }`}
            >
              All Events ({culturalEvents.length})
            </button>

            <button
              onClick={() => setStatusFilter('UPCOMING')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                statusFilter === 'UPCOMING'
                  ? 'bg-olive-green text-white shadow-sm'
                  : 'text-deep-brown/70 hover:text-deep-brown'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-cream-gold" />
              <span>Upcoming ({culturalEvents.filter(e => e.status === 'UPCOMING').length})</span>
            </button>

            <button
              onClick={() => setStatusFilter('PAST')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                statusFilter === 'PAST'
                  ? 'bg-deep-brown text-cream-gold shadow-sm'
                  : 'text-deep-brown/70 hover:text-deep-brown'
              }`}
            >
              <Archive className="w-3.5 h-3.5" />
              <span>Past Archives ({culturalEvents.filter(e => e.status === 'PAST').length})</span>
            </button>

            <button
              onClick={() => setStatusFilter('UNCONFIRMED')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                statusFilter === 'UNCONFIRMED'
                  ? 'bg-terracotta text-white shadow-sm'
                  : 'text-deep-brown/70 hover:text-deep-brown'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-cream-gold" />
              <span>Unconfirmed / Tentative ({culturalEvents.filter(e => e.status === 'UNCONFIRMED').length})</span>
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-sand" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search events, venues, organizers..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-parchment-warm text-xs text-deep-brown outline-none border border-transparent focus:border-traditional-red"
            />
          </div>

        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
          {[
            { id: 'ALL', label: 'All Categories' },
            { id: 'TEMPLE_FESTIVAL', label: 'Temple Festivals & Melam' },
            { id: 'PERFORMING_ARTS', label: 'Classical Performing Arts' },
            { id: 'CRAFT_EXHIBITION', label: 'Craft & Handloom Expos' },
            { id: 'COMMUNITY_CELEBRATION', label: 'Community Celebrations' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3.5 py-1.5 rounded-full font-bold whitespace-nowrap transition-all ${
                categoryFilter === cat.id
                  ? 'bg-traditional-red text-white shadow-xs'
                  : 'bg-white hover:bg-parchment-warm text-deep-brown/75 border border-warm-sand/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

      </div>

      {/* ========================================================
          3. EVENTS GRID DISPLAY
         ======================================================== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {filteredEvents.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-warm-sand/50 shadow-soft space-y-4">
            <div className="w-16 h-16 rounded-full bg-parchment-warm text-terracotta flex items-center justify-center mx-auto">
              <Calendar className="w-8 h-8" />
            </div>
            <h3 className="font-display text-xl font-bold text-deep-brown">
              No cultural events found matching your criteria
            </h3>
            <p className="text-xs text-deep-brown/70 max-w-sm mx-auto">
              Clear the search term or status filter, or submit a missing cultural event to the community calendar.
            </p>
            <button
              onClick={() => { setStatusFilter('ALL'); setCategoryFilter('ALL'); setSearchQuery(''); }}
              className="px-4 py-2 rounded-xl bg-deep-brown text-cream-gold text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((evt) => {
              const isPast = evt.status === 'PAST';
              const isTentative = evt.status === 'UNCONFIRMED' || !evt.isConfirmed;

              return (
                <div
                  key={evt.id}
                  className={`rounded-3xl overflow-hidden bg-white border shadow-soft hover:shadow-cultural transition-all duration-300 flex flex-col justify-between ${
                    isPast
                      ? 'border-warm-sand/50 opacity-90'
                      : isTentative
                      ? 'border-terracotta/50 ring-1 ring-terracotta/20'
                      : 'border-warm-sand/50'
                  }`}
                >
                  {/* Event Cover Photograph */}
                  <div className="relative h-60 bg-deep-brown overflow-hidden">
                    <img
                      src={evt.bannerUrl}
                      alt={evt.titleEn}
                      className={`w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105 ${
                        isPast ? 'filter sepia-[0.25] brightness-90' : ''
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-brown via-deep-brown/20 to-transparent" />

                    {/* Floating Status Badge */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                      {getStatusBadge(evt.status, evt.isConfirmed)}

                      <span className="px-2.5 py-1 rounded-full bg-deep-brown/85 backdrop-blur-md text-cream-gold text-[10px] font-bold border border-cream-gold/30">
                        {evt.isFreeEntry ? 'Free Admission' : 'Entry Ticketed'}
                      </span>
                    </div>

                    {/* Category Label at Bottom Left of Cover */}
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <span className="text-[10px] uppercase font-bold text-cream-gold tracking-wider">
                        {evt.artformName}
                      </span>
                      <h3 className="font-display text-xl font-bold leading-snug drop-shadow line-clamp-2">
                        {language === 'en' ? evt.titleEn : evt.titleMl}
                      </h3>
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      
                      {/* Malayalam Title Subtitle */}
                      <p className="font-malayalam text-xs text-deep-brown/80 font-medium">
                        {language === 'en' ? evt.titleMl : evt.titleEn}
                      </p>

                      {/* Date & Time Block */}
                      <div className="p-3.5 rounded-2xl bg-parchment-warm/80 border border-warm-sand/30 space-y-1.5 text-xs">
                        <div className="flex items-center space-x-2 text-deep-brown font-bold">
                          <Calendar className="w-4 h-4 text-traditional-red shrink-0" />
                          <span>{evt.dateRange}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-deep-brown/75">
                          <Clock className="w-3.5 h-3.5 text-terracotta shrink-0" />
                          <span>{evt.time}</span>
                        </div>
                        {evt.malayalamDate && (
                          <div className="font-malayalam text-[11px] text-terracotta font-semibold pt-0.5 border-t border-warm-sand/20">
                            {evt.malayalamDate}
                          </div>
                        )}
                      </div>

                      {/* Venue & Location */}
                      <div className="space-y-1 text-xs">
                        <div className="flex items-start space-x-1.5 text-deep-brown">
                          <Building className="w-4 h-4 text-olive-green shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold">{evt.venueName}</span>
                            <span className="text-deep-brown/70 block text-[11px]">{evt.locationName}</span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-deep-brown/80 leading-relaxed line-clamp-3">
                        {evt.descriptionEn}
                      </p>

                      {/* Tentative Advisory Notice */}
                      {isTentative && evt.confirmationNote && (
                        <div className="p-3 rounded-xl bg-amber-50 border border-terracotta/40 text-[11px] text-deep-brown/85 flex items-start space-x-2">
                          <AlertTriangle className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
                          <p className="leading-snug">
                            <strong>Date Notice:</strong> {evt.confirmationNote}
                          </p>
                        </div>
                      )}

                      {/* Organizer Details */}
                      <div className="pt-2 border-t border-warm-sand/30 flex items-center justify-between text-[11px]">
                        <div className="truncate pr-2">
                          <span className="text-deep-brown/60 block text-[10px] uppercase font-bold">Organized By</span>
                          <span className="font-bold text-deep-brown truncate block">
                            {evt.organizer.name}
                          </span>
                        </div>

                        {evt.organizer.isVerified && (
                          <span className="px-2 py-0.5 rounded-full bg-olive-green/20 text-olive-green text-[10px] font-bold flex items-center space-x-1 shrink-0">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Verified</span>
                          </span>
                        )}
                      </div>

                    </div>

                    {/* Action Controls */}
                    <div className="pt-4 border-t border-warm-sand/30 flex items-center justify-between gap-2">
                      
                      {evt.registrationUrl ? (
                        <a
                          href={evt.registrationUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 rounded-xl bg-parchment-warm hover:bg-cream-gold/30 border border-warm-sand/40 text-deep-brown text-xs font-bold transition-colors flex items-center space-x-1"
                        >
                          <span>Official Portal</span>
                          <ExternalLink className="w-3 h-3 text-traditional-red" />
                        </a>
                      ) : (
                        <span className="text-[11px] text-deep-brown/60 italic">Free Entry Event</span>
                      )}

                      <button
                        onClick={() => setSelectedEventModal(evt)}
                        className="px-4 py-2 rounded-xl bg-traditional-red hover:bg-traditional-red-dark text-white text-xs font-bold shadow-sm transition-all flex items-center space-x-1"
                      >
                        <span>View Schedule</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>

                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </main>

      {/* ========================================================
          EVENT DETAILS & SCHEDULE MODAL
         ======================================================== */}
      {selectedEventModal && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-labelledby="event-modal-title"
          className="fixed inset-0 z-70 bg-deep-brown/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn select-none"
        >
          <div className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-cultural border-2 border-cream-gold my-6">
            
            {/* Modal Image Header */}
            <div className="relative h-64 sm:h-72 bg-deep-brown">
              <img
                src={selectedEventModal.bannerUrl}
                alt={selectedEventModal.titleEn}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-brown via-deep-brown/40 to-transparent" />

              <button
                onClick={() => setSelectedEventModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-deep-brown/80 text-cream-gold hover:bg-traditional-red transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
                {getStatusBadge(selectedEventModal.status, selectedEventModal.isConfirmed)}
                <h3 id="event-modal-title" className="font-display text-2xl sm:text-3xl font-bold">
                  {language === 'en' ? selectedEventModal.titleEn : selectedEventModal.titleMl}
                </h3>
                <p className="text-xs text-parchment-warm">
                  {selectedEventModal.venueName} • {selectedEventModal.locationName}
                </p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[55vh] overflow-y-auto text-xs sm:text-sm text-deep-brown/85">
              
              {/* Event Description */}
              <div className="space-y-2">
                <h4 className="font-heading text-sm font-bold text-deep-brown uppercase tracking-wider text-terracotta">
                  About the Event & Cultural Significance
                </h4>
                <p className="leading-relaxed">{selectedEventModal.descriptionEn}</p>
                <p className="font-malayalam p-3 rounded-xl bg-parchment-warm text-deep-brown text-xs sm:text-sm leading-relaxed">
                  {selectedEventModal.descriptionMl}
                </p>
              </div>

              {/* Date, Venue & Registration Sheet */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-parchment-warm p-4 rounded-2xl border border-warm-sand/40 text-xs">
                <div>
                  <span className="font-bold text-deep-brown/60 uppercase text-[10px] block">Date & Timing</span>
                  <p className="font-bold text-deep-brown">{selectedEventModal.dateRange}</p>
                  <p className="text-[11px] text-deep-brown/70">{selectedEventModal.time}</p>
                </div>

                <div>
                  <span className="font-bold text-deep-brown/60 uppercase text-[10px] block">Venue Details</span>
                  <p className="font-bold text-deep-brown">{selectedEventModal.venueName}</p>
                  <p className="text-[11px] text-deep-brown/70">{selectedEventModal.locationName}</p>
                </div>

                <div>
                  <span className="font-bold text-deep-brown/60 uppercase text-[10px] block">Organized By</span>
                  <p className="font-bold text-deep-brown">{selectedEventModal.organizer.name}</p>
                  <p className="text-[11px] text-deep-brown/70">{selectedEventModal.organizer.contact || 'Inquiry available'}</p>
                </div>

                <div>
                  <span className="font-bold text-deep-brown/60 uppercase text-[10px] block">Admission / Pass</span>
                  <p className="font-bold text-terracotta">
                    {selectedEventModal.entryFeeDetails || (selectedEventModal.isFreeEntry ? 'Free Public Entry' : 'Entry Ticketed')}
                  </p>
                </div>
              </div>

              {/* Event Schedule Timeline */}
              {selectedEventModal.schedule && selectedEventModal.schedule.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-heading text-sm font-bold text-deep-brown uppercase tracking-wider text-terracotta">
                    Ceremonial & Performance Schedule
                  </h4>
                  <div className="space-y-2">
                    {selectedEventModal.schedule.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-white border border-warm-sand/40 flex items-start space-x-3 text-xs"
                      >
                        <span className="px-2 py-0.5 rounded-lg bg-deep-brown text-cream-gold font-mono font-bold text-[11px] shrink-0">
                          {item.time}
                        </span>
                        <div className="space-y-0.5">
                          <p className="font-bold text-deep-brown">{item.eventEn}</p>
                          <p className="text-[11px] text-deep-brown/70">📍 {item.location}</p>
                          {item.leadMaster && (
                            <p className="text-[11px] text-olive-green font-semibold">
                              Lead: {item.leadMaster}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Advisory note */}
              {selectedEventModal.advisory && (
                <div className="p-3.5 rounded-xl bg-cream-gold/20 border border-cream-gold text-xs text-deep-brown flex items-start space-x-2">
                  <Info className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
                  <p><strong>Visitor Advisory:</strong> {selectedEventModal.advisory}</p>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-parchment-dark border-t border-warm-sand/30 flex items-center justify-between">
              <button
                onClick={() => setSelectedEventModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-deep-brown hover:bg-white"
              >
                Close
              </button>

              {selectedEventModal.registrationUrl && (
                <a
                  href={selectedEventModal.registrationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2 rounded-xl bg-traditional-red hover:bg-traditional-red-dark text-white text-xs font-bold shadow flex items-center space-x-1.5"
                >
                  <span>Open Official Registration Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

          </div>
        </div>
      )}

      {/* ========================================================
          SUBMIT CULTURAL EVENT MODAL (FOR CONTRIBUTORS)
         ======================================================== */}
      {isSubmitModalOpen && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-labelledby="submit-event-title"
          className="fixed inset-0 z-70 bg-deep-brown/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn select-none"
        >
          <div className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-cultural border-2 border-cream-gold my-6">
            
            <div className="p-5 bg-parchment-warm border-b border-warm-sand/30 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-terracotta tracking-wider">
                  Community Calendar Registry
                </span>
                <h3 id="submit-event-title" className="font-display text-xl font-bold text-deep-brown">
                  Submit Cultural Event for Moderation
                </h3>
              </div>
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="p-2 rounded-full hover:bg-white text-deep-brown/60 hover:text-traditional-red transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitSuccess ? (
              <div className="p-12 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-olive-green/20 text-olive-green flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-display text-xl font-bold text-deep-brown">
                  Event Submitted for Moderation!
                </h4>
                <p className="text-xs text-deep-brown/75 max-w-sm mx-auto">
                  Your event has been submitted to the Cultural Sanctity Curation Desk. It will appear on the calendar upon verification.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitEvent} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
                
                {/* Event Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-deep-brown">Event Name (English) *</label>
                    <input
                      type="text"
                      required
                      value={formTitleEn}
                      onChange={(e) => setFormTitleEn(e.target.value)}
                      placeholder="e.g. Peruvanam Pooram Devamela 2027"
                      className="w-full px-3 py-2 rounded-xl border border-warm-sand/50 text-xs text-deep-brown outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-deep-brown">Event Name (Malayalam)</label>
                    <input
                      type="text"
                      value={formTitleMl}
                      onChange={(e) => setFormTitleMl(e.target.value)}
                      placeholder="e.g. പെരുവനം പൂരം"
                      className="w-full px-3 py-2 rounded-xl border border-warm-sand/50 text-xs text-deep-brown outline-none"
                    />
                  </div>
                </div>

                {/* Cultural Category & Artform */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-deep-brown">Cultural Category *</label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value as EventCategory)}
                      className="w-full px-3 py-2 rounded-xl border border-warm-sand/50 text-xs text-deep-brown bg-white outline-none"
                    >
                      <option value="TEMPLE_FESTIVAL">Temple Festival & Melam</option>
                      <option value="PERFORMING_ARTS">Classical Performing Arts</option>
                      <option value="CRAFT_EXHIBITION">Craft & Handloom Expo</option>
                      <option value="COMMUNITY_CELEBRATION">Community Folk Celebration</option>
                      <option value="LITERARY_MEET">Literary & Cultural Meet</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-deep-brown">Primary Artform / Focus *</label>
                    <input
                      type="text"
                      required
                      value={formArtform}
                      onChange={(e) => setFormArtform(e.target.value)}
                      placeholder="e.g. Panchari Melam & Kathakali"
                      className="w-full px-3 py-2 rounded-xl border border-warm-sand/50 text-xs text-deep-brown outline-none"
                    />
                  </div>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-deep-brown">Display Date / Range *</label>
                    <input
                      type="text"
                      required
                      value={formDateRange}
                      onChange={(e) => setFormDateRange(e.target.value)}
                      placeholder="e.g. March 22, 2027"
                      className="w-full px-3 py-2 rounded-xl border border-warm-sand/50 text-xs text-deep-brown outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-deep-brown">ISO Date (YYYY-MM-DD)</label>
                    <input
                      type="date"
                      value={formDateISO}
                      onChange={(e) => setFormDateISO(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-warm-sand/50 text-xs text-deep-brown outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-deep-brown">Daily Timing *</label>
                    <input
                      type="text"
                      required
                      value={formTime}
                      onChange={(e) => setFormTime(e.target.value)}
                      placeholder="e.g. 05:00 PM – 10:30 PM"
                      className="w-full px-3 py-2 rounded-xl border border-warm-sand/50 text-xs text-deep-brown outline-none"
                    />
                  </div>
                </div>

                {/* Venue & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-deep-brown">Venue Name *</label>
                    <input
                      type="text"
                      required
                      value={formVenue}
                      onChange={(e) => setFormVenue(e.target.value)}
                      placeholder="e.g. Peruvanam Temple Courtyard"
                      className="w-full px-3 py-2 rounded-xl border border-warm-sand/50 text-xs text-deep-brown outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-deep-brown">Location / Area *</label>
                    <input
                      type="text"
                      required
                      value={formLocation}
                      onChange={(e) => setFormLocation(e.target.value)}
                      placeholder="e.g. Cherpu, Thrissur"
                      className="w-full px-3 py-2 rounded-xl border border-warm-sand/50 text-xs text-deep-brown outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-deep-brown">Taluk *</label>
                    <select
                      value={formTaluk}
                      onChange={(e) => setFormTaluk(e.target.value as Taluk)}
                      className="w-full px-3 py-2 rounded-xl border border-warm-sand/50 text-xs text-deep-brown bg-white outline-none"
                    >
                      <option value="Thrissur">Thrissur</option>
                      <option value="Thalapilly">Thalapilly</option>
                      <option value="Mukundapuram">Mukundapuram</option>
                      <option value="Chavakkad">Chavakkad</option>
                      <option value="Kodungallur">Kodungallur</option>
                      <option value="Chalakkudy">Chalakkudy</option>
                    </select>
                  </div>
                </div>

                {/* Organizer Details & Registration Link */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-deep-brown">Organizer Name *</label>
                    <input
                      type="text"
                      required
                      value={formOrganizerName}
                      onChange={(e) => setFormOrganizerName(e.target.value)}
                      placeholder="e.g. Peruvanam Utsava Samithi"
                      className="w-full px-3 py-2 rounded-xl border border-warm-sand/50 text-xs text-deep-brown outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-deep-brown">Contact Number</label>
                    <input
                      type="tel"
                      value={formOrganizerContact}
                      onChange={(e) => setFormOrganizerContact(e.target.value)}
                      placeholder="+91 94470 XXXXX"
                      className="w-full px-3 py-2 rounded-xl border border-warm-sand/50 text-xs text-deep-brown outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-deep-brown">Registration / Event URL</label>
                    <input
                      type="url"
                      value={formRegistrationUrl}
                      onChange={(e) => setFormRegistrationUrl(e.target.value)}
                      placeholder="https://..."
                      className="w-full px-3 py-2 rounded-xl border border-warm-sand/50 text-xs text-deep-brown outline-none"
                    />
                  </div>
                </div>

                {/* Cover Photograph Link */}
                <div className="space-y-1">
                  <label className="font-bold text-deep-brown">Cover Photograph URL *</label>
                  <input
                    type="url"
                    required
                    value={formBannerUrl}
                    onChange={(e) => setFormBannerUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-2 rounded-xl border border-warm-sand/50 text-xs text-deep-brown outline-none"
                  />
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label className="font-bold text-deep-brown">Event Description *</label>
                  <textarea
                    rows={3}
                    required
                    value={formDescriptionEn}
                    onChange={(e) => setFormDescriptionEn(e.target.value)}
                    placeholder="Provide detailed description of the cultural performance, temple rituals, and spectator information..."
                    className="w-full px-3 py-2 rounded-xl border border-warm-sand/50 text-xs text-deep-brown outline-none"
                  />
                </div>

                {/* Confirmation Status Check */}
                <div className="p-3 rounded-xl bg-parchment-warm/70 border border-warm-sand/40 space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isConfirmedCheck"
                      checked={formIsConfirmed}
                      onChange={(e) => setFormIsConfirmed(e.target.checked)}
                      className="rounded text-traditional-red"
                    />
                    <label htmlFor="isConfirmedCheck" className="font-bold text-deep-brown cursor-pointer">
                      Official Dates Confirmed by Devaswom or Municipal Committee
                    </label>
                  </div>
                  {!formIsConfirmed && (
                    <input
                      type="text"
                      value={formConfirmationNote}
                      onChange={(e) => setFormConfirmationNote(e.target.value)}
                      placeholder="State reason why dates are tentative (e.g. pending temple advisory council meet)..."
                      className="w-full px-3 py-1.5 rounded-lg border border-terracotta/40 text-xs bg-white text-deep-brown"
                    />
                  )}
                </div>

                {/* Submit button */}
                <div className="pt-3 border-t border-warm-sand/30 flex items-center justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsSubmitModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-warm-sand/50 font-semibold text-deep-brown hover:bg-parchment"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-traditional-red hover:bg-traditional-red-dark text-white font-bold shadow flex items-center space-x-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit for Curation Review</span>
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

