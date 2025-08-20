import tailwindcss from '@tailwindcss/vite';
import viteReact from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import { resolve } from 'node:path';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // GitHub Pages base path  
  const base =
    mode === 'production' && process.env.GITHUB_PAGES
      ? '/tsTools/'  // 使用实际的仓库名
      : '/';

  return {
    base,
    plugins: [
      TanStackRouterVite({ autoCodeSplitting: true }),
      viteReact(),
      tailwindcss(),
    ],
    test: {
      globals: true,
      environment: 'jsdom',
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    server: {
      port: 3000,
      host: true,
    },

    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            router: ['@tanstack/react-router'],
            i18n: [
              'i18next',
              'react-i18next',
              'i18next-browser-languagedetector',
            ],
          },
        },
      },
    },
  };
});
