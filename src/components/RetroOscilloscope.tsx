import React, { useEffect, useRef } from 'react';
import { retroAudio } from '../utils/retroAudio';

interface RetroOscilloscopeProps {
  className?: string;
  width?: number;
  height?: number;
}

export const RetroOscilloscope: React.FC<RetroOscilloscopeProps> = ({
  className = '',
  width = 96,
  height = 20,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    let time = 0;

    const render = () => {
      time += 0.05;
      const analyser = retroAudio.getAnalyser();

      ctx.clearRect(0, 0, width, height);

      // Faint background oscilloscope grid lines
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.15)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.moveTo(width / 2, 0);
      ctx.lineTo(width / 2, height);
      ctx.stroke();

      // Audio waveform render
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = '#34d399';
      ctx.shadowColor = '#10b981';
      ctx.shadowBlur = 6;
      ctx.beginPath();

      if (analyser && !retroAudio.isMuted()) {
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteTimeDomainData(dataArray);

        // Check if there is actual audio signal variance
        let hasSignal = false;
        for (let i = 0; i < bufferLength; i++) {
          if (Math.abs(dataArray[i] - 128) > 2) {
            hasSignal = true;
            break;
          }
        }

        if (hasSignal) {
          const sliceWidth = width / bufferLength;
          let x = 0;

          for (let i = 0; i < bufferLength; i++) {
            const v = dataArray[i] / 128.0; // 0.0 to 2.0
            const y = (v * height) / 2;

            if (i === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
            x += sliceWidth;
          }
        } else {
          // Idle breathing baseline wave
          const sliceWidth = width / 30;
          for (let i = 0; i <= 30; i++) {
            const x = i * sliceWidth;
            const y = height / 2 + Math.sin(time + i * 0.4) * 1.8;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
        }
      } else {
        // Idle flat/gentle wave when muted or no context
        const sliceWidth = width / 20;
        for (let i = 0; i <= 20; i++) {
          const x = i * sliceWidth;
          const y = height / 2 + Math.sin(time + i * 0.3) * 1.0;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
      }

      ctx.stroke();

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [width, height]);

  return (
    <div
      onClick={() => retroAudio.playHoverBlip()}
      className={`relative inline-flex items-center px-1.5 py-0.5 rounded bg-[#03060c] border border-emerald-500/40 cursor-pointer shadow-[0_0_8px_rgba(16,185,129,0.2)] hover:border-emerald-400 transition-colors ${className}`}
      title="Live Vector CRT Audio Waveform Oscilloscope (Click to ping)"
    >
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="block"
      />
      <span className="sr-only">Oscilloscope</span>
    </div>
  );
};

