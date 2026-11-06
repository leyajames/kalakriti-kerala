export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type UserRole = 'visitor' | 'registered_user' | 'artist' | 'admin';
export type ModerationStatus = 'pending' | 'approved' | 'rejected';
export type EventStatus = 'upcoming' | 'past' | 'unconfirmed';
export type TalukEnum =
  | 'Thrissur'
  | 'Thalapilly'
  | 'Mukundapuram'
  | 'Chavakkad'
  | 'Kodungallur'
  | 'Chalakkudy';

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string;
          display_name: string | null;
          avatar_url: string | null;
          phone: string | null;
          role: UserRole;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name: string;
          display_name?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
          role?: UserRole;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          display_name?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
          role?: UserRole;
          created_at?: string;
          updated_at?: string;
        };
      };
      locations: {
        Row: {
          id: string;
          name: string;
          name_ml: string | null;
          taluk: TalukEnum;
          address: string;
          latitude: number;
          longitude: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          name_ml?: string | null;
          taluk: TalukEnum;
          address: string;
          latitude: number;
          longitude: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          name_ml?: string | null;
          taluk?: TalukEnum;
          address?: string;
          latitude?: number;
          longitude?: number;
          created_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          slug: string;
          name_en: string;
          name_ml: string;
          description: string | null;
          icon: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name_en: string;
          name_ml: string;
          description?: string | null;
          icon?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name_en?: string;
          name_ml?: string;
          description?: string | null;
          icon?: string | null;
          created_at?: string;
        };
      };
      artists: {
        Row: {
          id: string;
          profile_id: string | null;
          name: string;
          stage_name: string | null;
          avatar_url: string;
          bio_en: string;
          bio_ml: string | null;
          work_description: string;
          primary_artform: string;
          experience_years: number;
          guru_lineage: string | null;
          taluk: TalukEnum;
          studio_address: string;
          contact_phone: string | null;
          whatsapp_number: string | null;
          email: string | null;
          instagram_handle: string | null;
          website_url: string | null;
          portfolio_photos: string[];
          is_verified: boolean;
          verification_badge: string;
          status: ModerationStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          profile_id?: string | null;
          name: string;
          stage_name?: string | null;
          avatar_url: string;
          bio_en: string;
          bio_ml?: string | null;
          work_description: string;
          primary_artform: string;
          experience_years?: number;
          guru_lineage?: string | null;
          taluk: TalukEnum;
          studio_address: string;
          contact_phone?: string | null;
          whatsapp_number?: string | null;
          email?: string | null;
          instagram_handle?: string | null;
          website_url?: string | null;
          portfolio_photos?: string[];
          is_verified?: boolean;
          verification_badge?: string;
          status?: ModerationStatus;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          profile_id?: string | null;
          name?: string;
          stage_name?: string | null;
          avatar_url?: string;
          bio_en?: string;
          bio_ml?: string | null;
          work_description?: string;
          primary_artform?: string;
          experience_years?: number;
          guru_lineage?: string | null;
          taluk?: TalukEnum;
          studio_address?: string;
          contact_phone?: string | null;
          whatsapp_number?: string | null;
          email?: string | null;
          instagram_handle?: string | null;
          website_url?: string | null;
          portfolio_photos?: string[];
          is_verified?: boolean;
          verification_badge?: string;
          status?: ModerationStatus;
          created_at?: string;
          updated_at?: string;
        };
      };
      cultural_listings: {
        Row: {
          id: string;
          slug: string;
          title_en: string;
          title_ml: string;
          category_id: string | null;
          location_id: string | null;
          taluk: TalukEnum;
          address: string;
          latitude: number;
          longitude: number;
          description_en: string;
          description_ml: string | null;
          cultural_significance_en: string;
          cultural_significance_ml: string | null;
          historical_context_en: string;
          historical_context_ml: string | null;
          image_url: string;
          gallery: string[];
          highlights: string[];
          timing_schedule: string;
          dress_code_advisory: string | null;
          entry_fee: string | null;
          contributor_name: string;
          contributor_role: string;
          contributor_org: string | null;
          primary_source: string;
          archive_reference: string | null;
          verified_by: string;
          last_verified_date: string;
          official_website: string | null;
          social_links: Json | null;
          status: ModerationStatus;
          submitted_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title_en: string;
          title_ml: string;
          category_id?: string | null;
          location_id?: string | null;
          taluk: TalukEnum;
          address: string;
          latitude: number;
          longitude: number;
          description_en: string;
          description_ml?: string | null;
          cultural_significance_en: string;
          cultural_significance_ml?: string | null;
          historical_context_en: string;
          historical_context_ml?: string | null;
          image_url: string;
          gallery?: string[];
          highlights?: string[];
          timing_schedule: string;
          dress_code_advisory?: string | null;
          entry_fee?: string | null;
          contributor_name: string;
          contributor_role: string;
          contributor_org?: string | null;
          primary_source: string;
          archive_reference?: string | null;
          verified_by: string;
          last_verified_date: string;
          official_website?: string | null;
          social_links?: Json | null;
          status?: ModerationStatus;
          submitted_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title_en?: string;
          title_ml?: string;
          category_id?: string | null;
          location_id?: string | null;
          taluk?: TalukEnum;
          address?: string;
          latitude?: number;
          longitude?: number;
          description_en?: string;
          description_ml?: string | null;
          cultural_significance_en?: string;
          cultural_significance_ml?: string | null;
          historical_context_en?: string;
          historical_context_ml?: string | null;
          image_url?: string;
          gallery?: string[];
          highlights?: string[];
          timing_schedule?: string;
          dress_code_advisory?: string | null;
          entry_fee?: string | null;
          contributor_name?: string;
          contributor_role?: string;
          contributor_org?: string | null;
          primary_source?: string;
          archive_reference?: string | null;
          verified_by?: string;
          last_verified_date?: string;
          official_website?: string | null;
          social_links?: Json | null;
          status?: ModerationStatus;
          submitted_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      artwork_posts: {
        Row: {
          id: string;
          artist_id: string;
          title_en: string;
          title_ml: string | null;
          category: string;
          location: string;
          medium: string;
          dimensions: string | null;
          price: string | null;
          is_for_sale: boolean;
          story_en: string;
          story_ml: string | null;
          images: string[];
          likes_count: number;
          views_count: number;
          status: ModerationStatus;
          submitted_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          artist_id: string;
          title_en: string;
          title_ml?: string | null;
          category: string;
          location: string;
          medium: string;
          dimensions?: string | null;
          price?: string | null;
          is_for_sale?: boolean;
          story_en: string;
          story_ml?: string | null;
          images?: string[];
          likes_count?: number;
          views_count?: number;
          status?: ModerationStatus;
          submitted_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          artist_id?: string;
          title_en?: string;
          title_ml?: string | null;
          category?: string;
          location?: string;
          medium?: string;
          dimensions?: string | null;
          price?: string | null;
          is_for_sale?: boolean;
          story_en?: string;
          story_ml?: string | null;
          images?: string[];
          likes_count?: number;
          views_count?: number;
          status?: ModerationStatus;
          submitted_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      cultural_events: {
        Row: {
          id: string;
          slug: string;
          title_en: string;
          title_ml: string;
          category_id: string | null;
          artform_name: string;
          venue_name: string;
          location_name: string;
          taluk: TalukEnum;
          latitude: number | null;
          longitude: number | null;
          date_range: string;
          date_iso: string;
          time_details: string;
          malayalam_date: string | null;
          is_free_entry: boolean;
          entry_fee_details: string | null;
          banner_url: string;
          gallery: string[];
          organizer_name: string;
          organizer_role: string | null;
          organizer_contact: string | null;
          organizer_email: string | null;
          organizer_verified: boolean;
          registration_url: string | null;
          status: EventStatus;
          is_confirmed: boolean;
          confirmation_note: string | null;
          schedule: Json;
          moderation_status: ModerationStatus;
          submitted_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title_en: string;
          title_ml: string;
          category_id?: string | null;
          artform_name: string;
          venue_name: string;
          location_name: string;
          taluk: TalukEnum;
          latitude?: number | null;
          longitude?: number | null;
          date_range: string;
          date_iso: string;
          time_details: string;
          malayalam_date?: string | null;
          is_free_entry?: boolean;
          entry_fee_details?: string | null;
          banner_url: string;
          gallery?: string[];
          organizer_name: string;
          organizer_role?: string | null;
          organizer_contact?: string | null;
          organizer_email?: string | null;
          organizer_verified?: boolean;
          registration_url?: string | null;
          status?: EventStatus;
          is_confirmed?: boolean;
          confirmation_note?: string | null;
          schedule?: Json;
          moderation_status?: ModerationStatus;
          submitted_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title_en?: string;
          title_ml?: string;
          category_id?: string | null;
          artform_name?: string;
          venue_name?: string;
          location_name?: string;
          taluk?: TalukEnum;
          latitude?: number | null;
          longitude?: number | null;
          date_range?: string;
          date_iso?: string;
          time_details?: string;
          malayalam_date?: string | null;
          is_free_entry?: boolean;
          entry_fee_details?: string | null;
          banner_url?: string;
          gallery?: string[];
          organizer_name?: string;
          organizer_role?: string | null;
          organizer_contact?: string | null;
          organizer_email?: string | null;
          organizer_verified?: boolean;
          registration_url?: string | null;
          status?: EventStatus;
          is_confirmed?: boolean;
          confirmation_note?: string | null;
          schedule?: Json;
          moderation_status?: ModerationStatus;
          submitted_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      contributions: {
        Row: {
          id: string;
          user_id: string;
          entity_type: string;
          entity_id: string;
          title: string;
          status: ModerationStatus;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          entity_type: string;
          entity_id: string;
          title: string;
          status?: ModerationStatus;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          entity_type?: string;
          entity_id?: string;
          title?: string;
          status?: ModerationStatus;
          notes?: string | null;
          created_at?: string;
        };
      };
      moderation_logs: {
        Row: {
          id: string;
          entity_type: string;
          entity_id: string;
          action: string;
          reviewer_id: string | null;
          reviewer_notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          entity_type: string;
          entity_id: string;
          action: string;
          reviewer_id?: string | null;
          reviewer_notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          entity_type?: string;
          entity_id?: string;
          action?: string;
          reviewer_id?: string | null;
          reviewer_notes?: string | null;
          created_at?: string;
        };
      };
      saved_items: {
        Row: {
          id: string;
          user_id: string;
          item_type: string;
          item_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          item_type: string;
          item_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          item_type?: string;
          item_id?: string;
          created_at?: string;
        };
      };
    };
  };
}

