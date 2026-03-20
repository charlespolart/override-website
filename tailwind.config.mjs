/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts}'],
  theme: {
    extend: {
      colors: {
        accent: '#8C37F4',
        'accent-light': '#A855F7',
        'accent-dark': '#7121D4',
        surface: {
          DEFAULT: '#09090B',
          light: '#18181B',
          lighter: '#27272A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
};
