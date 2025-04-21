import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      // Define multiple HTML entry points:
      input: {
        // If you still need index.html for local dev / preview, include it:
        index: resolve(__dirname, 'index.html'),
        // You can leave index.html in place or remove it if unused
        popup: resolve(__dirname, 'popup.html'),
      },
    },
  },
})
