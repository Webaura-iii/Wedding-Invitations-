import React, { useEffect, useState } from 'react';

interface Petal {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  rotation: number;
}

export const PetalCanvas: React.FC<{ active?: boolean }> = ({ active = true }) => {
  const [petals, setPetals] = useState<Petal[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  useEffect(() => {
    if (!active || reducedMotion) {
      setPetals([]);
      return;
    }

    // Naturally varied rose petals, with soft blush tones and subtle translucency.
    setPetals(Array.from({ length: 12 }, (_, id) => ({
      id,
      left: Math.random() * 96 + 2,
      size: Math.random() * 12 + 20,
      duration: Math.random() * 6 + 10,
      delay: Math.random() * 8,
      opacity: Math.random() * 0.22 + 0.68,
      rotation: Math.random() * 360,
    })));
  }, [active, reducedMotion]);

  if (!active || reducedMotion || petals.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-20" aria-hidden="true">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute -top-10"
          style={{
            left: `${petal.left}%`,
            animation: `driftDown ${petal.duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite`,
            animationDelay: `${petal.delay}s`,
            opacity: petal.opacity,
          }}
        >
          <svg
            width={petal.size}
            height={petal.size * 1.42}
            viewBox="0 0 48 68"
            fill="none"
            style={{
              transform: `rotate(${petal.rotation}deg)`,
              filter: 'drop-shadow(0 3px 5px rgba(112, 48, 67, 0.12))',
            }}
          >
            <defs>
              <linearGradient id={`rosePetalBase-${petal.id}`} x1="5%" y1="5%" x2="88%" y2="95%">
                <stop offset="0%" stopColor="#FFF7FA" />
                <stop offset="28%" stopColor="#FADCE7" />
                <stop offset="64%" stopColor="#F4BFD2" />
                <stop offset="100%" stopColor="#E99CB9" />
              </linearGradient>
              <linearGradient id={`rosePetalFold-${petal.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.72" />
                <stop offset="48%" stopColor="#FFFFFF" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#B9577D" stopOpacity="0.2" />
              </linearGradient>
              <radialGradient id={`rosePetalGlow-${petal.id}`} cx="35%" cy="24%" r="75%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.72" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* Organic, cupped rose-petal silhouette with an uneven, softly curled rim */}
            <path
              d="M24 3 C18 6 10 13 7 23 C3 34 8 47 16 58 C19 62 22 65 25 66 C28 61 35 53 39 43 C44 31 42 20 35 11 C32 7 28 4 24 3 Z"
              fill={`url(#rosePetalBase-${petal.id})`}
            />
            {/* Natural highlight along the thin, curled edge */}
            <path
              d="M24 4 C17 8 10 16 8 25 C6 35 11 48 19 58 C13 46 10 35 13 25 C15 17 20 10 24 4 Z"
              fill={`url(#rosePetalGlow-${petal.id})`}
            />
            <path
              d="M24 5 C31 12 36 22 35 32 C34 43 29 55 25 64 C28 49 31 38 30 28 C29 19 26 11 24 5 Z"
              fill={`url(#rosePetalFold-${petal.id})`}
            />
            {/* Faint central vein and fine natural creases */}
            <path d="M24 9 C24 23 26 42 25 61" stroke="#C66D8E" strokeOpacity="0.2" strokeWidth="0.7" />
            <path d="M24 30 C19 26 16 22 14 18 M25 39 C30 34 33 29 34 24 M25 49 C20 44 17 39 16 34" stroke="#FFFFFF" strokeOpacity="0.28" strokeWidth="0.65" strokeLinecap="round" />
            <path d="M24 3 C18 6 10 13 7 23 C3 34 8 47 16 58 C19 62 22 65 25 66 C28 61 35 53 39 43 C44 31 42 20 35 11 C32 7 28 4 24 3 Z" stroke="#D987A6" strokeOpacity="0.34" strokeWidth="0.7" />
          </svg>
        </div>
      ))}
      <style>{`
        @keyframes driftDown {
          0% { transform: translateY(-20px) translateX(0) rotate(0deg); opacity: 0; }
          15% { opacity: 0.8; }
          85% { opacity: 0.8; }
          100% { transform: translateY(115vh) translateX(40px) rotate(220deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};
