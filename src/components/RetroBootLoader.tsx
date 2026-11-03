import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Zap, FastForward, Power } from 'lucide-react';
import { retroAudio } from '../utils/retroAudio';

interface RetroBootLoaderProps {
  onComplete: () => void;
  forceShow?: boolean;
}

export const RetroBootLoader: React.FC<RetroBootLoaderProps> = ({
  onComplete,
  forceShow = false,
}) => {
  const [stage, setStage] = useState<number>(0);
  const [memCount, setMemCount] = useState<number>(0);
  const [isDegaussing, setIsDegaussing] = useState<boolean>(false);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);

  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const animFrameRef = useRef<number>(0);

  const lines = [
    'AWARD MODULAR BIOS v4.51PG, AN ENERGY STAR ALLY',
    'COPYRIGHT (C) 1984-2026 FARHAN MALLIK WORKSTATION SYSTEMS',
    'CPU: FM-CORE-8086-AI @ 4.77MHz OVERCLOCKED // DUAL-CORE NEURAL ENGINE',
    'DETECTING PRIMARY MASTER  : GHAR-SEARCH-AGENTIC [OK, 1.5L RERA DATA]',
    'DETECTING PRIMARY SLAVE   : CLOUDOPS-SWARM-SRE [OK, 28s MTTD 4-AGENT]',
    'DETECTING SECONDARY MASTER: FORKFIX-NVIDIA-NEMOTRON [OK, 4 REALITIES]',
    'AUDIO CO-PROCESSOR        : 0KB PROCEDURAL SYNTHESIZER [ONLINE]',
    'DISPLAY CONTROLLER        : 3D/2.5D VECTOR CRT ACCELERATOR [60 FPS]',
    'OPERATOR CREDENTIALS      : FARHAN MALLIK (CAMPUS LEAD 2026 // B.TECH CSE)',
    'ALL SYSTEM DIAGNOSTICS NORMAL. BOOTING FM-OS WORKSTATION KERNEL v4.2...',
  ];

  // Fast-boot / Skip handler
  const handleSkip = () => {
    timersRef.current.forEach(clearTimeout);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    finishBoot();
  };

  const finishBoot = () => {
    setIsDegaussing(true);
    retroAudio.playBootChime();
    try {
      sessionStorage.setItem('fm_boot_completed', 'true');
    } catch {
      // ignore
    }

    const t = setTimeout(() => {
      setIsDismissed(true);
      onComplete();
    }, 600);
    timersRef.current.push(t);
  };

  useEffect(() => {
    // Check if previously booted in this session, unless forceShow is true
    const alreadyBooted = sessionStorage.getItem('fm_boot_completed') === 'true';
    if (alreadyBooted && !forceShow) {
      setIsDismissed(true);
      onComplete();
      return;
    }

    // Keyboard listener for ESC or SPACE
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Escape' || e.key === 'Enter') {
        e.preventDefault();
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Initial delay then start sequence
    const t0 = setTimeout(() => {
      setStage(1);
      retroAudio.playTerminalBeep(440, 0.05);

      // Memory counting phase
      let currentMem = 0;
      const targetMem = 16384;
      const memStep = () => {
        currentMem += 512;
        if (currentMem <= targetMem) {
          setMemCount(currentMem);
          if (currentMem % 2048 === 0) {
            retroAudio.playKeyClick();
          }
          animFrameRef.current = requestAnimationFrame(memStep);
        } else {
          setMemCount(targetMem);
          setStage(2);
          retroAudio.playTerminalBeep(880, 0.08);

          // Line by line reveal
          let lineIdx = 3;
          const interval = setInterval(() => {
            if (lineIdx < lines.length) {
              setStage(lineIdx);
              retroAudio.playKeyClick();
              lineIdx++;
            } else {
              clearInterval(interval);
              const tEnd = setTimeout(() => {
                finishBoot();
              }, 400);
              timersRef.current.push(tEnd);
            }
          }, 120);

          timersRef.current.push(interval);
        }
      };

      animFrameRef.current = requestAnimationFrame(memStep);
    }, 250);

    timersRef.current.push(t0);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      timersRef.current.forEach(clearTimeout);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [forceShow]);

  if (isDismissed) return null;

  return (
    <div
      className={`fixed inset-0 z-[100000] bg-black text-[#34d399] font-mono flex flex-col justify-between p-4 sm:p-8 select-none overflow-hidden transition-all duration-500 ${
        isDegaussing
          ? 'scale-y-[0.005] scale-x-125 opacity-40 filter brightness-200 blur-[2px]'
          : 'opacity-100'
      }`}
    >
      {/* CRT Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.8)_50%)] bg-[length:100%_4px]" />

      {/* Top Banner with Energy Star Retro ASCII Logo */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-start justify-between border-b border-emerald-900/60 pb-4 gap-4">
        <div>
          <div className="text-sm sm:text-base font-bold tracking-wider text-emerald-400">
            FARHAN-BIOS (C) 1984-2026 WORKSTATION KERNEL
          </div>
          <div className="text-xs text-emerald-600 mt-1">
            RELEASE 4.51PG // POWER-ON SELF TEST (POST)
          </div>
        </div>

        {/* Vintage Energy Star ASCII Badge */}
        <div className="border border-emerald-500/40 p-2 text-right text-[10px] sm:text-xs text-emerald-400 bg-emerald-950/20 rounded">
          <pre className="font-mono leading-none tracking-tight">
{`  ★ ENERGY ★
[ EPA STAR ALLY ]
   FARHAN 2026`}
          </pre>
        </div>
      </div>

      {/* Middle POST Logs & Memory Test */}
      <div className="relative z-10 flex-1 py-4 sm:py-6 overflow-y-auto space-y-2 text-xs sm:text-sm">
        {stage >= 1 && (
          <div className="space-y-1">
            <p className="text-emerald-300 font-semibold">{lines[0]}</p>
            <p className="text-emerald-600">{lines[1]}</p>
            <p className="text-slate-300 mt-2">{lines[2]}</p>
          </div>
        )}

        {/* Real-Time Memory Test Counting */}
        {stage >= 1 && (
          <div className="p-2 sm:p-3 my-2 bg-emerald-950/30 border border-emerald-500/30 rounded flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-400 animate-ping rounded-full inline-block" />
              <span className="font-bold text-white tracking-widest">
                MEMORY TEST : {memCount} KB{' '}
                {memCount >= 16384 ? (
                  <span className="text-emerald-400 font-bold">[ OK ]</span>
                ) : (
                  <span className="text-amber-400 animate-pulse">TESTING...</span>
                )}
              </span>
            </div>
            <span className="text-[10px] text-emerald-600 hidden sm:inline">
              640K BASE // 15744K EXTENDED
            </span>
          </div>
        )}

        {/* Hardware Devices Diagnostic Listing */}
        {stage >= 2 && (
          <div className="space-y-1 pt-1 font-mono text-[11px] sm:text-xs">
            {lines.slice(3, stage + 1).map((line, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 text-emerald-400/90 animate-fadeIn"
              >
                <span className="text-emerald-600">&gt;&gt;</span>
                <span>{line}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Action Controls & Fast Skip Bar */}
      <div className="relative z-10 border-t border-emerald-900/60 pt-3 flex flex-wrap items-center justify-between text-xs gap-3">
        <div className="flex items-center gap-3">
          <span className="text-emerald-600">PRESS:</span>
          <button
            onClick={handleSkip}
            className="flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 hover:text-white hover:bg-emerald-900/60 transition-all font-bold tracking-wider"
          >
            <FastForward className="w-3.5 h-3.5" />
            <span>[ SPACE / ESC / CLICK TO FAST-BOOT ]</span>
          </button>
        </div>

        <div className="text-[10px] text-emerald-600 tracking-wider">
          FM-OS WORKSTATION BUILD // ALL HARNESS CHECKS NOMINAL
        </div>
      </div>
    </div>
  );
};
