// vite.config.js
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { fileURLToPath } from "node:url" // 👈 Need this helper to resolve local URLs
import path from "node:path"             // 👈 Use the explicit node: prefix for stability

const __dirname = path.dirname(fileURLToPath(import.meta.url)) // 👈 Manually create __dirname safely

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})