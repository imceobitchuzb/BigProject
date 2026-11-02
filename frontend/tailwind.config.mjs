/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        /* ── Premium Dashboard Palette (Adaptive via CSS Variables) ── */
        ds: {
          bg:       'var(--ds-bg)',
          surface:  'var(--ds-surface)',
          surface2: 'var(--ds-surface-2)',
          surface3: 'var(--ds-surface-3)',
          accent:   'var(--ds-accent)',
          accent2:  'var(--ds-accent-2)',
          cyber:    'var(--ds-cyber)',
          text:     'var(--ds-text)',
          text2:    'var(--ds-text-2)',
          border:   'var(--ds-border)',
        },
        /* ── Legacy Navy Palette (preserve all existing) ── */
        navy: {
          950: '#080D18',
          900: '#111827',
          850: '#172235',
          800: '#1F2E45',
          700: '#29384D',
          600: '#3D4F6B',
        },
        slate: {
          50:  '#F5F8FC',
          100: '#EBF1F8',
          200: '#D7E0EB',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#111827',
        },
        cyan: {
          DEFAULT: '#22D3EE',
          light:   '#67E8F9',
          dark:    '#0891B2',
          hover:   '#06B6D4',
          glow:    'rgba(34, 211, 238, 0.25)',
        },
        violet: {
          DEFAULT: '#A78BFA',
          light:   '#C4B5FD',
          dark:    '#7C3AED',
          glow:    'rgba(167, 139, 250, 0.25)',
        },
        orange: {
          DEFAULT: '#FFAD66',
          light:   '#FFC799',
          dark:    '#EA580C',
          glow:    'rgba(255, 173, 102, 0.25)',
        },
        lime: {
          DEFAULT: '#C7F36B',
          light:   '#D9F89B',
          dark:    '#16A34A',
          glow:    'rgba(199, 243, 107, 0.25)',
        },
        cloud: {
          DEFAULT: '#F8FAFC',
          muted:   '#CBD5E1',
          subtle:  '#94A3B8',
        },
      },
      fontFamily: {
        heading: ['Space Grotesk', 'system-ui', '-apple-system', 'sans-serif'],
        sans:    ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan':   '0 0 25px -4px rgba(34, 211, 238, 0.35)',
        'glow-violet': '0 0 25px -4px rgba(167, 139, 250, 0.35)',
        'glow-orange': '0 0 25px -4px rgba(255, 173, 102, 0.35)',
        'glow-accent': '0 0 30px -5px rgba(108, 140, 255, 0.40)',
        'glow-cyber':  '0 0 30px -5px rgba(72,  214, 232, 0.40)',
        'glow-card':   '0 12px 32px -8px rgba(0, 0, 0, 0.55)',
        'glow-card-light': '0 10px 30px -6px rgba(17, 24, 39, 0.08)',
        'premium':     '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
        'premium-hover': '0 16px 48px rgba(0,0,0,0.4), 0 0 20px -4px rgba(108,140,255,0.25)',
      },
      backgroundImage: {
        'hero-dark':
          'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(108,140,255,0.15) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 50%, rgba(167,139,250,0.08) 0%, transparent 60%), radial-gradient(ellipse 50% 30% at 10% 80%, rgba(72,214,232,0.07) 0%, transparent 60%)',
        'card-shimmer':
          'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%)',
        'sidebar-gradient':
          'linear-gradient(180deg, #0E1530 0%, #0A1020 100%)',
        'accent-gradient':
          'linear-gradient(135deg, #6C8CFF, #48D6E8)',
        'accent2-gradient':
          'linear-gradient(135deg, #A78BFA, #6C8CFF)',
      },
      animation: {
        'float-slow':       'floatSlow 6s ease-in-out infinite',
        'float-reverse':    'floatReverse 7s ease-in-out infinite',
        'float-gentle':     'floatGentle 5s ease-in-out infinite',
        'pulse-subtle':     'pulseSubtle 3s ease-in-out infinite',
        'pulse-glow':       'pulseGlow 2.5s ease-in-out infinite',
        'shimmer':          'shimmer 2.5s linear infinite',
        'grid-pulse':       'gridPulse 8s ease-in-out infinite',
        'scanline':         'scanline 10s linear infinite',
        'gradient-shift':   'gradientShift 4s ease infinite',
        'spin-slow':        'spin 8s linear infinite',
        'orbit':            'orbit 12s linear infinite',
        'counter':          'counter 2s ease-out forwards',
        'slide-in-left':    'slideInLeft 0.4s cubic-bezier(0.16,1,0.3,1)',
        'slide-in-right':   'slideInRight 0.4s cubic-bezier(0.16,1,0.3,1)',
        'slide-up':         'slideUp 0.4s cubic-bezier(0.16,1,0.3,1)',
        'fade-in':          'fadeIn 0.4s ease',
        'border-pulse':     'borderPulse 2s ease-in-out infinite',
        'particle-drift':   'particleDrift 15s linear infinite',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%':      { transform: 'translateY(-12px) rotate(1.5deg)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%':      { transform: 'translateY(12px) rotate(-1.5deg)' },
        },
        floatGentle: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.45', transform: 'scale(1)' },
          '50%':      { opacity: '0.85', transform: 'scale(1.04)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(72,214,232,0.2)' },
          '50%':      { boxShadow: '0 0 30px rgba(72,214,232,0.5)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gridPulse: {
          '0%, 100%': { opacity: '0.3' },
          '50%':      { opacity: '0.6' },
        },
        scanline: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        gradientShift: {
          '0%':   { backgroundPosition: '0% 50%' },
          '50%':  { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        orbit: {
          '0%':   { transform: 'rotate(0deg) translateX(120px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(120px) rotate(-360deg)' },
        },
        slideInLeft: {
          from: { transform: 'translateX(-20px)', opacity: '0' },
          to:   { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          from: { transform: 'translateX(20px)', opacity: '0' },
          to:   { transform: 'translateX(0)', opacity: '1' },
        },
        slideUp: {
          from: { transform: 'translateY(20px)', opacity: '0' },
          to:   { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        borderPulse: {
          '0%, 100%': { borderColor: 'rgba(72,214,232,0.2)' },
          '50%':      { borderColor: 'rgba(72,214,232,0.6)' },
        },
        particleDrift: {
          '0%':   { transform: 'translateY(100vh) translateX(0)', opacity: '0' },
          '10%':  { opacity: '1' },
          '90%':  { opacity: '1' },
          '100%': { transform: 'translateY(-10vh) translateX(50px)', opacity: '0' },
        },
      },
      spacing: {
        sidebar: '260px',
        'sidebar-collapsed': '72px',
        topbar: '64px',
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '32px',
      },
    },
  },
  plugins: [
    import('@tailwindcss/typography'),
  ],
};
