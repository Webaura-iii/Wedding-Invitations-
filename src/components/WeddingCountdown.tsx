import React, { useEffect, useState } from 'react';
import { Language } from '../types/wedding';
import { translations } from '../translations/translations';

interface WeddingCountdownProps {
  targetDateISO: string;
  currentLanguage: Language;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  hasPassed: boolean;
}

export const WeddingCountdown: React.FC<WeddingCountdownProps> = ({
  targetDateISO,
  currentLanguage,
}) => {
  const t = translations[currentLanguage];
  const isRTL = currentLanguage === 'ur' || currentLanguage === 'ar';

  const calculateTimeRemaining = (): TimeRemaining => {
    const target = new Date(targetDateISO).getTime();
    const now = Date.now();
    const diff = target - now;

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, hasPassed: true };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { days, hours, minutes, seconds, hasPassed: false };
  };

  const [timeLeft, setTimeLeft] = useState<TimeRemaining>(calculateTimeRemaining);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeRemaining());
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDateISO]);

  const units = [
    { label: t.countdownDays, value: timeLeft.days },
    { label: t.countdownHours, value: timeLeft.hours },
    { label: t.countdownMinutes, value: timeLeft.minutes },
    { label: t.countdownSeconds, value: timeLeft.seconds },
  ];

  return (
    <section
      aria-label="Wedding Countdown"
      className="w-full max-w-[94vw] sm:max-w-xl md:max-w-2xl mx-auto my-6 sm:my-10 px-2 sm:px-4"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="bg-[#FAF8F4] border border-[#E8DFD2] rounded-xl p-4 sm:p-8 text-center shadow-md relative overflow-hidden">
        {/* Subtle decorative gold line top and bottom */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9AE7A]/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9AE7A]/60 to-transparent" />

        <h3 className={`text-base sm:text-xl text-[#35332F] font-medium tracking-wide ${
          currentLanguage === 'ur' ? 'font-urdu' : currentLanguage === 'ar' ? 'font-amiri text-lg sm:text-xl font-bold' : 'font-playfair'
        }`}>
          {t.countdownTitle}
        </h3>

        {timeLeft.hasPassed ? (
          <div className="mt-3 sm:mt-4 py-3 sm:py-4 text-center">
            <p className={`text-sm sm:text-lg text-[#C9AE7A] font-semibold ${
              currentLanguage === 'ur' ? 'font-urdu' : currentLanguage === 'ar' ? 'font-amiri text-lg' : 'font-playfair'
            }`}>
              {t.celebrationBegan}
            </p>
          </div>
        ) : (
          <div className="mt-4 sm:mt-6 grid grid-cols-4 gap-1.5 xs:gap-2 sm:gap-4 items-center justify-center">
            {units.map((unit, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center p-2 xs:p-2.5 sm:p-4 bg-white/85 rounded-lg border border-[#E8DFD2] shadow-2xs"
              >
                <span className="font-playfair font-semibold text-lg xs:text-2xl sm:text-3xl md:text-4xl text-[#35332F] tabular-nums">
                  {String(unit.value).padStart(2, '0')}
                </span>
                <span className={`text-[9px] xs:text-[10px] sm:text-xs text-[#7D766A] uppercase tracking-wider mt-0.5 sm:mt-1 ${
                  currentLanguage === 'ur' ? 'font-urdu' : currentLanguage === 'ar' ? 'font-amiri' : 'font-sans'
                }`}>
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
