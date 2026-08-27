import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          50: '#FDFBF7',
          100: '#FAF6EE',
          200: '#F4ECE0',
          300: '#EAE0CF',
          400: '#DACBBB',
          500: '#C7B49F',
        },
        navy: {
          800: '#1B2A4A',
          900: '#0F1829',
          950: '#0A101C',
        },
        saffron: {
          500: '#E06D26',
          600: '#C85718',
          700: '#A94310',
        },
        forest: {
          600: '#235D43',
          700: '#184732',
          800: '#103323',
        },
        ochre: {
          500: '#C68A36',
          600: '#AB7226',
        }
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'academic': '0 4px 20px -2px rgba(27, 42, 74, 0.08), 0 2px 6px -1px rgba(27, 42, 74, 0.04)',
        'academic-lg': '0 10px 30px -4px rgba(27, 42, 74, 0.12), 0 4px 10px -2px rgba(27, 42, 74, 0.06)',
        'parchment': '0 2px 10px rgba(198, 138, 54, 0.12)',
      }
    },
  },
  plugins: [],
};
export default config;
