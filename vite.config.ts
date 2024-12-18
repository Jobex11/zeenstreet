import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import { visualizer } from 'rollup-plugin-visualizer';


export default defineConfig({
  define: {
    'process.env': {}, // Define global variables
  },
  base: '/', // Set the base path for your app
  plugins: [
    // React plugin with automatic JSX runtime
    react({
      jsxRuntime: 'automatic',
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
      "@": path.resolve(__dirname, "./src/"), // Main alias
      "@components": path.resolve(__dirname, "./src/components/"),
      "@assets": path.resolve(__dirname, "./src/assets/"),
      "@hooks": path.resolve(__dirname, "./src/hooks/"),
      "@lib": path.resolve(__dirname, "./src/lib/"),
    },
  },
  optimizeDeps: {
    include: ['axios'], // Pre-bundle specific libraries
    exclude: [''],      // Exclude unnecessary dependencies
  },
  build: {
    // Rollup options for splitting vendor code into chunks
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'], // Vendor libraries
        },
      },
      plugins: [
        // Include bundle analyzer during the build process
        visualizer({ open: true }),
      ],
    },
    minify: 'terser', // Use Terser for better minification
    terserOptions: {
      compress: {
        drop_console: true,  // Remove console.log in production
        drop_debugger: true, // Remove debugger statements
      },
    },
  },
});
