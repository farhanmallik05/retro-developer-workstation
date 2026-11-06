import React from 'react';
import { Calendar, FileDown, Mail, ArrowUpRight, CheckCircle2, ShieldCheck, Terminal, Sparkles, Cpu, Award, Globe } from 'lucide-react';
import { retroAudio } from '../utils/retroAudio';

interface ExecutiveHeaderBannerProps {
  onOpenBooking: () => void;
  onOpenContact: () => void;
  onSwitchToRetro: () => void;
  onOpenTerminal: () => void;
}

export const ExecutiveHeaderBanner: React.FC<ExecutiveHeaderBannerProps> = ({
  onOpenBooking,
  onOpenContact,
  onSwitchToRetro,
  onOpenTerminal,
}) => {
  return (
    <section className="relative z-20 w-full bg-gradient-to-b from-slate-900 via-[#0b101c] to-[#080c14] border-b border-slate-800 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Status & Persona Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>EXECUTIVE BRIEFING // HIRING MANAGER VIEW</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                retroAudio.playBootChime();
                onSwitchToRetro();
              }}
              className="flex items-center gap-1.5 px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-300 text-xs font-mono transition-colors shadow-sm"
              title="Switch back to 1984 Cyberpunk CRT Workstation"
            >
              <span>🕹️</span>
              <span>SWITCH TO RETRO CRT</span>
            </button>

            <button
              onClick={onOpenTerminal}
              className="flex items-center gap-1 px-3 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-emerald-500/30 text-emerald-400 text-xs font-mono transition-colors"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>TERMINAL CLI</span>
            </button>
          </div>
        </div>

        {/* Hero Identity Pitch */}
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-sans">
            Farhan Mallik
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 font-sans max-w-3xl leading-relaxed">
            <span className="text-emerald-400 font-semibold">AI Engineer &amp; Full-Stack Systems Architect.</span>{' '}
            B.Tech Computer Science &apos;28 at KCC ITM. Specializing in autonomous multi-agent systems,
            distributed AWS cloud infrastructure, and ultra-high-performance web interfaces.
          </p>
        </div>

        {/* Bento Stat Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 font-sans">
          <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-colors">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">150K+</div>
            <div className="text-xs font-medium text-slate-400 mt-1">RERA Units Indexed</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Ghar Search (Agentic AI)</div>
          </div>

          <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-colors">
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400">28s</div>
            <div className="text-xs font-medium text-slate-400 mt-1">Mean Time to Detect (MTTD)</div>
            <div className="text-[11px] text-slate-500 mt-0.5">CloudOps Swarm (4-Agent SRE)</div>
          </div>

          <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 transition-colors">
            <div className="text-2xl sm:text-3xl font-extrabold text-purple-400">Campus Lead</div>
            <div className="text-xs font-medium text-slate-400 mt-1">Open Source Connect Global</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Leadership &amp; Community 2026</div>
          </div>

          <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 transition-colors">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">Top 1%</div>
            <div className="text-xs font-medium text-slate-400 mt-1">Open Source Contributor</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Kestra &amp; SlothOps (Apertre 3.0)</div>
          </div>
        </div>

        {/* Executive Action Hub */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={() => {
              retroAudio.playTerminalBeep(1100, 0.08);
              onOpenBooking();
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-sans font-bold text-sm shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-all transform hover:-translate-y-0.5"
          >
            <Calendar className="w-4 h-4" />
            <span>Schedule Interview (15-30 Min)</span>
          </button>

          <a
            href="https://drive.google.com/file/d/1BfE49V28Jz9W9N77s7B4r1Kq4Z4Z4Z4Z/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => retroAudio.playKeyClick()}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-sans font-semibold text-sm transition-colors"
          >
            <FileDown className="w-4 h-4 text-cyan-400" />
            <span>View Full Resume (PDF)</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
          </a>

          <button
            onClick={() => {
              retroAudio.playKeyClick();
              onOpenContact();
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 font-sans font-semibold text-sm transition-colors"
          >
            <Mail className="w-4 h-4 text-purple-400" />
            <span>Direct Message</span>
          </button>
        </div>
      </div>
    </section>
  );
};

