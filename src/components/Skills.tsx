import React from 'react';
import { Cpu, Cloud, Code, Wrench, Shield, Database, Terminal, Server } from 'lucide-react';
import { RetroReveal } from './RetroReveal';
import { RetroDecoderText } from './RetroDecoderText';

export const Skills: React.FC = () => {
  const modules = [
    {
      moduleId: 'MOD_01',
      address: '0x00A0 – 0x00FF',
      title: 'AI_&_AGENTIC_SYSTEMS',
      icon: <Cpu className="w-4 h-4 text-purple-400" />,
      skills: [
        'LangGraph (Multi-Agent)',
        'TinyFish Web Agents',
        'Google Gemma 4 & Gemma 2',
        'NVIDIA Nemotron',
        'Ollama (Local Inference)',
        'Strands Agents SDK',
        'n8n Workflow Automation',
        'Prompt Engineering',
        'Claude Code & Cursor',
        'Deterministic Test Oracles',
      ],
    },
    {
      moduleId: 'MOD_02',
      address: '0x0100 – 0x01FF',
      title: 'FRONTEND_&_UI_UX_CRAFT',
      icon: <Code className="w-4 h-4 text-emerald-400" />,
      skills: [
        'Next.js 14 (App Router)',
        'React & TypeScript',
        'JavaScript (ES6+)',
        'Tailwind CSS',
        'Framer Motion',
        'Scoped SCSS Tokens (--ks-*)',
        'Lucide Icons System',
        'Responsive Web Design',
        'Micro-Interactions & Audio',
        'Figma / UI Prototyping',
      ],
    },
    {
      moduleId: 'MOD_03',
      address: '0x0200 – 0x02FF',
      title: 'CLOUD_&_CONTAINER_RUNTIME',
      icon: <Cloud className="w-4 h-4 text-cyan-400" />,
      skills: [
        'Docker & Docker Compose',
        'Vercel & Netlify CI/CD',
        'Cloudflare Edge',
        'Container Orchestration',
        'GitHub Actions Pipelines',
        'Linux Shell Scripting (Bash)',
        'AWS Lambda & Amazon S3',
        'Automated CI Type-Checking',
        'Pytest Automated Suites',
        'MapLibre GL Geospatial',
      ],
    },
    {
      moduleId: 'MOD_04',
      address: '0x0300 – 0x03FF',
      title: 'LANGUAGES_APIS_&_DATABASE',
      icon: <Database className="w-4 h-4 text-amber-400" />,
      skills: [
        'TypeScript',
        'Python 3.12',
        'JavaScript (Modern)',
        'C / C++',
        'FastAPI',
        'RESTful APIs & WebSockets',
        'OAuth 2.0 Auth Flows',
        'Supabase & PostgreSQL',
        'HTML5 / CSS3 Semantic DOM',
        'Data Structures & Algorithms',
      ],
    },
  ];

  return (
    <section id="stack" className="py-16 sm:py-24 border-b border-slate-800 bg-[#080c14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <RetroReveal animation="fade-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-slate-800 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <span className="w-2 h-2 bg-emerald-500 rounded-none inline-block animate-phosphor-pulse"></span>
                <RetroDecoderText text="SECTION_04 // SILICON_PINOUT_&_STACK" />
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight mt-1">
                Chipset Architecture &amp; Runtimes
              </h2>
              <p className="text-slate-400 text-sm font-mono mt-2 max-w-2xl">
                Deterministic technical capabilities exercised across production codebases, cloud benchmarks, and automated test harnesses.
              </p>
            </div>
            <div className="text-xs font-mono text-slate-500">
              TOTAL_REGISTERS: [ 32 ] // STATUS: ONLINE
            </div>
          </div>
        </RetroReveal>

        {/* Modules Grid */}
        <div className="grid sm:grid-cols-2 gap-6 mt-10">
          {modules.map((m, idx) => (
            <RetroReveal key={m.moduleId} animation="scale" delay={idx * 80}>
              <div
                className="p-6 rounded-lg bg-[#0b101c] border border-slate-800 hover:border-emerald-500/40 transition-all font-mono glitch-hover h-full"
              >
                {/* Module Header Bar */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                  <div className="flex items-center gap-2 text-white font-bold">
                    {m.icon}
                    <span>{m.title}</span>
                  </div>
                  <span className="text-[10px] text-slate-500">{m.address}</span>
                </div>

                {/* Pinout Grid */}
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {m.skills.map((skill, sidx) => (
                    <div
                      key={skill}
                      className="flex items-center gap-2 p-2 rounded bg-[#070b14] border border-slate-800/80 text-xs text-slate-300 hover:border-emerald-500/40 hover:text-emerald-300 transition-colors"
                    >
                      <span className="text-[10px] text-emerald-500 font-bold font-mono">
                        P{(sidx + 1).toString().padStart(2, '0')}
                      </span>
                      <span className="truncate">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </RetroReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
