import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export default defineConfig({
	plugins: [react()],
	base: './',
	build: {
		outDir: '../production/html',
		emptyOutDir: true,
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@components': path.resolve(__dirname, './src/components'),
			'@utilities': path.resolve(__dirname, './src/utilities'),
		},
	},
});
