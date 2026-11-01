import React from 'react';
import { Terminal, Globe, ExternalLink, Cpu, Shield, Sparkles } from 'lucide-react';

interface FooterProps {
  onOpenTerminal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTerminal }) => {
  return (
    <footer className="bg-[#050811] text-slate-400 py-12 px-4 sm:px-6 font-mono text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-none inline-block"></span>
              <span className="font-bold text-white text-sm">FARHAN MALLIK // WORKSTATION_V4.2</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Full-Stack Developer &amp; Autonomous AI-Native Systems Architect • B.Tech CS (IT)
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <button
              onClick={onOpenTerminal}
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>[ EXEC_CLI_TERMINAL ]</span>
            </button>

            <a
              href="https://farhanmallik.netlify.app"
              target="_blank"
              rel="noreferrer"
              className="text-slate-300 hover:text-white transition-colors flex items-center gap-1"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>farhanmallik.netlify.app</span>
            </a>

            <a
              href="https://beacons.ai/farhanmallik"
              target="_blank"
              rel="noreferrer"
              className="text-slate-300 hover:text-white transition-colors flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>beacons.ai/farhanmallik</span>
            </a>
          </div>
        </div>

        {/* System Specs & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-slate-500">
          <p>© 2026 FARHAN MALLIK. DUAL_SUBMISSION_FINALIST // AWS BUILDER &amp; SKILLINF DESIGN '26.</p>
          <div className="flex items-center gap-3">
            <span>KERNEL: LINUX_X86_64</span>
            <span>•</span>
            <span>FRAMEWORK: VITE_REACT</span>
            <span>•</span>
            <span className="text-emerald-500">ALL_NODES_OK</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
