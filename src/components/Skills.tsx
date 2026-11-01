import React from 'react';
import { Cpu, Cloud, Code, Wrench, Shield, Database, Terminal, Server } from 'lucide-react';

export const Skills: React.FC = () => {
  const modules = [
    {
      moduleId: 'MOD_01',
      address: '0x00A0 – 0x00FF',
      title: 'CLOUD_INFRASTRUCTURE (AWS)',
      icon: <Cloud className="w-4 h-4 text-cyan-400" />,
      skills: [
        'AWS Lambda',
        'Amazon DynamoDB',
        'Amazon Bedrock',
        'Amazon Location Service',
        'Amazon S3 & CloudFront',
        'Amazon EventBridge',
        'API Gateway',
        'Amazon Cognito',
        'CloudWatch Insights',
        'AWS Amplify Gen 2',
      ],
    },
    {
      moduleId: 'MOD_02',
      address: '0x0100 – 0x01FF',
      title: 'COMPILERS_&_RUNTIMES',
      icon: <Code className="w-4 h-4 text-emerald-400" />,
      skills: [
        'TypeScript (ES2024)',
        'Python 3.12',
        'Node.js (LTS)',
        'SQL (PostgreSQL)',
        'Go (Basics)',
        'Bash / Shell Scripting',
        'HTML5 / Modern DOM',
        'Tailwind CSS',
      ],
    },
    {
      moduleId: 'MOD_03',
      address: '0x0200 – 0x02FF',
      title: 'AUTONOMOUS_AI_SWARMS',
      icon: <Cpu className="w-4 h-4 text-purple-400" />,
      skills: [
        'Strands Agents SDK',
        'Claude 3.5 Sonnet / Haiku',
        'Amazon Bedrock API',
        'Multi-Agent Coordination',
        'Autonomous SRE Triage',
        'Bedrock Guardrails',
        'Tool-Use / Function Calling',
        'RAG Context Ingestion',
      ],
    },
    {
      moduleId: 'MOD_04',
      address: '0x0300 – 0x03FF',
      title: 'IAC_&_SYSTEM_RELIABILITY',
      icon: <Server className="w-4 h-4 text-amber-400" />,
      skills: [
        'AWS CDK v2 (TypeScript)',
        'CloudFormation YAML',
        'Docker & Containers',
        'SQS Dead Letter Queues (DLQ)',
        'Idempotent Deduplication',
        'Exponential Backoff Jitter',
        'GitHub Actions CI/CD',
        'Chaos Fault Injection',
      ],
    },
  ];

  return (
    <section id="stack" className="py-16 sm:py-24 border-b border-slate-800 bg-[#080c14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-slate-800 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 bg-emerald-500 rounded-none inline-block"></span>
              <span>SECTION_04 // SILICON_PINOUT_&amp;_STACK</span>
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

        {/* Modules Grid */}
        <div className="grid sm:grid-cols-2 gap-6 mt-10">
          {modules.map((m) => (
            <div
              key={m.moduleId}
              className="p-6 rounded-lg bg-[#0b101c] border border-slate-800 hover:border-slate-700 transition-all font-mono"
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
                {m.skills.map((skill, idx) => (
                  <div
                    key={skill}
                    className="flex items-center gap-2 p-2 rounded bg-[#070b14] border border-slate-800/80 text-xs text-slate-300 hover:border-emerald-500/40 hover:text-emerald-300 transition-colors"
                  >
                    <span className="text-[10px] text-emerald-500 font-bold font-mono">
                      P{(idx + 1).toString().padStart(2, '0')}
                    </span>
                    <span className="truncate">{skill}</span>
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
