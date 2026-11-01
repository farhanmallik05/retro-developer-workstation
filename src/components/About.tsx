import React from 'react';
import { Terminal, ShieldCheck, MapPin, Award, BookOpen, ExternalLink, Cpu, Layers } from 'lucide-react';

export const About: React.FC = () => {
  const chapters = [
    {
      step: '01',
      title: 'FOUNDATIONS_&_KERNEL_ORIGINS',
      period: '2022 – 2023',
      description:
        'Commenced technical immersion in Computer Science and Information Technology. Mastered memory layouts, algorithmic time/space complexities, Linux systems administration, and low-level socket networking.',
      tags: ['C/C++', 'Data Structures', 'Linux Internals', 'Networking'],
    },
    {
      step: '02',
      title: 'FULL_STACK_SYSTEMS_CRAFT',
      period: '2023 – 2024',
      description:
        'Engineered responsive, tactile web interfaces with TypeScript, React, and Vite. Designed deterministic state containers, custom design systems, and resilient REST/WebSocket APIs with sub-50ms round-trips.',
      tags: ['TypeScript', 'React / Vite', 'REST & WebSockets', 'PostgreSQL'],
    },
    {
      step: '03',
      title: 'AWS_CLOUD_CERTIFICATIONS_&_SRE',
      period: '2024 – 2025',
      description:
        'Earned official AWS proctored certifications: Solutions Architect Associate (SAA-C03: 890/1000) and Cloud Practitioner (CLF-C02: 920/1000). Built serverless architectures with Lambda, DynamoDB single-table designs, and SQS Dead Letter Queues.',
      tags: ['AWS SAA-C03', 'AWS CLF-C02', 'Lambda Serverless', 'DynamoDB'],
    },
    {
      step: '04',
      title: 'AUTONOMOUS_AI_SWARMS_&_GEOSPATIAL',
      period: '2025 – PRESENT',
      description:
        'Pioneering autonomous multi-agent incident triaging swarms with the Strands Agents SDK and Amazon Bedrock (Claude 3.5 Sonnet). Architected EcoRoute on Amazon Location Service, processing 45,000+ alternative fueling stations for clean energy navigation.',
      tags: ['Strands Agents SDK', 'Amazon Bedrock', 'Location Service', 'Multi-Agent SRE'],
    },
  ];

  return (
    <section id="about" className="py-16 sm:py-24 border-b border-slate-800 bg-[#080c14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-slate-800 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 bg-emerald-500 rounded-none inline-block"></span>
              <span>SECTION_06 // OPERATOR_DOSSIER // FARHAN_MALLIK</span>
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

        <div className="grid lg:grid-cols-12 gap-10 mt-10">
          {/* Left Column: Verified Identity Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-lg bg-[#0b101c] border border-slate-800 font-mono text-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-emerald-400 font-bold">&gt; OPERATOR_PROFILE</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
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
                  <span className="font-semibold text-white">B.Tech CS (IT Spec)</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/60 pb-1.5">
                  <span className="text-slate-500">LOCATION:</span>
                  <span className="font-semibold text-white">Delhi NCR (201310)</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/60 pb-1.5">
                  <span className="text-slate-500">AWS_SAA:</span>
                  <span className="font-semibold text-emerald-400">Score 890 / 1000</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/60 pb-1.5">
                  <span className="text-slate-500">AWS_CLF:</span>
                  <span className="font-semibold text-cyan-400">Score 920 / 1000</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/60 pb-1.5">
                  <span className="text-slate-500">DUAL_HACK:</span>
                  <span className="font-semibold text-amber-400">AWS + Skillinf '26</span>
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
          </div>

          {/* Right Column: 4-Phase Chronological Log */}
          <div className="lg:col-span-8 space-y-4 font-mono">
            {chapters.map((c) => (
              <div
                key={c.step}
                className="p-6 rounded-lg bg-[#0b101c] border border-slate-800 hover:border-emerald-500/40 transition-all duration-200"
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
