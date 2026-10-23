import React, { useMemo } from 'react';

interface BokehOrb {
  id: number;
  top: number; // percentage
  left: number; // percentage
  size: number; // in pixels
  opacity: number;
  blur: number; // in pixels
  animationDuration: number; // in seconds
  animationDelay: number; // in seconds
}

export const BokehLights: React.FC = () => {
  const orbs: BokehOrb[] = useMemo(() => {
    // Generate gentle warm golden light orbs matching the user's reference photo
    return [
      { id: 1, top: 8, left: 18, size: 48, opacity: 0.45, blur: 8, animationDuration: 7, animationDelay: 0 },
      { id: 2, top: 12, left: 36, size: 72, opacity: 0.55, blur: 12, animationDuration: 9, animationDelay: 1 },
      { id: 3, top: 6, left: 48, size: 54, opacity: 0.4, blur: 10, animationDuration: 8, animationDelay: 2 },
      { id: 4, top: 16, left: 74, size: 68, opacity: 0.6, blur: 14, animationDuration: 10, animationDelay: 0.5 },
      { id: 5, top: 22, left: 88, size: 40, opacity: 0.35, blur: 6, animationDuration: 6, animationDelay: 3 },
      { id: 6, top: 26, left: 6, size: 58, opacity: 0.5, blur: 10, animationDuration: 8.5, animationDelay: 1.5 },
      { id: 7, top: 44, left: 3, size: 36, opacity: 0.4, blur: 6, animationDuration: 7.5, animationDelay: 2.5 },
      { id: 8, top: 82, left: 8, size: 50, opacity: 0.45, blur: 8, animationDuration: 9, animationDelay: 1 },
      { id: 9, top: 88, left: 78, size: 62, opacity: 0.5, blur: 10, animationDuration: 8, animationDelay: 0.8 },
      { id: 10, top: 92, left: 92, size: 44, opacity: 0.35, blur: 7, animationDuration: 7, animationDelay: 2 },
      { id: 11, top: 38, left: 94, size: 52, opacity: 0.4, blur: 8, animationDuration: 9.5, animationDelay: 1.2 },
      { id: 12, top: 14, left: 64, size: 84, opacity: 0.55, blur: 16, animationDuration: 11, animationDelay: 0 },
    ];
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-15" aria-hidden="true">
      {orbs.map((orb) => (
        <div
          key={orb.id}
          className="absolute rounded-full"
          style={{
            top: `${orb.top}%`,
            left: `${orb.left}%`,
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            background: 'radial-gradient(circle, rgba(254, 240, 138, 0.75) 0%, rgba(245, 158, 11, 0.35) 60%, rgba(217, 119, 6, 0) 100%)',
            filter: `blur(${orb.blur}px)`,
            opacity: orb.opacity,
            animation: `bokehPulse ${orb.animationDuration}s ease-in-out infinite alternate`,
            animationDelay: `${orb.animationDelay}s`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
      <style>{`
        @keyframes bokehPulse {
          0% {
            transform: translate(-50%, -50%) scale(0.9) translateY(0);
            opacity: 0.35;
          }
          50% {
            opacity: 0.65;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.15) translateY(-8px);
            opacity: 0.45;
          }
        }
      `}</style>
    </div>
  );
};
