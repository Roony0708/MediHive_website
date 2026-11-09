/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          foreground: '#ffffff',
        },
        background: 'var(--color-bg)',
        foreground: 'var(--color-text)',
        border: 'var(--color-border)',
        input: 'var(--color-border)',
        ring: 'var(--color-primary)',
        muted: {
          DEFAULT: 'var(--color-bg-tertiary)',
          foreground: 'var(--color-text-secondary)',
        },
        accent: {
          DEFAULT: 'var(--color-bg-tertiary)',
          foreground: 'var(--color-text)',
        },
        destructive: {
          DEFAULT: '#dc2626',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: 'var(--color-bg-tertiary)',
          foreground: 'var(--color-text)',
        },
      },
      borderRadius: {
        lg: '16px',
        md: '12px',
        sm: '4px',
      },
    },
  },
  plugins: [],
}
