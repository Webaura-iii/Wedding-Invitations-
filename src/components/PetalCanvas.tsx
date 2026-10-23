import React, { useEffect, useState } from 'react';

interface Petal {
  id: number;
  left: number; // percentage 0-100
  size: number; // in pixels
  duration: number; // in seconds
  delay: number; // in seconds
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

    // Keep restrained count (12 petals) so it's a gentle natural drift, not a snowfall
    const generated: Petal[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: Math.random() * 96 + 2,
      size: Math.random() * 12 + 16,
      duration: Math.random() * 6 + 10,
      delay: Math.random() * 8,
      opacity: Math.random() * 0.4 + 0.45,
      rotation: Math.random() * 360,
    }));

    setPetals(generated);
  }, [active, reducedMotion]);

  if (!active || reducedMotion || petals.length === 0) {
    return null;
  }

  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden z-20"
      aria-hidden="true"
    >
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
            height={petal.size * 1.3}
            viewBox="0 0 40 52"
            fill="none"
            style={{
              transform: `rotate(${petal.rotation}deg)`,
              filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.06))',
            }}
          >
            <defs>
              <linearGradient id={`petalGrad-${petal.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="60%" stopColor="#FAF8F4" />
                <stop offset="100%" stopColor="#EFE8DD" />
              </linearGradient>
            </defs>
            <path
              d="M20 2 C 34 8, 38 28, 22 48 C 18 42, 6 28, 20 2 Z"
              fill={`url(#petalGrad-${petal.id})`}
            />
          </svg>
        </div>
      ))}
      <style>{`
        @keyframes driftDown {
          0% {
            transform: translateY(-20px) translateX(0) rotate(0deg);
            opacity: 0;
          }
          15% {
            opacity: 0.8;
          }
          85% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(115vh) translateX(40px) rotate(220deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
