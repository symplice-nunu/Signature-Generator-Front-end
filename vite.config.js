import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',  // Use jsdom to simulate browser-like behavior
  },
  server: {
    port: 8081, // Set the development server to run on port 8081
    proxy: {
      '/api': {
        target: 'http://signaturegenerator.samueldev.com', // Proxy API calls to another server
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Optional: remove the "/api" prefix
      },
    },
  },
});