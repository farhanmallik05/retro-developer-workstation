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
  'What was your hardest cloud bug and how did you fix it?',
  'Why do you prefer AWS serverless architectures?',
  'How did you build EcoRoute on Amazon Location Service?',
  'What are your internship goals for Summer 2027?',
];

const PRESET_ANSWERS: Record<string, string> = {
  'What was your hardest cloud bug and how did you fix it?':
    'My toughest bug occurred in an event-driven Lambda pipeline where a downstream API began rate-limiting requests. Because our retry policy was unthrottled, thousands of invocations retried simultaneously, creating a self-inflicted Thundering Herd DDoS. I solved it by implementing exponential backoff with full jitter and configuring an SQS Dead Letter Queue (DLQ) with an automated circuit breaker.',
  
  'Why do you prefer AWS serverless architectures?':
    'Serverless forces disciplined systems thinking. Instead of maintaining persistent VM idle states and patching operating systems, serverless aligns cost directly with business value ($0 when idle). Primitives like AWS Lambda, DynamoDB, and EventBridge let engineers focus on domain business logic and fault-tolerant event contracts.',
  
  'How did you build EcoRoute on Amazon Location Service?':
    'EcoRoute ingests 45,000+ alternative fueling stations from open government feeds into GeoJSON. We use MapLibre GL JS client-side clustering for 60 FPS rendering, authenticated via Amazon Cognito Identity Pools. Route polyline coordinates are computed by Amazon Location Service Route Calculator and buffered with Turf.js to highlight chargers directly along the travel corridor.',
  
  'What are your internship goals for Summer 2027?':
    'I want to join a world-class infrastructure or SRE team where I can work on high-scale distributed systems, latency reduction, and autonomous reliability tooling. I thrive in environments that value deep technical rigor, automated testing, and blameless post-mortem culture.',
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
      <div className="relative w-full max-w-xl rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl flex flex-col h-[560px] text-xs">
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

