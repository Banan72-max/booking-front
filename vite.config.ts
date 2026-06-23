import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
  server: {
    port: 5173,
    host: true, // слушать на 0.0.0.0, чтобы туннель (ngrok) мог достучаться
    allowedHosts: true, // Vite 5 по умолчанию блокирует внешние хосты типа *.ngrok-free.app
  },
});
