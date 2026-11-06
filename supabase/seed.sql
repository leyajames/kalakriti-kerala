-- ============================================================================
-- KALAKRITI - PostgreSQL Seed Data
-- Database Population for Thrissur Cultural Heritage Registry
-- ============================================================================

-- 1. SEED CATEGORIES
INSERT INTO public.categories (slug, name_en, name_ml, description, icon) VALUES
('heritage-monuments', 'Heritage Monuments & Sacred Sites', 'പൈതൃക സ്മാരകങ്ങൾ', 'Millennia-old temple complexes, palaces, and rock shelters', 'Landmark'),
('craft-clusters', 'GI Craft Clusters & Artisan Guilds', 'കരകൗശല ഗ്രാമങ്ങൾ', 'Geographically Indicated handlooms, bell-metal casting, and woodcarving', 'Scissors'),
('performing-arts', 'Classical & Folk Performing Arts', 'ശാസ്ത്രീയ & നാടോടി കലകൾ', 'Kathakali, Koodiyattam, Melam, Panchavadyam, and Pulikali', 'Music'),
('academies-museums', 'Cultural Academies & Living Archives', 'കലാഗോപുരങ്ങൾ & മ്യൂസിയങ്ങൾ', 'State academies, Deemed arts universities, and manuscript archives', 'BookOpen'),
('festivals-poorams', 'Temple Festivals & Poorams', 'ക്ഷേത്രോത്സവങ്ങൾ & പൂരങ്ങൾ', 'Thrissur Pooram, Arattupuzha Devamela, and seasonal Utsavams', 'Flame')
ON CONFLICT (slug) DO NOTHING;

-- 2. SEED LOCATIONS (THRISSUR 6 TALUKS)
INSERT INTO public.locations (name, name_ml, taluk, address, latitude, longitude) VALUES
('Swaraj Round & Thekkinkadu Maidan', 'സ്വരാജ് റൗണ്ട് & തേക്കിൻകാട് മൈതാനം', 'Thrissur', 'Swaraj Round, Thrissur 680001', 10.5244, 76.2144),
('Cheruthuruthy Nila Riverside', 'ചെറുതുരുത്തി നിലാതീരം', 'Thalapilly', 'Cheruthuruthy, Thrissur 679531', 10.7483, 76.2798),
('Kuthampully Handloom Village', 'കുത്തമ്പുള്ളി കൈത്തറി ഗ്രാമം', 'Thalapilly', 'Thiruvilwamala, Thrissur 680588', 10.7412, 76.4385),
('Nadavaramba Bell Metal Cluster', 'നടവരമ്പ് വെങ്കല ഗ്രാമം', 'Mukundapuram', 'Nadavaramba, Irinjalakuda 680661', 10.3341, 76.2305),
('Guruvayur Temple Precinct', 'ഗുരുവായൂർ ക്ഷേത്ര പരിസരം', 'Chavakkad', 'Guruvayur, Thrissur 680101', 10.5946, 76.0384),
('Kodungallur Heritage Sanctum', 'കൊടുങ്ങല്ലൂർ പൈതൃക സങ്കേതം', 'Kodungallur', 'Kodungallur, Thrissur 680664', 10.2268, 76.1952)
ON CONFLICT DO NOTHING;

-- 3. SEED MASTER ARTISTS
INSERT INTO public.artists (
  name, stage_name, avatar_url, bio_en, bio_ml, work_description,
  primary_artform, experience_years, guru_lineage, taluk, studio_address,
  contact_phone, whatsapp_number, is_verified, verification_badge, status
) VALUES
(
  'Vadakke Manalath Govindan Nair',
  'Kalamandalam Gopi (ഗുരു ഗോപി ആശാൻ)',
  'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=400&q=80',
  'Padma Shri and Sangeet Natak Akademi Fellow. The living doyen of the Kalluvazhi Chitta tradition of Kathakali, renowned for iconic enactments of Nala, Karna, and Rugmangada.',
  'പത്മശ്രീ പുരസ്കാര ജേതാവ്. കല്ലുവഴി ചിട്ടയുടെ കുലപതിയായ പ്രശസ്ത കഥകളി ആചാര്യൻ.',
  'Mastery of Navarasas, minute facial choreographies, and sacred Sopana acting traditions perfected over six decades at Kerala Kalamandalam.',
  'Kathakali Classical Theatre',
  65,
  'Kalamandalam Ramankutty Nair & Padmanabhan Nair',
  'Thalapilly',
  'Near Kerala Kalamandalam, Cheruthuruthy, Thrissur 679531',
  '+91 94471 23450',
  '+91 94471 23450',
  true,
  'VERIFIED_MASTER',
  'approved'
),
(
  'Peruvanam Kuttan Marar',
  'Peruvanam Kuttan Marar (പാണ്ടിമേള കുലപതി)',
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80',
  'Padma Shri recipient and legendary Pramani (chief conductor) of the world-famous Ilanjithara Melam at Thrissur Pooram for over 24 consecutive years.',
  'തൃശ്ശൂർ പൂരം ഇലഞ്ഞിത്തറ മേളത്തിന്റെ പ്രമാണി. പത്മശ്രീ പുരസ്കാര ജേതാവ്.',
  'Conducts 250 master percussionists through the complex mathematics of Pandi Melam, ranging from the slow rhythmic Pathikaalam to the crescendo of Tripuda.',
  'Chenda Pandi Melam & Thayambaka',
  52,
  'Peruvanam Appu Marar (Father)',
  'Thrissur',
  'Peruvanam Gramam, Cherpu, Thrissur 680561',
  '+91 94472 88120',
  '+91 94472 88120',
  true,
  'VERIFIED_MASTER',
  'approved'
),
(
  'K. V. Ramanathan Achari',
  'Master Weaver Ramanathan',
  'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=400&q=80',
  'Generational pit-loom master weaver in the Kuthampully GI cluster. Weaves pure gold Kasavu sarees with authentic Devanga jacquard borders.',
  'കുത്തമ്പുള്ളി പാരമ്പര്യ കൈത്തറി മാസ്റ്റർ വീവർ. കസവ് സാരികളുടെ നിർമ്മാതാവ്.',
  'Hand-weaving on traditional wooden pit-looms using 100% combed unbleached cotton and BIS Hallmark silver-gold zari threads.',
  'Kuthampully Kasavu Handloom',
  40,
  'Kuthampully Devanga Handloom Lineage',
  'Thalapilly',
  'Weavers Colony, Kuthampully, Thiruvilwamala 680588',
  '+91 98950 44321',
  '+91 98950 44321',
  true,
  'HERITAGE_GUILD',
  'approved'
)
ON CONFLICT DO NOTHING;

-- 4. SEED SAMPLE CULTURAL LISTINGS
INSERT INTO public.cultural_listings (
  slug, title_en, title_ml, taluk, address, latitude, longitude,
  description_en, description_ml, cultural_significance_en, cultural_significance_ml,
  historical_context_en, historical_context_ml, image_url, timing_schedule,
  contributor_name, contributor_role, primary_source, verified_by, last_verified_date,
  status
) VALUES
(
  'vadakkunnathan-temple',
  'Vadakkunnathan Temple & Ancient Murals',
  'ശ്രീ വടക്കുന്നാഥൻ ക്ഷേത്രവും ചുവർചിത്രങ്ങളും',
  'Thrissur',
  'Swaraj Round, Thekkinkadu Maidan, Thrissur 680001',
  10.5244,
  76.2144,
  'A monumental sanctuary of classical Kerala indigenous wooden architecture atop a 9-acre hillock inside Swaraj Round. Winner of the UNESCO Asia-Pacific Award for Cultural Heritage Conservation.',
  'തേക്കിൻകാട് മൈതാനത്തിന് നടുവിൽ ഒൻപതേക്കറിൽ പരന്നുകിടക്കുന്ന സഹസ്രാബ്ദങ്ങളുടെ പഴക്കമുള്ള ക്ഷേത്ര സമുച്ചയം.',
  'Vadakkunnathan is the spiritual and cultural fulcrum around which Thrissur was conceived. Hosts the Ilanjithara Melam and Kudamattam during Thrissur Pooram.',
  'തൃശ്ശൂർ നഗരത്തിന്റെ കേന്ദ്രബിന്ദുവായ വടക്കുന്നാഥൻ ഇലഞ്ഞിത്തറ മേളത്തിനും കുടമാറ്റത്തിനും വേദിയാകുന്നു.',
  'Structural portions date from the 8th to 12th centuries CE under Chera patronages, with expansions under Maharaja Sakthan Thampuran.',
  'എട്ടാം നൂറ്റാണ്ടിലെ ചേര സാമ്രാജ്യത്തിന്റെ കാലഘട്ടം മുതൽ നിലനിൽക്കുന്നതെന്ന് പുരാവസ്തു രേഖകൾ സ്ഥിരീകരിക്കുന്നു.',
  'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=80',
  'Daily 4:00 AM – 11:00 AM, 5:00 PM – 8:30 PM',
  'Dr. K. Rajendran',
  'Heritage Architect & Epigraphist',
  'Archaeological Survey of India (ASI) & Cochin Devaswom Board Documentation',
  'Kerala State Council for Historical Heritage',
  'October 2025',
  'approved'
)
ON CONFLICT (slug) DO NOTHING;

