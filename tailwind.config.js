/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0A0E1A',
        panel: '#141A29',
        panelSoft: '#1A2232',
        accent: '#E50914',
        accentGlow: '#EF1C26',
        cyan: '#3AA7FF',
        gold: '#F3C978',
        green: '#4ADE80',
        amber: '#FBBF24',
        red: '#F87171',
        slateText: '#94A3B8',
        border: 'rgba(255,255,255,0.06)',
      },
      boxShadow: {
        glow: '0 0 20px rgba(239, 28, 38, 0.45)',
        card: '0 24px 80px rgba(3, 5, 19, 0.7)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Sora', 'sans-serif'],
      },
      borderRadius: {
        xl: '16px',
        '2xl': '20px',
      },
      maxWidth: {
        shell: '1200px',
      },
      animation: {
        float: 'float 10s ease-in-out infinite',
        pulseSlow: 'pulseSlow 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSlow: {
          '0%,100%': { boxShadow: '0 0 0 rgba(239, 28, 38, 0.0)' },
          '50%': { boxShadow: '0 0 20px rgba(239, 28, 38, 0.4)' },
        },
      },
    },
  },
  plugins: [],
};
