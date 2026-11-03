import React, { useEffect, useRef } from 'react';
import { Target, Zap, Shield, Sparkles } from 'lucide-react';
import { JumpAnimationMode } from '../utils/navigationEffects';

interface SectorJumpOverlayProps {
  isJumping: boolean;
  jumpMode: Exclude<JumpAnimationMode, 'RANDOM'>;
  targetSector: string;
}

export const SectorJumpOverlay: React.FC<SectorJumpOverlayProps> = ({
  isJumping,
  jumpMode,
  targetSector,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    if (!isJumping) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions to viewport
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let frame = 0;
    const maxFrames = 28; // ~450ms at 60fps

    // Pre-initialize particles for performance
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: 15 + Math.random() * 25,
      length: 40 + Math.random() * 80,
      size: 1 + Math.random() * 2.5,
      color: Math.random() > 0.4 ? '#10b981' : '#06b6d4',
    }));

    // Matrix characters
    const matrixChars = '0123456789ABCDEFΣΩΨλπ><#&';
    const matrixColumns = Math.floor(canvas.width / 20);
    const matrixDrops = Array.from({ length: matrixColumns }, () => Math.random() * -50);

    const render = () => {
      frame++;
      const progress = frame / maxFrames;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (jumpMode === 'WARP_SPEED') {
        // Hyperspace Vector Streaks
        ctx.fillStyle = `rgba(8, 12, 20, ${0.4 + Math.sin(progress * Math.PI) * 0.4})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p) => {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x, p.y + p.length);
          ctx.strokeStyle = p.color;
          ctx.lineWidth = p.size;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 8;
          ctx.stroke();

          p.y += p.speed;
          if (p.y > canvas.height) p.y = -p.length;
        });
      } else if (jumpMode === 'CRT_DEGAUSS') {
        // Electromagnetic Degauss Pulse
        const flashIntensity = Math.sin(progress * Math.PI);
        ctx.fillStyle = `rgba(16, 185, 129, ${flashIntensity * 0.25})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Center collapsing horizontal slit
        const slitHeight = Math.max(2, (1 - progress) * (canvas.height / 2));
        ctx.fillStyle = `rgba(255, 255, 255, ${flashIntensity * 0.7})`;
        ctx.shadowColor = '#10b981';
        ctx.shadowBlur = 20;
        ctx.fillRect(0, canvas.height / 2 - slitHeight / 2, canvas.width, slitHeight);

        // Magnetic distortion ring
        ctx.strokeStyle = `rgba(6, 182, 212, ${flashIntensity * 0.6})`;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, progress * (canvas.width / 1.5), 0, Math.PI * 2);
        ctx.stroke();
      } else if (jumpMode === 'MATRIX_SHUTTER') {
        // Cascading Matrix Code Glitch
        ctx.fillStyle = 'rgba(7, 11, 20, 0.45)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = '14px monospace';
        matrixDrops.forEach((y, i) => {
          const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
          const x = i * 20;
          ctx.fillStyle = Math.random() > 0.8 ? '#ffffff' : '#10b981';
          ctx.shadowColor = '#10b981';
          ctx.shadowBlur = 6;
          ctx.fillText(char, x, y);

          matrixDrops[i] += 25;
        });
      } else if (jumpMode === 'QUANTUM_TUNNEL') {
        // Expanding 3D Vector Wireframe Zoom
        ctx.fillStyle = 'rgba(8, 12, 20, 0.4)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const numRings = 7;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        for (let i = 0; i < numRings; i++) {
          const ringProgress = ((frame * 2 + i * 8) % 40) / 40;
          const w = ringProgress * canvas.width * 1.2;
          const h = ringProgress * canvas.height * 1.2;

          ctx.strokeStyle = i % 2 === 0 ? '#10b981' : '#06b6d4';
          ctx.lineWidth = 2;
          ctx.shadowColor = ctx.strokeStyle;
          ctx.shadowBlur = 10;
          ctx.strokeRect(centerX - w / 2, centerY - h / 2, w, h);

          // Diagonal corner lines to center
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(centerX - w / 2, centerY - h / 2);
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(centerX + w / 2, centerY - h / 2);
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(centerX - w / 2, centerY + h / 2);
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(centerX + w / 2, centerY + h / 2);
          ctx.strokeStyle = 'rgba(16, 185, 129, 0.2)';
          ctx.stroke();
        }
      }

      if (frame < maxFrames) {
        animFrameRef.current = requestAnimationFrame(render);
      }
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [isJumping, jumpMode]);

  if (!isJumping) return null;

  return (
    <div className="fixed inset-0 z-[99999] pointer-events-none flex flex-col items-center justify-center">
      {/* Dynamic Visual FX Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Target Sector Locked HUD Beacon */}
      <div className="relative z-10 px-6 py-2.5 rounded bg-black/90 border-2 border-emerald-400 font-mono shadow-[0_0_35px_rgba(16,185,129,0.8)] animate-pulse flex items-center gap-3">
        <Target className="w-5 h-5 text-emerald-400 animate-spin" />
        <div className="leading-tight">
          <div className="text-[10px] text-emerald-500 font-bold tracking-widest uppercase">
            VECTOR TRANSIT // {jumpMode}
          </div>
          <div className="text-sm font-bold text-white tracking-wider flex items-center gap-2">
            <span>TARGET ACQUIRED:</span>
            <span className="text-emerald-400">[{targetSector.toUpperCase()}]</span>
          </div>
        </div>
      </div>
    </div>
  );
};

