import { Artform, Artist, HeritageLocation, CulturalEvent, Workshop, CommunityStory, ModerationItem } from '../types';
import { CULTURAL_EVENTS_MASTER_DATA } from './culturalEventsData';

export const ARTFORMS_DATA: Artform[] = [
  {
    id: 'art-kathakali',
    slug: 'kathakali',
    nameEn: 'Kathakali',
    nameMl: 'കഥകളി',
    category: 'PERFORMING_CLASSICAL',
    categoryLabelEn: 'Classical Performing Art',
    categoryLabelMl: 'ശാസ്ത്രീയ കല',
    descriptionEn: 'The iconic classical dance-drama of Kerala renowned for its elaborate makeup (Chutti), magnificent headgear (Kireedam), vibrant costumes, and intricate facial expressions (Navarasas) accompanied by Sopana Sangeetham and percussion.',
    descriptionMl: 'കേരളത്തിന്റെ അഭിമാനമായ ദൃശ്യവിസ്മയം. വിസ്തൃതമായ ചുട്ടി, തിളങ്ങുന്ന കിരീടങ്ങൾ, വർണ്ണാഭമായ വേഷങ്ങൾ, നവരസങ്ങൾ തുളുമ്പുന്ന മുഖഭാവങ്ങൾ എന്നിവയാൽ സമ്പന്നമായ ശാസ്ത്രീയ നൃത്തനാടകം.',
    historyEn: 'Evolved in the 17th century under the patronage of the Kottarakkara Thampuran from Ramanattam, Kathakali was revived in modern times by Mahakavi Vallathol Narayana Menon with the founding of Kerala Kalamandalam at Cheruthuruthy, Thrissur.',
    historyMl: 'പതിനേഴാം നൂറ്റാണ്ടിൽ കൊട്ടാരക്കര തമ്പുരാന്റെ രാമനാട്ടത്തിൽ നിന്ന് ഉത്ഭവിച്ച കഥകളിയെ ആധുനിക കാലത്ത് പുനരുജ്ജീവിപ്പിച്ചത് മഹാകവി വള്ളത്തോൾ നാരായണമേനോൻ തൃശ്ശൂരിലെ ചെറുതുരുത്തിയിൽ കേരള കലാമണ്ഡലം സ്ഥാപിച്ചതോടെയാണ്.',
    instruments: ['Chenda', 'Maddalam', 'Chengila', 'Ilathalam'],
    coverImage: '/assets/images/kathakali-hero.jpg',
    originLocation: 'Cheruthuruthy, Thrissur',
  },
  {
    id: 'art-koodiyattam',
    slug: 'koodiyattam',
    nameEn: 'Koodiyattam',
    nameMl: 'കൂടിയാട്ടം',
    category: 'PERFORMING_CLASSICAL',
    categoryLabelEn: 'UNESCO Intangible Heritage',
    categoryLabelMl: 'യുനെസ്കോ പൈതൃക കല',
    descriptionEn: 'Recognized by UNESCO as a Masterpiece of the Oral and Intangible Heritage of Humanity, Koodiyattam is the world\'s oldest surviving Sanskrit theatre tradition, preserved for over 1,800 years in the Koothambalams of Thrissur temples.',
    descriptionMl: 'മാനവരാശിയുടെ പൈതൃകമായി യുനെസ്കോ അംഗീകരിച്ച ലോകത്തിലെ ഏറ്റവും പഴക്കം ചെന്ന സംസ്കൃത നാടകരൂപം. തൃശ്ശൂരിലെ കൂത്തമ്പലങ്ങളിൽ 1800-ലധികം വർഷങ്ങളായി സംരക്ഷിക്കപ്പെടുന്ന വിശുദ്ധ കലാരൂപം.',
    historyEn: 'Historically enacted by the Chakyar community accompanied by the Nangiars playing the sacred pot drum (Mizhavu), Koodiyattam reached its highest aesthetic zenith in Thrissur under the guidance of legendary masters like Painkulam Rama Chakyar and Ammannur Madhava Chakyar.',
    historyMl: 'ചാക്യാർ സമുദായവും മിഴാവ് വാദ്യവുമായി നങ്ങ്യാർമാരും ചേർന്ന് ക്ഷേത്രങ്ങളിലെ കൂത്തമ്പലങ്ങളിൽ അവതരിപ്പിച്ചുപോന്ന കൂടിയാട്ടത്തിന് അന്താരാഷ്ട്ര പ്രശസ്തി നേടിക്കൊടുത്തത് തൃശ്ശൂരിലെ മഹാപ്രതിഭകളാണ്.',
    instruments: ['Mizhavu', 'Edakka', 'Kuzhithalam', 'Sanku'],
    coverImage: '/assets/images/koodiyattam-theatre.jpg',
    isUnesco: true,
    originLocation: 'Vadakkunnathan & Irinjalakuda Koothambalam',
  },
  {
    id: 'art-melam',
    slug: 'pandi-melam',
    nameEn: 'Pandi Melam & Panchavadyam',
    nameMl: 'പാണ്ടിമേളവും പഞ്ചവാദ്യവും',
    category: 'PERCUSSION_MELAM',
    categoryLabelEn: 'Temple Percussion Ensemble',
    categoryLabelMl: 'ക്ഷേത്ര വാദ്യമേളം',
    descriptionEn: 'The sonic heartbeat of Thrissur. Panchavadyam harmonizes five sacred acoustic instruments, while Pandi Melam unites up to 250 percussionists in rhythmic crescendo under the golden afternoon sun during the Ilanjithara Melam of Thrissur Pooram.',
    descriptionMl: 'തൃശ്ശൂരിന്റെ ഹൃദയമിടിപ്പായ താളവിസ്മയം. തിമില, മദ്ദളം, ഇടയ്ക്ക, ഇലത്താളം, കൊമ്പ് എന്നീ പഞ്ചവാദ്യങ്ങളുടെ സമന്വയവും ഇലഞ്ഞിത്തറയിലെ ഇരുന്നൂറ്റമ്പതോളം മേളപ്രമാണിമാരുടെ പാണ്ടിമേളവും ലോകപ്രസിദ്ധമാണ്.',
    historyEn: 'Refined over centuries in central Kerala, the percussion traditions of Thrissur follow strict mathematical tala structures (Adantha, Chembada, Panchari) that build through progressive tempos from slow majesty to thunderous climax.',
    historyMl: 'തലമുറകളായി പകർന്നുപോന്ന കണിശമായ താളശാസ്ത്ര നിയമങ്ങളാൽ നിർമ്മിതമായ പാണ്ടിമേളവും പഞ്ചവാദ്യവും ലോകത്തെ ഏറ്റവും വലിയ അക്കോസ്റ്റിക് വാദ്യവിസ്മയമാണ്.',
    instruments: ['Chenda (Uruttu & Veekku)', 'Thimila', 'Maddalam', 'Edakka', 'Ilathalam', 'Kombu', 'Kuzhal'],
    coverImage: '/assets/images/chenda-melam.jpg',
    originLocation: 'Thekkinkadu Maidan, Thrissur',
  },
  {
    id: 'art-pulikali',
    slug: 'pulikali',
    nameEn: 'Pulikali (Tiger Dance)',
    nameMl: 'പുലിക്കളി',
    category: 'FOLK_RITUAL',
    categoryLabelEn: 'Vibrant Folk Dance',
    categoryLabelMl: 'നാടോടി കലാരൂപം',
    descriptionEn: 'A roaring 200-year-old folk extravaganza where hundreds of performers paint their bodies as majestic tigers, leopards, and hunters, dancing to the hypnotic rhythms of Udukku and Thakkil around Swaraj Round on the fourth day of Onam.',
    descriptionMl: 'ഓണത്തിന്റെ നാലാം നാളിൽ തൃശ്ശൂർ സ്വരാജ് റൗണ്ടിനെ ഇളക്കിമറിക്കുന്ന ഇരുന്നൂറ് വർഷം പഴക്കമുള്ള നാടോടി ഉത്സവ കല. ശരീരമാകെ പുലിവരകളണിഞ്ഞ് ഉടുക്കിന്റെയും താക്കിലിന്റെയും താളത്തിൽ ചുവടുവെക്കുന്ന പുലികൾ.',
    historyEn: 'Introduced by Maharaja Sakthan Thampuran, the former ruler of Cochin, to celebrate Onam with bold martial spirit and uninhibited festive joy that unites every community in Thrissur.',
    historyMl: 'ശക്തൻ തമ്പുരാന്റെ കാലത്ത് ധീരതയും ഉത്സവപ്രതീതിയും പ്രതിഫലിപ്പിക്കാൻ ആരംഭിച്ചതാണ് തൃശ്ശൂരിന്റെ സ്വന്തം പുലിക്കളി.',
    instruments: ['Udukku', 'Thakkil', 'Chenda'],
    coverImage: '/assets/images/pulikali-carnival.jpg',
    originLocation: 'Swaraj Round, Thrissur',
  },
  {
    id: 'art-kuthampully',
    slug: 'kuthampully-handloom',
    nameEn: 'Kuthampully Handloom',
    nameMl: 'കുത്തമ്പുള്ളി കൈത്തറി',
    category: 'HANDLOOM_TEXTILE',
    categoryLabelEn: 'GI Tagged Heritage Textile',
    categoryLabelMl: 'ഭൗമസൂചികാ പദവിയുള്ള കൈത്തറി',
    descriptionEn: 'World-renowned handwoven Kasavu sarees and traditional dhotis crafted with unbleached natural cotton and pure jacquard gold zari borders by the traditional Devanga weavers settled on the banks of Bharathapuzha.',
    descriptionMl: 'ഭാരതപ്പുഴയുടെ തീരത്ത് തലമുറകളായി നെയ്യപ്പെടുന്ന സ്വർണ്ണകസവണിഞ്ഞ പാരമ്പര്യ പട്ടുസാരികളും മുണ്ടുകളും. ശുദ്ധമായ പരുത്തിയും സ്വർണ്ണച്ചരടും ചേരുന്ന ലോകോത്തര കൈത്തറി പെരുമ.',
    historyEn: 'Brought to Thiruvilwamala 500 years ago by the Cochin royal family, the master weavers of Kuthampully received the coveted Geographical Indication (GI) status in 2011 for their immaculate purity and geometric border motifs.',
    historyMl: 'കൊച്ചി രാജകുടുംബത്തിന്റെ ക്ഷണപ്രകാരം അഞ്ഞൂറ് വർഷങ്ങൾക്ക് മുൻപ് തിരുവില്വാമലയിൽ എത്തിയ ദേവാംഗ നെയ്ത്തുകാരുടെ കല. 2011-ൽ ഭൗമസൂചികാ പദവി (GI Tag) ലഭിച്ചു.',
    instruments: ['Traditional Pit Loom', 'Fly Shuttle', 'Jacquard Machine'],
    coverImage: '/assets/images/kuthampully-handloom-loom.jpg',
    isGiTagged: true,
    giTagYear: '2011',
    originLocation: 'Thiruvilwamala, Thrissur',
  },
  {
    id: 'art-nadavaramba',
    slug: 'nadavaramba-bell-metal',
    nameEn: 'Nadavaramba Bell Metal & Bronze',
    nameMl: 'നടവരമ്പ് വെങ്കല ശിൽപകല',
    category: 'CRAFT_SCULPTURE',
    categoryLabelEn: 'GI Tagged Metallurgical Craft',
    categoryLabelMl: 'ഭൗമസൂചികാ പദവിയുള്ള വെങ്കല ശിൽപം',
    descriptionEn: 'Centuries-old lost-wax casting of bronze alloy (Panchaloham / Odu) creating resonant temple bells, resplendent Nilavilakku (sacred lamps), Urulis, and divine deities renowned for their sonic resonance and mirror-like golden finish.',
    descriptionMl: 'പരമ്പരാഗത മെഴുക് അച്ചുകളിൽ (Lost-wax process) വെങ്കലം ഉരുക്കിയൊഴിച്ച് നിർമ്മിക്കുന്ന അതിവിശിഷ്ടമായ നിലവിളക്കുകൾ, ഉരുളികൾ, ക്ഷേത്രമണികൾ എന്നിവയുടെ തട്ടകമാണ് നടവരമ്പ്.',
    historyEn: 'Preserved by the Moosari craftsmen lineages of Nadavaramba village near Irinjalakuda, this craft blends ancient metallurgical mastery with temple ritual science, recognized with a Geographical Indication tag.',
    historyMl: 'ഇരിഞ്ഞാലക്കുടയ്ക്കടുത്തുള്ള നടവരമ്പിലെ മൂശാരിമാരുടെ തലമുറകളായുള്ള ലോഹവിസ്മയം ഭൗമസൂചികാ പദവിയിലൂടെ ആഗോളതലത്തിൽ ആദരിക്കപ്പെട്ടു.',
    instruments: ['Crucible Furnace', 'Lost Wax Moulds', 'Hand Chisel', 'Polishing Lathe'],
    coverImage: '/assets/images/nadavaramba-bronze-nilavilakku.jpg',
    isGiTagged: true,
    giTagYear: '2019',
    originLocation: 'Nadavaramba, Irinjalakuda, Thrissur',
  },
  {
    id: 'art-mural',
    slug: 'kerala-mural-painting',
    nameEn: 'Kerala Mural Painting',
    nameMl: 'ചുവർചിത്രകല',
    category: 'CRAFT_SCULPTURE',
    categoryLabelEn: 'Traditional Temple Murals',
    categoryLabelMl: 'ക്ഷേത്ര ചുവർചിത്രം',
    descriptionEn: 'Breathtaking fresco-secco murals executed using only five natural mineral and herbal pigments (Panchavarna: red, yellow, green, black, and white) depicting epic deities with flowing contours, expressive almond eyes, and celestial iconography.',
    descriptionMl: 'പ്രകൃതിദത്തമായ പഞ്ചവർണ്ണങ്ങൾ (മഞ്ഞ, ചുവപ്പ്, പച്ച, കറുപ്പ്, വെളുപ്പ്) മാത്രം ഉപയോഗിച്ച് ക്ഷേത്രഭിത്തികളിൽ രചിക്കപ്പെടുന്ന അതിലോലമായ ദേവചിത്രങ്ങൾ. വടക്കുന്നാഥനിലെ ചുവർചിത്രങ്ങൾ ഇതിന്റെ ഉത്തമ മാതൃകയാണ്.',
    historyEn: 'The 15th-17th century murals at Vadakkunnathan Temple in Thrissur represent the pinnacle of this artform, painted using vegetable extracts, laterite rock pigments, and neem gum bindings.',
    historyMl: 'വടക്കുന്നാഥ ക്ഷേത്രത്തിലെ പതിനഞ്ചാം നൂറ്റാണ്ടിലെ ചുവർചിത്രങ്ങൾ ഈ ശൈലിയുടെ അത്യുദാത്തമായ ഉദാഹരണമാണ്.',
    instruments: ['Bamboo Brushes', 'Kora Stone Pigments', 'Natural Neem Binder', 'Coconut Shell Bowls'],
    coverImage: '/assets/images/kerala-mural-temple.jpg',
    originLocation: 'Vadakkunnathan & Guruvayur, Thrissur',
  },
  {
    id: 'art-mohiniyattam',
    slug: 'mohiniyattam',
    nameEn: 'Mohiniyattam',
    nameMl: 'മോഹിനിയാട്ടം',
    category: 'PERFORMING_CLASSICAL',
    categoryLabelEn: 'Lyrical Classical Dance',
    categoryLabelMl: 'ലാസ്യഭാവ ശാസ്ത്രീയ നൃത്തം',
    descriptionEn: 'The graceful, lyrical classical dance of Kerala characterized by undulating torso movements reminiscent of swaying palm trees and ocean waves, draped in pristine white and gold Kasavu costume.',
    descriptionMl: 'കേരളത്തിന്റെ തനത് ലാസ്യനൃത്തം. കാറ്റിൽ ആടിയുലയുന്ന തെങ്ങോലകളെയും കടൽത്തിരകളെയും അനുസ്മരിപ്പിക്കുന്ന മനോഹരമായ ശരീരചലനങ്ങളും ശുദ്ധമായ കസവു വസ്ത്രങ്ങളും മുല്ലപ്പൂ ചൂടിയ കേശാലങ്കാരവും.',
    historyEn: 'Codified and refined by Swathi Thirunal and rejuvenated at Kerala Kalamandalam under the visionary guidance of Vallathol and legendary guru Kalyanikutty Amma.',
    historyMl: 'സ്വാതിതിരുനാളിന്റെ കാലത്ത് ചിട്ടപ്പെടുത്തി, പിന്നീട് കേരള കലാമണ്ഡലത്തിലൂടെ വീണ്ടെടുക്കപ്പെട്ട മോഹിനിയാട്ടം ലാസ്യഭാവത്തിന്റെ പൂർണ്ണതയാണ്.',
    instruments: ['Maddalam', 'Edakka', 'Kuzhithalam', 'Violin', 'Veena'],
    coverImage: '/assets/images/mohiniyattam-dance.jpg',
    originLocation: 'Cheruthuruthy, Thrissur',
  }
];

export const ARTISTS_DATA: Artist[] = [
  {
    id: 'artist-peruvanam',
    name: 'Peruvanam Kuttan Marar',
    stageName: 'Padma Shri Peruvanam Kuttan Marar',
    avatar: '/assets/images/peruvanam-kuttan-marar.jpg',
    bioEn: 'For over 25 consecutive years, Peruvanam Kuttan Marar has led the historic Ilanjithara Melam at the Thrissur Pooram with over 250 master percussionists under his baton. A master of Pandi Melam, Panchari Melam, and Thayambaka.',
    bioMl: 'തൃശ്ശൂർ പൂരത്തിലെ ചരിത്രപ്രസിദ്ധമായ ഇലഞ്ഞിത്തറ മേളത്തിന് കാൽനൂറ്റാണ്ടിലേറെ പ്രമാണ്യം വഹിച്ച പത്മശ്രീ ജേതാവ്. മേളകലയുടെ സാമ്രാട്ട്.',
    primaryArtformId: 'art-melam',
    primaryArtformName: 'Pandi Melam & Chenda',
    guruLineage: 'Peruvanam Appu Marar & Kumarapuram Appu Marar',
    experienceYears: 48,
    studioName: 'Peruvanam Melam Kalari',
    studioAddress: 'Peruvanam, Cherpu, Thrissur, Kerala 680561',
    taluk: 'Thrissur',
    location: { lat: 10.4286, lng: 76.2238 },
    contactPhone: '+91 94470 12345',
    whatsappNumber: '+919447012345',
    isVerified: true,
    verificationBadge: 'VERIFIED_MASTER',
    awards: ['Padma Shri (2011)', 'Sangeet Natak Akademi Award', 'Kerala Sangeetha Nataka Akademi Fellowship'],
    artworks: [
      {
        id: 'art-peruvanam-1',
        artistId: 'artist-peruvanam',
        artistName: 'Peruvanam Kuttan Marar',
        titleEn: 'The Roar of Ilanjithara Melam',
        titleMl: 'ഇലഞ്ഞിത്തറയിലെ മേളഗർജ്ജനം',
        artformId: 'art-melam',
        artformName: 'Pandi Melam',
        craftTechnique: 'Acoustic orchestration in Adantha Thaalam with 250 master percussionists.',
        medium: 'Live Percussion Concert / Chenda & Ilathalam',
        yearCreated: 2025,
        images: ['/assets/images/ilanjithara-melam.jpg'],
        isForSale: false,
        storyEn: 'Capturing the sublime moment when the Ilanjithara Melam transitions into its fifth and fastest rhythm cycle (Kalam), shaking the roots of the centuries-old Ilanji tree.',
        storyMl: 'ഇലഞ്ഞിത്തറയിൽ അഞ്ചാം കാലത്തിലേക്ക് മേളം കടക്കുമ്പോൾ ആകാശമുയരുന്ന ചെണ്ടയുടെയും ഇലത്താളങ്ങളുടെയും നാദവിസ്മയം.',
        viewsCount: 14200,
        likesCount: 2380,
      }
    ]
  },
  {
    id: 'artist-sivan',
    name: 'Kalamandalam Sivan Namboodiri',
    stageName: 'Kalamandalam Sivan Namboodiri',
    avatar: '/assets/images/kalamandalam-sivan-portrait.jpg',
    bioEn: 'Pioneering master of Koodiyattam and the first non-Chakyar artist to break caste barriers and learn the ancient art form at Kerala Kalamandalam under Guru Painkulam Rama Chakyar. Has performed Koodiyattam globally in over 30 countries.',
    bioMl: 'കൂടിയാട്ട രംഗത്ത് ചരിത്രം കുറിച്ച പ്രതിഭ. പൈങ്കുളം രാമച്ചാക്യാരുടെ പ്രഥമ ശിഷ്യൻ. മുപ്പതിലധികം രാജ്യങ്ങളിൽ സംസ്കൃത നാടകം അവതരിപ്പിച്ചു.',
    primaryArtformId: 'art-koodiyattam',
    primaryArtformName: 'Koodiyattam & Chakyar Koothu',
    guruLineage: 'Painkulam Rama Chakyar (Kerala Kalamandalam)',
    experienceYears: 45,
    studioName: 'Natanakairali Sanskrit Theatre Studio',
    studioAddress: 'Cheruthuruthy, Thrissur, Kerala 679531',
    taluk: 'Thalapilly',
    location: { lat: 10.7483, lng: 76.2798 },
    contactPhone: '+91 94460 56789',
    whatsappNumber: '+919446056789',
    isVerified: true,
    verificationBadge: 'VERIFIED_MASTER',
    awards: ['Sangeet Natak Akademi Award', 'Kerala State Nataka Puraskaram', 'Kalamandalam Award'],
    artworks: [
      {
        id: 'art-sivan-1',
        artistId: 'artist-sivan',
        artistName: 'Kalamandalam Sivan Namboodiri',
        titleEn: 'Ravana\'s Torment in Toranayuddham',
        titleMl: 'തോരണയുദ്ധത്തിലെ രാവണന്റെ തപസ്സ്',
        artformId: 'art-koodiyattam',
        artformName: 'Koodiyattam',
        craftTechnique: 'Netrabhinaya (Eye expression) and Pakarnattam solo transformation.',
        medium: 'Sanskrit Dramatic Performance',
        yearCreated: 2024,
        images: ['/assets/images/koodiyattam-theatre-2.jpg'],
        isForSale: false,
        storyEn: 'Demonstrating the pinnacle of Sanskrit theatrical acting where Ravana remembers Mount Kailasa, enacted through 45 continuous minutes of pure eye movements.',
        storyMl: 'കൈലാസോദ്ധാരണം 45 മിനിറ്റ് നേരം കേവലം നേത്രാഭിനയത്തിലൂടെ വിസ്മയകരമായി പുനഃസൃഷ്ടിക്കുന്ന അപൂർവ്വ രംഗം.',
        viewsCount: 9800,
        likesCount: 1750,
      }
    ]
  },
  {
    id: 'artist-kuthampully-weaver',
    name: 'K. V. Ramanathan Achari',
    stageName: 'Master Weaver Ramanathan',
    avatar: '/assets/images/kuthampully-handloom-loom-2.jpg',
    bioEn: 'Sixth-generation master handloom weaver at the Kuthampully Handloom Industrial Cooperative Society. Specializes in 100-count ultra-fine cotton Kasavu sarees woven with natural plant extracts and 24-carat gold zari motifs.',
    bioMl: 'കുത്തമ്പുള്ളി പാരമ്പര്യ നെയ്ത്തിലെ ആറാം തലമുറക്കാരൻ. നൂറു ശതമാനം പ്രകൃതിദത്ത പരുത്തിയും സ്വർണ്ണക്കസവും ചേർത്തൊരുക്കുന്ന അത്യപൂർവ്വ സാരികളുടെ സ്രഷ്ടാവ്.',
    primaryArtformId: 'art-kuthampully',
    primaryArtformName: 'Kuthampully Handloom Weaving',
    guruLineage: 'K. Viswanathan Master (Devanga Guild)',
    experienceYears: 36,
    studioName: 'Kuthampully Royal Heritage Looms',
    studioAddress: 'Weavers Street, Kuthampully, Thiruvilwamala, Thrissur 680594',
    taluk: 'Thalapilly',
    location: { lat: 10.7412, lng: 76.4385 },
    contactPhone: '+91 98472 88990',
    whatsappNumber: '+919847288990',
    isVerified: true,
    verificationBadge: 'HERITAGE_GUILD',
    awards: ['National Master Craftsperson Award (2018)', 'Kerala State Handloom Excellence Award'],
    artworks: [
      {
        id: 'art-kuth-1',
        artistId: 'artist-kuthampully-weaver',
        artistName: 'K. V. Ramanathan Achari',
        titleEn: 'Mayilkan (Peacock Eye) Kasavu Saree',
        titleMl: 'മയിൽക്കണ്ണ് കസവു സാരി',
        artformId: 'art-kuthampully',
        artformName: 'Kuthampully Handloom',
        craftTechnique: 'Pit-loom jacquard weaving using unbleached combed cotton and pure silver-gold zari.',
        medium: 'Handwoven Textile (Cotton & Zari)',
        dimensions: '6.25 meters with blouse piece',
        yearCreated: 2025,
        images: ['/assets/images/kuthampully-handloom-loom.jpg'],
        price: '₹14,500',
        isForSale: true,
        storyEn: 'Takes 18 days of continuous manual weaving on a pit-loom. The Mayilkan pattern represents prosperity in classical Kerala tradition.',
        storyMl: 'പതിനെട്ടു ദിവസത്തെ തുടർച്ചയായ കൈത്തറി അധ്വാനത്തിൽ പിറന്ന മയിൽക്കൺ ഡിസൈൻ സാരി.',
        viewsCount: 18900,
        likesCount: 3410,
      }
    ]
  },
  {
    id: 'artist-nadavaramba-sculptor',
    name: 'Nadavaramba Balan Moosari',
    stageName: 'Balan Master of Nadavaramba',
    avatar: '/assets/images/nadavaramba-bronze-nilavilakku-2.jpg',
    bioEn: 'Custodian of the ancient lost-wax bell metal casting tradition in Nadavaramba. Creates traditional ceremonial Nilavilakkus standing over 8 feet tall and acoustically tuned temple bells that reverberate across centuries.',
    bioMl: 'നടവരമ്പിലെ പരമ്പരാഗത വെങ്കല ശിൽപി. എട്ടടിയിലേറെ ഉയരമുള്ള അലങ്കാര നിലവിളക്കുകളും നാദസുരഭിലമായ ക്ഷേത്രമണികളും മെഴുക് അച്ചുകളിൽ വാർത്തെടുക്കുന്നു.',
    primaryArtformId: 'art-nadavaramba',
    primaryArtformName: 'Bell Metal & Bronze Casting',
    guruLineage: 'Kesavan Moosari (Generational Bell Metal Guild)',
    experienceYears: 42,
    studioName: 'Nadavaramba Traditional Bronze Atelier',
    studioAddress: 'Bell Metal Lane, Nadavaramba, Irinjalakuda, Thrissur 680699',
    taluk: 'Mukundapuram',
    location: { lat: 10.3341, lng: 76.2305 },
    contactPhone: '+91 94472 33445',
    whatsappNumber: '+919447233445',
    isVerified: true,
    verificationBadge: 'VERIFIED_MASTER',
    awards: ['UNESCO-Craft Seal of Excellence', 'Kerala State Master Craftsman Award'],
    artworks: [
      {
        id: 'art-nada-1',
        artistId: 'artist-nadavaramba-sculptor',
        artistName: 'Nadavaramba Balan Moosari',
        titleEn: 'Aashta Lakshmi Resonant Nilavilakku',
        titleMl: 'അഷ്ടലക്ഷ്മി നിലവിളക്ക്',
        artformId: 'art-nadavaramba',
        artformName: 'Bell Metal & Bronze',
        craftTechnique: 'Lost-wax bell metal casting with 80% copper and 20% tin alloy.',
        medium: 'Bronze Alloy (Bell Metal / Panchaloham)',
        dimensions: 'Height: 48 inches | Weight: 38 kg',
        yearCreated: 2024,
        images: ['/assets/images/nadavaramba-bronze-nilavilakku.jpg'],
        price: '₹48,000',
        isForSale: true,
        storyEn: 'Each petal and Lakshmi motif is meticulously hand-sculpted in bees-wax before being encased in clay and molten bell metal poured at 1100°C.',
        storyMl: 'തേനീച്ചമെഴുകിൽ കൊത്തിയുണ്ടാക്കിയ അച്ചിൽ 1100 ഡിഗ്രിയിൽ വെങ്കലം ഉരുക്കിയൊഴിച്ചുണ്ടാക്കിയ അതിവിശിഷ്ട നിലവിളക്ക്.',
        viewsCount: 12400,
        likesCount: 2190,
      }
    ]
  },
  {
    id: 'artist-muralist',
    name: 'Suresh Kumar Marar',
    stageName: 'Muralist Suresh Thrissur',
    avatar: '/assets/images/kerala-mural-ganesha.jpg',
    bioEn: 'Trained at the Guruvayur Institute of Mural Painting. Dedicated to preserving ancient Dhyana Shlokas using 100% natural vegetable and mineral extracts on seasoned teak wood and temple walls across Kerala.',
    bioMl: 'ഗുരുവായൂർ ചുവർചിത്ര പഠനകേന്ദ്രത്തിൽ നിന്ന് ബിരുദം നേടിയ പ്രതിഭ. സ്വാഭാവിക വർണ്ണങ്ങൾ മാത്രം ഉപയോഗിച്ച് തേക്ക് പലകകളിലും ക്ഷേത്രങ്ങളിലും ചുവർചിത്രങ്ങൾ വരയ്ക്കുന്നു.',
    primaryArtformId: 'art-mural',
    primaryArtformName: 'Traditional Temple Murals',
    guruLineage: 'Mammiyur Krishnankutty Nair (Guruvayur Devaswom)',
    experienceYears: 28,
    studioName: 'Panchavarna Mural Art Gallery',
    studioAddress: 'East Fort, Thrissur, Kerala 680005',
    taluk: 'Thrissur',
    location: { lat: 10.5281, lng: 76.2225 },
    contactPhone: '+91 97451 44556',
    whatsappNumber: '+919745144556',
    isVerified: true,
    verificationBadge: 'VERIFIED_MASTER',
    awards: ['Kerala Lalithakala Akademi State Award', 'National Fellowship for Traditional Artists'],
    artworks: [
      {
        id: 'art-mural-1',
        artistId: 'artist-muralist',
        artistName: 'Suresh Kumar Marar',
        titleEn: 'Ananthashayanam – The Cosmic Slumber',
        titleMl: 'അനന്തശയനം ചുവർചിത്രം',
        artformId: 'art-mural',
        artformName: 'Kerala Mural Painting',
        craftTechnique: 'Natural mineral fresco on seasoned teakwood panel using bamboo brushes.',
        medium: 'Natural Pigments on Seasoned Teak Wood',
        dimensions: '36 x 24 inches',
        yearCreated: 2025,
        images: ['/assets/images/kerala-mural-venugopala.jpg'],
        price: '₹35,000',
        isForSale: true,
        storyEn: 'Created over four months using yellow ochre from laterite stones, red from local hematite rock, green from indigo and eravikkara leaves, and black from mustard oil lamp soot.',
        storyMl: 'നാല് മാസത്തെ തപസ്യയിൽ പ്രകൃതിദത്ത കല്ലുകളും സസ്യച്ചാറുകളും ചേർത്തൊരുക്കിയ വിഷ്ണുവിന്റെ അനന്തശയന രൂപം.',
        viewsCount: 15300,
        likesCount: 2980,
      }
    ]
  }
];

export const HERITAGE_LOCATIONS_DATA: HeritageLocation[] = [
  {
    id: 'heritage-vadakkunnathan',
    slug: 'vadakkunnathan-temple',
    nameEn: 'Vadakkunnathan Temple',
    nameMl: 'ശ്രീ വടക്കുന്നാഥൻ ക്ഷേത്രം',
    category: 'TEMPLE',
    descriptionEn: 'The monumental heart of Thrissur sprawling across 9 acres atop a hillock inside Thekkinkadu Maidan. An exemplary masterpiece of Kerala indigenous wood architecture adorned with centuries-old murals, ancient Koothambalam, and monumental gopurams.',
    descriptionMl: 'തൃശ്ശൂരിന്റെ ഹൃദയഭാഗത്ത് തേക്കിൻകാട് മൈതാനത്തിന് നടുവിൽ സ്ഥിതി ചെയ്യുന്ന പുരാതന ക്ഷേത്ര സമുച്ചയം. തനിമയാർന്ന കേരളീയ വാസ്തുവിദ്യയും അപൂർവ്വ ചുവർചിത്രങ്ങളും കൂത്തമ്പലവും യുനെസ്കോ ഏഷ്യാ-പസഫിക് പുരസ്കാരം നേടിയിട്ടുണ്ട്.',
    architecturalStyle: 'Kerala Wooden Architecture with Copper Pyramidal Roofs',
    historicalEra: '1,000+ Years (Pre-8th Century CE)',
    visitingHours: '4:00 AM – 11:00 AM, 5:00 PM – 8:30 PM',
    entryRulesDressCode: 'Traditional Kerala attire mandatory (Dhoti/Mundu for men; Saree/Salwar for women). Non-Hindus can admire the grand outer prakaram and murals.',
    location: { lat: 10.5244, lng: 76.2144 },
    address: 'Swaraj Round, Thekkinkadu Maidan, Thrissur 680001',
    taluk: 'Thrissur',
    image: '/assets/images/vadakkunnathan-temple.jpg',
    gallery: [
      '/assets/images/vadakkunnathan-temple.jpg',
      '/assets/images/vadakkunnathan-night.jpg'
    ],
    audioGuideAvailable: true,
    audioGuideTitle: 'The Murals and Legend of Vadakkunnathan'
  },
  {
    id: 'heritage-shakthan-palace',
    slug: 'shakthan-thampuran-palace',
    nameEn: 'Shakthan Thampuran Palace',
    nameMl: 'ശക്തൻ തമ്പുരാൻ കൊട്ടാരം',
    category: 'PALACE',
    descriptionEn: 'The historic palace of King Rama Varma Shakthan Thampuran, the legendary architect of modern Thrissur. Built in distinctive Dutch-Kerala architectural style featuring high ceilings, sprawling verandas, and a museum of royal antiques and Megalithic artifacts.',
    descriptionMl: 'ആധുനിക തൃശ്ശൂരിന്റെ ശില്പിയായ ശക്തൻ തമ്പുരാന്റെ ചരിത്രപ്രസിദ്ധമായ കൊട്ടാരം. ഡച്ച്-കേരള വാസ്തുവിദ്യയും രാജകീയ ചരിത്ര മ്യൂസിയവും പൈതൃക ഉദ്യാനവും ഉൾക്കൊള്ളുന്നു.',
    architecturalStyle: 'Dutch-Kerala Colonial Synthesis',
    historicalEra: 'Rebuilt 1795 CE',
    visitingHours: '9:30 AM – 5:00 PM (Closed on Mondays)',
    entryRulesDressCode: 'Casual & modest clothing permitted. Modest entrance fee for museum.',
    location: { lat: 10.5342, lng: 76.2186 },
    address: 'Stadium Road, Chembukkavu, Thrissur 680020',
    taluk: 'Thrissur',
    image: '/assets/images/shakthan-palace.jpg',
    gallery: [
      '/assets/images/shakthan-palace.jpg',
      '/assets/images/bhadrakali-bronze-idol.jpg'
    ],
    audioGuideAvailable: true,
    audioGuideTitle: 'Shakthan Thampuran and the Birth of Thrissur Pooram'
  },
  {
    id: 'heritage-kalamandalam',
    slug: 'kerala-kalamandalam-cheruthuruthy',
    nameEn: 'Kerala Kalamandalam',
    nameMl: 'കേരള കലാമണ്ഡലം ചെറുതുരുത്തി',
    category: 'ACADEMY',
    descriptionEn: 'The sanctum sanctorum of Kerala performing arts founded in 1930 by poet Vallathol Narayana Menon. Operating on the ancient Gurukula system on the banks of River Bharathapuzha, nurturing Kathakali, Koodiyattam, Mohiniyattam, and percussion.',
    descriptionMl: 'ഭാരതപ്പുഴയുടെ തീരത്ത് മഹാകവി വള്ളത്തോൾ സ്ഥാപിച്ച പവിത്രമായ കലാവീട്. ഗുരുശിഷ്യ ബന്ധത്തിലൂടെ കഥകളിയും കൂടിയാട്ടവും മോഹിനിയാട്ടവും സംരക്ഷിക്കുന്ന ലോകോത്തര കലാഗോപുരം.',
    architecturalStyle: 'Traditional Kerala Riverfront Gurukulam & Koothambalam',
    historicalEra: 'Founded 1930 CE',
    visitingHours: '9:00 AM – 4:00 PM (Guided "A Day with the Masters" Tour available)',
    entryRulesDressCode: 'Modest attire respecting academic and ritual sanctity.',
    location: { lat: 10.7483, lng: 76.2798 },
    address: 'Cheruthuruthy, Thrissur District, Kerala 679531',
    taluk: 'Thalapilly',
    image: '/assets/images/kalamandalam-koothambalam.jpg',
    gallery: [
      '/assets/images/kalamandalam-koothambalam.jpg',
      '/assets/images/koodiyattam-theatre.jpg'
    ],
    audioGuideAvailable: true,
    audioGuideTitle: 'The Nila Heritage and Gurukula Tradition'
  },
  {
    id: 'heritage-dolours-basilica',
    slug: 'our-lady-of-dolours-basilica',
    nameEn: 'Our Lady of Dolours Basilica',
    nameMl: 'വ്യാകുലമാതാവിന്റെ വലിയപള്ളി (പുത്തൻപള്ളി)',
    category: 'CHURCH',
    descriptionEn: 'One of the tallest church structures in Asia boasting an imposing 260-foot bell tower. A magnificent showcase of Gothic architecture with intricate vaulted ceilings, stained glass depictions, and historic wood carvings.',
    descriptionMl: 'ഏഷ്യയിലെ ഏറ്റവും വലിയ പള്ളികളിലൊന്ന്. 260 അടി ഉയരമുള്ള ഗോഥിക് ഗോപുരവും വർണ്ണ ഗ്ലാസ് ചിത്രങ്ങളും കൊത്തുപണികളും ഉള്ള തൃശ്ശൂരിന്റെ വിഖ്യാതമായ പുത്തൻപള്ളി.',
    architecturalStyle: 'Gothic Revival Architecture',
    historicalEra: 'Constructed 1929 CE',
    visitingHours: '6:00 AM – 7:30 PM',
    entryRulesDressCode: 'Open to all visitors regardless of faith with respectful dress.',
    location: { lat: 10.5186, lng: 76.2192 },
    address: 'Palayam Road, Thrissur 680001',
    taluk: 'Thrissur',
    image: '/assets/images/dolours-basilica.jpg',
    gallery: [
      '/assets/images/dolours-basilica.jpg',
      '/assets/images/dolours-basilica-alt.jpg'
    ],
    audioGuideAvailable: true,
    audioGuideTitle: 'Gothic Splendor of Thrissur Christian Heritage'
  }
];

export const CULTURAL_EVENTS_DATA: CulturalEvent[] = CULTURAL_EVENTS_MASTER_DATA;

export const WORKSHOPS_DATA: Workshop[] = [
  {
    id: 'ws-mural-painting',
    artistId: 'artist-muralist',
    artistName: 'Suresh Kumar Marar',
    title: 'Traditional Temple Mural Masterclass: Panchavarna Pigments',
    artform: 'Kerala Mural Painting',
    description: 'Learn the sacred proportions of Kerala mural art using natural rock pigments and bamboo brushes. Create your own framed Ganesha or Lotus motif to take home.',
    skillLevel: 'Beginner',
    maxSeats: 12,
    enrolledSeats: 9,
    feeInr: 1800,
    dateTime: 'Every Saturday, 10:00 AM – 1:30 PM',
    duration: '3.5 Hours',
    venue: 'Panchavarna Studio, East Fort, Thrissur',
    location: { lat: 10.5281, lng: 76.2225 }
  },
  {
    id: 'ws-chenda-rhythm',
    artistId: 'artist-peruvanam',
    artistName: 'Peruvanam Kuttan Marar',
    title: 'The Soul of Melam: Chenda Rhythmic Structures',
    artform: 'Chenda & Melam',
    description: 'An immersive introduction to the mathematical patterns of Pandi Melam, hand positioning, and stick holding (Kol) guided by the maestro himself.',
    skillLevel: 'Intermediate',
    maxSeats: 15,
    enrolledSeats: 14,
    feeInr: 2500,
    dateTime: 'Next Sunday, 09:00 AM – 12:30 PM',
    duration: '3.5 Hours',
    venue: 'Peruvanam Kalari, Cherpu, Thrissur',
    location: { lat: 10.4286, lng: 76.2238 }
  },
  {
    id: 'ws-koodiyattam-abhinaya',
    artistId: 'artist-sivan',
    artistName: 'Kalamandalam Sivan Namboodiri',
    title: 'Netrabhinaya & Sanskrit Mudras in Koodiyattam',
    artform: 'Koodiyattam',
    description: 'Explore the ancient technique of eye movement, breath control, and 24 classical single-hand mudras (Asamyukta Hastas) at Kerala Kalamandalam.',
    skillLevel: 'Masterclass',
    maxSeats: 10,
    enrolledSeats: 6,
    feeInr: 3200,
    dateTime: 'Second Saturday of every month',
    duration: '4 Hours',
    venue: 'Natanakairali Studio, Cheruthuruthy, Thrissur',
    location: { lat: 10.7483, lng: 76.2798 }
  }
];

export const COMMUNITY_STORIES_DATA: CommunityStory[] = [
  {
    id: 'story-1',
    authorName: 'Ananya Warrier',
    title: 'Dawn at Kalamandalam: When the Mizhavu Awakens',
    excerpt: 'At 5:00 AM by the gentle mist of River Bharathapuzha, the rhythmic resonance of the sacred Mizhavu pot drum echoes through the silence of Cheruthuruthy...',
    content: 'Studying the dedication of the young students practicing eye movements with clarified butter (ghee) before the sunrise teaches you that art here is not a vocation, but a living meditation.',
    image: '/assets/images/kalamandalam-koothambalam.jpg',
    relatedArtform: 'Koodiyattam',
    taluk: 'Thalapilly',
    date: '3 days ago',
    likes: 342
  },
  {
    id: 'story-2',
    authorName: 'Dr. Hariharan P.',
    title: 'The Hidden Metallurgy of Nadavaramba Bronze',
    excerpt: 'Visiting the generational foundry where Balan Moosari pours molten copper and tin at glowing orange heat. A tradition that survived industrialization...',
    content: 'The acoustic secret of a temple bell lies in the cooling process inside clay moulds prepared with river silt and rice husks. The resonance can be heard over two kilometers.',
    image: '/assets/images/nadavaramba-bronze-nilavilakku.jpg',
    relatedArtform: 'Bell Metal Craft',
    taluk: 'Mukundapuram',
    date: '1 week ago',
    likes: 512
  }
];

export const INITIAL_MODERATION_ITEMS: ModerationItem[] = [
  {
    id: 'mod-1',
    type: 'ARTIST_VERIFICATION',
    title: 'Master Craftsman Verification Request',
    submitter: 'Narayanan Achari (Wood Carving Master)',
    artform: 'Temple Wood Carving & Kathakali Koppu',
    submittedAt: 'Today, 10:15 AM',
    status: 'PENDING',
    details: 'Submitted artisan registry certificate issued by Kerala Lalithakala Akademi with 32 years of temple sculpture experience.',
    mediaUrl: '/assets/images/kathakali-hero.jpg'
  },
  {
    id: 'mod-2',
    type: 'ARTWORK_SUBMISSION',
    title: 'Handcrafted Panchaloham Ganesha Idol',
    submitter: 'Manoj Moosari (Nadavaramba Guild)',
    artform: 'Bell Metal & Bronze',
    submittedAt: 'Yesterday, 04:30 PM',
    status: 'PENDING',
    details: 'Lost wax casting piece with complete technique story and certificate of origin from Irinjalakuda cluster.',
    mediaUrl: '/assets/images/nadavaramba-bronze-nilavilakku.jpg'
  }
];




import { CommunityCreation, AdminSubmissionItem, ModerationLogEntry } from '../types';

export const COMMUNITY_CREATIONS_DATA: CommunityCreation[] = [
  {
    id: 'creation-1',
    titleEn: 'Sacred Ananthashayanam Mural on Teak',
    titleMl: 'അനന്തശയനം ചുവർചിത്രം',
    creatorName: 'Suresh Kumar Marar',
    creatorRole: 'Master Muralist • East Fort',
    category: 'Traditional Art',
    image: '/assets/images/kerala-mural-venugopala.jpg',
    medium: 'Panchavarna Natural Pigments on Seasoned Teak',
    price: '₹35,000',
    location: 'Thrissur Town',
    likes: 184,
    timeAgo: '2 hours ago'
  },
  {
    id: 'creation-2',
    titleEn: 'Kuthampully Handloom Kasavu Saree with Jacquard Border',
    titleMl: 'കുത്തമ്പുള്ളി കസവു സാരി',
    creatorName: 'K. V. Ramanathan Achari',
    creatorRole: 'Master Weaver • Kuthampully',
    category: 'Handicrafts',
    image: '/assets/images/kuthampully-handloom-loom.jpg',
    medium: '100% Unbleached Cotton & Pure Gold Zari',
    price: '₹14,500',
    location: 'Thiruvilwamala',
    likes: 246,
    timeAgo: '5 hours ago'
  },
  {
    id: 'creation-3',
    titleEn: 'Hand-Cast Resonant Bronze Nilavilakku (4 Feet)',
    titleMl: 'നടവരമ്പ് വെങ്കല നിലവിളക്ക്',
    creatorName: 'Nadavaramba Balan Moosari',
    creatorRole: 'Bell Metal Artisan • Nadavaramba',
    category: 'Handicrafts',
    image: '/assets/images/nadavaramba-bronze-nilavilakku.jpg',
    medium: 'Lost-Wax Bronze Alloy (Panchaloham)',
    price: '₹48,000',
    location: 'Irinjalakuda',
    likes: 312,
    timeAgo: '1 day ago'
  },
  {
    id: 'creation-4',
    titleEn: 'Kathakali Wooden Headdress (Kireedam) & Ornaments',
    titleMl: 'കഥകളി കിരീട നിർമ്മാണം',
    creatorName: 'Narayanan Achari',
    creatorRole: 'Koppu Craftsman • Cheruthuruthy',
    category: 'Traditional Art',
    image: '/assets/images/kathakali-hero.jpg',
    medium: 'Kumizhu Wood, Glass Stones & Peacocks Feathers',
    price: '₹22,000',
    location: 'Cheruthuruthy',
    likes: 198,
    timeAgo: '1 day ago'
  },
  {
    id: 'creation-5',
    titleEn: 'Elephant Festival Caparison (Nettipattam)',
    titleMl: 'സ്വർണ്ണ നെറ്റിപ്പട്ടം',
    creatorName: 'Manikandan Peechi',
    creatorRole: 'Temple Regalia Artisan',
    category: 'Handicrafts',
    image: '/assets/images/thrissur-pooram-kudamattam.jpg',
    medium: 'Gold-Plated Brass Crescent Balls on Pure Velvet',
    price: '₹26,500',
    location: 'Peechi, Thrissur',
    likes: 420,
    timeAgo: '2 days ago'
  },
  {
    id: 'creation-6',
    titleEn: 'Traditional Acoustically Tuned Chenda (Uruttu Chenda)',
    titleMl: 'മേളച്ചെണ്ട',
    creatorName: 'Peruvanam Appu Asari',
    creatorRole: 'Instrument Master • Cherpu',
    category: 'Traditional Art',
    image: '/assets/images/chenda-melam.jpg',
    medium: 'Jackfruit Wood & Layered Cowhide',
    price: '₹12,000',
    location: 'Cherpu',
    likes: 389,
    timeAgo: '3 days ago'
  }
];

// ============================================================================
// ADMIN DASHBOARD SUBMISSIONS & AUDIT LOGS INITIAL DATA
// ============================================================================

export const ADMIN_SUBMISSIONS_INITIAL_DATA: AdminSubmissionItem[] = [
  // 1. Cultural Listings
  {
    id: 'sub-list-1',
    entityType: 'LISTING',
    title: 'Peruvanam-Arattupuzha Sastha Temple & Pooram Complex',
    titleMl: 'പെരുവനം-ആറാട്ടുപുഴ ശാസ്താ ക്ഷേത്ര സമുച്ചയം',
    category: 'Heritage Places',
    artform: 'Temple Architecture & Panchari Melam',
    taluk: 'Mukundapuram',
    locationDetails: 'Cherpu, Mukundapuram Taluk, Thrissur (10.4289° N, 76.2201° E)',
    description: 'The ancient mother of all Poorams in Kerala with a documented 1,400-year history. Features the towering double-storied Madathilappan shrine, ancient granite inscriptions, and the venue of the monumental Peruvanam Pooram Panchari Melam led by 300 percussionists.',
    mediaUrls: [
      '/assets/images/arattupuzha-pooram.jpg',
      '/assets/images/chenda-melam.jpg'
    ],
    contributor: {
      name: 'K. Balagopal',
      email: 'balagopal.heritage@gmail.com',
      phone: '+91 94472 88192',
      role: 'Heritage Researcher & Epigraphist',
      organization: 'Peruvanam Heritage Trust',
      verifiedContributor: true,
      totalSubmissions: 5
    },
    submittedAt: 'Today, 09:30 AM',
    status: 'PENDING',
    sourceAttribution: 'Archaeological Survey of India (ASI) survey records & Cochin Devaswom Board archives'
  },
  {
    id: 'sub-list-2',
    entityType: 'LISTING',
    title: 'Irinjalakuda Koodalmanikyam Temple & Ancient Koothambalam',
    titleMl: 'ഇരിഞ്ഞാലക്കുട കൂടൽമാണിക്യം ക്ഷേത്രവും കൂത്തമ്പലവും',
    category: 'Heritage Places',
    artform: 'Sanskrit Theatre & Temple Architecture',
    taluk: 'Mukundapuram',
    locationDetails: 'Koodalmanikyam, Irinjalakuda, Mukundapuram Taluk',
    description: 'The only prominent temple in India dedicated to Lord Bharata. Renowned for its ancient 16-pillared wooden Koothambalam where classical Koodiyattam and Chakyar Koothu have been performed for centuries.',
    mediaUrls: [
      '/assets/images/koodalmanikyam-temple.jpg'
    ],
    contributor: {
      name: 'Radhakrishnan Menon',
      email: 'menon.radhakrishnan@koodalmanikyam.org',
      phone: '+91 98470 33411',
      role: 'Cultural Trustee',
      organization: 'Irinjalakuda Historical Forum',
      verifiedContributor: true,
      totalSubmissions: 2
    },
    submittedAt: 'Yesterday, 02:15 PM',
    status: 'NEEDS_CHANGES',
    correctionNotes: 'Please provide high-resolution photos of the monumental Kulipini Theertham sacred pond and clarify non-Hindu courtyard entry rules with reference to official Devaswom guidelines.',
    sourceAttribution: 'Koodalmanikyam Devaswom administrative publications'
  },
  {
    id: 'sub-list-3',
    entityType: 'LISTING',
    title: 'Nadavaramba Bronze Bell-Metal Artisan Guild Cluster',
    titleMl: 'നടവരമ്പ് വെങ്കല കരകൗശല ഗ്രാമം',
    category: 'Handicrafts',
    artform: 'Bell Metal & Lost-Wax Bronze Casting',
    taluk: 'Mukundapuram',
    locationDetails: 'Nadavaramba Village, Mukundapuram Taluk',
    description: 'Centuries-old generational metal casters preserving the ancient lost-wax technique for crafting Nilavilakku, Varpu, and temple bronze bells with specific resonant tonal frequencies.',
    mediaUrls: [
      '/assets/images/nadavaramba-bronze-nilavilakku.jpg'
    ],
    contributor: {
      name: 'Manoj Moosari',
      email: 'manoj.moosari@nadavaramba.crafts.in',
      phone: '+91 94461 55209',
      role: 'Guild Master Craftsman',
      organization: 'Nadavaramba Bell Metal Industrial Cooperative',
      verifiedContributor: true,
      totalSubmissions: 3
    },
    submittedAt: '3 days ago',
    status: 'APPROVED',
    sourceAttribution: 'Kerala State Handicrafts Development Corporation & GI Registry records'
  },

  // 2. Artist Profiles
  {
    id: 'sub-art-1',
    entityType: 'ARTIST_PROFILE',
    title: 'Peruvanam Satheesan Marar (Chenda Melam Master)',
    titleMl: 'പെരുവനം സതീശൻ മാരാർ',
    category: 'Performing Arts',
    artform: 'Chenda Melam & Panchari Melam',
    taluk: 'Mukundapuram',
    locationDetails: 'Peruvanam Gramam, Cherpu, Thrissur',
    description: 'Generational Chenda artist trained under the legendary Peruvanam parampara with 28 years of lead performance experience across Ilanjithara Melam, Arattupuzha Pooram, and Koodalmanikyam utsavam. Seeking Verified Master badge.',
    mediaUrls: [
      '/assets/images/ilanjithara-melam.jpg'
    ],
    contributor: {
      name: 'Peruvanam Satheesan Marar',
      email: 'satheesan.chenda@gmail.com',
      phone: '+91 94473 11820',
      role: 'Master Percussionist',
      organization: 'Peruvanam Melam Kalari',
      verifiedContributor: false,
      totalSubmissions: 1
    },
    submittedAt: 'Today, 11:20 AM',
    status: 'PENDING',
    sourceAttribution: 'Kerala Sangeetha Nataka Akademi Registry'
  },
  {
    id: 'sub-art-2',
    entityType: 'ARTIST_PROFILE',
    title: 'Shanthi Varma (Temple Fresco Mural Artist)',
    titleMl: 'ശാന്തി വർമ്മ - ചുവർച്ചിത്രകാരി',
    category: 'Traditional Art',
    artform: 'Kerala Temple Mural Painting',
    taluk: 'Thrissur',
    locationDetails: 'East Fort, Thrissur Town',
    description: 'Trained at the Institute of Mural Painting Guruvayur with 12 years experience in natural Panchavarna fresco restoration. Applying to showcase digital atelier and receive commission inquiries.',
    mediaUrls: [
      '/assets/images/kerala-mural-temple.jpg'
    ],
    contributor: {
      name: 'Shanthi Varma',
      email: 'shanthi.varma.murals@yahoo.com',
      phone: '+91 98462 77014',
      role: 'Visual Artist',
      organization: 'Independent Atelier',
      verifiedContributor: false,
      totalSubmissions: 1
    },
    submittedAt: 'Yesterday, 06:10 PM',
    status: 'NEEDS_CHANGES',
    correctionNotes: 'Please upload certified portfolio photographs of your temple mural restoration projects and proof of training from the Guruvayur Mural Institute.',
    sourceAttribution: 'Self-declaration & artist portfolio'
  },
  {
    id: 'sub-art-3',
    entityType: 'ARTIST_PROFILE',
    title: 'Padma Shri Kalamandalam Gopi',
    titleMl: 'പത്മശ്രീ കലാമണ്ഡലം ഗോപി',
    category: 'Performing Arts',
    artform: 'Kathakali (Pacha & Romantic Roles)',
    taluk: 'Thalapilly',
    locationDetails: 'Cheruthuruthy, Thalapilly Taluk',
    description: 'Living legend of classical Kathakali theatre with over 65 years on international stages. Honoured with the Padma Shri, Sangeet Natak Akademi Award, and Kerala State Cultural Award.',
    mediaUrls: [
      '/assets/images/kalamandalam-gopi-portrait.jpg'
    ],
    contributor: {
      name: 'Kalamandalam Archive Trust',
      email: 'archives@kalamandalam.ac.in',
      phone: '+91 4884 262318',
      role: 'Institutional Curator',
      organization: 'Kerala Kalamandalam Deemed University',
      verifiedContributor: true,
      totalSubmissions: 4
    },
    submittedAt: '5 days ago',
    status: 'APPROVED',
    sourceAttribution: 'Government of India Honors List & Kerala Kalamandalam Official Roster'
  },

  // 3. Uploaded Artwork
  {
    id: 'sub-aw-1',
    entityType: 'ARTWORK',
    title: 'Panchavarna Shiva Tandavam Fresco on Seasoned Canvas',
    titleMl: 'ശിവതാണ്ഡവം ചുവർച്ചിത്രം',
    category: 'Traditional Art',
    artform: 'Kerala Mural Painting',
    taluk: 'Thrissur',
    locationDetails: 'East Fort Guild, Thrissur',
    description: 'Executed strictly using traditional Panchavarna mineral and vegetable pigments: yellow ochre, red cinnabar, green thermolite stone, carbon lampblack, and lime white, bound with tender neem gum on handloom canvas.',
    mediaUrls: [
      '/assets/images/kerala-mural-temple.jpg',
      '/assets/images/kerala-mural-krishna.jpg'
    ],
    contributor: {
      name: 'Ananya Menon',
      email: 'ananya.menon.art@gmail.com',
      phone: '+91 94951 88402',
      role: 'Contributing Artisan',
      organization: 'East Fort Fine Arts Collective',
      verifiedContributor: true,
      totalSubmissions: 3
    },
    submittedAt: 'Today, 01:45 PM',
    status: 'PENDING',
    sourceAttribution: 'Artist studio creation and mineral pigment verification document'
  },
  {
    id: 'sub-aw-2',
    entityType: 'ARTWORK',
    title: 'Antique Changalavatta Sacred Lamp with Handcrafted Chain',
    titleMl: 'പരമ്പരാഗത ചങ്ങലവട്ട',
    category: 'Handicrafts',
    artform: 'Lost-Wax Bronze Casting',
    taluk: 'Mukundapuram',
    locationDetails: 'Nadavaramba Village, Irinjalakuda',
    description: 'Traditional Kerala oil vessel with attached ladle and swan finial (Hamsa) used during temple sanctum rituals. Cast in pure five-metal alloy (Panchaloham).',
    mediaUrls: [
      '/assets/images/nadavaramba-bronze-nilavilakku.jpg'
    ],
    contributor: {
      name: 'Nadavaramba Bronze Guild',
      email: 'sales@nadavarambabronze.com',
      phone: '+91 480 282 3491',
      role: 'Guild Master',
      organization: 'Nadavaramba Artisans Cooperative',
      verifiedContributor: true,
      totalSubmissions: 6
    },
    submittedAt: 'Yesterday, 11:00 AM',
    status: 'NEEDS_CHANGES',
    correctionNotes: 'Please specify the exact weight, physical dimensions (length x height), and whether the Geographical Indication (GI) certification tag is stamped.',
    sourceAttribution: 'Nadavaramba Artisan Guild Registry'
  },
  {
    id: 'sub-aw-3',
    entityType: 'ARTWORK',
    title: 'Sacred Ananthashayanam Mural on Teakwood Plaque',
    titleMl: 'അനന്തശയനം ചുവർചിത്രം തേക്ക് പലകയിൽ',
    category: 'Traditional Art',
    artform: 'Kerala Mural Painting',
    taluk: 'Thrissur',
    locationDetails: 'Thrissur Town',
    description: 'Iconic depiction of Lord Padmanabha reclining on snake king Anantha, painted on a single seasoned slab of Nilambur teak with natural cinnabar and indigo dyes.',
    mediaUrls: [
      '/assets/images/kerala-mural-venugopala.jpg'
    ],
    contributor: {
      name: 'Suresh Kumar Marar',
      email: 'suresh.marar.murals@gmail.com',
      phone: '+91 94474 20011',
      role: 'Master Muralist',
      organization: 'Sree Padmanabha Kalari',
      verifiedContributor: true,
      totalSubmissions: 4
    },
    submittedAt: '4 days ago',
    status: 'APPROVED',
    sourceAttribution: 'Master Atelier Portfolio'
  },

  // 4. Cultural Events
  {
    id: 'sub-ev-1',
    entityType: 'EVENT',
    title: 'Uthralikkavu Pooram 2026 - Melam, Enna Vilakku & Pageantry',
    titleMl: 'ഉത്രാളിക്കാവ് പൂരം 2026',
    category: 'Cultural Festivals',
    artform: 'Temple Percussion & Elephant Pageantry',
    taluk: 'Thalapilly',
    locationDetails: 'Uthralikkavu Temple, Wadakkanchery, Thalapilly Taluk',
    description: 'Celebrated festival nestled in the picturesque paddy valleys of Wadakkanchery featuring three competitive desams, day and night Panchavadyam, and mesmerizing traditional fire lamps (Enna Vilakku).',
    mediaUrls: [
      '/assets/images/thrissur-pooram-kudamattam.jpg'
    ],
    contributor: {
      name: 'Uthralikkavu Devaswom Festival Board',
      email: 'festival@uthralikkavupooram.org',
      phone: '+91 4884 260100',
      role: 'Festival Secretary',
      organization: 'Uthralikkavu Devaswom Committee',
      verifiedContributor: true,
      totalSubmissions: 2
    },
    submittedAt: 'Today, 10:00 AM',
    status: 'PENDING',
    sourceAttribution: 'Official Devaswom Notice Board & Cochin Devaswom Board Schedule'
  },
  {
    id: 'sub-ev-2',
    entityType: 'EVENT',
    title: 'All-Kerala Koodiyattam Natyotsavam 2026',
    titleMl: 'അഖില കേരള കൂടിയാട്ട നാട്യോത്സവം',
    category: 'Performing Arts',
    artform: 'Koodiyattam & Nangiarkoothu',
    taluk: 'Mukundapuram',
    locationDetails: 'Ammannur Chachu Chakyar Smaraka Gurukulam, Irinjalakuda',
    description: 'A 7-day festival dedicated to UNESCO-recognized Sanskrit theatre performances presenting classical plays like Subhadradhananjayam and Toranayuddham by premier exponents.',
    mediaUrls: [
      '/assets/images/koodiyattam-theatre.jpg'
    ],
    contributor: {
      name: 'Ammannur Gurukulam Trust',
      email: 'info@ammannurgurukulam.com',
      phone: '+91 480 282 1098',
      role: 'Artistic Director',
      organization: 'Ammannur Chachu Chakyar Smaraka Gurukulam',
      verifiedContributor: true,
      totalSubmissions: 3
    },
    submittedAt: '2 days ago',
    status: 'APPROVED',
    sourceAttribution: 'Ammannur Gurukulam & Sangeet Natak Akademi calendar'
  },
  {
    id: 'sub-ev-3',
    entityType: 'EVENT',
    title: 'Kuthampully Handloom Expo & Master Weavers Meet',
    titleMl: 'കുത്തമ്പുള്ളി കൈത്തറി മേളയും നെയ്ത്തുകാരുടെ സംഗമവും',
    category: 'Workshops',
    artform: 'Handloom Weaving & Jacavu Craft',
    taluk: 'Thalapilly',
    locationDetails: 'Kuthampully Weavers Cooperative Society Grounds, Thiruvilwamala',
    description: 'Exhibition and live pit-loom demonstration featuring authentic GI-tagged Kuthampully handloom sarees, dhotis, and kasavu textiles directly from generational weaver families.',
    mediaUrls: [
      '/assets/images/kuthampully-handloom-loom.jpg'
    ],
    contributor: {
      name: 'P. Somasekharan',
      email: 'somasekharan.kuthampully@gmail.com',
      phone: '+91 94475 60921',
      role: 'Society Secretary',
      organization: 'Kuthampully Handloom Industrial Society',
      verifiedContributor: false,
      totalSubmissions: 1
    },
    submittedAt: 'Yesterday, 04:45 PM',
    status: 'NEEDS_CHANGES',
    correctionNotes: 'Please upload the official clearance letter from the Handloom Cooperative Directorate and confirm public entry timings and parking arrangements.',
    sourceAttribution: 'Weavers Cooperative Society release'
  }
];

export const INITIAL_MODERATION_LOGS: ModerationLogEntry[] = [
  {
    id: 'log-001',
    timestamp: '2026-11-06 14:30:15',
    adminName: 'Dr. Radhika Nair',
    adminEmail: 'radhika.nair@kalakriti.kerala.gov.in',
    action: 'APPROVED',
    entityType: 'LISTING',
    entityTitle: 'Kerala Kalamandalam (Deemed University of Arts)',
    notes: 'Verified institutional state accreditation and UNESCO cultural dossier alignment. Published directly to cultural map.'
  },
  {
    id: 'log-002',
    timestamp: '2026-11-06 16:45:00',
    adminName: 'K. V. Krishnan',
    adminEmail: 'admin@kalakriti.kerala.gov.in',
    action: 'NEEDS_CHANGES',
    entityType: 'LISTING',
    entityTitle: 'Irinjalakuda Koodalmanikyam Temple & Ancient Koothambalam',
    notes: 'Requested high-resolution photographs of Kulipini Theertham sacred pond and clarification on outer courtyard visitor entry guidelines.'
  },
  {
    id: 'log-003',
    timestamp: '2026-11-06 17:10:22',
    adminName: 'K. V. Krishnan',
    adminEmail: 'admin@kalakriti.kerala.gov.in',
    action: 'REJECTED',
    entityType: 'ARTWORK',
    entityTitle: 'Commercial Machine-Molded Plastic Kathakali Keychains',
    notes: 'Commercial mass-manufactured souvenir with no traditional artisan provenance. Violates KALAKRITI policy for authentic traditional craft curation.'
  },
  {
    id: 'log-004',
    timestamp: '2026-11-06 18:20:00',
    adminName: 'Dr. Radhika Nair',
    adminEmail: 'radhika.nair@kalakriti.kerala.gov.in',
    action: 'APPROVED',
    entityType: 'ARTIST_PROFILE',
    entityTitle: 'Padma Shri Kalamandalam Gopi',
    notes: 'Verified national honours, Kalamandalam fellowship credentials, and authorized atelier portfolio. Granted Verified Living Master badge.'
  },
  {
    id: 'log-005',
    timestamp: '2026-11-06 19:05:40',
    adminName: 'Dr. Radhika Nair',
    adminEmail: 'radhika.nair@kalakriti.kerala.gov.in',
    action: 'APPROVED',
    entityType: 'ARTWORK',
    entityTitle: 'Sacred Ananthashayanam Mural on Teakwood Plaque',
    notes: 'Panchavarna traditional natural pigment verification approved. Featured on Community Showcase.'
  },
  {
    id: 'log-006',
    timestamp: '2026-11-06 20:12:18',
    adminName: 'K. V. Krishnan',
    adminEmail: 'admin@kalakriti.kerala.gov.in',
    action: 'APPROVED',
    entityType: 'EVENT',
    entityTitle: 'All-Kerala Koodiyattam Natyotsavam 2026',
    notes: 'Confirmed schedule and venue clearance with Ammannur Gurukulam organizers. Published to Events Discovery.'
  }
];

