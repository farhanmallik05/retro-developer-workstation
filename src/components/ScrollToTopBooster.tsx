import React, { useEffect, useState } from 'react';
import { ArrowUp, Terminal } from 'lucide-react';

export const ScrollToTopBooster: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();

    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    const heroEl = document.getElementById('hero');
    if (heroEl) {
      heroEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-40 animate-in fade-in duration-300">
      <button
        onClick={scrollToTop}
        className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#0b101c]/95 border border-emerald-500/40 text-emerald-400 hover:text-white hover:bg-emerald-950/80 hover:border-emerald-400 shadow-2xl backdrop-blur-md text-xs font-mono transition-all duration-200 group glitch-hover"
        title="Re-engage Boot Sector (Scroll to Top)"
      >
        <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform text-emerald-400" />
        <span className="font-bold tracking-wider">[ ^ BOOT_SECTOR ]</span>
      </button>
    </div>
  );
};
