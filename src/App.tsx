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
import { ScrollTelemetryHud } from './components/ScrollTelemetryHud';
import { ScrollToTopBooster } from './components/ScrollToTopBooster';
import { Terminal, Cpu, Cloud, Bot, Sparkles } from 'lucide-react';

export const App: React.FC = () => {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isAITwinOpen, setIsAITwinOpen] = useState(false);
  const [isSandboxModalOpen, setIsSandboxModalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isCrtActive, setIsCrtActive] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`relative min-h-screen bg-[#080c14] text-slate-100 font-mono antialiased ${isCrtActive ? 'crt-scanlines' : ''}`}>
      {/* CRT Horizontal Electron Beam Raster Sweep */}
      {isCrtActive && <div className="crt-beam-sweep" aria-hidden="true" />}

      {/* 1. Retro Terminal Navbar */}
      <Navbar
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenAITwin={() => setIsAITwinOpen(true)}
        onOpenSandbox={() => setIsSandboxModalOpen(true)}
        onOpenContact={() => handleNavigateSection('contact')}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        isCrtActive={isCrtActive}
        onToggleCrt={() => setIsCrtActive((prev) => !prev)}
        activeSection={activeSection}
      />

      {/* Real-Time Scroll Depth & Memory Telemetry HUD */}
      <ScrollTelemetryHud onSectorChange={setActiveSection} />

      {/* Main Workstation Modules */}
      <main className="relative z-10">
        {/* 2. Mainframe Hero */}
        <Hero
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onOpenAITwin={() => setIsAITwinOpen(true)}
          onOpenSandbox={() => handleNavigateSection('sandbox')}
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
      <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2 p-1.5 rounded bg-[#0b101c]/95 border border-slate-700 shadow-2xl backdrop-blur-md text-xs font-mono">
        <button
          onClick={() => setIsTerminalOpen(true)}
          className="flex items-center gap-1 px-3 py-1.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 hover:text-white transition-colors"
          title="Launch Interactive Terminal CLI"
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>[ $ CLI ]</span>
        </button>

        <button
          onClick={() => setIsAITwinOpen(true)}
          className="flex items-center gap-1 px-3 py-1.5 rounded bg-purple-950/80 border border-purple-500/40 text-purple-300 hover:text-white transition-colors"
          title="Ask Bedrock AI Twin"
        >
          <Bot className="w-3.5 h-3.5" />
          <span>[ AI TWIN ]</span>
        </button>

        <button
          onClick={() => setIsCommandPaletteOpen(true)}
          className="px-2 py-1.5 rounded bg-slate-900 border border-slate-700 text-slate-400 hover:text-white transition-colors"
          title="Command Palette"
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
        onNavigateSection={handleNavigateSection}
      />

      <CertificationQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
      />
    </div>
  );
};

export default App;
