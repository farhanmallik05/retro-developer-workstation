import React from 'react';
import { Award, CheckCircle, ExternalLink, ShieldCheck, Sparkles, Terminal, GitPullRequest, Users, Trophy } from 'lucide-react';

interface CertificationsProps {
  onOpenQuiz?: () => void;
}

export const Certifications: React.FC<CertificationsProps> = ({ onOpenQuiz }) => {
  const contributions = [
    {
      title: 'Open Source Connect Global — Campus Lead & Developer',
      role: 'Open Source Developer & Campus Lead • Feb 2026 – Apr 2026 (Remote)',
      code: 'OSCG-LEAD-2026',
      status: 'VERIFIED // CAMPUS LEAD 2026',
      badgeColor: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/80',
      icon: <Users className="w-4 h-4 text-emerald-400" />,
      highlights: [
        'Recognized as Campus Lead 2026 for developer community leadership and student mentorship',
        'Implemented frontend features and resolved UI/workflow issues across open-source repositories',
        'Authored structured pull requests and conducted collaborative peer code reviews',
        'Facilitated open-source onboarding workshops and technical guidance for student engineers',
      ],
    },
    {
      title: 'Apertre 3.0 & Hacktoberfest — Frontend & AI Contributor',
      role: 'Open Source Contributor • Oct 2025 – Oct 2026 (Remote)',
      code: 'KESTRA-SLOTHOPS',
      status: 'HACKTOBERFEST & APERTRE',
      badgeColor: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/80',
      icon: <GitPullRequest className="w-4 h-4 text-cyan-400" />,
      highlights: [
        'Migrated Kestra frontend Vue/TypeScript components to scoped SCSS design-system tokens (--ks-*)',
        'Validated theme token consistency across light and dark modes in production UI',
        'Built SlothOps (github.com/farhanmallik05/slothops): Gemma 2 + TabPFN cognitive conservation agent',
        'Contributed reproducible bug fixes and documentation enhancements to developer tooling',
      ],
    },
    {
      title: 'Hackathon Honors & Competitive Engineering',
      role: '2x Hackathon Finalist • National & Institutional Competitions',
      code: 'HONORS-2025-2026',
      status: '2X FINALIST // VERIFIED',
      badgeColor: 'text-amber-400 border-amber-500/40 bg-amber-950/80',
      icon: <Trophy className="w-4 h-4 text-amber-400" />,
      highlights: [
        'Paranox Hackathon Finalist — Autonomous AI engineering & high-craft tactile interfaces',
        'Buildathon 1.0 Finalist — KCC Institute of Technology and Management',
        'Finalist Chassis: EcoRoute Clean Energy Navigator & CloudOps 4-Agent SRE Swarm',
        'Validated across 140 automated test suites (113 unit/integration and 27 stress tests)',
      ],
    },
    {
      title: 'Verified Technical Certifications & Workshops',
      role: 'Agentic AI, GenAI Prompting & Data Structures Foundations',
      code: 'CERTS-2025',
      status: 'ANALYTIXLABS & NSDC',
      badgeColor: 'text-purple-400 border-purple-500/40 bg-purple-950/80',
      icon: <Award className="w-4 h-4 text-purple-400" />,
      highlights: [
        'Agentic AI Workflows with n8n — AnalytixLabs (2025)',
        'Introduction to GenAI & Prompting — NSDC & LetsUpgrade (2025)',
        'DSA Fundamentals (Data Structures & Algorithms) — AnalytixLabs (2025)',
        'Git & GitHub Engineering Workshop — IEEE MAIT (2025)',
      ],
    },
  ];

  return (
    <section id="certifications" className="py-16 sm:py-24 border-b border-slate-800 bg-[#080c14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-slate-800 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
              <span className="w-2 h-2 bg-amber-500 rounded-none inline-block"></span>
              <span>SECTION_05 // OPEN_SOURCE_LEADERSHIP_&amp;_HONORS</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight mt-1">
              Open Source Contributions &amp; Honors
            </h2>
            <p className="text-slate-400 text-sm font-mono mt-2 max-w-2xl">
              Verified community leadership, active open-source contributions across Kestra and Hacktoberfest, hackathon finalist honors, and technical credentials.
            </p>
          </div>

          {onOpenQuiz && (
            <button
              onClick={onOpenQuiz}
              className="flex items-center gap-2 px-4 py-2 rounded bg-amber-950/60 border border-amber-500/50 hover:border-amber-400 text-amber-300 hover:text-white transition-all text-xs font-bold tracking-wider uppercase font-mono shadow-[0_0_15px_rgba(245,158,11,0.2)] active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>[ LAUNCH_SKILLS_CHALLENGE.SH ]</span>
            </button>
          )}
        </div>

        {/* Credentials Grid */}
        <div className="grid md:grid-cols-2 gap-8 mt-10">
          {contributions.map((c) => (
            <div
              key={c.code}
              className="p-6 sm:p-8 rounded-lg bg-[#0b101c] border border-slate-800 hover:border-amber-500/50 transition-all font-mono shadow-xl relative overflow-hidden group"
            >
              {/* Subtle top indicator */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  {c.icon}
                  <span className="text-amber-400 font-bold">{c.code}</span>
                </div>
                <span className={`font-bold text-[11px] px-2 py-0.5 rounded border ${c.badgeColor}`}>
                  {c.status}
                </span>
              </div>

              <div className="mt-4 space-y-1">
                <h3 className="font-display font-bold text-lg sm:text-xl text-white group-hover:text-amber-300 transition-colors">
                  {c.title}
                </h3>
                <p className="text-xs text-slate-400">{c.role}</p>
              </div>

              {/* Verified Competencies */}
              <div className="mt-5 space-y-2 border-t border-slate-800/80 pt-4">
                <span className="block text-[10px] uppercase text-slate-500 font-bold">
                  VERIFIED_CONTRIBUTIONS_&amp;_MILESTONES:
                </span>
                {c.highlights.map((h, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
