/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0b0f1a',
        surface: '#0f172a',
        accent: {
          DEFAULT: '#6366f1',
          cyan: '#22d3ee',
          from: '#6366f1',
          to: '#22d3ee',
        },
        neutral: {
          light: 'rgba(255,255,255,0.05)',
          dark: '#f8fafc',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(135deg, #6366f1, #22d3ee)',
        'gradient-radial': 'radial-gradient(ellipse at center, rgba(99,102,241,0.15) 0%, transparent 70%)',
        'gradient-hero': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99,102,241,0.25), transparent), radial-gradient(ellipse 60% 40% at 80% 50%, rgba(34,211,238,0.15), transparent)',
      },
      boxShadow: {
        'glow': '0 0 40px rgba(99, 102, 241, 0.3)',
        'glow-strong': '0 0 60px rgba(99, 102, 241, 0.5)',
        'glow-cyan': '0 0 30px rgba(34, 211, 238, 0.3)',
      },
      animation: {
        'float': 'float-gradient 15s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
