import React, { useState, useEffect } from 'react';
import { Terminal, Cpu, Shield, Search, Layers, Bot, Radio, Menu, X, Sparkles, Volume2, VolumeX, RotateCcw, Zap, Calendar } from 'lucide-react';
import { ScrollTelemetryHud } from './ScrollTelemetryHud';
import { RetroOscilloscope } from './RetroOscilloscope';
import { retroAudio } from '../utils/retroAudio';
import { navigationEffects, JumpAnimationMode } from '../utils/navigationEffects';
import { themeEngine, CrtTheme } from '../utils/themeEngine';

interface NavbarProps {
  onOpenTerminal: () => void;
  onOpenAITwin?: () => void;
  onOpenSandbox?: () => void;
  onOpenContact: () => void;
  onOpenBooking?: () => void;
  onOpenCommandPalette?: () => void;
  onOpenArcade?: () => void;
  onNavigateSection?: (sectionId: string) => void;
  onReboot?: () => void;
  onDegauss?: () => void;
  isCrtActive?: boolean;
  onToggleCrt?: () => void;
  activeSection?: string;
  onSectorChange?: (sectorId: string) => void;
  viewMode?: 'retro' | 'executive';
  onToggleViewMode?: (mode: 'retro' | 'executive') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenTerminal,
  onOpenAITwin,
  onOpenSandbox,
  onOpenContact,
  onOpenBooking,
  onOpenCommandPalette,
  onOpenArcade,
  onNavigateSection,
  onReboot,
  onDegauss,
  isCrtActive = true,
  onToggleCrt,
  activeSection = 'hero',
  onSectorChange,
  viewMode = 'retro',
  onToggleViewMode,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [isMuted, setIsMuted] = useState(retroAudio.isMuted());
  const [jumpMode, setJumpMode] = useState<JumpAnimationMode>(() => navigationEffects.getMode());
  const [currentTheme, setCurrentTheme] = useState<CrtTheme>(() => themeEngine.getTheme());

  useEffect(() => {
    return themeEngine.subscribe((theme) => {
      setCurrentTheme(theme);
    });
  }, []);

  const handleCycleJumpMode = () => {
    const next = navigationEffects.cycleNextMode();
    setJumpMode(next);
    retroAudio.playTerminalBeep(920, 0.05);
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toISOString().substring(11, 19) + ' UTC'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleSound = () => {
    const next = retroAudio.toggleMute();
    setIsMuted(next);
  };

  const scrollTo = (id: string) => {
    retroAudio.playKeyClick();
    setMobileMenuOpen(false);
    if (onNavigateSection) {
      onNavigateSection(id);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#080c14]/90 backdrop-blur-md border-b border-slate-800 text-xs font-mono select-none">
      {/* Top BIOS / Telemetry Ribbon */}
      <div className="hidden md:flex items-center justify-between px-6 py-1.5 bg-[#050811] border-b border-slate-800/80 text-[11px] text-slate-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>FM-OS v4.2 // TTY01</span>
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">SYS_STATUS: <strong className="text-emerald-400">NOMINAL</strong></span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">AWS_REGION: <strong className="text-cyan-400">us-east-1</strong></span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">BAUD: <strong className="text-amber-400">115200</strong></span>
          <span className="text-slate-600 hidden lg:inline">|</span>
          <div className="hidden lg:flex items-center gap-1.5" title="Live Vector CRT Audio Waveform">
            <span className="text-[10px] text-slate-500">AUDIO_WAVE:</span>
            <RetroOscilloscope width={80} height={16} />
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="text-slate-500 font-mono hidden xl:inline">{currentTime}</span>

          {/* Persona Mode Switcher: Retro Workstation vs Executive Minimalist */}
          {onToggleViewMode && (
            <div className="flex items-center rounded bg-slate-900/90 p-0.5 border border-slate-700/80 text-[10px] font-bold">
              <button
                onClick={() => {
                  retroAudio.playKeyClick();
                  onToggleViewMode('retro');
                }}
                className={`px-2 py-0.5 rounded transition-all flex items-center gap-1 ${
                  viewMode === 'retro'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Switch to 1984 Cyberpunk CRT Developer Workstation"
              >
                <span>🕹️</span>
                <span>RETRO</span>
              </button>
              <button
                onClick={() => {
                  retroAudio.playKeyClick();
                  onToggleViewMode('executive');
                }}
                className={`px-2 py-0.5 rounded transition-all flex items-center gap-1 ${
                  viewMode === 'executive'
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Switch to Executive Minimalist View (Recruiter & Clean UI)"
              >
                <span>🏛️</span>
                <span>EXECUTIVE</span>
              </button>
            </div>
          )}

          {/* CRT Color Phosphor Palette Cycler */}
          <button
            onClick={() => {
              const next = themeEngine.cycleNextTheme();
              retroAudio.playTerminalBeep(980, 0.05);
            }}
            className="px-2 py-0.5 rounded text-[10px] font-bold border transition-colors bg-slate-900 border-slate-700 hover:border-slate-500 text-slate-200"
            title="Cycle CRT Color Phosphor Palette (Emerald, Amber, Cyan, White)"
          >
            {currentTheme.label}
          </button>

          {/* Degauss Coil Button */}
          {onDegauss && (
            <button
              onClick={() => {
                retroAudio.playDegaussCoil();
                onDegauss();
              }}
              className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-bold border transition-colors bg-amber-950/60 border-amber-500/50 text-amber-300 hover:text-white hover:border-amber-400"
              title="Discharge CRT Magnetic Coil (Degauss)"
            >
              🧲 DEGAUSS
            </button>
          )}

          {/* Sound Synthesizer Toggle */}
          <button
            onClick={handleToggleSound}
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold border transition-colors ${
              !isMuted
                ? 'bg-cyan-950/60 border-cyan-500/50 text-cyan-400'
                : 'bg-slate-900 border-slate-700 text-slate-500'
            }`}
            title="Toggle Retro Audio Synthesizer"
          >
            {!isMuted ? <Volume2 className="w-3 h-3 text-cyan-400" /> : <VolumeX className="w-3 h-3 text-slate-500" />}
            <span>SFX: {!isMuted ? 'ON' : 'OFF'}</span>
          </button>

          {onOpenArcade && (
            <button
              onClick={() => {
                retroAudio.playBootChime();
                onOpenArcade();
              }}
              className="px-2 py-0.5 rounded text-[10px] font-bold border transition-colors bg-purple-950/60 border-purple-500/50 text-purple-300 hover:text-white hover:border-purple-400"
              title="Launch CYBER-RUNNER 1984 Arcade ROM"
            >
              🕹️ ARCADE
            </button>
          )}

          {/* Jump Animation Style Cycler */}
          <button
            onClick={handleCycleJumpMode}
            className="px-2 py-0.5 rounded text-[10px] font-bold border transition-colors bg-cyan-950/60 border-cyan-500/50 text-cyan-300 hover:text-white hover:border-cyan-400"
            title="Cycle Page Jump Transition Style (Warp, Degauss, Shutter, Tunnel, Random)"
          >
            ⚡ JUMP: {jumpMode}
          </button>

          {/* Reboot Button */}
          {onReboot && (
            <button
              onClick={() => {
                retroAudio.playBootChime();
                onReboot();
              }}
              className="px-2 py-0.5 rounded text-[10px] font-bold border transition-colors bg-rose-950/60 border-rose-500/50 text-rose-300 hover:text-white hover:border-rose-400"
              title="Reboot Workstation (BIOS POST Sequence)"
            >
              🔄 REBOOT
            </button>
          )}

          {onToggleCrt && (
            <button
              onClick={onToggleCrt}
              className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-colors ${
                isCrtActive
                  ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-400'
                  : 'bg-slate-900 border-slate-700 text-slate-400'
              }`}
              title="Toggle CRT Scanlines Filter"
            >
              CRT: {isCrtActive ? 'ON' : 'OFF'}
            </button>
          )}
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between">
        {/* Logo / Prompt */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('hero');
          }}
          className="flex items-center gap-2 text-slate-100 hover:text-emerald-400 transition-colors group"
        >
          <div className="w-7 h-7 bg-emerald-950/80 border border-emerald-500/40 rounded flex items-center justify-center text-emerald-400 font-bold group-hover:border-emerald-400 shadow-sm">
            &gt;_
          </div>
          <div className="leading-tight">
            <span className="font-bold text-sm tracking-tight text-white group-hover:text-emerald-300">
              FARHAN_MALLIK
            </span>
            <span className="block text-[10px] text-emerald-500/80 font-mono">
              AI &amp; FRONTEND ENGINEER // DEV
            </span>
          </div>
        </a>

        {/* Section Anchors */}
        <nav className="hidden lg:flex items-center gap-1 text-[11px] font-semibold text-slate-400">
          <button
            onClick={() => scrollTo('hero')}
            className={`px-2.5 py-1 rounded transition-all duration-200 ${
              activeSection === 'hero'
                ? 'bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 font-bold glow-emerald shadow-sm'
                : 'hover:text-emerald-400 hover:bg-slate-800/60'
            }`}
          >
            [ 01_INIT ]
          </button>
          <button
            onClick={() => scrollTo('dossiers')}
            className={`px-2.5 py-1 rounded transition-all duration-200 ${
              activeSection === 'dossiers'
                ? 'bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 font-bold glow-emerald shadow-sm'
                : 'hover:text-emerald-400 hover:bg-slate-800/60'
            }`}
          >
            [ 02_DOSSIERS ]
          </button>
          <button
            onClick={() => scrollTo('sandbox')}
            className={`px-2.5 py-1 rounded transition-all duration-200 ${
              activeSection === 'sandbox'
                ? 'bg-cyan-950/80 border border-cyan-500/50 text-cyan-300 font-bold glow-cyan shadow-sm'
                : 'hover:text-cyan-400 hover:bg-slate-800/60'
            }`}
          >
            [ 03_SANDBOX ]
          </button>
          <button
            onClick={() => scrollTo('stack')}
            className={`px-2.5 py-1 rounded transition-all duration-200 ${
              activeSection === 'stack'
                ? 'bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 font-bold glow-emerald shadow-sm'
                : 'hover:text-emerald-400 hover:bg-slate-800/60'
            }`}
          >
            [ 04_CHIPSET ]
          </button>
          <button
            onClick={() => scrollTo('certifications')}
            className={`px-2.5 py-1 rounded transition-all duration-200 ${
              activeSection === 'certifications'
                ? 'bg-amber-950/80 border border-amber-500/50 text-amber-300 font-bold glow-amber shadow-sm'
                : 'hover:text-amber-400 hover:bg-slate-800/60'
            }`}
          >
            [ 05_OPEN_SOURCE ]
          </button>
          <button
            onClick={() => scrollTo('about')}
            className={`px-2.5 py-1 rounded transition-all duration-200 ${
              activeSection === 'about'
                ? 'bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 font-bold glow-emerald shadow-sm'
                : 'hover:text-emerald-400 hover:bg-slate-800/60'
            }`}
          >
            [ 06_BIO ]
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className={`px-2.5 py-1 rounded transition-all duration-200 ${
              activeSection === 'contact'
                ? 'bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 font-bold glow-emerald shadow-sm'
                : 'hover:text-emerald-400 hover:bg-slate-800/60'
            }`}
          >
            [ 07_TRANSMIT ]
          </button>
        </nav>

        {/* Fast Action Buttons */}
        <div className="hidden sm:flex items-center gap-2">
          {onOpenCommandPalette && (
            <button
              onClick={onOpenCommandPalette}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white transition-all text-xs"
              title="Command Palette (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-mono text-[10px] text-emerald-400">⌘K</span>
            </button>
          )}

          {onOpenSandbox && (
            <button
              onClick={onOpenSandbox}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-900/40 hover:border-cyan-400 transition-all text-xs font-semibold"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>CAD_SANDBOX</span>
            </button>
          )}

          {onOpenBooking && (
            <button
              onClick={() => {
                retroAudio.playTerminalBeep(1100, 0.05);
                onOpenBooking();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-950/70 border border-emerald-500/50 text-emerald-300 hover:bg-emerald-900/70 hover:border-emerald-400 transition-all text-xs font-bold shadow-[0_0_12px_rgba(16,185,129,0.2)]"
              title="Schedule Recruiter Interview / Coffee Chat"
            >
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden xl:inline">SCHEDULE_CHAT</span>
              <span className="xl:hidden">SYNC</span>
            </button>
          )}

          <button
            onClick={onOpenTerminal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/50 hover:border-emerald-400 hover:text-emerald-200 transition-all text-xs font-bold shadow-[0_0_15px_rgba(16,185,129,0.15)] active:scale-95"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>EXEC_CLI</span>
          </button>

          <button
            onClick={onOpenContact}
            className="px-3.5 py-1.5 rounded bg-amber-500 text-slate-950 hover:bg-amber-400 font-bold text-xs tracking-wider uppercase transition-colors shadow-sm"
          >
            TRANSMIT
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={onOpenTerminal}
            className="p-2 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-400"
            title="Terminal CLI"
          >
            <Terminal className="w-4 h-4" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded bg-slate-900 border border-slate-700 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Terminal Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0f1d] border-b border-slate-800 p-4 space-y-2 text-xs font-mono animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-400 text-[11px]">
            <span>FM-OS MOBILE SHELL</span>
            <span className="text-emerald-400">READY</span>
          </div>

          {onToggleViewMode && (
            <div className="flex items-center justify-between p-1 bg-slate-900 rounded border border-slate-700 text-[11px] font-bold">
              <span className="text-slate-400 pl-1">VIEW_MODE:</span>
              <div className="flex gap-1">
                <button
                  onClick={() => {
                    retroAudio.playKeyClick();
                    onToggleViewMode('retro');
                    setMobileMenuOpen(false);
                  }}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    viewMode === 'retro' ? 'bg-emerald-600 text-white' : 'text-slate-400'
                  }`}
                >
                  🕹️ RETRO
                </button>
                <button
                  onClick={() => {
                    retroAudio.playKeyClick();
                    onToggleViewMode('executive');
                    setMobileMenuOpen(false);
                  }}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    viewMode === 'executive' ? 'bg-sky-600 text-white' : 'text-slate-400'
                  }`}
                >
                  🏛️ EXECUTIVE
                </button>
              </div>
            </div>
          )}

          {onOpenBooking && (
            <button
              onClick={() => {
                retroAudio.playTerminalBeep(1100, 0.05);
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="flex items-center justify-between w-full py-2 px-2.5 rounded bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 font-bold"
            >
              <span>&gt; 📅 // SCHEDULE 15-MIN RECRUITER SYNC</span>
              <span className="text-[10px] bg-emerald-500/20 px-1.5 py-0.5 rounded text-emerald-300">BOOK</span>
            </button>
          )}
          <button
            onClick={() => scrollTo('hero')}
            className={`block w-full text-left py-1.5 px-2 rounded ${
              activeSection === 'hero'
                ? 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-bold'
                : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            &gt; 01 // SYSTEM OVERVIEW
          </button>
          <button
            onClick={() => scrollTo('dossiers')}
            className={`block w-full text-left py-1.5 px-2 rounded ${
              activeSection === 'dossiers'
                ? 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-bold'
                : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            &gt; 02 // PROJECT DOSSIERS
          </button>
          <button
            onClick={() => scrollTo('sandbox')}
            className={`block w-full text-left py-1.5 px-2 rounded ${
              activeSection === 'sandbox'
                ? 'bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-bold'
                : 'hover:bg-slate-800 text-cyan-300'
            }`}
          >
            &gt; 03 // CLOUD ARCHITECTURE SANDBOX
          </button>
          <button
            onClick={() => scrollTo('stack')}
            className={`block w-full text-left py-1.5 px-2 rounded ${
              activeSection === 'stack'
                ? 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-bold'
                : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            &gt; 04 // TECH STACK PINOUT
          </button>
          <button
            onClick={() => scrollTo('certifications')}
            className={`block w-full text-left py-1.5 px-2 rounded ${
              activeSection === 'certifications'
                ? 'bg-amber-950/80 border border-amber-500/40 text-amber-300 font-bold'
                : 'hover:bg-slate-800 text-amber-300'
            }`}
          >
            &gt; 05 // OPEN SOURCE &amp; LEADERSHIP
          </button>
          <button
            onClick={() => scrollTo('about')}
            className={`block w-full text-left py-1.5 px-2 rounded ${
              activeSection === 'about'
                ? 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-bold'
                : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            &gt; 06 // OPERATOR BIOGRAPHY
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className={`block w-full text-left py-1.5 px-2 rounded ${
              activeSection === 'contact'
                ? 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-bold'
                : 'hover:bg-slate-800 text-emerald-400 font-bold'
            }`}
          >
            &gt; 07 // TRANSMIT MESSAGE / HIRE
          </button>
          {onOpenArcade && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenArcade();
              }}
              className="block w-full text-left py-1.5 px-2 rounded bg-purple-950/60 border border-purple-500/40 text-purple-300 font-bold mt-1"
            >
              &gt; 🕹️ // LAUNCH CYBER-RUNNER 1984 ARCADE
            </button>
          )}

          {/* Mobile Hardware Controls (CRT & Sound SFX) */}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] gap-2">
            {/* Jump Animation Style Cycler */}
          <button
            onClick={handleCycleJumpMode}
            className="px-2 py-0.5 rounded text-[10px] font-bold border transition-colors bg-cyan-950/60 border-cyan-500/50 text-cyan-300 hover:text-white hover:border-cyan-400"
            title="Cycle Page Jump Transition Style (Warp, Degauss, Shutter, Tunnel, Random)"
          >
            ⚡ JUMP: {jumpMode}
          </button>

          {/* Reboot Button */}
          {onReboot && (
            <button
              onClick={() => {
                retroAudio.playBootChime();
                onReboot();
              }}
              className="px-2 py-0.5 rounded text-[10px] font-bold border transition-colors bg-rose-950/60 border-rose-500/50 text-rose-300 hover:text-white hover:border-rose-400"
              title="Reboot Workstation (BIOS POST Sequence)"
            >
              🔄 REBOOT
            </button>
          )}

          {onToggleCrt && (
              <button
                onClick={onToggleCrt}
                className={`flex-1 py-1.5 px-2 rounded font-bold border text-center transition-colors ${
                  isCrtActive
                    ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-400'
                    : 'bg-slate-900 border-slate-700 text-slate-400'
                }`}
              >
                CRT: {isCrtActive ? 'ON' : 'OFF'}
              </button>
            )}

            <button
              onClick={handleToggleSound}
              className={`flex-1 py-1.5 px-2 rounded font-bold border text-center transition-colors ${
                !isMuted
                  ? 'bg-cyan-950/60 border-cyan-500/50 text-cyan-400'
                  : 'bg-slate-900 border-slate-700 text-slate-500'
              }`}
            >
              SFX: {!isMuted ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>
      )}

      {/* Synchronized Real-Time Scroll Depth & Memory Telemetry HUD */}
      <ScrollTelemetryHud onSectorChange={onSectorChange} />
    </header>
  );
};
