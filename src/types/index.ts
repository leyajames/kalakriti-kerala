export type Language = 'en' | 'ml';

export type ArtformCategory = 
  | 'PERFORMING_CLASSICAL'
  | 'PERCUSSION_MELAM'
  | 'FOLK_RITUAL'
  | 'CRAFT_SCULPTURE'
  | 'HANDLOOM_TEXTILE'
  | 'THEATRE_LITERATURE';

export type Taluk = 
  | 'Thrissur'
  | 'Mukundapuram'
  | 'Kodungallur'
  | 'Chavakkad'
  | 'Chalakudy'
  | 'Thalapilly';

export interface Artform {
  id: string;
  slug: string;
  nameEn: string;
  nameMl: string;
  category: ArtformCategory;
  categoryLabelEn: string;
  categoryLabelMl: string;
  descriptionEn: string;
  descriptionMl: string;
  historyEn: string;
  historyMl: string;
  instruments: string[];
  audioSampleUrl?: string;
  coverImage: string;
  isUnesco?: boolean;
  isGiTagged?: boolean;
  giTagYear?: string;
  originLocation: string;
}

export interface Artwork {
  id: string;
  artistId: string;
  artistName: string;
  titleEn: string;
  titleMl: string;
  artformId: string;
  artformName: string;
  craftTechnique: string;
  medium: string;
  dimensions?: string;
  yearCreated: number;
  images: string[];
  price?: string;
  isForSale: boolean;
  storyEn: string;
  storyMl: string;
  viewsCount: number;
  likesCount: number;
  category?: string;
  location?: string;
  approvalStatus?: 'APPROVED' | 'PENDING' | 'REJECTED';
  createdAt?: string;
}

export interface Artist {
  id: string;
  name: string;
  stageName?: string;
  avatar: string;
  bioEn: string;
  bioMl: string;
  primaryArtformId: string;
  primaryArtformName: string;
  guruLineage?: string;
  experienceYears: number;
  studioName?: string;
  studioAddress: string;
  taluk: Taluk;
  location: {
    lat: number;
    lng: number;
  };
  contactPhone?: string;
  whatsappNumber?: string;
  email?: string;
  instagramHandle?: string;
  socialLinks?: {
    platform: string;
    url: string;
  }[];
  workDescription?: string;
  portfolioPhotos?: string[];
  isVerified: boolean;
  verificationBadge?: 'VERIFIED_MASTER' | 'HERITAGE_GUILD' | 'EMERGING_ARTIST';
  awards: string[];
  artworks: Artwork[];
}

export interface HeritageLocation {
  id: string;
  slug: string;
  nameEn: string;
  nameMl: string;
  category: 'TEMPLE' | 'PALACE' | 'ACADEMY' | 'CHURCH' | 'MOSQUE' | 'HERITAGE_VILLAGE';
  descriptionEn: string;
  descriptionMl: string;
  architecturalStyle: string;
  historicalEra: string;
  visitingHours: string;
  entryRulesDressCode?: string;
  location: {
    lat: number;
    lng: number;
  };
  address: string;
  taluk: Taluk;
  image: string;
  gallery: string[];
  audioGuideAvailable: boolean;
  audioGuideTitle?: string;
}

export interface FestivalScheduleItem {
  time: string;
  eventEn: string;
  eventMl: string;
  location: string;
  leadMaster?: string;
}

export type EventStatus = 'UPCOMING' | 'PAST' | 'UNCONFIRMED';

export type EventCategory = 
  | 'TEMPLE_FESTIVAL'
  | 'PERFORMING_ARTS'
  | 'CRAFT_EXHIBITION'
  | 'LITERARY_MEET'
  | 'WORKSHOP_SEMINAR'
  | 'COMMUNITY_CELEBRATION';

export interface CulturalEvent {
  id: string;
  slug: string;
  titleEn: string;
  titleMl: string;
  descriptionEn: string;
  descriptionMl: string;
  artformName: string;
  culturalCategory: EventCategory;
  categoryLabelEn: string;
  categoryLabelMl: string;
  venueName: string;
  locationName: string;
  taluk: Taluk;
  location: {
    lat: number;
    lng: number;
  };
  dateRange: string;
  dateISO: string;
  time: string;
  malayalamDate: string;
  isFreeEntry: boolean;
  entryFeeDetails?: string;
  bannerUrl: string;
  gallery?: string[];
  organizer: {
    name: string;
    role?: string;
    contact?: string;
    email?: string;
    isVerified: boolean;
  };
  registrationUrl?: string;
  status: EventStatus;
  isConfirmed: boolean;
  confirmationNote?: string;
  schedule: FestivalScheduleItem[];
  advisory?: string;
  submittedBy?: string;
}

export interface Workshop {
  id: string;
  artistId: string;
  artistName: string;
  title: string;
  artform: string;
  description: string;
  skillLevel: 'Beginner' | 'Intermediate' | 'Masterclass';
  maxSeats: number;
  enrolledSeats: number;
  feeInr: number;
  dateTime: string;
  duration: string;
  venue: string;
  location: {
    lat: number;
    lng: number;
  };
}

export interface CommunityStory {
  id: string;
  authorName: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  relatedArtform: string;
  taluk: Taluk;
  date: string;
  likes: number;
}

export interface ModerationItem {
  id: string;
  type: 'ARTIST_VERIFICATION' | 'ARTWORK_SUBMISSION' | 'STORY' | 'EVENT_SUBMISSION';
  title: string;
  submitter: string;
  artform: string;
  submittedAt: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  details: string;
  mediaUrl?: string;
}


export interface CommunityCreation {
  id: string;
  titleEn: string;
  titleMl: string;
  creatorName: string;
  creatorRole: string;
  category: string;
  image: string;
  images?: string[];
  medium: string;
  price?: string;
  location: string;
  likes: number;
  timeAgo: string;
  artistId?: string;
  descriptionEn?: string;
  descriptionMl?: string;
  approvalStatus?: 'APPROVED' | 'PENDING' | 'REJECTED';
}

export type CulturalCategory = 
  | 'HERITAGE_MONUMENT'
  | 'ARTISAN_STUDIO'
  | 'CULTURAL_FESTIVAL'
  | 'CRAFT_CLUSTER'
  | 'ACADEMY_MUSEUM';

export type ExperienceType = 
  | 'HERITAGE_WALK'
  | 'STUDIO_VISIT'
  | 'LIVE_PERFORMANCE'
  | 'WORKSHOP_TRAINING'
  | 'MUSEUM_ARCHIVE';

export interface CulturalLocation {
  id: string;
  slug: string;
  titleEn: string;
  titleMl: string;
  culturalCategory: CulturalCategory;
  categoryLabelEn: string;
  categoryLabelMl: string;
  experienceType: ExperienceType;
  experienceTypeLabelEn: string;
  primaryArtform: string;
  taluk: Taluk;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  timingOrDate: string;
  descriptionEn: string;
  descriptionMl: string;
  culturalSignificanceEn: string;
  culturalSignificanceMl: string;
  historicalContextEn: string;
  historicalContextMl: string;
  image: string;
  gallery: string[];
  highlights: string[];
  dressCodeOrAdvisory?: string;
  entryFee?: string;
  contributor: {
    name: string;
    role: string;
    organization: string;
  };
  sourceAttribution: {
    primarySource: string;
    archiveReference?: string;
    verifiedBy: string;
    lastUpdated: string;
  };
  officialWebsite?: string;
  socialLinks?: {
    platform: string;
    url: string;
  }[];
  relatedLocationIds: string[];
  isIllustrativeData: boolean;
  sampleDisclaimer: string;
  contactOrWebsite?: string;
}

// ============================================================================
// ADMIN DASHBOARD & MODERATION SYSTEM TYPES
// ============================================================================

export type SubmissionStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'NEEDS_CHANGES';

export type SubmissionEntityType = 'LISTING' | 'ARTIST_PROFILE' | 'ARTWORK' | 'EVENT';

export interface ContributorInfo {
  name: string;
  email?: string;
  phone?: string;
  role?: string;
  organization?: string;
  verifiedContributor?: boolean;
  totalSubmissions?: number;
}

export interface AdminSubmissionItem {
  id: string;
  entityType: SubmissionEntityType;
  title: string;
  titleMl?: string;
  category: string;
  artform?: string;
  taluk?: string;
  locationDetails?: string;
  description: string;
  mediaUrls: string[];
  contributor: ContributorInfo;
  submittedAt: string;
  status: SubmissionStatus;
  rejectionReason?: string;
  correctionNotes?: string;
  sourceAttribution?: string;
  entityId?: string;
}

export interface ModerationLogEntry {
  id: string;
  timestamp: string;
  adminName: string;
  adminEmail: string;
  action: 'APPROVED' | 'REJECTED' | 'NEEDS_CHANGES' | 'EDITED' | 'DELETED';
  entityType: SubmissionEntityType;
  entityTitle: string;
  notes?: string;
}

