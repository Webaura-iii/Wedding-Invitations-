import React from 'react';
import { Calendar, MapPin, Sparkles } from 'lucide-react';
import { CeremonyEvent, Language, WeddingConfig } from '../types/wedding';
import { translations } from '../translations/translations';

interface WeddingDetailsProps {
  config: WeddingConfig;
  currentLanguage: Language;
}

export const WeddingDetails: React.FC<WeddingDetailsProps> = ({ config, currentLanguage }) => {
  const t = translations[currentLanguage];
  const isRTL = currentLanguage === 'ur' || currentLanguage === 'ar';

  // Helper to generate and download an .ics file
  const handleAddToCalendar = (event: CeremonyEvent, startIso: string) => {
    const startDate = new Date(startIso);
    // 3 hours duration default
    const endDate = new Date(startDate.getTime() + 3 * 60 * 60 * 1000);

    const formatDateForIcs = (date: Date) => {
      return date.toISOString().replace(/-|:|\.\d+/g, '');
    };

    const coupleTitle = `${config.groom.name.en} & ${config.bride.name.en}'s ${event.title.en}`;
    const venueFull = `${event.venueName.en}, ${event.venueAddress.en}, ${event.cityCountry.en}`;

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Luxury Muslim Wedding Invitation//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${Date.now()}@weddinginvitation.internal`,
      `DTSTAMP:${formatDateForIcs(new Date())}`,
      `DTSTART:${formatDateForIcs(startDate)}`,
      `DTEND:${formatDateForIcs(endDate)}`,
      `SUMMARY:${coupleTitle}`,
      `DESCRIPTION:With the blessings of Allah, please join us to celebrate the Nikah and wedding festivities.`,
      `LOCATION:${venueFull}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Wedding-${event.title.en.replace(/\s+/g, '-')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleOpenMap = (query: string) => {
    const encoded = encodeURIComponent(query);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      aria-label="Wedding Details"
      className="w-full max-w-4xl mx-auto my-12 px-4"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Section Header */}
      <div className="text-center space-y-2 mb-8">
        <h2 className={`text-2xl sm:text-3xl text-[#35332F] font-semibold tracking-wide ${
          currentLanguage === 'ur' ? 'font-urdu' : currentLanguage === 'ar' ? 'font-amiri font-bold text-3xl' : 'font-playfair'
        }`}>
          {t.detailsSectionTitle}
        </h2>
        <div className="flex items-center justify-center gap-3 py-1" aria-hidden="true">
          <div className="h-[1px] w-12 bg-[#C9AE7A]/40" />
          <span className="text-[#C9AE7A] text-xs">❦</span>
          <div className="h-[1px] w-12 bg-[#C9AE7A]/40" />
        </div>
        <p className={`text-sm sm:text-base text-[#59604C] italic max-w-md mx-auto ${
          currentLanguage === 'ur' ? 'font-urdu' : currentLanguage === 'ar' ? 'font-amiri text-base' : 'font-cormorant'
        }`}>
          {t.detailsQuote}
        </p>
      </div>

      {/* Nikah Ceremony Panel */}
      <div className="max-w-xl mx-auto">
        <div className="relative bg-[#FAF8F4] border border-[#E8DFD2] rounded-xl p-6 sm:p-8 flex flex-col justify-between shadow-md">
          {/* Subtle decorative inner hairline border */}
          <div className="absolute inset-2.5 border border-[#C9AE7A]/25 rounded-lg pointer-events-none" />

          <div className="relative z-10 space-y-4">
            {/* Tag / Ceremony Name */}
            <div className="text-center pb-2 border-b border-[#E8DFD2]">
              <span className="text-xs uppercase tracking-widest text-[#B3935B] font-medium block">
                {currentLanguage === 'en' ? 'Sacred Union' : currentLanguage === 'ur' ? 'مبارک تقریب' : 'الميثاق الغليظ'}
              </span>
              <h3 className={`text-xl sm:text-2xl text-[#35332F] font-semibold mt-1 ${
                currentLanguage === 'ur' ? 'font-urdu py-1' : currentLanguage === 'ar' ? 'font-amiri font-bold text-2xl' : 'font-playfair'
              }`}>
                {config.nikah.title[currentLanguage]}
              </h3>
            </div>

            {/* Date & Time */}
            <div className="space-y-1.5 text-center">
              <p className={`text-lg sm:text-xl text-[#35332F] font-medium ${
                currentLanguage === 'ur' ? 'font-urdu' : currentLanguage === 'ar' ? 'font-amiri text-xl' : 'font-playfair'
              }`}>
                {config.nikah.dayAndDate[currentLanguage]}
              </p>
              <p className="text-sm sm:text-base text-[#59604C] font-mono tracking-tight">
                {config.nikah.time[currentLanguage]}
              </p>
            </div>

            {/* Venue Details */}
            <div className="text-center pt-2 space-y-1">
              <p className={`text-base sm:text-lg font-semibold text-[#35332F] ${
                currentLanguage === 'ur' ? 'font-urdu' : currentLanguage === 'ar' ? 'font-amiri font-bold' : 'font-playfair'
              }`}>
                {config.nikah.venueName[currentLanguage]}
              </p>
              <p className="text-xs sm:text-sm text-[#7D766A] leading-relaxed">
                {config.nikah.venueAddress[currentLanguage]}
              </p>
              <p className="text-xs text-[#59604C] font-medium">
                {config.nikah.cityCountry[currentLanguage]}
              </p>
            </div>
          </div>

          {/* Action Buttons: Add to Calendar & View Map - Mobile-First Touch Targets */}
          <div className="relative z-10 pt-5 mt-4 border-t border-[#E8DFD2] flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={() => handleAddToCalendar(config.nikah, config.eventDateTimeISO)}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 sm:py-2.5 min-h-[44px] sm:min-h-[40px] text-xs font-medium text-[#35332F] bg-white border border-[#C9AE7A]/60 rounded-lg hover:bg-[#FAF8F4] active:bg-[#F0EBE1] hover:border-[#C9AE7A] transition-all shadow-xs cursor-pointer w-full sm:w-auto"
            >
              <Calendar className="w-4 h-4 text-[#C9AE7A] shrink-0" />
              <span>{t.addToCalendar}</span>
            </button>
            <button
              type="button"
              onClick={() => handleOpenMap(config.nikah.mapQuery)}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 sm:py-2.5 min-h-[44px] sm:min-h-[40px] text-xs font-medium text-[#35332F] bg-white border border-[#C9AE7A]/60 rounded-lg hover:bg-[#FAF8F4] active:bg-[#F0EBE1] hover:border-[#C9AE7A] transition-all shadow-xs cursor-pointer w-full sm:w-auto"
            >
              <MapPin className="w-4 h-4 text-[#C9AE7A] shrink-0" />
              <span>{t.viewLocation}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Dress Code Strip (if provided) */}
      {config.dressCode && (
        <div className="mt-8 bg-white/70 backdrop-blur-sm border border-[#E8DFD2] rounded-lg p-4 sm:p-5 text-center max-w-xl mx-auto shadow-xs">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-wider text-[#B3935B] font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#C9AE7A]" />
            <span>{t.dressCodeLabel}</span>
          </div>
          <p className={`text-sm text-[#59604C] mt-1 ${
            currentLanguage === 'ur' ? 'font-urdu' : currentLanguage === 'ar' ? 'font-amiri text-base' : 'font-cormorant text-base'
          }`}>
            {config.dressCode[currentLanguage]}
          </p>
        </div>
      )}
    </section>
  );
};
