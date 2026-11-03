import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Minus, Square, CornerDownLeft, Sparkles, Cpu, Layers } from 'lucide-react';
import confetti from 'canvas-confetti';
import { TerminalOutputItem } from '../types/portfolio';
import { themeEngine, CRT_THEMES, CrtThemeId } from '../utils/themeEngine';
import { retroAudio } from '../utils/retroAudio';

interface InteractiveTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenArcade?: () => void;
  onReboot?: () => void;
  onDegauss?: () => void;
  onOpenBooking?: () => void;
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({
  isOpen,
  onClose,
  onOpenArcade,
  onReboot,
  onDegauss,
  onOpenBooking,
}) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMatrixActive, setIsMatrixActive] = useState(false);
  const [outputs, setOutputs] = useState<TerminalOutputItem[]>([
    {
      id: 'init-01',
      command: 'welcome',
      output: (
        <div className="space-y-1 text-slate-300">
          <p className="text-cyan-400 font-bold">AWS Student Builder CLI Environment v2.4 (x86_64-aws-amplify)</p>
          <p className="text-slate-400 text-xs">
            Type <span className="text-amber-400 font-mono font-bold">help</span> to view available commands or <span className="text-emerald-400 font-mono font-bold">sudo hire</span> for the recruiter easter egg!
          </p>
        </div>
      ),
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, outputs]);

  if (!isOpen) return null;

  const handleCommand = (rawCommand: string) => {
    const trimmed = rawCommand.trim().toLowerCase();
    if (!trimmed) return;

    setHistory((prev) => [...prev, rawCommand]);
    setHistoryIndex(-1);

    let resultNode: React.ReactNode;

    if (trimmed.startsWith('theme')) {
      const parts = trimmed.split(' ');
      const requestedTheme = parts[1]?.toLowerCase() as CrtThemeId | undefined;
      if (requestedTheme && CRT_THEMES[requestedTheme]) {
        themeEngine.setTheme(requestedTheme);
        retroAudio.playTerminalBeep(980, 0.05);
        resultNode = (
          <p className="text-emerald-400 font-mono text-xs">
            CRT Phosphor palette switched to: <strong className="text-white">{CRT_THEMES[requestedTheme].name}</strong> ({CRT_THEMES[requestedTheme].label})
          </p>
        );
      } else {
        resultNode = (
          <div className="font-mono text-xs text-slate-300 space-y-1">
            <p className="text-amber-400 font-bold">Usage: theme &lt;emerald | amber | cyan | white&gt;</p>
            <p className="text-slate-400">Available CRT Phosphor options:</p>
            <p>• <span className="text-emerald-400 font-mono">theme emerald</span> : Classic IBM / Apple II P1 Green</p>
            <p>• <span className="text-amber-400 font-mono">theme amber</span> : DEC / Wang Laboratories P3 Amber</p>
            <p>• <span className="text-cyan-400 font-mono">theme cyan</span> : Tron Electric Cyan Monochrome</p>
            <p>• <span className="text-slate-200 font-mono">theme white</span> : DEC VT220 Paper-White Monochrome</p>
          </div>
        );
      }
    } else {
      switch (trimmed) {
      case 'help':
        resultNode = (
          <div className="space-y-1.5 text-slate-300 text-xs">
            <p><span className="text-cyan-400 font-mono w-28 inline-block font-bold">bio</span> Print student engineering background</p>
            <p><span className="text-cyan-400 font-mono w-28 inline-block font-bold">skills</span> Output categorized AI, frontend &amp; cloud stack</p>
            <p><span className="text-cyan-400 font-mono w-28 inline-block font-bold">projects</span> List flagship AI platforms &amp; open-source repos</p>
            <p><span className="text-cyan-400 font-mono w-28 inline-block font-bold">resume</span> Print complete plain-text resume</p>
            <p><span className="text-cyan-400 font-mono w-28 inline-block font-bold">curl</span> Query live profile JSON API endpoint</p>
            <p><span className="text-cyan-400 font-mono w-28 inline-block font-bold">oss</span> Display open source contributions &amp; leadership</p>
            <p><span className="text-cyan-400 font-mono w-28 inline-block font-bold">htop</span> Live system process telemetry monitor</p>
            <p><span className="text-cyan-400 font-mono w-28 inline-block font-bold">aws s3 ls</span> Query connected AWS S3 project storage buckets</p>
            <p><span className="text-cyan-400 font-mono w-28 inline-block font-bold">theme &lt;id&gt;</span> Change CRT phosphor (emerald, amber, cyan, white)</p>
            <p><span className="text-cyan-400 font-mono w-28 inline-block font-bold">degauss</span> Coil demagnetization shockwave &amp; audio pulse</p>
            <p><span className="text-cyan-400 font-mono w-28 inline-block font-bold">arcade</span> Launch CYBER-RUNNER 1984 2D arcade minigame</p>
            <p><span className="text-emerald-400 font-mono w-28 inline-block font-bold">schedule</span> Fast-track recruiter booking &amp; .ics download</p>
            <p><span className="text-cyan-400 font-mono w-28 inline-block font-bold">reboot</span> Reboot workstation &amp; replay BIOS POST screen</p>
            <p><span className="text-cyan-400 font-mono w-28 inline-block font-bold">matrix</span> Toggle falling digital matrix rain</p>
            <p><span className="text-emerald-400 font-mono w-28 inline-block font-bold">sudo hire</span> Recruiter direct link &amp; easter egg 🎉</p>
            <p><span className="text-cyan-400 font-mono w-28 inline-block font-bold">clear</span> Clear terminal screen</p>
          </div>
        );
        break;

      case 'resume':
        resultNode = (
          <div className="p-3 bg-slate-900/80 rounded border border-slate-800 space-y-1.5 font-mono text-slate-300 text-[11px]">
            <p className="text-cyan-400 font-bold">FARHAN MALLIK — AI &amp; FRONTEND ENGINEER</p>
            <p>Education: B.Tech in CSE &amp; IT (2024–2028), KCC ITM, Greater Noida | D.A.V. Rohtak (12th PCM 2023, 10th 2021)</p>
            <p>Leadership: Campus Lead 2026 (Open Source Connect Global) • 2x Hackathon Finalist</p>
            <p>Open Source: Kestra (Scoped SCSS design tokens), Apertre 3.0, Hacktoberfest 2025/2026, SlothOps</p>
            <p>Certifications: Agentic AI with n8n (AnalytixLabs) • Intro to GenAI (NSDC) • DSA Fundamentals (AnalytixLabs) • Git/GitHub (IEEE MAIT)</p>
            <p>Core Stack: LangGraph, Next.js 14, TypeScript, Tailwind CSS, Framer Motion, Python, Docker, FastAPI</p>
            <p>Flagship: Ghar Search (LangGraph 6-Agent Due Diligence) • CloudOps Swarm (Strands SDK) • ForkFix &amp; SpecterLens (Nemotron + Gemma 4)</p>
            <p>Live Portfolio: <a href="https://farhanmallik05.github.io/retro-developer-workstation/" target="_blank" rel="noreferrer" className="text-cyan-400 underline">farhanmallik05.github.io/retro-developer-workstation/</a></p>
            <p>GitHub: <a href="https://github.com/farhanmallik05" target="_blank" rel="noreferrer" className="text-teal-400 underline">github.com/farhanmallik05</a> | LinkedIn: <a href="https://linkedin.com/in/farhanmallik" target="_blank" rel="noreferrer" className="text-teal-400 underline">linkedin.com/in/farhanmallik</a></p>
            <p className="text-emerald-400">Contact: farhanmallick2005@gmail.com | +91 7988009083 | Greater Noida, India</p>
          </div>
        );
        break;

      case 'curl':
        resultNode = (
          <div className="font-mono text-slate-300 text-xs">
            <p className="text-slate-500">$ curl -s https://farhanmallik05.github.io/retro-developer-workstation/api/profile</p>
            <p className="text-emerald-400 font-bold mt-1">HTTP/2 200 OK</p>
            <p className="text-slate-400 font-mono text-[11px]">
              {JSON.stringify({
                name: 'Farhan Mallik',
                title: 'AI & Frontend Engineer',
                location: 'Greater Noida, India',
                degree: 'B.Tech CSE & IT (2024–2028), KCC ITM',
                leadership: 'Campus Lead 2026 (Open Source Connect Global)',
                honors: '2x Hackathon Finalist',
                github: 'https://github.com/farhanmallik05',
                portfolio: 'https://farhanmallik05.github.io/retro-developer-workstation/',
                latency: '18ms'
              }, null, 2)}
            </p>
          </div>
        );
        break;

      case 'bio':
        resultNode = (
          <p className="text-slate-300 text-xs leading-relaxed">
            👨‍💻 <strong>Farhan Mallik</strong> — AI &amp; Frontend Engineer (B.Tech CSE, 2028).<br />
            Specializing in multi-agent LLM applications (LangGraph, Gemma 4, NVIDIA Nemotron, Ollama), high-craft web interfaces (Next.js 14, TypeScript, Tailwind CSS, Framer Motion), and containerized deployments.<br />
            Two-time Hackathon Finalist and Open Source Campus Lead 2026.<br />
            GitHub: <a href="https://github.com/farhanmallik05" target="_blank" rel="noreferrer" className="text-cyan-400 underline">github.com/farhanmallik05</a> • LinkedIn: <a href="https://linkedin.com/in/farhanmallik" target="_blank" rel="noreferrer" className="text-teal-400 underline">linkedin.com/in/farhanmallik</a>
          </p>
        );
        break;

      case 'skills':
        resultNode = (
          <div className="space-y-2 text-xs text-slate-300">
            <div>
              <span className="text-purple-400 font-bold block mb-1">🤖 AI &amp; Agentic Systems:</span>
              <p>LangGraph (Multi-Agent Orchestration), TinyFish Web Agents, Google Gemma 4/2, NVIDIA Nemotron, Ollama (Local LLM), Strands Agents SDK, n8n Automation, Prompt Engineering, Claude Code, Cursor</p>
            </div>
            <div>
              <span className="text-emerald-400 font-bold block mb-1">🎨 Frontend &amp; UI/UX Craft:</span>
              <p>Next.js 14 (App Router), React, TypeScript, JavaScript (ES6+), Tailwind CSS, Framer Motion, Scoped SCSS Tokens (--ks-*), Lucide Icons, Responsive Web Design, Figma</p>
            </div>
            <div>
              <span className="text-cyan-400 font-bold block mb-1">☁️ Cloud &amp; Containerization:</span>
              <p>Docker, Docker Compose, Vercel, Netlify, Cloudflare, Linux (Bash), Git &amp; GitHub Actions CI, Pytest Automated Testing, AWS Lambda &amp; S3</p>
            </div>
          </div>
        );
        break;

      case 'projects':
        resultNode = (
          <div className="space-y-2 text-xs text-slate-300">
            <div className="p-2 rounded bg-slate-900 border-l-2 border-cyan-400">
              <strong className="text-white">1. Ghar Search: Agentic Property Due-Diligence</strong>
              <p className="text-slate-400">Next.js 14, LangGraph, TinyFish Web Agents, FastAPI, Docker. 6 parallel workers across 1.5L+ RERA records (140 tests).</p>
            </div>
            <div className="p-2 rounded bg-slate-900 border-l-2 border-teal-400">
              <strong className="text-white">2. CloudOps Swarm: Autonomous SRE &amp; Self-Healing</strong>
              <p className="text-slate-400">Strands Agents SDK, Bedrock Claude 3.5 Sonnet. 4-agent incident response swarm, 28s MTTD, 100% accuracy.</p>
            </div>
            <div className="p-2 rounded bg-slate-900 border-l-2 border-purple-400">
              <strong className="text-white">3. ForkFix &amp; SpecterLens: Autonomous AI Debugging</strong>
              <p className="text-slate-400">NVIDIA Nemotron, Google Gemma 4, Python, Nebius. 4 parallel sandboxed execution realities.</p>
            </div>
            <div className="p-2 rounded bg-slate-900 border-l-2 border-amber-400">
              <strong className="text-white">4. EcoRoute: Clean Energy &amp; EV Grid Navigator</strong>
              <p className="text-slate-400">Amazon Location Service, MapLibre GL, Turf.js. 45,000+ alternative fueling stations.</p>
            </div>
          </div>
        );
        break;

      case 'oss':
      case 'opensource':
      case 'aws':
        resultNode = (
          <div className="space-y-1.5 text-xs text-slate-300">
            <p className="text-amber-400 font-bold">🌐 Open Source Leadership &amp; Honors:</p>
            <p>• <strong>Campus Lead 2026</strong> — Open Source Connect Global (Feb 2026 – Apr 2026)</p>
            <p>• <strong>Kestra Contributor</strong> — Scoped SCSS design-system tokens (--ks-*) migration across Vue/TS</p>
            <p>• <strong>Apertre 3.0 &amp; Hacktoberfest</strong> — Open Source Contributor (2025 &amp; 2026) &amp; SlothOps Architect</p>
            <p>• <strong>2x Hackathon Finalist</strong> — Paranox Hackathon &amp; Buildathon 1.0 (KCC ITM)</p>
            <p>• <strong>Certifications:</strong> Agentic AI with n8n (AnalytixLabs) • Intro to GenAI (NSDC) • DSA Fundamentals</p>
          </div>
        );
        break;

      case 'sudo hire':
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
        });
        resultNode = (
          <div className="p-4 rounded-xl bg-emerald-950/70 border border-emerald-500/50 text-emerald-200 space-y-2 text-xs">
            <p className="font-bold text-sm text-emerald-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              Recruiter &amp; Hackathon Judge Access Granted!
            </p>
            <p>Thank you for exploring my engineering showcase! I am actively open to Full-Stack, Cloud, and AI Systems Engineering opportunities.</p>
            <p className="pt-1">
              🌐 Live Portfolio: <a href="https://farhanmallik05.github.io/retro-developer-workstation/" target="_blank" rel="noreferrer" className="underline text-white font-mono">farhanmallik05.github.io/retro-developer-workstation/</a><br />
              🐙 GitHub: <a href="https://github.com/farhanmallik05" target="_blank" rel="noreferrer" className="underline text-white font-mono">github.com/farhanmallik05</a> | LinkedIn: <a href="https://linkedin.com/in/farhanmallik" target="_blank" rel="noreferrer" className="underline text-white font-mono">linkedin.com/in/farhanmallik</a><br />
              📍 Location: Greater Noida, India | 📞 +91 7988009083<br />
              🎓 Education: B.Tech in CSE &amp; IT (2024–2028), KCC ITM, Greater Noida<br />
              🏆 Recognition: Campus Lead 2026 (Open Source Connect Global) • 2x Hackathon Finalist
            </p>
            {onOpenBooking && (
              <div className="pt-2">
                <button
                  onClick={() => onOpenBooking()}
                  className="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-[0_0_10px_rgba(16,185,129,0.3)] transition-all flex items-center gap-1.5"
                >
                  <span>📅 Launch Recruiter Scheduling Calendar</span>
                </button>
              </div>
            )}
          </div>
        );
        break;

      case 'schedule':
      case 'book':
      case 'interview':
      case 'calendar':
        if (onOpenBooking) {
          retroAudio.playTerminalBeep(1100, 0.08);
          onOpenBooking();
        }
        resultNode = (
          <div className="p-3 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 space-y-1 font-mono text-xs">
            <p className="text-emerald-400 font-bold">📅 RECRUITER CALENDAR SYNC LAUNCHED</p>
            <p>Direct scheduling console opened. Select your preferred slot and download RFC 5545 .ICS calendar invite or dispatch direct email.</p>
          </div>
        );
        break;

      case 'matrix':
        setIsMatrixActive((prev) => !prev);
        resultNode = (
          <p className="text-emerald-400 font-mono text-xs">
            {isMatrixActive ? 'Matrix Rain Deactivated.' : 'Matrix Rain Activated.'}
          </p>
        );
        break;

      case 'arcade':
      case 'play':
      case 'game':
        if (onOpenArcade) {
          onOpenArcade();
          resultNode = (
            <p className="text-emerald-400 font-mono text-xs">
              🕹️ Launching CYBER-RUNNER 1984 Vector Arcade ROM... [INITIALIZED]
            </p>
          );
        } else {
          resultNode = (
            <p className="text-emerald-400 font-mono text-xs">
              Arcade available in the floating launcher bar.
            </p>
          );
        }
        break;

      case 'reboot':
      case 'restart':
        if (onReboot) {
          onClose();
          onReboot();
          return;
        } else {
          resultNode = (
            <p className="text-emerald-400 font-mono text-xs">
              Rebooting workstation shell... [OK]
            </p>
          );
        }
        break;

      case 'degauss':
        retroAudio.playDegaussCoil();
        if (onDegauss) onDegauss();
        resultNode = (
          <p className="text-cyan-400 font-mono text-xs">
            🧲 CRT Magnetic Coil Discharged. Electron Beam Degaussed. [NOMINAL]
          </p>
        );
        break;

      case 'htop':
      case 'top':
        resultNode = (
          <div className="p-3 bg-black/80 rounded border border-slate-800 font-mono text-[11px] space-y-2 text-slate-300">
            <div className="flex justify-between border-b border-slate-800 pb-1 text-slate-400">
              <span>TASKS: 5 RUNNING, 0 SLEEPING</span>
              <span className="text-emerald-400">CPU LOAD: [||||||||....] 48.2%</span>
              <span className="text-cyan-400">MEM: 8.4GB / 16.0GB</span>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-500 border-b border-slate-800">
                  <th className="pb-1">PID</th>
                  <th className="pb-1">PROCESS</th>
                  <th className="pb-1">STATUS</th>
                  <th className="pb-1">CPU%</th>
                  <th className="pb-1">MEMORY</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900">
                <tr>
                  <td className="text-slate-400 py-1">101</td>
                  <td className="text-emerald-400 font-bold">ghar-search-langgraph</td>
                  <td className="text-emerald-500">6_WORKERS_ACTIVE</td>
                  <td className="text-white">24.5%</td>
                  <td className="text-slate-400">1.5L RERA RECS</td>
                </tr>
                <tr>
                  <td className="text-slate-400 py-1">102</td>
                  <td className="text-cyan-400 font-bold">cloudops-sre-swarm</td>
                  <td className="text-cyan-500">28s_MTTD_MONITOR</td>
                  <td className="text-white">12.1%</td>
                  <td className="text-slate-400">CLOUDWATCH_INS</td>
                </tr>
                <tr>
                  <td className="text-slate-400 py-1">103</td>
                  <td className="text-purple-400 font-bold">forkfix-nemotron</td>
                  <td className="text-purple-500">4_SANDBOXES</td>
                  <td className="text-white">8.6%</td>
                  <td className="text-slate-400">DOCKER_ISOLATED</td>
                </tr>
                <tr>
                  <td className="text-slate-400 py-1">104</td>
                  <td className="text-amber-400 font-bold">retro-audio-synth</td>
                  <td className="text-amber-500">PROCEDURAL_0KB</td>
                  <td className="text-white">1.8%</td>
                  <td className="text-slate-400">WEB_AUDIO_CTX</td>
                </tr>
                <tr>
                  <td className="text-slate-400 py-1">105</td>
                  <td className="text-slate-300 font-bold">vector-crt-display</td>
                  <td className="text-slate-400">60_FPS_VSYNC</td>
                  <td className="text-white">1.2%</td>
                  <td className="text-slate-400">HARDWARE_ACCEL</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
        break;

      case 'aws s3 ls':
      case 'aws s3':
        resultNode = (
          <div className="font-mono text-xs space-y-1 text-slate-300">
            <p className="text-slate-500">$ aws s3 ls</p>
            <p><span className="text-slate-500">2026-11-01 09:30:15</span> <span className="text-cyan-400 font-bold">s3://farhan-ghar-search-dossiers</span></p>
            <p><span className="text-slate-500">2026-11-01 14:15:22</span> <span className="text-emerald-400 font-bold">s3://cloudops-swarm-telemetry-dumps</span></p>
            <p><span className="text-slate-500">2026-11-02 18:45:00</span> <span className="text-amber-400 font-bold">s3://ecoroute-ev-map-tiles</span></p>
            <p><span className="text-slate-500">2026-11-03 12:00:00</span> <span className="text-purple-400 font-bold">s3://farhan-workstation-cdk-synthesizer</span></p>
            <p className="text-[11px] text-slate-500 mt-1">4 buckets queried across AWS region us-east-1 (All public endpoints secured).</p>
          </div>
        );
        break;

      case 'aws sts get-caller-identity':
      case 'aws whoami':
        resultNode = (
          <div className="font-mono text-xs text-slate-300 bg-black/80 p-3 rounded border border-slate-800">
            <p className="text-slate-500">$ aws sts get-caller-identity</p>
            <pre className="text-emerald-400 text-[11px] mt-1">
{JSON.stringify(
  {
    UserId: 'AIDA_FARHAN_MALLIK_BUILDER',
    Account: '891024567890',
    Arn: 'arn:aws:iam::891024567890:user/farhan-mallik',
    Role: 'Campus Lead 2026 // AI-Native Full-Stack Architect',
    Region: 'us-east-1',
  },
  null,
  2
)}
            </pre>
          </div>
        );
        break;

      case 'whoami':
        resultNode = (
          <div className="font-mono text-xs text-slate-300 space-y-1">
            <p><strong className="text-white">FARHAN MALLIK</strong> (farhanmallick2005@gmail.com)</p>
            <p className="text-slate-400">Undergraduate B.Tech CSE &amp; IT ('28) • KCC ITM, Greater Noida</p>
            <p className="text-amber-400">Campus Lead 2026 (Open Source Connect Global) • 2x Hackathon Finalist</p>
            <p className="text-emerald-400">Kestra SCSS Contributor • SlothOps Gemma 2 Architect</p>
          </div>
        );
        break;

      case 'uptime':
        resultNode = (
          <p className="text-emerald-400 font-mono text-xs">
            FM-OS Workstation Kernel 4.2 up 42 days, 13:37, 1 active operator, load: 0.12, 0.08, 0.05
          </p>
        );
        break;

      case 'clear':
        setOutputs([]);
        setInput('');
        return;

      default:
        resultNode = (
          <p className="text-rose-400 text-xs">
            Command not recognized: <span className="font-mono">{rawCommand}</span>. Type <span className="font-mono text-amber-400">help</span> for available commands.
          </p>
        );
    }
  }

    setOutputs((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        command: rawCommand,
        output: resultNode,
      },
    ]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      if (history.length > 0) {
        const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIndex !== -1) {
        const nextIndex = historyIndex + 1;
        if (nextIndex >= history.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(nextIndex);
          setInput(history[nextIndex]);
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const commands = ['help', 'bio', 'skills', 'projects', 'aws', 'sudo hire', 'matrix', 'clear'];
      const match = commands.find((c) => c.startsWith(input.trim().toLowerCase()));
      if (match) setInput(match);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050811]/85 backdrop-blur-xl animate-in fade-in duration-200">
      {/* Double Bezel Outer Frame */}
      <div className="relative w-full max-w-3xl p-2 rounded-[2rem] bg-white/[0.04] ring-1 ring-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.8)] font-mono text-xs flex flex-col h-[540px] max-h-[85vh]">
        {/* Double Bezel Inner Core */}
        <div className="rounded-[calc(2rem-0.5rem)] bg-[#0c1222] border border-white/5 flex flex-col flex-1 overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.14)]">
          {/* Acrylic Title Bar with macOS Traffic Lights */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-white/[0.03] border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <button onClick={onClose} className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-400 transition-colors" />
                <button onClick={onClose} className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-400 transition-colors" />
                <button onClick={onClose} className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-400 transition-colors" />
              </div>
              <div className="flex items-center gap-2 pl-2">
                <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-semibold text-slate-200 text-[11px]">student@aws-amplify-edge:~</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-cyan-400/80 font-mono">zsh • utf-8</span>
            </div>
          </div>

        {/* Terminal Screen */}
        <div
          className={`flex-1 p-5 overflow-y-auto space-y-3 cursor-text ${
            isMatrixActive ? 'bg-black text-emerald-400' : 'bg-slate-950'
          }`}
          onClick={() => inputRef.current?.focus()}
        >
          {outputs.map((item) => (
            <div key={item.id} className="space-y-1">
              <div className="flex items-center gap-2 text-slate-500">
                <span className="text-cyan-400">visitor@aws-portfolio:~$</span>
                <span className="text-white font-bold">{item.command}</span>
              </div>
              <div>{item.output}</div>
            </div>
          ))}

          {/* Active Input Line */}
          <div className="flex items-center gap-2 text-slate-400 pt-1">
            <span className="text-cyan-400">visitor@aws-portfolio:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-white outline-none caret-cyan-400"
              autoFocus
              spellCheck={false}
            />
          </div>
          <div ref={bottomRef} />
        </div>

        {/* Bottom Help Ribbon */}
        <div className="px-5 py-2.5 bg-white/[0.03] border-t border-white/10 text-[11px] text-slate-400 flex items-center justify-between shrink-0 font-mono">
          <span>Tip: Press <kbd className="px-2 py-0.5 rounded bg-white/[0.08] text-cyan-300 border border-white/10">Tab</kbd> to autocomplete</span>
          <span className="text-cyan-400 font-semibold">Superpower CLI Active</span>
        </div>
      </div>
    </div>
  </div>
);
};

