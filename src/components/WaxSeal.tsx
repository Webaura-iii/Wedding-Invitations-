import React, { useState } from 'react';

interface WaxSealProps {
  initials?: string;
  onClick: () => void;
  disabled?: boolean;
  label: string;
  className?: string;
  cracked?: boolean;
}

/** The supplied transparent gold L seal stays intact and is the envelope's only trigger. */
export const WaxSeal: React.FC<WaxSealProps> = ({
  onClick,
  disabled = false,
  label,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={`wax-seal-trigger relative z-30 flex items-center justify-center rounded-full cursor-pointer disabled:cursor-default focus:outline-none focus-visible:ring-4 focus-visible:ring-[#D4AF37]/60 ${isHovered ? 'wax-seal-hovered' : ''} ${className}`}
    >
      {/* Asset: public/assets/images/wax-seal.png — transparent gold L monogram. Never animate or remove the seal. */}
      <img
        src="/assets/images/wax-seal.png"
        alt=""
        draggable={false}
        className="wax-seal-image block w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] object-contain"
      />
    </button>
  );
};
