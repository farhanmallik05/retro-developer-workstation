import React from 'react';
import { Radio, ShieldCheck, Zap } from 'lucide-react';

interface CloudRadarVisualizerProps {
  activeServices: string[];
  onToggleService: (serviceName: string) => void;
}

interface ServiceNode {
  name: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  category: 'EDGE' | 'COMPUTE' | 'STORAGE' | 'AI' | 'MONITORING';
}

const SERVICE_COORDINATES: ServiceNode[] = [
  { name: 'Route 53', x: 80, y: 20, category: 'EDGE' },
  { name: 'AWS ACM', x: 82, y: 38, category: 'EDGE' },
  { name: 'Amazon CloudFront', x: 62, y: 28, category: 'EDGE' },
  { name: 'Amazon S3', x: 34, y: 28, category: 'STORAGE' },
  { name: 'Amazon API Gateway', x: 68, y: 50, category: 'EDGE' },
  { name: 'AWS Lambda', x: 50, y: 54, category: 'COMPUTE' },
  { name: 'Amazon DynamoDB', x: 30, y: 70, category: 'STORAGE' },
  { name: 'Amazon Bedrock', x: 24, y: 45, category: 'AI' },
  { name: 'Strands SDK', x: 42, y: 80, category: 'AI' },
  { name: 'Amazon CloudWatch', x: 72, y: 74, category: 'MONITORING' },
];

export const CloudRadarVisualizer: React.FC<CloudRadarVisualizerProps> = ({
  activeServices,
  onToggleService,
}) => {
  return (
    <div className="relative p-4 rounded-lg bg-[#050811] border border-cyan-500/30 font-mono overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center justify-between pb-2 border-b border-cyan-900/40 text-[11px] mb-3">
        <div className="flex items-center gap-2 text-cyan-400 font-bold">
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          <span>TOPOLOGY_RADAR // 360° ACTIVE SONAR TELEMETRY</span>
        </div>
        <div className="flex items-center gap-2 text-slate-500 text-[10px]">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span>RADAR: 9.4 GHz ACTIVE</span>
        </div>
      </div>

      {/* Main Radar Screen Viewport */}
      <div className="relative w-full h-[220px] sm:h-[260px] bg-[#02050c] border border-cyan-900/50 rounded flex items-center justify-center overflow-hidden">
        {/* Concentric Radar Rings */}
        <div className="absolute w-[60px] h-[60px] rounded-full border border-cyan-500/20" />
        <div className="absolute w-[120px] h-[120px] rounded-full border border-cyan-500/20" />
        <div className="absolute w-[180px] h-[180px] rounded-full border border-cyan-500/25" />
        <div className="absolute w-[240px] h-[240px] rounded-full border border-cyan-500/15" />

        {/* Crosshair Axes */}
        <div className="absolute inset-x-0 top-1/2 h-[1px] bg-cyan-500/20" />
        <div className="absolute inset-y-0 left-1/2 w-[1px] bg-cyan-500/20" />

        {/* 360° Rotating Radar Sweep Beam */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center animate-radar-sweep">
          <div
            className="w-1/2 h-1/2 origin-bottom-right"
            style={{
              background: 'conic-gradient(from 0deg, rgba(6, 182, 212, 0.45) 0deg, transparent 65deg)',
            }}
          />
        </div>

        {/* Dynamic Topology Connecting Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          {/* S3 to CloudFront */}
          {activeServices.includes('Amazon S3') && activeServices.includes('Amazon CloudFront') && (
            <line
              x1="34%"
              y1="28%"
              x2="62%"
              y2="28%"
              stroke="#06b6d4"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              className="animate-pulse"
            />
          )}

          {/* CloudFront to Route 53 */}
          {activeServices.includes('Amazon CloudFront') && activeServices.includes('Route 53') && (
            <line
              x1="62%"
              y1="28%"
              x2="80%"
              y2="20%"
              stroke="#06b6d4"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />
          )}

          {/* API Gateway to Lambda */}
          {activeServices.includes('Amazon API Gateway') && activeServices.includes('AWS Lambda') && (
            <line
              x1="68%"
              y1="50%"
              x2="50%"
              y2="54%"
              stroke="#10b981"
              strokeWidth="2"
              strokeDasharray="3 3"
            />
          )}

          {/* Lambda to DynamoDB */}
          {activeServices.includes('AWS Lambda') && activeServices.includes('Amazon DynamoDB') && (
            <line
              x1="50%"
              y1="54%"
              x2="30%"
              y2="70%"
              stroke="#10b981"
              strokeWidth="2"
              strokeDasharray="3 3"
            />
          )}

          {/* Bedrock to Strands SDK */}
          {activeServices.includes('Amazon Bedrock') && activeServices.includes('Strands SDK') && (
            <line
              x1="24%"
              y1="45%"
              x2="42%"
              y2="80%"
              stroke="#a855f7"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          )}
        </svg>

        {/* Plotted Service Nodes on Radar Plane */}
        {SERVICE_COORDINATES.map((node) => {
          const isActive = activeServices.includes(node.name);

          return (
            <button
              key={node.name}
              onClick={() => onToggleService(node.name)}
              className="absolute -translate-x-1/2 -translate-y-1/2 group z-20 cursor-pointer text-left focus:outline-none"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              title={`Click to toggle ${node.name}`}
            >
              {/* Outer Pulse Ring if Active */}
              {isActive && (
                <span className="absolute -inset-1.5 rounded-full bg-cyan-400/30 animate-ping" />
              )}

              {/* Node Center Dot */}
              <div
                className={`w-3.5 h-3.5 rounded-full border transition-all flex items-center justify-center ${
                  isActive
                    ? 'bg-cyan-400 border-white shadow-[0_0_12px_rgba(6,182,212,0.9)] scale-110'
                    : 'bg-slate-900 border-slate-700 opacity-40 hover:opacity-90'
                }`}
              >
                {isActive && <div className="w-1.5 h-1.5 bg-black rounded-full" />}
              </div>

              {/* Node Label Tooltip */}
              <div
                className={`absolute left-4 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded text-[9px] whitespace-nowrap border pointer-events-none transition-all ${
                  isActive
                    ? 'bg-cyan-950/90 border-cyan-500/60 text-cyan-200 font-bold'
                    : 'bg-black/80 border-slate-800 text-slate-500 hidden sm:block opacity-60'
                }`}
              >
                {node.name.replace('Amazon ', '').replace('AWS ', '')}
              </div>
            </button>
          );
        })}

        {/* Radar Corner Coordinate Telemetry */}
        <div className="absolute bottom-2 left-2 text-[9px] text-cyan-600 font-mono pointer-events-none">
          LOC: 38.8951° N, 77.0364° W (US-EAST-1)
        </div>
        <div className="absolute top-2 right-2 text-[9px] text-cyan-500/80 font-mono pointer-events-none">
          NODES_ONLINE: {activeServices.length}/10
        </div>
      </div>
    </div>
  );
};
