import React, { useState } from 'react';
import { useCultural } from '../context/CulturalContext';
import { 
  X, 
  MessageCircle, 
  Phone, 
  Sparkles, 
  CheckCircle, 
  Calendar,
  Send
} from 'lucide-react';

export const InquiryModal: React.FC = () => {
  const { inquiryArtist, setInquiryArtist, language } = useCultural();

  const [inquiryType, setInquiryType] = useState('FESTIVAL_BOOKING');
  const [senderName, setSenderName] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [budget, setBudget] = useState('₹10,000 – ₹25,000');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  if (!inquiryArtist) return null;

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const phone = inquiryArtist.whatsappNumber || '919447012345';
    const text = encodeURIComponent(
      `*KALAKRITI INQUIRY*\n` +
      `Namaskaram ${inquiryArtist.stageName || inquiryArtist.name},\n` +
      `I am ${senderName} reaching out regarding ${inquiryType.replace('_', ' ')}.\n` +
      `• Date: ${eventDate || 'Flexible'}\n` +
      `• Budget: ${budget}\n` +
      `• Details: ${message || 'Looking forward to discussing further.'}\n` +
      `• Contact: ${senderPhone}`
    );
    window.open(`https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setInquiryArtist(null);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-60 overflow-y-auto bg-deep-brown/85 backdrop-blur-sm flex items-start sm:items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-2xl overflow-hidden shadow-cultural border-2 border-cream-gold my-auto my-3 sm:my-6">
        
        {/* Header */}
        <div className="p-6 bg-parchment-warm border-b border-warm-sand/30 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={inquiryArtist.avatar}
              alt={inquiryArtist.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-cream-gold"
            />
            <div>
              <span className="text-[10px] uppercase font-bold text-terracotta">
                Direct-to-Artist Inquiries
              </span>
              <h3 className="font-display text-lg font-bold text-deep-brown">
                {inquiryArtist.stageName || inquiryArtist.name}
              </h3>
              <p className="text-xs text-olive-green">
                {inquiryArtist.primaryArtformName} • {inquiryArtist.taluk}
              </p>
            </div>
          </div>

          <button
            onClick={() => setInquiryArtist(null)}
            className="p-2 rounded-full hover:bg-white text-deep-brown/60 hover:text-traditional-red transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        {isSent ? (
          <div className="p-10 text-center space-y-3">
            <CheckCircle className="w-12 h-12 text-olive-green mx-auto animate-bounce" />
            <h4 className="font-display text-xl font-bold text-deep-brown">
              Inquiry Dispatched!
            </h4>
            <p className="text-xs text-deep-brown/80">
              Your inquiry has been relayed directly to {inquiryArtist.name}. Zero middleman fees.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSendWhatsApp} className="p-6 space-y-4">
            
            <div>
              <label className="block text-xs font-semibold text-deep-brown mb-1">
                Inquiry Type *
              </label>
              <select
                value={inquiryType}
                onChange={(e) => setInquiryType(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-warm-sand/50 bg-parchment-warm focus:bg-white focus:border-terracotta outline-none"
              >
                <option value="FESTIVAL_BOOKING">Festival / Melam / Concert Booking</option>
                <option value="CRAFT_COMMISSION">Custom Craft / Sculpture Commission</option>
                <option value="WORKSHOP_REQUEST">Private Masterclass / Workshop Request</option>
                <option value="ARTWORK_PURCHASE">Purchase Existing Artwork Piece</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-deep-brown mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g. Radhika Menon"
                  className="w-full text-xs p-2.5 rounded-lg border border-warm-sand/50 bg-parchment-warm focus:bg-white focus:border-terracotta outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-deep-brown mb-1">
                  Your Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={senderPhone}
                  onChange={(e) => setSenderPhone(e.target.value)}
                  placeholder="+91 98470 XXXXX"
                  className="w-full text-xs p-2.5 rounded-lg border border-warm-sand/50 bg-parchment-warm focus:bg-white focus:border-terracotta outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-deep-brown mb-1">
                  Proposed Date
                </label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-warm-sand/50 bg-parchment-warm focus:bg-white focus:border-terracotta outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-deep-brown mb-1">
                  Estimated Budget
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-warm-sand/50 bg-parchment-warm focus:bg-white focus:border-terracotta outline-none"
                >
                  <option value="₹5,000 – ₹15,000">₹5,000 – ₹15,000</option>
                  <option value="₹15,000 – ₹35,000">₹15,000 – ₹35,000</option>
                  <option value="₹35,000 – ₹1,00,000">₹35,000 – ₹1,00,000</option>
                  <option value="₹1,00,000+ (Festival Ensemble)">₹1,00,000+ (Festival Ensemble)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-deep-brown mb-1">
                Requirement Details & Venue Location
              </label>
              <textarea
                rows={3}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Mention the temple festival, venue, or specific dimensions for craft pieces..."
                className="w-full text-xs p-2.5 rounded-lg border border-warm-sand/50 bg-parchment-warm focus:bg-white focus:border-terracotta outline-none leading-relaxed"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[10px] text-olive-green">
                🛡️ Direct contact without commissions
              </span>

              <button
                type="submit"
                className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Dispatch via WhatsApp</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};

