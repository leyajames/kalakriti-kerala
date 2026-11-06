import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Language, 
  Artform, 
  Artist, 
  HeritageLocation, 
  CulturalEvent, 
  Workshop, 
  CommunityStory, 
  ModerationItem,
  Artwork,
  CommunityCreation,
  CulturalLocation,
  AdminSubmissionItem,
  ModerationLogEntry
} from '../types';
import { 
  ARTFORMS_DATA, 
  ARTISTS_DATA, 
  HERITAGE_LOCATIONS_DATA, 
  CULTURAL_EVENTS_DATA, 
  WORKSHOPS_DATA, 
  COMMUNITY_STORIES_DATA,
  INITIAL_MODERATION_ITEMS,
  COMMUNITY_CREATIONS_DATA,
  ADMIN_SUBMISSIONS_INITIAL_DATA,
  INITIAL_MODERATION_LOGS
} from '../data/culturalData';
import { CULTURAL_EVENTS_MASTER_DATA } from '../data/culturalEventsData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface UserProfile {
  id?: string;
  name: string;
  role: 'visitor' | 'registered_user' | 'artist' | 'admin' | 'EXPLORER' | 'ORGANIZER';
  phone?: string;
  email?: string;
}

interface CulturalContextType {
  language: Language;
  toggleLanguage: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  artists: Artist[];
  artforms: Artform[];
  heritageLocations: HeritageLocation[];
  culturalEvents: CulturalEvent[];
  workshops: Workshop[];
  stories: CommunityStory[];
  creations: CommunityCreation[];
  moderationItems: ModerationItem[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedTaluk: string;
  setSelectedTaluk: (taluk: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedArtist: Artist | null;
  setSelectedArtist: (artist: Artist | null) => void;
  selectedArtistForProfile: Artist | null;
  setSelectedArtistForProfile: (artist: Artist | null) => void;
  navigateToArtistProfile: (artist: Artist) => void;
  currentDashboardArtistId: string;
  setCurrentDashboardArtistId: (id: string) => void;
  selectedHeritage: HeritageLocation | null;
  setSelectedHeritage: (loc: HeritageLocation | null) => void;
  selectedLocationForPage: CulturalLocation | null;
  setSelectedLocationForPage: (loc: CulturalLocation | null) => void;
  navigateToLocationDetail: (loc: CulturalLocation) => void;
  selectedArtform: Artform | null;
  setSelectedArtform: (af: Artform | null) => void;
  inquiryArtist: Artist | null;
  setInquiryArtist: (artist: Artist | null) => void;
  isUploadModalOpen: boolean;
  setIsUploadModalOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isAboutModalOpen: boolean;
  setIsAboutModalOpen: (open: boolean) => void;
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  bookmarks: string[];
  toggleBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
  addArtist: (newArtist: Artist) => void;
  updateArtist: (updatedArtist: Artist) => void;
  addArtworkToArtist: (artistId: string, newArtwork: Artwork) => void;
  updateArtwork: (artistId: string, artworkId: string, updatedFields: Partial<Artwork>) => void;
  deleteArtwork: (artistId: string, artworkId: string) => void;
  addEvent: (newEvent: CulturalEvent) => void;
  addCreation: (newCreation: CommunityCreation) => void;
  toggleLikeCreation: (id: string) => void;
  resolveModerationItem: (id: string, status: 'APPROVED' | 'REJECTED') => void;
  audioPlayingUrl: string | null;
  toggleAudio: (url: string) => void;
  adminSubmissions: AdminSubmissionItem[];
  moderationLogs: ModerationLogEntry[];
  approveSubmission: (id: string, notes?: string) => void;
  rejectSubmission: (id: string, reason: string) => void;
  requestChangesSubmission: (id: string, notes: string) => void;
  editSubmission: (id: string, updatedFields: Partial<AdminSubmissionItem>) => void;
  deleteSubmission: (id: string) => void;
  loginAsDemoAdmin: () => void;
}

const CulturalContext = createContext<CulturalContextType | undefined>(undefined);

export const CulturalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Initialize active tab from URL hash if provided
  const getInitialTab = (): string => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
      const validTabs = [
        'home', 'discover', 'map', 'artists', 'events', 'pooram', 
        'community', 'community-showcase', 'artist-dashboard', 
        'artist-profile', 'heritage', 'workshops', 'admin', 'curator'
      ];
      if (validTabs.includes(hash)) {
        return hash;
      }
    }
    return 'home';
  };

  const [activeTab, setActiveTabInternal] = useState<string>(getInitialTab);

  const setActiveTab = (tab: string) => {
    setActiveTabInternal(tab);
    if (typeof window !== 'undefined') {
      if (tab === 'home') {
        if (window.location.hash) {
          history.replaceState(null, '', window.location.pathname + window.location.search);
        }
      } else {
        window.location.hash = tab;
      }
    }
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
      if (hash && hash !== activeTab) {
        setActiveTabInternal(hash);
      } else if (!hash && activeTab !== 'home') {
        setActiveTabInternal('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [activeTab]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTaluk, setSelectedTaluk] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [selectedArtistForProfile, setSelectedArtistForProfile] = useState<Artist | null>(null);
  const [selectedHeritage, setSelectedHeritage] = useState<HeritageLocation | null>(null);
  const [selectedLocationForPage, setSelectedLocationForPage] = useState<CulturalLocation | null>(null);
  const [selectedArtform, setSelectedArtform] = useState<Artform | null>(null);

  const navigateToLocationDetail = (loc: CulturalLocation) => {
    setSelectedLocationForPage(loc);
    setActiveTab('location-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToArtistProfile = (artist: Artist) => {
    setSelectedArtistForProfile(artist);
    setActiveTab('artist-profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [inquiryArtist, setInquiryArtist] = useState<Artist | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState<boolean>(false);
  
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('kalakriti_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [audioPlayingUrl, setAudioPlayingUrl] = useState<string | null>(null);

  // Persistence with localStorage for Artists
  const [artists, setArtists] = useState<Artist[]>(() => {
    try {
      const saved = localStorage.getItem('kalakriti_artists');
      return saved ? JSON.parse(saved) : ARTISTS_DATA;
    } catch {
      return ARTISTS_DATA;
    }
  });

  // Current active artist in dashboard (defaults to first artist)
  const [currentDashboardArtistId, setCurrentDashboardArtistId] = useState<string>(() => {
    return artists[0]?.id || 'artist-kalamandalam-gopi';
  });

  // Persistence with localStorage for Community Creations
  const [creations, setCreations] = useState<CommunityCreation[]>(() => {
    try {
      const saved = localStorage.getItem('kalakriti_creations');
      return saved ? JSON.parse(saved) : COMMUNITY_CREATIONS_DATA;
    } catch {
      return COMMUNITY_CREATIONS_DATA;
    }
  });

  // Persistence with localStorage for Cultural Events
  const [events, setEvents] = useState<CulturalEvent[]>(() => {
    try {
      const saved = localStorage.getItem('kalakriti_events');
      return saved ? JSON.parse(saved) : CULTURAL_EVENTS_MASTER_DATA;
    } catch {
      return CULTURAL_EVENTS_MASTER_DATA;
    }
  });

  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('kalakriti_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [moderationItems, setModerationItems] = useState<ModerationItem[]>(() => {
    try {
      const saved = localStorage.getItem('kalakriti_moderation');
      return saved ? JSON.parse(saved) : INITIAL_MODERATION_ITEMS;
    } catch {
      return INITIAL_MODERATION_ITEMS;
    }
  });

  // Admin Submissions & Moderation Logs Persistence
  const [adminSubmissions, setAdminSubmissions] = useState<AdminSubmissionItem[]>(() => {
    try {
      const saved = localStorage.getItem('kalakriti_admin_submissions');
      return saved ? JSON.parse(saved) : ADMIN_SUBMISSIONS_INITIAL_DATA;
    } catch {
      return ADMIN_SUBMISSIONS_INITIAL_DATA;
    }
  });

  const [moderationLogs, setModerationLogs] = useState<ModerationLogEntry[]>(() => {
    try {
      const saved = localStorage.getItem('kalakriti_moderation_logs');
      return saved ? JSON.parse(saved) : INITIAL_MODERATION_LOGS;
    } catch {
      return INITIAL_MODERATION_LOGS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('kalakriti_artists', JSON.stringify(artists));
    } catch (e) {
      console.error(e);
    }
  }, [artists]);

  useEffect(() => {
    try {
      localStorage.setItem('kalakriti_creations', JSON.stringify(creations));
    } catch (e) {
      console.error(e);
    }
  }, [creations]);

  useEffect(() => {
    try {
      localStorage.setItem('kalakriti_events', JSON.stringify(events));
    } catch (e) {
      console.error(e);
    }
  }, [events]);

  useEffect(() => {
    try {
      localStorage.setItem('kalakriti_bookmarks', JSON.stringify(bookmarks));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarks]);

  useEffect(() => {
    try {
      localStorage.setItem('kalakriti_moderation', JSON.stringify(moderationItems));
    } catch (e) {
      console.error(e);
    }
  }, [moderationItems]);

  useEffect(() => {
    try {
      localStorage.setItem('kalakriti_admin_submissions', JSON.stringify(adminSubmissions));
    } catch (e) {
      console.error(e);
    }
  }, [adminSubmissions]);

  useEffect(() => {
    try {
      localStorage.setItem('kalakriti_moderation_logs', JSON.stringify(moderationLogs));
    } catch (e) {
      console.error(e);
    }
  }, [moderationLogs]);

  // Synchronize with Supabase Auth Session
  useEffect(() => {
    if (!isSupabaseConfigured()) return;

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const u = session.user;
        const role = (u.user_metadata?.role as any) || 'registered_user';
        const profile: UserProfile = {
          id: u.id,
          name: u.user_metadata?.full_name || u.email?.split('@')[0] || 'Registered User',
          email: u.email,
          role: role,
        };
        setUser(profile);
        try {
          localStorage.setItem('kalakriti_user', JSON.stringify(profile));
        } catch {}
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'ml' : 'en'));
  };

  const toggleBookmark = (id: string) => {
    setBookmarks(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const isBookmarked = (id: string) => bookmarks.includes(id);

  const addArtist = (newArtist: Artist) => {
    setArtists(prev => [newArtist, ...prev]);
    setCurrentDashboardArtistId(newArtist.id);
    
    // Push to moderation queue for curator verification
    setModerationItems(prev => [
      {
        id: `mod-${Date.now()}`,
        type: 'ARTIST_VERIFICATION',
        title: `Verification: ${newArtist.name} (${newArtist.stageName || 'Artist'})`,
        submitter: newArtist.name,
        artform: newArtist.primaryArtformName,
        submittedAt: 'Just now',
        status: 'PENDING',
        details: `Self-registered from ${newArtist.taluk} with ${newArtist.experienceYears} years experience. Lineage: ${newArtist.guruLineage || 'Independent'}. Contact: ${newArtist.contactPhone || 'N/A'}.`,
        mediaUrl: newArtist.avatar
      },
      ...prev
    ]);

    // Push to Admin Dashboard Submissions
    const newArtistSub: AdminSubmissionItem = {
      id: `sub-art-${Date.now()}`,
      entityType: 'ARTIST_PROFILE',
      title: `${newArtist.name} (${newArtist.stageName || 'Artist'})`,
      titleMl: newArtist.stageName || newArtist.name,
      category: 'Performing Arts',
      artform: newArtist.primaryArtformName,
      taluk: newArtist.taluk,
      locationDetails: `${newArtist.studioAddress}, ${newArtist.taluk}`,
      description: newArtist.bioEn,
      mediaUrls: [newArtist.avatar, ...(newArtist.portfolioPhotos || [])],
      contributor: {
        name: newArtist.name,
        email: newArtist.email || 'artist@kalakriti.org',
        phone: newArtist.contactPhone || newArtist.whatsappNumber || 'N/A',
        role: 'Registered Artist',
        organization: newArtist.studioName || 'Independent Atelier',
        verifiedContributor: false,
        totalSubmissions: 1
      },
      submittedAt: 'Just now',
      status: 'PENDING',
      sourceAttribution: 'Self-registered artist credentials',
      entityId: newArtist.id
    };
    setAdminSubmissions(prev => [newArtistSub, ...prev]);

    // If the newly registered artist provided artworks, sync them to Community Creations
    if (newArtist.artworks && newArtist.artworks.length > 0) {
      const newCreations: CommunityCreation[] = newArtist.artworks.map((art) => ({
        id: `creation-${art.id}`,
        titleEn: art.titleEn,
        titleMl: art.titleMl,
        creatorName: newArtist.stageName || newArtist.name,
        creatorRole: `${newArtist.primaryArtformName} • ${newArtist.taluk}`,
        category: art.category || newArtist.primaryArtformName,
        image: art.images[0] || newArtist.avatar,
        images: art.images,
        medium: art.medium,
        price: art.price,
        location: newArtist.studioAddress || `${newArtist.taluk}, Thrissur`,
        likes: 1,
        timeAgo: 'Just now',
        artistId: newArtist.id,
        descriptionEn: art.storyEn,
        descriptionMl: art.storyMl,
        approvalStatus: 'PENDING'
      }));

      setCreations(prev => [...newCreations, ...prev]);
    }
  };

  const updateArtist = (updatedArtist: Artist) => {
    setArtists(prev => prev.map(art => art.id === updatedArtist.id ? updatedArtist : art));
    if (selectedArtistForProfile?.id === updatedArtist.id) {
      setSelectedArtistForProfile(updatedArtist);
    }
  };

  const addArtworkToArtist = (artistId: string, newArtwork: Artwork) => {
    let artistName = 'Local Artist';
    let artistRole = 'Artisan';
    let artistLoc = 'Thrissur';

    setArtists(prev => prev.map(art => {
      if (art.id === artistId) {
        artistName = art.stageName || art.name;
        artistRole = `${art.primaryArtformName} • ${art.taluk}`;
        artistLoc = art.studioAddress || `${art.taluk}, Thrissur`;
        return {
          ...art,
          artworks: [newArtwork, ...art.artworks]
        };
      }
      return art;
    }));

    // Mirror to Community Creations for public showcase
    const newCreation: CommunityCreation = {
      id: `creation-${newArtwork.id}`,
      titleEn: newArtwork.titleEn,
      titleMl: newArtwork.titleMl,
      creatorName: artistName,
      creatorRole: artistRole,
      category: newArtwork.category || newArtwork.artformName,
      image: newArtwork.images[0],
      images: newArtwork.images,
      medium: newArtwork.medium,
      price: newArtwork.price,
      location: newArtwork.location || artistLoc,
      likes: 1,
      timeAgo: 'Just now',
      artistId: artistId,
      descriptionEn: newArtwork.storyEn,
      descriptionMl: newArtwork.storyMl,
      approvalStatus: newArtwork.approvalStatus || 'PENDING'
    };
    setCreations(prev => [newCreation, ...prev]);

    // Push to moderation queue
    setModerationItems(prev => [
      {
        id: `mod-${Date.now()}`,
        type: 'ARTWORK_SUBMISSION',
        title: `Artwork: ${newArtwork.titleEn}`,
        submitter: newArtwork.artistName || artistName,
        artform: newArtwork.artformName,
        submittedAt: 'Just now',
        status: 'PENDING',
        details: `Medium: ${newArtwork.medium}. Price: ${newArtwork.price || 'Inquiry'}. Technique: ${newArtwork.craftTechnique}`,
        mediaUrl: newArtwork.images[0]
      },
      ...prev
    ]);

    // Push to Admin Dashboard Submissions
    const newArtSub: AdminSubmissionItem = {
      id: `sub-aw-${Date.now()}`,
      entityType: 'ARTWORK',
      title: newArtwork.titleEn,
      titleMl: newArtwork.titleMl,
      category: newArtwork.category || newArtwork.artformName,
      artform: newArtwork.artformName,
      taluk: 'Thrissur',
      locationDetails: newArtwork.location || artistLoc,
      description: newArtwork.storyEn,
      mediaUrls: newArtwork.images,
      contributor: {
        name: newArtwork.artistName || artistName,
        email: 'artisan@kalakriti.org',
        role: 'Contributing Artisan',
        organization: artistRole,
        verifiedContributor: false,
        totalSubmissions: 1
      },
      submittedAt: 'Just now',
      status: 'PENDING',
      sourceAttribution: `Medium: ${newArtwork.medium}. Technique: ${newArtwork.craftTechnique}`,
      entityId: newArtwork.id
    };
    setAdminSubmissions(prev => [newArtSub, ...prev]);
  };

  const updateArtwork = (artistId: string, artworkId: string, updatedFields: Partial<Artwork>) => {
    setArtists(prev => prev.map(art => {
      if (art.id === artistId) {
        return {
          ...art,
          artworks: art.artworks.map(aw => aw.id === artworkId ? { ...aw, ...updatedFields } : aw)
        };
      }
      return art;
    }));

    // Also update in creations if present
    setCreations(prev => prev.map(c => {
      if (c.id === `creation-${artworkId}` || (c.artistId === artistId && c.titleEn === updatedFields.titleEn)) {
        return {
          ...c,
          titleEn: updatedFields.titleEn || c.titleEn,
          titleMl: updatedFields.titleMl || c.titleMl,
          category: updatedFields.category || c.category,
          medium: updatedFields.medium || c.medium,
          price: updatedFields.price || c.price,
          location: updatedFields.location || c.location,
          image: updatedFields.images?.[0] || c.image,
          images: updatedFields.images || c.images,
          descriptionEn: updatedFields.storyEn || c.descriptionEn,
          descriptionMl: updatedFields.storyMl || c.descriptionMl,
        };
      }
      return c;
    }));
  };

  const deleteArtwork = (artistId: string, artworkId: string) => {
    setArtists(prev => prev.map(art => {
      if (art.id === artistId) {
        return {
          ...art,
          artworks: art.artworks.filter(aw => aw.id !== artworkId)
        };
      }
      return art;
    }));

    // Also delete from creations
    setCreations(prev => prev.filter(c => c.id !== `creation-${artworkId}`));
  };

  const addCreation = (newCreation: CommunityCreation) => {
    setCreations(prev => [newCreation, ...prev]);
  };

  const toggleLikeCreation = (id: string) => {
    setCreations(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          likes: item.likes + 1
        };
      }
      return item;
    }));
  };

  const addEvent = (newEvent: CulturalEvent) => {
    setEvents(prev => [newEvent, ...prev]);
    setModerationItems(prev => [
      {
        id: `mod-${Date.now()}`,
        type: 'EVENT_SUBMISSION',
        title: `Cultural Event: ${newEvent.titleEn}`,
        submitter: newEvent.organizer.name,
        artform: newEvent.artformName,
        submittedAt: 'Just now',
        status: 'PENDING',
        details: `Venue: ${newEvent.venueName}, Date: ${newEvent.dateRange}, Category: ${newEvent.culturalCategory}. Confirmed: ${newEvent.isConfirmed}`,
        mediaUrl: newEvent.bannerUrl
      },
      ...prev
    ]);

    // Push to Admin Submissions
    const newEvSub: AdminSubmissionItem = {
      id: `sub-ev-${Date.now()}`,
      entityType: 'EVENT',
      title: newEvent.titleEn,
      titleMl: newEvent.titleMl,
      category: newEvent.culturalCategory,
      artform: newEvent.artformName,
      taluk: newEvent.taluk,
      locationDetails: `${newEvent.venueName}, ${newEvent.locationName}`,
      description: newEvent.descriptionEn,
      mediaUrls: [newEvent.bannerUrl, ...(newEvent.gallery || [])],
      contributor: {
        name: newEvent.organizer.name,
        email: newEvent.organizer.email || 'organizer@thrissurculture.org',
        phone: newEvent.organizer.contact || 'N/A',
        role: newEvent.organizer.role || 'Festival Organizer',
        organization: newEvent.organizer.name,
        verifiedContributor: newEvent.organizer.isVerified,
        totalSubmissions: 1
      },
      submittedAt: 'Just now',
      status: 'PENDING',
      sourceAttribution: `Venue: ${newEvent.venueName}`,
      entityId: newEvent.id
    };
    setAdminSubmissions(prev => [newEvSub, ...prev]);
  };

  const resolveModerationItem = (id: string, status: 'APPROVED' | 'REJECTED') => {
    setModerationItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, status };
      }
      return item;
    }));
  };

  // ==========================================================================
  // ADMIN DASHBOARD ACTIONS & MODERATION LOGGING
  // ==========================================================================

  const loginAsDemoAdmin = () => {
    const demoAdmin: UserProfile = {
      id: 'usr-admin-curator-001',
      name: 'Dr. Radhika Nair (Chief Curator)',
      email: 'admin@kalakriti.kerala.gov.in',
      role: 'admin',
      phone: '+91 487 233 1122'
    };
    setUser(demoAdmin);
    try {
      localStorage.setItem('kalakriti_user', JSON.stringify(demoAdmin));
    } catch {}
  };

  const approveSubmission = (id: string, notes?: string) => {
    const item = adminSubmissions.find(s => s.id === id);
    if (!item) return;

    setAdminSubmissions(prev => prev.map(s => {
      if (s.id === id) {
        return {
          ...s,
          status: 'APPROVED',
          rejectionReason: undefined,
          correctionNotes: undefined
        };
      }
      return s;
    }));

    // If it corresponds to an artist, verify that artist
    if (item.entityType === 'ARTIST_PROFILE' && item.entityId) {
      setArtists(prev => prev.map(a => a.id === item.entityId ? { ...a, isVerified: true, verificationBadge: 'VERIFIED_MASTER' } : a));
    }

    // If it corresponds to artwork creation, approve it
    if (item.entityType === 'ARTWORK') {
      setCreations(prev => prev.map(c => c.titleEn === item.title ? { ...c, approvalStatus: 'APPROVED' } : c));
    }

    const log: ModerationLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      adminName: user?.name || 'Dr. Radhika Nair (Chief Curator)',
      adminEmail: user?.email || 'admin@kalakriti.kerala.gov.in',
      action: 'APPROVED',
      entityType: item.entityType,
      entityTitle: item.title,
      notes: notes || 'Submission reviewed and verified according to authentic cultural criteria. Approved for public showcase.'
    };
    setModerationLogs(prev => [log, ...prev]);
  };

  const rejectSubmission = (id: string, reason: string) => {
    const item = adminSubmissions.find(s => s.id === id);
    if (!item) return;

    setAdminSubmissions(prev => prev.map(s => {
      if (s.id === id) {
        return {
          ...s,
          status: 'REJECTED',
          rejectionReason: reason
        };
      }
      return s;
    }));

    const log: ModerationLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      adminName: user?.name || 'Dr. Radhika Nair (Chief Curator)',
      adminEmail: user?.email || 'admin@kalakriti.kerala.gov.in',
      action: 'REJECTED',
      entityType: item.entityType,
      entityTitle: item.title,
      notes: `Rejected with reason: ${reason}`
    };
    setModerationLogs(prev => [log, ...prev]);
  };

  const requestChangesSubmission = (id: string, notes: string) => {
    const item = adminSubmissions.find(s => s.id === id);
    if (!item) return;

    setAdminSubmissions(prev => prev.map(s => {
      if (s.id === id) {
        return {
          ...s,
          status: 'NEEDS_CHANGES',
          correctionNotes: notes
        };
      }
      return s;
    }));

    const log: ModerationLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      adminName: user?.name || 'Dr. Radhika Nair (Chief Curator)',
      adminEmail: user?.email || 'admin@kalakriti.kerala.gov.in',
      action: 'NEEDS_CHANGES',
      entityType: item.entityType,
      entityTitle: item.title,
      notes: `Corrections requested: ${notes}`
    };
    setModerationLogs(prev => [log, ...prev]);
  };

  const editSubmission = (id: string, updatedFields: Partial<AdminSubmissionItem>) => {
    const item = adminSubmissions.find(s => s.id === id);
    if (!item) return;

    setAdminSubmissions(prev => prev.map(s => s.id === id ? { ...s, ...updatedFields } : s));

    const log: ModerationLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      adminName: user?.name || 'Dr. Radhika Nair (Chief Curator)',
      adminEmail: user?.email || 'admin@kalakriti.kerala.gov.in',
      action: 'EDITED',
      entityType: item.entityType,
      entityTitle: updatedFields.title || item.title,
      notes: 'Admin updated submission content for accuracy and formatting.'
    };
    setModerationLogs(prev => [log, ...prev]);
  };

  const deleteSubmission = (id: string) => {
    const item = adminSubmissions.find(s => s.id === id);
    if (!item) return;

    setAdminSubmissions(prev => prev.filter(s => s.id !== id));

    const log: ModerationLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      adminName: user?.name || 'Dr. Radhika Nair (Chief Curator)',
      adminEmail: user?.email || 'admin@kalakriti.kerala.gov.in',
      action: 'DELETED',
      entityType: item.entityType,
      entityTitle: item.title,
      notes: 'Admin permanently removed inappropriate or duplicate content from database.'
    };
    setModerationLogs(prev => [log, ...prev]);
  };

  const toggleAudio = (url: string) => {
    if (audioPlayingUrl === url) {
      setAudioPlayingUrl(null);
    } else {
      setAudioPlayingUrl(url);
    }
  };

  return (
    <CulturalContext.Provider
      value={{
        language,
        toggleLanguage,
        activeTab,
        setActiveTab,
        artists,
        artforms: ARTFORMS_DATA,
        heritageLocations: HERITAGE_LOCATIONS_DATA,
        culturalEvents: events,
        addEvent,
        workshops: WORKSHOPS_DATA,
        stories: COMMUNITY_STORIES_DATA,
        moderationItems,
        searchQuery,
        setSearchQuery,
        selectedTaluk,
        setSelectedTaluk,
        selectedCategory,
        setSelectedCategory,
        selectedArtist,
        setSelectedArtist,
        selectedArtistForProfile,
        setSelectedArtistForProfile,
        navigateToArtistProfile,
        currentDashboardArtistId,
        setCurrentDashboardArtistId,
        selectedHeritage,
        setSelectedHeritage,
        selectedLocationForPage,
        setSelectedLocationForPage,
        navigateToLocationDetail,
        selectedArtform,
        setSelectedArtform,
        inquiryArtist,
        setInquiryArtist,
        isUploadModalOpen,
        setIsUploadModalOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isAboutModalOpen,
        setIsAboutModalOpen,
        user,
        setUser,
        creations,
        bookmarks,
        toggleBookmark,
        isBookmarked,
        addArtist,
        updateArtist,
        addArtworkToArtist,
        updateArtwork,
        deleteArtwork,
        addCreation,
        toggleLikeCreation,
        resolveModerationItem,
        audioPlayingUrl,
        toggleAudio,
        adminSubmissions,
        moderationLogs,
        approveSubmission,
        rejectSubmission,
        requestChangesSubmission,
        editSubmission,
        deleteSubmission,
        loginAsDemoAdmin,
      }}
    >
      {children}
    </CulturalContext.Provider>
  );
};

export const useCultural = () => {
  const context = useContext(CulturalContext);
  if (!context) {
    throw new Error('useCultural must be used within a CulturalProvider');
  }
  return context;
};
