import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'php-page-spa-fallback',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (
            req.method === 'GET' &&
            req.url &&
            req.url.includes('.php') &&
            !req.url.includes('ajax_') &&
            !req.url.startsWith('/api')
          ) {
            // Rewrite request URL to index.html so Vite serves the SPA index,
            // while browser URL remains intact for React Router matching
            req.url = '/index.html';
          }
          next();
        });
      }
    }
  ],
  server: {
    port: 3000,
    host: true,
    allowedHosts: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      // Proxy all ajax_*.php calls to backend express adapter
      '^/.*ajax_.*\\.php': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  }
});
