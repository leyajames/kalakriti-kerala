import React, { useState } from 'react';
import { useCultural } from '../context/CulturalContext';
import { 
  ShieldCheck, 
  CheckCircle, 
  XCircle, 
  Sparkles, 
  Eye, 
  AlertCircle,
  FileCheck,
  Award
} from 'lucide-react';

export const CuratorDashboard: React.FC = () => {
  const { language, moderationItems, resolveModerationItem, artists } = useCultural();
  const [activeFilter, setActiveFilter] = useState<'PENDING' | 'APPROVED' | 'REJECTED' | 'ALL'>('PENDING');

  const filteredItems = moderationItems.filter(item => {
    return activeFilter === 'ALL' || item.status === activeFilter;
  });

  return (
    <section className="py-12 bg-parchment-texture min-h-[calc(100vh-80px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-warm-sand/30 pb-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-olive-green/20 text-olive-green text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Cultural Curation & Sanctity Desk</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-deep-brown">
              {language === 'en' ? 'Curator Moderation Queue' : 'ക്യൂറേറ്റർ പരിശോധനാ വിഭാഗം'}
            </h2>
            <p className="text-sm text-deep-brown/80">
              {language === 'en'
                ? 'Review self-registered local artisans, verify traditional Guru lineages, audit craft submissions, and safeguard Thrissur\'s living cultural heritage from commercial misrepresentation.'
                : 'പാരമ്പര്യ കലാകാരന്മാരുടെ അപേക്ഷകൾ പരിശോധിച്ച് അംഗീകാരം നൽകുന്നതിനും പൈതൃക തനിമ കാത്തുസൂക്ഷിക്കുന്നതിനുമുള്ള ക്യൂറേറ്റർ ഡെസ്ക്.'}
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center space-x-4 bg-white/80 p-3 rounded-xl border border-warm-sand/40">
            <div>
              <p className="text-xs text-olive-green font-semibold">Active In Queue</p>
              <p className="font-display text-2xl font-bold text-traditional-red">
                {moderationItems.filter(i => i.status === 'PENDING').length}
              </p>
            </div>
            <div className="h-8 w-px bg-warm-sand/40" />
            <div>
              <p className="text-xs text-olive-green font-semibold">Verified Masters</p>
              <p className="font-display text-2xl font-bold text-terracotta">
                {artists.filter(a => a.isVerified).length}
              </p>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center space-x-2 border-b border-warm-sand/30 pb-3">
          <button
            onClick={() => setActiveFilter('PENDING')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeFilter === 'PENDING'
                ? 'bg-deep-brown text-cream-gold'
                : 'bg-white text-deep-brown/80 hover:bg-parchment-warm border border-warm-sand/40'
            }`}
          >
            Pending Verification ({moderationItems.filter(i => i.status === 'PENDING').length})
          </button>

          <button
            onClick={() => setActiveFilter('APPROVED')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeFilter === 'APPROVED'
                ? 'bg-deep-brown text-cream-gold'
                : 'bg-white text-deep-brown/80 hover:bg-parchment-warm border border-warm-sand/40'
            }`}
          >
            Approved ({moderationItems.filter(i => i.status === 'APPROVED').length})
          </button>

          <button
            onClick={() => setActiveFilter('REJECTED')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeFilter === 'REJECTED'
                ? 'bg-deep-brown text-cream-gold'
                : 'bg-white text-deep-brown/80 hover:bg-parchment-warm border border-warm-sand/40'
            }`}
          >
            Rejected ({moderationItems.filter(i => i.status === 'REJECTED').length})
          </button>
        </div>

        {/* Moderation Items Feed */}
        <div className="space-y-4">
          {filteredItems.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-warm-sand/40 space-y-2">
              <CheckCircle className="w-12 h-12 text-olive-green mx-auto" />
              <p className="font-display text-lg font-bold text-deep-brown">All caught up!</p>
              <p className="text-xs text-deep-brown/70">No pending submissions in this category.</p>
            </div>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-2xl bg-white border border-warm-sand/40 shadow-soft hover:shadow-cultural transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="flex items-start space-x-4">
                  {item.mediaUrl && (
                    <img
                      src={item.mediaUrl}
                      alt={item.title}
                      className="w-16 h-16 rounded-xl object-cover border border-cream-gold shrink-0"
                    />
                  )}
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-cream-gold/30 text-deep-brown text-[10px] font-bold border border-cream-gold">
                        {item.type}
                      </span>
                      <span className="text-[11px] text-olive-green">
                        Submitted: {item.submittedAt}
                      </span>
                      {item.status === 'APPROVED' && (
                        <span className="px-2 py-0.5 rounded bg-olive-green/20 text-olive-green text-[10px] font-bold">
                          ✓ Approved & Badge Granted
                        </span>
                      )}
                      {item.status === 'REJECTED' && (
                        <span className="px-2 py-0.5 rounded bg-traditional-red/20 text-traditional-red text-[10px] font-bold">
                          ✗ Rejected
                        </span>
                      )}
                    </div>

                    <h4 className="font-display text-base font-bold text-deep-brown">
                      {item.title}
                    </h4>

                    <p className="text-xs text-deep-brown/80">
                      Submitter: <span className="font-semibold">{item.submitter}</span> • Artform: <span className="text-terracotta font-semibold">{item.artform}</span>
                    </p>

                    <p className="text-xs text-deep-brown/70 max-w-2xl leading-relaxed pt-1">
                      {item.details}
                    </p>
                  </div>
                </div>

                {/* Curator Actions */}
                {item.status === 'PENDING' ? (
                  <div className="flex items-center space-x-2 shrink-0 self-end md:self-center">
                    <button
                      onClick={() => resolveModerationItem(item.id, 'REJECTED')}
                      className="flex items-center space-x-1.5 px-4 py-2 rounded-xl border border-traditional-red/50 text-traditional-red hover:bg-traditional-red/10 text-xs font-semibold transition-colors"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Reject</span>
                    </button>

                    <button
                      onClick={() => resolveModerationItem(item.id, 'APPROVED')}
                      className="flex items-center space-x-1.5 px-5 py-2 rounded-xl bg-deep-brown hover:bg-traditional-red text-cream-gold text-xs font-bold shadow-md transition-colors"
                    >
                      <Sparkles className="w-4 h-4 text-cream-gold" />
                      <span>Verify & Grant Badge</span>
                    </button>
                  </div>
                ) : (
                  <div className="text-xs font-semibold text-olive-green shrink-0">
                    Status: {item.status}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

      </div>
    </section>
  );
};

