import React, { useState } from 'react';
import { ArrowUp, Check, Share2 } from 'lucide-react';
import { Language, WeddingConfig } from '../types/wedding';
import { translations } from '../translations/translations';

interface ClosingSectionProps {
  config: WeddingConfig;
  currentLanguage: Language;
  onReseal: () => void;
}

export const ClosingSection: React.FC<ClosingSectionProps> = ({
  config,
  currentLanguage,
  onReseal,
}) => {
  const t = translations[currentLanguage];
  const isRTL = currentLanguage === 'ur' || currentLanguage === 'ar';
  const [copied, setCopied] = useState(false);

  const coupleTitle =
    config.nameOrder === 'groom_first'
      ? `${config.groom.name[currentLanguage]} & ${config.bride.name[currentLanguage]}`
      : `${config.bride.name[currentLanguage]} & ${config.groom.name[currentLanguage]}`;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer
      aria-label="Closing Blessing"
      className="w-full max-w-2xl mx-auto my-16 px-4 text-center"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="bg-[#FAF8F4] border border-[#E8DFD2] rounded-xl p-8 sm:p-12 shadow-md relative overflow-hidden space-y-6">
        {/* Top delicate flourish */}
        <div className="flex items-center justify-center gap-3" aria-hidden="true">
          <div className="h-[1px] w-16 bg-[#C9AE7A]/50" />
          <span className="text-[#C9AE7A] text-sm">❦</span>
          <div className="h-[1px] w-16 bg-[#C9AE7A]/50" />
        </div>

        {/* Sunnah Barakah Dua */}
        {config.duaText && (
          <div className="space-y-2 py-2">
            <span className="text-xs uppercase tracking-widest text-[#B3935B] font-semibold block">
              {t.closingDuaHeading}
            </span>
            <p className="font-amiri text-xl sm:text-2xl text-[#8C6D32] leading-relaxed">
              «بَارَكَ اللَّهُ لَكَ، وَبَارَكَ عَلَيْكَ، وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ»
            </p>
            {currentLanguage !== 'ar' && (
              <p className={`text-xs sm:text-sm text-[#7D766A] max-w-lg mx-auto ${
                currentLanguage === 'ur' ? 'font-urdu' : 'font-cormorant italic text-base'
              }`}>
                {config.duaText[currentLanguage]}
              </p>
            )}
          </div>
        )}

        {/* Closing Warm Message */}
        <p className={`text-sm sm:text-base text-[#59604C] leading-relaxed max-w-lg mx-auto ${
          currentLanguage === 'ur' ? 'font-urdu' : currentLanguage === 'ar' ? 'font-amiri text-lg' : 'font-lora'
        }`}>
          {t.closingMessage}
        </p>

        {/* Couple Names & Date */}
        <div className="pt-4 border-t border-[#E8DFD2] space-y-1">
          <p className={`text-xl sm:text-2xl text-[#35332F] font-semibold ${
            currentLanguage === 'ur' ? 'font-urdu py-1' : currentLanguage === 'ar' ? 'font-amiri font-bold' : 'font-playfair'
          }`}>
            {coupleTitle}
          </p>
          <p className="text-xs text-[#7D766A] font-medium tracking-wider uppercase font-sans">
            {config.nikah.dayAndDate[currentLanguage]} · {config.nikah.cityCountry[currentLanguage]}
          </p>
        </div>

        {/* Interaction Actions: Share Link & Re-seal envelope - Mobile-First Touch Targets */}
        <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center justify-center gap-2 px-4 py-3 sm:py-2.5 min-h-[44px] sm:min-h-[40px] text-xs font-medium text-[#35332F] bg-white border border-[#E8DFD2] rounded-lg hover:border-[#C9AE7A] hover:bg-[#FAF8F4] active:bg-[#F0EBE1] transition-all shadow-xs cursor-pointer w-full sm:w-auto"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-emerald-700">{t.linkCopied}</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-[#C9AE7A] shrink-0" />
                <span>{t.shareInvitation}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onReseal}
            className="inline-flex items-center justify-center gap-2 px-4 py-3 sm:py-2.5 min-h-[44px] sm:min-h-[40px] text-xs font-medium text-[#8C6D32] bg-[#FAF8F4] border border-[#C9AE7A]/40 rounded-lg hover:bg-white active:bg-[#F0EBE1] hover:border-[#C9AE7A] transition-all shadow-xs cursor-pointer w-full sm:w-auto"
          >
            <ArrowUp className="w-4 h-4 text-[#8C6D32] shrink-0" />
            <span>{t.resealInvitation}</span>
          </button>
        </div>

      </div>
    </footer>
  );
};
