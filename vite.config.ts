import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	plugins: [
		// Please make sure that '@tanstack/router-plugin' is passed before '@vitejs/plugin-react'
		tanstackRouter({
			target: 'react',
			autoCodeSplitting: true,
			// routesDirectory: './app/routes',
			// generatedRouteTree: './app/routeTree.gen.ts',
		}),
		react(),
		tailwindcss(),
		tsconfigPaths(),
	],
	server: {
		// Enable HMR
		hmr: {
			port: 24678,
		},
		// Watch for changes in all relevant files
		watch: {
			usePolling: true,
			interval: 100,
		},
		// Enable CORS for HMR
		cors: true,
	},
	// Optimize dependencies for faster reloads
	optimizeDeps: {
		include: ['react', 'react-dom', '@tanstack/react-router'],
		force: true,
	},
});
