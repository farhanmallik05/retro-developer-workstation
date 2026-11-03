import React, { useRef, useEffect, useState } from 'react';
import { Box, Rotate3d, Compass, RefreshCw } from 'lucide-react';
import { retroAudio } from '../utils/retroAudio';

type WireframeMode = 'MAINFRAME' | 'TESSERACT' | 'POLYHEDRON';

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Edge {
  a: number;
  b: number;
}

export const RetroWireframeCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mode, setMode] = useState<WireframeMode>('MAINFRAME');
  const [isDragging, setIsDragging] = useState(false);
  const rotRef = useRef<{ x: number; y: number; vx: number; vy: number }>({
    x: 0.3,
    y: 0.6,
    vx: 0.005,
    vy: 0.008,
  });
  const lastMousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Generate 3D vertices and edges based on mode
  const getGeometry = (currentMode: WireframeMode): { vertices: Point3D[]; edges: Edge[] } => {
    if (currentMode === 'MAINFRAME') {
      // 3D Retro Terminal Mainframe (Monitor, Chassis, Base, Keyboard)
      const v: Point3D[] = [
        // Monitor Box Front
        { x: -50, y: -60, z: -40 },
        { x: 50, y: -60, z: -40 },
        { x: 50, y: 10, z: -40 },
        { x: -50, y: 10, z: -40 },
        // Monitor Box Back
        { x: -40, y: -50, z: 40 },
        { x: 40, y: -50, z: 40 },
        { x: 40, y: 0, z: 40 },
        { x: -40, y: 0, z: 40 },
        // Screen Inset
        { x: -40, y: -50, z: -42 },
        { x: 40, y: -50, z: -42 },
        { x: 40, y: 0, z: -42 },
        { x: -40, y: 0, z: -42 },
        // Pedestal Neck
        { x: -15, y: 10, z: -10 },
        { x: 15, y: 10, z: -10 },
        { x: 15, y: 25, z: 10 },
        { x: -15, y: 25, z: 10 },
        // Keyboard Base Tray
        { x: -65, y: 25, z: -60 },
        { x: 65, y: 25, z: -60 },
        { x: 60, y: 40, z: 20 },
        { x: -60, y: 40, z: 20 },
      ];

      const e: Edge[] = [
        // Monitor Front Box
        { a: 0, b: 1 }, { a: 1, b: 2 }, { a: 2, b: 3 }, { a: 3, b: 0 },
        // Monitor Back Box
        { a: 4, b: 5 }, { a: 5, b: 6 }, { a: 6, b: 7 }, { a: 7, b: 4 },
        // Monitor Struts (Front to Back)
        { a: 0, b: 4 }, { a: 1, b: 5 }, { a: 2, b: 6 }, { a: 3, b: 7 },
        // Screen Inset Frame
        { a: 8, b: 9 }, { a: 9, b: 10 }, { a: 10, b: 11 }, { a: 11, b: 8 },
        // Neck to Base
        { a: 12, b: 13 }, { a: 13, b: 14 }, { a: 14, b: 15 }, { a: 15, b: 12 },
        // Keyboard Tray
        { a: 16, b: 17 }, { a: 17, b: 18 }, { a: 18, b: 19 }, { a: 19, b: 16 },
        { a: 12, b: 16 }, { a: 13, b: 17 }, { a: 14, b: 18 }, { a: 15, b: 19 },
      ];

      return { vertices: v, edges: e };
    }

    if (currentMode === 'TESSERACT') {
      // 4D Hypercube projected to 3D (Inner Cube + Outer Cube interconnected)
      const innerScale = 30;
      const outerScale = 65;
      const v: Point3D[] = [];

      // Inner Cube (8 points)
      for (let i = 0; i < 8; i++) {
        v.push({
          x: (i & 1 ? 1 : -1) * innerScale,
          y: (i & 2 ? 1 : -1) * innerScale,
          z: (i & 4 ? 1 : -1) * innerScale,
        });
      }

      // Outer Cube (8 points)
      for (let i = 0; i < 8; i++) {
        v.push({
          x: (i & 1 ? 1 : -1) * outerScale,
          y: (i & 2 ? 1 : -1) * outerScale,
          z: (i & 4 ? 1 : -1) * outerScale,
        });
      }

      const e: Edge[] = [];
      // Inner cube edges
      const cubeEdges: [number, number][] = [
        [0, 1], [1, 3], [3, 2], [2, 0],
        [4, 5], [5, 7], [7, 6], [6, 4],
        [0, 4], [1, 5], [2, 6], [3, 7],
      ];

      cubeEdges.forEach(([a, b]) => {
        e.push({ a, b });
        e.push({ a: a + 8, b: b + 8 }); // Outer cube
        e.push({ a, b: a + 8 }); // Cross 4D struts
      });

      return { vertices: v, edges: e };
    }

    // Default: Geodesic Polyhedron (Icosahedron with central core)
    const phi = (1 + Math.sqrt(5)) / 2;
    const s = 45;
    const v: Point3D[] = [
      { x: -s, y: phi * s, z: 0 }, { x: s, y: phi * s, z: 0 },
      { x: -s, y: -phi * s, z: 0 }, { x: s, y: -phi * s, z: 0 },
      { x: 0, y: -s, z: phi * s }, { x: 0, y: s, z: phi * s },
      { x: 0, y: -s, z: -phi * s }, { x: 0, y: s, z: -phi * s },
      { x: phi * s, y: 0, z: -s }, { x: phi * s, y: 0, z: s },
      { x: -phi * s, y: 0, z: -s }, { x: -phi * s, y: 0, z: s },
    ];

    const e: Edge[] = [
      { a: 0, b: 11 }, { a: 0, b: 5 }, { a: 0, b: 1 }, { a: 0, b: 7 }, { a: 0, b: 10 },
      { a: 1, b: 5 }, { a: 5, b: 11 }, { a: 11, b: 10 }, { a: 10, b: 7 }, { a: 7, b: 1 },
      { a: 3, b: 9 }, { a: 3, b: 4 }, { a: 3, b: 2 }, { a: 3, b: 6 }, { a: 3, b: 8 },
      { a: 4, b: 9 }, { a: 9, b: 8 }, { a: 8, b: 6 }, { a: 6, b: 2 }, { a: 2, b: 4 },
      { a: 4, b: 5 }, { a: 5, b: 9 }, { a: 9, b: 1 }, { a: 1, b: 8 }, { a: 8, b: 7 },
      { a: 7, b: 6 }, { a: 6, b: 10 }, { a: 10, b: 2 }, { a: 2, b: 11 }, { a: 11, b: 4 },
    ];

    return { vertices: v, edges: e };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      // Auto rotation when not dragging
      if (!isDragging) {
        rotRef.current.x += rotRef.current.vx;
        rotRef.current.y += rotRef.current.vy;
      }

      const { vertices, edges } = getGeometry(mode);
      const cx = w / 2;
      const cy = h / 2;
      const fov = 280;
      const cameraDistance = 240;

      const cosX = Math.cos(rotRef.current.x);
      const sinX = Math.sin(rotRef.current.x);
      const cosY = Math.cos(rotRef.current.y);
      const sinY = Math.sin(rotRef.current.y);

      // Rotate and project points
      const projected: { x: number; y: number; z: number }[] = [];

      for (const pt of vertices) {
        // Y rotation
        let x1 = pt.x * cosY + pt.z * sinY;
        let y1 = pt.y;
        let z1 = -pt.x * sinY + pt.z * cosY;

        // X rotation
        let x2 = x1;
        let y2 = y1 * cosX - z1 * sinX;
        let z2 = y1 * sinX + z1 * cosX;

        // Perspective projection
        const pz = cameraDistance + z2;
        const scale = fov / Math.max(pz, 20);
        const px = cx + x2 * scale;
        const py = cy + y2 * scale;

        projected.push({ x: px, y: py, z: z2 });
      }

      // Draw Grid Radar Rings in Background
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, 90, 0, Math.PI * 2);
      ctx.arc(cx, cy, 50, 0, Math.PI * 2);
      ctx.stroke();

      // Draw Edges with Phosphor Glow
      ctx.strokeStyle = mode === 'MAINFRAME' ? '#10b981' : mode === 'TESSERACT' ? '#06b6d4' : '#a855f7';
      ctx.shadowColor = mode === 'MAINFRAME' ? 'rgba(16, 185, 129, 0.7)' : mode === 'TESSERACT' ? 'rgba(6, 182, 212, 0.7)' : 'rgba(168, 85, 247, 0.7)';
      ctx.shadowBlur = 8;
      ctx.lineWidth = 1.5;

      for (const edge of edges) {
        const pA = projected[edge.a];
        const pB = projected[edge.b];
        if (!pA || !pB) continue;

        // Opacity based on depth
        const avgZ = (pA.z + pB.z) / 2;
        const alpha = Math.max(0.25, Math.min(1, (avgZ + 80) / 160));
        ctx.globalAlpha = alpha;

        ctx.beginPath();
        ctx.moveTo(pA.x, pA.y);
        ctx.lineTo(pB.x, pB.y);
        ctx.stroke();
      }

      // Draw Vertices as glowing data bits
      ctx.shadowBlur = 10;
      for (const p of projected) {
        ctx.fillStyle = mode === 'MAINFRAME' ? '#34d399' : mode === 'TESSERACT' ? '#38bdf8' : '#c084fc';
        ctx.globalAlpha = Math.max(0.4, Math.min(1, (p.z + 80) / 160));
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [mode, isDragging]);

  // Mouse & Touch Orbit Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - lastMousePos.current.x;
    const dy = e.clientY - lastMousePos.current.y;
    rotRef.current.y += dx * 0.01;
    rotRef.current.x += dy * 0.01;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative w-full rounded-xl bg-[#03060c] border border-slate-800 overflow-hidden font-mono text-xs shadow-2xl flex flex-col">
      {/* 3D Header Bar with Mode Selectors */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#090e1a] border-b border-slate-800 text-[10px] text-slate-400">
        <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
          <Rotate3d className="w-3.5 h-3.5 animate-spin duration-3000" />
          <span>3D_HARDWARE_SIMULATOR</span>
        </div>

        {/* Mode Selector Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              retroAudio.playHoverBlip();
              setMode('MAINFRAME');
            }}
            className={`px-1.5 py-0.5 rounded border transition-colors ${
              mode === 'MAINFRAME'
                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 font-bold'
                : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
            }`}
            title="3D Retro Mainframe Terminal"
          >
            [ MAINFRAME ]
          </button>
          <button
            onClick={() => {
              retroAudio.playHoverBlip();
              setMode('TESSERACT');
            }}
            className={`px-1.5 py-0.5 rounded border transition-colors ${
              mode === 'TESSERACT'
                ? 'bg-cyan-950/80 border-cyan-500 text-cyan-300 font-bold'
                : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
            }`}
            title="4D Hypercube Tesseract Projection"
          >
            [ TESSERACT_4D ]
          </button>
          <button
            onClick={() => {
              retroAudio.playHoverBlip();
              setMode('POLYHEDRON');
            }}
            className={`px-1.5 py-0.5 rounded border transition-colors ${
              mode === 'POLYHEDRON'
                ? 'bg-purple-950/80 border-purple-500 text-purple-300 font-bold'
                : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
            }`}
            title="Geodesic Polyhedron Matrix"
          >
            [ CORE ]
          </button>
        </div>
      </div>

      {/* 3D Canvas Area with Drag to Orbit */}
      <div
        className="relative w-full h-64 sm:h-72 cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* Orbit Drag Instruction Overlay */}
        <div className="absolute bottom-2 left-3 text-[9px] text-slate-500 flex items-center gap-1 pointer-events-none">
          <Compass className="w-3 h-3 text-emerald-500/60" />
          <span>DRAG_TO_ORBIT_3D // 60FPS_PERSPECTIVE</span>
        </div>

        <div className="absolute top-2 right-3 text-[9px] text-slate-500 font-mono">
          <span>P_DEPTH: 280mm</span>
        </div>
      </div>
    </div>
  );
};

