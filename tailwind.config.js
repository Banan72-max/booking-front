/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
        'primary-foreground': '#a5b4fc',
        surface: '#0a0812',
        'surface-2': '#1a1726',
        border: '#2d2b40',
        muted: '#6b7280',
        destructive: '#ef4444',
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: { DEFAULT: '0.75rem', lg: '1rem', xl: '1.25rem' },
      animation: { 'focus-ring': 'pulse 1.5s ease infinite' },
    },
  },
  plugins: [],
};
