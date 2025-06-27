import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'youapp': {
          background: '#09111A',
          'input-bg': 'rgba(255, 255, 255, 0.05)',
          'input-border': 'rgba(255, 255, 255, 0.2)',
        }
      },
      backgroundImage: {
        'radial-glow': "radial-gradient(ellipse 80% 80% at 50% -20%, rgba(7, 89, 133, 0.4), transparent)",
      },
      gradientColorStops: {
         'button-start': '#62CDCB',
         'button-end': '#4599DB',
      },
      boxShadow: {
        'button-glow': '0 4px 14px 0 rgba(0, 118, 255, 0.39)',
        'button-glow-hover': '0 6px 20px rgba(0, 118, 255, 0.23)',
      },
      animation: {
        blob: 'blob 7s infinite',
      },
    },
  },
  plugins: [],
}
export default config