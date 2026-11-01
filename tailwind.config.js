/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', '"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"DM Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        obsidian: '#050811',
        substrate: '#0c1222',
        machined: '#111a30',
        cyber: {
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          900: '#0c1222',
          950: '#050811',
        }
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'bezel-outer': '0 12px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
        'bezel-inner': 'inset 0 1px 1px rgba(255, 255, 255, 0.14)',
        'glow-cyan': '0 0 25px rgba(6, 182, 212, 0.3)',
      }
    },
  },
  plugins: [],
}
