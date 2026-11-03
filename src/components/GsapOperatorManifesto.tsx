import React, { useEffect, useRef } from 'react';
import { Terminal, Shield, Sparkles } from 'lucide-react';
import { initWordScrubbing } from '../utils/gsapAnimations';

export const GsapOperatorManifesto: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);

  const manifestoText = 
    "In an era of generic code generation, true engineering craft is defined by deep systems integrity, deterministic multi-agent orchestration, and tactile visual polish. I do not merely prompt models — I architect parallel agentic swarms with bounded blast radii, rigorous benchmark verification loops, and zero-compromise developer experiences.";

  const words = manifestoText.split(' ');

  useEffect(() => {
    if (!containerRef.current || !wordsRef.current.length) return;
    const cleanup = initWordScrubbing(containerRef.current, wordsRef.current);
    return cleanup;
  }, []);

  return (
    <div
      ref={containerRef}
      className="p-6 sm:p-8 rounded-lg bg-[#070b14] border-2 border-emerald-500/30 font-mono relative overflow-hidden shadow-[0_0_30px_rgba(16,185,129,0.1)] my-8"
    >
      {/* Decorative Corner Reticles */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-emerald-400" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-emerald-400" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-emerald-400" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-emerald-400" />

      {/* Header bar */}
      <div className="flex items-center justify-between pb-3 border-b border-emerald-500/30 text-xs">
        <div className="flex items-center gap-2 text-emerald-400 font-bold">
          <Terminal className="w-4 h-4" />
          <span>GSAP_SCROLL_TRIGGER // OPERATOR_ENGINEERING_CREED</span>
        </div>
        <div className="flex items-center gap-2 text-slate-500 text-[11px]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-phosphor-pulse" />
          <span>SCRUBBING: REAL_TIME</span>
        </div>
      </div>

      {/* Phosphor Scrubbing Text */}
      <div className="mt-5 text-base sm:text-xl lg:text-2xl font-bold leading-relaxed tracking-wide">
        <span className="text-emerald-500 mr-2">&gt;&gt;</span>
        {words.map((word, index) => (
          <span
            key={index}
            ref={(el) => {
              if (el) wordsRef.current[index] = el;
            }}
            className="inline-block mr-2 transition-colors duration-100 select-none text-slate-600"
          >
            {word}
          </span>
        ))}
      </div>

      {/* Footer telemetry */}
      <div className="mt-5 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2">
        <span>KINETIC ENGINE: GSAP 3.15 + SCROLL_TRIGGER</span>
        <span className="text-emerald-400/90 font-mono">SCROLL_DOWN_TO_ILLUMINATE_PHOSPHOR</span>
      </div>
    </div>
  );
};

