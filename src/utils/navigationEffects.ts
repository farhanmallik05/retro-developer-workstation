export type JumpAnimationMode = 'WARP_SPEED' | 'CRT_DEGAUSS' | 'MATRIX_SHUTTER' | 'QUANTUM_TUNNEL' | 'RANDOM';

class NavigationEffectsEngine {
  private mode: JumpAnimationMode = 'WARP_SPEED';
  private modes: JumpAnimationMode[] = ['WARP_SPEED', 'CRT_DEGAUSS', 'MATRIX_SHUTTER', 'QUANTUM_TUNNEL'];

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('fm_jump_mode') as JumpAnimationMode | null;
      if (saved && (this.modes.includes(saved) || saved === 'RANDOM')) {
        this.mode = saved;
      }
    }
  }

  public getMode(): JumpAnimationMode {
    return this.mode;
  }

  public setMode(mode: JumpAnimationMode) {
    this.mode = mode;
    if (typeof window !== 'undefined') {
      localStorage.setItem('fm_jump_mode', mode);
    }
  }

  public getEffectiveMode(): Exclude<JumpAnimationMode, 'RANDOM'> {
    if (this.mode === 'RANDOM') {
      const randomIndex = Math.floor(Math.random() * this.modes.length);
      return this.modes[randomIndex] as Exclude<JumpAnimationMode, 'RANDOM'>;
    }
    return this.mode;
  }

  public cycleNextMode(): JumpAnimationMode {
    const allOptions: JumpAnimationMode[] = [...this.modes, 'RANDOM'];
    const currentIdx = allOptions.indexOf(this.mode);
    const nextIdx = (currentIdx + 1) % allOptions.length;
    const nextMode = allOptions[nextIdx];
    this.setMode(nextMode);
    return nextMode;
  }
}

export const navigationEffects = new NavigationEffectsEngine();
