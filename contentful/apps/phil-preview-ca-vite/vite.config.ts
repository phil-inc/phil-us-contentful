import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';

export default defineConfig(() => ({
	base: '', // Relative paths
	server: {
		port: 3000,
	},
	plugins: [react()],
	test: {
		environment: 'happy-dom',
	},
}));
