import React, { useState } from 'react';
import { ExternalLink, Github, Terminal, ArrowUpRight, Cpu, Zap, Shield, Layers, FileCode2 } from 'lucide-react';

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
      id: 'ecoroute',
      code: 'DOSSIER_01 // GEOSPATIAL_CLOUD_CORE',
      title: 'EcoRoute: Clean Energy & EV Grid Navigator',
      category: 'Geospatial Cloud Architecture',
      stack: ['Amazon Location Service', 'MapLibre GL', 'Cognito Identity Pools', 'Turf.js', 'NREL Open API'],
      description:
        'High-performance geospatial engine that ingests 45,000+ alternative fueling stations across North America. Calculates real-time EV corridor routes, simulates cold-weather battery temperature degradation, and computes corridor buffer zones using Turf.js.',
      telemetry: [
        { label: 'DATA_POINTS', value: '45,000+ Fuel Stations', color: 'text-cyan-400' },
        { label: 'TILE_LATENCY', value: '<45ms (P99 Cached)', color: 'text-emerald-400' },
        { label: 'CO2_OFFSET', value: '0.41 kg/mi Tracked', color: 'text-amber-400' },
        { label: 'ENGINE', value: 'Serverless Route Calculator', color: 'text-purple-400' },
      ],
      repoUrl: 'https://github.com/farhan/ecoroute-ev-map',
      liveUrl: 'http://localhost:3000',
      status: 'VERIFIED // DUAL_SUBMISSION_READY',
    },
    {
      id: 'cloudops-swarm',
      code: 'DOSSIER_02 // MULTI_AGENT_AI_SYSTEM',
      title: 'CloudOps Swarm: Autonomous AWS Incident Triaging & Self-Healing',
      category: 'Autonomous Multi-Agent AI SRE',
      stack: ['Strands Agents SDK', 'Amazon Bedrock (Claude 3.5 Sonnet)', 'CloudWatch Insights', 'AWS Lambda', 'DynamoDB'],
      description:
        'Autonomous multi-agent SRE swarm designed to triage AWS cloud incidents in under 60 seconds. Four specialized agents (Triage, Log Diagnostics, Code Diff Analysis, Remediation Synthesizer) collaborate via Strands SDK to pinpoint root causes and generate safety-verified recovery pull requests.',
      telemetry: [
        { label: 'BENCHMARK_MTTD', value: '28 Seconds (vs 45min)', color: 'text-emerald-400' },
        { label: 'ACCURACY', value: '100% (5/5 Archetypes)', color: 'text-cyan-400' },
        { label: 'SWARM_AGENTS', value: '4 Autonomous Roles', color: 'text-purple-400' },
        { label: 'CHAOS_TESTED', value: 'Connection Pool Leaks', color: 'text-amber-400' },
      ],
      repoUrl: 'https://github.com/farhan/cloudops-strands-swarm',
      liveUrl: '#',
      status: 'VERIFIED // BENCHMARK_PASSED',
    },
    {
      id: 'serverless-resilient',
      code: 'DOSSIER_03 // FAULT_TOLERANT_SYSTEMS',
      title: 'Resilient Event-Driven Transaction Processing Hub',
      category: 'Distributed Systems Architecture',
      stack: ['AWS Lambda', 'Amazon DynamoDB', 'Amazon SQS DLQ', 'API Gateway', 'AWS CDK v2'],
      description:
        'Mission-critical financial transaction processing pipeline. Employs idempotent request deduplication, exponential backoff with full jitter, SQS Dead Letter Queues, and DynamoDB single-table design with automated circuit breakers to withstand network partitions.',
      telemetry: [
        { label: 'THROUGHPUT', value: '5,000 req/sec Sustained', color: 'text-cyan-400' },
        { label: 'LOST_TRANSACTIONS', value: '0 (Under Chaos Load)', color: 'text-emerald-400' },
        { label: 'PROVISIONING', value: '100% AWS CDK v2', color: 'text-purple-400' },
        { label: 'RTO / RPO', value: '<15s / 0s (Zero Loss)', color: 'text-amber-400' },
      ],
      repoUrl: 'https://github.com/farhan/serverless-resilient-hub',
      status: 'VERIFIED // ARCHITECTURE_CERTIFIED',
    },
    {
      id: 'retro-portfolio',
      code: 'DOSSIER_04 // DUAL_HACKATHON_CHASSIS',
      title: 'Neo-Retro Developer Workstation & Architecture Sandbox',
      category: 'Frontend Engineering & Systems CAD',
      stack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'AWS CDK Generator', 'Bedrock Claude 3.5 AI Twin'],
      description:
        'Award-winning developer portfolio engineered with retro CRT aesthetics, interactive terminal CLI, live Cloud Architecture Sandbox with CDK v2 synthesis, and Bedrock Claude 3.5 AI Twin. Tailored for dual submission to AWS Student Builder Challenge & Skillinf Portfolio Design Hackathon 2026.',
      telemetry: [
        { label: 'TEST_COVERAGE', value: '6/6 Passed (100%)', color: 'text-emerald-400' },
        { label: 'PERFORMANCE', value: '0.000 CLS / <3s Build', color: 'text-cyan-400' },
        { label: 'SUBMISSIONS', value: 'AWS + Skillinf 2026', color: 'text-amber-400' },
        { label: 'SUPERPOWERS', value: 'Terminal CLI + Sandbox', color: 'text-purple-400' },
      ],
      repoUrl: 'https://github.com/farhan/aws-builder-superpower-portfolio',
      liveUrl: 'http://localhost:3001',
      status: 'VERIFIED // HACKATHON_NOMINEE',
    },
  ];

  return (
    <section id="dossiers" className="py-16 sm:py-24 border-b border-slate-800 bg-[#080c14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-slate-800 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 bg-emerald-500 rounded-none inline-block"></span>
              <span>SECTION_02 // DECLASSIFIED_PROJECT_DOSSIERS</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight mt-1">
              Engineered Systems &amp; Case Studies
            </h2>
            <p className="text-slate-400 text-sm font-mono mt-2 max-w-2xl">
              Production architectures, measured telemetry envelopes, and reproducible open-source codebases.
            </p>
          </div>
          <div className="text-xs font-mono text-slate-500">
            TOTAL_DOSSIERS: [ 04 ] // CLASSIFICATION: PUBLIC
          </div>
        </div>

        {/* Dossiers Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mt-10">
          {dossiers.map((p) => (
            <div
              key={p.id}
              className="flex flex-col justify-between p-6 sm:p-8 rounded-lg bg-[#0b101c] border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 shadow-xl group"
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
                  {p.telemetry.map((t, idx) => (
                    <div key={idx} className="p-1.5">
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
          ))}
        </div>
      </div>
    </section>
  );
};
