import React, { useState } from 'react';
import { useCultural } from '../context/CulturalContext';
import { Artist, Artwork, Taluk } from '../types';
import { uploadImageToSupabase } from '../lib/supabase';
import { 
  X, 
  Upload, 
  Sparkles, 
  CheckCircle, 
  Image as ImageIcon, 
  MapPin, 
  Phone, 
  Award,
  Layers,
  Info,
  Instagram,
  Globe,
  Mail,
  Plus,
  Trash2,
  ArrowRight
} from 'lucide-react';

export const ArtworkUploadModal: React.FC = () => {
  const { 
    isUploadModalOpen, 
    setIsUploadModalOpen, 
    language, 
    artforms, 
    addArtist, 
    addArtworkToArtist, 
    artists,
    setActiveTab,
    setCurrentDashboardArtistId,
    navigateToArtistProfile
  } = useCultural();

  const [mode, setMode] = useState<'REGISTER_ARTIST' | 'ADD_ARTWORK'>('REGISTER_ARTIST');
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // 1. Artist Registration Form States
  const [artistName, setArtistName] = useState('');
  const [stageName, setStageName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('/assets/images/kalamandalam-sivan-portrait.jpg');
  const [taluk, setTaluk] = useState<Taluk>('Thrissur');
  const [studioAddress, setStudioAddress] = useState('');
  const [selectedArtformId, setSelectedArtformId] = useState(artforms[0]?.id || 'art-kathakali');
  const [bioEn, setBioEn] = useState('');
  const [bioMl, setBioMl] = useState('');
  const [workDescription, setWorkDescription] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [email, setEmail] = useState('');
  const [instagramHandle, setInstagramHandle] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [guruLineage, setGuruLineage] = useState('');
  const [experienceYears, setExperienceYears] = useState('12');
  
  // Portfolio Photos State (Multiple)
  const [portfolioPhotos, setPortfolioPhotos] = useState<string[]>([
    '/assets/images/kerala-mural-temple.jpg',
    '/assets/images/kuthampully-handloom-loom.jpg'
  ]);
  const [newPhotoUrlInput, setNewPhotoUrlInput] = useState('');

  // 2. Direct Artwork Showcase Form State
  const [selectedExistingArtistId, setSelectedExistingArtistId] = useState(artists[0]?.id || '');
  const [artworkTitleEn, setArtworkTitleEn] = useState('');
  const [artworkTitleMl, setArtworkTitleMl] = useState('');
  const [artworkCategory, setArtworkCategory] = useState('Traditional Art');
  const [artworkLocation, setArtworkLocation] = useState('Thrissur Town');
  const [medium, setMedium] = useState('Natural Mineral Pigments / Seasoned Teak');
  const [dimensions, setDimensions] = useState('36 x 24 inches');
  const [price, setPrice] = useState('₹18,000');
  const [craftTechnique, setCraftTechnique] = useState('');
  const [storyEn, setStoryEn] = useState('');
  const [artworkImages, setArtworkImages] = useState<string[]>([
    '/assets/images/kerala-mural-venugopala.jpg'
  ]);
  const [artworkImageInput, setArtworkImageInput] = useState('');

  if (!isUploadModalOpen) return null;

  // Handle single profile image upload with Supabase Storage
  const handleAvatarFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const { url } = await uploadImageToSupabase(file, 'avatars');
      if (url) {
        setAvatarUrl(url);
      } else {
        const reader = new FileReader();
        reader.onloadend = () => {
          setAvatarUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  // Add photo to registration portfolio
  const handleAddPortfolioPhoto = () => {
    if (newPhotoUrlInput.trim()) {
      setPortfolioPhotos([...portfolioPhotos, newPhotoUrlInput.trim()]);
      setNewPhotoUrlInput('');
    }
  };

  const handleRemovePortfolioPhoto = (idx: number) => {
    setPortfolioPhotos(portfolioPhotos.filter((_, i) => i !== idx));
  };

  // Add photo to artwork upload
  const handleAddArtworkImage = () => {
    if (artworkImageInput.trim()) {
      setArtworkImages([...artworkImages, artworkImageInput.trim()]);
      setArtworkImageInput('');
    }
  };

  const handleRemoveArtworkImage = (idx: number) => {
    if (artworkImages.length > 1) {
      setArtworkImages(artworkImages.filter((_, i) => i !== idx));
    }
  };

  // Submit Artist Registration
  const handleRegisterArtist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!artistName.trim()) return;

    const artformObj = artforms.find(a => a.id === selectedArtformId);
    const newArtistId = `artist-${Date.now()}`;
    const newArtworkId = `artwork-${Date.now()}`;

    // Create initial showcase piece from portfolio photos
    const initialArtwork: Artwork = {
      id: newArtworkId,
      artistId: newArtistId,
      artistName: stageName || artistName,
      titleEn: `${stageName || artistName}'s Master Showcase Piece`,
      titleMl: 'കലാസൃഷ്ടി',
      artformId: selectedArtformId,
      artformName: artformObj?.nameEn || 'Traditional Art',
      craftTechnique: craftTechnique || 'Generational traditional handcrafting technique.',
      medium: medium,
      dimensions: dimensions,
      yearCreated: new Date().getFullYear(),
      images: portfolioPhotos.length > 0 ? portfolioPhotos : [avatarUrl],
      price: price,
      isForSale: true,
      storyEn: workDescription || bioEn || 'Created following the ancient lineages and sacred traditions of Thrissur.',
      storyMl: bioMl || 'പരമ്പരാഗത ചിട്ടകൾ പാലിച്ച് തൃശ്ശൂരിൽ നിർമ്മിച്ച വിശിഷ്ട സൃഷ്ടി.',
      viewsCount: 1,
      likesCount: 1,
      category: artformObj?.nameEn || 'Traditional Art',
      location: studioAddress || `${taluk}, Thrissur`,
      approvalStatus: 'PENDING'
    };

    const newArtist: Artist = {
      id: newArtistId,
      name: artistName,
      stageName: stageName || artistName,
      avatar: avatarUrl,
      bioEn: bioEn || `${artistName} is a traditional artisan and practitioner of ${artformObj?.nameEn} based in ${taluk}, Thrissur.`,
      bioMl: bioMl || `തൃശ്ശൂർ ${taluk} കേന്ദ്രമായി പ്രവർത്തിക്കുന്ന പാരമ്പര്യ കലാകാരൻ.`,
      workDescription: workDescription || `Master artisan specializing in ${artformObj?.nameEn}. Works preserve traditional Kerala aesthetics.`,
      primaryArtformId: selectedArtformId,
      primaryArtformName: artformObj?.nameEn || 'Traditional Art',
      guruLineage: guruLineage || 'Generational Gurukula Lineage',
      experienceYears: parseInt(experienceYears) || 10,
      studioName: `${artistName} Heritage Studio`,
      studioAddress: studioAddress || `${taluk}, Thrissur District, Kerala`,
      taluk: taluk,
      location: { 
        lat: 10.5244 + (Math.random() - 0.5) * 0.08, 
        lng: 76.2144 + (Math.random() - 0.5) * 0.08 
      },
      contactPhone: phoneNumber,
      whatsappNumber: whatsappNumber || phoneNumber,
      email: email,
      instagramHandle: instagramHandle,
      socialLinks: [
        ...(instagramHandle ? [{ platform: 'Instagram', url: `https://instagram.com/${instagramHandle.replace('@', '')}` }] : []),
        ...(websiteUrl ? [{ platform: 'Website', url: websiteUrl }] : [])
      ],
      portfolioPhotos: portfolioPhotos,
      isVerified: false,
      verificationBadge: 'EMERGING_ARTIST',
      awards: ['Registered on KALAKRITI Community Guild'],
      artworks: [initialArtwork]
    };

    addArtist(newArtist);
    setCurrentDashboardArtistId(newArtistId);
    setSuccessMessage('Artist profile and portfolio successfully registered! Submissions are routed to the curation desk.');
    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
      setIsUploadModalOpen(false);
      navigateToArtistProfile(newArtist);
    }, 1800);
  };

  // Submit Artwork Post
  const handleAddArtworkOnly = (e: React.FormEvent) => {
    e.preventDefault();
    const artistObj = artists.find(a => a.id === selectedExistingArtistId) || artists[0];
    if (!artistObj) return;

    const newArtworkId = `artwork-${Date.now()}`;
    const newArtwork: Artwork = {
      id: newArtworkId,
      artistId: artistObj.id,
      artistName: artistObj.stageName || artistObj.name,
      titleEn: artworkTitleEn || 'New Traditional Artwork',
      titleMl: artworkTitleMl || 'പുതിയ കലാസൃഷ്ടി',
      artformId: artistObj.primaryArtformId,
      artformName: artistObj.primaryArtformName,
      craftTechnique: craftTechnique || 'Traditional artisanal process',
      medium: medium,
      dimensions: dimensions,
      yearCreated: new Date().getFullYear(),
      images: artworkImages,
      price: price,
      isForSale: true,
      storyEn: storyEn || 'Authentic Kerala traditional creation presented by community artist.',
      storyMl: 'തൃശ്ശൂരിൽ നിർമ്മിച്ച പരമ്പരാഗത സൃഷ്ടി.',
      viewsCount: 1,
      likesCount: 1,
      category: artworkCategory,
      location: artworkLocation,
      approvalStatus: 'PENDING'
    };

    addArtworkToArtist(artistObj.id, newArtwork);
    setSuccessMessage('Artwork post created and added to Community Showcase queue!');
    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
      setIsUploadModalOpen(false);
      setActiveTab('community-showcase');
    }, 1800);
  };

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="upload-modal-title"
      className="fixed inset-0 z-60 overflow-y-auto bg-deep-brown/85 backdrop-blur-sm flex items-start sm:items-center justify-center p-3 sm:p-6 animate-fadeIn select-none"
    >
      <div className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-cultural border-2 border-cream-gold my-auto my-3 sm:my-6">
        
        {/* Top Heritage Gold Bar */}
        <div className="h-2 bg-gradient-to-r from-traditional-red via-cream-gold to-terracotta" />

        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-parchment-warm border-b border-warm-sand/30 flex items-center justify-between">
          <div>
            <span className="text-terracotta font-heading tracking-wider uppercase text-[10px] sm:text-[11px] font-bold">
              {language === 'en' ? 'Artisan Onboarding & Digital Atelier' : 'കലാകാരൻ രജിസ്ട്രേഷൻ'}
            </span>
            <h3 id="upload-modal-title" className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-deep-brown">
              {language === 'en' ? 'Register & Showcase Cultural Work' : 'കലാകാരനായി ചേർന്ന് സൃഷ്ടികൾ പ്രദർശിപ്പിക്കാം'}
            </h3>
          </div>

          <button
            onClick={() => setIsUploadModalOpen(false)}
            aria-label="Close modal"
            className="p-1.5 sm:p-2 rounded-full hover:bg-white text-deep-brown/60 hover:text-traditional-red transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector Tabs */}
        <div className="px-4 sm:px-6 pt-3 sm:pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-warm-sand/30 bg-white">
          <div className="flex space-x-1 sm:space-x-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              onClick={() => setMode('REGISTER_ARTIST')}
              className={`pb-2.5 sm:pb-3 px-3 sm:px-4 text-xs font-bold transition-all border-b-2 whitespace-nowrap ${
                mode === 'REGISTER_ARTIST'
                  ? 'border-traditional-red text-traditional-red'
                  : 'border-transparent text-deep-brown/60 hover:text-deep-brown'
              }`}
            >
              1. Register as Artist
            </button>

            <button
              onClick={() => setMode('ADD_ARTWORK')}
              className={`pb-2.5 sm:pb-3 px-3 sm:px-4 text-xs font-bold transition-all border-b-2 whitespace-nowrap ${
                mode === 'ADD_ARTWORK'
                  ? 'border-traditional-red text-traditional-red'
                  : 'border-transparent text-deep-brown/60 hover:text-deep-brown'
              }`}
            >
              2. Upload Artwork
            </button>
          </div>

          <button
            onClick={() => {
              setIsUploadModalOpen(false);
              setActiveTab('artist-dashboard');
            }}
            className="pb-2 sm:pb-3 text-xs font-bold text-olive-green hover:underline flex items-center space-x-1 self-end sm:self-auto shrink-0"
          >
            <span>Open Artist Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Success Feedback Banner */}
        {isSuccess ? (
          <div className="p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-olive-green/20 text-olive-green flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="font-display text-2xl font-bold text-deep-brown">
              {language === 'en' ? 'Submission Successful!' : 'വിജയകരമായി സമർപ്പിച്ചു!'}
            </h4>
            <p className="text-xs sm:text-sm text-deep-brown/80 max-w-md mx-auto">
              {successMessage}
            </p>
          </div>
        ) : (
          <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
            
            {/* ========================================================
                MODE 1: ARTIST REGISTRATION (ALL 9 REQUESTED FIELDS)
               ======================================================== */}
            {mode === 'REGISTER_ARTIST' && (
              <form onSubmit={handleRegisterArtist} className="space-y-6">
                
                {/* 1. Full name or display name & Stage name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-deep-brown flex items-center justify-between">
                      <span>Full Legal or Real Name *</span>
                      <span className="text-[10px] text-terracotta">Required</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={artistName}
                      onChange={(e) => setArtistName(e.target.value)}
                      placeholder="e.g. Kalamandalam Gopi / K. Raman Nair"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-warm-sand/50 text-xs text-deep-brown focus:border-traditional-red focus:ring-1 focus:ring-traditional-red outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-deep-brown">
                      Display Name or Stage Name (വേദി നാമം)
                    </label>
                    <input
                      type="text"
                      value={stageName}
                      onChange={(e) => setStageName(e.target.value)}
                      placeholder="e.g. Guru Gopi / Achari Woodworks"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-warm-sand/50 text-xs text-deep-brown focus:border-traditional-red focus:ring-1 focus:ring-traditional-red outline-none"
                    />
                  </div>
                </div>

                {/* 2. Profile Photograph (File upload / Preset URL) */}
                <div className="p-4 rounded-xl bg-parchment-warm/70 border border-warm-sand/40 space-y-3">
                  <label className="text-xs font-bold text-deep-brown flex items-center space-x-1.5">
                    <ImageIcon className="w-4 h-4 text-terracotta" />
                    <span>Profile Photograph (കലാകാരന്റെ ചിത്രം) *</span>
                  </label>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <img
                      src={avatarUrl}
                      alt="Avatar Preview"
                      className="w-20 h-20 rounded-2xl object-cover border-2 border-cream-gold shadow-md shrink-0 bg-white"
                    />
                    <div className="space-y-2 flex-1 w-full">
                      <div className="flex items-center gap-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarFileChange}
                          id="avatar-file-input"
                          className="hidden"
                        />
                        <label
                          htmlFor="avatar-file-input"
                          className="px-3.5 py-2 rounded-xl bg-white border border-warm-sand/50 text-xs font-semibold text-deep-brown hover:bg-parchment cursor-pointer transition-colors inline-flex items-center space-x-1.5"
                        >
                          <Upload className="w-3.5 h-3.5 text-traditional-red" />
                          <span>Upload From Computer</span>
                        </label>
                        <span className="text-[11px] text-deep-brown/60">or enter image link below:</span>
                      </div>

                      <input
                        type="url"
                        value={avatarUrl}
                        onChange={(e) => setAvatarUrl(e.target.value)}
                        placeholder="https://... or image link"
                        className="w-full px-3 py-1.5 rounded-lg border border-warm-sand/40 text-xs text-deep-brown font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Location (Taluk & Studio/Village Address) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-deep-brown flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-terracotta" />
                      <span>Taluk within Thrissur District *</span>
                    </label>
                    <select
                      value={taluk}
                      onChange={(e) => setTaluk(e.target.value as Taluk)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-warm-sand/50 text-xs text-deep-brown bg-white outline-none"
                    >
                      <option value="Thrissur">Thrissur Taluk (തൃശ്ശൂർ)</option>
                      <option value="Thalapilly">Thalapilly Taluk (തലപ്പിള്ളി / Wadakkanchery)</option>
                      <option value="Mukundapuram">Mukundapuram Taluk (മുകുന്ദപുരം / Irinjalakuda)</option>
                      <option value="Chavakkad">Chavakkad Taluk (ചാവക്കാട് / Guruvayur)</option>
                      <option value="Kodungallur">Kodungallur Taluk (കൊടുങ്ങല്ലൂർ)</option>
                      <option value="Chalakkudy">Chalakkudy Taluk (ചാലക്കുടി)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-deep-brown">
                      Studio or Village Address (മേൽവിലാസം) *
                    </label>
                    <input
                      type="text"
                      required
                      value={studioAddress}
                      onChange={(e) => setStudioAddress(e.target.value)}
                      placeholder="e.g. Cheruthuruthy / Thiruvilwamala Guild Road"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-warm-sand/50 text-xs text-deep-brown outline-none"
                    />
                  </div>
                </div>

                {/* 4. Art Form Selection & Practice Experience */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-deep-brown flex items-center space-x-1">
                      <Award className="w-3.5 h-3.5 text-olive-green" />
                      <span>Primary Art Form / Craft (കലാരൂപം) *</span>
                    </label>
                    <select
                      value={selectedArtformId}
                      onChange={(e) => setSelectedArtformId(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-warm-sand/50 text-xs text-deep-brown bg-white outline-none"
                    >
                      {artforms.map(af => (
                        <option key={af.id} value={af.id}>
                          {af.nameEn} ({af.nameMl})
                        </option>
                      ))}
                      <option value="art-other">Traditional Festival Photography</option>
                      <option value="art-craft">Wood Carving & Temple Crafts</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-deep-brown">
                      Years of Practice / Guru Lineage
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        min="1"
                        max="80"
                        value={experienceYears}
                        onChange={(e) => setExperienceYears(e.target.value)}
                        placeholder="Years"
                        className="px-3 py-2.5 rounded-xl border border-warm-sand/50 text-xs text-deep-brown outline-none"
                      />
                      <input
                        type="text"
                        value={guruLineage}
                        onChange={(e) => setGuruLineage(e.target.value)}
                        placeholder="Guru / Lineage"
                        className="px-3 py-2.5 rounded-xl border border-warm-sand/50 text-xs text-deep-brown outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* 5. Short Biography */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-deep-brown">
                    Short Biography (കലാകാരന്റെ ലഘു ജീവചരിത്രം) *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={bioEn}
                    onChange={(e) => setBioEn(e.target.value)}
                    placeholder="Describe your background, teachers, and role in preserving Thrissur's artistic traditions..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-warm-sand/50 text-xs text-deep-brown outline-none"
                  />
                </div>

                {/* 6. Description of Their Work */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-deep-brown flex items-center justify-between">
                    <span>Description of Your Work & Techniques (സൃഷ്ടികളുടെ സവിശേഷതകൾ) *</span>
                    <span className="text-[10px] text-deep-brown/60">Materials, traditional aesthetics, philosophy</span>
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={workDescription}
                    onChange={(e) => setWorkDescription(e.target.value)}
                    placeholder="Details about materials used (natural dyes, brass, pit-loom cotton), creative philosophy, and custom performance/commission capabilities..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-warm-sand/50 text-xs text-deep-brown outline-none"
                  />
                </div>

                {/* 7. Contact Information */}
                <div className="p-4 rounded-xl bg-white border border-warm-sand/40 space-y-3">
                  <h4 className="text-xs font-bold text-deep-brown flex items-center space-x-1.5 uppercase tracking-wider text-terracotta">
                    <Phone className="w-3.5 h-3.5" />
                    <span>Contact Information (നേരിട്ട് ബന്ധപ്പെടാനുള്ള വിവരങ്ങൾ)</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-deep-brown/80">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="+91 94470 XXXXX"
                        className="w-full px-3 py-2 rounded-lg border border-warm-sand/40 text-xs text-deep-brown outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-deep-brown/80">WhatsApp Inquiries</label>
                      <input
                        type="tel"
                        value={whatsappNumber}
                        onChange={(e) => setWhatsappNumber(e.target.value)}
                        placeholder="+91 98950 XXXXX"
                        className="w-full px-3 py-2 rounded-lg border border-warm-sand/40 text-xs text-deep-brown outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-deep-brown/80">Email Address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="artist@kalakriti.org"
                        className="w-full px-3 py-2 rounded-lg border border-warm-sand/40 text-xs text-deep-brown outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* 8. Instagram or Other Public Social Media Links */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-deep-brown flex items-center space-x-1">
                      <Instagram className="w-3.5 h-3.5 text-traditional-red" />
                      <span>Instagram Handle / Profile</span>
                    </label>
                    <input
                      type="text"
                      value={instagramHandle}
                      onChange={(e) => setInstagramHandle(e.target.value)}
                      placeholder="@thrissur_artist_guild"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-warm-sand/50 text-xs text-deep-brown outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-deep-brown flex items-center space-x-1">
                      <Globe className="w-3.5 h-3.5 text-olive-green" />
                      <span>Website / Portfolio URL</span>
                    </label>
                    <input
                      type="url"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      placeholder="https://myart.kerala.gov.in"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-warm-sand/50 text-xs text-deep-brown outline-none"
                    />
                  </div>
                </div>

                {/* 9. Portfolio Photographs (Multiple) */}
                <div className="space-y-3 p-4 rounded-xl bg-parchment-warm/70 border border-warm-sand/40">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-deep-brown uppercase tracking-wider text-terracotta">
                        Portfolio Photographs ({portfolioPhotos.length} Added) *
                      </h4>
                      <p className="text-[11px] text-deep-brown/70">
                        Upload or provide high-resolution images of your artwork, performance costumes, or workshop craft.
                      </p>
                    </div>
                  </div>

                  {/* Add URL Row */}
                  <div className="flex items-center gap-2">
                    <input
                      type="url"
                      value={newPhotoUrlInput}
                      onChange={(e) => setNewPhotoUrlInput(e.target.value)}
                      placeholder="Paste image URL (e.g. Unsplash or hosted photo)..."
                      className="flex-1 px-3 py-2 rounded-xl border border-warm-sand/40 text-xs text-deep-brown bg-white outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAddPortfolioPhoto}
                      className="px-3.5 py-2 rounded-xl bg-deep-brown hover:bg-traditional-red text-cream-gold text-xs font-bold transition-colors flex items-center space-x-1 shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Photo</span>
                    </button>
                  </div>

                  {/* Thumbnails Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    {portfolioPhotos.map((photo, i) => (
                      <div key={i} className="relative group h-24 rounded-xl overflow-hidden border border-warm-sand/50 shadow-xs">
                        <img src={photo} alt={`Portfolio ${i + 1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemovePortfolioPhoto(i)}
                          className="absolute top-1 right-1 p-1 rounded-full bg-deep-brown/80 hover:bg-traditional-red text-white transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4 border-t border-warm-sand/30 flex items-center justify-between">
                  <p className="text-[11px] text-deep-brown/60">
                    By submitting, your profile is entered into KALAKRITI's living heritage registry.
                  </p>

                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-traditional-red hover:bg-traditional-red-dark text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center space-x-2"
                  >
                    <Sparkles className="w-4 h-4 text-cream-gold" />
                    <span>Complete Registration & Publish Profile</span>
                  </button>
                </div>

              </form>
            )}

            {/* ========================================================
                MODE 2: DIRECT ARTWORK POST CREATION
               ======================================================== */}
            {mode === 'ADD_ARTWORK' && (
              <form onSubmit={handleAddArtworkOnly} className="space-y-6">
                
                {/* Select Artist Profile */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-deep-brown">
                    Select Creator Profile (കലാകാരൻ) *
                  </label>
                  <select
                    value={selectedExistingArtistId}
                    onChange={(e) => setSelectedExistingArtistId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-warm-sand/50 text-xs text-deep-brown bg-white outline-none"
                  >
                    {artists.map((art) => (
                      <option key={art.id} value={art.id}>
                        {art.stageName || art.name} — {art.primaryArtformName} ({art.taluk})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Titles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-deep-brown">
                      Artwork Title in English *
                    </label>
                    <input
                      type="text"
                      required
                      value={artworkTitleEn}
                      onChange={(e) => setArtworkTitleEn(e.target.value)}
                      placeholder="e.g. Panchavarna Ganesha Fresco"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-warm-sand/50 text-xs text-deep-brown outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-deep-brown">
                      Artwork Title in Malayalam (മലയാളം നാമം)
                    </label>
                    <input
                      type="text"
                      value={artworkTitleMl}
                      onChange={(e) => setArtworkTitleMl(e.target.value)}
                      placeholder="e.g. പഞ്ചവർണ്ണ ഗണേശ ചുവർചിത്രം"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-warm-sand/50 text-xs text-deep-brown outline-none"
                    />
                  </div>
                </div>

                {/* Category & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-deep-brown">
                      Art Category *
                    </label>
                    <select
                      value={artworkCategory}
                      onChange={(e) => setArtworkCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-warm-sand/50 text-xs text-deep-brown bg-white outline-none"
                    >
                      <option value="Traditional Art">Traditional Painting & Murals</option>
                      <option value="Handicrafts">Handloom & Kasavu Weaving</option>
                      <option value="Metal & Sculpture">Bell Metal & Bronze Casting</option>
                      <option value="Woodcraft">Sacred Woodcraft & Masks</option>
                      <option value="Performing Arts">Kathakali & Melam Regalia</option>
                      <option value="Photography">Cultural Festival Photography</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-deep-brown flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-terracotta" />
                      <span>Creation Location in Thrissur *</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={artworkLocation}
                      onChange={(e) => setArtworkLocation(e.target.value)}
                      placeholder="e.g. Thiruvilwamala Weavers Street / Swaraj Round"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-warm-sand/50 text-xs text-deep-brown outline-none"
                    />
                  </div>
                </div>

                {/* Medium & Dimensions */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-deep-brown">Medium / Material *</label>
                    <input
                      type="text"
                      required
                      value={medium}
                      onChange={(e) => setMedium(e.target.value)}
                      placeholder="Natural Mineral Pigments / Wood"
                      className="w-full px-3 py-2 rounded-xl border border-warm-sand/50 text-xs text-deep-brown outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-deep-brown">Dimensions</label>
                    <input
                      type="text"
                      value={dimensions}
                      onChange={(e) => setDimensions(e.target.value)}
                      placeholder="36 x 24 inches / Standard"
                      className="w-full px-3 py-2 rounded-xl border border-warm-sand/50 text-xs text-deep-brown outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-deep-brown">Price / Inquiry Value</label>
                    <input
                      type="text"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="₹25,000 / Commission"
                      className="w-full px-3 py-2 rounded-xl border border-warm-sand/50 text-xs text-deep-brown outline-none"
                    />
                  </div>
                </div>

                {/* Description & Story */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-deep-brown">
                    Description & Cultural Story *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={storyEn}
                    onChange={(e) => setStoryEn(e.target.value)}
                    placeholder="Tell the cultural significance, techniques used, and generational story behind this artwork..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-warm-sand/50 text-xs text-deep-brown outline-none"
                  />
                </div>

                {/* Multiple Images Upload */}
                <div className="space-y-3 p-4 rounded-xl bg-parchment-warm/70 border border-warm-sand/40">
                  <label className="text-xs font-bold text-deep-brown flex items-center justify-between">
                    <span>Artwork Images ({artworkImages.length} Attached) *</span>
                    <span className="text-[10px] text-deep-brown/60">Large cultural photographs</span>
                  </label>

                  <div className="flex items-center gap-2">
                    <input
                      type="url"
                      value={artworkImageInput}
                      onChange={(e) => setArtworkImageInput(e.target.value)}
                      placeholder="Paste high-res image URL..."
                      className="flex-1 px-3 py-2 rounded-xl border border-warm-sand/40 text-xs text-deep-brown bg-white outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAddArtworkImage}
                      className="px-3.5 py-2 rounded-xl bg-deep-brown hover:bg-traditional-red text-cream-gold text-xs font-bold transition-colors flex items-center space-x-1 shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Image</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    {artworkImages.map((img, i) => (
                      <div key={i} className="relative group h-24 rounded-xl overflow-hidden border border-warm-sand/50">
                        <img src={img} alt={`Preview ${i + 1}`} className="w-full h-full object-cover" />
                        {artworkImages.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveArtworkImage(i)}
                            className="absolute top-1 right-1 p-1 rounded-full bg-deep-brown/80 hover:bg-traditional-red text-white transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submit Artwork Button */}
                <div className="pt-4 border-t border-warm-sand/30 flex items-center justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsUploadModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-warm-sand/50 text-xs font-semibold text-deep-brown hover:bg-parchment"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-traditional-red hover:bg-traditional-red-dark text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center space-x-2"
                  >
                    <Upload className="w-4 h-4 text-cream-gold" />
                    <span>Upload to Community Showcase</span>
                  </button>
                </div>

              </form>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
