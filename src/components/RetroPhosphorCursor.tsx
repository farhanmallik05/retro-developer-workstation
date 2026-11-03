import React, { useEffect, useState, useRef } from 'react';
import { prefersReducedMotion } from '../utils/gsapAnimations';

interface Point {
  x: number;
  y: number;
}

export const RetroPhosphorCursor: React.FC = () => {
  const [pos, setPos] = useState<Point>({ x: -100, y: -100 });
  const [trail, setTrail] = useState<Point[]>([]);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState<boolean>(false);
  const [isEnabled, setIsEnabled] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem('fm_tactical_cursor');
    // Default to true on desktop unless user explicitly disabled
    return saved !== 'false';
  });
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);

  const trailRef = useRef<Point[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Detect touch-only devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    if (prefersReducedMotion()) {
      setIsEnabled(false);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const newPoint = { x: e.clientX, y: e.clientY };
      setPos(newPoint);

      trailRef.current.push(newPoint);
      if (trailRef.current.length > 8) {
        trailRef.current.shift();
      }
      setTrail([...trailRef.current]);

      // Check if hovering over clickable or interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = !!target.closest(
          'button, a, input, select, textarea, [role="button"], .glitch-hover, canvas'
        );
        setIsHoveringInteractive(isInteractive);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  if (isTouchDevice || !isEnabled || pos.x < 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[999999] overflow-hidden select-none">
      {/* Phosphor Decay Trail */}
      {trail.map((pt, i) => {
        const opacity = ((i + 1) / trail.length) * 0.35;
        const size = 3 + (i / trail.length) * 3;
        return (
          <div
            key={i}
            className="absolute rounded-full bg-emerald-400 -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${pt.x}px`,
              top: `${pt.y}px`,
              width: `${size}px`,
              height: `${size}px`,
              opacity,
              filter: 'blur(1px)',
            }}
          />
        );
      })}

      {/* Main Vector Reticle Cursor */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
        }}
      >
        <div
          className={`relative transition-all duration-150 ${
            isHoveringInteractive ? 'scale-125' : 'scale-100'
          }`}
        >
          {/* Outer Reticle Ring */}
          <div
            className={`w-7 h-7 rounded-full border transition-colors ${
              isHoveringInteractive
                ? 'border-amber-400 bg-amber-400/10 shadow-[0_0_12px_rgba(245,158,11,0.6)]'
                : 'border-emerald-400/80 shadow-[0_0_10px_rgba(16,185,129,0.5)]'
            }`}
          />

          {/* Crosshair Tick Marks */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-[1.5px] h-2 bg-emerald-400" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 w-[1.5px] h-2 bg-emerald-400" />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 h-[1.5px] w-2 bg-emerald-400" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 h-[1.5px] w-2 bg-emerald-400" />

          {/* Center Point */}
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full ${
              isHoveringInteractive ? 'bg-amber-400' : 'bg-emerald-400'
            }`}
          />

          {/* Real-Time Coordinate Telemetry Label */}
          <div className="absolute top-7 left-3 text-[9px] font-mono tracking-tighter text-emerald-500 whitespace-nowrap bg-black/75 px-1 py-0.5 rounded border border-emerald-900/60">
            {pos.x}:{pos.y}
          </div>
        </div>
      </div>
    </div>
  );
};
