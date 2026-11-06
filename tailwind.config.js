/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'traditional-red': {
          DEFAULT: '#A71903',
          dark: '#851302',
          light: '#C82E15',
        },
        'terracotta': {
          DEFAULT: '#BB6D25',
          dark: '#9B5517',
          light: '#D3833B',
        },
        'warm-sand': {
          DEFAULT: '#C98C4D',
          dark: '#B07538',
          light: '#DCA269',
        },
        'olive-green': {
          DEFAULT: '#666C44',
          dark: '#4F5434',
          light: '#7F8758',
        },
        'deep-brown': {
          DEFAULT: '#432813',
          dark: '#2E1A0C',
          light: '#5B371B',
        },
        'cream-gold': {
          DEFAULT: '#ECCA8A',
          dark: '#DFB467',
          light: '#F5DEB0',
        },
        'parchment': {
          DEFAULT: '#FAF7F0',
          dark: '#EFE9DD',
          light: '#FDFCFA',
        },
      },
      fontFamily: {
        'display': ['"Rozha One"', '"Cinzel"', '"Marcellus"', 'serif'],
        'heading': ['"Marcellus"', '"Cinzel"', 'serif'],
        'sans': ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        'malayalam': ['"Noto Serif Malayalam"', '"Manjari"', 'serif'],
      },
      boxShadow: {
        'gold': '0 4px 25px -2px rgba(236, 202, 138, 0.45)',
        'cultural': '0 12px 35px -8px rgba(67, 40, 19, 0.14)',
        'soft': '0 4px 20px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        'editorial': '16px',
      }
    },
  },
  plugins: [],
}

