import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Language } from '../types/wedding';
import { translations } from '../translations/translations';

interface AudioAmbientProps {
  currentLanguage: Language;
}

export const AudioAmbient: React.FC<AudioAmbientProps> = ({ currentLanguage }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);

  const t = translations[currentLanguage];

  const stopAudio = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      // Gentle fade out
      gainNodeRef.current.gain.linearRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 1);
      setTimeout(() => {
        oscillatorsRef.current.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {
            // Already stopped
          }
        });
        oscillatorsRef.current = [];
        if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
          audioCtxRef.current.close();
          audioCtxRef.current = null;
        }
      }, 1000);
    }
    setIsPlaying(false);
  };

  const startAudio = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 2.5); // very soft, soothing volume
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Soft ambient harmonic chords (root + fifth + octave with gentle detune for a tranquil morning breeze atmosphere)
      const freqs = [174.61, 261.63, 349.23, 523.25]; // F3, C4, F4, C5 (peaceful, uplifting)

      const oscs = freqs.map((f, i) => {
        const osc = ctx.createOscillator();
        const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
        const biquad = ctx.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(f + (i * 0.4 - 0.6), ctx.currentTime);

        biquad.type = 'lowpass';
        biquad.frequency.setValueAtTime(450, ctx.currentTime);

        if (panner) {
          panner.pan.setValueAtTime(i % 2 === 0 ? -0.3 : 0.3, ctx.currentTime);
          osc.connect(biquad);
          biquad.connect(panner);
          panner.connect(masterGain);
        } else {
          osc.connect(biquad);
          biquad.connect(masterGain);
        }

        osc.start();
        return osc;
      });

      oscillatorsRef.current = oscs;
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
  };

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  return (
    <button
      type="button"
      onClick={toggleSound}
      aria-label={isPlaying ? t.soundOn : t.soundOff}
      title={isPlaying ? t.soundOn : t.soundOff}
      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-white/85 backdrop-blur-md border border-[#E8DFD2] rounded-full text-xs text-[#59604C] hover:text-[#35332F] hover:bg-white shadow-xs transition-all cursor-pointer"
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-3.5 h-3.5 text-[#C9AE7A] animate-pulse" />
          <span className="hidden sm:inline font-sans text-[11px] text-[#8C6D32]">
            {t.soundOn}
          </span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 text-[#7D766A]" />
          <span className="hidden sm:inline font-sans text-[11px]">
            {t.soundOff}
          </span>
        </>
      )}
    </button>
  );
};
