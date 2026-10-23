import React from 'react';

export const CurtainBackground: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full bg-[#FAF8F4] overflow-hidden">
      {/* Background Curtain Photography with gentle scrim */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        aria-hidden="true"
      >
        <img
          src="/src/assets/images/flowing_white_curtains_1792745986867.jpg"
          alt=""
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-35 filter blur-[0.5px] scale-105"
        />
        {/* Soft sunlight diffusion overlay */}
        <div className="absolute inset-0 bg-radial-[circle_at_top] from-[#FFFFFF]/75 via-[#FAF8F4]/80 to-[#FAF8F4]/95" />
      </div>

      {/* Decorative sheer curtain drapery left */}
      <div
        className="fixed -top-10 -left-12 w-64 md:w-96 h-[110vh] pointer-events-none z-10 opacity-70 animate-curtain-left"
        aria-hidden="true"
      >
        <div className="w-full h-full bg-gradient-to-r from-white/80 via-white/40 to-transparent blur-sm rounded-r-[60px]" />
      </div>

      {/* Decorative sheer curtain drapery right */}
      <div
        className="fixed -top-10 -right-12 w-64 md:w-96 h-[110vh] pointer-events-none z-10 opacity-70 animate-curtain-right"
        aria-hidden="true"
      >
        <div className="w-full h-full bg-gradient-to-l from-white/80 via-white/40 to-transparent blur-sm rounded-l-[60px]" />
      </div>

      {/* Corner White Roses (Subtle bottom and top accents) */}
      <div 
        className="fixed -bottom-16 -left-16 w-56 md:w-72 h-56 md:h-72 pointer-events-none z-10 opacity-80"
        aria-hidden="true"
      >
        <img
          src="/src/assets/images/luxury_white_roses_1792745988642.jpg"
          alt=""
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain filter drop-shadow-lg transform -rotate-12"
        />
      </div>

      <div 
        className="fixed -bottom-16 -right-16 w-56 md:w-72 h-56 md:h-72 pointer-events-none z-10 opacity-80"
        aria-hidden="true"
      >
        <img
          src="/src/assets/images/luxury_white_roses_1792745988642.jpg"
          alt=""
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain filter drop-shadow-lg transform scale-x-[-1] rotate-12"
        />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
};
