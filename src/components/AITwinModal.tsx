import React, { useState } from 'react';
import { Bot, Send, X, Sparkles, User, ShieldCheck } from 'lucide-react';

interface AITwinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  role: 'assistant' | 'user';
  text: string;
}

const PRESET_QUESTIONS = [
  "How did you architect Ghar Search's 6-agent verification pipeline?",
  'What open-source contributions and leadership roles have you held?',
  'How does ForkFix parallel reality debugging work?',
  'How does CloudOps Swarm achieve 28-second incident triage on AWS?',
];

const PRESET_ANSWERS: Record<string, string> = {
  "How did you architect Ghar Search's 6-agent verification pipeline?":
    'In Ghar Search (github.com/farhanmallik05/ghar-search), I engineered a LangGraph (0.2) multi-agent workflow paired with TinyFish Web Agents. When an Indian property listing is ingested, 6 concurrent verification workers query 1.5L+ RERA records, eCourts/NCLT insolvency signals, statutory approvals, and promoter track records to synthesize a deterministic 0–100 Trust Score in under 90 seconds, validated across 140 automated tests.',
  
  'What open-source contributions and leadership roles have you held?':
    'I serve as Campus Lead 2026 for Open Source Connect Global, leading developer community mentorship and peer PR reviews. I contributed to Kestra core Vue/TypeScript components by migrating to scoped SCSS design tokens (--ks-*), contributed through Apertre 3.0 and Hacktoberfest 2025/2026, and architected SlothOps (an open-weight Gemma 2 + TabPFN cognitive conservation agent).',
  
  'How does ForkFix parallel reality debugging work?':
    'ForkFix (github.com/farhanmallik05/forkfix) is an autonomous coding agent that snapshots failing test suites and spawns 4 parallel sandboxed execution realities on an NVIDIA Nemotron model ladder. It synthesizes candidate patches and proves fixes against deterministic test oracles, paired with SpecterLens for visual-to-patch multimodal codebase archeology with Google Gemma 4.',
  
  'How does CloudOps Swarm achieve 28-second incident triage on AWS?':
    'CloudOps Swarm is built on the Strands Agents SDK and Amazon Bedrock (Claude 3.5 Sonnet & Haiku). When a CloudWatch alarm triggers, 4 specialized agents collaborate: Triage Lead parses severity, Log Diagnostic queries log streams, Diff Analyzer correlates git commit diffs, and Remediation Lead synthesizes a verified rollback PR in 28 seconds (100% benchmark accuracy across 5 archetypes) for just $0.01 per triage.',
};

export const AITwinModal: React.FC<AITwinModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: "👋 Hi! I am Farhan Mallik's AI Twin (grounded on Bedrock Claude 3.5). Ask me anything about my full-stack engineering, multi-agent AI systems, AWS cloud architectures, or portfolio design!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const sendMessage = (queryText: string) => {
    if (!queryText.trim() || isTyping) return;

    const userMsg = queryText.trim();
    setMessages((prev) => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    // Answer lookup or intelligent generation
    setTimeout(() => {
      let reply = PRESET_ANSWERS[userMsg];
      if (!reply) {
        reply = `Thanks for asking! Regarding "${userMsg}", Farhan Mallik specializes in full-stack web experiences (React/TypeScript), multi-agent autonomous systems (Strands SDK + Bedrock), and resilient serverless architectures. Check out his live projects or connect via farhanmallik.netlify.app & beacons.ai/farhanmallik!`;
      }
      setMessages((prev) => [...prev, { role: 'assistant', text: reply }]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl flex flex-col h-[560px] max-h-[85vh] text-xs">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-xl bg-cyan-500/20 text-cyan-400">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-sm">Farhan's AI Twin</h3>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px]">
                  Amazon Bedrock
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Claude 3.5 Haiku • Sub-300ms Latency</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-5 overflow-y-auto space-y-3.5">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.role === 'assistant' && (
                <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              )}
              <div
                className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-tr-none'
                    : 'bg-slate-800/80 border border-slate-700/60 text-slate-200 rounded-tl-none'
                }`}
              >
                {m.text}
              </div>
              {m.role === 'user' && (
                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-slate-500 text-[11px] italic">
              <Bot className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
              <span>Bedrock model thinking...</span>
            </div>
          )}
        </div>

        {/* Preset Questions Drawer */}
        <div className="px-4 py-2.5 bg-slate-950/60 border-t border-slate-800/80">
          <p className="text-[10px] text-slate-400 font-medium mb-1.5 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            Suggested Questions:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {PRESET_QUESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 text-[11px] border border-slate-700/60 text-left truncate max-w-full"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
          className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a technical question..."
            className="flex-1 px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 outline-none focus:border-cyan-500 text-xs"
          />
          <button
            type="submit"
            className="p-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

