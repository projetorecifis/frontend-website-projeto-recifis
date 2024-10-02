import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
				recifis: {
					blue: '#2E3092',
					orange: '#F3B832'
				},
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
					orange: '#F3B832'
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
				},
			},
			spacing: {
				112: '26rem',
				128: '28rem',
				144: '30rem',
				160: '10rem',
				176: '11rem',
				192: '12rem',
				208: '13rem',
				224: '14rem',
				240: '15rem',
				256: '16rem',
				288: '18rem',
				320: '20rem',
				384: '24rem'
			  },
			  screens: {
				'phon': '380px',
				'tabl': '744px',
				'desk': '1280px',
				'max': '1536px'
			  },
		}
	},
	plugins: [require("tailwindcss-animate")],
};
export default config;
