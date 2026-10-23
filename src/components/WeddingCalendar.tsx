import React, { useMemo } from 'react';
import { Heart } from 'lucide-react';
import { Language } from '../types/wedding';
import { translations } from '../translations/translations';

interface WeddingCalendarProps {
  targetDateISO: string;
  currentLanguage: Language;
}

export const WeddingCalendar: React.FC<WeddingCalendarProps> = ({
  targetDateISO,
  currentLanguage,
}) => {
  const t = translations[currentLanguage];
  const isRTL = currentLanguage === 'ur' || currentLanguage === 'ar';

  const {
    year,
    monthName,
    weddingDayNumber,
    firstDayOfWeek,
    totalDaysInMonth,
  } = useMemo(() => {
    const target = new Date(targetDateISO);
    const yr = target.getFullYear();
    const mo = target.getMonth();
    const day = target.getDate();

    // Calculate first day of the month (0 = Sunday, 1 = Monday, ...)
    const firstDay = new Date(yr, mo, 1).getDay();
    // Calculate total days in the month
    const totalDays = new Date(yr, mo + 1, 0).getDate();

    // Localized Month Name
    const monthNamesEn = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const monthNamesUr = [
      'جنوری', 'فروری', 'مارچ', 'اپریل', 'مئی', 'جون',
      'جولائی', 'اگست', 'ستمبر', 'اکتوبر', 'نومبر', 'دسمبر'
    ];
    const monthNamesAr = [
      'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
      'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
    ];

    let name = monthNamesEn[mo];
    if (currentLanguage === 'ur') name = monthNamesUr[mo];
    if (currentLanguage === 'ar') name = monthNamesAr[mo];

    return {
      year: yr,
      monthName: name,
      weddingDayNumber: day,
      firstDayOfWeek: firstDay,
      totalDaysInMonth: totalDays,
    };
  }, [targetDateISO, currentLanguage]);

  // Weekday column headers
  const weekdays = useMemo(() => {
    if (currentLanguage === 'ur') {
      return ['اتوار', 'پیر', 'منگل', 'بدھ', 'جمعرات', 'جمعہ', 'ہفتہ'];
    }
    if (currentLanguage === 'ar') {
      return ['أحد', 'إثن', 'ثلا', 'أرب', 'خمي', 'جمع', 'سبت'];
    }
    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  }, [currentLanguage]);

  // Generate grid cells (empty preceding days + active month days)
  const daysGrid = useMemo(() => {
    const cells: (number | null)[] = [];
    for (let i = 0; i < firstDayOfWeek; i++) {
      cells.push(null);
    }
    for (let day = 1; day <= totalDaysInMonth; day++) {
      cells.push(day);
    }
    return cells;
  }, [firstDayOfWeek, totalDaysInMonth]);

  return (
    <section
      aria-label="Wedding Date Calendar"
      className="w-full max-w-[94vw] sm:max-w-md mx-auto my-6 sm:my-8 px-2 sm:px-4"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="bg-[#FAF8F4] border border-[#E8DFD2] rounded-xl p-4 sm:p-6 shadow-md relative overflow-hidden text-center">
        {/* Subtle decorative gold inner border */}
        <div className="absolute inset-2 border border-[#C9AE7A]/20 rounded-lg pointer-events-none" />

        {/* Header: Save the Date & Month Year */}
        <div className="relative z-10 space-y-1 mb-4">
          <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#B3935B] font-medium block">
            {t.saveTheDateTitle}
          </span>
          <h3 className={`text-xl sm:text-2xl text-[#35332F] font-semibold tracking-wide ${
            currentLanguage === 'ur' ? 'font-urdu' : currentLanguage === 'ar' ? 'font-amiri font-bold text-2xl' : 'font-playfair'
          }`}>
            {monthName} {year}
          </h3>
          <div className="flex items-center justify-center gap-2 py-0.5" aria-hidden="true">
            <div className="h-[1px] w-8 bg-[#C9AE7A]/40" />
            <span className="text-[#C9AE7A] text-[10px]">❦</span>
            <div className="h-[1px] w-8 bg-[#C9AE7A]/40" />
          </div>
        </div>

        {/* Calendar Weekday Header Row */}
        <div className="grid grid-cols-7 gap-1 text-center mb-2 pb-1.5 border-b border-[#E8DFD2]/70">
          {weekdays.map((dayName, idx) => (
            <span
              key={idx}
              className={`text-[10px] sm:text-xs font-medium text-[#7D766A] select-none ${
                idx === 5 ? 'text-[#B3935B] font-semibold' : '' /* Highlight Friday (Jummah) */
              } ${currentLanguage === 'ur' ? 'font-urdu text-[11px]' : currentLanguage === 'ar' ? 'font-amiri text-[11px]' : 'font-sans'}`}
            >
              {dayName}
            </span>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-1 sm:gap-1.5 items-center justify-items-center">
          {daysGrid.map((dayNum, index) => {
            if (dayNum === null) {
              return <div key={`empty-${index}`} className="w-8 h-8 sm:w-10 sm:h-10" aria-hidden="true" />;
            }

            const isWeddingDay = dayNum === weddingDayNumber;

            return (
              <div
                key={`day-${dayNum}`}
                className={`relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-xs sm:text-sm transition-all select-none ${
                  isWeddingDay
                    ? 'font-bold text-[#35332F] z-10'
                    : 'text-[#59604C] hover:bg-white/60 font-lora'
                }`}
              >
                {/* Heart outline wrapping the wedding date */}
                {isWeddingDay ? (
                  <div className="relative flex items-center justify-center w-full h-full">
                    {/* Glowing gold background pulse */}
                    <span className="absolute inset-0 rounded-full bg-[#E5C158]/20 animate-ping opacity-30" />
                    
                    {/* SVG Metallic Gold Heart surrounding the number */}
                    <svg
                      viewBox="0 0 40 40"
                      className="absolute inset-0 w-full h-full filter drop-shadow-[0_2px_4px_rgba(201,174,122,0.45)]"
                      fill="none"
                    >
                      <defs>
                        <linearGradient id="goldHeartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#DFCCA3" />
                          <stop offset="40%" stopColor="#C9AE7A" />
                          <stop offset="80%" stopColor="#B3935B" />
                          <stop offset="100%" stopColor="#8C6D32" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M20,34 C19,34 6,24 6,14 C6,8.5 10.5,4 16,4 C17.8,4 19.5,4.7 20,5.7 C20.5,4.7 22.2,4 24,4 C29.5,4 34,8.5 34,14 C34,24 21,34 20,34 Z"
                        fill="#FAF5EB"
                        stroke="url(#goldHeartGrad)"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />
                    </svg>

                    {/* Marked Wedding Date Number */}
                    <span className="relative z-10 font-playfair font-bold text-xs sm:text-sm text-[#73541B] tabular-nums mt-0.5">
                      {dayNum}
                    </span>
                  </div>
                ) : (
                  <span className="font-playfair text-[#59604C] tabular-nums">
                    {dayNum}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Caption with Heart Icon */}
        <div className="mt-3 pt-2 border-t border-[#E8DFD2]/60 flex items-center justify-center gap-1.5 text-[#8C6D32]">
          <Heart className="w-3.5 h-3.5 fill-[#C9AE7A] text-[#B3935B]" />
          <span className={`text-[11px] sm:text-xs font-medium tracking-wide ${
            currentLanguage === 'ur' ? 'font-urdu' : currentLanguage === 'ar' ? 'font-amiri' : 'font-cormorant italic'
          }`}>
            {t.weddingDayLabel} · {weddingDayNumber} {monthName} {year}
          </span>
        </div>

      </div>
    </section>
  );
};
