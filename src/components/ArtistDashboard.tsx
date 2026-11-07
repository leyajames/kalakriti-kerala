import React, { useState } from 'react';
import { useCultural } from '../context/CulturalContext';
import { Artist, Artwork, Taluk } from '../types';
import {
  Plus,
  Edit3,
  Trash2,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
  Sparkles,
  MapPin,
  Image as ImageIcon,
  ExternalLink,
  ChevronRight,
  X,
  Upload,
  User,
  Layers,
  Heart,
  Share2,
  Tag
} from 'lucide-react';

export const ArtistDashboard: React.FC = () => {
  const {
    artists,
    currentDashboardArtistId,
    setCurrentDashboardArtistId,
    addArtworkToArtist,
    updateArtwork,
    deleteArtwork,
    navigateToArtistProfile,
    setActiveTab,
    language
  } = useCultural();

  // Find currently active artist profile
  const currentArtist: Artist =
    artists.find((a) => a.id === currentDashboardArtistId) || artists[0];

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingArtwork, setEditingArtwork] = useState<Artwork | null>(null);
  const [deletingArtworkId, setDeletingArtworkId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'APPROVED' | 'PENDING' | 'REJECTED'>('ALL');

  // Form State for Creating Artwork
  const [newTitleEn, setNewTitleEn] = useState('');
  const [newTitleMl, setNewTitleMl] = useState('');
  const [newCategory, setNewCategory] = useState(currentArtist?.primaryArtformName || 'Traditional Art');
  const [newLocation, setNewLocation] = useState(currentArtist?.studioAddress || `${currentArtist?.taluk}, Thrissur`);
  const [newMedium, setNewMedium] = useState('Panchavarna Natural Pigments / Teak');
  const [newPrice, setNewPrice] = useState('₹18,000');
  const [newCraftTechnique, setNewCraftTechnique] = useState('Traditional handcrafting method');
  const [newStoryEn, setNewStoryEn] = useState('');
  const [newImages, setNewImages] = useState<string[]>([
    '/assets/images/kerala-mural-venugopala.jpg'
  ]);
  const [newImageUrlInput, setNewImageUrlInput] = useState('');

  // Form State for Editing Artwork
  const [editTitleEn, setEditTitleEn] = useState('');
  const [editTitleMl, setEditTitleMl] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editLocation, setEditLocation] = useState('');
  const [editMedium, setEditMedium] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editStoryEn, setEditStoryEn] = useState('');
  const [editImages, setEditImages] = useState<string[]>([]);
  const [editImageInput, setEditImageInput] = useState('');

  // Handle adding image in Create form
  const handleAddNewImage = () => {
    if (newImageUrlInput.trim()) {
      setNewImages([...newImages, newImageUrlInput.trim()]);
      setNewImageUrlInput('');
    }
  };

  const handleRemoveNewImage = (idx: number) => {
    if (newImages.length > 1) {
      setNewImages(newImages.filter((_, i) => i !== idx));
    }
  };

  // Handle adding image in Edit form
  const handleAddEditImage = () => {
    if (editImageInput.trim()) {
      setEditImages([...editImages, editImageInput.trim()]);
      setEditImageInput('');
    }
  };

  const handleRemoveEditImage = (idx: number) => {
    if (editImages.length > 1) {
      setEditImages(editImages.filter((_, i) => i !== idx));
    }
  };

  // Open Edit Modal
  const openEditModal = (artwork: Artwork) => {
    setEditingArtwork(artwork);
    setEditTitleEn(artwork.titleEn);
    setEditTitleMl(artwork.titleMl);
    setEditCategory(artwork.category || artwork.artformName);
    setEditLocation(artwork.location || currentArtist.studioAddress || `${currentArtist.taluk}, Thrissur`);
    setEditMedium(artwork.medium);
    setEditPrice(artwork.price || 'Inquire');
    setEditStoryEn(artwork.storyEn);
    setEditImages([...artwork.images]);
  };

  // Save Created Artwork
  const handleCreateArtwork = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitleEn.trim()) return;

    const createdArtwork: Artwork = {
      id: `artwork-${Date.now()}`,
      artistId: currentArtist.id,
      artistName: currentArtist.stageName || currentArtist.name,
      titleEn: newTitleEn,
      titleMl: newTitleMl || 'കലാസൃഷ്ടി',
      artformId: currentArtist.primaryArtformId,
      artformName: currentArtist.primaryArtformName,
      craftTechnique: newCraftTechnique,
      medium: newMedium,
      dimensions: 'Standard Exhibition Size',
      yearCreated: new Date().getFullYear(),
      images: newImages,
      price: newPrice,
      isForSale: true,
      storyEn: newStoryEn || `${newTitleEn} created in ${newLocation}.`,
      storyMl: 'തൃശ്ശൂരിൽ നിർമ്മിച്ച പരമ്പരാഗത സൃഷ്ടി.',
      viewsCount: 1,
      likesCount: 1,
      category: newCategory,
      location: newLocation,
      approvalStatus: 'PENDING',
      createdAt: 'Just now'
    };

    addArtworkToArtist(currentArtist.id, createdArtwork);
    setIsCreateModalOpen(false);
    // Reset form
    setNewTitleEn('');
    setNewTitleMl('');
    setNewStoryEn('');
    setNewImages(['/assets/images/kerala-mural-venugopala.jpg']);
  };

  // Save Edited Artwork
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArtwork) return;

    updateArtwork(currentArtist.id, editingArtwork.id, {
      titleEn: editTitleEn,
      titleMl: editTitleMl,
      category: editCategory,
      location: editLocation,
      medium: editMedium,
      price: editPrice,
      storyEn: editStoryEn,
      images: editImages
    });

    setEditingArtwork(null);
  };

  // Confirm Delete
  const handleConfirmDelete = () => {
    if (deletingArtworkId) {
      deleteArtwork(currentArtist.id, deletingArtworkId);
      setDeletingArtworkId(null);
    }
  };

  const artworks = currentArtist?.artworks || [];

  // Filter artworks by status
  const filteredArtworks = artworks.filter((aw) => {
    const status = aw.approvalStatus || 'APPROVED';
    if (statusFilter === 'ALL') return true;
    return status === statusFilter;
  });

  // Calculate metrics
  const totalSubmissions = artworks.length;
  const approvedCount = artworks.filter((a) => (a.approvalStatus || 'APPROVED') === 'APPROVED').length;
  const pendingCount = artworks.filter((a) => a.approvalStatus === 'PENDING').length;
  const totalLikes = artworks.reduce((acc, a) => acc + (a.likesCount || 0), 0);

  return (
    <div className="min-h-screen bg-parchment-texture py-10 selection:bg-cream-gold selection:text-deep-brown">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* ========================================================
            TOP BANNER: ARTIST CONTEXT & PROFILE ACTIONS
           ======================================================== */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-warm-sand/50 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="flex items-center space-x-4 sm:space-x-6">
            <img
              src={currentArtist.avatar}
              alt={currentArtist.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-4 border-cream-gold shadow-md shrink-0 bg-white"
            />
            
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-full bg-cream-gold/30 border border-cream-gold text-deep-brown text-[10px] font-bold uppercase tracking-wider">
                  Artist Studio Dashboard
                </span>
                {currentArtist.isVerified && (
                  <span className="px-2.5 py-0.5 rounded-full bg-olive-green text-cream-gold text-[10px] font-bold flex items-center space-x-1">
                    <CheckCircle className="w-3 h-3" />
                    <span>Verified Master</span>
                  </span>
                )}
              </div>

              <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-deep-brown">
                {currentArtist.stageName || currentArtist.name}
              </h1>

              <p className="text-xs sm:text-sm text-terracotta font-semibold">
                {currentArtist.primaryArtformName} • {currentArtist.taluk} Taluk
              </p>

              <p className="text-[11px] text-deep-brown/70 flex items-center space-x-1">
                <MapPin className="w-3 h-3" />
                <span>{currentArtist.studioAddress}</span>
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Context Switcher for demo & multi-profile usage */}
            <div className="relative">
              <select
                value={currentArtist.id}
                onChange={(e) => setCurrentDashboardArtistId(e.target.value)}
                className="px-3 py-2 rounded-xl bg-parchment-warm border border-warm-sand/50 text-xs font-semibold text-deep-brown outline-none cursor-pointer"
                title="Switch active artist profile"
              >
                {artists.map((a) => (
                  <option key={a.id} value={a.id}>
                    Switch to: {a.stageName || a.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => navigateToArtistProfile(currentArtist)}
              className="px-4 py-2.5 rounded-xl border border-warm-sand/60 bg-white hover:bg-parchment text-deep-brown text-xs font-bold transition-colors flex items-center space-x-1.5 shadow-xs"
            >
              <Eye className="w-3.5 h-3.5 text-terracotta" />
              <span>Public Profile</span>
            </button>

            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-traditional-red hover:bg-traditional-red-dark text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center space-x-1.5"
            >
              <Plus className="w-4 h-4 text-cream-gold" />
              <span>Create New Artwork Post</span>
            </button>
          </div>

        </div>

        {/* ========================================================
            METRICS OVERVIEW CARDS
           ======================================================== */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-warm-sand/50 shadow-soft space-y-1">
            <span className="text-[10px] uppercase font-bold text-deep-brown/60 tracking-wider">
              Total Submissions
            </span>
            <p className="font-display text-3xl font-bold text-deep-brown">
              {totalSubmissions}
            </p>
            <p className="text-[11px] text-deep-brown/70">Works in portfolio</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-warm-sand/50 shadow-soft space-y-1">
            <span className="text-[10px] uppercase font-bold text-olive-green tracking-wider">
              Published in Showcase
            </span>
            <p className="font-display text-3xl font-bold text-olive-green">
              {approvedCount}
            </p>
            <p className="text-[11px] text-deep-brown/70">Live in Community Showcase</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-warm-sand/50 shadow-soft space-y-1">
            <span className="text-[10px] uppercase font-bold text-terracotta tracking-wider">
              Under Curation Review
            </span>
            <p className="font-display text-3xl font-bold text-terracotta">
              {pendingCount}
            </p>
            <p className="text-[11px] text-deep-brown/70">Awaiting desk review</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-warm-sand/50 shadow-soft space-y-1">
            <span className="text-[10px] uppercase font-bold text-traditional-red tracking-wider">
              Community Appreciation
            </span>
            <p className="font-display text-3xl font-bold text-traditional-red">
              {totalLikes}
            </p>
            <p className="text-[11px] text-deep-brown/70">Total likes received</p>
          </div>
        </div>

        {/* ========================================================
            MAIN WORK POSTS MANAGEMENT FEED
           ======================================================== */}
        <div className="space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-warm-sand/30 pb-4">
            <div>
              <h2 className="font-display text-2xl font-bold text-deep-brown">
                My Artwork Submissions & Cultural Posts
              </h2>
              <p className="text-xs text-deep-brown/75">
                Manage your portfolio creations, update cultural stories, track curation status, and delete entries.
              </p>
            </div>

            {/* Filter Tabs by Status */}
            <div className="flex items-center space-x-1.5 bg-white p-1 rounded-xl border border-warm-sand/40 self-start sm:self-auto">
              <button
                onClick={() => setStatusFilter('ALL')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  statusFilter === 'ALL'
                    ? 'bg-deep-brown text-cream-gold'
                    : 'text-deep-brown/70 hover:bg-parchment'
                }`}
              >
                All ({artworks.length})
              </button>
              <button
                onClick={() => setStatusFilter('APPROVED')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  statusFilter === 'APPROVED'
                    ? 'bg-olive-green text-white'
                    : 'text-deep-brown/70 hover:bg-parchment'
                }`}
              >
                Published ({approvedCount})
              </button>
              <button
                onClick={() => setStatusFilter('PENDING')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  statusFilter === 'PENDING'
                    ? 'bg-terracotta text-white'
                    : 'text-deep-brown/70 hover:bg-parchment'
                }`}
              >
                Pending Review ({pendingCount})
              </button>
            </div>
          </div>

          {/* Submissions List */}
          {filteredArtworks.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-warm-sand/50 shadow-soft space-y-4">
              <div className="w-16 h-16 rounded-full bg-parchment-warm text-terracotta flex items-center justify-center mx-auto">
                <ImageIcon className="w-8 h-8" />
              </div>
              <h3 className="font-display text-xl font-bold text-deep-brown">
                No submissions found for this filter
              </h3>
              <p className="text-xs text-deep-brown/70 max-w-sm mx-auto">
                Upload your artworks, photographs, or traditional craft creations to showcase them to visitors across Kerala.
              </p>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-traditional-red hover:bg-traditional-red-dark text-white text-xs font-bold shadow transition-all inline-flex items-center space-x-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Create Artwork Post Now</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArtworks.map((aw) => {
                const status = aw.approvalStatus || 'APPROVED';
                return (
                  <div
                    key={aw.id}
                    className="bg-white rounded-2xl overflow-hidden border border-warm-sand/50 shadow-soft hover:shadow-cultural transition-all flex flex-col justify-between"
                  >
                    {/* Image Thumbnail Banner */}
                    <div className="relative h-56 bg-deep-brown overflow-hidden">
                      <img
                        src={aw.images[0]}
                        alt={aw.titleEn}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-deep-brown/80 via-transparent to-transparent" />

                      {/* Status Badge */}
                      <div className="absolute top-3 left-3">
                        {status === 'APPROVED' && (
                          <span className="px-2.5 py-1 rounded-full bg-olive-green text-white text-[10px] font-bold shadow-md flex items-center space-x-1">
                            <CheckCircle className="w-3 h-3 text-cream-gold" />
                            <span>Published in Showcase</span>
                          </span>
                        )}
                        {status === 'PENDING' && (
                          <span className="px-2.5 py-1 rounded-full bg-terracotta text-white text-[10px] font-bold shadow-md flex items-center space-x-1">
                            <Clock className="w-3 h-3 text-cream-gold" />
                            <span>Pending Curation Desk</span>
                          </span>
                        )}
                        {status === 'REJECTED' && (
                          <span className="px-2.5 py-1 rounded-full bg-traditional-red text-white text-[10px] font-bold shadow-md flex items-center space-x-1">
                            <AlertCircle className="w-3 h-3" />
                            <span>Revision Needed</span>
                          </span>
                        )}
                      </div>

                      {/* Image Count Pill */}
                      <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-deep-brown/80 backdrop-blur-sm text-cream-gold text-[10px] font-mono border border-cream-gold/30">
                        {aw.images.length} Image{aw.images.length > 1 ? 's' : ''}
                      </span>

                      {/* Bottom Title Overlay */}
                      <div className="absolute bottom-3 left-4 right-4 text-white">
                        <span className="text-[10px] text-cream-gold uppercase font-bold tracking-wider">
                          {aw.category || aw.artformName}
                        </span>
                        <h3 className="font-display text-lg font-bold leading-snug drop-shadow">
                          {language === 'en' ? aw.titleEn : aw.titleMl}
                        </h3>
                      </div>
                    </div>

                    {/* Body Details */}
                    <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <p className="text-xs text-deep-brown/80 line-clamp-2 leading-relaxed">
                          {aw.storyEn}
                        </p>

                        <div className="space-y-1 text-[11px] text-deep-brown/70 bg-parchment-warm p-3 rounded-xl border border-warm-sand/30">
                          <p className="flex items-center justify-between">
                            <span className="font-semibold text-deep-brown">Medium:</span>
                            <span className="truncate max-w-[160px]">{aw.medium}</span>
                          </p>
                          <p className="flex items-center justify-between">
                            <span className="font-semibold text-deep-brown">Location:</span>
                            <span className="truncate max-w-[160px]">{aw.location || currentArtist.taluk}</span>
                          </p>
                          <p className="flex items-center justify-between">
                            <span className="font-semibold text-deep-brown">Value / Price:</span>
                            <span className="font-bold text-terracotta">{aw.price || 'Inquiry'}</span>
                          </p>
                        </div>
                      </div>

                      {/* Card Action Controls: Edit & Delete */}
                      <div className="pt-3 border-t border-warm-sand/30 flex items-center justify-between gap-2">
                        <div className="flex items-center space-x-1 text-xs text-traditional-red font-bold">
                          <Heart className="w-3.5 h-3.5 fill-current" />
                          <span>{aw.likesCount || 1} Likes</span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => openEditModal(aw)}
                            className="px-3 py-1.5 rounded-lg bg-parchment-warm hover:bg-cream-gold/40 text-deep-brown text-xs font-semibold transition-colors flex items-center space-x-1 border border-warm-sand/40"
                            title="Edit this submission"
                          >
                            <Edit3 className="w-3 h-3 text-terracotta" />
                            <span>Edit</span>
                          </button>

                          <button
                            onClick={() => setDeletingArtworkId(aw.id)}
                            className="px-2.5 py-1.5 rounded-lg bg-red-50 hover:bg-traditional-red hover:text-white text-traditional-red text-xs font-semibold transition-colors flex items-center space-x-1 border border-red-200"
                            title="Delete submission"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span className="hidden sm:inline">Delete</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>

      </div>

      {/* ========================================================
          CREATE NEW ARTWORK POST MODAL
         ======================================================== */}
      {isCreateModalOpen && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-labelledby="create-post-title"
          className="fixed inset-0 z-60 overflow-y-auto bg-deep-brown/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn select-none"
        >
          <div className="relative w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-cultural border-2 border-cream-gold my-6">
            
            <div className="p-5 bg-parchment-warm border-b border-warm-sand/30 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-terracotta uppercase tracking-wider">
                  New Cultural Showcase Post
                </span>
                <h3 id="create-post-title" className="font-display text-xl font-bold text-deep-brown">
                  Publish Artwork by {currentArtist.stageName || currentArtist.name}
                </h3>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-2 rounded-full hover:bg-white text-deep-brown/60 hover:text-traditional-red transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateArtwork} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
              
              {/* Title Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-deep-brown">Artwork Title in English *</label>
                  <input
                    type="text"
                    required
                    value={newTitleEn}
                    onChange={(e) => setNewTitleEn(e.target.value)}
                    placeholder="e.g. Panchavarna Kathakali Mural"
                    className="w-full px-3 py-2 rounded-xl border border-warm-sand/50 text-xs text-deep-brown outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-deep-brown">Title in Malayalam (മലയാളം)</label>
                  <input
                    type="text"
                    value={newTitleMl}
                    onChange={(e) => setNewTitleMl(e.target.value)}
                    placeholder="e.g. കഥകളി ചുവർചിത്രം"
                    className="w-full px-3 py-2 rounded-xl border border-warm-sand/50 text-xs text-deep-brown outline-none"
                  />
                </div>
              </div>

              {/* Category & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-deep-brown">Art Category *</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-warm-sand/50 text-xs text-deep-brown bg-white outline-none"
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
                  <label className="font-bold text-deep-brown">Creation Location in Thrissur *</label>
                  <input
                    type="text"
                    required
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    placeholder="e.g. Thiruvilwamala Weavers Street"
                    className="w-full px-3 py-2 rounded-xl border border-warm-sand/50 text-xs text-deep-brown outline-none"
                  />
                </div>
              </div>

              {/* Medium & Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-deep-brown">Medium / Materials *</label>
                  <input
                    type="text"
                    required
                    value={newMedium}
                    onChange={(e) => setNewMedium(e.target.value)}
                    placeholder="e.g. Natural Stone Pigments on Teakwood"
                    className="w-full px-3 py-2 rounded-xl border border-warm-sand/50 text-xs text-deep-brown outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-deep-brown">Price / Valuation</label>
                  <input
                    type="text"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    placeholder="e.g. ₹22,000 / Commission"
                    className="w-full px-3 py-2 rounded-xl border border-warm-sand/50 text-xs text-deep-brown outline-none"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="font-bold text-deep-brown">Artwork Description & Cultural Story *</label>
                <textarea
                  rows={3}
                  required
                  value={newStoryEn}
                  onChange={(e) => setNewStoryEn(e.target.value)}
                  placeholder="Describe the craftsmanship, iconography, and cultural backstory..."
                  className="w-full px-3 py-2 rounded-xl border border-warm-sand/50 text-xs text-deep-brown outline-none"
                />
              </div>

              {/* Multiple Images Upload & Manage */}
              <div className="space-y-2 p-3.5 rounded-xl bg-parchment-warm/70 border border-warm-sand/40">
                <label className="font-bold text-deep-brown flex items-center justify-between">
                  <span>Artwork Images ({newImages.length} attached) *</span>
                  <span className="text-[10px] text-deep-brown/60">Upload multiple photos</span>
                </label>

                <div className="flex items-center gap-2">
                  <input
                    type="url"
                    value={newImageUrlInput}
                    onChange={(e) => setNewImageUrlInput(e.target.value)}
                    placeholder="Paste image URL..."
                    className="flex-1 px-3 py-1.5 rounded-lg border border-warm-sand/40 text-xs text-deep-brown bg-white outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddNewImage}
                    className="px-3 py-1.5 rounded-lg bg-deep-brown hover:bg-traditional-red text-cream-gold font-bold transition-colors"
                  >
                    Add
                  </button>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 pt-1">
                  {newImages.map((img, i) => (
                    <div key={i} className="relative group h-20 rounded-lg overflow-hidden border border-warm-sand/40">
                      <img src={img} alt={`Preview ${i + 1}`} className="w-full h-full object-cover" />
                      {newImages.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveNewImage(i)}
                          className="absolute top-1 right-1 p-1 rounded-full bg-deep-brown/80 hover:bg-traditional-red text-white"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-3 border-t border-warm-sand/30 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-warm-sand/50 font-semibold text-deep-brown hover:bg-parchment"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-traditional-red hover:bg-traditional-red-dark text-white font-bold shadow transition-all flex items-center space-x-1.5"
                >
                  <Plus className="w-4 h-4 text-cream-gold" />
                  <span>Submit to Showcase Queue</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          EDIT EXISTING SUBMISSION MODAL
         ======================================================== */}
      {editingArtwork && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-labelledby="edit-post-title"
          className="fixed inset-0 z-60 overflow-y-auto bg-deep-brown/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn select-none"
        >
          <div className="relative w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-cultural border-2 border-cream-gold my-6">
            
            <div className="p-5 bg-parchment-warm border-b border-warm-sand/30 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-terracotta uppercase tracking-wider">
                  Edit Artwork Submission
                </span>
                <h3 id="edit-post-title" className="font-display text-xl font-bold text-deep-brown">
                  {editingArtwork.titleEn}
                </h3>
              </div>
              <button
                onClick={() => setEditingArtwork(null)}
                className="p-2 rounded-full hover:bg-white text-deep-brown/60 hover:text-traditional-red transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-deep-brown">Title in English *</label>
                  <input
                    type="text"
                    required
                    value={editTitleEn}
                    onChange={(e) => setEditTitleEn(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-warm-sand/50 text-xs text-deep-brown outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-deep-brown">Title in Malayalam</label>
                  <input
                    type="text"
                    value={editTitleMl}
                    onChange={(e) => setEditTitleMl(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-warm-sand/50 text-xs text-deep-brown outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-deep-brown">Art Category</label>
                  <input
                    type="text"
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-warm-sand/50 text-xs text-deep-brown outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-deep-brown">Location in Thrissur</label>
                  <input
                    type="text"
                    value={editLocation}
                    onChange={(e) => setEditLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-warm-sand/50 text-xs text-deep-brown outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-deep-brown">Medium</label>
                  <input
                    type="text"
                    value={editMedium}
                    onChange={(e) => setEditMedium(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-warm-sand/50 text-xs text-deep-brown outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-deep-brown">Price</label>
                  <input
                    type="text"
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-warm-sand/50 text-xs text-deep-brown outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-deep-brown">Description & Story</label>
                <textarea
                  rows={3}
                  value={editStoryEn}
                  onChange={(e) => setEditStoryEn(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-warm-sand/50 text-xs text-deep-brown outline-none"
                />
              </div>

              {/* Multiple Images Upload in Edit */}
              <div className="space-y-2 p-3.5 rounded-xl bg-parchment-warm/70 border border-warm-sand/40">
                <label className="font-bold text-deep-brown flex items-center justify-between">
                  <span>Attached Images ({editImages.length})</span>
                </label>

                <div className="flex items-center gap-2">
                  <input
                    type="url"
                    value={editImageInput}
                    onChange={(e) => setEditImageInput(e.target.value)}
                    placeholder="Add image link..."
                    className="flex-1 px-3 py-1.5 rounded-lg border border-warm-sand/40 text-xs text-deep-brown bg-white outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddEditImage}
                    className="px-3 py-1.5 rounded-lg bg-deep-brown hover:bg-traditional-red text-cream-gold font-bold transition-colors"
                  >
                    Add
                  </button>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 pt-1">
                  {editImages.map((img, i) => (
                    <div key={i} className="relative group h-20 rounded-lg overflow-hidden border border-warm-sand/40">
                      <img src={img} alt={`Edit ${i + 1}`} className="w-full h-full object-cover" />
                      {editImages.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveEditImage(i)}
                          className="absolute top-1 right-1 p-1 rounded-full bg-deep-brown/80 hover:bg-traditional-red text-white"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-warm-sand/30 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setEditingArtwork(null)}
                  className="px-4 py-2 rounded-xl border border-warm-sand/50 font-semibold text-deep-brown hover:bg-parchment"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-traditional-red hover:bg-traditional-red-dark text-white font-bold shadow transition-all"
                >
                  Save Changes
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          DELETE CONFIRMATION DIALOG
         ======================================================== */}
      {deletingArtworkId && (
        <div 
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="delete-dialog-title"
          className="fixed inset-0 z-70 bg-deep-brown/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
        >
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full border border-warm-sand/50 shadow-cultural space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-traditional-red flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            
            <h4 id="delete-dialog-title" className="font-display text-lg font-bold text-deep-brown">
              Delete Artwork Submission?
            </h4>

            <p className="text-xs text-deep-brown/70 leading-relaxed">
              This will permanently remove this artwork from your artist portfolio and the Community Showcase. This action cannot be undone.
            </p>

            <div className="flex items-center justify-center space-x-3 pt-2">
              <button
                onClick={() => setDeletingArtworkId(null)}
                className="px-4 py-2 rounded-xl border border-warm-sand/50 text-xs font-semibold text-deep-brown hover:bg-parchment"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-xl bg-traditional-red hover:bg-traditional-red-dark text-white text-xs font-bold shadow transition-colors"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

