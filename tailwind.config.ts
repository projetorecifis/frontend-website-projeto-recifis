import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/globals.css"
	],
	theme: {
    	extend: {
			fontFamily:{
				'chill': ['Chill'],
				'rumble': ['Rumble'],
				'speak': ['Speak'],
				'cheese': ['Cheese'],
				'kiss': ['Kiss'],
				'black-marker': ['BlackMarker'],
				'devious': ['Devious'],
			},
    		colors: {
    			background: 'var(--background)',
    			foreground: 'var(--foreground)',
    			recifis: {
    				blue: '#2E3092',
    				orange: '#F3B832',
    				greenLight: '#B1D6C4',
    				orangeLight: '#F6CBB6',
    				salmonLight: '#f9f0df'
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
				card:{
					DEFAULT: 'hsl(var(--card-background))',
					foreground: 'hsl(var(--card-foreground))',
				}
    		},
    		top: {
    			'200': '40rem'
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		backgroundColor: {
    			DEFAULT: '#ffffff',
    			recifis: {
    				blue: '#2E3092',
    				orange: '#F3B832',
    				light: {
    					blue: 'rgb(176 217 235)'
    				}
    			},
    			surface: {
    				DEFAULT: '#F3F4F6',
    				emphasis: '#E5E7EB',
    				muted: 'rgba(243, 244, 246, 0.5)'
    			},
    			accent: {
    				DEFAULT: '#05C151',
    				emphasis: '#45DD69',
    				muted: 'rgba(5, 193, 81, 0.5)'
    			},
    			destructive: {
    				DEFAULT: '#F26969',
    				emphasis: '#EF4444',
    				muted: 'rgba(251, 217, 217, 1)'
    			},
    			warning: {
    				DEFAULT: '#F2D469',
    				emphasis: '#EFC944',
    				muted: 'rgba(251, 244, 217, 1)'
    			},
    			success: {
    				DEFAULT: '#69ADF2',
    				emphasis: '#447EEF',
    				muted: 'rgba(217, 234, 251, 1)'
    			}
    		},
    		spacing: {
    			'112': '26rem',
    			'128': '28rem',
    			'144': '30rem',
    			'160': '32rem',
    			'176': '34rem',
    			'192': '36rem',
    			'200': '40rem',
				'216': '42rem',
				'232': '44rem',
				'248': '46rem',
				'264': '48rem',
				'280': '50rem',
				'296': '52rem',
				'312': '54rem',
				'328': '56rem',
				'344': '58rem',
				'360': '60rem',
				'376': '62rem',
				'392': '64rem',
				'408': '66rem',
				'424': '68rem',
				'440': '70rem',
				'456': '72rem',
    		},
    		screens: {
    			phon: '375px',
    			phonlg: '744px',
    			tabl: '900px',
    			desk: '1280px',
    			max: '1536px',
    			maxl: '1770px'
    		},
    		keyframes: {
    			'accordion-down': {
    				from: {
    					height: '0'
    				},
    				to: {
    					height: 'var(--radix-accordion-content-height)'
    				}
    			},
    			'accordion-up': {
    				from: {
    					height: 'var(--radix-accordion-content-height)'
    				},
    				to: {
    					height: '0'
    				}
    			}
    		},
    		animation: {
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out'
    		}
    	}
    },
	plugins: [require("tailwindcss-animate")],
};
export default config;
