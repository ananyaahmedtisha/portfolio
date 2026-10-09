/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,jsx,ts,tsx,mdx}',
    './components/**/*.{js,jsx,ts,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        alice: '#F0F8FF',
        deepsea: {
          DEFAULT: '#0F3057',
          800: '#143A66',
          900: '#0B2545',
        },
        seafoam: {
          DEFAULT: '#20B2AA',
          dark: '#14918B',
          light: '#7FDBD4',
          pale: '#D8F3F1',
        },
      },
      fontFamily: {
        display: ['"Sora"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Newsreader"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'blue-soft': '0 20px 60px -20px rgba(15, 48, 87, 0.25)',
        'card': '0 8px 32px -8px rgba(32, 178, 170, 0.25)',
        'glow': '0 0 40px rgba(32, 178, 170, 0.35)',
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-18px) rotate(3deg)' },
        },
        drift: {
          '0%': { transform: 'translate(0,0) scale(1)' },
          '50%': { transform: 'translate(30px,-30px) scale(1.08)' },
          '100%': { transform: 'translate(0,0) scale(1)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        drift: 'drift 14s ease-in-out infinite',
        gradient: 'gradient 12s ease infinite',
        marquee: 'marquee 28s linear infinite',
      },
    },
  },
  plugins: [],
};
