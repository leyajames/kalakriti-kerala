import { createClient, SupabaseClient, User, Session } from '@supabase/supabase-js';
import { Database, UserRole, ModerationStatus, EventStatus } from './database.types';

// Retrieve public environment variables (safe for browser client)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// Helper to check if real Supabase credentials are configured
export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl !== 'https://your-project.supabase.co' &&
    supabaseAnonKey !== 'your-anon-key' &&
    supabaseUrl.startsWith('https://')
  );
};

// Initialize Supabase Client (fallback to placeholder if not yet populated)
export const supabase: SupabaseClient<Database> = createClient<Database>(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
);

// ============================================================================
// 1. AUTHENTICATION HELPERS
// ============================================================================

export interface AuthResponse {
  user: User | null;
  session: Session | null;
  error: string | null;
}

/**
 * Register a new user with Supabase Auth (Visitor, Registered User, Artist, or Admin)
 */
export async function registerUser(
  email: string,
  password: string,
  fullName: string,
  role: UserRole = 'registered_user'
): Promise<AuthResponse> {
  // Client-side input validation
  if (!email || !email.includes('@')) {
    return { user: null, session: null, error: 'A valid email address is required.' };
  }
  if (!password || password.length < 6) {
    return { user: null, session: null, error: 'Password must be at least 6 characters long.' };
  }
  if (!fullName || fullName.trim().length === 0) {
    return { user: null, session: null, error: 'Full name is required.' };
  }

  if (!isSupabaseConfigured()) {
    // Return graceful offline simulated response if Supabase credentials are not yet set
    return {
      user: {
        id: `local-user-${Date.now()}`,
        email,
        app_metadata: {},
        user_metadata: { full_name: fullName, role },
        aud: 'authenticated',
        created_at: new Date().toISOString()
      } as User,
      session: null,
      error: null
    };
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: role
        }
      }
    });

    if (error) {
      return { user: null, session: null, error: error.message };
    }

    return { user: data.user, session: data.session, error: null };
  } catch (err: any) {
    return { user: null, session: null, error: err.message || 'An unexpected error occurred during signup.' };
  }
}

/**
 * Secure login with email and password through Supabase Auth
 */
export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  if (!email || !password) {
    return { user: null, session: null, error: 'Please enter both email and password.' };
  }

  if (!isSupabaseConfigured()) {
    return {
      user: {
        id: `local-user-${Date.now()}`,
        email,
        app_metadata: {},
        user_metadata: { full_name: email.split('@')[0], role: 'registered_user' },
        aud: 'authenticated',
        created_at: new Date().toISOString()
      } as User,
      session: null,
      error: null
    };
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return { user: null, session: null, error: error.message };
    }

    return { user: data.user, session: data.session, error: null };
  } catch (err: any) {
    return { user: null, session: null, error: err.message || 'Login failed.' };
  }
}

/**
 * Log out and terminate the current Supabase session
 */
export async function logoutUser(): Promise<{ error: string | null }> {
  if (!isSupabaseConfigured()) {
    return { error: null };
  }

  try {
    const { error } = await supabase.auth.signOut();
    return { error: error ? error.message : null };
  } catch (err: any) {
    return { error: err.message || 'Logout failed.' };
  }
}

// ============================================================================
// 2. SUPABASE STORAGE (IMAGE UPLOADS)
// ============================================================================

/**
 * Upload cultural photographs, artwork, or avatars to Supabase Storage bucket 'kalakriti-media'
 */
export async function uploadImageToSupabase(
  file: File,
  folder: 'avatars' | 'artworks' | 'events' | 'listings' = 'artworks'
): Promise<{ url: string | null; error: string | null }> {
  // Input validation
  const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (!validTypes.includes(file.type)) {
    return { url: null, error: 'Only JPG, PNG, and WebP images are allowed.' };
  }
  // Max 8MB
  if (file.size > 8 * 1024 * 1024) {
    return { url: null, error: 'Image size exceeds maximum limit of 8MB.' };
  }

  if (!isSupabaseConfigured()) {
    // Return Base64 or object URL for local simulation
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve({ url: reader.result as string, error: null });
      };
      reader.readAsDataURL(file);
    });
  }

  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('kalakriti-media')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      return { url: null, error: uploadError.message };
    }

    const { data } = supabase.storage
      .from('kalakriti-media')
      .getPublicUrl(fileName);

    return { url: data.publicUrl, error: null };
  } catch (err: any) {
    return { url: null, error: err.message || 'Image upload failed.' };
  }
}

// ============================================================================
// 3. DATABASE QUERIES & SECURITY REPOSITORY
// Enforcing that only approved content appears publicly!
// ============================================================================

/**
 * Fetch approved cultural listings (monuments, craft clusters, academies)
 */
export async function fetchPublicCulturalListings() {
  if (!isSupabaseConfigured()) return [];
  const { data, error } = await supabase
    .from('cultural_listings')
    .select('*, categories(*), locations(*)')
    .eq('status', 'approved')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching cultural listings:', error);
    return [];
  }
  return data;
}

/**
 * Fetch approved artwork posts for Community Showcase
 */
export async function fetchPublicArtworkPosts() {
  if (!isSupabaseConfigured()) return [];
  const { data, error } = await supabase
    .from('artwork_posts')
    .select('*, artists(*)')
    .eq('status', 'approved')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching artwork posts:', error);
    return [];
  }
  return data;
}

/**
 * Fetch approved cultural events for Events Discovery
 */
export async function fetchPublicCulturalEvents(statusFilter?: EventStatus) {
  if (!isSupabaseConfigured()) return [];
  let query = supabase
    .from('cultural_events')
    .select('*')
    .eq('moderation_status', 'approved')
    .order('date_iso', { ascending: true });

  if (statusFilter) {
    query = query.eq('status', statusFilter);
  }

  const { data, error } = await query;
  if (error) {
    console.error('Error fetching cultural events:', error);
    return [];
  }
  return data;
}

/**
 * Fetch approved living master artists
 */
export async function fetchPublicArtists() {
  if (!isSupabaseConfigured()) return [];
  const { data, error } = await supabase
    .from('artists')
    .select('*')
    .eq('status', 'approved')
    .order('experience_years', { ascending: false });

  if (error) {
    console.error('Error fetching artists:', error);
    return [];
  }
  return data;
}

/**
 * Save / Bookmark an item (Cultural listing, artwork, artist, or event)
 */
export async function toggleSupabaseSavedItem(
  userId: string,
  itemType: 'listing' | 'artwork' | 'artist' | 'event',
  itemId: string
): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;

  try {
    const table = supabase.from('saved_items') as any;
    // Check if exists
    const { data } = await table
      .select('id')
      .eq('user_id', userId)
      .eq('item_type', itemType)
      .eq('item_id', itemId)
      .maybeSingle();

    if (data && data.id) {
      // Delete
      await table
        .delete()
        .eq('id', data.id);
      return false; // unbookmarked
    } else {
      // Insert
      await table
        .insert({
          user_id: userId,
          item_type: itemType,
          item_id: itemId
        });
      return true; // bookmarked
    }
  } catch (err) {
    console.error('Error in toggleSupabaseSavedItem:', err);
    return false;
  }
}

/**
 * Fetch all saved item IDs for the authenticated user
 */
export async function fetchUserSavedItems(userId: string): Promise<string[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const table = supabase.from('saved_items') as any;
    const { data, error } = await table
      .select('item_id, item_type')
      .eq('user_id', userId);

    if (error || !data) {
      if (error) console.error('Error fetching saved items:', error);
      return [];
    }
    return (data as Array<{ item_id: string }>).map(d => d.item_id);
  } catch (err) {
    console.error('Error in fetchUserSavedItems:', err);
    return [];
  }
}

