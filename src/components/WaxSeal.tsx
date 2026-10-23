import React, { useState } from 'react';

interface WaxSealProps {
  initials?: string;
  onClick: () => void;
  disabled?: boolean;
  label: string;
  className?: string;
  cracked?: boolean;
}

export const WaxSeal: React.FC<WaxSealProps> = ({
  initials,
  onClick,
  disabled = false,
  label,
  className = '',
  cracked = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={`group relative flex items-center justify-center focus:outline-none focus-visible:ring-4 focus-visible:ring-[#D4AF37]/60 rounded-full cursor-pointer transition-transform duration-300 ${
        isPressed ? 'scale-95' : isHovered ? 'scale-105' : 'scale-100'
      } ${className}`}
    >
      {/* Outer organic irregular wax seal matching reference image */}
      <div className="relative w-22 h-22 sm:w-26 sm:h-26 flex items-center justify-center">
        {/* Soft natural drop shadow beneath the wax */}
        <div className="absolute inset-0 rounded-full bg-[#2A1D0B]/35 blur-md transform translate-y-2 pointer-events-none" />

        {/* Outer melted wax contour with rich gold metallic luster */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full filter drop-shadow-md"
        >
          <defs>
            <radialGradient id="goldWaxGradient" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FFF2B2" />
              <stop offset="25%" stopColor="#E5C158" />
              <stop offset="65%" stopColor="#C99727" />
              <stop offset="90%" stopColor="#9E6E12" />
              <stop offset="100%" stopColor="#6E4A05" />
            </radialGradient>
            <linearGradient id="innerRimShine" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFEAA7" />
              <stop offset="50%" stopColor="#C99727" />
              <stop offset="100%" stopColor="#80550B" />
            </linearGradient>
          </defs>
          {/* Organic wavy scalloped melted wax edge matching the photo */}
          <path
            d="M 50,4 C 65,3 78,11 87,22 C 95,33 97,48 94,62 C 91,76 81,89 67,95 C 53,101 37,97 25,89 C 13,81 5,68 4,53 C 3,38 12,23 24,13 C 33,6 41,5 50,4 Z"
            fill="url(#goldWaxGradient)"
          />
        </svg>

        {/* Inner circular embossed coin face */}
        <div className="relative z-10 w-16 h-16 sm:w-19 sm:h-19 rounded-full border-[2.5px] border-[#FFE79A]/80 flex flex-col items-center justify-center bg-gradient-to-br from-[#DFB743] via-[#C69424] to-[#8C600E] shadow-inner">
          {/* Recessed coin ridge */}
          <div className="absolute inset-1 rounded-full border border-[#855B0B]/50 pointer-events-none" />

          {/* Engraved Blooming Rose Botanical Icon matching the photo */}
          <svg
            viewBox="0 0 48 48"
            className="w-10 h-10 sm:w-12 sm:h-12 text-[#5E3F05] filter drop-shadow-[0.5px_0.5px_0px_rgba(255,255,255,0.4)]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Rose Blossom Petals */}
            <path d="M24 10 C 21 8, 17 11, 18 15 C 19 19, 23 21, 24 22 C 25 21, 29 19, 30 15 C 31 11, 27 8, 24 10 Z" fill="currentColor" fillOpacity="0.15" />
            <path d="M20 13 C 21 11, 27 11, 28 13" />
            <path d="M19 16 C 22 18, 26 18, 29 16" />
            <path d="M22 12 C 23 14, 25 14, 26 12" />
            <path d="M16 16 C 14 20, 18 24, 22 25" />
            <path d="M32 16 C 34 20, 30 24, 26 25" />

            {/* Stem and sepals */}
            <path d="M24 22 L24 38" strokeWidth="2.2" />
            {/* Left Leaf */}
            <path d="M24 28 C 18 27, 16 32, 17 34 C 20 34, 23 31, 24 29" fill="currentColor" fillOpacity="0.12" />
            {/* Right Leaf */}
            <path d="M24 32 C 30 31, 32 36, 31 38 C 28 38, 25 35, 24 33" fill="currentColor" fillOpacity="0.12" />
          </svg>

          {/* Optional subtle couple initials underneath rose */}
          {initials && (
            <span className="font-playfair text-[9px] sm:text-[10px] font-bold text-[#573A05] tracking-widest uppercase -mt-1 drop-shadow-xs select-none">
              {initials}
            </span>
          )}

          {/* Soft top-left highlight sheen */}
          <div className="absolute top-1 left-2 w-6 h-3 bg-white/40 rounded-full transform -rotate-30 blur-[1px] pointer-events-none" />
        </div>

        {/* Delicate fracture lines on crack */}
        {cracked && (
          <svg
            className="absolute inset-0 w-full h-full z-20 pointer-events-none text-[#422A04] animate-pulse"
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M50 12 L 48 34 L 54 46 L 46 64 L 50 88" />
          </svg>
        )}
      </div>

      {/* Gentle pulsing aura hint for mobile touch */}
      <span className="absolute -inset-1.5 rounded-full border border-[#E5C158]/40 animate-ping opacity-25 pointer-events-none" />
    </button>
  );
};
