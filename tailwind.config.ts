import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		// Enhanced breakpoint system (320px to 8K)
		screens: {
			'xs': '320px',
			'sm': '480px',
			'md': '768px',
			'lg': '1024px',
			'xl': '1280px',
			'2xl': '1536px',
			'3xl': '1920px',
			'4xl': '2560px',
			'5xl': '3440px',
			'6xl': '3840px',
			'7xl': '5120px',
			'8xl': '7680px',
		},
		container: {
			center: true,
			padding: {
				DEFAULT: '1rem',
				xs: '1rem',
				sm: '1.5rem',
				md: '2rem',
				lg: '3rem',
				xl: '4rem',
				'2xl': '5rem',
				'3xl': '6rem',
				'4xl': '8rem',
				'5xl': '10rem',
				'6xl': '12rem',
				'7xl': '14rem',
				'8xl': '16rem',
			},
			screens: {
				'xs': '100%',
				'sm': '100%',
				'md': '100%',
				'lg': '1024px',
				'xl': '1280px',
				'2xl': '1536px',
				'3xl': '1920px',
				'4xl': '2560px',
				'5xl': '3440px',
				'6xl': '3840px',
				'7xl': '5120px',
				'8xl': '7680px',
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					50: 'hsl(var(--primary-50))',
					100: 'hsl(var(--primary-100))',
					600: 'hsl(var(--primary-600))',
					700: 'hsl(var(--primary-700))',
					900: 'hsl(var(--primary-900))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
					50: 'hsl(var(--secondary-50))',
					100: 'hsl(var(--secondary-100))',
					600: 'hsl(var(--secondary-600))',
					700: 'hsl(var(--secondary-700))',
					900: 'hsl(var(--secondary-900))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Extended neutral palette
				neutral: {
					50: 'hsl(var(--neutral-50))',
					100: 'hsl(var(--neutral-100))',
					200: 'hsl(var(--neutral-200))',
					300: 'hsl(var(--neutral-300))',
					400: 'hsl(var(--neutral-400))',
					500: 'hsl(var(--neutral-500))',
					600: 'hsl(var(--neutral-600))',
					700: 'hsl(var(--neutral-700))',
					800: 'hsl(var(--neutral-800))',
					900: 'hsl(var(--neutral-900))',
				},
				// Semantic colors
				success: {
					50: 'hsl(142, 76%, 96%)',
					100: 'hsl(142, 77%, 89%)',
					500: 'hsl(142, 71%, 45%)',
					600: 'hsl(142, 71%, 39%)',
					700: 'hsl(142, 72%, 29%)',
					900: 'hsl(142, 76%, 14%)',
				},
				warning: {
					50: 'hsl(48, 100%, 96%)',
					100: 'hsl(48, 96%, 89%)',
					500: 'hsl(48, 96%, 53%)',
					600: 'hsl(48, 89%, 46%)',
					700: 'hsl(48, 76%, 37%)',
					900: 'hsl(48, 76%, 19%)',
				},
				error: {
					50: 'hsl(0, 86%, 97%)',
					100: 'hsl(0, 93%, 94%)',
					500: 'hsl(0, 84%, 60%)',
					600: 'hsl(0, 72%, 51%)',
					700: 'hsl(0, 74%, 42%)',
					900: 'hsl(0, 63%, 31%)',
				},
				info: {
					50: 'hsl(214, 100%, 97%)',
					100: 'hsl(214, 95%, 93%)',
					500: 'hsl(214, 84%, 56%)',
					600: 'hsl(214, 84%, 49%)',
					700: 'hsl(214, 84%, 42%)',
					900: 'hsl(214, 84%, 22%)',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			// Three-font system
			fontFamily: {
				// Rare headers - Playfair Display for special occasions
				rare: ['Playfair Display', 'Georgia', 'serif'],
				// UI headers - Manrope for everyday interface elements
				ui: ['Manrope', 'system-ui', 'sans-serif'],
				// Body text - Inter for reading content
				body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
				// Legacy support
				sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
				mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
			},
			fontSize: {
				'2xs': ['0.625rem', { lineHeight: '0.875rem' }],
				// Fluid typography for rare headers
				'rare-sm': ['clamp(1.5rem, 4vw, 2rem)', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
				'rare-md': ['clamp(2rem, 5vw, 2.5rem)', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
				'rare-lg': ['clamp(2.5rem, 6vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
				'rare-xl': ['clamp(3rem, 7vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
				'rare-2xl': ['clamp(4rem, 8vw, 5rem)', { lineHeight: '1.05', letterSpacing: '-0.04em' }],
				'rare-3xl': ['clamp(5rem, 10vw, 6rem)', { lineHeight: '1.05', letterSpacing: '-0.04em' }],
			},
			spacing: {
				'18': '4.5rem',
				'88': '22rem',
				// Responsive spacing
				'section-xs': '2rem',
				'section-sm': '3rem',
				'section-md': '4rem',
				'section-lg': '6rem',
				'section-xl': '8rem',
				'section-2xl': '10rem',
				'section-3xl': '12rem',
				'section-4xl': '16rem',
				'section-5xl': '20rem',
				'section-6xl': '24rem',
				'section-7xl': '28rem',
				'section-8xl': '32rem',
			},
			animation: {
				'fade-in': 'fade-in 0.3s ease-out',
				'fade-out': 'fade-out 0.3s ease-out',
				'scale-in': 'scale-in 0.2s ease-out',
				'scale-out': 'scale-out 0.2s ease-out',
				'slide-in-from-top': 'slide-in-from-top 0.3s ease-out',
				'slide-in-from-bottom': 'slide-in-from-bottom 0.3s ease-out',
				'slide-in-from-left': 'slide-in-from-left 0.3s ease-out',
				'slide-in-from-right': 'slide-in-from-right 0.3s ease-out',
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
			keyframes: {
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				'fade-out': {
					'0%': { opacity: '1', transform: 'translateY(0)' },
					'100%': { opacity: '0', transform: 'translateY(10px)' },
				},
				'scale-in': {
					'0%': { opacity: '0', transform: 'scale(0.95)' },
					'100%': { opacity: '1', transform: 'scale(1)' },
				},
				'scale-out': {
					'0%': { opacity: '1', transform: 'scale(1)' },
					'100%': { opacity: '0', transform: 'scale(0.95)' },
				},
				'slide-in-from-top': {
					'0%': { transform: 'translateY(-100%)' },
					'100%': { transform: 'translateY(0)' },
				},
				'slide-in-from-bottom': {
					'0%': { transform: 'translateY(100%)' },
					'100%': { transform: 'translateY(0)' },
				},
				'slide-in-from-left': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(0)' },
				},
				'slide-in-from-right': {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0)' },
				},
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
			},
			transitionTimingFunction: {
				'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
				'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
			},
			backdropBlur: {
				xs: '2px',
			},
			maxWidth: {
				'8xl': '88rem',
				'9xl': '96rem',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
