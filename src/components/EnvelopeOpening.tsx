import React, { useState } from 'react';
import ivoryPaperTexture from '../assets/images/ivory_paper_texture_1792745988701.jpg';
import { WaxSeal } from './WaxSeal';
import { LanguageSwitcher } from './LanguageSwitcher';
import { BokehLights } from './BokehLights';
import { Language, WeddingConfig } from '../types/wedding';
import { translations } from '../translations/translations';

interface EnvelopeOpeningProps {
  config: WeddingConfig;
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenComplete: () => void;
}

export const EnvelopeOpening: React.FC<EnvelopeOpeningProps> = ({
  config,
  currentLanguage,
  onLanguageChange,
  onOpenComplete,
}) => {
  const [animationStage, setAnimationStage] = useState<'sealed' | 'cracking' | 'openingFlap' | 'slidingCard' | 'opened'>('sealed');

  const t = translations[currentLanguage];
  const isRTL = currentLanguage === 'ur';

  const handleOpenEnvelope = () => {
    if (animationStage !== 'sealed') return;
    window.dispatchEvent(new Event('wedding-invite-open'));
    setAnimationStage('cracking');
    setTimeout(() => setAnimationStage('openingFlap'), 450);
    setTimeout(() => setAnimationStage('slidingCard'), 1100);
    setTimeout(() => {
      setAnimationStage('opened');
      onOpenComplete();
    }, 2300);
  };

  const isFlapOpen = animationStage === 'openingFlap' || animationStage === 'slidingCard' || animationStage === 'opened';
  const isCardSliding = animationStage === 'slidingCard' || animationStage === 'opened';

  const paperTextureStyle: React.CSSProperties = {
    backgroundImage: `url("${ivoryPaperTexture}")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <section
      aria-label="Invitation Envelope"
      className="relative h-[100dvh] min-h-[100svh] w-screen flex flex-col items-center justify-center p-0 select-none overflow-hidden"
    >
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <img
          src="/assets/aistudio/image_1d7d0262.png"
          alt=""
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 filter blur-[2px] opacity-40 brightness-105"
        />
        <div className="absolute inset-0 bg-radial-[circle_at_center] from-[#FAF8F4]/80 via-[#F7F2E8]/85 to-[#EFE7D8]/95" />
      </div>

      <BokehLights />

      <main className="absolute inset-0 z-20 flex flex-col items-center justify-center w-full h-full max-w-none mx-auto">
        <div className="absolute inset-0 w-full h-full max-w-none aspect-auto perspective-1500 mx-auto">
          <div className="absolute inset-0 bg-[#2D2115]/[0.04] pointer-events-none" />

          <div className="absolute inset-0 bg-[#FDFBF7] border-0 rounded-none shadow-none overflow-visible">
            <div className="absolute inset-0 bg-gradient-to-b from-[#F2ECE0] to-[#E5DAC6] rounded-none shadow-inner" />

            {/* User-provided ivory paper texture across the envelope body. */}
            <div
              aria-hidden="true"
              className="absolute inset-0 z-[5] opacity-70 mix-blend-multiply pointer-events-none"
              style={paperTextureStyle}
            />

            <div
              className={`absolute left-2.5 right-2.5 sm:left-4 sm:right-4 h-[86%] bg-[#FAF8F4] border border-[#D9CBB5] rounded-md shadow-md p-3 sm:p-5 flex flex-col items-center justify-center transition-all duration-1000 ease-out ${
                isCardSliding
                  ? '-translate-y-[52%] sm:-translate-y-[58%] scale-[1.03] shadow-2xl z-25'
                  : 'translate-y-2 scale-98 z-10'
              }`}
            >
              <p className="font-amiri text-[#B3935B] text-base sm:text-xl font-medium tracking-wide">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
              <div className="w-12 sm:w-16 h-[1px] bg-gradient-to-r from-transparent via-[#C9AE7A]/60 to-transparent my-1 sm:my-2" />
              <p className="font-playfair text-[#35332F] text-sm sm:text-lg font-semibold tracking-wide text-center truncate max-w-full px-2">
                {config.nameOrder === 'groom_first'
                  ? `${config.groom.name[currentLanguage]} & ${config.bride.name[currentLanguage]}`
                  : `${config.bride.name[currentLanguage]} & ${config.groom.name[currentLanguage]}`}
              </p>
              <p className="font-cormorant italic text-[11px] sm:text-sm text-[#7D766A] mt-0.5 text-center">
                {config.nikah.dayAndDate[currentLanguage]}
              </p>
            </div>

            <svg
              className="absolute inset-0 w-full h-full z-20 pointer-events-none drop-shadow-sm"
              viewBox="0 0 500 330"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="pocketGradMobile" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#F9F6EE" />
                  <stop offset="100%" stopColor="#EFE7D8" />
                </linearGradient>
                <linearGradient id="sideFlapLeftMobile" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#F3EDE1" />
                  <stop offset="100%" stopColor="#E8DDC9" />
                </linearGradient>
                <linearGradient id="sideFlapRightMobile" x1="100%" y1="0%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#F3EDE1" />
                  <stop offset="100%" stopColor="#E8DDC9" />
                </linearGradient>
              </defs>
              <polygon points="0,0 250,170 0,330" fill="url(#sideFlapLeftMobile)" stroke="#D8CEBD" strokeWidth="0.75" />
              <polygon points="500,0 250,170 500,330" fill="url(#sideFlapRightMobile)" stroke="#D8CEBD" strokeWidth="0.75" />
              <path d="M 0,330 L 250,165 L 500,330 Z" fill="url(#pocketGradMobile)" stroke="#D3C7B3" strokeWidth="0.75" />
            </svg>

            <div
              className={`absolute top-0 left-0 right-0 h-[53%] origin-top transform-style-3d transition-transform duration-700 ease-in-out z-22 ${
                isFlapOpen ? 'flap-open' : ''
              }`}
            >
              <div className="relative w-full h-full backface-hidden drop-shadow-md">
                <svg className="w-full h-full" viewBox="0 0 500 175" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="flapBaseGradMobile" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#FDFBF7" />
                      <stop offset="100%" stopColor="#F5EFE3" />
                    </linearGradient>
                  </defs>
                  <polygon points="0,0 500,0 250,175" fill="url(#flapBaseGradMobile)" stroke="#DDD4C4" strokeWidth="0.75" />
                </svg>

                {/* The same ivory paper texture is layered onto the triangular flap. */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none opacity-70 mix-blend-multiply"
                  style={{
                    ...paperTextureStyle,
                    clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  }}
                />

                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none filter drop-shadow-[0_2px_3px_rgba(0,0,0,0.06)]"
                  viewBox="0 0 500 175"
                  preserveAspectRatio="none"
                >
                  <g fill="#FDFBF7" stroke="#D8CABE" strokeWidth="0.75">
                    {[
                      { cx: 25, cy: 22, r: 16 }, { cx: 58, cy: 45, r: 16 },
                      { cx: 91, cy: 68, r: 16 }, { cx: 124, cy: 91, r: 16 },
                      { cx: 157, cy: 114, r: 16 }, { cx: 190, cy: 137, r: 16 },
                      { cx: 223, cy: 158, r: 16 },
                    ].map((s, i) => (
                      <g key={`left-scallop-m-${i}`}>
                        <circle cx={s.cx} cy={s.cy} r={s.r} fill="#FDFBF7" />
                        <circle cx={s.cx} cy={s.cy} r={s.r - 3} fill="none" stroke="#E5DACD" strokeDasharray="2 1.5" />
                        <circle cx={s.cx} cy={s.cy} r={s.r - 7} fill="#F5EFE5" stroke="#D6C7B6" strokeWidth="0.5" />
                        <circle cx={s.cx} cy={s.cy} r={2} fill="#C9AE7A" stroke="none" />
                      </g>
                    ))}
                  </g>
                  <g fill="#FDFBF7" stroke="#D8CABE" strokeWidth="0.75">
                    {[
                      { cx: 475, cy: 22, r: 16 }, { cx: 442, cy: 45, r: 16 },
                      { cx: 409, cy: 68, r: 16 }, { cx: 376, cy: 91, r: 16 },
                      { cx: 343, cy: 114, r: 16 }, { cx: 310, cy: 137, r: 16 },
                      { cx: 277, cy: 158, r: 16 },
                    ].map((s, i) => (
                      <g key={`right-scallop-m-${i}`}>
                        <circle cx={s.cx} cy={s.cy} r={s.r} fill="#FDFBF7" />
                        <circle cx={s.cx} cy={s.cy} r={s.r - 3} fill="none" stroke="#E5DACD" strokeDasharray="2 1.5" />
                        <circle cx={s.cx} cy={s.cy} r={s.r - 7} fill="#F5EFE5" stroke="#D6C7B6" strokeWidth="0.5" />
                        <circle cx={s.cx} cy={s.cy} r={2} fill="#C9AE7A" stroke="none" />
                      </g>
                    ))}
                  </g>
                  <path
                    d="M 0,0 Q 25,6 50,0 Q 75,6 100,0 Q 125,6 150,0 Q 175,6 200,0 Q 225,6 250,0 Q 275,6 300,0 Q 325,6 350,0 Q 375,6 400,0 Q 425,6 450,0 Q 475,6 500,0"
                    fill="none"
                    stroke="#D8CABE"
                    strokeWidth="0.75"
                  />
                </svg>
              </div>

              <div
                className="absolute inset-0 w-full h-full backface-hidden transform rotate-x-180"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  background: 'linear-gradient(to bottom, #F4ECE0, #E7DCCB)',
                }}
              />
            </div>

            <div
              className={`absolute top-[53%] left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 z-30 ${
                isFlapOpen ? 'opacity-0 scale-75 pointer-events-none' : 'opacity-100'
              }`}
            >
              <WaxSeal
                onClick={handleOpenEnvelope}
                disabled={animationStage !== 'sealed'}
                label={t.tapToOpen}
                cracked={animationStage === 'cracking'}
              />
            </div>
          </div>
        </div>

        <div
          className={`absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 w-[min(90vw,32rem)] text-center transition-all duration-500 px-4 z-40 ${
            isRTL ? 'font-urdu' : 'font-cormorant'
          }`}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <p className="text-[#35332F] text-sm sm:text-base md:text-lg font-medium tracking-wide drop-shadow-xs leading-relaxed">
            {t.envelopePrompt}
          </p>
          <p className="text-[#A07C36] text-[11px] sm:text-xs mt-1 uppercase tracking-widest font-sans font-medium">
            {animationStage === 'sealed' ? t.tapToOpen : t.openingInvitation}
          </p>
        </div>
      </main>
    </section>
  );
};
