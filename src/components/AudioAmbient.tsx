import React, { useEffect, useRef } from 'react';
import { Language } from '../types/wedding';

interface AudioAmbientProps {
  currentLanguage: Language;
}

/** Starts a soft ambient tone from the visitor's wax-seal opening gesture. */
export const AudioAmbient: React.FC<AudioAmbientProps> = () => {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);

  useEffect(() => {
    const startAudio = () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        if (audioCtxRef.current.state === 'suspended') void audioCtxRef.current.resume();
        return;
      }
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
        masterGain.gain.linearRampToValueAtTime(0.045, ctx.currentTime + 2.5);
        masterGain.connect(ctx.destination);
        oscillatorsRef.current = [174.61, 261.63, 349.23, 523.25].map((frequency) => {
          const osc = ctx.createOscillator();
          const filter = ctx.createBiquadFilter();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(frequency, ctx.currentTime);
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(450, ctx.currentTime);
          osc.connect(filter);
          filter.connect(masterGain);
          osc.start();
          return osc;
        });
      } catch {
        // Sound may be unavailable or blocked by browser/device settings.
      }
    };
    window.addEventListener('wedding-invite-open', startAudio);
    return () => {
      window.removeEventListener('wedding-invite-open', startAudio);
      oscillatorsRef.current.forEach((osc) => {
        try { osc.stop(); osc.disconnect(); } catch { /* already stopped */ }
      });
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') void audioCtxRef.current.close();
    };
  }, []);

  return null;
};
