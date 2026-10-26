/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#080D18', // Deep cybersecurity midnight (dark theme background)
          900: '#111827', // Primary dark surface / cards
          850: '#172235', // Secondary dark surface / elevated cards
          800: '#1F2E45', // Highlighted dark cards
          700: '#29384D', // Dark theme border
          600: '#3D4F6B',
        },
        slate: {
          50: '#F5F8FC', // Crisp light theme background
          100: '#EBF1F8', // Secondary light surface
          200: '#D7E0EB', // Light theme border
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569', // Secondary light text (WCAG AA > 5.5:1)
          700: '#334155',
          800: '#1E293B',
          900: '#111827', // Primary light text (WCAG AA > 15:1)
        },
        cyan: {
          DEFAULT: '#22D3EE', // Electric Cyan (Dark)
          light: '#67E8F9',
          dark: '#0891B2',   // Accessible Cyan (Light)
          hover: '#06B6D4',
          glow: 'rgba(34, 211, 238, 0.25)',
        },
        violet: {
          DEFAULT: '#A78BFA', // Neon Violet
          light: '#C4B5FD',
          dark: '#7C3AED',
          glow: 'rgba(167, 139, 250, 0.25)',
        },
        orange: {
          DEFAULT: '#FFAD66', // Arcade Orange
          light: '#FFC799',
          dark: '#EA580C',
          glow: 'rgba(255, 173, 102, 0.25)',
        },
        lime: {
          DEFAULT: '#C7F36B', // Pixel Lime
          light: '#D9F89B',
          dark: '#16A34A',
          glow: 'rgba(199, 243, 107, 0.25)',
        },
        cloud: {
          DEFAULT: '#F8FAFC', // Crisp Cloud White (Dark text primary)
          muted: '#CBD5E1',   // Secondary dark text (WCAG AA > 9:1)
          subtle: '#94A3B8',  // Tertiary dark text
        },
      },
      fontFamily: {
        heading: ['Space Grotesk', 'system-ui', '-apple-system', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -4px rgba(34, 211, 238, 0.35)',
        'glow-violet': '0 0 25px -4px rgba(167, 139, 250, 0.35)',
        'glow-orange': '0 0 25px -4px rgba(255, 173, 102, 0.35)',
        'glow-card': '0 12px 32px -8px rgba(0, 0, 0, 0.55)',
        'glow-card-light': '0 10px 30px -6px rgba(17, 24, 39, 0.08)',
        'glow-accent': '0 0 30px -5px rgba(6, 182, 212, 0.25)',
      },
      animation: {
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'float-reverse': 'floatReverse 7s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'grid-pulse': 'gridPulse 8s ease-in-out infinite',
        'scanline': 'scanline 10s linear infinite',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1.5deg)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(10px) rotate(-1.5deg)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.45', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.04)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gridPulse: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.6' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
      },
    },
  },
  plugins: [
    import('@tailwindcss/typography'),
  ],
};
