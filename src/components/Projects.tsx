import React, { useState } from 'react';
import { ExternalLink, Github, Terminal, ArrowUpRight, Cpu, Zap, Shield, Layers, FileCode2 } from 'lucide-react';
import { RetroReveal } from './RetroReveal';
import { RetroDecoderText } from './RetroDecoderText';

interface ProjectDossier {
  id: string;
  code: string;
  title: string;
  category: string;
  stack: string[];
  description: string;
  telemetry: { label: string; value: string; color: string }[];
  repoUrl: string;
  liveUrl?: string;
  status: string;
}

export const Projects: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'ai' | 'cloud' | 'geospatial'>('all');

  const dossiers: ProjectDossier[] = [
    {
      id: 'ghar-search',
      code: 'DOSSIER_01 // AGENTIC_PROPERTY_DILIGENCE',
      title: 'Ghar Search: Agentic Property Due-Diligence Platform',
      category: 'Parallel Multi-Agent Verification Platform',
      stack: ['Next.js 14', 'LangGraph (0.2)', 'TinyFish Web Agents', 'FastAPI', 'Docker Compose', 'Pytest', 'Tailwind CSS'],
      description:
        'Architected an agentic property due-diligence platform that converts Indian real-estate listings into structured evidence dossiers in under 90 seconds. Runs 6 parallel LangGraph workers across 1.5L+ RERA records, eCourts/NCLT insolvency signals, statutory approvals, and promoter track records to generate a deterministic 0–100 Trust Score.',
      telemetry: [
        { label: 'RERA_RECORDS', value: '1.5L+ Records Queried', color: 'text-cyan-400' },
        { label: 'AI_WORKERS', value: '6 Parallel LangGraph Agents', color: 'text-purple-400' },
        { label: 'TEST_SUITE', value: '140 Automated Tests (100% Pass)', color: 'text-emerald-400' },
        { label: 'SPEED', value: '<90s Dossier Turnaround', color: 'text-amber-400' },
      ],
      repoUrl: 'https://github.com/farhanmallik05/ghar-search',
      status: 'VERIFIED // PRODUCTION_READY',
    },
    {
      id: 'cloudops-swarm',
      code: 'DOSSIER_02 // MULTI_AGENT_AI_SRE',
      title: 'CloudOps Swarm: Autonomous AWS Incident Triaging & Self-Healing',
      category: 'Autonomous Multi-Agent AI Reliability',
      stack: ['Strands Agents SDK', 'Amazon Bedrock (Claude 3.5 Sonnet & Haiku)', 'CloudWatch Insights', 'Docker', 'Python'],
      description:
        'Autonomous multi-agent SRE swarm designed to triage AWS cloud incidents in under 30 seconds. Four specialized agents (Triage, Log Diagnostics, Code Diff Analysis, Remediation Synthesizer) collaborate via Strands SDK to pinpoint root causes, simulate safety blast-radii, and generate safety-verified recovery pull requests.',
      telemetry: [
        { label: 'BENCHMARK_MTTD', value: '28 Seconds (vs 45min)', color: 'text-emerald-400' },
        { label: 'ACCURACY', value: '100% (5/5 Archetypes)', color: 'text-cyan-400' },
        { label: 'SWARM_AGENTS', value: '4 Autonomous Roles', color: 'text-purple-400' },
        { label: 'FINOPS_COST', value: '$0.01095 USD / Incident', color: 'text-amber-400' },
      ],
      repoUrl: 'https://github.com/farhanmallik05/cloudops-incident-swarm',
      liveUrl: 'https://farhanmallik05.github.io/cloudops-incident-swarm/',
      status: 'VERIFIED // BENCHMARK_PASSED',
    },
    {
      id: 'forkfix-specterlens',
      code: 'DOSSIER_03 // AUTONOMOUS_DEBUGGING_AGENTS',
      title: 'ForkFix & SpecterLens: Autonomous AI Debugging Agents',
      category: 'Deterministic AI Coding & Multimodal Archeology',
      stack: ['Python', 'Google Gemma 4', 'NVIDIA Nemotron', 'Nebius', 'Tavily', 'Autonomous AI Agents'],
      description:
        'Built an autonomous coding agent (ForkFix) that snapshots failing test suites, spawns 4 parallel sandboxed execution realities on an NVIDIA Nemotron model ladder, and proves code fixes against deterministic test oracles. Paired with SpecterLens, a visual-to-patch diagnostic agent powered by Google Gemma 4 that inspects UI states.',
      telemetry: [
        { label: 'EXECUTION_MODELS', value: 'NVIDIA Nemotron + Gemma 4', color: 'text-cyan-400' },
        { label: 'PARALLEL_REALITIES', value: '4 Sandboxed Reality Forks', color: 'text-purple-400' },
        { label: 'DIAGNOSTIC_TYPE', value: 'Visual-to-Patch Archeology', color: 'text-emerald-400' },
        { label: 'VERIFICATION', value: 'Deterministic Test Oracles', color: 'text-amber-400' },
      ],
      repoUrl: 'https://github.com/farhanmallik05/forkfix',
      status: 'VERIFIED // RESEARCH_PROTOTYPE',
    },
    {
      id: 'ecoroute',
      code: 'DOSSIER_04 // GEOSPATIAL_CLOUD_CORE',
      title: 'EcoRoute: Clean Energy & EV Grid Navigator',
      category: 'Geospatial Cloud Architecture & Navigation',
      stack: ['Amazon Location Service', 'MapLibre GL', 'Cognito Identity Pools', 'Turf.js', 'Vite', 'TypeScript'],
      description:
        'High-performance geospatial engine that ingests 45,000+ alternative fueling stations across North America. Calculates real-time EV corridor routes, simulates cold-weather battery temperature degradation, and computes corridor buffer zones using Turf.js with sub-second vector tiles.',
      telemetry: [
        { label: 'DATA_POINTS', value: '45,000+ Fuel Stations', color: 'text-cyan-400' },
        { label: 'TILE_LATENCY', value: '<45ms (P99 Cached)', color: 'text-emerald-400' },
        { label: 'CO2_OFFSET', value: '0.41 kg/mi Tracked', color: 'text-amber-400' },
        { label: 'DEPLOYMENT', value: 'AWS Amplify + Amazon Trust SSL', color: 'text-purple-400' },
      ],
      repoUrl: 'https://github.com/farhanmallik05/ecoroute-ev-map',
      liveUrl: 'https://main.d2xgltmuyxryz1.amplifyapp.com',
      status: 'VERIFIED // PRODUCTION_DEPLOYED',
    },
    {
      id: 'cyberfolio',
      code: 'DOSSIER_05 // INTERACTIVE_WORKSTATION',
      title: 'Cyberfolio: Retro Developer Workstation & Systems CAD',
      category: 'Frontend Craft & High-Density UI/UX',
      stack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'AWS CDK Generator', 'Bedrock Claude 3.5 AI Twin'],
      description:
        'High-craft developer workstation fusing authentic CRT scanlines, an interactive UNIX CLI shell, in-browser Cloud Architecture CAD modeler with live AWS CDK v2 synthesis, and Bedrock AI Twin. Built with 100% test coverage and zero layout shift.',
      telemetry: [
        { label: 'TEST_COVERAGE', value: '6/6 Passed (100%)', color: 'text-emerald-400' },
        { label: 'PERFORMANCE', value: '0.000 CLS / <3s Build', color: 'text-cyan-400' },
        { label: 'HOSTING', value: 'Enforced HTTPS Edge CDN', color: 'text-amber-400' },
        { label: 'SUPERPOWERS', value: 'Terminal CLI + Cloud CAD', color: 'text-purple-400' },
      ],
      repoUrl: 'https://github.com/farhanmallik05/retro-developer-workstation',
      liveUrl: 'https://farhanmallik05.github.io/retro-developer-workstation/',
      status: 'VERIFIED // HACKATHON_NOMINEE',
    },
    {
      id: 'slothops-kestra',
      code: 'DOSSIER_06 // OPEN_SOURCE_CONTRIBUTIONS',
      title: 'SlothOps & Kestra Open-Source Contributions',
      category: 'Open Source Community & Cognitive Conservation',
      stack: ['Vue.js', 'TypeScript', 'Scoped SCSS (--ks-*)', 'Google Gemma 2', 'TabPFN', 'Docker'],
      description:
        'Active open-source engineering contributions across Apertre 3.0, Hacktoberfest, and Open Source Connect Global (Campus Lead 2026). Migrated Kestra core Vue/TypeScript components to scoped SCSS design-system tokens and built SlothOps, an open-weight Gemma 2 + TabPFN agent.',
      telemetry: [
        { label: 'LEADERSHIP', value: 'Campus Lead 2026 (OSCG)', color: 'text-amber-400' },
        { label: 'COMMUNITY', value: 'Hacktoberfest 2025 & 2026', color: 'text-cyan-400' },
        { label: 'KESTRA_CONTRIB', value: 'Scoped SCSS Design Tokens', color: 'text-emerald-400' },
        { label: 'SLOTHOPS', value: 'Gemma 2 + TabPFN Agent', color: 'text-purple-400' },
      ],
      repoUrl: 'https://github.com/farhanmallik05/slothops',
      status: 'VERIFIED // OPEN_SOURCE_LEAD',
    },
  ];

  return (
    <section id="dossiers" className="py-16 sm:py-24 border-b border-slate-800 bg-[#080c14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <RetroReveal animation="fade-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-slate-800 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <span className="w-2 h-2 bg-emerald-500 rounded-none inline-block animate-phosphor-pulse"></span>
                <RetroDecoderText text="SECTION_02 // DECLASSIFIED_PROJECT_DOSSIERS" />
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight mt-1">
                Engineered Systems &amp; Case Studies
              </h2>
              <p className="text-slate-400 text-sm font-mono mt-2 max-w-2xl">
                Production architectures, measured telemetry envelopes, and reproducible open-source codebases.
              </p>
            </div>
            <div className="text-xs font-mono text-slate-500">
              TOTAL_DOSSIERS: [ 06 ] // CLASSIFICATION: PUBLIC
            </div>
          </div>
        </RetroReveal>

        {/* Dossiers Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mt-10">
          {dossiers.map((p, idx) => (
            <RetroReveal key={p.id} animation="fade-up" delay={idx * 80} className="h-full">
              <div
                className="flex flex-col justify-between h-full p-6 sm:p-8 rounded-lg bg-[#0b101c] border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 shadow-xl group glitch-hover"
              >
                <div>
                  {/* Dossier Code & Status Banner */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 text-[11px] font-mono">
                    <span className="text-emerald-400 font-bold">{p.code}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 font-bold">
                      {p.status}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-white mt-4 group-hover:text-emerald-300 transition-colors">
                    {p.title}
                  </h3>

                  {/* Category */}
                  <p className="text-xs font-mono text-cyan-400 mt-1 uppercase tracking-wider">
                    &gt; {p.category}
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed font-mono">
                    {p.description}
                  </p>

                  {/* Telemetry Matrix (4 Columns/Pills) */}
                  <div className="grid grid-cols-2 gap-2 mt-5 p-3 rounded bg-[#070b14] border border-slate-800/80 font-mono text-xs">
                    {p.telemetry.map((t, tidx) => (
                      <div key={tidx} className="p-1.5">
                        <span className="block text-[10px] text-slate-500 uppercase">{t.label}</span>
                        <span className={`font-bold ${t.color}`}>{t.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {p.stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between font-mono text-xs">
                  <a
                    href={p.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
                  >
                    <Github className="w-4 h-4 text-emerald-400" />
                    <span>[ REPOSITORY ]</span>
                  </a>

                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 hover:underline font-bold"
                    >
                      <span>[ EXECUTE_LIVE ]</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </RetroReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
