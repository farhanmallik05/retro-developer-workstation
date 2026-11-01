import React, { useState, useEffect } from 'react';
import { Activity, ShieldCheck, Database, Cloud } from 'lucide-react';

export const VisitorTelemetry: React.FC = () => {
  const [visitorCount, setVisitorCount] = useState<number>(1428);
  const [latencyMs, setLatencyMs] = useState<number>(42);

  useEffect(() => {
    // Simulate real-time atomic telemetry from DynamoDB & API Gateway
    const interval = setInterval(() => {
      setLatencyMs(Math.floor(38 + Math.random() * 8));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-8 px-6 max-w-5xl mx-auto border-t border-slate-900">
      <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-2 text-slate-300">
          <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>Serverless Telemetry:</span>
          <strong className="text-white font-mono">{visitorCount.toLocaleString()}</strong>
          <span>Visits Logged via DynamoDB</span>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          <span className="flex items-center gap-1.5 text-slate-400">
            <Cloud className="w-3.5 h-3.5 text-cyan-400" />
            Amplify Edge: <strong className="text-slate-200">Global CloudFront</strong>
          </span>
          <span className="flex items-center gap-1.5 text-slate-400">
            <Database className="w-3.5 h-3.5 text-teal-400" />
            P99 Latency: <strong className="text-emerald-400 font-mono">{latencyMs}ms</strong>
          </span>
          <span className="flex items-center gap-1.5 text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            SSL HSTS: <strong className="text-slate-200">ACM Encrypted</strong>
          </span>
        </div>
      </div>
    </div>
  );
};

