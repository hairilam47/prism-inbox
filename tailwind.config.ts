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
		container: {
			center: true,
			padding: 'var(--container-padding)',
			screens: {
				'sm': '390px',
				'md': '768px',
				'lg': '1024px',
				'xl': '1280px',
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
			},
			colors: {
				// Design System Colors
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				surface: 'hsl(var(--surface))',
				'surface-muted': 'hsl(var(--surface-muted))',
				
				// AI & Platform Colors
				ai: {
					primary: 'hsl(var(--ai-primary))',
					glow: 'hsl(var(--ai-glow))',
				},
				platform: {
					whatsapp: 'hsl(var(--whatsapp))',
					'whatsapp-glow': 'hsl(var(--whatsapp-glow))',
					telegram: 'hsl(var(--telegram))',
					'telegram-glow': 'hsl(var(--telegram-glow))',
					instagram: 'hsl(var(--instagram))',
					'instagram-glow': 'hsl(var(--instagram-glow))',
					gmail: 'hsl(var(--gmail))',
					'gmail-glow': 'hsl(var(--gmail-glow))',
					slack: 'hsl(var(--slack))',
					'slack-glow': 'hsl(var(--slack-glow))',
					yahoo: 'hsl(var(--yahoo))',
					'yahoo-glow': 'hsl(var(--yahoo-glow))',
					messenger: 'hsl(var(--messenger))',
					'messenger-glow': 'hsl(var(--messenger-glow))',
					line: 'hsl(var(--line))',
					'line-glow': 'hsl(var(--line-glow))',
					wechat: 'hsl(var(--wechat))',
					'wechat-glow': 'hsl(var(--wechat-glow))',
					kakaotalk: 'hsl(var(--kakaotalk))',
					'kakaotalk-glow': 'hsl(var(--kakaotalk-glow))',
				},
				
				// Priority Colors
				priority: {
					urgent: 'hsl(var(--urgent))',
					'urgent-glow': 'hsl(var(--urgent-glow))',
					soon: 'hsl(var(--soon))',
					'soon-glow': 'hsl(var(--soon-glow))',
					later: 'hsl(var(--later))',
					'later-glow': 'hsl(var(--later-glow))',
				},
				
				// Text Colors
				text: {
					primary: 'hsl(var(--text-primary))',
					secondary: 'hsl(var(--text-secondary))',
					muted: 'hsl(var(--text-muted))',
				},
				
				// Glass & Interactive
				glass: {
					bg: 'hsl(var(--glass-bg))',
					border: 'hsl(var(--glass-border))',
				},
				hover: {
					glow: 'hsl(var(--hover-glow))',
				},
				active: {
					glow: 'hsl(var(--active-glow))',
				},
			},
			
			borderRadius: {
				'sm': 'var(--radius-sm)',
				'md': 'var(--radius-md)',
				'lg': 'var(--radius-lg)',
				'xl': 'var(--radius-xl)',
			},
			
			spacing: {
				'nav': 'var(--nav-height)',
				'search': 'var(--search-height)',
				'bottom-nav': 'var(--bottom-nav-height)',
				'safe-top': 'env(safe-area-inset-top)',
				'safe-bottom': 'env(safe-area-inset-bottom)',
			},
			
			backdropBlur: {
				'glass': '20px',
				'heavy': '40px',
			},
			
			boxShadow: {
				'glass': 'var(--shadow-glass)',
				'card': 'var(--shadow-card)',
				'glow-subtle': 'var(--glow-subtle)',
				'platform-glow': 'var(--glow-platform)',
			},
			
			keyframes: {
				'slide-down': {
					'0%': { opacity: '0', transform: 'translateY(-20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-up': {
					'0%': { opacity: '1', transform: 'translateY(0)' },
					'100%': { opacity: '0', transform: 'translateY(-20px)' }
				},
				'glow-pulse': {
					'0%, 100%': { filter: 'drop-shadow(0 0 8px hsl(var(--ai-glow) / 0.3))' },
					'50%': { filter: 'drop-shadow(0 0 20px hsl(var(--ai-glow) / 0.6))' }
				},
				'card-hover': {
					'0%': { transform: 'translateY(0)' },
					'100%': { transform: 'translateY(-2px)' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'scale(0.95)' },
					'100%': { opacity: '1', transform: 'scale(1)' }
				},
				'swipe-reveal': {
					'0%': { transform: 'translateX(-100%)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				}
			},
			
			animation: {
				'slide-down': 'slide-down 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
				'slide-up': 'slide-up 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
				'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
				'card-hover': 'card-hover 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'swipe-reveal': 'swipe-reveal 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
			},
			
			transitionTimingFunction: {
				'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
				'bounce': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
				'slide': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
