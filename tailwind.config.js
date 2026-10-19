/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                body: ['Inter', 'sans-serif'],
                display: ['"Instrument Serif"', 'serif'],
            },
            colors: {
                bg: 'hsl(var(--bg))',
                surface: 'hsl(var(--surface))',
                'text-primary': 'hsl(var(--text))',
                muted: 'hsl(var(--muted))',
                stroke: 'hsl(var(--stroke))',
                accent: 'hsl(var(--accent))',
            },
            animation: {
                'scroll-down': 'scroll-down 1.5s ease-in-out infinite',
                'role-fade-in': 'role-fade-in 0.4s ease-out',
                'gradient-shift': 'gradient-shift 6s ease infinite',
                'fade-in': 'fadeIn 0.5s ease-out forwards',
                'slide-up': 'slideUp 0.5s ease-out forwards',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                'scroll-down': {
                    '0%': { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(200%)' },
                },
                'role-fade-in': {
                    '0%': { opacity: '0', transform: 'translateY(8px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'gradient-shift': {
                    '0%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0% 50%' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            },
        },
    },
    plugins: [],
}
