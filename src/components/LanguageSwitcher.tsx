import React from 'react';
import { Language } from '../types/wedding';

interface LanguageSwitcherProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLanguage,
  onLanguageChange,
  className = '',
}) => {
  const languages: { code: Language; label: string; fontClass: string }[] = [
    { code: 'en', label: 'English', fontClass: 'font-sans' },
    { code: 'ur', label: 'اردو', fontClass: 'font-urdu' },
  ];

  return (
    <nav
      aria-label="Language selection"
      className={`inline-flex items-center gap-1 p-1 bg-white/90 backdrop-blur-md border border-[#E8DFD2] rounded-full shadow-sm text-xs ${className}`}
    >
      {languages.map(({ code, label, fontClass }, idx) => {
        const isActive = currentLanguage === code;
        return (
          <React.Fragment key={code}>
            {idx > 0 && <span className="text-[#C9AE7A]/40 text-[10px] select-none" aria-hidden="true">·</span>}
            <button
              type="button"
              onClick={() => onLanguageChange(code)}
              aria-pressed={isActive}
              className={`px-3 py-1.5 sm:px-2.5 sm:py-1 rounded-full transition-all duration-200 whitespace-nowrap shrink-0 flex items-center justify-center cursor-pointer min-h-[36px] sm:min-h-[28px] ${fontClass} ${
                isActive
                  ? 'bg-[#C9AE7A] text-white font-medium shadow-xs'
                  : 'text-[#59604C] hover:text-[#35332F] hover:bg-[#FAF8F4] active:bg-[#F0EBE1]'
              }`}
            >
              {label}
            </button>
          </React.Fragment>
        );
      })}
    </nav>
  );
};
