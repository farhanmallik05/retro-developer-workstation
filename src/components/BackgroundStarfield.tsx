import React, { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../utils/gsapAnimations';

interface Star {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  twinkleSpeed: number;
  vx: number;
  vy: number;
  color: string;
}

export const BackgroundStarfield: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let isVisible = true;
    const reducedMotion = prefersReducedMotion();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Initialize 75 cosmic phosphor motes
    const numStars = 75;
    const stars: Star[] = Array.from({ length: numStars }, () => {
      const isCyan = Math.random() > 0.6;
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.8 + 0.6,
        baseAlpha: Math.random() * 0.35 + 0.1,
        alpha: Math.random() * 0.35 + 0.1,
        twinkleSpeed: (Math.random() - 0.5) * 0.015,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -0.1 - Math.random() * 0.2, // Gentle upward drift
        color: isCyan ? 'rgba(6, 182, 212,' : 'rgba(16, 185, 129,',
      };
    });

    const handleVisibilityChange = () => {
      isVisible = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const render = () => {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        if (!reducedMotion) {
          s.x += s.vx;
          s.y += s.vy;
          s.alpha += s.twinkleSpeed;

          // Twinkle bounce
          if (s.alpha > s.baseAlpha + 0.25 || s.alpha < s.baseAlpha - 0.1) {
            s.twinkleSpeed *= -1;
          }

          // Screen wrap
          if (s.y < 0) {
            s.y = canvas.height;
            s.x = Math.random() * canvas.width;
          }
          if (s.x < 0) s.x = canvas.width;
          if (s.x > canvas.width) s.x = 0;
        }

        ctx.fillStyle = `${s.color} ${Math.max(0.05, Math.min(0.8, s.alpha))})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-75"
      aria-hidden="true"
    />
  );
};

