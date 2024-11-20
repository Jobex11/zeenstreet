import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  define: {
    'process.env': {}
  },
  // optimizeDeps: {
  //   include: ['@telegram-apps/sdk-react'],
  // },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})

