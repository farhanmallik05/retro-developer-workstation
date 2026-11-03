import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { CloudArchitectureSandbox } from './components/CloudArchitectureSandbox';
import { Skills } from './components/Skills';
import { Certifications } from './components/Certifications';
import { GitHubActivity } from './components/GitHubActivity';
import { About } from './components/About';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { AITwinModal } from './components/AITwinModal';
import { CommandPalette } from './components/CommandPalette';
import { CertificationQuizModal } from './components/CertificationQuizModal';
import { RetroArcadeModal } from './components/RetroArcadeModal';
import { ScrollToTopBooster } from './components/ScrollToTopBooster';
import { RetroBootLoader } from './components/RetroBootLoader';
import { SectorJumpOverlay } from './components/SectorJumpOverlay';
import { BackgroundStarfield } from './components/BackgroundStarfield';
import { RetroPhosphorCursor } from './components/RetroPhosphorCursor';
import { navigationEffects, JumpAnimationMode } from './utils/navigationEffects';
import { retroAudio } from './utils/retroAudio';
import { Terminal, Cpu, Cloud, Bot, Sparkles } from 'lucide-react';

export const App: React.FC = () => {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isAITwinOpen, setIsAITwinOpen] = useState(false);
  const [isSandboxModalOpen, setIsSandboxModalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isArcadeOpen, setIsArcadeOpen] = useState(false);
  const [isCrtActive, setIsCrtActive] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');

  // Page Loading BIOS POST State
  const [isBooting, setIsBooting] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem('fm_boot_completed') !== 'true';
  });
  const [forceReboot, setForceReboot] = useState<boolean>(false);

  // Sector Jump Transition State
  const [isJumping, setIsJumping] = useState<boolean>(false);
  const [jumpTarget, setJumpTarget] = useState<string>('hero');
  const [jumpMode, setJumpMode] = useState<Exclude<JumpAnimationMode, 'RANDOM'>>('WARP_SPEED');

  const handleReboot = () => {
    setForceReboot(true);
    setIsBooting(true);
  };

  const handleNavigateSection = (sectionId: string) => {
    const effectiveMode = navigationEffects.getEffectiveMode();
    setJumpMode(effectiveMode);
    setJumpTarget(sectionId);
    setIsJumping(true);

    retroAudio.playTerminalBeep(1100, 0.05);

    let el = document.getElementById(sectionId);
    if (!el && sectionId === 'projects') el = document.getElementById('dossiers');
    if (!el && sectionId === 'dossiers') el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }

    setTimeout(() => {
      setIsJumping(false);
    }, 460);
  };

  return (
    <div className={`relative min-h-screen bg-[#080c14] text-slate-100 font-mono antialiased ${isCrtActive ? 'crt-scanlines' : ''}`}>
      {/* 0. Ambient Phosphor Starfield Canvas */}
      <BackgroundStarfield />

      {/* 0. Tactical Retro Vector Crosshair Cursor */}
      <RetroPhosphorCursor />

      {/* 0. Sector Jump Transition FX & Target Locked Reticle */}
      <SectorJumpOverlay
        isJumping={isJumping}
        jumpMode={jumpMode}
        targetSector={jumpTarget}
      />

      {/* 0. BIOS POST Boot Sequence Loader */}
      {isBooting && (
        <RetroBootLoader
          onComplete={() => {
            setIsBooting(false);
            setForceReboot(false);
          }}
          forceShow={forceReboot}
        />
      )}

      {/* CRT Horizontal Electron Beam Raster Sweep */}
      {isCrtActive && <div className="crt-beam-sweep" aria-hidden="true" />}

      {/* 1. Retro Terminal Navbar with Synchronized Telemetry HUD */}
      <Navbar
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenAITwin={() => setIsAITwinOpen(true)}
        onOpenSandbox={() => setIsSandboxModalOpen(true)}
        onOpenContact={() => handleNavigateSection('contact')}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenArcade={() => setIsArcadeOpen(true)}
        onNavigateSection={handleNavigateSection}
        onReboot={handleReboot}
        isCrtActive={isCrtActive}
        onToggleCrt={() => setIsCrtActive((prev) => !prev)}
        activeSection={activeSection}
        onSectorChange={setActiveSection}
      />

      {/* Main Workstation Modules */}
      <main className="relative z-10">
        {/* 2. Mainframe Hero */}
        <Hero
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onOpenAITwin={() => setIsAITwinOpen(true)}
          onOpenSandbox={() => handleNavigateSection('sandbox')}
          onNavigateSection={handleNavigateSection}
        />

        {/* 3. Declassified Project Dossiers */}
        <Projects />

        {/* 4. Interactive Cloud Architecture CAD Modeler (Inline) */}
        <CloudArchitectureSandbox isInline={true} />

        {/* 5. Silicon Chipset Pinouts & Stack */}
        <Skills />

        {/* 6. Crypto-Verified AWS Certifications */}
        <Certifications onOpenQuiz={() => setIsQuizOpen(true)} />

        {/* 7. Open Source Phosphor Telemetry */}
        <GitHubActivity />

        {/* 8. Operator Biography */}
        <About />

        {/* 9. Sub-Space Transmission Console */}
        <ContactSection />
      </main>

      {/* 10. Retro Footer */}
      <Footer onOpenTerminal={() => setIsTerminalOpen(true)} />

      {/* Floating Retro Fast-Launch Drawer (Bottom-Right) */}
      <div className="fixed bottom-4 right-3 sm:right-4 z-40 flex items-center gap-1.5 sm:gap-2 p-1 sm:p-1.5 rounded bg-[#0b101c]/95 border border-slate-700 shadow-2xl backdrop-blur-md text-[11px] sm:text-xs font-mono">
        <button
          onClick={() => setIsTerminalOpen(true)}
          className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 hover:text-white transition-colors"
          title="Launch Interactive Terminal CLI"
        >
          <Terminal className="w-3.5 h-3.5" />
          <span className="hidden xs:inline">[ $ CLI ]</span>
          <span className="xs:hidden">CLI</span>
        </button>

        <button
          onClick={() => setIsAITwinOpen(true)}
          className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded bg-purple-950/80 border border-purple-500/40 text-purple-300 hover:text-white transition-colors"
          title="Ask Bedrock AI Twin"
        >
          <Bot className="w-3.5 h-3.5" />
          <span className="hidden xs:inline">[ AI TWIN ]</span>
          <span className="xs:hidden">AI</span>
        </button>

        <button
          onClick={() => setIsArcadeOpen(true)}
          className="hidden min-[480px]:flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded bg-amber-950/80 border border-amber-500/40 text-amber-300 hover:text-white transition-colors"
          title="Launch CYBER-RUNNER 1984 2D Arcade ROM"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>[ 🕹️ ARCADE ]</span>
        </button>

        <button
          onClick={() => setIsCommandPaletteOpen(true)}
          className="px-2 py-1.5 rounded bg-slate-900 border border-slate-700 text-slate-400 hover:text-white transition-colors text-[10px] sm:text-xs"
          title="Command Palette (Ctrl+K)"
        >
          ⌘K
        </button>
      </div>

      {/* Floating Tactical Booster (Scroll-to-Top) */}
      <ScrollToTopBooster />

      {/* Superpower Modals */}
      <InteractiveTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onOpenArcade={() => setIsArcadeOpen(true)}
        onReboot={handleReboot}
      />

      <AITwinModal
        isOpen={isAITwinOpen}
        onClose={() => setIsAITwinOpen(false)}
      />

      <CloudArchitectureSandbox
        isOpen={isSandboxModalOpen}
        onClose={() => setIsSandboxModalOpen(false)}
      />

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenSandbox={() => setIsSandboxModalOpen(true)}
        onOpenAiTwin={() => setIsAITwinOpen(true)}
        onOpenContact={() => handleNavigateSection('contact')}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenArcade={() => setIsArcadeOpen(true)}
        onReboot={handleReboot}
        onNavigateSection={handleNavigateSection}
      />

      <CertificationQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
      />

      <RetroArcadeModal
        isOpen={isArcadeOpen}
        onClose={() => setIsArcadeOpen(false)}
      />
    </div>
  );
};

export default App;
