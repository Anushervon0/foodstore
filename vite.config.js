import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    proxy: {
      // Все запросы фронта на /wp-json уходят на локальный WordPress (Laragon).
      '/wp-json': {
        target: 'https://sultan-grill-house.test',
        changeOrigin: true,
        secure: false, // самоподписанный сертификат Laragon
      },
    },
  },
});
