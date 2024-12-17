// import path from "path"
import react from "@vitejs/plugin-react"
import path from "path";
import { defineConfig } from "vite"
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  define: {
    'process.env': {}
  },
  // optimizeDeps: {
  //   include: ['@telegram-apps/sdk-react'],
  // },
  base: '/',
  plugins: [nodePolyfills(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      "@components": `${path.resolve(__dirname, "./src/components/")}`,
      "@assets": `${path.resolve(__dirname, "./src/assets/")}`,
      "@hooks": `${path.resolve(__dirname, "./src/hooks/")}`,
      "@lib": `${path.resolve(__dirname, "./src/lib/")}`,
    },
  },

})
