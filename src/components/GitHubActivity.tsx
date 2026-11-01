import React from 'react';
import { GitBranch, Star, GitCommit, ExternalLink, Code2, Terminal } from 'lucide-react';

interface GitHubRepo {
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  updated: string;
  url: string;
}

const FEATURED_REPOS: GitHubRepo[] = [
  {
    name: 'ecoroute-ev-map',
    description: 'Clean energy & EV corridor routing navigator on Amazon Location Service & MapLibre GL.',
    language: 'TypeScript',
    stars: 48,
    forks: 9,
    updated: 'Updated today',
    url: 'https://github.com/farhan/ecoroute-ev-map',
  },
  {
    name: 'cloudops-strands-swarm',
    description: 'Autonomous AWS SRE incident triage and self-healing multi-agent swarm on Amazon Bedrock.',
    language: 'Python',
    stars: 64,
    forks: 18,
    updated: 'Updated today',
    url: 'https://github.com/farhan/cloudops-strands-swarm',
  },
  {
    name: 'serverless-resilient-hub',
    description: 'Zero-downtime distributed event streaming pipeline with AWS Lambda, SQS, and DynamoDB.',
    language: 'TypeScript / CDK',
    stars: 35,
    forks: 6,
    updated: 'Updated 2 days ago',
    url: 'https://github.com/farhan/serverless-resilient-hub',
  },
];

export const GitHubActivity: React.FC = () => {
  // Generate simulated 52-week green phosphor contribution grid
  const weeks = 28;
  const daysPerWeek = 7;

  return (
    <section className="py-16 sm:py-24 border-b border-slate-800 bg-[#080c14] font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-slate-800 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <span className="w-2 h-2 bg-emerald-500 rounded-none inline-block"></span>
              <span>SECTION_03.5 // OPEN_SOURCE_TELEMETRY</span>
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight mt-1">
              Active Git Repositories &amp; Commit Density
            </h2>
          </div>
          <a
            href="https://github.com/farhan"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 font-bold"
          >
            <span>[ GITHUB_PROFILE ]</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Phosphor Commit Matrix Bar */}
        <div className="mt-8 p-4 rounded bg-[#0b101c] border border-slate-800 overflow-x-auto">
          <div className="flex items-center justify-between pb-2 text-[11px] text-slate-400 border-b border-slate-800/80 mb-3">
            <span>COMMIT_MATRIX (PAST 180 DAYS)</span>
            <span className="text-emerald-400 font-bold">1,420 COMMITS IN 2026</span>
          </div>

          <div className="flex gap-1.5 min-w-[600px] justify-between">
            {Array.from({ length: weeks }).map((_, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-1.5">
                {Array.from({ length: daysPerWeek }).map((_, dIdx) => {
                  const level = (wIdx * 7 + dIdx) % 5;
                  const bgClass =
                    level === 0
                      ? 'bg-slate-900 border border-slate-800/60'
                      : level === 1
                      ? 'bg-emerald-950 border border-emerald-900/60'
                      : level === 2
                      ? 'bg-emerald-800/70 border border-emerald-700/60'
                      : level === 3
                      ? 'bg-emerald-600 border border-emerald-500/70'
                      : 'bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.5)]';

                  return (
                    <div
                      key={dIdx}
                      className={`w-3.5 h-3.5 rounded-none ${bgClass} transition-transform hover:scale-125 cursor-pointer`}
                      title={`Day ${wIdx * 7 + dIdx + 1}: ${level * 3 + 1} commits`}
                    />
                  );
                })}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-3 text-[10px] text-slate-500">
            <span>Less</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-slate-900 border border-slate-800" />
              <span className="w-2.5 h-2.5 bg-emerald-950" />
              <span className="w-2.5 h-2.5 bg-emerald-800" />
              <span className="w-2.5 h-2.5 bg-emerald-600" />
              <span className="w-2.5 h-2.5 bg-emerald-400" />
            </div>
            <span>More</span>
          </div>
        </div>

        {/* Repos Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
          {FEATURED_REPOS.map((repo) => (
            <a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noreferrer"
              className="p-5 rounded bg-[#0b101c] border border-slate-800 hover:border-emerald-500/50 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="flex items-center gap-1.5 font-mono text-emerald-400 font-bold group-hover:text-emerald-300 transition-colors">
                    <GitBranch className="w-3.5 h-3.5" />
                    {repo.name}
                  </span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <Star className="w-3 h-3 text-amber-400" />
                    {repo.stars}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-mono">
                  {repo.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span className="text-cyan-400">{repo.language}</span>
                <span>{repo.updated}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
