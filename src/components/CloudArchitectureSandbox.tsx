import React, { useState } from 'react';
import { Layers, CheckCircle2, AlertCircle, ShieldCheck, X, Code, Copy, Check, Download, Sparkles, Terminal, Cpu } from 'lucide-react';
import { generateAwsCdkCode, generateCloudFormationYaml, ArchitectureNodeData } from '../utils/iacGenerator';
import { CloudRadarVisualizer } from './CloudRadarVisualizer';

interface ArchitecturePattern {
  id: string;
  name: string;
  description: string;
  requiredServices: string[];
  monthlyCostEstimate: string;
  resilienceRating: 'High' | 'Very High' | 'Fault-Tolerant';
}

const ARCHITECTURE_PATTERNS: ArchitecturePattern[] = [
  {
    id: 'static-cdn',
    name: 'Global Edge Static Delivery',
    description: 'Serverless frontend delivery with sub-100ms global latency and automated TLS.',
    requiredServices: ['Amazon S3', 'Amazon CloudFront', 'Route 53', 'AWS ACM'],
    monthlyCostEstimate: '$0.50 / month (Free Tier Eligible)',
    resilienceRating: 'Very High',
  },
  {
    id: 'serverless-api',
    name: 'Event-Driven Serverless REST API',
    description: 'Zero-idle compute cost with atomic database persistence and automated bursts.',
    requiredServices: ['Amazon API Gateway', 'AWS Lambda', 'Amazon DynamoDB', 'Amazon CloudWatch'],
    monthlyCostEstimate: '$1.20 / month (Free Tier Eligible)',
    resilienceRating: 'Fault-Tolerant',
  },
  {
    id: 'agentic-ai',
    name: 'Bedrock GenAI Multi-Agent Pipeline',
    description: 'Autonomous reasoning agents with persistent session memory and guardrail isolation.',
    requiredServices: ['Amazon Bedrock', 'AWS Lambda', 'Amazon DynamoDB', 'Strands SDK'],
    monthlyCostEstimate: '$4.50 / month (Pay-per-token)',
    resilienceRating: 'High',
  },
];

const AVAILABLE_AWS_SERVICES = [
  'Amazon S3',
  'Amazon CloudFront',
  'AWS Lambda',
  'Amazon DynamoDB',
  'Amazon API Gateway',
  'Amazon Bedrock',
  'Route 53',
  'AWS ACM',
  'Amazon CloudWatch',
  'Strands SDK',
];

interface CloudArchitectureSandboxProps {
  isOpen?: boolean;
  onClose?: () => void;
  isInline?: boolean;
}

export const CloudArchitectureSandbox: React.FC<CloudArchitectureSandboxProps> = ({
  isOpen = false,
  onClose = () => {},
  isInline = false,
}) => {
  const [selectedPattern, setSelectedPattern] = useState<ArchitecturePattern>(ARCHITECTURE_PATTERNS[0]);
  const [activeServices, setActiveServices] = useState<string[]>(['Amazon S3', 'Amazon CloudFront']);
  const [showIacModal, setShowIacModal] = useState<boolean>(false);
  const [iacFormat, setIacFormat] = useState<'cdk' | 'cfn'>('cdk');
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen && !isInline) return null;

  const toggleService = (svc: string) => {
    setActiveServices((prev) =>
      prev.includes(svc) ? prev.filter((s) => s !== svc) : [...prev, svc]
    );
  };

  const isPatternFulfilled = selectedPattern.requiredServices.every((req) =>
    activeServices.includes(req)
  );

  const applyBlueprint = (pattern: ArchitecturePattern) => {
    setSelectedPattern(pattern);
    setActiveServices([...pattern.requiredServices]);
  };

  const nodes: ArchitectureNodeData[] = activeServices.map((svc) => ({
    id: svc.toLowerCase().replace(/[^a-z0-9]/g, '-'),
    type: svc,
    label: svc,
    category: 'AWS',
  }));

  const generatedCode =
    iacFormat === 'cdk'
      ? generateAwsCdkCode(nodes, [])
      : generateCloudFormationYaml(nodes, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const filename = iacFormat === 'cdk' ? 'infrastructure-stack.ts' : 'template.yaml';
    const blob = new Blob([generatedCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const innerContent = (
    <div className="space-y-6 text-xs font-mono">
      {/* Pattern Selector */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-slate-400 font-bold uppercase text-[11px] tracking-wider">
            &gt; SELECT_TARGET_BLUEPRINT:
          </label>
          <button
            onClick={() => applyBlueprint(selectedPattern)}
            className="text-[11px] text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>[ AUTO_FILL_SERVICES ]</span>
          </button>
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          {ARCHITECTURE_PATTERNS.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPattern(p)}
              className={`p-3.5 rounded border text-left transition-all ${
                selectedPattern.id === p.id
                  ? 'bg-cyan-950/60 border-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                  : 'bg-[#070b14] border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <p className="font-bold text-xs truncate text-white">{p.name}</p>
              <span className="text-[10px] text-cyan-400 mt-1 block">
                RESILIENCE: {p.resilienceRating}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 360° Real-Time Radar Topology Visualizer */}
      <CloudRadarVisualizer
        activeServices={activeServices}
        onToggleService={toggleService}
      />

      {/* Service Palette */}
      <div>
        <label className="text-slate-400 font-bold block mb-2 uppercase text-[11px] tracking-wider">
          &gt; ACTIVE_AWS_SERVICES (CLICK TO TOGGLE TOPOLOGY):
        </label>
        <div className="flex flex-wrap gap-2">
          {AVAILABLE_AWS_SERVICES.map((svc) => {
            const isSelected = activeServices.includes(svc);
            const isRequired = selectedPattern.requiredServices.includes(svc);

            return (
              <button
                key={svc}
                onClick={() => toggleService(svc)}
                className={`px-3 py-1.5 rounded border text-xs font-mono transition-all flex items-center gap-1.5 active:scale-95 ${
                  isSelected
                    ? 'bg-cyan-950/80 border-cyan-400 text-cyan-200 shadow-sm'
                    : 'bg-[#070b14] border-slate-800 text-slate-500 hover:border-slate-600 hover:text-slate-300'
                }`}
              >
                <span>{isSelected ? '[x]' : '[ ]'}</span>
                <span>{svc}</span>
                {isRequired && (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Validation Status Box */}
      <div
        className={`p-4 rounded border transition-all ${
          isPatternFulfilled
            ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200'
            : 'bg-amber-950/30 border-amber-500/50 text-amber-200'
        }`}
      >
        <div className="flex items-start gap-3">
          {isPatternFulfilled ? (
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          )}
          <div className="space-y-1">
            <p className="font-bold text-xs uppercase tracking-wider">
              {isPatternFulfilled
                ? 'ARCHITECTURE_BLUEPRINT_VERIFIED // 100% PRODUCTION_READY'
                : 'TOPOLOGY_INCOMPLETE // MISSING REQUIRED SERVICES'}
            </p>
            <p className="text-[11px] opacity-90">{selectedPattern.description}</p>
            <div className="pt-2 flex flex-wrap gap-4 text-[11px] font-mono">
              <span>
                EST_MONTHLY_COST: <strong className="text-white">{selectedPattern.monthlyCostEstimate}</strong>
              </span>
              <span>
                FAILOVER_RATING: <strong className="text-white">{selectedPattern.resilienceRating}</strong>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* IaC Code Viewer */}
      {showIacModal && (
        <div className="p-4 rounded bg-[#03060c] border border-cyan-500/40 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-cyan-400" />
              <span className="font-bold text-white text-xs">SYNTHESIZED_IAC_STACK</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIacFormat('cdk')}
                className={`px-3 py-1 rounded text-[10px] font-bold transition-all ${
                  iacFormat === 'cdk'
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                AWS CDK v2 (TS)
              </button>
              <button
                onClick={() => setIacFormat('cfn')}
                className={`px-3 py-1 rounded text-[10px] font-bold transition-all ${
                  iacFormat === 'cfn'
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                CloudFormation (YAML)
              </button>
            </div>
          </div>

          <pre className="p-3 bg-[#050811] rounded font-mono text-[11px] text-cyan-300 overflow-x-auto max-h-56 border border-slate-800">
            {generatedCode}
          </pre>

          <div className="flex justify-end gap-2 pt-1">
            <button
              onClick={handleCopy}
              className="px-3.5 py-1.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 flex items-center gap-1.5 font-bold active:scale-95 transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'COPIED!' : 'COPY CODE'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold flex items-center gap-1.5 active:scale-95 transition-all shadow-md"
            >
              <Download className="w-3.5 h-3.5" />
              <span>DOWNLOAD TEMPLATE</span>
            </button>
          </div>
        </div>
      )}

      {/* Export Button */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => setShowIacModal((prev) => !prev)}
          className="px-4 py-2 rounded bg-cyan-950/60 text-cyan-300 hover:bg-cyan-900/60 border border-cyan-500/40 font-bold flex items-center gap-2 transition-all active:scale-95"
        >
          <Code className="w-4 h-4" />
          <span>{showIacModal ? '[ HIDE_IAC_SYNTHESIZER ]' : '[ EXPORT_AWS_CDK_V2_CODE ]'}</span>
        </button>
        <span className="text-[10px] text-slate-500 font-mono">SYNTHESIS_ENGINE: ACTIVE</span>
      </div>
    </div>
  );

  // If rendered inline in the page
  if (isInline) {
    return (
      <section id="sandbox" className="py-16 sm:py-24 border-b border-slate-800 bg-[#080c14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-slate-800 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <span className="w-2 h-2 bg-cyan-500 rounded-none inline-block"></span>
                <span>SECTION_03 // CLOUD_ARCHITECTURE_CAD_SANDBOX</span>
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight mt-1">
                Interactive AWS Architecture Modeler
              </h2>
              <p className="text-slate-400 text-sm font-mono mt-2 max-w-2xl">
                Design Well-Architected AWS topologies in real-time, compute estimated cloud budgets, and synthesize copyable AWS CDK v2 code.
              </p>
            </div>
            <div className="text-xs font-mono text-slate-500">
              SYNTHESIZER: READY // NODE_COUNT: [ {activeServices.length} ]
            </div>
          </div>

          <div className="mt-10 p-6 sm:p-8 rounded-lg bg-[#0b101c] border border-slate-800 shadow-xl">
            {innerContent}
          </div>
        </div>
      </section>
    );
  }

  // Modal Render
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050811]/90 backdrop-blur-xl animate-in fade-in duration-200 font-mono text-xs">
      <div className="relative w-full max-w-3xl rounded-lg bg-[#0b101c] border border-slate-700 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">AWS CLOUD ARCHITECTURE CAD SANDBOX</h3>
              <p className="text-[11px] text-slate-400">Interactive Blueprint &amp; IaC Synthesizer</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded bg-slate-900 border border-slate-700 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {innerContent}
      </div>
    </div>
  );
};
