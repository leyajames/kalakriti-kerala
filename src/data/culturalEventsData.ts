import { CulturalEvent } from '../types';

export const CULTURAL_EVENTS_MASTER_DATA: CulturalEvent[] = [
  // ========================================================
  // 1. UPCOMING CONFIRMED EVENTS
  // ========================================================
  {
    id: 'event-thrissur-pooram-2027',
    slug: 'thrissur-pooram-2027',
    titleEn: 'Thrissur Pooram 2027 – The Mother of All Festivals',
    titleMl: 'തൃശ്ശൂർ പൂരം 2027 – പൂരങ്ങളുടെ പൂരം',
    descriptionEn: 'The world\'s most breathtaking visual and acoustic cultural spectacle. Featuring 30 majestic caparisoned tuskers, the world-famous Kudamattam parasol exchange, and the thunderous Ilanjithara Melam with 250 percussion masters in the Vadakkunnathan courtyard.',
    descriptionMl: 'ലോകപ്രസിദ്ധമായ സാംസ്കാരിക ഉത്സവം. മുപ്പത് ഗജവീരന്മാരുടെ കുടമാറ്റം, ഇലഞ്ഞിത്തറയിലെ ഇരുന്നൂറ്റമ്പതോളം മേളപ്രമാണിമാരുടെ പാണ്ടിമേളം, പുലർച്ചെയുള്ള വിസ്മയ വെടിക്കെട്ട്.',
    artformName: 'Pooram, Pandi Melam & Panchavadyam',
    culturalCategory: 'TEMPLE_FESTIVAL',
    categoryLabelEn: 'Temple Festival & Melam',
    categoryLabelMl: 'ക്ഷേത്രോത്സവം & മേളം',
    venueName: 'Thekkinkadu Maidan & Vadakkunnathan Sacred Enclosure',
    locationName: 'Swaraj Round, Thrissur Central',
    taluk: 'Thrissur',
    location: { lat: 10.5244, lng: 76.2144 },
    dateRange: 'Medam 14, 1202 ME (May 08, 2027)',
    dateISO: '2027-05-08',
    time: '06:00 AM – Next Morning 08:00 AM',
    malayalamDate: '1202 മേടം 14 • പൂരം നക്ഷത്രം',
    isFreeEntry: true,
    entryFeeDetails: 'Free Public Heritage Festival (Designated enclosures for visitors)',
    bannerUrl: '/assets/images/thrissur-pooram-kudamattam.jpg',
    gallery: [
      '/assets/images/thrissur-pooram-kudamattam.jpg',
      '/assets/images/ilanjithara-melam.jpg',
      '/assets/images/chenda-melam.jpg'
    ],
    organizer: {
      name: 'Cochin Devaswom Board & Combined Pooram Committees (Paramekkavu & Thiruvambady)',
      role: 'Apex Heritage Devaswom Authority',
      contact: '+91 487 2331124',
      email: 'thrissurpooram@cochindevaswomboard.org',
      isVerified: true
    },
    registrationUrl: 'https://cochindevaswomboard.org/thrissur-pooram',
    status: 'UPCOMING',
    isConfirmed: true,
    confirmationNote: 'Official dates confirmed by Cochin Devaswom Board astronomical almanac.',
    schedule: [
      {
        time: '07:30 AM',
        eventEn: 'Kanimangalam Sastha Ezhunnallippu Entry',
        eventMl: 'കണിമംഗലം ശാസ്താവിന്റെ ആദ്യ വരവ്',
        location: 'Southern Tower Gate (Thekke Gopuram)',
        leadMaster: 'First participating deity entering the holy sanctuary'
      },
      {
        time: '11:30 AM',
        eventEn: 'Madathil Varavu – Historic Panchavadyam',
        eventMl: 'മഠത്തിൽ വരവ് പഞ്ചവാദ്യം',
        location: 'Brahmaswom Madhom to Swaraj Round',
        leadMaster: 'Led by 45 master Thimila, Maddalam & Idakka masters'
      },
      {
        time: '02:00 PM',
        eventEn: 'The Ilanjithara Melam (Pandi Melam Peak)',
        eventMl: 'ഇലഞ്ഞിത്തറ പാണ്ടിമേളം',
        location: 'Under the Sacred Ilanji Tree, Vadakkunnathan Courtyard',
        leadMaster: 'Led by Padma Shri Peruvanam Kuttan Marar with 250 chenda masters'
      },
      {
        time: '05:30 PM',
        eventEn: 'The Grand Kudamattam (Royal Parasol Contest)',
        eventMl: 'വർണ്ണശബളമായ കുടമാറ്റം',
        location: 'Between Paramekkavu and Thiruvambady Alignments',
        leadMaster: 'Paramekkavu & Thiruvambady Devaswoms'
      },
      {
        time: '03:00 AM',
        eventEn: 'Grand Thrissur Pooram Fireworks (Vedikkettu)',
        eventMl: 'പ്രസിദ്ധമായ പുലർച്ചെ വെടിക്കെട്ട്',
        location: 'Thekkinkadu Firework Maidan',
        leadMaster: 'Govt. PESO Certified Traditional Pyrotechnic Masters'
      }
    ],
    advisory: 'Millions of visitors participate. Use designated public transport transit hubs; footwear strictly prohibited inside inner temple prakarams.'
  },
  {
    id: 'event-kalamandalam-koodiyattam-2026',
    slug: 'kalamandalam-koodiyattam-mahotsavam-2026',
    titleEn: 'Kalamandalam Koodiyattam & Kathakali Mahotsavam',
    titleMl: 'കലാമണ്ഡലം കൂടിയാട്ടം & കഥകളി മഹോത്സവം',
    descriptionEn: 'A 5-day celebration of UNESCO-inscribed Sanskrit theatrical heritage on the banks of River Nila. Master practitioners enact classical Sanskrit plays in the authentic acoustic wooden Koothambalam according to strict Natyashastra traditions.',
    descriptionMl: 'ഭാരതപ്പുഴയുടെ തീരത്ത് യുനെസ്കോ അംഗീകൃത കൂടിയാട്ടവും കഥകളിയും അരങ്ങേറുന്ന പഞ്ചദിന സാംസ്കാരിക ഉത്സവം. പുരാതന കൂത്തമ്പലത്തിൽ പാരമ്പര്യ ചിട്ടകളോടെ നടക്കുന്ന പ്രകടനങ്ങൾ.',
    artformName: 'Koodiyattam, Kathakali & Mohiniyattam',
    culturalCategory: 'PERFORMING_ARTS',
    categoryLabelEn: 'Classical Performing Arts',
    categoryLabelMl: 'ശാ physical ശാസ്ത്രീയ രംഗകലകൾ',
    venueName: 'Koothambalam & Nila Campus Auditorium',
    locationName: 'Kerala Kalamandalam, Cheruthuruthy',
    taluk: 'Thalapilly',
    location: { lat: 10.7483, lng: 76.2798 },
    dateRange: 'December 12 – 16, 2026',
    dateISO: '2026-12-12',
    time: '05:30 PM – 10:30 PM Daily',
    malayalamDate: '1202 വൃശ്ചികം 27 – ധനു 02',
    isFreeEntry: true,
    entryFeeDetails: 'Free admission for arts enthusiasts; prior online seat reservation recommended.',
    bannerUrl: '/assets/images/koodiyattam-theatre.jpg',
    gallery: [
      '/assets/images/koodiyattam-theatre.jpg',
      '/assets/images/kalamandalam-koothambalam.jpg'
    ],
    organizer: {
      name: 'Kerala Kalamandalam Deemed University for Art and Culture',
      role: 'National Arts Academy',
      contact: '+91 4884 262318',
      email: 'academic@kalamandalam.ac.in',
      isVerified: true
    },
    registrationUrl: 'https://kalamandalam.ac.in/events',
    status: 'UPCOMING',
    isConfirmed: true,
    confirmationNote: 'Confirmed academic calendar event sanctioned by Kalamandalam Syndicate.',
    schedule: [
      {
        time: '05:30 PM',
        eventEn: 'Kalyanasougandhikam Kathakali (Guru Gopi style)',
        eventMl: 'കല്യാണസൗഗന്ധികം കഥകളി',
        location: 'Koothambalam Main Stage',
        leadMaster: 'Senior Faculty & Kalamandalam Ensemble'
      },
      {
        time: '08:00 PM',
        eventEn: 'Subhadradhananjayam Koodiyattam',
        eventMl: 'സുഭദ്രാധനഞ്ജയം കൂടിയാട്ടം',
        location: 'Koothambalam Sacred Diya Center',
        leadMaster: 'Kalamandalam Sivan Namboodiri disciples'
      }
    ],
    advisory: 'Silence strictly enforced during Natyashastra recitals. Photography without flash permitted with accreditation pass.'
  },
  {
    id: 'event-kuthampully-handloom-fair-2026',
    slug: 'kuthampully-nila-kasavu-fair-2026',
    titleEn: 'Kuthampully Handloom Expo & Kasavu Weavers Fair',
    titleMl: 'കുത്തമ്പുള്ളി പാരമ്പര്യ കൈത്തറി മേള 2026',
    descriptionEn: 'An authentic master-weaver fair bringing over 60 traditional pit-loom weaving families from the Kuthampully GI cluster. Live jacquard loom demonstrations, direct artisan sales of Kasavu sarees, and heritage spinning workshops.',
    descriptionMl: 'ഭൗമസൂചികാ പദവി നേടിയ കുത്തമ്പുള്ളിയിലെ പരമ്പരാഗത നെയ്ത്തുകാരുടെ വിപണന മേളയും ലൈവ് തറി പ്രദർശനങ്ങളും.',
    artformName: 'Kasavu Handloom Weaving & Jacquard Art',
    culturalCategory: 'CRAFT_EXHIBITION',
    categoryLabelEn: 'Craft Exhibition & Fair',
    categoryLabelMl: 'കരകൗശല പ്രദർശനം',
    venueName: 'Kuthampully Handloom Cooperative Exhibition Grounds',
    locationName: 'Thiruvilwamala, Thrissur',
    taluk: 'Thalapilly',
    location: { lat: 10.7412, lng: 76.4385 },
    dateRange: 'November 20 – 26, 2026',
    dateISO: '2026-11-20',
    time: '10:00 AM – 08:30 PM',
    malayalamDate: '1202 വൃശ്ചികം 05 – 11',
    isFreeEntry: true,
    entryFeeDetails: 'Free Public Entry. Direct weaver purchase pricing with GI certification guarantee.',
    bannerUrl: '/assets/images/kuthampully-handloom-loom.jpg',
    gallery: [
      '/assets/images/kuthampully-handloom-loom.jpg',
      '/assets/images/kuthampully-handloom-loom-2.jpg'
    ],
    organizer: {
      name: 'Kuthampully Handloom Weavers Industrial Cooperative Society Ltd.',
      role: 'GI Registered Guild',
      contact: '+91 4884 282422',
      email: 'weavers@kuthampullyhandloom.org',
      isVerified: true
    },
    registrationUrl: 'https://kuthampullyhandloom.org/expo',
    status: 'UPCOMING',
    isConfirmed: true,
    confirmationNote: 'Confirmed annual pre-festival handloom exposition certified by Directorate of Handlooms.',
    schedule: [
      {
        time: '11:00 AM',
        eventEn: 'Live Jacquard Pit-Loom Weaving Demonstration',
        eventMl: 'പരമ്പരാഗത ജാക്കാർഡ് തറി നെയ്ത്ത് ഡെമോ',
        location: 'Pavilion 1 - Heritage Workshop'
      },
      {
        time: '03:00 PM',
        eventEn: 'Natural Gold Zari Testing & Verification Clinic',
        eventMl: 'കസവ് പരിശുദ്ധി പരിശോധനാ ക്ലിനിക്ക്',
        location: 'Quality Testing Kiosk'
      }
    ],
    advisory: 'Cash, UPI, and debit cards accepted. Genuine GI tag holographic seals affixed to verified cooperative products.'
  },
  {
    id: 'event-itfok-theatre-fest-2027',
    slug: 'itfok-international-theatre-festival-2027',
    titleEn: 'International Theatre Festival of Kerala (ITFoK 2027)',
    titleMl: 'അന്താരാഷ്ട്ര നാടകോത്സവം (ഐടിഫോക്ക് 2027)',
    descriptionEn: 'The flagship theatre festival organized by Kerala Sangeetha Nataka Akademi. Encompassing avant-garde productions from 14 nations alongside classical Kerala folk, Mudiyettu, and contemporary Indian street theatre.',
    descriptionMl: 'കേരള സംഗീത നാടക അക്കാദമിയുടെ നേതൃത്വത്തിൽ ലോകോത്തര നാടകങ്ങൾ അരങ്ങേറുന്ന അന്താരാഷ്ട്ര തിയേറ്റർ ഫെസ്റ്റിവൽ.',
    artformName: 'Contemporary & Experimental Theatre, Folk Drama',
    culturalCategory: 'PERFORMING_ARTS',
    categoryLabelEn: 'Theatre & Performance',
    categoryLabelMl: 'നാടകം & രംഗകല',
    venueName: 'K.T. Muhammed Regional Theatre & Natyagruham',
    locationName: 'Chembukkavu, Thrissur City',
    taluk: 'Thrissur',
    location: { lat: 10.5312, lng: 76.2215 },
    dateRange: 'February 05 – 12, 2027',
    dateISO: '2027-02-05',
    time: '03:00 PM – 11:00 PM Daily',
    malayalamDate: '1202 മകരം 22 – 29',
    isFreeEntry: false,
    entryFeeDetails: '₹50 – ₹150 Delegate Passes; Student concessions available.',
    bannerUrl: '/assets/images/sangeetha-nataka-akademi.jpg',
    organizer: {
      name: 'Kerala Sangeetha Nataka Akademi & Department of Cultural Affairs',
      role: 'Apex State Performing Arts Akademi',
      contact: '+91 487 2332555',
      email: 'info@keralasangeethanatakaakademi.in',
      isVerified: true
    },
    registrationUrl: 'https://theatrefestivalkerala.com',
    status: 'UPCOMING',
    isConfirmed: true,
    confirmationNote: 'Official festival dates sanctioned by Kerala Department of Cultural Affairs.',
    schedule: [
      {
        time: '04:00 PM',
        eventEn: 'Opening Inaugural Performance: Nila Bodhi Ensemble',
        eventMl: 'ഉദ്ഘാടന നാടകം',
        location: 'Regional Theatre Main Stage'
      },
      {
        time: '07:30 PM',
        eventEn: 'Open Air Street Theatre: Sacred Trees of Malabar',
        eventMl: 'തെരുവ് നാടകം',
        location: 'Akademi Courtyard Stage'
      }
    ],
    advisory: 'Gates close 10 minutes prior to every show. Latecomers not admitted.'
  },

  // ========================================================
  // 2. PAST ARCHIVE EVENTS (COMPLETED FESTIVALS WITH RECORDS)
  // ========================================================
  {
    id: 'event-pulikali-carnival-2025',
    slug: 'pulikali-carnival-2025-archive',
    titleEn: 'Thrissur Onam Pulikali Carnival 2025 (Archival Record)',
    titleMl: 'തൃശ്ശൂർ പുലിക്കളി ഉത്സവം 2025 (ചരിത്ര രേഖ)',
    descriptionEn: 'The historic tiger folk dance festival held on the 4th Onam day. Featuring 800 painted dancers from 7 Desams circling Swaraj Round with towering cultural tableaux and thunderous Chenda rhythms.',
    descriptionMl: 'ഓണത്തിന്റെ നാലാം നാളിൽ തൃശ്ശൂർ സ്വരാജ് റൗണ്ടിൽ അരങ്ങേറിയ ചരിത്രപ്രസിദ്ധമായ പുലിക്കളി. 7 ദേശങ്ങളിൽ നിന്നായി 800-ലധികം പുലിവേഷധാരികൾ പങ്കെടുത്തു.',
    artformName: 'Pulikali Folk Performance & Chenda Rhythms',
    culturalCategory: 'COMMUNITY_CELEBRATION',
    categoryLabelEn: 'Folk Heritage Carnival',
    categoryLabelMl: 'നാടോടി സാംസ്കാരികോത്സവം',
    venueName: 'Swaraj Round Ring Road & Naduvilal Junction',
    locationName: 'Swaraj Round, Thrissur',
    taluk: 'Thrissur',
    location: { lat: 10.5255, lng: 76.2135 },
    dateRange: 'September 18, 2025 (Completed)',
    dateISO: '2025-09-18',
    time: '04:00 PM – 09:30 PM',
    malayalamDate: '1201 ചിങ്ങം 32 • നാലാം ഓണം',
    isFreeEntry: true,
    entryFeeDetails: 'Public Community Celebration',
    bannerUrl: '/assets/images/pulikali-carnival.jpg',
    gallery: [
      '/assets/images/sangeetha-nataka-akademi.jpg',
      '/assets/images/kadavallur-temple-gopuram.jpg'
    ],
    organizer: {
      name: 'Thrissur Municipal Corporation & Pulikali Coordination Committee',
      role: 'Civic Cultural Committee',
      contact: '+91 487 2420000',
      isVerified: true
    },
    registrationUrl: 'https://keralatourism.org/pulikali',
    status: 'PAST',
    isConfirmed: true,
    confirmationNote: 'Concluded historical event. Archival record preserved on KALAKRITI.',
    schedule: [
      {
        time: '04:00 PM',
        eventEn: 'Desam Tigers Flag-off at Naduvilal',
        eventMl: 'നടുവിലാലിൽ നിന്നുള്ള പുലി സംഘങ്ങളുടെ പ്രവേശനം',
        location: 'Naduvilal & Swaraj Round'
      },
      {
        time: '08:30 PM',
        eventEn: 'Best Pulikali Team & Float Award Ceremony',
        eventMl: 'മികച്ച പുലിക്കളി സംഘത്തിനുള്ള പുരസ്കാരം',
        location: 'Corporation Pavillion'
      }
    ]
  },
  {
    id: 'event-triprayar-ekadasi-2025',
    slug: 'triprayar-ekadasi-panchari-melam-2025',
    titleEn: 'Triprayar Ekadasi & Grand Gajarajan Procession 2025',
    titleMl: 'തൃപ്രയാർ ഏകാദശിയും പഞ്ചാരിമേളവും 2025',
    descriptionEn: 'The sacred Vrischikam Ekadasi celebration at the ancient Sri Rama Temple on the banks of River Theevra. Featured an acclaimed 4-hour Panchari Melam led by 150 percussionists and ceremonial boat rites.',
    descriptionMl: 'തൃപ്രയാർ ശ്രീരാമസ്വാമി ക്ഷേത്രത്തിലെ ചരിത്രപ്രസിദ്ധമായ ഏകാദശി വിളക്കും പഞ്ചാരിമേളവും.',
    artformName: 'Panchari Melam & Temple Rituals',
    culturalCategory: 'TEMPLE_FESTIVAL',
    categoryLabelEn: 'Temple Festival',
    categoryLabelMl: 'ക്ഷേത്രോത്സവം',
    venueName: 'Sri Rama Temple Courtyard',
    locationName: 'Triprayar, Thrissur',
    taluk: 'Mukundapuram',
    location: { lat: 10.4215, lng: 76.1158 },
    dateRange: 'December 01, 2025 (Completed)',
    dateISO: '2025-12-01',
    time: '06:00 AM – 11:30 PM',
    malayalamDate: '1201 വൃശ്ചികം 15 • ഏകാദശി',
    isFreeEntry: true,
    bannerUrl: '/assets/images/arattupuzha-pooram.jpg',
    organizer: {
      name: 'Cochin Devaswom Board & Triprayar Advisory Committee',
      role: 'Devaswom Authority',
      isVerified: true
    },
    status: 'PAST',
    isConfirmed: true,
    confirmationNote: 'Concluded annual observance. Archival documentation preserved.',
    schedule: []
  },

  // ========================================================
  // 3. UNCONFIRMED / TENTATIVE EVENTS (AWAITING DEVASWOM DATES)
  // ========================================================
  {
    id: 'event-chembai-sangeetholsavam-tentative',
    slug: 'chembai-sangeetholsavam-guruvayur-tentative',
    titleEn: 'Chembai Sangeetholsavam 2026 (Dates Tentative)',
    titleMl: 'ചെമ്പൈ സംഗീതോത്സവം 2026 (സ്ഥിരീകരിക്കാത്ത തീയതി)',
    descriptionEn: 'The revered 15-day Carnatic music festival dedicated to Saint-Musician Chembai Vaidyanatha Bhagavathar. Over 2,000 vocalists and instrumentalists perform non-stop at the Melpathur Auditorium in Guruvayur.',
    descriptionMl: 'ഗുരുവായൂർ മേൽപ്പത്തൂർ ഓഡിറ്റോറിയത്തിൽ നടക്കുന്ന ചെമ്പൈ സംഗീതോത്സവം. ഔദ്യോഗിക ഷെഡ്യൂൾ ദേവസ്വം പ്രഖ്യാപിക്കാനിരിക്കുന്നു.',
    artformName: 'Carnatic Classical Vocal & Instrumental',
    culturalCategory: 'PERFORMING_ARTS',
    categoryLabelEn: 'Carnatic Classical Music',
    categoryLabelMl: 'കർണ്ണാടക സംഗീതോത്സവം',
    venueName: 'Melpathur Auditorium, Guruvayur Temple Precinct',
    locationName: 'Guruvayur Town',
    taluk: 'Chavakkad',
    location: { lat: 10.5946, lng: 76.0384 },
    dateRange: 'Late November / Early December 2026 (Tentative)',
    dateISO: '2026-11-28',
    time: '06:00 AM – 11:00 PM Daily',
    malayalamDate: '1202 വൃശ്ചികം (ഏകാദശിക്ക് മുന്നോടിയായി)',
    isFreeEntry: true,
    entryFeeDetails: 'Free admission for devotees and classical music rasikas.',
    bannerUrl: '/assets/images/carnatic-vocal-concert.jpg',
    organizer: {
      name: 'Guruvayur Devaswom Managing Committee',
      role: 'Temple Managing Board',
      contact: '+91 487 2556335',
      email: 'devaswom.guruvayur@gmail.com',
      isVerified: true
    },
    registrationUrl: 'https://guruvayurdevaswom.in',
    status: 'UNCONFIRMED',
    isConfirmed: false,
    confirmationNote: 'NOTICE: Dates are tentative and awaiting formal calendar ratification by the Guruvayur Devaswom Managing Committee. Do not finalize travel or lodging bookings based on these preliminary dates.',
    schedule: [
      {
        time: '06:00 AM',
        eventEn: 'Pancharatna Kritis Choral Rendition',
        eventMl: 'പഞ്ചരത്ന കീർത്തനാലാപനം',
        location: 'Melpathur Main Mandapam'
      }
    ],
    advisory: 'Dates unconfirmed. Artists must register through Guruvayur Devaswom official portal once calendar is published.'
  },
  {
    id: 'event-koodalmanikyam-utsavam-tentative',
    slug: 'koodalmanikyam-utsavam-tentative',
    titleEn: 'Koodalmanikyam Temple Thiru-Utsavam (Awaiting Official Dates)',
    titleMl: 'കൂടൽമാണിക്യം തിരു-ഉത്സവം (തീരുമാനമായിട്ടില്ല)',
    descriptionEn: 'The monumental 10-day annual temple festival of Sri Sangameshwara at Irinjalakuda. Celebrated for pristine Kathakali all-night plays, Sheevali with 17 tuskers, and pristine Panchari Melam.',
    descriptionMl: 'ഇരിഞ്ഞാലക്കുട കൂടൽമാണിക്യം ക്ഷേത്രത്തിലെ തിരു-ഉത്സവം. ഔദ്യോഗിക തിയ്യതികൾ തീരുമാനമായിട്ടില്ല.',
    artformName: 'Kathakali, Panchari Melam & Temple Heritage',
    culturalCategory: 'TEMPLE_FESTIVAL',
    categoryLabelEn: 'Temple Festival',
    categoryLabelMl: 'ക്ഷേത്രോത്സവം',
    venueName: 'Sri Koodalmanikyam Temple Sanctuary',
    locationName: 'Irinjalakuda, Thrissur',
    taluk: 'Mukundapuram',
    location: { lat: 10.3541, lng: 76.2085 },
    dateRange: 'April / May 2027 (Expected Medam - Dates Tentative)',
    dateISO: '2027-04-25',
    time: 'Morning 05:00 AM – Midnight',
    malayalamDate: '1202 മേട മാസം (ഉത്രം കൊടിയേറ്റ് പ്രതീക്ഷിതം)',
    isFreeEntry: true,
    bannerUrl: '/assets/images/koodalmanikyam-temple.jpg',
    organizer: {
      name: 'Koodalmanikyam Devaswom Managing Committee',
      role: 'Statutory Devaswom Board',
      contact: '+91 480 2826631',
      isVerified: true
    },
    registrationUrl: 'https://koodalmanikyam.com',
    status: 'UNCONFIRMED',
    isConfirmed: false,
    confirmationNote: 'NOTICE: Annual festival dates are unconfirmed pending official Kodiyettam announcement by Thantri and Koodalmanikyam Devaswom administrator.',
    schedule: []
  },
  {
    id: 'event-chavittu-nadakam-revival',
    slug: 'kunnamkulam-chavittu-nadakam-revival-tentative',
    titleEn: 'Kunnamkulam Classical Chavittu Nadakam Revival Night',
    titleMl: 'കുന്നംകുളം ചവിട്ടുനാടക സംഗമം (അപേക്ഷാ ഘട്ടത്തിൽ)',
    descriptionEn: 'A proposed revival night honoring the vibrant Greco-Roman and Portuguese influenced martial theatre art of Kerala Latin Christian heritage, featuring stomping footwork, colorful velvet doublets, and operatic dialogue.',
    descriptionMl: 'പരമ്പരാഗത ചവിട്ടുനാടക കലാരൂപത്തിന്റെ പുനരുജ്ജീവന രാത്രി. അനുമതിക്കും സ്പോൺസർഷിപ്പിനുമായി സമർപ്പിക്കപ്പെട്ടിരിക്കുന്നു.',
    artformName: 'Chavittu Nadakam Christian Martial Theatre',
    culturalCategory: 'PERFORMING_ARTS',
    categoryLabelEn: 'Folk Theatre Revival',
    categoryLabelMl: 'നാടക സംഗമം',
    venueName: 'St. Thomas Community Cultural Ground',
    locationName: 'Kunnamkulam, Thalapilly',
    taluk: 'Thalapilly',
    location: { lat: 10.6483, lng: 76.0712 },
    dateRange: 'January 2027 (Community Proposal)',
    dateISO: '2027-01-20',
    time: '06:30 PM – 10:30 PM',
    malayalamDate: '1202 മകരം (ഉദ്ദേശിക്കുന്നത്)',
    isFreeEntry: true,
    bannerUrl: '/assets/images/kadavallur-temple-gopuram.jpg',
    organizer: {
      name: 'Kunnamkulam Heritage Guild & Folk Performers Collective',
      role: 'Community Cultural Guild',
      contact: '+91 94471 88990',
      isVerified: false
    },
    status: 'UNCONFIRMED',
    isConfirmed: false,
    confirmationNote: 'NOTICE: Community contributor proposal currently under review by municipal authorities and arts patrons. Final venue permission pending.',
    schedule: []
  }
];

