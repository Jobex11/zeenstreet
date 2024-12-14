// import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  define: {
    'process.env': {}
  },
  // optimizeDeps: {
  //   include: ['@telegram-apps/sdk-react'],
  // },
  plugins: [react(), tsconfigPaths()]

})
