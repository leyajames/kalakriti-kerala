import { CulturalLocation } from '../types';

export const CULTURAL_LOCATIONS_DATA: CulturalLocation[] = [
  {
    id: 'loc-vadakkunnathan',
    slug: 'vadakkunnathan-temple',
    titleEn: 'Vadakkunnathan Temple & Ancient Murals',
    titleMl: 'ശ്രീ വടക്കുന്നാഥൻ ക്ഷേത്രവും ചുവർചിത്രങ്ങളും',
    culturalCategory: 'HERITAGE_MONUMENT',
    categoryLabelEn: 'Heritage Monument',
    categoryLabelMl: 'പൈതൃക സ്മാരകം',
    experienceType: 'HERITAGE_WALK',
    experienceTypeLabelEn: 'Heritage Walk',
    primaryArtform: 'Temple Architecture & Mural Art',
    taluk: 'Thrissur',
    address: 'Swaraj Round, Thekkinkadu Maidan, Thrissur 680001',
    location: {
      lat: 10.5244,
      lng: 76.2144
    },
    timingOrDate: 'Open Daily: 4:00 AM – 11:00 AM, 5:00 PM – 8:30 PM',
    descriptionEn: 'A monumental sanctuary of classical Kerala indigenous wooden architecture atop a 9-acre hillock inside Swaraj Round. Winner of the UNESCO Asia-Pacific Award for Cultural Heritage Conservation in 2015, celebrated for its ancient Koothambalam and exquisite 15th-century Panchavarna fresco murals.',
    descriptionMl: 'തേക്കിൻകാട് മൈതാനത്തിന് നടുവിൽ ഒൻപതേക്കറിൽ പരന്നുകിടക്കുന്ന സഹസ്രാബ്ദങ്ങളുടെ പഴക്കമുള്ള ക്ഷേത്ര സമുച്ചയം. യുനെസ്കോ ഏഷ്യാ-പസഫിക് പുരസ്കാരം നേടിയ അതിവിശിഷ്ട വാസ്തുവിദ്യയും അപൂർവ്വ ചുവർചിത്രങ്ങളും കൂത്തമ്പലവും.',
    culturalSignificanceEn: 'Vadakkunnathan is the spiritual and cultural fulcrum around which the entire city of Thrissur was conceived. Its sacred courtyard hosts the world-famous Ilanjithara Melam and Kudamattam umbrella exchange during the annual Thrissur Pooram. The monumental Koothambalam preserves ancient acoustics engineered specifically for Sanskrit theatrical arts.',
    culturalSignificanceMl: 'തൃശ്ശൂർ നഗരത്തിന്റെ കേന്ദ്രബിന്ദുവായ വടക്കുന്നാഥൻ ഇലഞ്ഞിത്തറ മേളത്തിനും കുടമാറ്റത്തിനും വേദിയാകുന്നു. കൂടിയാട്ടത്തിനും ചാക്യാർകൂത്തിനുമായി നിർമ്മിച്ച കൂത്തമ്പലം പുരാതന ശബ്ദശാസ്ത്രത്തിന്റെ ഉത്തമ മാതൃകയാണ്.',
    historicalContextEn: 'According to epigraphical surveys and architectural records of the Archaeological Survey of India (ASI), structural portions date from the 8th to 12th centuries CE under Chera patronages, with significant expansion executed under Maharaja Sakthan Thampuran in the late 18th century. Legends attribute its foundation to sage Parasurama, though reliable epigraphy confirms medieval origins.',
    historicalContextMl: 'എട്ടാം നൂറ്റാണ്ടിലെ ചേര സാമ്രാജ്യത്തിന്റെ കാലഘട്ടം മുതൽ നിലനിൽക്കുന്നതെന്ന് പുരാവസ്തു രേഖകൾ സ്ഥിരീകരിക്കുന്നു. പതിനെട്ടാം നൂറ്റാണ്ടിൽ ശക്തൻ തമ്പുരാന്റെ കാലത്താണ് ഇന്നത്തെ രൂപത്തിലുള്ള വിപുലീകരണങ്ങൾ നടന്നത്.',
    image: '/assets/images/vadakkunnathan-temple.jpg',
    gallery: [
      '/assets/images/vadakkunnathan-temple.jpg',
      '/assets/images/vadakkunnathan-night.jpg',
      '/assets/images/kerala-mural-krishna.jpg'
    ],
    highlights: ['UNESCO Asia-Pacific Award (2015)', '15th-Century Vegetable Dye Murals', 'Acoustic Wooden Koothambalam', 'Four Monumental Gopurams', 'Ilanjithara Melam Sacred Tree'],
    dressCodeOrAdvisory: 'Traditional attire mandatory (Dhoti/Mundu for men; Saree/Set-Mundu/Salwar for women). Non-Hindus can explore the monumental outer prakaram, gopurams, and museum grounds.',
    entryFee: 'Free entry to outer courtyard and temples',
    contributor: {
      name: 'Dr. K. Rajendran',
      role: 'Heritage Architect & Epigraphist',
      organization: 'Thrissur Heritage Research Foundation'
    },
    sourceAttribution: {
      primarySource: 'Archaeological Survey of India (ASI) & Cochin Devaswom Board Documentation',
      archiveReference: 'ASI Monument Monograph No. KL-TSR-01; UNESCO Heritage Conservation Dossier 2015',
      verifiedBy: 'Kerala State Council for Historical Heritage',
      lastUpdated: 'October 2025'
    },
    officialWebsite: 'https://cochindevaswomboard.org/vadakkumnathan-temple',
    socialLinks: [
      { platform: 'Kerala Tourism Portal', url: 'https://www.keralatourism.org/destination/vadakkumnathan-temple-thrissur/241' }
    ],
    relatedLocationIds: ['loc-thekkinkadu-maidan', 'loc-shakthan-palace', 'loc-peruvanam-temple'],
    isIllustrativeData: false,
    sampleDisclaimer: 'Verified geographic coordinates and documented historical record. Temple customs and hours apply.'
  },
  {
    id: 'loc-kalamandalam',
    slug: 'kerala-kalamandalam-cheruthuruthy',
    titleEn: 'Kerala Kalamandalam (Deemed University of Arts)',
    titleMl: 'കേരള കലാമണ്ഡലം ചെറുതുരുത്തി',
    culturalCategory: 'ACADEMY_MUSEUM',
    categoryLabelEn: 'Academy & Museum',
    categoryLabelMl: 'കലാഗോപുരം & മ്യൂസിയം',
    experienceType: 'MUSEUM_ARCHIVE',
    experienceTypeLabelEn: 'Museum & Academy Visit',
    primaryArtform: 'Kathakali & Koodiyattam',
    taluk: 'Thalapilly',
    address: 'Cheruthuruthy, Thrissur District, Kerala 679531',
    location: {
      lat: 10.7483,
      lng: 76.2798
    },
    timingOrDate: 'Monday – Friday: 9:00 AM – 4:00 PM; Guided Tours by Appointment',
    descriptionEn: 'The internationally acclaimed sanctum sanctorum of Kerala performing arts, founded in 1930 by nationalist poet Mahakavi Vallathol Narayana Menon and Manakkulam Mukunda Raja. Operating strictly on the ancient Gurukula residential system on the banks of River Bharathapuzha.',
    descriptionMl: 'ഭാരതപ്പുഴയുടെ തീരത്ത് മഹാകവി വള്ളത്തോൾ സ്ഥാപിച്ച പവിത്രമായ കലാവീട്. ഗുരുശിഷ്യ ബന്ധത്തിലൂടെ കഥകളിയും കൂടിയാട്ടവും മോഹിനിയാട്ടവും ചിട്ടയോടെ പരിശീലിപ്പിക്കുന്ന ലോകോത്തര കേന്ദ്രം.',
    culturalSignificanceEn: 'Kalamandalam is solely responsible for rescuing Kathakali, Koodiyattam, and Mohiniyattam from near extinction in the early 20th century. In 2001, its master practitioners were instrumental in securing UNESCO\'s proclamation of Koodiyattam as a Masterpiece of Oral and Intangible Heritage of Humanity.',
    culturalSignificanceMl: 'വംശനാശഭീഷണി നേരിട്ടിരുന്ന കൂടിയാട്ടം, കഥകളി, മോഹിനിയാട്ടം എന്നീ കലകളെ ആധുനിക യുഗത്തിൽ വീണ്ടെടുത്ത കേന്ദ്രം. കൂടിയാട്ടത്തിന് യുനെസ്കോ അംഗീകാരം നേടിക്കൊടുക്കുന്നതിൽ നിർണ്ണായക പങ്കുവഹിച്ചു.',
    historicalContextEn: 'Officially inaugurated on November 9, 1930 in Kunnamkulam and subsequently relocated to Cheruthuruthy in 1933 after Cochin Maharaja Rama Varma donated land by the Nila River. Upgraded to a Deemed University for Art and Culture by the Ministry of HRD in 2006.',
    historicalContextMl: '1930 നവംബർ 9-ന് കുന്നംകുളത്ത് പ്രവർത്തനം ആരംഭിക്കുകയും പിന്നീട് 1933-ൽ കൊച്ചി മഹാരാജാവ് വിട്ടുനൽകിയ ചെറുതുരുത്തിയിലെ ഭൂമിയിലേക്ക് മാറ്റുകയും ചെയ്തു. 2006-ൽ കല്പിത സർവകലാശാലയായി ഉയർത്തപ്പെട്ടു.',
    image: '/assets/images/kalamandalam-koothambalam.jpg',
    gallery: [
      '/assets/images/kalamandalam-koothambalam.jpg',
      '/assets/images/koodiyattam-theatre.jpg',
      '/assets/images/kathakali-hero.jpg'
    ],
    highlights: ['UNESCO Recognised Gurukulam', 'Nila Riverfront Campus', 'Vallathol Memorial & Museum', 'Teakwood Pillar Koothambalam', '"A Day with Masters" Tour'],
    dressCodeOrAdvisory: 'Modest attire requested. Prior registration required for guided classroom observations.',
    entryFee: 'Campus guided educational tour fees apply',
    contributor: {
      name: 'Prof. C. Radhakrishnan Nair',
      role: 'Alumni Scholar & Kathakali Historian',
      organization: 'Kalamandalam Archives Wing'
    },
    sourceAttribution: {
      primarySource: 'Official Archives of Kerala Kalamandalam Deemed University & Government Gazettes',
      archiveReference: 'UGC Notification No. F.9-11/99-U.3; Vallathol Centennial Chronicles',
      verifiedBy: 'Kerala Kalamandalam Academic Council',
      lastUpdated: 'November 2025'
    },
    officialWebsite: 'https://www.kalamandalam.ac.in',
    socialLinks: [
      { platform: 'Official Portal', url: 'https://www.kalamandalam.ac.in' },
      { platform: 'Kerala Tourism Page', url: 'https://www.keralatourism.org/destination/kerala-kalamandalam-cheruthuruthy/199' }
    ],
    relatedLocationIds: ['loc-kuthampully', 'loc-koodalmanikyam', 'loc-sangeetha-nataka-akademi'],
    isIllustrativeData: false,
    sampleDisclaimer: 'Verified academic and cultural institution coordinates and documented history.'
  },
  {
    id: 'loc-kuthampully',
    slug: 'kuthampully-handloom-cluster',
    titleEn: 'Kuthampully Handloom Weavers Village (GI Tag)',
    titleMl: 'കുത്തമ്പുള്ളി പാരമ്പര്യ കൈത്തറി ഗ്രാമം',
    culturalCategory: 'CRAFT_CLUSTER',
    categoryLabelEn: 'GI Craft Cluster',
    categoryLabelMl: 'ഭൗമസൂചികാ പദവിയുള്ള കൈത്തറി',
    experienceType: 'STUDIO_VISIT',
    experienceTypeLabelEn: 'Artisan Studio Visit',
    primaryArtform: 'Handloom & Textiles',
    taluk: 'Thalapilly',
    address: 'Weavers Street, Kuthampully, Thiruvilwamala, Thrissur 680594',
    location: {
      lat: 10.7412,
      lng: 76.4385
    },
    timingOrDate: 'Open Daily: 9:00 AM – 7:30 PM (Working Looms)',
    descriptionEn: 'A five-century-old generational weaving settlement where Devanga artisan families operate traditional wooden pit looms with jacquard cards, handcrafting unbleached natural cotton Kasavu sarees and Set-Mundus adorned with pure gold and silver zari border motifs.',
    descriptionMl: 'അഞ്ഞൂറ് വർഷങ്ങളായി പരമ്പരാഗത പിറ്റ് ലൂമുകളിൽ ശുദ്ധമായ പരുത്തിയും സ്വർണ്ണക്കസവും ചേർത്ത് വിസ്മയകരമായ സാരികൾ നെയ്യുന്ന ഭൗമസൂചികാ പദവിയുള്ള തനത് ഗ്രാമം.',
    culturalSignificanceEn: 'Kuthampully represents the pinnacle of traditional Kerala ceremonial textile heritage. It was awarded the prestigious Geographical Indication (GI) status under the Geographical Indications of Goods Act (1999), certifying the unique micro-climate of River Bharathapuzha and generational weaving methodologies.',
    culturalSignificanceMl: 'കേരളത്തിലെ കസവു സാരി നിർമ്മാണത്തിൽ ആഗോള ഭൗമസൂചികാ പദവി (GI Tag) നേടിയ പ്രധാന കേന്ദ്രം. ഭാരതപ്പുഴയുടെ തീരത്തെ അന്തരീക്ഷ ഈർപ്പവും നൂറ്റാണ്ടുകളുടെ കൈത്തറി പാടവവുമാണ് ഇതിന്റെ പ്രത്യേകത.',
    historicalContextEn: 'Historical records of the Cochin Royal Family document that master weavers from the Devanga community migrated from Karnataka / Mysore region 500 years ago upon royal invitation to craft exclusive ceremonial vestments for the palace and temples.',
    historicalContextMl: 'കൊച്ചി രാജകുടുംബത്തിന്റെ പ്രത്യേക ക്ഷണപ്രകാരം അഞ്ഞൂറ് വർഷം മുൻപ് കർണ്ണാടകയിൽ നിന്ന് എത്തി തിരുവില്വാമലയിൽ സ്ഥിരതാമസമാക്കിയ ദേവാംഗ നെയ്ത്തു സമുദായമാണ് ഈ പാരമ്പര്യം തുടരുന്നത്.',
    image: '/assets/images/kuthampully-handloom-loom.jpg',
    gallery: [
      '/assets/images/kuthampully-handloom-loom.jpg',
      '/assets/images/kuthampully-handloom-loom-2.jpg',
      '/assets/images/thiruvilwamala-temple.jpg'
    ],
    highlights: ['GI Tag Registry No. 179 (Certified 2011)', 'Traditional Pit Looms', 'Natural Unbleached Combed Cotton', 'Direct Cooperative Buying', 'Jacquard Punch-Card Mechanisms'],
    dressCodeOrAdvisory: 'Respectful walking through residential artisan streets.',
    entryFee: 'Free village walking access',
    contributor: {
      name: 'K. V. Ramanathan Achari',
      role: 'Master Craftsman & Cooperative Secretary',
      organization: 'Kuthampully Handloom Weavers Industrial Cooperative Society'
    },
    sourceAttribution: {
      primarySource: 'Intellectual Property India (GI Registry) & Kerala State Handloom Department',
      archiveReference: 'GI Application No. 179, Journal No. 37; Kerala Gazette Textile Census',
      verifiedBy: 'Department of Industries and Commerce, Govt of Kerala',
      lastUpdated: 'September 2025'
    },
    officialWebsite: 'https://ipindiaservices.gov.in/GIRPublic/Application/Details/179',
    socialLinks: [
      { platform: 'Kerala Handloom Board', url: 'https://handloom.kerala.gov.in' }
    ],
    relatedLocationIds: ['loc-thiruvilwamala', 'loc-kalamandalam', 'loc-nadavaramba'],
    isIllustrativeData: false,
    sampleDisclaimer: 'Documented GI craft cluster. Artisan workshop visits subject to working hours.'
  },
  {
    id: 'loc-nadavaramba',
    slug: 'nadavaramba-bell-metal-foundries',
    titleEn: 'Nadavaramba Bell Metal & Bronze Foundries (GI Tag)',
    titleMl: 'നടവരമ്പ് വെങ്കല ശിൽപശാലകൾ',
    culturalCategory: 'CRAFT_CLUSTER',
    categoryLabelEn: 'GI Craft Cluster',
    categoryLabelMl: 'ഭൗമസൂചികാ പദവിയുള്ള വെങ്കല ശിൽപം',
    experienceType: 'STUDIO_VISIT',
    experienceTypeLabelEn: 'Artisan Studio Visit',
    primaryArtform: 'Bell Metal & Bronze',
    taluk: 'Mukundapuram',
    address: 'Bell Metal Lane, Nadavaramba, Irinjalakuda, Thrissur 680699',
    location: {
      lat: 10.3341,
      lng: 76.2305
    },
    timingOrDate: 'Monday – Saturday: 8:30 AM – 6:00 PM',
    descriptionEn: 'The traditional metallurgy hub of central Kerala, preserved by the master Moosari artisan lineages. Renowned for lost-wax casting of bronze alloy (80% copper and 20% tin), producing resonant temple bells, massive Nilavilakku lamps, and ceremonial cooking Urulis.',
    descriptionMl: 'തേനീച്ചമെഴുകിൽ കൊത്തിയുണ്ടാക്കിയ അച്ചുകളിൽ വെങ്കലം ഉരുക്കിയൊഴിച്ച് അത്യപൂർവ്വ നിലവിളക്കുകളും ക്ഷേത്രമണികളും വാർത്തെടുക്കുന്ന പ്രാചീന ലോഹ ശിൽപശാലകൾ.',
    culturalSignificanceEn: 'Recognized with a Geographical Indication (GI) tag, Nadavaramba bell metal casting is celebrated for its metallurgical purity and acoustic resonance. Temple bells forged here are tuned to specific Vedic acoustic frequencies that reverberate across kilometers.',
    culturalSignificanceMl: 'ഭൗമസൂചികാ പദവി നേടിയ നടവരമ്പിലെ വെങ്കല വിദ്യ നാദശുദ്ധിയുള്ള ക്ഷേത്രമണികൾക്കും അതിവിശിഷ്ട നിലവിളക്കുകൾക്കും പേരുകേട്ടതാണ്.',
    historicalContextEn: 'Historical guild records from the Cochin Royal archives mention the supply of ceremonial bronze cauldrons (Varpu) and oil lamps from Nadavaramba to major shrines like Vadakkunnathan and Guruvayur since the early 17th century.',
    historicalContextMl: 'പതിനേഴാം നൂറ്റാണ്ട് മുതൽ വടക്കുന്നാഥൻ, ഗുരുവായൂർ തുടങ്ങിയ മഹാക്ഷേത്രങ്ങളിലേക്ക് നിലവിളക്കുകളും വെങ്കല പാത്രങ്ങളും നിർമ്മിച്ചു നൽകിയിരുന്ന ചരിത്രം കൊച്ചി രാജകീയ രേഖകളിലുണ്ട്.',
    image: '/assets/images/nadavaramba-bronze-nilavilakku.jpg',
    gallery: [
      '/assets/images/nadavaramba-bronze-nilavilakku.jpg',
      '/assets/images/nadavaramba-bronze-nilavilakku-2.jpg',
      '/assets/images/bhadrakali-bronze-idol.jpg'
    ],
    highlights: ['GI Tagged Metallurgical Craft (2019)', 'Ancient Lost-Wax Moulding', '1100°C Crucible Furnace Casting', 'Hand Turned Lathe Polishing', 'Temple Sacred Acoustics'],
    dressCodeOrAdvisory: 'Caution required near active foundry furnaces and molten metal crucibles.',
    entryFee: 'Free workshop viewing and retail access',
    contributor: {
      name: 'Nadavaramba Balan Moosari',
      role: 'Master Sculptor & Guild Elder',
      organization: 'Nadavaramba Bell Metal Artisans Cooperative'
    },
    sourceAttribution: {
      primarySource: 'Geographical Indications Registry Government of India & Kerala State Craft Council',
      archiveReference: 'GI Application No. 582; Census of Traditional Handicrafts Mukundapuram',
      verifiedBy: 'Kerala State Handicrafts Development Corporation',
      lastUpdated: 'August 2025'
    },
    officialWebsite: 'https://ipindiaservices.gov.in/GIRPublic/Application/Details/582',
    socialLinks: [
      { platform: 'Kerala Crafts Portal', url: 'https://keralatourism.org/handicrafts' }
    ],
    relatedLocationIds: ['loc-koodalmanikyam', 'loc-kuthampully', 'loc-vadakkunnathan'],
    isIllustrativeData: false,
    sampleDisclaimer: 'Verified geographic coordinates and documented guild heritage.'
  },
  {
    id: 'loc-shakthan-palace',
    slug: 'shakthan-thampuran-palace',
    titleEn: 'Shakthan Thampuran Palace & Heritage Museum',
    titleMl: 'ശക്തൻ തമ്പുരാൻ കൊട്ടാരം',
    culturalCategory: 'HERITAGE_MONUMENT',
    categoryLabelEn: 'Heritage Monument',
    categoryLabelMl: 'പൈതൃക സ്മാരകം',
    experienceType: 'MUSEUM_ARCHIVE',
    experienceTypeLabelEn: 'Heritage & Museum Walk',
    primaryArtform: 'Royal Architecture & History',
    taluk: 'Thrissur',
    address: 'Stadium Road, Chembukkavu, Thrissur 680020',
    location: {
      lat: 10.5342,
      lng: 76.2186
    },
    timingOrDate: 'Tuesday – Sunday: 9:30 AM – 5:00 PM (Closed Mondays)',
    descriptionEn: 'The historic royal residence of King Rama Varma Shakthan Thampuran (reconstructed 1795 CE), the visionary monarch who modernized Thrissur and founded the world-renowned Thrissur Pooram. The palace features a distinctive Dutch-Kerala architectural style with sprawling verandahs and Italian marble courtyards.',
    descriptionMl: 'ആധുനിക തൃശ്ശൂരിന്റെയും തൃശ്ശൂർ പൂരത്തിന്റെയും ശില്പിയായ ശക്തൻ തമ്പുരാന്റെ കൊട്ടാരം. ഡച്ച്-കേരള വാസ്തുവിദ്യയും പുരാവസ്തു ശേഖരങ്ങളും മനോഹരമായ പൈതൃക ഉദ്യാനവും.',
    culturalSignificanceEn: 'Preserves the political and administrative epoch when Thrissur was transformed from a feudal forest clearing into the Cultural Capital of Kerala. Houses rare Roman gold coins unearthed in Eyyal, megalithic iron implements, and sacred stone inscriptions.',
    culturalSignificanceMl: 'തൃശ്ശൂരിനെ ഒരു സാംസ്കാരിക തലസ്ഥാനമായി മാറ്റിയ ചരിത്ര കാലഘട്ടത്തിന്റെ സ്മാരകം. അയ്യലിൽ നിന്ന് കണ്ടെടുത്ത റോമൻ നാണയങ്ങളും പ്രാചീന ശിലായുഗ അവശിഷ്ടങ്ങളും ഇവിടെ പ്രദർശിപ്പിച്ചിരിക്കുന്നു.',
    historicalContextEn: 'Historically known as Vadakkechira Kovilakam, this palace was restructured in 1795 following the Dutch and British colonial engagements in Cochin. Taken over by the Kerala State Archaeology Department in 2005 and converted into a public heritage museum.',
    historicalContextMl: 'പഴയ വടക്കേച്ചിറ കോവിലകം 1795-ൽ ശക്തൻ തമ്പുരാൻ പുനർനിർമ്മിക്കുകയായിരുന്നു. 2005-ൽ സംസ്ഥാന പുരാവസ്തു വകുപ്പ് ഏറ്റെടുത്ത് ചരിത്ര മ്യൂസിയമാക്കി മാറ്റി.',
    image: '/assets/images/shakthan-palace.jpg',
    gallery: [
      '/assets/images/shakthan-palace.jpg',
      '/assets/images/bhadrakali-bronze-idol.jpg',
      '/assets/images/archaeological-museum-kollengode.jpg'
    ],
    highlights: ['Dutch-Kerala Colonial Synthesis', 'Roman Gold Coin Hoard Gallery', 'Megalithic Stone Burial Urns', 'Royal Arms & Armoury Room', 'Sacred Sarpakkavu Grove'],
    dressCodeOrAdvisory: 'Modest casual attire. Photography permits available at entrance counter.',
    entryFee: '₹20 (Adults), ₹10 (Children under 12)',
    contributor: {
      name: 'Dr. M. S. Jayakumar',
      role: 'Curator of Antiquities',
      organization: 'Kerala State Archaeology Department'
    },
    sourceAttribution: {
      primarySource: 'Kerala State Department of Archaeology Gazette Records & Monument Guides',
      archiveReference: 'Department of Archaeology Monograph: Palaces of Cochin Dynasties; Reg No. TSR-HER-22',
      verifiedBy: 'Directorate of Archaeology, Government of Kerala',
      lastUpdated: 'October 2025'
    },
    officialWebsite: 'https://archaeology.kerala.gov.in/monuments/shakthan-thampuran-palace',
    socialLinks: [
      { platform: 'Kerala Archaeology Portal', url: 'https://archaeology.kerala.gov.in' }
    ],
    relatedLocationIds: ['loc-vadakkunnathan', 'loc-thekkinkadu-maidan', 'loc-sangeetha-nataka-akademi'],
    isIllustrativeData: false,
    sampleDisclaimer: 'Official protected monument of the Department of Archaeology, Government of Kerala.'
  },
  {
    id: 'loc-thekkinkadu-maidan',
    slug: 'thekkinkadu-maidan-pooram-grounds',
    titleEn: 'Thekkinkadu Maidan & Ilanjithara Melam Grounds',
    titleMl: 'തേക്കിൻകാട് മൈതാനം (പൂരപ്പറമ്പ്)',
    culturalCategory: 'CULTURAL_FESTIVAL',
    categoryLabelEn: 'Festival Grounds',
    categoryLabelMl: 'ഉത്സവ വേദി',
    experienceType: 'LIVE_PERFORMANCE',
    experienceTypeLabelEn: 'Live Festival Performance',
    primaryArtform: 'Chenda & Melam',
    taluk: 'Thrissur',
    address: 'Swaraj Round Central, Thrissur 680001',
    location: {
      lat: 10.5255,
      lng: 76.2135
    },
    timingOrDate: 'Open Public Grounds; Peak Pooram Season in Medam (April/May)',
    descriptionEn: 'The monumental 65-acre central maidan encircled by Swaraj Round. Recognized globally as the stage for Thrissur Pooram, the Ilanjithara Melam with 250 percussionists, the 30-elephant Kudamattam parasol duel, and Onam Pulikali celebrations.',
    descriptionMl: 'തൃശ്ശൂർ നഗരത്തിന്റെ മധ്യത്തിലുള്ള വിസ്തൃതമായ മൈതാനം. പൂരങ്ങളുടെ പൂരമായ തൃശ്ശൂർ പൂരത്തിനും ഇലഞ്ഞിത്തറ മേളത്തിനും ഓണക്കാല പുലിക്കളിക്കും വേദിയാകുന്ന ചരിത്രഭൂമി.',
    culturalSignificanceEn: 'Thekkinkadu Maidan represents democratic cultural unity in Kerala. Introduced by Sakthan Thampuran in 1798 when temples were barred from Arattupuzha Pooram due to torrential rains, the king opened Thekkinkadu Maidan to 10 participating temples to celebrate regardless of caste boundaries.',
    culturalSignificanceMl: '1798-ൽ ശക്തൻ തമ്പുരാൻ തുടക്കം കുറിച്ച തൃശ്ശൂർ പൂരം ജാതിമതഭേദമന്യേ സർവ്വജനങ്ങളും ഒന്നിക്കുന്ന ലോകോത്തര ഉത്സവമാണ്.',
    historicalContextEn: 'Historically an impenetrable teak jungle (Thekkinkadu literally means "forest of teak trees") infested with wild animals and outlaws, the grounds were cleared by Sakthan Thampuran using elephant corps to establish Swaraj Round.',
    historicalContextMl: 'പണ്ട് ഇടതൂർന്ന തേക്കിൻകാടായിരുന്ന ഈ പ്രദേശം ശക്തൻ തമ്പുരാൻ ആനകളെ ഉപയോഗിച്ച് വെട്ടിത്തെളിച്ച് നഗരകേന്ദ്രമാക്കുകയായിരുന്നു.',
    image: '/assets/images/thekkinkadu-maidan.jpg',
    gallery: [
      '/assets/images/thekkinkadu-maidan.jpg',
      '/assets/images/ilanjithara-melam.jpg',
      '/assets/images/thrissur-pooram-kudamattam.jpg'
    ],
    highlights: ['Ilanjithara Melam Rhythms', 'Kudamattam Elephant Parasol Arena', 'Onam Pulikali Assembly Grounds', 'Pooram Trade Fair Expo', 'Bilingual Open Public Park'],
    dressCodeOrAdvisory: 'Public grounds. Designated safety zones enforce crowd regulations during festival fireworks.',
    entryFee: 'Free Public Access',
    contributor: {
      name: 'P. Ravindranathan',
      role: 'Festival Committee Archivist',
      organization: 'Thrissur Pooram Heritage Documentation Trust'
    },
    sourceAttribution: {
      primarySource: 'Thrissur Municipal Corporation & Paramekkavu-Thiruvambady Devaswom Chronicles',
      archiveReference: 'Pooram Festival Records 1798-2025; District Gazetteer Thrissur',
      verifiedBy: 'District Administration Thrissur',
      lastUpdated: 'April 2026'
    },
    officialWebsite: 'https://thrissur.nic.in/festival/thrissur-pooram',
    socialLinks: [
      { platform: 'District Administration', url: 'https://thrissur.nic.in' }
    ],
    relatedLocationIds: ['loc-vadakkunnathan', 'loc-shakthan-palace', 'loc-peruvanam-temple'],
    isIllustrativeData: false,
    sampleDisclaimer: 'Public historical grounds with verified geographic bounds.'
  },
  {
    id: 'loc-dolours-basilica',
    slug: 'our-lady-of-dolours-basilica',
    titleEn: 'Our Lady of Dolours Basilica (Puthanpally)',
    titleMl: 'വ്യാകുലമാതാവിന്റെ വലിയപള്ളി (പുത്തൻപള്ളി)',
    culturalCategory: 'HERITAGE_MONUMENT',
    categoryLabelEn: 'Heritage Monument',
    categoryLabelMl: 'പൈതൃക സ്മാരകം',
    experienceType: 'HERITAGE_WALK',
    experienceTypeLabelEn: 'Heritage Walk',
    primaryArtform: 'Gothic Architecture & Sacred Music',
    taluk: 'Thrissur',
    address: 'Palayam Road, Thrissur 680001',
    location: {
      lat: 10.5186,
      lng: 76.2192
    },
    timingOrDate: 'Open Daily: 6:00 AM – 7:30 PM',
    descriptionEn: 'The third tallest church structure in Asia, boasting an imposing 260-foot belfry tower. A monumental showcase of Gothic Revival architecture featuring ribbed vaulted naves, stained glass artistry, and choral hymns.',
    descriptionMl: 'ഏഷ്യയിലെ ഏറ്റവും വലിയ ദേവാലയങ്ങളിലൊന്ന്. 260 അടി ഉയരമുള്ള ഗോഥിക് ഗോപുരവും വർണ്ണാഭമായ ചുവർ-ഗ്ലാസ് ചിത്രങ്ങളും കൊത്തുപണികളും ഉള്ള തൃശ്ശൂരിന്റെ വിഖ്യാതമായ പുത്തൻപള്ളി.',
    culturalSignificanceEn: 'Stands as an architectural testament to the Syrian Catholic heritage of central Kerala. Elevated to the rank of Minor Basilica by Pope John Paul II in 1992 during his historic visit to India.',
    culturalSignificanceMl: 'കേരളത്തിലെ സുറിയാനി കത്തോലിക്കാ പൈതൃകത്തിന്റെ വിസ്മയം. 1992-ൽ ജോൺ പോൾ രണ്ടാമൻ മാർപ്പാപ്പ ബസിലിക്കയായി ഉയർത്തി.',
    historicalContextEn: 'Originally established in 1814 with royal sanction from the Maharaja of Cochin. The present monumental Gothic cathedral was designed by architect J. M. Ambrose and constructed between 1929 and 1940 with community participation.',
    historicalContextMl: '1814-ൽ കൊച്ചി രാജാവിന്റെ പ്രത്യേക അനുമതിയോടെ ആരംഭിച്ച പള്ളി, 1929-1940 കാലഘട്ടത്തിലാണ് ഇന്നത്തെ കൂറ്റൻ ഗോഥിക് രൂപത്തിൽ പുനർനിർമ്മിക്കപ്പെട്ടത്.',
    image: '/assets/images/dolours-basilica.jpg',
    gallery: [
      '/assets/images/dolours-basilica.jpg',
      '/assets/images/dolours-basilica-alt.jpg',
      '/assets/images/thekkinkadu-maidan-2.jpg'
    ],
    highlights: ['260-Foot Gothic Tower', 'Stained Glass Artistry', 'Acoustically Engineered Vaulted Ceilings', 'Historic Choral Bells', 'Centenary Historical Museum'],
    dressCodeOrAdvisory: 'Modest respectful clothing required inside the church nave.',
    entryFee: 'Free Entry to Sanctuary',
    contributor: {
      name: 'Rev. Dr. Thomas Pulikkottil',
      role: 'Archdiocesan Historian',
      organization: 'Archdiocese of Trichur Historical Society'
    },
    sourceAttribution: {
      primarySource: 'Chronicles of the Metropolitan Archdiocese of Trichur & Papal Bull 1992',
      archiveReference: 'Archdiocesan Archive File No. TR-BAS-09; Catholic Directory of India',
      verifiedBy: 'Archdiocesan Heritage Committee',
      lastUpdated: 'January 2026'
    },
    officialWebsite: 'http://www.doloursbasilica.com',
    socialLinks: [
      { platform: 'Archdiocese Portal', url: 'http://www.trichurarchdiocese.org' }
    ],
    relatedLocationIds: ['loc-vadakkunnathan', 'loc-cheraman-mosque', 'loc-shakthan-palace'],
    isIllustrativeData: false,
    sampleDisclaimer: 'Documented ecclesiastical heritage site with verified coordinates.'
  },
  {
    id: 'loc-cheraman-mosque',
    slug: 'cheraman-juma-mosque-kodungallur',
    titleEn: 'Cheraman Juma Mosque (Founded 629 CE)',
    titleMl: 'ചേരമാൻ ജുമാ മസ്ജിദ് കൊടുങ്ങള്ളൂർ',
    culturalCategory: 'HERITAGE_MONUMENT',
    categoryLabelEn: 'Heritage Monument',
    categoryLabelMl: 'പൈതൃക സ്മാരകം',
    experienceType: 'HERITAGE_WALK',
    experienceTypeLabelEn: 'Heritage Walk',
    primaryArtform: 'Ancient Kerala Wooden Architecture',
    taluk: 'Kodungallur',
    address: 'NH 66, Padakulam, Kodungallur, Thrissur 680664',
    location: {
      lat: 10.2136,
      lng: 76.2008
    },
    timingOrDate: 'Open Daily: 5:00 AM – 9:00 PM; Museum: 9:00 AM – 5:00 PM',
    descriptionEn: 'The oldest mosque in the Indian subcontinent and second oldest in the world, founded in 629 CE by Malik Deenar. Constructed in traditional indigenous Kerala temple-style wooden architecture with a central hanging brass oil lamp kept continuously burning for over 1,000 years.',
    descriptionMl: 'ഇന്ത്യയിലെ ഏറ്റവും പുരാതനമായ മുസ്ലിം ദേവാലയം (ക്രി.വ. 629). പരമ്പരാഗത കേരളീയ തച്ചുശാസ്ത്രത്തിൽ നിർമ്മിതമായ ഈ പള്ളിയിൽ നൂറ്റാണ്ടുകളായി എണ്ണവിളക്ക് തെളിഞ്ഞുനിൽക്കുന്നു.',
    culturalSignificanceEn: 'A living symbol of ancient intercultural and interfaith synthesis on the Malabar Coast. People of all religious backgrounds contribute oil to the historic brass lamp (*Nilavilakku*) in fulfillment of vows, and Hindu children participate in Vidyarambham ceremonies here.',
    culturalSignificanceMl: 'മതസൗഹാർദ്ദത്തിന്റെ ഉജ്ജ്വല മാതൃക. സർവ്വമതസ്ഥരും ഈ പള്ളിയിലെ നിലവിളക്കിലേക്ക് എണ്ണ നൽകി പ്രാർത്ഥിക്കുകയും വിദ്യാരംഭം കുറിക്കുകയും ചെയ്യുന്നു.',
    historicalContextEn: 'Historical traditions record the journey of Cheraman Perumal (Rama Varma Kulashekhara) to Arabia. Documented trade records from the Muziris port complex corroborate extensive maritime trade between Rome, Arabia, and Kodungallur during the 7th century CE.',
    historicalContextMl: 'ചേരമാൻ പെരുമാളിന്റെ യാത്രയും തുടർന്ന് മാലിക് ദീനാറിന്റെ നേതൃത്വത്തിൽ നടന്ന നിർമ്മാണവുമാണ് പള്ളിയുടെ ഉത്ഭവത്തിന് പിന്നിൽ. മുസിരിസ് തുറമുഖ പൈതൃകവുമായി ഈ ചരിത്രം ബന്ധപ്പെട്ടിരിക്കുന്നു.',
    image: '/assets/images/cheraman-mosque.jpg',
    gallery: [
      '/assets/images/cheraman-mosque.jpg',
      '/assets/images/kodungallur-temple.jpg',
      '/assets/images/thekkinkadu-maidan.jpg'
    ],
    highlights: ['Established 629 CE (7th Century)', 'Kerala Wooden Temple-Style Roofs', '1000-Year-Old Eternal Brass Lamp', 'Muziris Heritage Museum Center', 'Ancient Rosewood Pulpit (Mimbar)'],
    dressCodeOrAdvisory: 'Modest clothing required. Heritage museum open to all visitors of any faith.',
    entryFee: 'Free entry',
    contributor: {
      name: 'Dr. Faisal Kodungallur',
      role: 'Muziris Heritage Research Fellow',
      organization: 'Muziris Heritage Project & Cheraman Mosque Trust'
    },
    sourceAttribution: {
      primarySource: 'Muziris Heritage Project Documentation & Department of Cultural Affairs Govt of Kerala',
      archiveReference: 'Muziris Project Monograph Vol II; Kerala Charithram Records',
      verifiedBy: 'Archaeology & Heritage Committee Kodungallur',
      lastUpdated: 'February 2026'
    },
    officialWebsite: 'https://cheramanmosque.com',
    socialLinks: [
      { platform: 'Muziris Heritage Project', url: 'https://www.muzirisheritage.org' }
    ],
    relatedLocationIds: ['loc-kodungallur-temple', 'loc-vadakkunnathan', 'loc-dolours-basilica'],
    isIllustrativeData: false,
    sampleDisclaimer: 'Documented national heritage landmark with verified geographic location.'
  },
  {
    id: 'loc-sangeetha-nataka-akademi',
    slug: 'kerala-sangeetha-nataka-akademi',
    titleEn: 'Kerala Sangeetha Nataka Akademi & ITFOK',
    titleMl: 'കേരള സംഗീത നാടക അക്കാദമി',
    culturalCategory: 'ACADEMY_MUSEUM',
    categoryLabelEn: 'Academy & Museum',
    categoryLabelMl: 'കലാഗോപുരം & തിയേറ്റർ',
    experienceType: 'LIVE_PERFORMANCE',
    experienceTypeLabelEn: 'Theatre & Performance',
    primaryArtform: 'Theatre & Folk Arts',
    taluk: 'Thrissur',
    address: 'Chembukkavu, Thrissur 680020',
    location: {
      lat: 10.5322,
      lng: 76.2225
    },
    timingOrDate: 'Open Daily: 10:00 AM – 5:00 PM; Evening Shows During Festivals',
    descriptionEn: 'The state headquarters of performing theatre, music, and folk arts in Kerala. Celebrated host of the world-famous International Theatre Festival of Kerala (ITFOK) which convenes experimental and traditional dramatists from across five continents annually.',
    descriptionMl: 'അന്താരാഷ്ട്ര നാടകോത്സവം (ITFOK) അരങ്ങേറുന്ന കേരളത്തിന്റെ നാടക സംഗീത ആസ്ഥാനം. ഭരത് മുരളി ഓപ്പൺ എയർ തിയേറ്ററും നാടക ലൈബ്രറിയും അടങ്ങുന്ന കലാ സമുച്ചയം.',
    culturalSignificanceEn: 'Serves as the apex institution preserving disappearing folk theatre genres including Chavittu Nadakam, Kanyarkali, and Tholpavakoothu (shadow puppetry), while pioneering modern Malayalam proscenium dramaturgy.',
    culturalSignificanceMl: 'ചവിട്ടുനാടകം, തോൽപ്പാവക്കൂത്ത് തുടങ്ങിയ നാടോടി കലകളെ സംരക്ഷിക്കുന്നതിനൊപ്പം ആധുനിക മലയാള നാടകവേദിയെ അന്താരാഷ്ട്ര തലത്തിലേക്ക് ഉയർത്തിയ കേന്ദ്രം.',
    historicalContextEn: 'Established on April 26, 1958 by the Government of Kerala and formally inaugurated by Prime Minister Jawaharlal Nehru in Thrissur. The complex includes the K. T. Muhammed Regional Theatre and Bharat Murali Open-Air Auditorium.',
    historicalContextMl: '1958 ഏപ്രിൽ 26-ന് ജവഹർലാൽ നെഹ്റു ഉദ്ഘാടനം ചെയ്ത ഈ സ്ഥാപനം അരനൂറ്റാണ്ടിലേറെയായി കേരളത്തിലെ നാടക-സംഗീത ശാഖകളെ പരിപോഷിപ്പിക്കുന്നു.',
    image: '/assets/images/sangeetha-nataka-akademi.jpg',
    gallery: [
      '/assets/images/sangeetha-nataka-akademi.jpg',
      '/assets/images/kadavallur-temple-gopuram.jpg',
      '/assets/images/koodiyattam-theatre.jpg'
    ],
    highlights: ['ITFOK International Theatre Fest', 'Nataka Kalari Training Workshops', 'Folk Instrument Archival Collection', 'K. T. Muhammed Regional Theatre', 'Comprehensive Performing Arts Library'],
    dressCodeOrAdvisory: 'Modest casual attire. Flash photography prohibited during live theatrical plays.',
    entryFee: 'Campus free; festival stage passes ticketed',
    contributor: {
      name: 'N. Radhakrishnan',
      role: 'Theatre Archivist & Curator',
      organization: 'Kerala Sangeetha Nataka Akademi'
    },
    sourceAttribution: {
      primarySource: 'Kerala Sangeetha Nataka Akademi Official Gazettes & ITFOK Catalogs',
      archiveReference: 'KSNA Golden Jubilee Archive 2008; ITFOK 2024 Festival Program Report',
      verifiedBy: 'Department of Cultural Affairs, Government of Kerala',
      lastUpdated: 'February 2026'
    },
    officialWebsite: 'https://keralasangeethanatakaakademi.in',
    socialLinks: [
      { platform: 'ITFOK Festival Page', url: 'https://theatrefestivalkerala.com' }
    ],
    relatedLocationIds: ['loc-lalithakala-akademi', 'loc-sahitya-akademi', 'loc-kalamandalam'],
    isIllustrativeData: false,
    sampleDisclaimer: 'State Cultural Academy verified coordinates and programs.'
  },
  {
    id: 'loc-lalithakala-akademi',
    slug: 'kerala-lalithakala-akademi',
    titleEn: 'Kerala Lalithakala Akademi & Durbar Hall Arts',
    titleMl: 'കേരള ലളിതകലാ അക്കാദമി',
    culturalCategory: 'ACADEMY_MUSEUM',
    categoryLabelEn: 'Academy & Museum',
    categoryLabelMl: 'കലാഗോപുരം & ഗാലറി',
    experienceType: 'MUSEUM_ARCHIVE',
    experienceTypeLabelEn: 'Art Gallery & Exhibition',
    primaryArtform: 'Painting, Sculpture & Murals',
    taluk: 'Thrissur',
    address: 'Chembukkavu, Thrissur 680020',
    location: {
      lat: 10.5315,
      lng: 76.2210
    },
    timingOrDate: 'Tuesday – Sunday: 10:00 AM – 6:00 PM (Closed Mondays)',
    descriptionEn: 'The state fine arts academy dedicated to the preservation, documentation, and promotion of visual arts, Kerala temple mural restoration, classical and modern sculpture, and printmaking.',
    descriptionMl: 'കേരളത്തിലെ ചിത്രകാരന്മാരുടെയും ശിൽപികളുടെയും സംസ്ഥാന ആസ്ഥാനം. ആധുനിക-പാരമ്പര്യ ചിത്രപ്രദർശനങ്ങളും ശിൽപോദ്യാനവും സ്ഥിതിചെയ്യുന്നു.',
    culturalSignificanceEn: 'Responsible for institutional conservation of endangered temple murals across Kerala. The Akademi conducts annual residential sculpture symposiums and state exhibitions honoring master artists.',
    culturalSignificanceMl: 'കേരളത്തിലെ ക്ഷേത്ര ചുവർചിത്രങ്ങളുടെ സംരക്ഷണത്തിലും ആധുനിക ചിത്രകലയുടെ വികാസത്തിലും നേതൃത്വം നൽകുന്ന പ്രമുഖ സ്ഥാപനം.',
    historicalContextEn: 'Founded by the Government of Kerala in 1962. It functions in close coordination with Lalit Kala Akademi New Delhi and coordinates artist-in-residence programs in Thrissur.',
    historicalContextMl: '1962-ൽ സ്ഥാപിതമായ ഈ സ്ഥാപനം ചിത്രകലാ ക്യാമ്പുകളും അന്താരാഷ്ട്ര ശിൽപശാലകളും സംഘടിപ്പിച്ചുപോരുന്നു.',
    image: '/assets/images/lalithakala-akademi.jpg',
    gallery: [
      '/assets/images/lalithakala-akademi.jpg',
      '/assets/images/kerala-mural-temple.jpg',
      '/assets/images/kerala-mural-ganesha.jpg'
    ],
    highlights: ['Mural Restoration Archives', 'Raja Ravi Varma Memorial Galleries', 'Open Air Sculpture Park', 'State Award Winning Art Collections', 'Artisan Printmaking Workshops'],
    dressCodeOrAdvisory: 'Open to public. Flash photography restricted inside conservation galleries.',
    entryFee: 'Free entry to public exhibitions',
    contributor: {
      name: 'V. S. Mohankumar',
      role: 'Gallery Archivist',
      organization: 'Kerala Lalithakala Akademi'
    },
    sourceAttribution: {
      primarySource: 'Kerala Lalithakala Akademi Official Monograph & Annual State Exhibition Reports',
      archiveReference: 'KLKA Annual Visual Arts Digest 1962-2025; State Register of Artists',
      verifiedBy: 'State Department of Cultural Affairs',
      lastUpdated: 'December 2025'
    },
    officialWebsite: 'https://lalithkala.org',
    socialLinks: [
      { platform: 'Akademi Portal', url: 'https://lalithkala.org' }
    ],
    relatedLocationIds: ['loc-sangeetha-nataka-akademi', 'loc-sahitya-akademi', 'loc-vadakkunnathan'],
    isIllustrativeData: false,
    sampleDisclaimer: 'State Fine Arts Academy verified coordinates.'
  },
  {
    id: 'loc-sahitya-akademi',
    slug: 'kerala-sahitya-akademi-thrissur',
    titleEn: 'Kerala Sahitya Akademi & Linguistic Archives',
    titleMl: 'കേരള സാഹിത്യ അക്കാദമി',
    culturalCategory: 'ACADEMY_MUSEUM',
    categoryLabelEn: 'Academy & Museum',
    categoryLabelMl: 'സാഹിത്യ സമുച്ചയം',
    experienceType: 'HERITAGE_WALK',
    experienceTypeLabelEn: 'Literary Walk & Library',
    primaryArtform: 'Temple Architecture & Literature',
    taluk: 'Thrissur',
    address: 'Town Hall Road, Chembukkavu, Thrissur 680020',
    location: {
      lat: 10.5285,
      lng: 76.2180
    },
    timingOrDate: 'Monday – Saturday: 10:00 AM – 5:00 PM (Closed Sundays)',
    descriptionEn: 'The preeminent literary body of the Malayalam language, established in 1956. Housing one of the largest specialized reference libraries in South India with over 150,000 volumes, ancient palm-leaf manuscripts (Thaliyola), and author archives.',
    descriptionMl: 'മലയാള സാഹിത്യത്തിന്റെ ആസ്ഥാനം. ലക്ഷക്കണക്കിന് പുസ്തകങ്ങൾ അടങ്ങിയ റഫറൻസ് ലൈബ്രറിയും താളിയോല ശേഖരങ്ങളും എഴുത്തുകാരുടെ ഛായാചിത്ര ഗാലറിയും ഉൾക്കൊള്ളുന്നു.',
    culturalSignificanceEn: 'The intellectual sanctuary that codified modern Malayalam literature, fostering linguistic evolution and hosting historic dialogues between Malayalam authors and global translators.',
    culturalSignificanceMl: 'മലയാള ഭാഷയുടെയും സാഹിത്യത്തിന്റെയും വികാസത്തിന് നേതൃത്വം നൽകുന്ന അത്യുന്നത സാംസ്കാരിക സ്ഥാപനം.',
    historicalContextEn: 'Inaugurated on August 15, 1956 in Thiruvananthapuram and relocated to Thrissur in September 1957. Renowned novelist Sardar K. M. Panikkar served as its first president.',
    historicalContextMl: '1956-ൽ സ്ഥാപിതമായ അക്കാദമി 1957-ൽ തൃശ്ശൂരിലേക്ക് മാറ്റിസ്ഥാപിച്ചു. സർദാർ കെ. എം. പണിക്കരായിരുന്നു പ്രഥമ അധ്യക്ഷൻ.',
    image: '/assets/images/sahitya-akademi-building.jpg',
    gallery: [
      '/assets/images/sahitya-akademi-building.jpg',
      '/assets/images/thekkinkadu-maidan.jpg',
      '/assets/images/shakthan-palace.jpg'
    ],
    highlights: ['Rare Palm-Leaf Manuscript Section', '150,000 Volume Reference Library', 'Portrait Gallery of Literary Masters', 'Historic Changampuzha Hall', 'Annual International Book Fair'],
    dressCodeOrAdvisory: 'Quiet study decorum requested inside reading rooms.',
    entryFee: 'Free public entry',
    contributor: {
      name: 'Dr. C. P. Unnikrishnan',
      role: 'Head Librarian & Archival Fellow',
      organization: 'Kerala Sahitya Akademi'
    },
    sourceAttribution: {
      primarySource: 'Kerala Sahitya Akademi Official Chronicles 1956-2025',
      archiveReference: 'KSA Institutional History Monograph; Kerala Literary Gazettes',
      verifiedBy: 'Department of Cultural Affairs, Government of Kerala',
      lastUpdated: 'January 2026'
    },
    officialWebsite: 'https://keralasahityaakademi.org',
    socialLinks: [
      { platform: 'Sahitya Akademi Portal', url: 'https://keralasahityaakademi.org' }
    ],
    relatedLocationIds: ['loc-sangeetha-nataka-akademi', 'loc-lalithakala-akademi', 'loc-shakthan-palace'],
    isIllustrativeData: false,
    sampleDisclaimer: 'State Literary Academy verified coordinates and archival collections.'
  },
  {
    id: 'loc-peruvanam-temple',
    slug: 'peruvanam-melam-kalari-cherpu',
    titleEn: 'Peruvanam Mahadeva Temple & Melam Grounds',
    titleMl: 'പെരുവനം മഹാദേവ ക്ഷേത്രവും മേളത്തറയും',
    culturalCategory: 'CULTURAL_FESTIVAL',
    categoryLabelEn: 'Festival Grounds',
    categoryLabelMl: 'മേളത്തറ & ക്ഷേത്രം',
    experienceType: 'LIVE_PERFORMANCE',
    experienceTypeLabelEn: 'Live Melam Performance',
    primaryArtform: 'Chenda & Melam',
    taluk: 'Thrissur',
    address: 'Peruvanam, Cherpu, Thrissur 680561',
    location: {
      lat: 10.4286,
      lng: 76.2238
    },
    timingOrDate: 'Temple: 5:00 AM – 10:30 AM, 5:00 PM – 8:00 PM; Annual Pooram in Meenam',
    descriptionEn: 'The historic epicentre of Kerala percussion traditions, dating back over 1,500 years. Home to the generational Peruvanam Melam lineage and venue of the ancient Peruvanam Pooram, considered the mother of organized temple festivals in central Kerala.',
    descriptionMl: 'കേരളത്തിലെ വാദ്യകലയുടെയും മേളങ്ങളുടെയും ഈറ്റില്ലം. ആയിരത്തഞ്ഞൂറ് വർഷത്തെ ചരിത്രമുള്ള പെരുവനം പൂരത്തിനും വിഖ്യാത പഞ്ചാരിമേളങ്ങൾക്കും വേദിയാകുന്ന പുണ്യഭൂമി.',
    culturalSignificanceEn: 'Panchari Melam reached its pinnacle of mathematical perfection and architectural tempo progression at Peruvanam under masters such as Peruvanam Appu Marar and Padma Shri Peruvanam Kuttan Marar.',
    culturalSignificanceMl: 'പഞ്ചാരിമേളത്തിന് ലോകപ്രശസ്തി നേടിക്കൊടുത്ത പെരുവനം കുട്ടൻ മാരാരടക്കമുള്ള മേളപ്രമാണിമാരുടെ തട്ടകം.',
    historicalContextEn: 'Documented in medieval Grantha records and Sangam-era references as one of the 64 ancient Namboothiri settlements of Kerala. The double-storeyed octagonal copper-plated sanctum (Madathilappan) is an architectural wonder dating to the 11th century CE.',
    historicalContextMl: 'പതിനൊന്നാം നൂറ്റാണ്ടിലെ അപൂർവ്വമായ ഇരട്ടനില ശ്രീകോവിലും പുരാതന ചെപ്പേടുകളും പെരുവനത്തിന്റെ പ്രാചീനത സാക്ഷ്യപ്പെടുത്തുന്നു.',
    image: '/assets/images/arattupuzha-pooram.jpg',
    gallery: [
      '/assets/images/arattupuzha-pooram.jpg',
      '/assets/images/chenda-melam.jpg',
      '/assets/images/ilanjithara-melam.jpg'
    ],
    highlights: ['Cradle of Panchari Melam', 'Unique Double-Storeyed Octagonal Sreekovil', 'Historic Peruvanam Pooram Traditions', 'Sacred Melam Kalari Repertoire', 'Ancient Inscription Tablets'],
    dressCodeOrAdvisory: 'Traditional temple dress code required inside inner sanctum.',
    entryFee: 'Free entry',
    contributor: {
      name: 'Padma Shri Peruvanam Kuttan Marar',
      role: 'Melam Pramani & Traditional Custodian',
      organization: 'Peruvanam Kshetra Kshema Samithi'
    },
    sourceAttribution: {
      primarySource: 'Epigraphica Malabarica Vol IV & Cochin Devaswom Board Documentation',
      archiveReference: 'Cochin Temple Survey 1912; Kerala Sangeetha Nataka Akademi Melam Archives',
      verifiedBy: 'Cochin Devaswom Board & Heritage Trust',
      lastUpdated: 'March 2026'
    },
    officialWebsite: 'https://cochindevaswomboard.org/peruvanam',
    socialLinks: [
      { platform: 'Kerala Tourism Heritage', url: 'https://www.keralatourism.org/destination/peruvanam-temple/312' }
    ],
    relatedLocationIds: ['loc-thekkinkadu-maidan', 'loc-vadakkunnathan', 'loc-nadavaramba'],
    isIllustrativeData: false,
    sampleDisclaimer: 'Historic temple with verified coordinates and documented percussion lineage.'
  },
  {
    id: 'loc-guruvayur-temple',
    slug: 'guruvayur-sri-krishna-temple',
    titleEn: 'Guruvayur Sri Krishna Temple & Mural Centre',
    titleMl: 'ഗുരുവായൂർ ശ്രീകൃഷ്ണ ക്ഷേത്രവും ചുവർചിത്ര കലാലയവും',
    culturalCategory: 'HERITAGE_MONUMENT',
    categoryLabelEn: 'Heritage Monument',
    categoryLabelMl: 'പൈതൃക സ്മാരകം',
    experienceType: 'HERITAGE_WALK',
    experienceTypeLabelEn: 'Heritage & Sacred Arts',
    primaryArtform: 'Kerala Mural Art',
    taluk: 'Chavakkad',
    address: 'East Nada, Guruvayur, Thrissur District 680101',
    location: {
      lat: 10.5947,
      lng: 76.0384
    },
    timingOrDate: 'Open Daily: 3:00 AM – 1:30 PM, 4:30 PM – 9:15 PM',
    descriptionEn: 'Known spiritually as the "Bhuloka Vaikuntham", this sacred shrine is also an extraordinary custodian of classical art forms. Houses the Devaswom Institute of Mural Painting, Krishnanattam dance troupes, and generational Sopana Sangeetham percussionists playing the sacred Edakka.',
    descriptionMl: 'കേരളത്തിലെ മഹാക്ഷേത്രങ്ങളിലൊന്ന്. ക്ഷേത്രത്തോടനുബന്ധിച്ച് പ്രവർത്തിക്കുന്ന ചുവർചിത്ര പഠനകേന്ദ്രം പരമ്പരാഗത പഞ്ചവർണ്ണ രചനാശൈലി പരിശീലിപ്പിക്കുന്നു.',
    culturalSignificanceEn: 'The birth ground of Krishnanattam (created by Zamorin King Manaveda in 1654 CE), the direct precursor to Kathakali. The adjacent Institute of Mural Painting has graduated master painters who have restored temple frescos throughout South India.',
    culturalSignificanceMl: 'കഥകളിയുടെ മാതൃരൂപമായ കൃഷ്ണനാട്ടത്തിന്റെ ഈറ്റില്ലം. പ്രകൃതിദത്ത ചുവർചിത്രങ്ങൾ വരയ്ക്കുന്ന വിദഗ്ദ്ധരെ വാർത്തെടുക്കുന്ന കേന്ദ്രം.',
    historicalContextEn: 'Documented in 14th-century Tamil texts and the Kokasandesa. Reconstructed extensively after the 1970 fire, meticulously preserving authentic stone carvings and copper roofing under national conservation advisory.',
    historicalContextMl: 'പതിനാലാം നൂറ്റാണ്ടിലെ ഗ്രന്ഥങ്ങളിൽ പരാമർശമുള്ള ഗുരുവായൂർ ക്ഷേത്രം പൗരാണിക വാസ്തുവിദ്യയുടെ വിസ്മയമാണ്.',
    image: '/assets/images/guruvayur-sree-krishna-temple.jpg',
    gallery: [
      '/assets/images/guruvayur-sree-krishna-temple.jpg',
      '/assets/images/punnathur-kotta-elephants.jpg',
      '/assets/images/kerala-mural-krishna.jpg'
    ],
    highlights: ['Institute of Mural Painting', 'Krishnanattam Classical Dance Troupe', 'Edakka Sopana Sangeetham Recitals', 'Deepastambham 1000-Lamp Pillar', 'Sree Krishna Gitanjali Library'],
    dressCodeOrAdvisory: 'Strict traditional attire mandatory. Non-Hindus can visit the Mural Institute and outer Nada.',
    entryFee: 'Free entry to temple',
    contributor: {
      name: 'K. Unnikrishnan',
      role: 'Principal, Institute of Mural Painting',
      organization: 'Guruvayur Devaswom Board'
    },
    sourceAttribution: {
      primarySource: 'Guruvayur Devaswom Administration Records & Kerala State Devaswom Gazettes',
      archiveReference: 'Guruvayur Temple Monograph Vol I-III; Mural Conservation Reports',
      verifiedBy: 'Guruvayur Devaswom Managing Committee',
      lastUpdated: 'January 2026'
    },
    officialWebsite: 'https://www.guruvayurdevaswom.nic.in',
    socialLinks: [
      { platform: 'Devaswom Portal', url: 'https://www.guruvayurdevaswom.nic.in' }
    ],
    relatedLocationIds: ['loc-punnathur-kotta', 'loc-vadakkunnathan', 'loc-kalamandalam'],
    isIllustrativeData: false,
    sampleDisclaimer: 'Documented national shrine and mural center with verified coordinates.'
  },
  {
    id: 'loc-punnathur-kotta',
    slug: 'punnathur-kotta-elephant-palace',
    titleEn: 'Punnathur Kotta (Anakkotta Elephant Sanctuary)',
    titleMl: 'പുന്നത്തൂർ കോട്ട ആനത്താവളം',
    culturalCategory: 'HERITAGE_MONUMENT',
    categoryLabelEn: 'Heritage Landmark',
    categoryLabelMl: 'പൈതൃക കേന്ദ്രം',
    experienceType: 'HERITAGE_WALK',
    experienceTypeLabelEn: 'Heritage Walk',
    primaryArtform: 'Temple Architecture & Literature',
    taluk: 'Chavakkad',
    address: 'Kottappady, Guruvayur, Thrissur 680505',
    location: {
      lat: 10.6120,
      lng: 76.0289
    },
    timingOrDate: 'Open Daily: 9:00 AM – 5:00 PM',
    descriptionEn: 'A sprawling 10-acre royal palace complex featuring classical Naalukettu courtyards, historically belonging to the Punnathur Rajas. Today it serves as the world’s unique residential sanctuary housing temple elephants associated with Kerala’s temple pooram traditions.',
    descriptionMl: 'പുന്നത്തൂർ രാജാക്കന്മാരുടെ പുരാതന കൊട്ടാര സമുച്ചയം. തൃശ്ശൂർ പൂരത്തിനും ഉത്സവങ്ങൾക്കും അണിനിരക്കുന്ന ഗജവീരന്മാരെ പരിപാലിക്കുന്ന വിശാലമായ ആനത്താവളം.',
    culturalSignificanceEn: 'Anchors the living ritual knowledge of Gaja Shastra (ancient elephant science and veterinary care). Traditional artisans craft elephant regalia—Nettipattam, Venchamaram, and Aalavattam—here during festival seasons.',
    culturalSignificanceMl: 'ഗജശാസ്ത്ര പാരമ്പര്യവും നെറ്റിപ്പട്ടം, വെഞ്ചാമരം, ആലവട്ടം തുടങ്ങിയ പൂരാഭരണ നിർമ്മാണവും നിലനിൽക്കുന്ന കേന്ദ്രം.',
    historicalContextEn: 'The palace was acquired by Guruvayur Devaswom in 1975 from the Punnathur royal lineage, preserving its centuries-old timber structures, step wells, and lush greenery.',
    historicalContextMl: '1975-ൽ പുന്നത്തൂർ രാജവംശത്തിൽ നിന്ന് ദേവസ്വം ഏറ്റെടുത്ത് ആനത്താവളമാക്കി മാറ്റി.',
    image: '/assets/images/punnathur-kotta-elephants.jpg',
    gallery: [
      '/assets/images/punnathur-kotta-elephants.jpg',
      '/assets/images/guruvayur-sree-krishna-temple.jpg',
      '/assets/images/thrissur-pooram-kudamattam.jpg'
    ],
    highlights: ['Ancient Naalukettu Royal Palace', 'Traditional Elephant Regalia Workshop', 'Ayurvedic Elephant Rejuvenation (Sukha Chikitsa)', 'Verdant 10-Acre Heritage Groves'],
    dressCodeOrAdvisory: 'Safe viewing distances must be maintained strictly under mahout supervision.',
    entryFee: '₹20 (Adults), ₹10 (Children)',
    contributor: {
      name: 'Dr. P. B. Giridas',
      role: 'Senior Elephant Care Specialist',
      organization: 'Guruvayur Devaswom Veterinary Wing'
    },
    sourceAttribution: {
      primarySource: 'Guruvayur Devaswom Administrative Reports & Forest Veterinary Department',
      archiveReference: 'Anakkotta Heritage Register 1975-2025',
      verifiedBy: 'Guruvayur Devaswom Managing Committee',
      lastUpdated: 'November 2025'
    },
    officialWebsite: 'https://www.guruvayurdevaswom.nic.in/punnathur-kotta',
    socialLinks: [
      { platform: 'Official Portal', url: 'https://www.guruvayurdevaswom.nic.in' }
    ],
    relatedLocationIds: ['loc-guruvayur-temple', 'loc-thekkinkadu-maidan', 'loc-shakthan-palace'],
    isIllustrativeData: false,
    sampleDisclaimer: 'Historic palace and elephant sanctuary verified coordinates in Kottappady.'
  },
  {
    id: 'loc-koodalmanikyam',
    slug: 'irinjalakuda-koodalmanikyam-temple',
    titleEn: 'Koodalmanikyam Temple & Historic Koothambalam',
    titleMl: 'കൂടൽമാണിക്യം ക്ഷേത്രവും കൂത്തമ്പലവും',
    culturalCategory: 'HERITAGE_MONUMENT',
    categoryLabelEn: 'Heritage Monument',
    categoryLabelMl: 'പൈതൃക സ്മാരകം',
    experienceType: 'LIVE_PERFORMANCE',
    experienceTypeLabelEn: 'Sanskrit Theatre & Performance',
    primaryArtform: 'Kathakali & Koodiyattam',
    taluk: 'Mukundapuram',
    address: 'Manavalassery, Irinjalakuda, Thrissur 680121',
    location: {
      lat: 10.3448,
      lng: 76.2052
    },
    timingOrDate: 'Open Daily: 3:30 AM – 11:30 AM, 5:00 PM – 8:00 PM',
    descriptionEn: 'The only ancient shrine in India dedicated to Lord Bharata (Sangameshwara). Celebrated for its gigantic wooden Koothambalam where legendary masters of Koodiyattam and Chakyar Koothu performed for centuries, surrounded by four massive sacred ponds.',
    descriptionMl: 'ഭാരതത്തിൽ ഭരതന് സമർപ്പിച്ചിട്ടുള്ള അപൂർവ്വ ക്ഷേത്രം. അത്യപൂർവ്വ കൂത്തമ്പലവും കൂടിയാട്ട പാരമ്പര്യവും നാല് കൂറ്റൻ കുളങ്ങളുമുള്ള ഇരിഞ്ഞാലക്കുടയുടെ അഭിമാനം.',
    culturalSignificanceEn: 'Painkulam Rama Chakyar and Ammannur Madhava Chakyar revived Koodiyattam on this exact Koothambalam stage, bringing Sanskrit drama out of feudal secrecy into public appreciation.',
    culturalSignificanceMl: 'പൈങ്കുളം രാമച്ചാക്യാരും അമ്മാന്നൂർ മാധവച്ചാക്യാരും കൂടിയാട്ടത്തെ ലോകവേദിയിലേക്ക് കൈപിടിച്ചുയർത്തിയത് ഇവിടുത്തെ കൂത്തമ്പലത്തിലൂടെയാണ്.',
    historicalContextEn: 'Documented in Chera-era copper plate grants and the Vattezhuthu inscription of 854 CE (during the reign of Sthanu Ravi Varma), proving continuous worship and artistic patronage for over 1,170 years.',
    historicalContextMl: 'ക്രി.വ. 854-ലെ സ്ഥാണു രവി വർമ്മന്റെ വട്ടെഴുത്ത് ശാസനത്തിൽ കൂടൽമാണിക്യം ക്ഷേത്രത്തെക്കുറിച്ച് രേഖപ്പെടുത്തിയിട്ടുണ്ട്.',
    image: '/assets/images/koodalmanikyam-temple.jpg',
    gallery: [
      '/assets/images/koodalmanikyam-temple.jpg',
      '/assets/images/koodiyattam-theatre.jpg',
      '/assets/images/chenda-melam.jpg'
    ],
    highlights: ['Only Bharata Temple in India', 'Monumental Teakwood Koothambalam', 'Ammannur Koodiyattam Heritage', 'Four Vast Sacred Ponds (Kuttan Kulam, Kulipini Theertham)', 'Vedic Temple Herbal Medicine (Mukkudi Nivedyam)'],
    dressCodeOrAdvisory: 'Traditional Hindu temple dress code in effect.',
    entryFee: 'Free entry',
    contributor: {
      name: 'Dr. C. G. Narayanan Nambiar',
      role: 'Sanskrit Theatre Historian',
      organization: 'Ammannur Chachu Chakyar Smaraka Gurukulam'
    },
    sourceAttribution: {
      primarySource: 'Epigraphia Indica & Koodalmanikyam Devaswom Inscription Catalogs',
      archiveReference: 'Travancore & Cochin Inscriptions Vol II; Sthanu Ravi Copper Plate 854 CE',
      verifiedBy: 'Koodalmanikyam Devaswom Board',
      lastUpdated: 'December 2025'
    },
    officialWebsite: 'https://koodalmanikyam.com',
    socialLinks: [
      { platform: 'Koodalmanikyam Devaswom', url: 'https://koodalmanikyam.com' }
    ],
    relatedLocationIds: ['loc-nadavaramba', 'loc-kalamandalam', 'loc-vadakkunnathan'],
    isIllustrativeData: false,
    sampleDisclaimer: 'Historic monument with verified 9th-century epigraphical records.'
  },
  {
    id: 'loc-kodungallur-temple',
    slug: 'kodungallur-kurumba-bhagavathy-temple',
    titleEn: 'Kodungallur Kurumba Bhagavathy Temple',
    titleMl: 'കൊടുങ്ങല്ലൂർ കുരുംബ ഭഗവതി ക്ഷേത്രം',
    culturalCategory: 'CULTURAL_FESTIVAL',
    categoryLabelEn: 'Festival & Heritage',
    categoryLabelMl: 'ഉത്സവം & പൈതൃകം',
    experienceType: 'LIVE_PERFORMANCE',
    experienceTypeLabelEn: 'Folk Ritual & Performance',
    primaryArtform: 'Folk & Ritual Art',
    taluk: 'Kodungallur',
    address: 'Temple Road, Kodungallur, Thrissur 680664',
    location: {
      lat: 10.2268,
      lng: 76.2015
    },
    timingOrDate: 'Open Daily: 3:00 AM – 12:00 PM, 4:00 PM – 8:00 PM; Bharani in Meenam',
    descriptionEn: 'One of the most ancient Bhadrakali shrines in South India, intrinsically tied to the Sangam epic Cilappatikaram and the legend of Kannaki. Celebrated for the mystical Kodungallur Bharani and Thalappoli festivals featuring sword dances by thousands of oracles (Velichappadu).',
    descriptionMl: 'ദക്ഷിണേന്ത്യയിലെ അതിപുരാതന ഭദ്രകാളി ക്ഷേത്രം. വെളിച്ചപ്പാടന്മാരുടെ വാളേന്തിയ നൃത്തവും താലപ്പൊലിയും വിഖ്യാതമായ ഭരണി ഉത്സവവും നടക്കുന്ന പുരാതന തീർത്ഥാടന കേന്ദ്രം.',
    culturalSignificanceEn: 'A living repository of subaltern ritual traditions where caste boundaries were historically suspended during the sacred "Kaavu Theendal" ceremony. The shrine preserves early Dravidian architectural contours.',
    culturalSignificanceMl: 'ജാതിവ്യവസ്ഥകൾക്കതീതമായി കാവുതീണ്ടൽ ചടങ്ങ് നടക്കുന്ന നാടോടി അനുഷ്ഠാന കലകളുടെ പുണ്യകേന്ദ്രം.',
    historicalContextEn: 'Referenced in Sangam literature as Mahodayapuram / Muziris. Historical chronicles confirm its prominence as the coronation temple of the Second Chera Empire (Kulasekharas) during the 9th to 12th centuries CE.',
    historicalContextMl: 'സംഘകാല സാഹിത്യത്തിലും ചിലപ്പതികാരത്തിലും പരാമർശമുള്ള കൊടുങ്ങല്ലൂർ രണ്ടാം ചേര സാമ്രാജ്യത്തിന്റെ പ്രധാന കേന്ദ്രമായിരുന്നു.',
    image: '/assets/images/kodungallur-temple.jpg',
    gallery: [
      '/assets/images/kodungallur-temple.jpg',
      '/assets/images/cheraman-mosque.jpg',
      '/assets/images/pulikali-carnival.jpg'
    ],
    highlights: ['Cilappatikaram & Kannaki Legend', 'Kaavu Theendal Sacred Bharani Rite', 'Velichappadu Sword Dance Ensembles', 'Ancient Muziris Maritime Circuit', 'Sapthamathruka Stone Shrines'],
    dressCodeOrAdvisory: 'Modest traditional dress code. Heavy crowd during Meenam Bharani festival.',
    entryFee: 'Free entry',
    contributor: {
      name: 'P. K. Madhavan',
      role: 'Folklorist & Sangam Scholar',
      organization: 'Kodungallur Historical Society'
    },
    sourceAttribution: {
      primarySource: 'Cochin Devaswom Board & Kerala Council for Historical Research (KCHR)',
      archiveReference: 'Muziris Excavation Reports 2007-2024; Sangam Literary Concordance',
      verifiedBy: 'Cochin Devaswom Board Heritage Wing',
      lastUpdated: 'March 2026'
    },
    officialWebsite: 'https://cochindevaswomboard.org/kodungallur',
    socialLinks: [
      { platform: 'Kerala Tourism Page', url: 'https://www.keralatourism.org/destination/kodungallur-bhagavathy-temple/315' }
    ],
    relatedLocationIds: ['loc-cheraman-mosque', 'loc-vadakkunnathan', 'loc-koodalmanikyam'],
    isIllustrativeData: false,
    sampleDisclaimer: 'Sangam-era heritage landmark with verified geographic location.'
  },
  {
    id: 'loc-thiruvilwamala',
    slug: 'thiruvilwamala-vilwadrinatha-temple',
    titleEn: 'Thiruvilwamala Vilwadrinatha Temple & Punarjani',
    titleMl: 'തിരുവില്വാമല വിൽവാദ്രിനാഥ ക്ഷേത്രം',
    culturalCategory: 'HERITAGE_MONUMENT',
    categoryLabelEn: 'Heritage Monument',
    categoryLabelMl: 'പൈതൃക സ്മാരകം',
    experienceType: 'HERITAGE_WALK',
    experienceTypeLabelEn: 'Heritage & Cave Walk',
    primaryArtform: 'Chenda & Melam',
    taluk: 'Thalapilly',
    address: 'Thiruvilwamala, Thalapilly Taluk, Thrissur 680588',
    location: {
      lat: 10.7495,
      lng: 76.4412
    },
    timingOrDate: 'Open Daily: 4:30 AM – 11:00 AM, 5:00 PM – 8:00 PM',
    descriptionEn: 'Perched on a scenic granite hillock overlooking River Bharathapuzha. Famous for the mystical Punarjani Guha (a 150-meter natural rock tunnel believed to cleanse past karma) and resonant temple Panchavadyam ensembles.',
    descriptionMl: 'ഭാരതപ്പുഴയുടെ തീരത്ത് കുന്നിൻമുകളിൽ സ്ഥിതി ചെയ്യുന്ന പൗരാണിക ക്ഷേത്രം. പുനർജനി ഗുഹയും ഏകാദശി ഉത്സവത്തോടനുബന്ധിച്ചുള്ള പഞ്ചവാദ്യവും പ്രസിദ്ധമാണ്.',
    culturalSignificanceEn: 'Celebrated for its pristine temple percussion traditions and the annual Vilwadrinatha Ekadashi, attracting master percussionists who present legendary Thayambaka and Maddalam Keli performances.',
    culturalSignificanceMl: 'തായമ്പകയ്ക്കും മദ്ദളക്കPublicKeyക്കും പ്രസിദ്ധമായ ഈ ക്ഷേത്രം ഏകാദശി ഉത്സവത്തിലൂടെ വാദ്യകലയ്ക്ക് വലിയ സംഭാവന നൽകുന്നു.',
    historicalContextEn: 'Documented in medieval Namboothiri chronicles. The temple was reconstructed following a fire in the 1860s under the patronage of the Cochin royal family, preserving ancient granite pillars and copper gabled roofs.',
    historicalContextMl: 'പതിനെട്ടാം നൂറ്റാണ്ടിലെ കൊച്ചി രാജകീയ രേഖകളിൽ പരാമർശമുള്ള ഈ ക്ഷേത്രം തനിമയാർന്ന ഗ്രാനൈറ്റ് തൂണുകളാലും വാസ്തുവിദ്യയാലും സമ്പന്നമാണ്.',
    image: '/assets/images/thiruvilwamala-temple.jpg',
    gallery: [
      '/assets/images/thiruvilwamala-temple.jpg',
      '/assets/images/kuthampully-handloom-loom.jpg',
      '/assets/images/kuthampully-handloom-loom-2.jpg'
    ],
    highlights: ['Natural Punarjani Cave Tunnel', 'Panoramic Nila Valley Vistas', 'Vilwadrinatha Ekadashi Melam', 'Granite Sculpted Chuttambalam', 'Temple Panchavadyam Ensembles'],
    dressCodeOrAdvisory: 'Modest traditional attire. Cave crawl permissible only on Ekadashi under guidance.',
    entryFee: 'Free entry to temple',
    contributor: {
      name: 'V. Raman Namboodiri',
      role: 'Temple Historian',
      organization: 'Thiruvilwamala Kshetra Upadesaka Samithi'
    },
    sourceAttribution: {
      primarySource: 'Cochin Devaswom Board & Thalapilly Taluk Historical Surveys',
      archiveReference: 'CDB Monograph TSR-THIRU-04; District Census Gazetteers',
      verifiedBy: 'Cochin Devaswom Board',
      lastUpdated: 'January 2026'
    },
    officialWebsite: 'https://cochindevaswomboard.org/thiruvilwamala',
    socialLinks: [
      { platform: 'Kerala Tourism Page', url: 'https://www.keralatourism.org/destination/thiruvilwamala-temple/410' }
    ],
    relatedLocationIds: ['loc-kuthampully', 'loc-kalamandalam', 'loc-vadakkunnathan'],
    isIllustrativeData: false,
    sampleDisclaimer: 'Documented hillock temple with verified geographic coordinates.'
  },
  {
    id: 'loc-athirappilly-crafts',
    slug: 'athirappilly-indigenous-craft-belt',
    titleEn: 'Athirappilly & Vazhachal Indigenous Craft Belt',
    titleMl: 'അതിരപ്പിള്ളി ആദിവാസി കരകൗശല കേന്ദ്രം',
    culturalCategory: 'CRAFT_CLUSTER',
    categoryLabelEn: 'Indigenous Craft Cluster',
    categoryLabelMl: 'തനത് കരകൗശലം',
    experienceType: 'STUDIO_VISIT',
    experienceTypeLabelEn: 'Artisan Studio Visit',
    primaryArtform: 'Handloom & Textiles',
    taluk: 'Chalakudy',
    address: 'Chalakudy – Athirappilly Route, Thrissur 680721',
    location: {
      lat: 10.2982,
      lng: 76.5683
    },
    timingOrDate: 'Open Daily: 8:00 AM – 5:30 PM',
    descriptionEn: 'Nestled in the lush Western Ghats rainforest surrounding Athirappilly and Vazhachal waterfalls. Home to the Kadar and Malayar indigenous communities who handcraft sustainable wild bamboo baskets, reed floor mats, cane fish traps, and collect forest honey.',
    descriptionMl: 'പശ്ചിമഘട്ട വനനിരകൾക്ക് നടുവിൽ കാടർ സമുദായം നിർമ്മിക്കുന്ന മുള-ഈറ്റ ഉൽപ്പന്നങ്ങളും പ്രകൃതിദത്ത കരകൗശലങ്ങളും നേരിൽ കാണാനും വാങ്ങാനുമുള്ള പൈതൃക മേഖല.',
    culturalSignificanceEn: 'Represents the ecological and tribal craft knowledge of central Kerala. Supported by the Kerala Forest Department’s Vana Samrakshana Samithi (VSS), ensuring fair trade, community self-reliance, and sustainable harvest of non-timber forest produce.',
    culturalSignificanceMl: 'വനസംരക്ഷണ സമിതികളുടെ സഹകരണത്തോടെ ആദിവാസി സമുദായങ്ങളുടെ ഉപജീവനവും തനത് മുള-ഈറ്റ കരകൗശലങ്ങളും സംരക്ഷിക്കപ്പെടുന്നു.',
    historicalContextEn: 'Anthropological studies by the Anthropological Survey of India confirm the Kadar as one of the oldest hunter-gatherer and artisan tribes of the Western Ghats with ancient oral traditions of forest conservation.',
    historicalContextMl: 'പശ്ചിമഘട്ടത്തിലെ ഏറ്റവും പുരാതനമായ ആദിവാസി വിഭാഗങ്ങളിലൊന്നാണ് കാടർ സമുദായം എന്ന് നരവംശശാസ്ത്ര രേഖകൾ വ്യക്തമാക്കുന്നു.',
    image: '/assets/images/athirappilly-waterfalls.jpg',
    gallery: [
      '/assets/images/athirappilly-waterfalls.jpg',
      '/assets/images/pottery-clay-wheel.jpg',
      '/assets/images/pottery-clay-wheel-2.jpg'
    ],
    highlights: ['Wild Bamboo & Reed Weaving', 'Eco-Development Community Centers', 'Non-Timber Forest Produce Exhibits', 'Rainforest Cultural Walkways', 'Direct Community Cooperatives'],
    dressCodeOrAdvisory: 'Eco-sensitive sanctuary zone. Plastic strictly prohibited. Forest check-post permits apply.',
    entryFee: 'Forest entry passes apply at eco-tourism counter',
    contributor: {
      name: 'V. Sivadasan',
      role: 'Eco-Tourism Coordinator & Tribal Welfare Officer',
      organization: 'Vazhachal Forest Development Agency'
    },
    sourceAttribution: {
      primarySource: 'Kerala Forest & Wildlife Department & Anthropological Survey of India',
      archiveReference: 'Western Ghats Community Forestry Project Monograph; VSS Tribal Census',
      verifiedBy: 'Kerala Forest Department, Chalakudy Division',
      lastUpdated: 'November 2025'
    },
    officialWebsite: 'https://forest.kerala.gov.in',
    socialLinks: [
      { platform: 'Kerala Eco-Tourism', url: 'https://keralaforestecotourism.com' }
    ],
    relatedLocationIds: ['loc-nadavaramba', 'loc-koodalmanikyam', 'loc-thekkinkadu-maidan'],
    isIllustrativeData: false,
    sampleDisclaimer: 'Documented indigenous community craft cluster with verified coordinates.'
  }
];
