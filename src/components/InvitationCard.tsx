import React from 'react';
import { Language, WeddingConfig } from '../types/wedding';
import { translations } from '../translations/translations';
import { WeddingCalendar } from './WeddingCalendar';

interface InvitationCardProps {
  config: WeddingConfig;
  currentLanguage: Language;
}

export const InvitationCard: React.FC<InvitationCardProps> = ({ config, currentLanguage }) => {
  const t = translations[currentLanguage];
  const isRTL = currentLanguage === 'ur' || currentLanguage === 'ar';

  const groomName = config.groom.name[currentLanguage];
  const brideName = config.bride.name[currentLanguage];
  const groomParents = config.groom.parents ? config.groom.parents[currentLanguage] : '';
  const brideParents = config.bride.parents ? config.bride.parents[currentLanguage] : '';

  const firstName = config.nameOrder === 'groom_first' ? groomName : brideName;
  const secondName = config.nameOrder === 'groom_first' ? brideName : groomName;
  const firstParents = config.nameOrder === 'groom_first' ? groomParents : brideParents;
  const secondParents = config.nameOrder === 'groom_first' ? brideParents : groomParents;

  return (
    <article
      aria-label="Wedding Invitation Card"
      className="relative w-full max-w-[94vw] sm:max-w-xl md:max-w-2xl mx-auto my-4 sm:my-8 bg-[#FAF8F4] border border-[#E8DFD2] rounded-xl shadow-xl p-5 sm:p-10 md:p-14 text-center overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
      style={{
        backgroundImage: 'radial-gradient(#E8DFD2 0.75px, transparent 0.75px)',
        backgroundSize: '18px 18px',
      }}
    >
      {/* Decorative Champagne Gold Double Border with Corner Ornaments */}
      <div className="absolute inset-2.5 sm:inset-4 border border-[#C9AE7A]/40 rounded-lg pointer-events-none" />
      <div className="absolute inset-3.5 sm:inset-5 border border-[#C9AE7A]/20 rounded-md pointer-events-none" />

      {/* Subtle corner floral botanical vignettes */}
      <div 
        className="absolute top-1.5 left-1.5 w-10 sm:w-20 h-10 sm:h-20 pointer-events-none opacity-30 sm:opacity-40"
        aria-hidden="true"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#C9AE7A] fill-none stroke-current" strokeWidth="1">
          <path d="M 0,0 L 50,0 C 40,20 20,40 0,50 Z" />
          <path d="M 10,10 Q 25,25 10,40" strokeDasharray="2 2" />
        </svg>
      </div>

      <div 
        className="absolute top-1.5 right-1.5 w-10 sm:w-20 h-10 sm:h-20 pointer-events-none opacity-30 sm:opacity-40 transform scale-x-[-1]"
        aria-hidden="true"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#C9AE7A] fill-none stroke-current" strokeWidth="1">
          <path d="M 0,0 L 50,0 C 40,20 20,40 0,50 Z" />
          <path d="M 10,10 Q 25,25 10,40" strokeDasharray="2 2" />
        </svg>
      </div>

      <div 
        className="absolute bottom-1.5 left-1.5 w-10 sm:w-20 h-10 sm:h-20 pointer-events-none opacity-30 sm:opacity-40 transform scale-y-[-1]"
        aria-hidden="true"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#C9AE7A] fill-none stroke-current" strokeWidth="1">
          <path d="M 0,0 L 50,0 C 40,20 20,40 0,50 Z" />
          <path d="M 10,10 Q 25,25 10,40" strokeDasharray="2 2" />
        </svg>
      </div>

      <div 
        className="absolute bottom-1.5 right-1.5 w-10 sm:w-20 h-10 sm:h-20 pointer-events-none opacity-30 sm:opacity-40 transform scale-x-[-1] scale-y-[-1]"
        aria-hidden="true"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#C9AE7A] fill-none stroke-current" strokeWidth="1">
          <path d="M 0,0 L 50,0 C 40,20 20,40 0,50 Z" />
          <path d="M 10,10 Q 25,25 10,40" strokeDasharray="2 2" />
        </svg>
      </div>

      {/* Card Content Stack */}
      <div className="relative z-10 flex flex-col items-center max-w-xl mx-auto space-y-3 sm:space-y-6">
        
        {/* Sacred Bismillah Calligraphy */}
        <div className="pt-1 sm:pt-2">
          <h2 className="font-amiri text-xl xs:text-2xl sm:text-3xl md:text-4xl text-[#B3935B] font-normal tracking-wide drop-shadow-xs">
            {t.bismillahArabic}
          </h2>
          {currentLanguage !== 'ar' && (
            <p className={`text-[11px] sm:text-sm text-[#7D766A] mt-1 italic ${currentLanguage === 'ur' ? 'font-urdu' : 'font-cormorant'}`}>
              {t.bismillahMeaning}
            </p>
          )}
        </div>

        {/* Elegant Arch Islamic Ornamental Divider */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 w-full py-0.5" aria-hidden="true">
          <div className="h-[1px] flex-1 max-w-[60px] sm:max-w-[80px] bg-gradient-to-r from-transparent to-[#C9AE7A]/60" />
          <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rotate-45 border border-[#C9AE7A] bg-[#FAF8F4]" />
          <div className="h-[1px] flex-1 max-w-[60px] sm:max-w-[80px] bg-gradient-to-l from-transparent to-[#C9AE7A]/60" />
        </div>

        {/* Formal Invitation Opening Sentence */}
        <p className={`text-xs sm:text-base text-[#59604C] leading-relaxed max-w-lg px-2 ${
          currentLanguage === 'ur' ? 'font-urdu text-sm sm:text-base' : currentLanguage === 'ar' ? 'font-amiri text-base sm:text-lg' : 'font-cormorant text-base sm:text-lg italic'
        }`}>
          {t.invitationOpening}
        </p>

        {/* The Couple's Names - Mobile-First Large Editorial Typography */}
        <div className="w-full py-1 sm:py-2 space-y-2 sm:space-y-4">
          <div className="space-y-0.5 sm:space-y-1">
            <h1 className={`text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-[#35332F] font-semibold tracking-wide break-words ${
              currentLanguage === 'ur' ? 'font-urdu py-1' : currentLanguage === 'ar' ? 'font-amiri font-bold' : 'font-playfair'
            }`}>
              {firstName}
            </h1>
            {firstParents && (
              <p className={`text-[11px] sm:text-sm text-[#7D766A] ${
                currentLanguage === 'ur' ? 'font-urdu' : currentLanguage === 'ar' ? 'font-amiri' : 'font-cormorant italic'
              }`}>
                {firstParents}
              </p>
            )}
          </div>

          <div className="flex items-center justify-center gap-2 sm:gap-3 py-0.5">
            <div className="h-[1px] w-8 sm:w-14 bg-[#C9AE7A]/50" />
            <span className={`text-[#B3935B] text-lg sm:text-2xl font-serif italic px-1.5 ${
              currentLanguage === 'ur' ? 'font-urdu text-base' : currentLanguage === 'ar' ? 'font-amiri' : 'font-playfair'
            }`}>
              {t.andWord}
            </span>
            <div className="h-[1px] w-8 sm:w-14 bg-[#C9AE7A]/50" />
          </div>

          <div className="space-y-0.5 sm:space-y-1">
            <h1 className={`text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-[#35332F] font-semibold tracking-wide break-words ${
              currentLanguage === 'ur' ? 'font-urdu py-1' : currentLanguage === 'ar' ? 'font-amiri font-bold' : 'font-playfair'
            }`}>
              {secondName}
            </h1>
            {secondParents && (
              <p className={`text-[11px] sm:text-sm text-[#7D766A] ${
                currentLanguage === 'ur' ? 'font-urdu' : currentLanguage === 'ar' ? 'font-amiri' : 'font-cormorant italic'
              }`}>
                {secondParents}
              </p>
            )}
          </div>
        </div>

        {/* Together with Families sentence */}
        <p className={`text-xs sm:text-base text-[#59604C] leading-relaxed max-w-md px-2 ${
          currentLanguage === 'ur' ? 'font-urdu text-sm sm:text-base' : currentLanguage === 'ar' ? 'font-amiri text-sm sm:text-base' : 'font-cormorant italic text-sm sm:text-base'
        }`}>
          {t.togetherWithFamilies}
        </p>

        {/* Delicate Base Seal Crest Motif */}
        <div className="pt-2 flex flex-col items-center" aria-hidden="true">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#C9AE7A]/40 flex items-center justify-center bg-[#FAF8F4] shadow-xs">
            <span className="font-playfair text-[#8C6D32] text-[11px] sm:text-xs font-semibold tracking-wider">
              {config.initials}
            </span>
          </div>
        </div>

        {/* Save-the-date calendar sits at the very bottom of the invitation card */}
        <div className="w-full pt-2 sm:pt-4">
          <WeddingCalendar
            targetDateISO={config.eventDateTimeISO}
            currentLanguage={currentLanguage}
          />
        </div>
      </div>
    </article>
  );
};
