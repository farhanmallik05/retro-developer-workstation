import React from 'react';
import { Terminal, ShieldCheck, MapPin, Award, BookOpen, ExternalLink, Cpu, Layers } from 'lucide-react';
import { RetroReveal } from './RetroReveal';
import { RetroDecoderText } from './RetroDecoderText';
import { GsapOperatorManifesto } from './GsapOperatorManifesto';

export const About: React.FC = () => {
  const chapters = [
    {
      step: '01',
      title: 'FOUNDATIONS_&_COMPUTER_SCIENCE',
      period: '2021 – 2024',
      description:
        'Completed Class 10th (2021) and Class 12th PCM (2023) at D.A.V. Centenary Public School, Rohtak, before entering B.Tech in CSE & IT (2024–2028) at KCC Institute of Technology and Management, Greater Noida. Mastered C/C++, Data Structures & Algorithms, Linux internals, and web fundamentals.',
      tags: ['C/C++', 'DSA Fundamentals', 'Linux Internals', 'KCC ITM'],
    },
    {
      step: '02',
      title: 'FULL_STACK_&_HIGH_CRAFT_FRONTENDS',
      period: '2024 – 2025',
      description:
        'Engineered responsive, tactile web interfaces with Next.js 14 (App Router), React, TypeScript, Tailwind CSS, and Framer Motion. Focused on micro-interactions, scoped design tokens, and containerized runtime deployments with Docker and automated CI validation.',
      tags: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    },
    {
      step: '03',
      title: 'OPEN_SOURCE_LEADERSHIP_&_COMMUNITY',
      period: '2025 – 2026',
      description:
        'Appointed Campus Lead 2026 at Open Source Connect Global, mentoring student developers and resolving frontend issues. Contributed to Kestra (scoped SCSS design token migration), participated in Apertre 3.0 and Hacktoberfest 2025/2026, and architected SlothOps (open-weight Gemma 2 + TabPFN agent).',
      tags: ['Campus Lead 2026', 'Kestra Contributor', 'Hacktoberfest', 'SlothOps'],
    },
    {
      step: '04',
      title: 'AGENTIC_AI_PLATFORMS_&_MULTI_AGENT_SWARMS',
      period: '2026 – PRESENT',
      description:
        'Pioneered parallel multi-agent platforms: Ghar Search (LangGraph 6-agent due-diligence verifying 1.5L+ RERA records in <90s across 140 automated tests), ForkFix (parallel sandboxed reality debugging with NVIDIA Nemotron), and CloudOps Swarm (Strands SDK + Bedrock SRE self-healing).',
      tags: ['LangGraph', 'NVIDIA Nemotron', 'TinyFish Agents', 'Gemma 4'],
    },
  ];

  return (
    <section id="about" className="py-16 sm:py-24 border-b border-slate-800 bg-[#080c14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <RetroReveal animation="fade-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-slate-800 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <span className="w-2 h-2 bg-emerald-500 rounded-none inline-block animate-phosphor-pulse"></span>
                <RetroDecoderText text="SECTION_06 // OPERATOR_DOSSIER // FARHAN_MALLIK" />
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight mt-1">
                The Systems Builder Biography
              </h2>
              <p className="text-slate-400 text-sm font-mono mt-2 max-w-2xl">
                Chronological engineering logs tracking the progression from foundational systems programming to autonomous cloud AI swarms.
              </p>
            </div>
            <div className="text-xs font-mono text-slate-500">
              STATUS: ACTIVE // DEPLOYED
            </div>
          </div>
        </RetroReveal>

        {/* GSAP Phosphor Kinetic Scrubbing Manifesto */}
        <GsapOperatorManifesto />

        <div className="grid lg:grid-cols-12 gap-10 mt-10">
          {/* Left Column: Verified Identity Card */}
          <div className="lg:col-span-4 space-y-6">
            <RetroReveal animation="slide-left">
              <div className="p-6 rounded-lg bg-[#0b101c] border border-slate-800 font-mono text-xs space-y-4 glitch-hover">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-emerald-400 font-bold">&gt; OPERATOR_PROFILE</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-phosphor-pulse" />
                </div>

                {/* Avatar ASCII Box */}
                <div className="p-4 rounded bg-[#070b14] border border-slate-800 text-center space-y-2">
                  <div className="w-20 h-20 mx-auto rounded bg-emerald-950/60 border-2 border-emerald-500/50 flex items-center justify-center text-emerald-400 font-bold text-2xl shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                    FM
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">FARHAN MALLIK</h3>
                    <p className="text-[11px] text-slate-400">Full-Stack &amp; AI-Native Systems Architect</p>
                  </div>
                </div>

                {/* Metadata rows */}
                <div className="space-y-2 pt-2 text-slate-300">
                  <div className="flex justify-between border-b border-slate-800/60 pb-1.5">
                    <span className="text-slate-500">DEGREE:</span>
                    <span className="font-semibold text-white">B.Tech CSE &amp; IT ('28)</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/60 pb-1.5">
                    <span className="text-slate-500">INSTITUTE:</span>
                    <span className="font-semibold text-white">KCC ITM, Greater Noida</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/60 pb-1.5">
                    <span className="text-slate-500">LEADERSHIP:</span>
                    <span className="font-semibold text-amber-400">Campus Lead '26 (OSCG)</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/60 pb-1.5">
                    <span className="text-slate-500">HONORS:</span>
                    <span className="font-semibold text-emerald-400">2x Hackathon Finalist</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/60 pb-1.5">
                    <span className="text-slate-500">OPEN_SOURCE:</span>
                    <span className="font-semibold text-cyan-400">Kestra &amp; Apertre 3.0</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/60 pb-1.5">
                    <span className="text-slate-500">LOCATION:</span>
                    <span className="font-semibold text-white">Greater Noida, India</span>
                  </div>
                </div>

                {/* Direct Links */}
                <div className="pt-2 space-y-2">
                  <a
                    href="https://farhanmallik.netlify.app"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
                  >
                    <span>[ LIVE_PORTFOLIO ]</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href="https://beacons.ai/farhanmallik"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
                  >
                    <span>[ BEACONS_HUB ]</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </RetroReveal>
          </div>

          {/* Right Column: 4-Phase Chronological Log */}
          <div className="lg:col-span-8 space-y-4 font-mono">
            {chapters.map((c, idx) => (
              <RetroReveal key={c.step} animation="slide-right" delay={idx * 80}>
                <div
                  className="p-6 rounded-lg bg-[#0b101c] border border-slate-800 hover:border-emerald-500/40 transition-all duration-200 glitch-hover"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-slate-800 text-xs">
                    <span className="text-emerald-400 font-bold">
                      [{c.step}] // {c.title}
                    </span>
                    <span className="text-slate-500 mt-1 sm:mt-0">{c.period}</span>
                  </div>

                  <p className="text-slate-300 text-xs sm:text-sm mt-3 leading-relaxed">
                    {c.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {c.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded bg-[#070b14] border border-slate-800 text-slate-400 text-[10px]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </RetroReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
