import type { Config } from 'tailwindcss';
import { heroui } from '@heroui/react';

export default {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			screens: {
				md: '770px',
			},
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
				firsto: '#F3EEEA',
				secondo: '#EBE3D5',
				thirdo: '#B0A695',
				fourtho: '#776B5D',
			},
		},
	},
	darkMode: 'class',
	plugins: [heroui()],
} satisfies Config;
