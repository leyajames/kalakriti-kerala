import React, { useState } from 'react';
import { useCultural } from '../context/CulturalContext';
import { 
  AdminSubmissionItem, 
  SubmissionStatus, 
  SubmissionEntityType, 
  ModerationLogEntry 
} from '../types';
import { 
  ShieldCheck, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Edit3, 
  Trash2, 
  Eye, 
  Search, 
  Filter, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  Building2, 
  Sparkles, 
  FileText, 
  Calendar, 
  Palette, 
  Landmark, 
  Compass, 
  ExternalLink,
  ChevronRight,
  Download,
  Lock,
  ArrowRight,
  Check,
  X,
  History,
  ShieldAlert,
  HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AdminDashboard: React.FC = () => {
  const { 
    language, 
    user, 
    setUser,
    setIsAuthModalOpen, 
    loginAsDemoAdmin,
    adminSubmissions,
    moderationLogs,
    approveSubmission,
    rejectSubmission,
    requestChangesSubmission,
    editSubmission,
    deleteSubmission
  } = useCultural();

  // Authentication Guard Check
  const isAdmin = user?.role === 'admin';

  // Navigation & Filtering State
  const [activeTab, setActiveTab] = useState<'ALL' | SubmissionEntityType | 'LOGS'>('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | SubmissionStatus>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals State
  const [inspectItem, setInspectItem] = useState<AdminSubmissionItem | null>(null);
  const [rejectingItem, setRejectingItem] = useState<AdminSubmissionItem | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [customRejectReason, setCustomRejectReason] = useState('');
  
  const [changesItem, setChangesItem] = useState<AdminSubmissionItem | null>(null);
  const [correctionNotes, setCorrectionNotes] = useState('');

  const [editingItem, setEditingItem] = useState<AdminSubmissionItem | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<AdminSubmissionItem>>({});

  const [deleteConfirmItem, setDeleteConfirmItem] = useState<AdminSubmissionItem | null>(null);

  // Success Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Preset rejection reasons for rapid curator review
  const PRESET_REJECTION_REASONS = [
    'Commercial mass-produced souvenir without traditional artisan provenance.',
    'Inaccurate historical claims lacking verifiable scholarly or ASI documentation.',
    'Low-resolution photographs or watermarked commercial stock images.',
    'Duplicate entry already catalogued on the cultural discovery map.',
    'Inappropriate or copyrighted content not adhering to traditional preservation guidelines.'
  ];

  // Preset correction requests
  const PRESET_CORRECTION_NOTES = [
    'Please upload high-resolution photographs of your artwork or temple architecture.',
    'Please cite authentic historical publications or temple committee archives.',
    'Please clarify non-Hindu courtyard entry rules and dress code guidelines.',
    'Please verify organizer phone number and confirmed venue clearance.',
    'Please state dimensions, weight, and Geographical Indication (GI) tag registration.'
  ];

  // Filter Submissions
  const filteredSubmissions = adminSubmissions.filter((item) => {
    // Tab filter
    if (activeTab !== 'ALL' && activeTab !== 'LOGS' && item.entityType !== activeTab) {
      return false;
    }
    // Status filter
    if (statusFilter !== 'ALL' && item.status !== statusFilter) {
      return false;
    }
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q) || (item.titleMl && item.titleMl.toLowerCase().includes(q));
      const matchContributor = item.contributor.name.toLowerCase().includes(q) || (item.contributor.organization && item.contributor.organization.toLowerCase().includes(q));
      const matchArtform = item.artform && item.artform.toLowerCase().includes(q);
      const matchTaluk = item.taluk && item.taluk.toLowerCase().includes(q);
      return matchTitle || matchContributor || matchArtform || matchTaluk;
    }
    return true;
  });

  // Calculate stats
  const totalCount = adminSubmissions.length;
  const pendingCount = adminSubmissions.filter(i => i.status === 'PENDING').length;
  const changesCount = adminSubmissions.filter(i => i.status === 'NEEDS_CHANGES').length;
  const approvedCount = adminSubmissions.filter(i => i.status === 'APPROVED').length;
  const rejectedCount = adminSubmissions.filter(i => i.status === 'REJECTED').length;

  // Handlers
  const handleApprove = (item: AdminSubmissionItem) => {
    approveSubmission(item.id);
    showToast(`Approved "${item.title}". Entry is now publicly visible.`);
    if (inspectItem?.id === item.id) setInspectItem(null);
  };

  const handleConfirmReject = () => {
    if (!rejectingItem) return;
    const finalReason = rejectReason === 'Other' ? customRejectReason : rejectReason;
    if (!finalReason.trim()) {
      alert('Please provide a reason for rejecting this submission.');
      return;
    }
    rejectSubmission(rejectingItem.id, finalReason);
    showToast(`Rejected "${rejectingItem.title}". Reason logged.`);
    setRejectingItem(null);
    setRejectReason('');
    setCustomRejectReason('');
    if (inspectItem?.id === rejectingItem.id) setInspectItem(null);
  };

  const handleConfirmChanges = () => {
    if (!changesItem) return;
    if (!correctionNotes.trim()) {
      alert('Please specify the revisions required from the contributor.');
      return;
    }
    requestChangesSubmission(changesItem.id, correctionNotes);
    showToast(`Requested changes for "${changesItem.title}". Feedback dispatched.`);
    setChangesItem(null);
    setCorrectionNotes('');
    if (inspectItem?.id === changesItem.id) setInspectItem(null);
  };

  const handleSaveEdit = () => {
    if (!editingItem) return;
    editSubmission(editingItem.id, editFormData);
    showToast(`Updated "${editingItem.title}" successfully.`);
    setEditingItem(null);
    setEditFormData({});
    if (inspectItem?.id === editingItem.id) {
      setInspectItem({ ...inspectItem, ...editFormData });
    }
  };

  const handleConfirmDelete = () => {
    if (!deleteConfirmItem) return;
    deleteSubmission(deleteConfirmItem.id);
    showToast(`Removed "${deleteConfirmItem.title}" from moderation database.`);
    setDeleteConfirmItem(null);
    if (inspectItem?.id === deleteConfirmItem.id) setInspectItem(null);
  };

  const handleExportLogs = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(moderationLogs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `kalakriti_moderation_logs_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // ==========================================================================
  // 1. SECURITY ACCESS GUARD (Unauthorized View)
  // ==========================================================================
  if (!isAdmin) {
    return (
      <section className="py-20 bg-parchment-texture min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-lg w-full bg-white rounded-3xl p-8 sm:p-10 shadow-cultural border-2 border-warm-sand/50 text-center space-y-6 relative overflow-hidden"
        >
          {/* Traditional Kerala Gopuram Border Top */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-traditional-red via-cream-gold to-terracotta" />

          <div className="w-20 h-20 rounded-full bg-traditional-red/10 border-2 border-traditional-red/40 flex items-center justify-center mx-auto text-traditional-red">
            <Lock className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-traditional-red/15 text-traditional-red text-xs font-bold uppercase tracking-wider inline-flex items-center space-x-1.5">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Restricted Security Area</span>
            </span>
            <h2 className="font-display text-3xl font-bold text-deep-brown">
              Admin Authorization Required
            </h2>
            <p className="font-malayalam text-sm text-terracotta font-medium">
              അഡ്മിനിസ്ട്രേറ്റർ അനുമതി ആവശ്യമാണ്
            </p>
          </div>

          <p className="text-sm text-deep-brown/80 leading-relaxed">
            The KALAKRITI Curation & Moderation Console is restricted to authenticated cultural curators, epigraphists, and authorized state administrators to protect cultural integrity and authenticate traditional lineages.
          </p>

          <div className="pt-2 space-y-3">
            {/* Real Login via Auth Modal */}
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="w-full flex items-center justify-center space-x-2 py-3 px-6 rounded-xl bg-deep-brown hover:bg-traditional-red text-cream-gold font-bold text-sm shadow-md transition-all duration-200"
            >
              <User className="w-4 h-4 text-cream-gold" />
              <span>Login to Authorized Admin Account</span>
            </button>

            {/* Quick Demo Access for Evaluators */}
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-warm-sand/40" /></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-3 text-deep-brown/60 font-semibold">Evaluation Mode</span></div>
            </div>

            <button
              onClick={loginAsDemoAdmin}
              className="w-full flex items-center justify-center space-x-2 py-3 px-6 rounded-xl bg-cream-gold/30 hover:bg-cream-gold/50 text-deep-brown font-bold text-sm border border-cream-gold transition-all duration-200"
            >
              <Sparkles className="w-4 h-4 text-terracotta" />
              <span>Enter as Demo Admin (Chief Curator)</span>
              <ArrowRight className="w-4 h-4 text-deep-brown" />
            </button>
          </div>

          <div className="pt-4 border-t border-warm-sand/30 text-[11px] text-deep-brown/60 flex items-center justify-center space-x-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-olive-green" />
            <span>Role-Based Access Control Enforced via Supabase RLS</span>
          </div>
        </motion.div>
      </section>
    );
  }

  // ==========================================================================
  // 2. AUTHORIZED ADMIN DASHBOARD VIEW
  // ==========================================================================
  return (
    <div className="bg-parchment-texture min-h-[calc(100vh-80px)] py-10 pb-24">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-6 z-50 bg-deep-brown text-cream-gold px-5 py-3.5 rounded-2xl shadow-cultural border border-cream-gold flex items-center space-x-3 text-sm font-semibold"
          >
            <CheckCircle className="w-5 h-5 text-cream-gold shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Editorial Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-warm-sand/30 pb-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-olive-green/20 text-olive-green text-xs font-bold border border-olive-green/30">
              <ShieldCheck className="w-4 h-4 text-olive-green" />
              <span>Authorized Admin Session Active</span>
              <span className="w-1.5 h-1.5 rounded-full bg-olive-green animate-pulse" />
            </div>

            <div className="flex items-baseline space-x-3">
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-deep-brown">
                {language === 'en' ? 'Cultural Moderation Console' : 'സാംസ്കാരിക പരിശോധനാ ഡെസ്ക്'}
              </h1>
              <span className="font-malayalam text-lg text-terracotta font-semibold hidden sm:inline">
                അഡ്മിൻ ഡാഷ്‌ബോർഡ്
              </span>
            </div>

            <p className="text-sm text-deep-brown/80 leading-relaxed">
              Review, verify, audit, and safeguard cultural listings, living master artisan ateliers, artwork submissions, and event notices before public exhibition on Thrissur's digital sanctuary.
            </p>
          </div>

          {/* Admin Identity Card */}
          <div className="bg-white p-4 rounded-2xl border border-warm-sand/50 shadow-soft flex items-center space-x-4 shrink-0">
            <div className="w-12 h-12 rounded-xl bg-deep-brown text-cream-gold flex items-center justify-center font-display font-bold text-lg border border-cream-gold">
              {user.name.charAt(0)}
            </div>
            <div className="text-left space-y-0.5">
              <div className="flex items-center space-x-1.5">
                <p className="font-bold text-sm text-deep-brown">{user.name}</p>
                <span className="px-1.5 py-0.5 rounded bg-traditional-red text-white text-[10px] font-bold uppercase">
                  Admin
                </span>
              </div>
              <p className="text-xs text-deep-brown/70">{user.email || 'admin@kalakriti.kerala.gov.in'}</p>
              <button 
                onClick={() => setUser(null)}
                className="text-[11px] text-traditional-red hover:underline font-semibold"
              >
                Sign out of Admin
              </button>
            </div>
          </div>
        </div>

        {/* Quick KPI Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          
          <div className="bg-white p-4 rounded-2xl border border-warm-sand/40 shadow-soft space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-deep-brown/70">Total Queue</span>
              <FileText className="w-4 h-4 text-warm-sand" />
            </div>
            <p className="font-display text-2xl sm:text-3xl font-bold text-deep-brown">{totalCount}</p>
            <p className="text-[11px] text-deep-brown/60">Submissions received</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-traditional-red/30 shadow-soft space-y-1 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-12 h-12 bg-traditional-red/10 rounded-bl-full pointer-events-none" />
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-traditional-red">Pending Review</span>
              <Clock className="w-4 h-4 text-traditional-red animate-pulse" />
            </div>
            <p className="font-display text-2xl sm:text-3xl font-bold text-traditional-red">{pendingCount}</p>
            <p className="text-[11px] text-traditional-red/80 font-medium">Action required</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-terracotta/30 shadow-soft space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-terracotta">Needs Changes</span>
              <AlertTriangle className="w-4 h-4 text-terracotta" />
            </div>
            <p className="font-display text-2xl sm:text-3xl font-bold text-terracotta">{changesCount}</p>
            <p className="text-[11px] text-terracotta/80">Returned to author</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-olive-green/30 shadow-soft space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-olive-green">Approved Live</span>
              <CheckCircle className="w-4 h-4 text-olive-green" />
            </div>
            <p className="font-display text-2xl sm:text-3xl font-bold text-olive-green">{approvedCount}</p>
            <p className="text-[11px] text-olive-green/80">Publicly visible</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-warm-sand/40 shadow-soft space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-deep-brown/70">Audit Logs</span>
              <History className="w-4 h-4 text-warm-sand" />
            </div>
            <p className="font-display text-2xl sm:text-3xl font-bold text-deep-brown">{moderationLogs.length}</p>
            <p className="text-[11px] text-deep-brown/60">Actions recorded</p>
          </div>

        </div>

        {/* Navigation Tabs Bar & Search */}
        <div className="bg-white rounded-2xl border border-warm-sand/40 p-4 shadow-soft space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Stream Category Tabs */}
            <div className="flex items-center space-x-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              
              <button
                onClick={() => setActiveTab('ALL')}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                  activeTab === 'ALL'
                    ? 'bg-deep-brown text-cream-gold shadow-sm'
                    : 'text-deep-brown/80 hover:bg-parchment-warm'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>All Submissions ({adminSubmissions.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('LISTING')}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                  activeTab === 'LISTING'
                    ? 'bg-deep-brown text-cream-gold shadow-sm'
                    : 'text-deep-brown/80 hover:bg-parchment-warm'
                }`}
              >
                <Landmark className="w-3.5 h-3.5 text-terracotta" />
                <span>Cultural Listings ({adminSubmissions.filter(i => i.entityType === 'LISTING').length})</span>
              </button>

              <button
                onClick={() => setActiveTab('ARTIST_PROFILE')}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                  activeTab === 'ARTIST_PROFILE'
                    ? 'bg-deep-brown text-cream-gold shadow-sm'
                    : 'text-deep-brown/80 hover:bg-parchment-warm'
                }`}
              >
                <User className="w-3.5 h-3.5 text-cream-gold" />
                <span>Artist Profiles ({adminSubmissions.filter(i => i.entityType === 'ARTIST_PROFILE').length})</span>
              </button>

              <button
                onClick={() => setActiveTab('ARTWORK')}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                  activeTab === 'ARTWORK'
                    ? 'bg-deep-brown text-cream-gold shadow-sm'
                    : 'text-deep-brown/80 hover:bg-parchment-warm'
                }`}
              >
                <Palette className="w-3.5 h-3.5 text-olive-green" />
                <span>Artwork ({adminSubmissions.filter(i => i.entityType === 'ARTWORK').length})</span>
              </button>

              <button
                onClick={() => setActiveTab('EVENT')}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                  activeTab === 'EVENT'
                    ? 'bg-deep-brown text-cream-gold shadow-sm'
                    : 'text-deep-brown/80 hover:bg-parchment-warm'
                }`}
              >
                <Calendar className="w-3.5 h-3.5 text-traditional-red" />
                <span>Events ({adminSubmissions.filter(i => i.entityType === 'EVENT').length})</span>
              </button>

              <button
                onClick={() => setActiveTab('LOGS')}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                  activeTab === 'LOGS'
                    ? 'bg-deep-brown text-cream-gold shadow-sm'
                    : 'text-deep-brown/80 hover:bg-parchment-warm'
                }`}
              >
                <History className="w-3.5 h-3.5 text-cream-gold" />
                <span>Moderation Logs ({moderationLogs.length})</span>
              </button>

            </div>

            {/* Quick Search */}
            <div className="relative w-full lg:w-72">
              <Search className="w-4 h-4 text-warm-sand absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search title, contributor, artform..."
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-parchment/60 border border-warm-sand/40 text-deep-brown placeholder-deep-brown/40 focus:outline-none focus:border-terracotta"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-deep-brown/50 hover:text-traditional-red"
                >
                  ×
                </button>
              )}
            </div>

          </div>

          {/* Status Sub-Filters (only for submission streams) */}
          {activeTab !== 'LOGS' && (
            <div className="flex items-center space-x-2 pt-2 border-t border-warm-sand/20 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-xs font-semibold text-deep-brown/60 flex items-center space-x-1 mr-2">
                <Filter className="w-3 h-3 text-terracotta" />
                <span>Status:</span>
              </span>

              {(['ALL', 'PENDING', 'NEEDS_CHANGES', 'APPROVED', 'REJECTED'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    statusFilter === st
                      ? 'bg-warm-sand text-white shadow-xs'
                      : 'bg-parchment text-deep-brown/70 hover:bg-warm-sand/20'
                  }`}
                >
                  {st === 'ALL' && `All Statuses (${filteredSubmissions.length})`}
                  {st === 'PENDING' && `Pending (${adminSubmissions.filter(i => (activeTab === 'ALL' || i.entityType === activeTab) && i.status === 'PENDING').length})`}
                  {st === 'NEEDS_CHANGES' && `Needs Changes (${adminSubmissions.filter(i => (activeTab === 'ALL' || i.entityType === activeTab) && i.status === 'NEEDS_CHANGES').length})`}
                  {st === 'APPROVED' && `Approved (${adminSubmissions.filter(i => (activeTab === 'ALL' || i.entityType === activeTab) && i.status === 'APPROVED').length})`}
                  {st === 'REJECTED' && `Rejected (${adminSubmissions.filter(i => (activeTab === 'ALL' || i.entityType === activeTab) && i.status === 'REJECTED').length})`}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ==================================================================== */}
        {/* VIEW 1: AUDIT & MODERATION LOGS */}
        {/* ==================================================================== */}
        {activeTab === 'LOGS' ? (
          <div className="bg-white rounded-3xl border border-warm-sand/40 shadow-soft overflow-hidden space-y-4 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-warm-sand/30">
              <div>
                <h3 className="font-display text-xl font-bold text-deep-brown flex items-center space-x-2">
                  <History className="w-5 h-5 text-terracotta" />
                  <span>Immutable Moderation Audit Log</span>
                </h3>
                <p className="text-xs text-deep-brown/70">
                  Every curator action, verification decision, rejection rationale, and timestamp is permanently recorded.
                </p>
              </div>

              <button
                onClick={handleExportLogs}
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-deep-brown hover:bg-traditional-red text-cream-gold text-xs font-bold transition-all"
              >
                <Download className="w-3.5 h-3.5 text-cream-gold" />
                <span>Export Audit Log (JSON)</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-warm-sand/40 text-deep-brown/60 uppercase font-bold tracking-wider">
                    <th className="py-3 px-3">Timestamp</th>
                    <th className="py-3 px-3">Admin / Reviewer</th>
                    <th className="py-3 px-3">Action</th>
                    <th className="py-3 px-3">Entity Type</th>
                    <th className="py-3 px-3">Target Title</th>
                    <th className="py-3 px-3">Reviewer Notes / Reason</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-warm-sand/20">
                  {moderationLogs.map((log) => {
                    let badgeClass = 'bg-warm-sand/20 text-deep-brown';
                    if (log.action === 'APPROVED') badgeClass = 'bg-olive-green/20 text-olive-green font-bold';
                    if (log.action === 'REJECTED') badgeClass = 'bg-traditional-red/20 text-traditional-red font-bold';
                    if (log.action === 'NEEDS_CHANGES') badgeClass = 'bg-terracotta/20 text-terracotta font-bold';
                    if (log.action === 'EDITED') badgeClass = 'bg-cream-gold/40 text-deep-brown font-bold';
                    if (log.action === 'DELETED') badgeClass = 'bg-traditional-red/30 text-traditional-red font-bold';

                    return (
                      <tr key={log.id} className="hover:bg-parchment/60 transition-colors">
                        <td className="py-3 px-3 font-mono text-[11px] text-deep-brown/70 whitespace-nowrap">
                          {log.timestamp}
                        </td>
                        <td className="py-3 px-3 font-medium text-deep-brown whitespace-nowrap">
                          {log.adminName}
                          <span className="block text-[10px] text-deep-brown/60">{log.adminEmail}</span>
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] ${badgeClass}`}>
                            {log.action}
                          </span>
                        </td>
                        <td className="py-3 px-3 font-semibold text-deep-brown/80 whitespace-nowrap">
                          {log.entityType}
                        </td>
                        <td className="py-3 px-3 font-medium text-deep-brown max-w-xs truncate">
                          {log.entityTitle}
                        </td>
                        <td className="py-3 px-3 text-deep-brown/80 max-w-sm">
                          {log.notes || '—'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* ================================================================== */
          /* VIEW 2: SUBMISSIONS STREAM CARDS */
          /* ================================================================== */
          <div className="space-y-6">
            {filteredSubmissions.length === 0 ? (
              <div className="bg-white rounded-3xl border border-warm-sand/40 p-16 text-center space-y-3">
                <CheckCircle className="w-12 h-12 text-olive-green mx-auto" />
                <h3 className="font-display text-xl font-bold text-deep-brown">All Submissions Reviewed</h3>
                <p className="text-xs text-deep-brown/70 max-w-md mx-auto">
                  No submissions currently match the active category and status filter. New submissions from local artisans and community members will appear here automatically.
                </p>
              </div>
            ) : (
              filteredSubmissions.map((item) => {
                // Status badge styling
                let statusBadge = (
                  <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold bg-traditional-red/15 text-traditional-red border border-traditional-red/30">
                    <Clock className="w-3.5 h-3.5 animate-pulse" />
                    <span>Pending Review</span>
                  </span>
                );

                if (item.status === 'APPROVED') {
                  statusBadge = (
                    <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold bg-olive-green/20 text-olive-green border border-olive-green/40">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Approved & Live</span>
                    </span>
                  );
                } else if (item.status === 'NEEDS_CHANGES') {
                  statusBadge = (
                    <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold bg-terracotta/20 text-terracotta border border-terracotta/40">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Needs Changes</span>
                    </span>
                  );
                } else if (item.status === 'REJECTED') {
                  statusBadge = (
                    <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold bg-traditional-red/20 text-traditional-red border border-traditional-red/40">
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Rejected</span>
                    </span>
                  );
                }

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-3xl border border-warm-sand/50 shadow-soft hover:shadow-cultural transition-all overflow-hidden"
                  >
                    <div className="p-6 sm:p-8 space-y-6">
                      
                      {/* Top Meta Line: Badges + Time */}
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-warm-sand/20 pb-4">
                        <div className="flex flex-wrap items-center gap-2">
                          {/* Entity Type Badge */}
                          <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold bg-deep-brown text-cream-gold">
                            {item.entityType === 'LISTING' && '🏛️ Heritage Listing'}
                            {item.entityType === 'ARTIST_PROFILE' && '🎨 Artist Profile'}
                            {item.entityType === 'ARTWORK' && '🖼️ Uploaded Artwork'}
                            {item.entityType === 'EVENT' && '🥁 Cultural Event'}
                          </span>

                          {/* Category Tag */}
                          <span className="px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-parchment-warm text-deep-brown border border-warm-sand/40">
                            {item.category}
                          </span>

                          {item.taluk && (
                            <span className="text-xs text-olive-green font-semibold">
                              📍 {item.taluk}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center space-x-3">
                          {statusBadge}
                          <span className="text-xs text-deep-brown/60">
                            Submitted: {item.submittedAt}
                          </span>
                        </div>
                      </div>

                      {/* Content Grid */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                        
                        {/* Media Preview (3 cols) */}
                        <div className="lg:col-span-3 space-y-2">
                          <div className="relative rounded-2xl overflow-hidden aspect-video lg:aspect-square bg-deep-brown/5 border border-warm-sand/40 group">
                            <img
                              src={item.mediaUrls[0] || 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=600&q=80'}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            {item.mediaUrls.length > 1 && (
                              <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/70 text-white text-[10px] font-bold">
                                +{item.mediaUrls.length - 1} more photos
                              </span>
                            )}
                          </div>
                          
                          {/* Full Inspection Trigger */}
                          <button
                            onClick={() => setInspectItem(item)}
                            className="w-full py-1.5 px-3 rounded-xl border border-warm-sand/60 text-xs font-semibold text-deep-brown hover:bg-parchment-warm transition-colors flex items-center justify-center space-x-1.5"
                          >
                            <Eye className="w-3.5 h-3.5 text-terracotta" />
                            <span>Inspect Full Submission</span>
                          </button>
                        </div>

                        {/* Title, Description & Details (5 cols) */}
                        <div className="lg:col-span-5 space-y-3">
                          <div>
                            <h3 className="font-display text-xl font-bold text-deep-brown leading-snug">
                              {item.title}
                            </h3>
                            {item.titleMl && (
                              <p className="font-malayalam text-sm font-semibold text-terracotta">
                                {item.titleMl}
                              </p>
                            )}
                          </div>

                          {item.locationDetails && (
                            <p className="text-xs text-deep-brown/70 flex items-center space-x-1.5">
                              <Compass className="w-3.5 h-3.5 text-warm-sand shrink-0" />
                              <span>{item.locationDetails}</span>
                            </p>
                          )}

                          <p className="text-xs text-deep-brown/80 leading-relaxed line-clamp-3">
                            {item.description}
                          </p>

                          {item.sourceAttribution && (
                            <div className="p-2.5 rounded-xl bg-parchment/80 border border-warm-sand/30 text-[11px] text-deep-brown/80">
                              <span className="font-bold text-terracotta block">Source Attribution:</span>
                              {item.sourceAttribution}
                            </div>
                          )}

                          {/* Existing Rejection / Correction Notices */}
                          {item.rejectionReason && (
                            <div className="p-3 rounded-xl bg-traditional-red/10 border border-traditional-red/30 text-xs text-traditional-red space-y-1">
                              <span className="font-bold flex items-center space-x-1">
                                <XCircle className="w-3.5 h-3.5" />
                                <span>Rejection Reason:</span>
                              </span>
                              <p>{item.rejectionReason}</p>
                            </div>
                          )}

                          {item.correctionNotes && (
                            <div className="p-3 rounded-xl bg-terracotta/10 border border-terracotta/30 text-xs text-terracotta space-y-1">
                              <span className="font-bold flex items-center space-x-1">
                                <AlertTriangle className="w-3.5 h-3.5" />
                                <span>Correction Feedback Sent:</span>
                              </span>
                              <p>{item.correctionNotes}</p>
                            </div>
                          )}
                        </div>

                        {/* Contributor Card & Actions (4 cols) */}
                        <div className="lg:col-span-4 bg-parchment-warm/60 rounded-2xl p-4 border border-warm-sand/40 space-y-4">
                          
                          {/* Contributor Profile */}
                          <div className="space-y-1.5 border-b border-warm-sand/30 pb-3">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] uppercase tracking-wider font-bold text-olive-green">
                                Contributor Information
                              </span>
                              {item.contributor.verifiedContributor && (
                                <span className="px-1.5 py-0.5 rounded bg-olive-green/20 text-olive-green text-[10px] font-bold">
                                  ✓ Verified
                                </span>
                              )}
                            </div>

                            <p className="font-bold text-sm text-deep-brown">{item.contributor.name}</p>
                            <p className="text-xs text-terracotta font-medium">{item.contributor.role || 'Contributor'}</p>
                            {item.contributor.organization && (
                              <p className="text-xs text-deep-brown/70 flex items-center space-x-1">
                                <Building2 className="w-3 h-3 text-warm-sand shrink-0" />
                                <span>{item.contributor.organization}</span>
                              </p>
                            )}

                            <div className="space-y-0.5 text-xs text-deep-brown/70 pt-1">
                              {item.contributor.email && (
                                <p className="flex items-center space-x-1.5 truncate">
                                  <Mail className="w-3 h-3 text-warm-sand shrink-0" />
                                  <span>{item.contributor.email}</span>
                                </p>
                              )}
                              {item.contributor.phone && (
                                <p className="flex items-center space-x-1.5">
                                  <Phone className="w-3 h-3 text-warm-sand shrink-0" />
                                  <span>{item.contributor.phone}</span>
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Action Buttons Matrix */}
                          <div className="space-y-2">
                            <span className="text-[11px] font-bold text-deep-brown/70 block">
                              Curator Actions:
                            </span>

                            <div className="grid grid-cols-2 gap-2">
                              {/* Approve Button */}
                              <button
                                onClick={() => handleApprove(item)}
                                className="flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl bg-olive-green hover:bg-olive-green/90 text-white text-xs font-bold shadow-xs transition-colors"
                              >
                                <Check className="w-3.5 h-3.5" />
                                <span>Approve</span>
                              </button>

                              {/* Reject Button */}
                              <button
                                onClick={() => {
                                  setRejectingItem(item);
                                  setRejectReason(PRESET_REJECTION_REASONS[0]);
                                }}
                                className="flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl border border-traditional-red text-traditional-red hover:bg-traditional-red/10 text-xs font-bold transition-colors"
                              >
                                <X className="w-3.5 h-3.5" />
                                <span>Reject</span>
                              </button>

                              {/* Request Corrections Button */}
                              <button
                                onClick={() => {
                                  setChangesItem(item);
                                  setCorrectionNotes(PRESET_CORRECTION_NOTES[0]);
                                }}
                                className="flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl bg-terracotta/15 hover:bg-terracotta/25 text-terracotta text-xs font-bold transition-colors border border-terracotta/30"
                              >
                                <AlertTriangle className="w-3.5 h-3.5" />
                                <span>Needs Changes</span>
                              </button>

                              {/* Edit Content Button */}
                              <button
                                onClick={() => {
                                  setEditingItem(item);
                                  setEditFormData({
                                    title: item.title,
                                    titleMl: item.titleMl,
                                    category: item.category,
                                    description: item.description,
                                    sourceAttribution: item.sourceAttribution,
                                    locationDetails: item.locationDetails
                                  });
                                }}
                                className="flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl bg-white hover:bg-parchment border border-warm-sand/50 text-deep-brown text-xs font-bold transition-colors"
                              >
                                <Edit3 className="w-3.5 h-3.5 text-deep-brown" />
                                <span>Edit Content</span>
                              </button>
                            </div>

                            {/* Purge / Delete Content */}
                            <button
                              onClick={() => setDeleteConfirmItem(item)}
                              className="w-full py-1 text-[11px] text-deep-brown/60 hover:text-traditional-red font-medium transition-colors text-center block pt-1"
                            >
                              Permanently remove this inappropriate content
                            </button>
                          </div>

                        </div>

                      </div>

                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        )}

      </div>

      {/* ==================================================================== */}
      {/* MODAL 1: INSPECT FULL SUBMISSION DETAILS */}
      {/* ==================================================================== */}
      <AnimatePresence>
        {inspectItem && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-warm-sand/40 max-h-[90vh] overflow-y-auto space-y-6"
            >
              <div className="flex items-start justify-between border-b border-warm-sand/30 pb-4">
                <div>
                  <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold bg-deep-brown text-cream-gold">
                    {inspectItem.entityType}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-deep-brown mt-1">
                    {inspectItem.title}
                  </h3>
                  {inspectItem.titleMl && (
                    <p className="font-malayalam text-base font-semibold text-terracotta">
                      {inspectItem.titleMl}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setInspectItem(null)}
                  className="w-8 h-8 rounded-full bg-parchment flex items-center justify-center text-deep-brown hover:bg-traditional-red hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Photo Gallery Grid */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-olive-green">
                  Submitted Photographs ({inspectItem.mediaUrls.length})
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {inspectItem.mediaUrls.map((url, idx) => (
                    <img
                      key={idx}
                      src={url}
                      alt={`Photo ${idx + 1}`}
                      className="w-full h-36 object-cover rounded-xl border border-warm-sand/40 shadow-xs"
                    />
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-olive-green">
                  Full Description & Historical Context
                </h4>
                <p className="text-xs sm:text-sm text-deep-brown/80 leading-relaxed bg-parchment/60 p-4 rounded-2xl border border-warm-sand/30">
                  {inspectItem.description}
                </p>
              </div>

              {/* Contributor Card */}
              <div className="p-4 rounded-2xl bg-parchment-warm/60 border border-warm-sand/40 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-terracotta">
                  Contributor Profile & Audit Background
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-deep-brown">
                  <p><span className="font-bold">Name:</span> {inspectItem.contributor.name}</p>
                  <p><span className="font-bold">Role:</span> {inspectItem.contributor.role}</p>
                  <p><span className="font-bold">Email:</span> {inspectItem.contributor.email || 'N/A'}</p>
                  <p><span className="font-bold">Phone:</span> {inspectItem.contributor.phone || 'N/A'}</p>
                  <p><span className="font-bold">Organization:</span> {inspectItem.contributor.organization || 'Independent'}</p>
                  <p><span className="font-bold">Total Platform Submissions:</span> {inspectItem.contributor.totalSubmissions || 1}</p>
                </div>
              </div>

              {/* Actions Toolbar */}
              <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3 pt-4 border-t border-warm-sand/30">
                <button
                  onClick={() => setInspectItem(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-deep-brown hover:bg-parchment"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setChangesItem(inspectItem);
                    setCorrectionNotes(PRESET_CORRECTION_NOTES[0]);
                  }}
                  className="px-3.5 sm:px-4 py-2 rounded-xl bg-terracotta/20 hover:bg-terracotta/30 text-terracotta text-xs font-bold border border-terracotta/40"
                >
                  Request Changes
                </button>
                <button
                  onClick={() => {
                    setRejectingItem(inspectItem);
                    setRejectReason(PRESET_REJECTION_REASONS[0]);
                  }}
                  className="px-3.5 sm:px-4 py-2 rounded-xl border border-traditional-red text-traditional-red hover:bg-traditional-red/10 text-xs font-bold"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleApprove(inspectItem)}
                  className="px-4 sm:px-6 py-2 rounded-xl bg-olive-green hover:bg-olive-green/90 text-white text-xs font-bold shadow-md"
                >
                  Approve & Publish Live
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==================================================================== */}
      {/* MODAL 2: REJECT WITH REASON */}
      {/* ==================================================================== */}
      <AnimatePresence>
        {rejectingItem && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start sm:items-center justify-center p-3 sm:p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-8 shadow-2xl border border-warm-sand/40 space-y-5 my-auto my-4 sm:my-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center space-x-3 text-traditional-red">
                <div className="w-10 h-10 rounded-full bg-traditional-red/10 flex items-center justify-center">
                  <XCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-deep-brown">Reject Submission</h3>
                  <p className="text-xs text-deep-brown/70">{rejectingItem.title}</p>
                </div>
              </div>

              <p className="text-xs text-deep-brown/80 leading-relaxed">
                Rejection permanently withholds the submission from public exhibition. The reason will be logged into the audit trail and displayed to the contributor.
              </p>

              <div className="space-y-2">
                <label className="text-xs font-bold text-deep-brown block">
                  Select Rejection Rationale:
                </label>
                <select
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl bg-parchment/60 border border-warm-sand/50 text-deep-brown focus:outline-none focus:border-traditional-red"
                >
                  {PRESET_REJECTION_REASONS.map((r, i) => (
                    <option key={i} value={r}>{r}</option>
                  ))}
                  <option value="Other">Other (Type custom reason below)</option>
                </select>

                {rejectReason === 'Other' && (
                  <textarea
                    rows={3}
                    value={customRejectReason}
                    onChange={(e) => setCustomRejectReason(e.target.value)}
                    placeholder="Enter detailed justification for rejection..."
                    className="w-full p-3 text-xs rounded-xl bg-parchment/60 border border-warm-sand/50 text-deep-brown focus:outline-none focus:border-traditional-red mt-2"
                  />
                )}
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-warm-sand/30">
                <button
                  onClick={() => setRejectingItem(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-deep-brown hover:bg-parchment"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmReject}
                  className="px-5 py-2.5 rounded-xl bg-traditional-red hover:bg-traditional-red-dark text-white text-xs font-bold shadow-md"
                >
                  Confirm Rejection
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==================================================================== */}
      {/* MODAL 3: REQUEST CORRECTIONS ("NEEDS CHANGES") */}
      {/* ==================================================================== */}
      <AnimatePresence>
        {changesItem && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start sm:items-center justify-center p-3 sm:p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-8 shadow-2xl border border-warm-sand/40 space-y-5 my-auto my-4 sm:my-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center space-x-3 text-terracotta">
                <div className="w-10 h-10 rounded-full bg-terracotta/10 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-deep-brown">Request Corrections</h3>
                  <p className="text-xs text-deep-brown/70">{changesItem.title}</p>
                </div>
              </div>

              <p className="text-xs text-deep-brown/80 leading-relaxed">
                Provide clear, constructive feedback so the contributor can upload higher quality photographs, provide citations, or clarify timings before reconsideration.
              </p>

              <div className="space-y-2">
                <label className="text-xs font-bold text-deep-brown block">
                  Quick Suggestion Preset:
                </label>
                <select
                  onChange={(e) => setCorrectionNotes(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl bg-parchment/60 border border-warm-sand/50 text-deep-brown focus:outline-none focus:border-terracotta"
                >
                  {PRESET_CORRECTION_NOTES.map((n, i) => (
                    <option key={i} value={n}>{n}</option>
                  ))}
                </select>

                <label className="text-xs font-bold text-deep-brown block pt-2">
                  Feedback to Contributor:
                </label>
                <textarea
                  rows={4}
                  value={correctionNotes}
                  onChange={(e) => setCorrectionNotes(e.target.value)}
                  placeholder="Specify exactly what changes are requested..."
                  className="w-full p-3 text-xs rounded-xl bg-parchment/60 border border-warm-sand/50 text-deep-brown focus:outline-none focus:border-terracotta"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-warm-sand/30">
                <button
                  onClick={() => setChangesItem(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-deep-brown hover:bg-parchment"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmChanges}
                  className="px-5 py-2.5 rounded-xl bg-terracotta hover:bg-terracotta-dark text-white text-xs font-bold shadow-md"
                >
                  Dispatch Change Request
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==================================================================== */}
      {/* MODAL 4: EDIT CONTENT INLINE */}
      {/* ==================================================================== */}
      <AnimatePresence>
        {editingItem && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start sm:items-center justify-center p-3 sm:p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-xl w-full p-5 sm:p-8 shadow-2xl border border-warm-sand/40 space-y-5 my-auto my-4 sm:my-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-deep-brown/10 flex items-center justify-center text-deep-brown">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-deep-brown">Edit Submission Content</h3>
                  <p className="text-xs text-deep-brown/70">Modify metadata or fix typos directly</p>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-deep-brown block mb-1">Title (English):</label>
                  <input
                    type="text"
                    value={editFormData.title || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-parchment/60 border border-warm-sand/50 text-deep-brown"
                  />
                </div>

                <div>
                  <label className="font-bold text-deep-brown block mb-1">Title (Malayalam):</label>
                  <input
                    type="text"
                    value={editFormData.titleMl || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, titleMl: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-parchment/60 border border-warm-sand/50 text-deep-brown"
                  />
                </div>

                <div>
                  <label className="font-bold text-deep-brown block mb-1">Location Details / Address:</label>
                  <input
                    type="text"
                    value={editFormData.locationDetails || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, locationDetails: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-parchment/60 border border-warm-sand/50 text-deep-brown"
                  />
                </div>

                <div>
                  <label className="font-bold text-deep-brown block mb-1">Full Description:</label>
                  <textarea
                    rows={4}
                    value={editFormData.description || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-parchment/60 border border-warm-sand/50 text-deep-brown"
                  />
                </div>

                <div>
                  <label className="font-bold text-deep-brown block mb-1">Source Attribution:</label>
                  <input
                    type="text"
                    value={editFormData.sourceAttribution || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, sourceAttribution: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-parchment/60 border border-warm-sand/50 text-deep-brown"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-warm-sand/30">
                <button
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-deep-brown hover:bg-parchment"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-5 py-2.5 rounded-xl bg-deep-brown hover:bg-traditional-red text-cream-gold text-xs font-bold shadow-md transition-colors"
                >
                  Save Changes & Log Edit
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==================================================================== */}
      {/* MODAL 5: DELETE PERMANENTLY CONFIRMATION */}
      {/* ==================================================================== */}
      <AnimatePresence>
        {deleteConfirmItem && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start sm:items-center justify-center p-3 sm:p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-md w-full p-5 sm:p-6 text-center space-y-4 shadow-2xl border border-warm-sand/40 my-auto my-4 sm:my-6"
            >
              <div className="w-12 h-12 rounded-full bg-traditional-red/10 flex items-center justify-center mx-auto text-traditional-red">
                <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-deep-brown">Remove Content?</h3>
              <p className="text-xs text-deep-brown/80 leading-relaxed">
                Are you sure you want to permanently remove <span className="font-bold">"{deleteConfirmItem.title}"</span>? This will purge the entry from the moderation queue and cannot be undone.
              </p>
              <div className="flex items-center justify-center space-x-3 pt-2">
                <button
                  onClick={() => setDeleteConfirmItem(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-deep-brown hover:bg-parchment"
                >
                  Keep Submission
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="px-5 py-2.5 rounded-xl bg-traditional-red hover:bg-traditional-red-dark text-white text-xs font-bold shadow-md"
                >
                  Yes, Remove Content
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

