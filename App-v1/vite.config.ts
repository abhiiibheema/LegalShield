import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // ← allow access from any IP
    port: 5173,       // ← default port
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
