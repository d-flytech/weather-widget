import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000, // je kunt poort aanpassen
  },
  resolve: {
    alias: {
      '@': '/src', // handig om makkelijker te importeren
    },
  },
});
