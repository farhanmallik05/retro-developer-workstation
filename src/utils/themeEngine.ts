export type CrtThemeId = 'emerald' | 'amber' | 'cyan' | 'white';

export interface CrtTheme {
  id: CrtThemeId;
  label: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  glowColor: string;
  cssClass: string;
  description: string;
}

export const CRT_THEMES: Record<CrtThemeId, CrtTheme> = {
  emerald: {
    id: 'emerald',
    label: '🟢 P1 GREEN',
    name: 'P1_EMERALD',
    primaryColor: '#10b981',
    secondaryColor: '#06b6d4',
    glowColor: 'rgba(16, 185, 129, 0.7)',
    cssClass: 'theme-p1-emerald',
    description: 'Classic IBM / Apple II P1 High-Persistence Green Phosphor',
  },
  amber: {
    id: 'amber',
    label: '🟠 P3 AMBER',
    name: 'P3_AMBER',
    primaryColor: '#f59e0b',
    secondaryColor: '#fb923c',
    glowColor: 'rgba(245, 158, 11, 0.7)',
    cssClass: 'theme-p3-amber',
    description: 'DEC / Wang Laboratories P3 Warm Amber Monochromatic Phosphor',
  },
  cyan: {
    id: 'cyan',
    label: '🔵 CYBER CYAN',
    name: 'CYBER_CYAN',
    primaryColor: '#06b6d4',
    secondaryColor: '#38bdf8',
    glowColor: 'rgba(6, 182, 212, 0.7)',
    cssClass: 'theme-cyber-cyan',
    description: 'Tron Legacy Electric Cyan Vector Monochrome',
  },
  white: {
    id: 'white',
    label: '⚪ P4 WHITE',
    name: 'P4_WHITE',
    primaryColor: '#e2e8f0',
    secondaryColor: '#94a3b8',
    glowColor: 'rgba(226, 232, 240, 0.6)',
    cssClass: 'theme-p4-white',
    description: 'DEC VT220 Paper-White High-Contrast Monochrome',
  },
};

class ThemeEngine {
  private currentThemeId: CrtThemeId = 'emerald';
  private listeners: ((theme: CrtTheme) => void)[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('fm_crt_theme') as CrtThemeId | null;
      if (saved && CRT_THEMES[saved]) {
        this.currentThemeId = saved;
      }
    }
  }

  public getTheme(): CrtTheme {
    return CRT_THEMES[this.currentThemeId];
  }

  public setTheme(id: CrtThemeId) {
    if (!CRT_THEMES[id]) return;
    this.currentThemeId = id;
    if (typeof window !== 'undefined') {
      localStorage.setItem('fm_crt_theme', id);
    }
    const theme = CRT_THEMES[id];
    this.listeners.forEach((fn) => fn(theme));
  }

  public cycleNextTheme(): CrtTheme {
    const ids: CrtThemeId[] = ['emerald', 'amber', 'cyan', 'white'];
    const currentIdx = ids.indexOf(this.currentThemeId);
    const nextIdx = (currentIdx + 1) % ids.length;
    const nextThemeId = ids[nextIdx];
    this.setTheme(nextThemeId);
    return CRT_THEMES[nextThemeId];
  }

  public subscribe(fn: (theme: CrtTheme) => void): () => void {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== fn);
    };
  }
}

export const themeEngine = new ThemeEngine();

