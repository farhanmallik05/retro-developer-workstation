import React, { useState, useEffect } from 'react';
import { Terminal, Cpu, Database, Cloud, ShieldCheck, Zap, ArrowRight, Play, CornerDownLeft } from 'lucide-react';

interface HeroProps {
  onOpenTerminal: () => void;
  onOpenAITwin?: () => void;
  onOpenSandbox?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenTerminal,
  onOpenAITwin,
  onOpenSandbox,
}) => {
  const [typedText, setTypedText] = useState('');
  const fullCommand = 'strands-agent-swarm --init --bedrock --aws-region us-east-1';

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(fullCommand.slice(0, index));
      index++;
      if (index > fullCommand.length) {
        clearInterval(interval);
      }
    }, 45);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center py-12 sm:py-20 border-b border-slate-800 bg-[#080c14] retro-dot-grid"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#0d121f] border border-slate-800 rounded-t-lg text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-phosphor-pulse"></span>
            <span className="ml-2 font-mono text-slate-300 font-bold">farhan@mainframe:~/portfolio</span>
          </div>
          <div className="hidden sm:flex items-center gap-3 font-mono text-[10px] text-emerald-400">
            <span className="animate-phosphor-pulse font-bold">UPTIME: 99.98%</span>
            <span>MEMORY: 128MB</span>
            <span className="text-amber-400 animate-amber-pulse font-bold">DUAL_FINALIST: YES</span>
          </div>
        </div>

        {/* Chassis Inner Frame */}
        <div className="p-6 sm:p-10 bg-[#0a0f1d]/95 border-x border-b border-slate-800 rounded-b-lg shadow-2xl">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Terminal Prompt & Bio */}
            <div className="lg:col-span-7 space-y-6">
              {/* ASCII Banner */}
              <pre className="hidden sm:block text-[10px] sm:text-[11px] leading-tight text-emerald-400/90 font-mono select-none overflow-x-hidden">
{`███████╗ █████╗ ██████╗ ██╗  ██╗ █████╗ ███╗   ██╗
██╔════╝██╔══██╗██╔══██╗██║  ██║██╔══██╗████╗  ██║
█████╗  ███████║██████╔╝███████║███████║██╔██╗ ██║
██╔══╝  ██╔══██║██╔══██╗██╔══██║██╔══██║██║╚██╗██║
██║     ██║  ██║██║  ██║██║  ██║██║  ██║██║ ╚████║
╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝`}
              </pre>

              {/* Badges / Specifications */}
              <div className="flex flex-wrap gap-2 text-[10px] font-mono">
                <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 font-bold">
                  [ KERNEL: AI &amp; FRONTEND ENGINEER ]
                </span>
                <span className="px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/50 text-cyan-300 font-bold">
                  [ SPEC: B.TECH CSE (IT) // 2024–2028 ]
                </span>
                <span className="px-2 py-0.5 rounded bg-amber-950/80 border border-amber-500/50 text-amber-300 font-bold">
                  [ STATION: GREATER NOIDA // 201310 ]
                </span>
                <span className="px-2 py-0.5 rounded bg-purple-950/80 border border-purple-500/50 text-purple-300 font-bold">
                  [ CAMPUS LEAD 2026 // 2X HACKATHON FINALIST // OPEN SOURCE CONTRIBUTOR ]
                </span>
              </div>

              {/* Main Headline */}
              <div className="space-y-2">
                <p className="text-xs font-mono text-emerald-400">
                  &gt; identity --display-summary
                </p>
                <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                  Architecting Multi-Agent AI Workflows, High-Craft Frontends &amp; Cloud Delivery.
                </h1>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-mono pt-2">
                  Specializing in autonomous multi-agent LLM systems with LangGraph, Google Gemma 4, NVIDIA Nemotron, and Ollama alongside responsive Next.js 14, TypeScript, Tailwind CSS, and Framer Motion frontends. Two-time Hackathon Finalist and Open Source Campus Lead 2026.
                </p>
              </div>

              {/* Retro Keycap Action Grid */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={onOpenTerminal}
                  className="flex items-center gap-2 px-5 py-3 rounded bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] active:scale-95"
                >
                  <Terminal className="w-4 h-4" />
                  <span>$ ./launch_cli.sh</span>
                </button>

                {onOpenSandbox && (
                  <button
                    onClick={onOpenSandbox}
                    className="flex items-center gap-2 px-5 py-3 rounded bg-slate-900 border border-cyan-500/50 hover:border-cyan-400 text-cyan-300 hover:text-white font-bold text-xs tracking-wider uppercase transition-all active:scale-95"
                  >
                    <Cloud className="w-4 h-4 text-cyan-400" />
                    <span>$ ./open_sandbox.bin</span>
                  </button>
                )}

                <button
                  onClick={() => scrollTo('dossiers')}
                  className="flex items-center gap-1.5 px-4 py-3 rounded bg-slate-900/80 border border-slate-700 hover:border-slate-500 text-slate-300 text-xs font-semibold hover:text-white transition-colors"
                >
                  <span>[ VIEW_DOSSIERS ]</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>

              {/* Hardware Telemetry Bar */}
              <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                <div>
                  <span className="block text-slate-500 text-[10px]">LEADERSHIP</span>
                  <span className="font-bold text-amber-400">Campus Lead '26</span>
                </div>
                <div>
                  <span className="block text-slate-500 text-[10px]">HACKATHONS</span>
                  <span className="font-bold text-emerald-400">2x Finalist</span>
                </div>
                <div>
                  <span className="block text-slate-500 text-[10px]">OPEN_SOURCE</span>
                  <span className="font-bold text-cyan-400">Kestra &amp; Apertre</span>
                </div>
                <div>
                  <span className="block text-slate-500 text-[10px]">AI_TEST_SUITE</span>
                  <span className="font-bold text-purple-400">140+ Tests Passing</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive CRT Mainframe Monitor */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-xl bg-[#050811] border-2 border-slate-700 shadow-[0_0_40px_rgba(0,0,0,0.8)] overflow-hidden font-mono text-xs">
                {/* CRT Screen Bezel Top */}
                <div className="px-4 py-2 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <div className="flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span className="font-bold text-slate-200">CRT_MONITOR // DIAGNOSTIC_BUS</span>
                  </div>
                  <span className="text-emerald-400 text-[10px] animate-pulse">● LIVE</span>
                </div>

                {/* CRT Terminal Screen Output */}
                <div className="p-4 space-y-3 bg-[#03060c] text-slate-300 min-h-[360px] flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="text-emerald-400 text-[11px]">
                      <span>root@aws-node-us-east-1:~$ </span>
                      <span className="text-white font-bold">{typedText}</span>
                      <span className="animate-cursor-blink text-emerald-400">█</span>
                    </div>

                    <div className="p-2.5 rounded bg-slate-950/90 border border-slate-800/80 space-y-1.5 text-[11px]">
                      <p className="text-amber-400 font-bold">[+] GHAR SEARCH: AGENTIC DUE-DILIGENCE</p>
                      <p className="text-slate-400">• Engine: LangGraph (0.2) + TinyFish Web Agents</p>
                      <p className="text-slate-400">• Verification: 6 Parallel Workers across 1.5L+ RERA Records</p>
                      <p className="text-emerald-400 font-bold">• Deterministic Trust Score: 0–100 in &lt;90s (140 Tests)</p>
                    </div>

                    <div className="p-2.5 rounded bg-slate-950/90 border border-slate-800/80 space-y-1.5 text-[11px]">
                      <p className="text-purple-400 font-bold">[+] CLOUDOPS AUTONOMOUS SWARM READY</p>
                      <p className="text-slate-400">• Engine: Strands SDK + Bedrock (Claude 3.5 Sonnet)</p>
                      <p className="text-slate-400">• Active Agents: Triage, LogDiagnostic, DiffAnalyzer, Fixer</p>
                      <p className="text-emerald-400 font-bold">• Accuracy: 5/5 Benchmark Scenarios PASSED (28s MTTD)</p>
                    </div>
                  </div>

                  {/* Interactive Quick Run Ribbon inside CRT */}
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-2 text-slate-400">
                      <span>Status:</span>
                      <span className="text-emerald-400 font-bold">ALL_SERVICES_NOMINAL</span>
                    </div>
                    {onOpenAITwin && (
                      <button
                        onClick={onOpenAITwin}
                        className="px-2.5 py-1 rounded bg-indigo-950/60 border border-indigo-500/40 text-indigo-300 hover:text-white transition-colors"
                      >
                        [ Query AI Twin ]
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="mt-3 flex items-center justify-between px-3 py-1.5 rounded bg-[#0a0f1d] border border-slate-800 text-[10px] text-slate-400 font-mono">
                <span>PORTFOLIO_RELEASE: v2.6.4</span>
                <span className="text-emerald-400">SECURE_SIGV4: TRUE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
