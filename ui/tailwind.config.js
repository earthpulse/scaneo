/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
		extend: {
			colors: {
				bg1: 'hsl(0, 0%, 84%)',
				bg2: 'hsl(0, 0%, 74%)',
				border: 'hsl(0, 0%, 64%)' 
			}
		}
	},
	plugins: [require('daisyui')]
}

