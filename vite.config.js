import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src', // Alias para simplificar las rutas
    },
  },
  assetsInclude: ['**/*.mpeg'], // Incluir archivos .mpeg como activos
});
