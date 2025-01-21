// vite.config.ts
import react from "file:///C:/Users/ttebify/nextjs/ravegenie_frontend/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";
import { defineConfig } from "file:///C:/Users/ttebify/nextjs/ravegenie_frontend/node_modules/vite/dist/node/index.js";
import { nodePolyfills } from "file:///C:/Users/ttebify/nextjs/ravegenie_frontend/node_modules/vite-plugin-node-polyfills/dist/index.js";
import { ViteImageOptimizer } from "file:///C:/Users/ttebify/nextjs/ravegenie_frontend/node_modules/vite-plugin-image-optimizer/dist/index.mjs";
import { visualizer } from "file:///C:/Users/ttebify/nextjs/ravegenie_frontend/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import viteCompression from "file:///C:/Users/ttebify/nextjs/ravegenie_frontend/node_modules/vite-plugin-compression/dist/index.mjs";
import viteImagemin from "file:///C:/Users/ttebify/nextjs/ravegenie_frontend/node_modules/vite-plugin-imagemin/dist/index.mjs";
var __vite_injected_original_dirname = "C:\\Users\\ttebify\\nextjs\\ravegenie_frontend";
var vite_config_default = defineConfig({
  define: {
    "process.env": {}
  },
  base: "/",
  plugins: [
    react({
      jsxRuntime: "automatic"
    }),
    viteCompression({
      algorithm: "brotliCompress"
    }),
    viteImagemin({
      optipng: { optimizationLevel: 7 }
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
          { name: "removeViewBox" },
          { name: "sortAttrs" },
          { name: "removeDimensions" }
        ]
      }
    }),
    // Bundle analyzer plugin
    visualizer({
      filename: "stats.html",
      open: true
    })
  ],
  resolve: {
    alias: {
      "vm": "vm-browserify",
      "@": path.resolve(__vite_injected_original_dirname, "./src/"),
      "@components": path.resolve(__vite_injected_original_dirname, "./src/components/"),
      "@assets": path.resolve(__vite_injected_original_dirname, "./src/assets/"),
      "@hooks": path.resolve(__vite_injected_original_dirname, "./src/hooks/"),
      "@lib": path.resolve(__vite_injected_original_dirname, "./src/lib/")
    }
  },
  optimizeDeps: {
    include: ["axios"],
    exclude: [
      "moment",
      "socket.io-client",
      "@radix-ui/react-accordion",
      "@radix-ui/react-avatar",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-icons",
      "@radix-ui/react-popover",
      "@radix-ui/react-progress",
      "@radix-ui/react-scroll-area",
      "@radix-ui/react-slot",
      "@radix-ui/react-tabs",
      "lucide-react",
      "vite-plugin-node-polyfills",
      "clsx",
      "tailwind-merge",
      "tailwindcss-animate"
    ]
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"]
        }
      },
      plugins: [
        visualizer({ open: true })
      ]
    },
    minify: "terser",
    chunkSizeWarningLimit: 500,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx0dGViaWZ5XFxcXG5leHRqc1xcXFxyYXZlZ2VuaWVfZnJvbnRlbmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHR0ZWJpZnlcXFxcbmV4dGpzXFxcXHJhdmVnZW5pZV9mcm9udGVuZFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvdHRlYmlmeS9uZXh0anMvcmF2ZWdlbmllX2Zyb250ZW5kL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xyXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xyXG5pbXBvcnQgeyBub2RlUG9seWZpbGxzIH0gZnJvbSAndml0ZS1wbHVnaW4tbm9kZS1wb2x5ZmlsbHMnO1xyXG5pbXBvcnQgeyBWaXRlSW1hZ2VPcHRpbWl6ZXIgfSBmcm9tIFwidml0ZS1wbHVnaW4taW1hZ2Utb3B0aW1pemVyXCI7XHJcbmltcG9ydCB7IHZpc3VhbGl6ZXIgfSBmcm9tICdyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXInO1xyXG5pbXBvcnQgdml0ZUNvbXByZXNzaW9uIGZyb20gJ3ZpdGUtcGx1Z2luLWNvbXByZXNzaW9uJztcclxuaW1wb3J0IHZpdGVJbWFnZW1pbiBmcm9tICd2aXRlLXBsdWdpbi1pbWFnZW1pbic7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBkZWZpbmU6IHtcclxuICAgICdwcm9jZXNzLmVudic6IHt9LCBcclxuICB9LFxyXG4gIGJhc2U6ICcvJyxcclxuICBwbHVnaW5zOiBbXHJcbiAgICByZWFjdCh7XHJcbiAgICAgIGpzeFJ1bnRpbWU6ICdhdXRvbWF0aWMnLFxyXG4gICAgfSksXHJcbiAgICB2aXRlQ29tcHJlc3Npb24oe1xyXG4gICAgICBhbGdvcml0aG06ICdicm90bGlDb21wcmVzcycsXHJcbiAgICB9KSxcclxuICAgIHZpdGVJbWFnZW1pbih7XHJcbiAgICAgIG9wdGlwbmc6IHsgb3B0aW1pemF0aW9uTGV2ZWw6IDcgfSxcclxuICAgIH0pLFxyXG4gICAgLy8gTm9kZS5qcyBwb2x5ZmlsbHNcclxuICAgIG5vZGVQb2x5ZmlsbHMoKSxcclxuXHJcbiAgICAvLyBJbWFnZSBvcHRpbWl6YXRpb24gcGx1Z2luXHJcbiAgICBWaXRlSW1hZ2VPcHRpbWl6ZXIoe1xyXG4gICAgICBwbmc6IHsgcXVhbGl0eTogODUgfSxcclxuICAgICAganBlZzogeyBxdWFsaXR5OiA4MCB9LFxyXG4gICAgICB3ZWJwOiB7IHF1YWxpdHk6IDg1IH0sXHJcbiAgICAgIGF2aWY6IHsgcXVhbGl0eTogODUgfSxcclxuICAgICAgc3ZnOiB7XHJcbiAgICAgICAgcGx1Z2luczogW1xyXG4gICAgICAgICAgeyBuYW1lOiAncmVtb3ZlVmlld0JveCcgfSxcclxuICAgICAgICAgIHsgbmFtZTogJ3NvcnRBdHRycycgfSxcclxuICAgICAgICAgIHsgbmFtZTogJ3JlbW92ZURpbWVuc2lvbnMnIH0sXHJcbiAgICAgICAgXSxcclxuICAgICAgfSxcclxuICAgIH0pLFxyXG5cclxuICAgIC8vIEJ1bmRsZSBhbmFseXplciBwbHVnaW5cclxuICAgIHZpc3VhbGl6ZXIoe1xyXG4gICAgICBmaWxlbmFtZTogJ3N0YXRzLmh0bWwnLFxyXG4gICAgICBvcGVuOiB0cnVlLFxyXG4gICAgfSksXHJcbiAgXSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICAndm0nOiAndm0tYnJvd3NlcmlmeScsXHJcbiAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjL1wiKSwgXHJcbiAgICAgIFwiQGNvbXBvbmVudHNcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyYy9jb21wb25lbnRzL1wiKSxcclxuICAgICAgXCJAYXNzZXRzXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmMvYXNzZXRzL1wiKSxcclxuICAgICAgXCJAaG9va3NcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyYy9ob29rcy9cIiksXHJcbiAgICAgIFwiQGxpYlwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjL2xpYi9cIiksXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgb3B0aW1pemVEZXBzOiB7XHJcbiAgICBpbmNsdWRlOiBbJ2F4aW9zJ10sICAgXHJcbiAgICBleGNsdWRlOiBbXHJcbiAgICAgICdtb21lbnQnLFxyXG4gICAgICAnc29ja2V0LmlvLWNsaWVudCcsXHJcbiAgICAgICdAcmFkaXgtdWkvcmVhY3QtYWNjb3JkaW9uJyxcclxuICAgICAgJ0ByYWRpeC11aS9yZWFjdC1hdmF0YXInLFxyXG4gICAgICAnQHJhZGl4LXVpL3JlYWN0LWRpYWxvZycsXHJcbiAgICAgICdAcmFkaXgtdWkvcmVhY3QtZHJvcGRvd24tbWVudScsXHJcbiAgICAgICdAcmFkaXgtdWkvcmVhY3QtaWNvbnMnLFxyXG4gICAgICAnQHJhZGl4LXVpL3JlYWN0LXBvcG92ZXInLFxyXG4gICAgICAnQHJhZGl4LXVpL3JlYWN0LXByb2dyZXNzJyxcclxuICAgICAgJ0ByYWRpeC11aS9yZWFjdC1zY3JvbGwtYXJlYScsXHJcbiAgICAgICdAcmFkaXgtdWkvcmVhY3Qtc2xvdCcsXHJcbiAgICAgICdAcmFkaXgtdWkvcmVhY3QtdGFicycsXHJcbiAgICAgICdsdWNpZGUtcmVhY3QnLFxyXG4gICAgICAndml0ZS1wbHVnaW4tbm9kZS1wb2x5ZmlsbHMnLFxyXG4gICAgICAnY2xzeCcsXHJcbiAgICAgICd0YWlsd2luZC1tZXJnZScsXHJcbiAgICAgICd0YWlsd2luZGNzcy1hbmltYXRlJyxcclxuICAgIF0sXHJcbiAgfSxcclxuICBidWlsZDoge1xyXG5cclxuICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgbWFudWFsQ2h1bmtzOiB7XHJcbiAgICAgICAgICB2ZW5kb3I6IFsncmVhY3QnLCAncmVhY3QtZG9tJ10sXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgICAgcGx1Z2luczogW1xyXG4gICAgICAgIHZpc3VhbGl6ZXIoeyBvcGVuOiB0cnVlIH0pLFxyXG4gICAgICBdLFxyXG4gICAgfSxcclxuICAgIG1pbmlmeTogJ3RlcnNlcicsXHJcbiAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDUwMCwgXHJcbiAgICB0ZXJzZXJPcHRpb25zOiB7XHJcbiAgICAgIGNvbXByZXNzOiB7XHJcbiAgICAgICAgZHJvcF9jb25zb2xlOiB0cnVlLCAgXHJcbiAgICAgICAgZHJvcF9kZWJ1Z2dlcjogdHJ1ZSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSxcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMFQsT0FBTyxXQUFXO0FBQzVVLE9BQU8sVUFBVTtBQUNqQixTQUFTLG9CQUFvQjtBQUM3QixTQUFTLHFCQUFxQjtBQUM5QixTQUFTLDBCQUEwQjtBQUNuQyxTQUFTLGtCQUFrQjtBQUMzQixPQUFPLHFCQUFxQjtBQUM1QixPQUFPLGtCQUFrQjtBQVB6QixJQUFNLG1DQUFtQztBQVV6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixRQUFRO0FBQUEsSUFDTixlQUFlLENBQUM7QUFBQSxFQUNsQjtBQUFBLEVBQ0EsTUFBTTtBQUFBLEVBQ04sU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLE1BQ0osWUFBWTtBQUFBLElBQ2QsQ0FBQztBQUFBLElBQ0QsZ0JBQWdCO0FBQUEsTUFDZCxXQUFXO0FBQUEsSUFDYixDQUFDO0FBQUEsSUFDRCxhQUFhO0FBQUEsTUFDWCxTQUFTLEVBQUUsbUJBQW1CLEVBQUU7QUFBQSxJQUNsQyxDQUFDO0FBQUE7QUFBQSxJQUVELGNBQWM7QUFBQTtBQUFBLElBR2QsbUJBQW1CO0FBQUEsTUFDakIsS0FBSyxFQUFFLFNBQVMsR0FBRztBQUFBLE1BQ25CLE1BQU0sRUFBRSxTQUFTLEdBQUc7QUFBQSxNQUNwQixNQUFNLEVBQUUsU0FBUyxHQUFHO0FBQUEsTUFDcEIsTUFBTSxFQUFFLFNBQVMsR0FBRztBQUFBLE1BQ3BCLEtBQUs7QUFBQSxRQUNILFNBQVM7QUFBQSxVQUNQLEVBQUUsTUFBTSxnQkFBZ0I7QUFBQSxVQUN4QixFQUFFLE1BQU0sWUFBWTtBQUFBLFVBQ3BCLEVBQUUsTUFBTSxtQkFBbUI7QUFBQSxRQUM3QjtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQTtBQUFBLElBR0QsV0FBVztBQUFBLE1BQ1QsVUFBVTtBQUFBLE1BQ1YsTUFBTTtBQUFBLElBQ1IsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLE1BQU07QUFBQSxNQUNOLEtBQUssS0FBSyxRQUFRLGtDQUFXLFFBQVE7QUFBQSxNQUNyQyxlQUFlLEtBQUssUUFBUSxrQ0FBVyxtQkFBbUI7QUFBQSxNQUMxRCxXQUFXLEtBQUssUUFBUSxrQ0FBVyxlQUFlO0FBQUEsTUFDbEQsVUFBVSxLQUFLLFFBQVEsa0NBQVcsY0FBYztBQUFBLE1BQ2hELFFBQVEsS0FBSyxRQUFRLGtDQUFXLFlBQVk7QUFBQSxJQUM5QztBQUFBLEVBQ0Y7QUFBQSxFQUNBLGNBQWM7QUFBQSxJQUNaLFNBQVMsQ0FBQyxPQUFPO0FBQUEsSUFDakIsU0FBUztBQUFBLE1BQ1A7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUVMLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGNBQWM7QUFBQSxVQUNaLFFBQVEsQ0FBQyxTQUFTLFdBQVc7QUFBQSxRQUMvQjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLFNBQVM7QUFBQSxRQUNQLFdBQVcsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUFBLE1BQzNCO0FBQUEsSUFDRjtBQUFBLElBQ0EsUUFBUTtBQUFBLElBQ1IsdUJBQXVCO0FBQUEsSUFDdkIsZUFBZTtBQUFBLE1BQ2IsVUFBVTtBQUFBLFFBQ1IsY0FBYztBQUFBLFFBQ2QsZUFBZTtBQUFBLE1BQ2pCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
