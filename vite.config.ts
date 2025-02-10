import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import { visualizer } from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';
import viteImagemin from 'vite-plugin-imagemin';


export default defineConfig({
  define: {
    'process.env': {}, 
  },
  base: '/',
  plugins: [
    react({
      jsxRuntime: 'automatic',
    }),
    viteCompression({
      algorithm: 'brotliCompress',
    }),
    viteImagemin({
      optipng: { optimizationLevel: 7 },
    }),
    // Node.js polyfills
    nodePolyfills(),

    // Image optimization plugin
    ViteImageOptimizer({
      png: { quality: 85 },
      jpeg: { quality: 80 },
      webp: { quality: 85 },
      avif: { quality: 85 },
      svg: {
        plugins: [
          { name: 'removeViewBox' },
          { name: 'sortAttrs' },
          { name: 'removeDimensions' },
        ],
      },
    }),

    // Bundle analyzer plugin
    visualizer({
      filename: 'stats.html',
      open: true,
    }),
  ],
  resolve: {
    alias: {
      'vm': 'vm-browserify',
      "@": path.resolve(__dirname, "./src/"), 
      "@components": path.resolve(__dirname, "./src/components/"),
      "@assets": path.resolve(__dirname, "./src/assets/"),
      "@hooks": path.resolve(__dirname, "./src/hooks/"),
      "@lib": path.resolve(__dirname, "./src/lib/"),
    },
  },
  optimizeDeps: {
    include: ['axios'],   
    exclude: [
      'moment',
      'socket.io-client',
      'lucide-react',
      'clsx',
      'tailwind-merge',
      'tailwindcss-animate',
    ],
  },
  build: {

    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
      plugins: [
        visualizer({ open: true }),
      ],
    },
    minify: 'terser',
    chunkSizeWarningLimit: 500, 
    terserOptions: {
      compress: {
        drop_console: true,  
        drop_debugger: true,
      },
    },
  },
});
