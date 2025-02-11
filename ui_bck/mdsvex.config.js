import { defineMDSveXConfig as defineConfig } from 'mdsvex';

const config = defineConfig({
	extensions: ['.md', `.svx`],
	smartypants: {
		dashes: 'oldschool'
	}
});

export default config;
