import React, { useState, useEffect } from 'react';
import { Search, Terminal, Layers, Bot, Mail, Award, FolderGit2, X, Sparkles } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTerminal: () => void;
  onOpenSandbox: () => void;
  onOpenAiTwin: () => void;
  onOpenContact: () => void;
  onOpenQuiz?: () => void;
  onOpenArcade?: () => void;
  onReboot?: () => void;
  onNavigateSection: (sectionId: string) => void;
}

interface CommandAction {
  id: string;
  title: string;
  subtitle: string;
  category: 'Superpower' | 'Navigation' | 'Contact';
  icon: React.ReactNode;
  run: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenTerminal,
  onOpenSandbox,
  onOpenAiTwin,
  onOpenContact,
  onOpenQuiz,
  onOpenArcade,
  onReboot,
  onNavigateSection,
}) => {
  const [query, setQuery] = useState('');

  // Keyboard shortcut listener for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Parent handles opening
        }
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions: CommandAction[] = [
    {
      id: 'cmd-reboot',
      title: 'Reboot Workstation (BIOS POST Screen)',
      subtitle: 'Simulate full hardware POST test, memory check, and audio boot chime',
      category: 'Superpower',
      icon: <Terminal className="w-4 h-4 text-rose-400" />,
      run: () => {
        onClose();
        if (onReboot) onReboot();
      },
    },
    {
      id: 'cmd-arcade',
      title: 'Play CYBER-RUNNER 1984 Arcade ROM',
      subtitle: '2D vector arcade minigame: collect packets, destroy bugs, seize overdrive shield',
      category: 'Superpower',
      icon: <Sparkles className="w-4 h-4 text-emerald-400" />,
      run: () => {
        onClose();
        if (onOpenArcade) onOpenArcade();
      },
    },
    {
      id: 'cmd-terminal',
      title: 'Open Interactive Terminal CLI',
      subtitle: 'Run `sudo hire farhan`, `skills`, `aws sts`, and easter eggs',
      category: 'Superpower',
      icon: <Terminal className="w-4 h-4 text-emerald-400" />,
      run: () => {
        onClose();
        onOpenTerminal();
      },
    },
    {
      id: 'cmd-sandbox',
      title: 'Launch Cloud Architecture Sandbox',
      subtitle: 'Design blueprints, calculate monthly costs, export AWS CDK v2',
      category: 'Superpower',
      icon: <Layers className="w-4 h-4 text-cyan-400" />,
      run: () => {
        onClose();
        onOpenSandbox();
      },
    },
    {
      id: 'cmd-aitwin',
      title: 'Chat with Bedrock Claude AI Twin',
      subtitle: 'Converse with grounded digital avatar about cloud projects',
      category: 'Superpower',
      icon: <Bot className="w-4 h-4 text-purple-400" />,
      run: () => {
        onClose();
        onOpenAiTwin();
      },
    },
    {
      id: 'cmd-projects',
      title: 'Jump to Featured AWS Projects',
      subtitle: 'EcoRoute EV Navigator, Strands SRE Swarm, and Serverless Apps',
      category: 'Navigation',
      icon: <FolderGit2 className="w-4 h-4 text-amber-400" />,
      run: () => {
        onClose();
        onNavigateSection('projects');
      },
    },
    {
      id: 'cmd-certs',
      title: 'View Open Source Leadership & Honors',
      subtitle: 'Campus Lead 2026, Apertre 3.0 & Hacktoberfest, 2x Hackathon Finalist',
      category: 'Navigation',
      icon: <Award className="w-4 h-4 text-emerald-400" />,
      run: () => {
        onClose();
        onNavigateSection('certifications');
      },
    },
    {
      id: 'cmd-quiz',
      title: 'Take AWS Knowledge Challenge (Quiz)',
      subtitle: 'Test Solutions Architect & AI Practitioner exam scenarios',
      category: 'Superpower',
      icon: <Sparkles className="w-4 h-4 text-amber-400" />,
      run: () => {
        onClose();
        if (onOpenQuiz) onOpenQuiz();
      },
    },
    {
      id: 'cmd-contact',
      title: 'Send Direct Message (DynamoDB Dispatch)',
      subtitle: 'Drop an opportunity message with email regex validation',
      category: 'Contact',
      icon: <Mail className="w-4 h-4 text-pink-400" />,
      run: () => {
        onClose();
        onOpenContact();
      },
    },
  ];

  const filteredActions = actions.filter((act) =>
    act.title.toLowerCase().includes(query.toLowerCase()) ||
    act.subtitle.toLowerCase().includes(query.toLowerCase()) ||
    act.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg rounded-2xl overflow-hidden border border-slate-700 bg-slate-900 shadow-2xl text-xs text-slate-200">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-800 bg-slate-900/90">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or jump to section... (Esc to close)"
            autoFocus
            className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none font-medium"
          />
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Command List */}
        <div className="max-h-72 overflow-y-auto p-2 space-y-1">
          {filteredActions.length === 0 ? (
            <div className="p-6 text-center text-slate-500">
              No matching commands found for "{query}".
            </div>
          ) : (
            filteredActions.map((act) => (
              <button
                key={act.id}
                onClick={act.run}
                className="w-full p-2.5 rounded-xl hover:bg-slate-800/80 text-left flex items-center justify-between group transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-800 border border-slate-700 group-hover:border-slate-600">
                    {act.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-100 group-hover:text-cyan-400 transition-colors">
                      {act.title}
                    </p>
                    <p className="text-[11px] text-slate-400 truncate max-w-xs">{act.subtitle}</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 border border-slate-700">
                  {act.category}
                </span>
              </button>
            ))
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-[10px] text-slate-500 font-mono">
          <span>Navigation: ↑ ↓ Enter</span>
          <span>Press ESC to exit</span>
        </div>
      </div>
    </div>
  );
};
