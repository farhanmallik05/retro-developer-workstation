import React, { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'hero', code: '01_INIT', label: 'BOOT_SECTOR' },
  { id: 'dossiers', code: '02_DOSSIERS', label: 'PROJECT_ARCHIVES' },
  { id: 'sandbox', code: '03_SANDBOX', label: 'CLOUD_CAD_MODELER' },
  { id: 'stack', code: '04_CHIPSET', label: 'SILICON_STACK' },
  { id: 'certifications', code: '05_OPEN_SOURCE', label: 'OSS_&_HONORS' },
  { id: 'about', code: '06_BIO', label: 'OPERATOR_DOSSIER' },
  { id: 'contact', code: '07_TRANSMIT', label: 'SUB_SPACE_COMMS' },
];

interface ScrollTelemetryHudProps {
  onSectorChange?: (sectorId: string) => void;
}

export const ScrollTelemetryHud: React.FC<ScrollTelemetryHudProps> = ({ onSectorChange }) => {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [activeSector, setActiveSector] = useState(SECTIONS[0]);
  const [hexOffset, setHexOffset] = useState('0x0000');

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const rawPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
          const clampedPercent = Math.min(Math.max(Math.round(rawPercent), 0), 100);

          setScrollPercent(clampedPercent);

          // Calculate hex memory offset (0x0000 to 0xFFFF)
          const offsetValue = Math.floor((clampedPercent / 100) * 0xffff);
          setHexOffset(`0x${offsetValue.toString(16).toUpperCase().padStart(4, '0')}`);

          // Determine current section in viewport
          const scrollPosition = scrollTop + window.innerHeight * 0.35;
          let currentSector = SECTIONS[0];

          for (const sec of SECTIONS) {
            const el = document.getElementById(sec.id);
            if (el) {
              const top = el.offsetTop;
              const height = el.offsetHeight;
              if (scrollPosition >= top && scrollPosition < top + height) {
                currentSector = sec;
                break;
              } else if (scrollPosition >= top) {
                currentSector = sec;
              }
            }
          }

          setActiveSector((prev) => {
            if (prev.id !== currentSector.id) {
              if (onSectorChange) onSectorChange(currentSector.id);
              return currentSector;
            }
            return prev;
          });

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [onSectorChange]);

  return (
    <div className="w-full bg-[#070b14]/95 border-t border-slate-800/80 text-[10px] font-mono select-none">
      {/* Telemetry Readout Strip */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-1 flex items-center justify-between text-slate-400">
        <div className="flex items-center gap-2 sm:gap-3 truncate">
          <span className="flex items-center gap-1.5 text-emerald-400 font-bold shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-phosphor-pulse shrink-0" />
            <span>SECTOR: [{activeSector.code}]</span>
          </span>
          <span className="hidden sm:inline text-slate-600">//</span>
          <span className="hidden sm:inline text-slate-300 font-bold truncate">{activeSector.label}</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 font-mono shrink-0">
          <span className="text-slate-500 hidden md:inline">
            MEM_LOC: <strong className="text-cyan-400 font-bold">{hexOffset}</strong>
          </span>
          <span className="text-slate-600 hidden md:inline">|</span>
          <span className="text-slate-400 text-[9px] sm:text-[10px] whitespace-nowrap">
            SCROLL: <strong className="text-emerald-400 font-bold">{scrollPercent}%</strong>
          </span>
        </div>
      </div>

      {/* Laser Progress Track Line */}
      <div className="w-full h-[2px] bg-slate-900 overflow-hidden">
        <div
          className="h-full laser-progress-bar transition-all duration-150 ease-out"
          style={{ width: `${scrollPercent}%` }}
        />
      </div>
    </div>
  );
};

