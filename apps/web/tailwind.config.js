/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        campus: {
          ink: '#10233d',
          deep: '#1a3a5c',
          teal: '#1a6b5c',
          sage: '#5f7f72',
          sand: '#e7eef5',
          mist: '#f4f7fa',
          paper: '#fbfcfd',
          accent: '#b35a2a',
          brass: '#8a6a3d',
          line: '#d0dbe6',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        sans: ['"Manrope"', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        panel: '0 12px 32px rgba(16, 35, 61, 0.07)',
        soft: '0 4px 18px rgba(16, 35, 61, 0.05)',
      },
      backgroundImage: {
        'campus-glow':
          'radial-gradient(ellipse at 12% 0%, rgba(26,107,92,0.14), transparent 42%), radial-gradient(ellipse at 90% 8%, rgba(138,106,61,0.1), transparent 36%), linear-gradient(180deg, #eef3f8 0%, #f7f9fb 46%, #eef2f6 100%)',
      },
      keyframes: {
        rise: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        rise: 'rise 0.55s ease-out both',
      },
    },
  },
  plugins: [],
};
