import React, { useState } from 'react';
import { useCultural } from '../context/CulturalContext';
import { Workshop } from '../types';
import { 
  GraduationCap, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const WorkshopsSection: React.FC = () => {
  const { language, workshops, setActiveTab } = useCultural();
  const [bookedWorkshops, setBookedWorkshops] = useState<{ [key: string]: boolean }>({});

  const handleBooking = (id: string) => {
    setBookedWorkshops(prev => ({ ...prev, [id]: true }));
  };

  return (
    <section className="py-12 bg-parchment-texture min-h-[calc(100vh-80px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Editorial Header */}
        <div className="space-y-3 max-w-3xl">
          <span className="text-terracotta font-heading tracking-widest uppercase text-xs font-semibold">
            {language === 'en' ? 'Living Gurukula • Hands-on Masterclasses' : 'ഗുരുകുല ശിൽപശാലകൾ'}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-deep-brown">
            {language === 'en' ? 'Traditional Art & Craft Workshops' : 'പാരമ്പര്യ കലാ കളരികളും പരിശീലനങ്ങളും'}
          </h2>
          <p className="text-sm sm:text-base text-deep-brown/80 leading-relaxed">
            {language === 'en'
              ? 'Learn the ancient science of Kerala temple mural pigments, classical Chenda stick techniques, and Sanskrit eye abhinaya directly under renowned masters across Thrissur.'
              : 'പ്രകൃതിദത്ത ചുവർചിത്ര രചന, ചെണ്ടയുടെ താളശാസ്ത്രം, കൂടിയാട്ടത്തിലെ നേത്രാഭിനയം എന്നിവ കേരളത്തിലെ പ്രഗത്ഭരായ ഗുരുക്കന്മാരിൽ നിന്ന് നേരിട്ട് അഭ്യസിക്കാം.'}
          </p>
        </div>

        {/* Workshops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {workshops.map((workshop) => {
            const isBooked = bookedWorkshops[workshop.id];
            const remainingSeats = workshop.maxSeats - workshop.enrolledSeats;

            return (
              <div
                key={workshop.id}
                className="rounded-2xl overflow-hidden bg-white border border-warm-sand/40 shadow-soft hover:shadow-cultural transition-all flex flex-col justify-between"
              >
                {/* Header Strip with Skill Level & Artform */}
                <div className="p-6 pb-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full bg-cream-gold/30 text-deep-brown text-[11px] font-bold border border-cream-gold">
                      🎓 {workshop.skillLevel}
                    </span>
                    <span className="text-xs font-bold text-terracotta">
                      ₹{workshop.feeInr.toLocaleString()}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-deep-brown leading-tight">
                    {workshop.title}
                  </h3>
                  
                  <p className="text-xs text-olive-green font-semibold">
                    Conducted by: <span className="text-deep-brown">{workshop.artistName}</span>
                  </p>
                </div>

                {/* Description & Schedule Details */}
                <div className="px-6 space-y-4 flex-1">
                  <p className="text-xs text-deep-brown/80 leading-relaxed">
                    {workshop.description}
                  </p>

                  <div className="p-3 rounded-xl bg-parchment-warm border border-warm-sand/30 space-y-2 text-xs">
                    <div className="flex items-center space-x-2 text-deep-brown">
                      <Calendar className="w-3.5 h-3.5 text-traditional-red shrink-0" />
                      <span>{workshop.dateTime}</span>
                    </div>

                    <div className="flex items-center space-x-2 text-deep-brown">
                      <Clock className="w-3.5 h-3.5 text-terracotta shrink-0" />
                      <span>{workshop.duration} Session</span>
                    </div>

                    <div className="flex items-center space-x-2 text-deep-brown">
                      <MapPin className="w-3.5 h-3.5 text-olive-green shrink-0" />
                      <span className="line-clamp-1">{workshop.venue}</span>
                    </div>
                  </div>

                  {/* Seat Availability Bar */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-deep-brown/70">Seats Remaining:</span>
                      <span className="font-bold text-traditional-red">
                        {isBooked ? remainingSeats - 1 : remainingSeats} of {workshop.maxSeats} left
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-parchment-dark rounded-full overflow-hidden">
                      <div
                        className="h-full bg-traditional-red rounded-full"
                        style={{
                          width: `${((workshop.enrolledSeats + (isBooked ? 1 : 0)) / workshop.maxSeats) * 100}%`
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Booking Action Button */}
                <div className="p-6 pt-4 border-t border-warm-sand/30 flex items-center justify-between">
                  <button
                    onClick={() => setActiveTab('map')}
                    className="text-xs text-olive-green hover:underline font-semibold"
                  >
                    View Studio
                  </button>

                  <button
                    onClick={() => handleBooking(workshop.id)}
                    disabled={isBooked}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                      isBooked
                        ? 'bg-olive-green text-white cursor-default'
                        : 'bg-traditional-red hover:bg-traditional-red-dark text-white'
                    }`}
                  >
                    {isBooked ? (
                      <span className="flex items-center space-x-1">
                        <CheckCircle className="w-3.5 h-3.5 text-cream-gold" />
                        <span>Seat Reserved!</span>
                      </span>
                    ) : (
                      <span>Reserve Seat Now</span>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

