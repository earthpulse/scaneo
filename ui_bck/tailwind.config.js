/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				info: '#4B6BFA',
				inactive: '#C4CCFF',
				hover: '#003CC0',
				action: '#0027A4',
				lightgray: '#f3f4f6'
			}
		}
	},
	plugins: [require('daisyui')]
};

// Color palette https://mycolor.space/?hex=%234B6BFA&sub=1
