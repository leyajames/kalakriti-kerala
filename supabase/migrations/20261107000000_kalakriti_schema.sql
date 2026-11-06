-- ============================================================================
-- KALAKRITI - Supabase PostgreSQL Schema & Security Architecture
-- Target: PostgreSQL 15+ / Supabase
-- Description: Cultural Discovery & Artist Showcase Platform (Thrissur, Kerala)
-- ============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. CUSTOM ENUMS
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('visitor', 'registered_user', 'artist', 'admin');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE moderation_status AS ENUM ('pending', 'approved', 'rejected');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE event_status AS ENUM ('upcoming', 'past', 'unconfirmed');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE taluk_enum AS ENUM (
    'Thrissur',
    'Thalapilly',
    'Mukundapuram',
    'Chavakkad',
    'Kodungallur',
    'Chalakkudy'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- ============================================================================
-- TABLE 1: profiles
-- Extends auth.users with application profile metadata and role assignment
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  display_name text,
  avatar_url text,
  phone text,
  role user_role NOT NULL DEFAULT 'registered_user',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Index for role lookup
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

-- Helper function to check if current user is an admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- TABLE 2: locations
-- Spatial & administrative registry for Thrissur's 6 Taluks
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  name_ml text,
  taluk taluk_enum NOT NULL,
  address text NOT NULL,
  latitude double precision NOT NULL CHECK (latitude BETWEEN 9.5 AND 11.5),
  longitude double precision NOT NULL CHECK (longitude BETWEEN 75.5 AND 77.5),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_locations_taluk ON public.locations(taluk);

-- ============================================================================
-- TABLE 3: categories
-- Cultural taxonomies (Monuments, Crafts, Performing Arts, Academies, etc.)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name_en text NOT NULL,
  name_ml text NOT NULL,
  description text,
  icon text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- ============================================================================
-- TABLE 4: artists
-- Registered traditional masters, craftsmen, and performers
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.artists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  name text NOT NULL,
  stage_name text,
  avatar_url text NOT NULL,
  bio_en text NOT NULL,
  bio_ml text,
  work_description text NOT NULL,
  primary_artform text NOT NULL,
  experience_years integer NOT NULL DEFAULT 1 CHECK (experience_years >= 0),
  guru_lineage text,
  taluk taluk_enum NOT NULL,
  studio_address text NOT NULL,
  contact_phone text,
  whatsapp_number text,
  email text,
  instagram_handle text,
  website_url text,
  portfolio_photos text[] NOT NULL DEFAULT '{}',
  is_verified boolean NOT NULL DEFAULT false,
  verification_badge text NOT NULL DEFAULT 'EMERGING_ARTIST',
  status moderation_status NOT NULL DEFAULT 'approved',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_artists_status ON public.artists(status);
CREATE INDEX IF NOT EXISTS idx_artists_taluk ON public.artists(taluk);

-- ============================================================================
-- TABLE 5: cultural_listings
-- Detailed dossiers of monuments, temples, academies, and craft clusters
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.cultural_listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title_en text NOT NULL,
  title_ml text NOT NULL,
  category_id uuid REFERENCES public.categories(id) ON DELETE SET NULL,
  location_id uuid REFERENCES public.locations(id) ON DELETE SET NULL,
  taluk taluk_enum NOT NULL,
  address text NOT NULL,
  latitude double precision NOT NULL,
  longitude double precision NOT NULL,
  description_en text NOT NULL,
  description_ml text,
  cultural_significance_en text NOT NULL,
  cultural_significance_ml text,
  historical_context_en text NOT NULL,
  historical_context_ml text,
  image_url text NOT NULL,
  gallery text[] NOT NULL DEFAULT '{}',
  highlights text[] NOT NULL DEFAULT '{}',
  timing_schedule text NOT NULL,
  dress_code_advisory text,
  entry_fee text,
  contributor_name text NOT NULL,
  contributor_role text NOT NULL,
  contributor_org text,
  primary_source text NOT NULL,
  archive_reference text,
  verified_by text NOT NULL,
  last_verified_date text NOT NULL,
  official_website text,
  social_links jsonb DEFAULT '[]'::jsonb,
  status moderation_status NOT NULL DEFAULT 'approved',
  submitted_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_cultural_listings_status ON public.cultural_listings(status);
CREATE INDEX IF NOT EXISTS idx_cultural_listings_taluk ON public.cultural_listings(taluk);

-- ============================================================================
-- TABLE 6: artwork_posts
-- Creations & portfolio pieces submitted by artists and community contributors
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.artwork_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  artist_id uuid REFERENCES public.artists(id) ON DELETE CASCADE,
  title_en text NOT NULL,
  title_ml text,
  category text NOT NULL,
  location text NOT NULL,
  medium text NOT NULL,
  dimensions text,
  price text,
  is_for_sale boolean NOT NULL DEFAULT true,
  story_en text NOT NULL,
  story_ml text,
  images text[] NOT NULL DEFAULT '{}',
  likes_count integer NOT NULL DEFAULT 0,
  views_count integer NOT NULL DEFAULT 0,
  status moderation_status NOT NULL DEFAULT 'approved',
  submitted_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_artwork_posts_status ON public.artwork_posts(status);
CREATE INDEX IF NOT EXISTS idx_artwork_posts_artist_id ON public.artwork_posts(artist_id);

-- ============================================================================
-- TABLE 7: cultural_events
-- Chronological festivals, Pooram schedules, theatre summits, and expos
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.cultural_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title_en text NOT NULL,
  title_ml text NOT NULL,
  category_id uuid REFERENCES public.categories(id) ON DELETE SET NULL,
  artform_name text NOT NULL,
  venue_name text NOT NULL,
  location_name text NOT NULL,
  taluk taluk_enum NOT NULL,
  latitude double precision,
  longitude double precision,
  date_range text NOT NULL,
  date_iso date NOT NULL,
  time_details text NOT NULL,
  malayalam_date text,
  is_free_entry boolean NOT NULL DEFAULT true,
  entry_fee_details text,
  banner_url text NOT NULL,
  gallery text[] NOT NULL DEFAULT '{}',
  organizer_name text NOT NULL,
  organizer_role text,
  organizer_contact text,
  organizer_email text,
  organizer_verified boolean NOT NULL DEFAULT false,
  registration_url text,
  status event_status NOT NULL DEFAULT 'upcoming',
  is_confirmed boolean NOT NULL DEFAULT true,
  confirmation_note text,
  schedule jsonb NOT NULL DEFAULT '[]'::jsonb,
  moderation_status moderation_status NOT NULL DEFAULT 'approved',
  submitted_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_cultural_events_status ON public.cultural_events(status);
CREATE INDEX IF NOT EXISTS idx_cultural_events_mod_status ON public.cultural_events(moderation_status);
CREATE INDEX IF NOT EXISTS idx_cultural_events_date_iso ON public.cultural_events(date_iso);

-- ============================================================================
-- TABLE 8: contributions
-- Tracks contributions submitted by registered users
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.contributions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  entity_type text NOT NULL CHECK (entity_type IN ('cultural_listing', 'artwork_post', 'cultural_event', 'artist')),
  entity_id uuid NOT NULL,
  title text NOT NULL,
  status moderation_status NOT NULL DEFAULT 'pending',
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_contributions_user_id ON public.contributions(user_id);
CREATE INDEX IF NOT EXISTS idx_contributions_status ON public.contributions(status);

-- ============================================================================
-- TABLE 9: moderation_logs
-- Audit trail of admin reviews, approvals, and rejections
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.moderation_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type text NOT NULL,
  entity_id uuid NOT NULL,
  action text NOT NULL CHECK (action IN ('APPROVED', 'REJECTED', 'FLAGGED')),
  reviewer_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  reviewer_notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_moderation_logs_entity ON public.moderation_logs(entity_type, entity_id);

-- ============================================================================
-- TABLE 10: saved_items
-- Bookmarks & cultural itineraries for registered users
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.saved_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  item_type text NOT NULL CHECK (item_type IN ('listing', 'artwork', 'artist', 'event')),
  item_id text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, item_type, item_id)
);

CREATE INDEX IF NOT EXISTS idx_saved_items_user_id ON public.saved_items(user_id);

-- ============================================================================
-- 3. TRIGGERS: AUTOMATIC USER PROFILE CREATION
-- When a user signs up via Supabase Auth, insert a matching profile record
-- ============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
  assigned_role public.user_role;
  user_name text;
BEGIN
  -- Extract user role from metadata if specified, default to 'registered_user'
  assigned_role := COALESCE(
    (new.raw_user_meta_data->>'role')::public.user_role,
    'registered_user'::public.user_role
  );

  user_name := COALESCE(
    new.raw_user_meta_data->>'full_name',
    split_part(new.email, '@', 1)
  );

  INSERT INTO public.profiles (id, full_name, display_name, role)
  VALUES (new.id, user_name, user_name, assigned_role)
  ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    role = EXCLUDED.role,
    updated_at = now();

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- Strict enforcement: Only approved content appears publicly!
-- ============================================================================

-- Enable RLS across all 10 tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cultural_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artwork_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cultural_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.moderation_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_items ENABLE ROW LEVEL SECURITY;

-- ----------------------------------------------------------------------------
-- RLS: profiles
-- ----------------------------------------------------------------------------
-- Public can view basic profile info
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

-- Users can update their own profile
CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Admins can update any profile (e.g. promoting roles)
CREATE POLICY "Admins can update any profile"
  ON public.profiles FOR ALL
  USING (public.is_admin());

-- ----------------------------------------------------------------------------
-- RLS: locations & categories (Public read-only, Admin writable)
-- ----------------------------------------------------------------------------
CREATE POLICY "Locations are publicly readable"
  ON public.locations FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage locations"
  ON public.locations FOR ALL
  USING (public.is_admin());

CREATE POLICY "Categories are publicly readable"
  ON public.categories FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage categories"
  ON public.categories FOR ALL
  USING (public.is_admin());

-- ----------------------------------------------------------------------------
-- RLS: artists
-- Approved artists are publicly viewable. Artists can manage their own profile.
-- ----------------------------------------------------------------------------
CREATE POLICY "Approved artists are viewable by public"
  ON public.artists FOR SELECT
  USING (status = 'approved' OR profile_id = auth.uid() OR public.is_admin());

CREATE POLICY "Artists can insert their own artist profile"
  ON public.artists FOR INSERT
  WITH CHECK (auth.uid() = profile_id OR public.is_admin());

CREATE POLICY "Artists can update their own artist profile"
  ON public.artists FOR UPDATE
  USING (auth.uid() = profile_id OR public.is_admin());

CREATE POLICY "Admins can manage all artist profiles"
  ON public.artists FOR ALL
  USING (public.is_admin());

-- ----------------------------------------------------------------------------
-- RLS: cultural_listings
-- Only approved listings viewable publicly. Registered users can submit.
-- ----------------------------------------------------------------------------
CREATE POLICY "Approved cultural listings are publicly viewable"
  ON public.cultural_listings FOR SELECT
  USING (status = 'approved' OR submitted_by = auth.uid() OR public.is_admin());

CREATE POLICY "Authenticated users can submit cultural listings"
  ON public.cultural_listings FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage cultural listings"
  ON public.cultural_listings FOR ALL
  USING (public.is_admin());

-- ----------------------------------------------------------------------------
-- RLS: artwork_posts
-- Only approved posts viewable publicly. Artists can manage their own submissions.
-- ----------------------------------------------------------------------------
CREATE POLICY "Approved artwork posts are publicly viewable"
  ON public.artwork_posts FOR SELECT
  USING (status = 'approved' OR submitted_by = auth.uid() OR public.is_admin());

CREATE POLICY "Artists can insert their own artwork posts"
  ON public.artwork_posts FOR INSERT
  WITH CHECK (
    auth.role() = 'authenticated' AND (
      submitted_by = auth.uid() OR
      EXISTS (SELECT 1 FROM public.artists WHERE id = artist_id AND profile_id = auth.uid()) OR
      public.is_admin()
    )
  );

CREATE POLICY "Artists can update their own artwork posts"
  ON public.artwork_posts FOR UPDATE
  USING (
    submitted_by = auth.uid() OR
    EXISTS (SELECT 1 FROM public.artists WHERE id = artist_id AND profile_id = auth.uid()) OR
    public.is_admin()
  );

CREATE POLICY "Artists can delete their own artwork posts"
  ON public.artwork_posts FOR DELETE
  USING (
    submitted_by = auth.uid() OR
    EXISTS (SELECT 1 FROM public.artists WHERE id = artist_id AND profile_id = auth.uid()) OR
    public.is_admin()
  );

-- ----------------------------------------------------------------------------
-- RLS: cultural_events
-- Only approved events viewable publicly. Registered users can submit for review.
-- ----------------------------------------------------------------------------
CREATE POLICY "Approved cultural events are publicly viewable"
  ON public.cultural_events FOR SELECT
  USING (moderation_status = 'approved' OR submitted_by = auth.uid() OR public.is_admin());

CREATE POLICY "Authenticated users can submit cultural events"
  ON public.cultural_events FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage cultural events"
  ON public.cultural_events FOR ALL
  USING (public.is_admin());

-- ----------------------------------------------------------------------------
-- RLS: contributions
-- Users view their own contributions; Admins view all.
-- ----------------------------------------------------------------------------
CREATE POLICY "Users can view their own contributions"
  ON public.contributions FOR SELECT
  USING (user_id = auth.uid() OR public.is_admin());

CREATE POLICY "Users can insert their own contributions"
  ON public.contributions FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can manage all contributions"
  ON public.contributions FOR ALL
  USING (public.is_admin());

-- ----------------------------------------------------------------------------
-- RLS: moderation_logs
-- Admins only!
-- ----------------------------------------------------------------------------
CREATE POLICY "Admins can view and create moderation logs"
  ON public.moderation_logs FOR ALL
  USING (public.is_admin());

-- ----------------------------------------------------------------------------
-- RLS: saved_items
-- Strictly private to the owning user
-- ----------------------------------------------------------------------------
CREATE POLICY "Users can view their own saved items"
  ON public.saved_items FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own saved items"
  ON public.saved_items FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own saved items"
  ON public.saved_items FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================================
-- 5. SUPABASE STORAGE BUCKET CREATION & POLICIES
-- ============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('kalakriti-media', 'kalakriti-media', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS Policies
CREATE POLICY "Public can view kalakriti-media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'kalakriti-media');

CREATE POLICY "Authenticated users can upload to kalakriti-media"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'kalakriti-media' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update their uploaded files"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'kalakriti-media' AND auth.uid() = owner);

CREATE POLICY "Users can delete their uploaded files"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'kalakriti-media' AND (auth.uid() = owner OR public.is_admin()));

