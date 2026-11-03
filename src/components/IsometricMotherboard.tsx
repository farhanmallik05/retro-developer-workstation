import React, { useState } from 'react';
import { Cpu, Layers, Activity, Radio, Sparkles, CheckCircle2, Sliders, ToggleLeft, ToggleRight } from 'lucide-react';
import { retroAudio } from '../utils/retroAudio';

interface ChipsetModule {
  id: string;
  code: string;
  title: string;
  busWidth: string;
  voltage: string;
  clockSpeed: string;
  icon: string;
  color: string;
  borderColor: string;
  glowColor: string;
  pins: { pin: string; name: string; signal: string }[];
}

const CHIPSET_DATA: ChipsetModule[] = [
  {
    id: 'chip-ai',
    code: 'IC-8086-AI',
    title: 'AGENTIC_AI_PLATFORMS',
    busWidth: '256-BIT TENSOR',
    voltage: '1.2V CORE',
    clockSpeed: '3.4 GHz BOOST',
    icon: '⚡',
    color: 'text-purple-400',
    borderColor: 'border-purple-500/50',
    glowColor: 'shadow-[0_0_25px_rgba(168,85,247,0.3)]',
    pins: [
      { pin: 'P01', name: 'LangGraph (0.2)', signal: 'STATE_GRAPH_MULTI_AGENT' },
      { pin: 'P02', name: 'Google Gemma 4 & 2', signal: 'OPEN_WEIGHT_INFERENCE' },
      { pin: 'P03', name: 'NVIDIA Nemotron', signal: 'PARALLEL_DEBUGGING' },
      { pin: 'P04', name: 'TinyFish Web Agents', signal: 'AUTONOMOUS_EXTRACTION' },
      { pin: 'P05', name: 'Prompt Engineering', signal: 'ZERO_SHOT_GUARDRAIL' },
      { pin: 'P06', name: 'Ollama Local Runtime', signal: 'Q4_QUANTIZED_CORE' },
      { pin: 'P07', name: 'Strands Agents SDK', signal: 'SRE_INCIDENT_SWARM' },
      { pin: 'P08', name: 'Amazon Bedrock Claude', signal: 'SONNET_3.5_REASONING' },
    ],
  },
  {
    id: 'chip-frontend',
    code: 'IC-68000-UI',
    title: 'FRONTEND_&_DESIGN_SYSTEMS',
    busWidth: '128-BIT SHADER',
    voltage: '3.3V I/O',
    clockSpeed: '120 Hz REFRESH',
    icon: '✨',
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/50',
    glowColor: 'shadow-[0_0_25px_rgba(6,182,212,0.3)]',
    pins: [
      { pin: 'P09', name: 'Next.js 14 (App Router)', signal: 'SSR_EDGE_HYDRATION' },
      { pin: 'P10', name: 'React 18 & Virtual DOM', signal: 'CONCURRENT_RENDERER' },
      { pin: 'P11', name: 'TypeScript 5.6', signal: 'STRICT_TYPE_SAFETY' },
      { pin: 'P12', name: 'Tailwind CSS 3.4', signal: 'JIT_DESIGN_TOKENS' },
      { pin: 'P13', name: 'Framer Motion & GSAP', signal: 'HARDWARE_TWEENING' },
      { pin: 'P14', name: 'Web Audio API', signal: 'SYNTH_DSP_ENGINE' },
      { pin: 'P15', name: 'Canvas 2D / WebGL', signal: 'VECTOR_RASTERIZER' },
      { pin: 'P16', name: 'Lucide Iconography', signal: 'VECTOR_SPRITES' },
    ],
  },
  {
    id: 'chip-cloud',
    code: 'IC-Z80-CLOUD',
    title: 'CLOUD_&_CONTAINER_RUNTIME',
    busWidth: '64-BIT PCI-E',
    voltage: '5.0V SUPPLY',
    clockSpeed: '99.99% SLA',
    icon: '☁️',
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/50',
    glowColor: 'shadow-[0_0_25px_rgba(16,185,129,0.3)]',
    pins: [
      { pin: 'P17', name: 'AWS CDK v2 (TypeScript)', signal: 'IAC_SYNTHESIZER' },
      { pin: 'P18', name: 'Docker & Compose', signal: 'CONTAINER_SANDBOX' },
      { pin: 'P19', name: 'Amazon CloudFront & S3', signal: 'SUB_50MS_EDGE_CACHE' },
      { pin: 'P20', name: 'Amazon DynamoDB', signal: 'SINGLE_DIGIT_MS_KEYVAL' },
      { pin: 'P21', name: 'Amazon SQS & DLQ', signal: 'FAULT_TOLERANT_QUEUE' },
      { pin: 'P22', name: 'Amazon Bedrock Guardrails', signal: 'PII_REDACT_POLICIES' },
      { pin: 'P23', name: 'GitHub Actions CI/CD', signal: 'AUTOMATED_TEST_RUNNER' },
      { pin: 'P24', name: 'CloudWatch Insights', signal: 'LOG_STREAM_TELEMETRY' },
    ],
  },
  {
    id: 'chip-lang',
    code: 'IC-6502-SYS',
    title: 'LANGUAGES_&_DATA_CORE',
    busWidth: '64-BIT SYSTEM',
    voltage: '1.8V LOGIC',
    clockSpeed: 'O(1) ACCESS',
    icon: '⚙️',
    color: 'text-amber-400',
    borderColor: 'border-amber-500/50',
    glowColor: 'shadow-[0_0_25px_rgba(245,158,11,0.3)]',
    pins: [
      { pin: 'P25', name: 'Python 3.12 (AsyncIO)', signal: 'HIGH_CONCURRENCY_IO' },
      { pin: 'P26', name: 'C / C++ Foundations', signal: 'POINTER_MEMORY_LAYOUT' },
      { pin: 'P27', name: 'FastAPI Microservices', signal: 'PYDANTIC_V2_SCHEMAS' },
      { pin: 'P28', name: 'PostgreSQL & Supabase', signal: 'ROW_LEVEL_SECURITY' },
      { pin: 'P29', name: 'REST & WebSockets', signal: 'BIDIRECTIONAL_STREAM' },
      { pin: 'P30', name: 'OAuth 2.0 & JWT Auth', signal: 'HMAC_CRYPTO_TOKENS' },
      { pin: 'P31', name: 'Data Structures & Algo', signal: 'GRAPH_TREE_SEARCH' },
      { pin: 'P32', name: 'Linux / Unix CLI Shell', signal: 'POSIX_PIPES_GREP' },
    ],
  },
];

export const IsometricMotherboard: React.FC = () => {
  const [isIsometric, setIsIsometric] = useState(true);
  const [selectedChip, setSelectedChip] = useState<ChipsetModule>(CHIPSET_DATA[0]);
  const [probedPin, setProbedPin] = useState<{ pin: string; name: string; signal: string } | null>(
    CHIPSET_DATA[0].pins[0]
  );

  const handleSelectChip = (chip: ChipsetModule) => {
    retroAudio.playHoverBlip();
    setSelectedChip(chip);
    setProbedPin(chip.pins[0]);
  };

  const handleProbePin = (pin: { pin: string; name: string; signal: string }) => {
    retroAudio.playKeyClick();
    setProbedPin(pin);
  };

  return (
    <div className="space-y-6 font-mono text-xs select-none">
      {/* Control Bar: View Perspective Switcher & Logic Probe Readout */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg bg-[#0d121f] border border-slate-800 gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              retroAudio.playHoverBlip();
              setIsIsometric((prev) => !prev);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded border text-xs font-bold transition-all ${
              isIsometric
                ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-300'
                : 'bg-slate-900 border-slate-700 text-slate-300'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            <span>MODE: {isIsometric ? '2.5D_ISOMETRIC_PCB' : '2D_ORTHOGONAL_GRID'}</span>
          </button>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="text-slate-400 text-[11px] hidden sm:inline">
            PROBE_BUS: <strong className="text-cyan-400 font-bold">{selectedChip.code}</strong>
          </span>
        </div>

        {/* Live Logic Probe Readout */}
        {probedPin && (
          <div className="flex items-center gap-2 text-[11px] bg-[#070b14] px-3 py-1 rounded border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-slate-400">PIN:</span>
            <span className="text-emerald-300 font-bold">{probedPin.pin}</span>
            <span className="text-slate-500">//</span>
            <span className="text-white font-bold">{probedPin.name}</span>
            <span className="text-cyan-400 hidden md:inline">[{probedPin.signal}]</span>
          </div>
        )}
      </div>

      {/* Motherboard Chassis Container */}
      <div
        className={`relative w-full rounded-2xl bg-[#060a12] border-2 border-slate-800 p-6 sm:p-8 overflow-hidden transition-all duration-700 ${
          isIsometric
            ? 'shadow-[0_30px_90px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.1)]'
            : 'shadow-xl'
        }`}
        style={
          isIsometric
            ? {
                perspective: '1400px',
                transformStyle: 'preserve-3d',
              }
            : undefined
        }
      >
        {/* PCB Copper Grid Traces Pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(to right, #10b981 1px, transparent 1px), linear-gradient(to bottom, #10b981 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Isometric Rotated Plane */}
        <div
          className="transition-all duration-700 ease-out"
          style={
            isIsometric
              ? {
                  transform: 'rotateX(36deg) rotateZ(-18deg) scale(0.96)',
                  transformStyle: 'preserve-3d',
                }
              : undefined
          }
        >
          {/* Mainboard Label & Telemetry Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-slate-500 text-[11px] mb-6">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold">&gt; FM-SYSTEM-BUS-v4.2</span>
              <span>// REV_D</span>
              <span className="text-amber-400">[ONLINE]</span>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-[10px]">
              <span>IMPEDANCE: 50Ω</span>
              <span>COPPER_WEIGHT: 2OZ</span>
              <span>ROHS_COMPLIANT: YES</span>
            </div>
          </div>

          {/* 4 Silicon Chip Sockets Grid */}
          <div className="grid md:grid-cols-2 gap-6 relative">
            {CHIPSET_DATA.map((chip) => {
              const isSelected = selectedChip.id === chip.id;

              return (
                <div
                  key={chip.id}
                  onClick={() => handleSelectChip(chip)}
                  className={`p-5 rounded-xl bg-[#090e1a]/95 border-2 transition-all duration-300 cursor-pointer relative group ${
                    isSelected
                      ? `${chip.borderColor} ${chip.glowColor} bg-[#0c1322]`
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                  style={
                    isIsometric
                      ? {
                          transform: isSelected ? 'translateZ(30px)' : 'translateZ(10px)',
                          transformStyle: 'preserve-3d',
                        }
                      : undefined
                  }
                >
                  {/* Chip Die Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{chip.icon}</span>
                      <div>
                        <h4 className={`font-bold tracking-wider ${chip.color}`}>{chip.title}</h4>
                        <span className="text-[10px] text-slate-500 font-mono">{chip.code}</span>
                      </div>
                    </div>

                    <div className="text-right text-[10px] text-slate-400 font-mono">
                      <span className="block text-emerald-400 font-bold">{chip.clockSpeed}</span>
                      <span className="text-slate-500">{chip.busWidth}</span>
                    </div>
                  </div>

                  {/* Silicon Pinout Array */}
                  <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-1.5 mt-4">
                    {chip.pins.map((p) => {
                      const isPinActive = probedPin?.pin === p.pin;

                      return (
                        <button
                          key={p.pin}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProbePin(p);
                          }}
                          className={`p-2 rounded border text-left text-[11px] transition-all flex items-center justify-between group/pin ${
                            isPinActive
                              ? 'bg-emerald-950/80 border-emerald-400 text-emerald-200 font-bold shadow-sm'
                              : 'bg-[#050811] border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                          }`}
                        >
                          <div className="flex items-center gap-1.5 truncate">
                            <span className="text-[9px] font-mono text-slate-500 group-hover/pin:text-emerald-400">
                              {p.pin}
                            </span>
                            <span className="truncate">{p.name}</span>
                          </div>
                          {isPinActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Corner Solder Pads */}
                  <div className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-slate-700" />
                  <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-slate-700" />
                  <div className="absolute bottom-1 left-1 w-1.5 h-1.5 rounded-full bg-slate-700" />
                  <div className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-slate-700" />
                </div>
              );
            })}
          </div>

          {/* Bus Wiring Traces Footprint */}
          <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between text-[10px] text-slate-500">
            <span>&gt; INTERCONNECT: COPPER_MICROSTRIP_50Ω</span>
            <span>SIMULATION_ACTIVE: TRUE</span>
            <span className="text-emerald-400 font-bold">TOTAL_REGISTERS: 32 / 32 VERIFIED</span>
          </div>
        </div>
      </div>
    </div>
  );
};
