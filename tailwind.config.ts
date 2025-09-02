import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Custom dark theme colors
        background: '#0F0F10',
        surface: '#1A1A1D',
        border: '#2A2A2D',
        primary: {
          DEFAULT: '#00BFA6',
          foreground: '#0F0F10',
        },
        secondary: {
          DEFAULT: '#F5A623',
          foreground: '#0F0F10',
        },
        text: {
          primary: '#EDEDED',
          secondary: '#9CA3AF',
          muted: '#6B7280',
        },
        success: '#22C55E',
        error: '#EF4444',
        warning: '#FACC15',
        info: '#3B82F6',
        disabled: '#6B7280',
        // shadcn/ui compatibility
        foreground: '#EDEDED',
        card: {
          DEFAULT: '#1A1A1D',
          foreground: '#EDEDED',
        },
        popover: {
          DEFAULT: '#1A1A1D',
          foreground: '#EDEDED',
        },
        muted: {
          DEFAULT: '#2A2A2D',
          foreground: '#9CA3AF',
        },
        accent: {
          DEFAULT: '#00BFA6',
          foreground: '#0F0F10',
        },
        destructive: {
          DEFAULT: '#EF4444',
          foreground: '#EDEDED',
        },
        input: '#2A2A2D',
        ring: '#00BFA6',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        glow: '0 0 20px rgba(0, 191, 166, 0.3)',
        'glow-amber': '0 0 20px rgba(245, 166, 35, 0.3)',
        glass: '0 8px 32px rgba(0, 0, 0, 0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'glow-pulse': 'glowPulse 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 191, 166, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(0, 191, 166, 0.5)' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;