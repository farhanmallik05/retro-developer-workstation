import React, { useEffect, useRef, useState } from 'react';
import { X, Play, RotateCcw, Volume2, VolumeX, Trophy, Shield, Zap, Sparkles } from 'lucide-react';
import { retroAudio } from '../utils/retroAudio';

interface RetroArcadeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface GameObject {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  type: 'packet' | 'bug' | 'powerup';
  color: string;
  points: number;
  rot: number;
  vRot: number;
}

interface Bullet {
  x: number;
  y: number;
  vy: number;
  size: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
}

export const RetroArcadeModal: React.FC<RetroArcadeModalProps> = ({ isOpen, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(() => {
    try {
      return parseInt(localStorage.getItem('cyber_runner_high_score') || '0', 10);
    } catch {
      return 0;
    }
  });
  const [lives, setLives] = useState<number>(3);
  const [hasShield, setHasShield] = useState<boolean>(false);
  const [badgeUnlocked, setBadgeUnlocked] = useState<boolean>(false);

  // Mutable refs for high-frequency game loop
  const playerRef = useRef({
    x: 200,
    y: 350,
    width: 24,
    height: 24,
    speed: 6,
    shieldUntil: 0,
  });

  const keysRef = useRef<{ left: boolean; right: boolean; fire: boolean }>({
    left: false,
    right: false,
    fire: false,
  });

  const objectsRef = useRef<GameObject[]>([]);
  const bulletsRef = useRef<Bullet[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const lastSpawnRef = useRef<number>(0);
  const lastShotRef = useRef<number>(0);
  const animFrameRef = useRef<number>(0);

  // Sync high score to localStorage
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      try {
        localStorage.setItem('cyber_runner_high_score', score.toString());
      } catch {
        // ignore
      }
    }
    if (score >= 500 && !badgeUnlocked) {
      setBadgeUnlocked(true);
      retroAudio.playBootChime();
    }
  }, [score, highScore, badgeUnlocked]);

  // Handle keyboard events
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keysRef.current.left = true;
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keysRef.current.right = true;
      }
      if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        e.preventDefault();
        keysRef.current.fire = true;
      }
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keysRef.current.left = false;
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keysRef.current.right = false;
      }
      if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        keysRef.current.fire = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isOpen, onClose]);

  // Main Game Loop
  useEffect(() => {
    if (!isOpen || gameState !== 'playing') {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Reset player position to bottom-center
    playerRef.current.x = canvas.width / 2;
    playerRef.current.y = canvas.height - 40;

    const spawnObject = (timestamp: number) => {
      const difficulty = Math.min(1 + score / 400, 3.5);
      const spawnInterval = Math.max(700 / difficulty, 220);

      if (timestamp - lastSpawnRef.current > spawnInterval) {
        lastSpawnRef.current = timestamp;
        const rand = Math.random();
        let type: GameObject['type'] = 'bug';
        let color = '#ef4444'; // Red bug anomaly
        let points = 100;
        let size = 18;

        if (rand < 0.45) {
          type = 'packet';
          color = '#10b981'; // Green clean data packet
          points = 50;
          size = 14;
        } else if (rand > 0.92) {
          type = 'powerup';
          color = '#f59e0b'; // Amber shield overdrive
          points = 250;
          size = 20;
        }

        objectsRef.current.push({
          x: Math.random() * (canvas.width - 40) + 20,
          y: -20,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (2 + Math.random() * 2) * (difficulty * 0.75),
          size,
          type,
          color,
          points,
          rot: 0,
          vRot: (Math.random() - 0.5) * 0.1,
        });
      }
    };

    const shootBullet = (timestamp: number) => {
      if (keysRef.current.fire && timestamp - lastShotRef.current > 180) {
        lastShotRef.current = timestamp;
        bulletsRef.current.push({
          x: playerRef.current.x,
          y: playerRef.current.y - 12,
          vy: -10,
          size: 4,
        });
        retroAudio.playArcadeAction();
      }
    };

    const createExplosion = (x: number, y: number, color: string, count = 12) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1 + Math.random() * 4;
        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife: 20 + Math.random() * 20,
          color,
        });
      }
    };

    let animationId: number;

    const loop = (timestamp: number) => {
      // Clear Screen with phosphor CRT glow persistence
      ctx.fillStyle = 'rgba(8, 12, 20, 0.4)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw faint background retro grid lines
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.08)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Update Player position
      const p = playerRef.current;
      if (keysRef.current.left) p.x -= p.speed;
      if (keysRef.current.right) p.x += p.speed;
      p.x = Math.max(p.width / 2, Math.min(canvas.width - p.width / 2, p.x));

      // Shield timer
      const isShielded = timestamp < p.shieldUntil;
      setHasShield(isShielded);

      // Spawn & Fire
      spawnObject(timestamp);
      shootBullet(timestamp);

      // Render Bullets
      ctx.fillStyle = '#38bdf8';
      ctx.shadowColor = '#0284c7';
      ctx.shadowBlur = 8;
      for (let i = bulletsRef.current.length - 1; i >= 0; i--) {
        const b = bulletsRef.current[i];
        b.y += b.vy;
        ctx.fillRect(b.x - 2, b.y - 6, 4, 12);
        if (b.y < -10) {
          bulletsRef.current.splice(i, 1);
        }
      }

      // Render Objects & Collisions
      for (let i = objectsRef.current.length - 1; i >= 0; i--) {
        const obj = objectsRef.current[i];
        obj.x += obj.vx;
        obj.y += obj.vy;
        obj.rot += obj.vRot;

        // Bounce horizontally
        if (obj.x < 15 || obj.x > canvas.width - 15) {
          obj.vx *= -1;
        }

        // Draw Object
        ctx.save();
        ctx.translate(obj.x, obj.y);
        ctx.rotate(obj.rot);
        ctx.strokeStyle = obj.color;
        ctx.fillStyle = obj.color + '33';
        ctx.lineWidth = 2;
        ctx.shadowColor = obj.color;
        ctx.shadowBlur = 10;

        if (obj.type === 'bug') {
          // Draw diamond bug anomaly
          ctx.beginPath();
          ctx.moveTo(0, -obj.size);
          ctx.lineTo(obj.size, 0);
          ctx.lineTo(0, obj.size);
          ctx.lineTo(-obj.size, 0);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          // Bug antenna cross
          ctx.beginPath();
          ctx.moveTo(-obj.size / 2, -obj.size / 2);
          ctx.lineTo(obj.size / 2, obj.size / 2);
          ctx.moveTo(obj.size / 2, -obj.size / 2);
          ctx.lineTo(-obj.size / 2, obj.size / 2);
          ctx.stroke();
        } else if (obj.type === 'packet') {
          // Draw square clean packet
          ctx.strokeRect(-obj.size / 2, -obj.size / 2, obj.size, obj.size);
          ctx.fillRect(-obj.size / 2, -obj.size / 2, obj.size, obj.size);
          // Inner core
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(-2, -2, 4, 4);
        } else {
          // Draw hexagon shield orb
          ctx.beginPath();
          for (let a = 0; a < 6; a++) {
            const angle = (a * Math.PI) / 3;
            const hx = Math.cos(angle) * obj.size;
            const hy = Math.sin(angle) * obj.size;
            if (a === 0) ctx.moveTo(hx, hy);
            else ctx.lineTo(hx, hy);
          }
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        }
        ctx.restore();

        // Check collision with bullets
        let destroyed = false;
        for (let bIdx = bulletsRef.current.length - 1; bIdx >= 0; bIdx--) {
          const b = bulletsRef.current[bIdx];
          const dist = Math.hypot(obj.x - b.x, obj.y - b.y);
          if (dist < obj.size + b.size) {
            bulletsRef.current.splice(bIdx, 1);
            destroyed = true;
            createExplosion(obj.x, obj.y, obj.color, 16);
            if (obj.type === 'bug') {
              setScore((s) => s + obj.points);
              retroAudio.playTerminalBeep(520, 0.05);
            } else if (obj.type === 'packet') {
              setScore((s) => s + 25);
            }
            break;
          }
        }

        if (destroyed) {
          objectsRef.current.splice(i, 1);
          continue;
        }

        // Check collision with player
        const distToPlayer = Math.hypot(obj.x - p.x, obj.y - p.y);
        if (distToPlayer < obj.size + p.width / 2) {
          createExplosion(obj.x, obj.y, obj.color, 20);
          objectsRef.current.splice(i, 1);

          if (obj.type === 'packet') {
            // Clean packet collected
            setScore((s) => s + obj.points);
            retroAudio.playTerminalBeep(880, 0.08);
          } else if (obj.type === 'powerup') {
            // Shield activated
            p.shieldUntil = timestamp + 6000;
            setScore((s) => s + obj.points);
            retroAudio.playBootChime();
          } else if (obj.type === 'bug') {
            if (isShielded) {
              // Shield absorbed bug
              setScore((s) => s + 100);
              retroAudio.playTerminalBeep(600, 0.1);
            } else {
              // Player hit!
              retroAudio.playGlitchNoise(0.25);
              setLives((l) => {
                const nextLives = l - 1;
                if (nextLives <= 0) {
                  setGameState('gameover');
                }
                return nextLives;
              });
            }
          }
          continue;
        }

        // Remove if fallen below canvas
        if (obj.y > canvas.height + 30) {
          objectsRef.current.splice(i, 1);
        }
      }

      // Render Particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const pt = particlesRef.current[i];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.life++;
        const alpha = 1 - pt.life / pt.maxLife;
        if (alpha <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }
        ctx.fillStyle = pt.color;
        ctx.globalAlpha = alpha;
        ctx.fillRect(pt.x, pt.y, 2.5, 2.5);
        ctx.globalAlpha = 1.0;
      }

      // Render Player Ship (Vector Triangle)
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.shadowColor = isShielded ? '#f59e0b' : '#10b981';
      ctx.shadowBlur = 15;
      ctx.strokeStyle = isShielded ? '#fbbf24' : '#34d399';
      ctx.fillStyle = isShielded ? 'rgba(245, 158, 11, 0.25)' : 'rgba(16, 185, 129, 0.25)';
      ctx.lineWidth = 2;

      // Draw vector ship
      ctx.beginPath();
      ctx.moveTo(0, -p.height / 2);
      ctx.lineTo(p.width / 2, p.height / 2);
      ctx.lineTo(0, p.height / 3);
      ctx.lineTo(-p.width / 2, p.height / 2);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Exhaust thruster flame
      if (Math.random() > 0.3) {
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.moveTo(-4, p.height / 3);
        ctx.lineTo(0, p.height / 3 + 8 + Math.random() * 6);
        ctx.lineTo(4, p.height / 3);
        ctx.closePath();
        ctx.fill();
      }

      // Shield bubble
      if (isShielded) {
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.6)';
        ctx.beginPath();
        ctx.arc(0, 0, p.width + 6, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.restore();

      animationId = requestAnimationFrame(loop);
    };

    animationId = requestAnimationFrame(loop);
    animFrameRef.current = animationId;

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isOpen, gameState, score]);

  const handleStartGame = () => {
    setScore(0);
    setLives(3);
    setHasShield(false);
    objectsRef.current = [];
    bulletsRef.current = [];
    particlesRef.current = [];
    setGameState('playing');
    retroAudio.playBootChime();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-[#080c14] border-2 border-emerald-500/60 rounded-lg shadow-[0_0_50px_rgba(16,185,129,0.25)] flex flex-col overflow-hidden max-h-[92vh]">
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#0b101c] border-b border-emerald-500/40 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-none animate-phosphor-pulse" />
            <span className="text-emerald-400 font-bold tracking-wider">
              ARCADE_ROM // CYBER_RUNNER_1984.BIN
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-slate-400">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>HI-SCORE: {highScore}</span>
            </div>

            <button
              onClick={() => {
                retroAudio.playTerminalBeep(400, 0.05);
                onClose();
              }}
              className="text-slate-400 hover:text-rose-400 transition-colors p-1"
              title="Exit Arcade"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* HUD Bar */}
        <div className="px-4 py-2 bg-[#05080f] border-b border-slate-800 flex items-center justify-between font-mono text-xs text-slate-300">
          <div className="flex items-center gap-4">
            <div>
              <span className="text-slate-500">SCORE: </span>
              <span className="text-emerald-400 font-bold text-sm tracking-widest">{score.toString().padStart(6, '0')}</span>
            </div>
            <div>
              <span className="text-slate-500">SHIPS: </span>
              <span className="text-rose-400 font-bold">{'▲ '.repeat(Math.max(0, lives))}</span>
            </div>
            {hasShield && (
              <span className="px-1.5 py-0.5 rounded bg-amber-950/80 border border-amber-500/60 text-amber-300 text-[10px] animate-pulse">
                [ OVERDRIVE_SHIELD ]
              </span>
            )}
          </div>

          {badgeUnlocked && (
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-[10px]">
              <Trophy className="w-3 h-3 text-amber-400" />
              <span>CHAMPION_1984</span>
            </div>
          )}
        </div>

        {/* Canvas Screen */}
        <div className="relative flex-1 bg-black flex items-center justify-center p-2 min-h-[380px] sm:min-h-[420px]">
          <canvas
            ref={canvasRef}
            width={480}
            height={420}
            className="w-full max-w-[480px] h-[380px] sm:h-[420px] bg-[#070b14] border border-emerald-900/60 shadow-[inset_0_0_30px_rgba(0,0,0,0.8)] cursor-crosshair rounded"
          />

          {/* CRT Scanline and vignette overlay for game canvas */}
          <div className="absolute inset-2 pointer-events-none rounded border border-emerald-500/20 shadow-[inset_0_0_40px_rgba(16,185,129,0.15)]" />

          {/* Overlay: Idle State */}
          {gameState === 'idle' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 font-mono text-center p-6 space-y-4">
              <div className="w-12 h-12 rounded bg-emerald-950/80 border border-emerald-500 flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-widest text-shadow-emerald">
                  CYBER-RUNNER 1984
                </h3>
                <p className="text-xs text-emerald-400/80 mt-1 max-w-sm">
                  Defend the CloudOps telemetry pipeline! Catch green data packets (+50pts), laser-blast red bug anomalies (+100pts), and seize gold shield orbs (+250pts).
                </p>
              </div>

              <div className="p-3 rounded bg-slate-900/90 border border-slate-800 text-[11px] text-slate-300 space-y-1">
                <p><span className="text-cyan-400">← / →</span> or <span className="text-cyan-400">A / D</span> : Steer Courier</p>
                <p><span className="text-cyan-400">SPACEBAR</span> or <span className="text-cyan-400">W</span> : Fire Photon Lasers</p>
                <p className="text-amber-400">Score 500+ to unlock the Champion Achievement!</p>
              </div>

              <button
                onClick={handleStartGame}
                className="flex items-center gap-2 px-6 py-2.5 rounded bg-emerald-600 hover:bg-emerald-500 text-black font-bold text-sm tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(16,185,129,0.4)]"
              >
                <Play className="w-4 h-4 fill-current" />
                INSERT COIN // START GAME
              </button>
            </div>
          )}

          {/* Overlay: Game Over State */}
          {gameState === 'gameover' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/85 font-mono text-center p-6 space-y-4">
              <h3 className="text-2xl sm:text-3xl font-bold text-rose-500 tracking-widest animate-pulse">
                SYSTEM CORRUPTED
              </h3>
              <p className="text-xs text-slate-400">Telemetry packet loss exceeded safe blast radius threshold.</p>

              <div className="p-4 rounded bg-slate-900 border border-slate-800 font-mono text-center space-y-1.5 w-64">
                <p className="text-xs text-slate-400">FINAL SCORE</p>
                <p className="text-2xl font-bold text-emerald-400">{score}</p>
                <p className="text-[11px] text-amber-400">ALL-TIME HIGH: {highScore}</p>
              </div>

              {badgeUnlocked && (
                <div className="p-2 rounded bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs">
                  🏆 UNLOCKED: CYBER_RUNNER_CHAMPION_1984
                </div>
              )}

              <button
                onClick={handleStartGame}
                className="flex items-center gap-2 px-5 py-2 rounded bg-emerald-600 hover:bg-emerald-500 text-black font-bold text-xs uppercase transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                REBOOT COURIER // TRY AGAIN
              </button>
            </div>
          )}
        </div>

        {/* Mobile On-Screen Touch Controls */}
        <div className="p-3 bg-[#0b101c] border-t border-slate-800 flex items-center justify-between font-mono text-xs sm:hidden">
          <div className="flex gap-2">
            <button
              onTouchStart={() => (keysRef.current.left = true)}
              onTouchEnd={() => (keysRef.current.left = false)}
              onMouseDown={() => (keysRef.current.left = true)}
              onMouseUp={() => (keysRef.current.left = false)}
              className="px-4 py-2.5 rounded bg-slate-900 border border-slate-700 text-white font-bold active:bg-emerald-950"
            >
              ◀ LEFT
            </button>
            <button
              onTouchStart={() => (keysRef.current.right = true)}
              onTouchEnd={() => (keysRef.current.right = false)}
              onMouseDown={() => (keysRef.current.right = true)}
              onMouseUp={() => (keysRef.current.right = false)}
              className="px-4 py-2.5 rounded bg-slate-900 border border-slate-700 text-white font-bold active:bg-emerald-950"
            >
              RIGHT ▶
            </button>
          </div>

          <button
            onTouchStart={() => (keysRef.current.fire = true)}
            onTouchEnd={() => (keysRef.current.fire = false)}
            onMouseDown={() => (keysRef.current.fire = true)}
            onMouseUp={() => (keysRef.current.fire = false)}
            className="px-5 py-2.5 rounded bg-rose-900/80 border border-rose-500/80 text-rose-200 font-bold active:bg-rose-600"
          >
            🔥 FIRE
          </button>
        </div>

        {/* Footer Bar */}
        <div className="px-4 py-2 bg-[#070b14] border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span>AUDIO ENGINE: WEB_AUDIO_SYNTH // 0KB ASSETS</span>
          <span>FARHAN_MALLIK_PORTFOLIO_SUPERPOWER</span>
        </div>
      </div>
    </div>
  );
};

